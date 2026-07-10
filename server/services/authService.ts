/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import crypto from 'crypto';
import { authRepository } from '../repositories/authRepository.ts';
import { userRepository } from '../repositories/userRepository.ts';
import { sessionRepository } from '../repositories/sessionRepository.ts';
import { hashPassword, comparePassword } from '../utils/password.ts';
import { SecurityLogger } from '../utils/securityLogger.ts';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload
} from '../utils/jwt.ts';
import { UserRole } from '../../shared/types/index.ts';

// Helper to hash refresh tokens for secure storage
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// In-memory store for secure hashed reset tokens with expiration mapping:
// key: string (hashed reset token) -> value: { uid: string, expiresAt: Date }
interface ResetTokenPayload {
  uid: string;
  expiresAt: Date;
}
const resetTokensStore = new Map<string, ResetTokenPayload>();

export class AuthService {
  /**
   * Helper to hash a plain reset token using SHA-256
   */
  private hashResetToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Helper to generate a unique random 8-character uppercase referral code
   */
  private async generateUniqueReferralCode(): Promise<string> {
    for (let attempt = 0; attempt < 10; attempt++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 characters
      const existing = await authRepository.findByReferralCode(code);
      if (!existing) {
        return code;
      }
    }
    throw new Error('Failed to generate unique referral code. Please retry.');
  }

  /**
   * Helper to generate a unique random 8-character visible User ID (e.g. DS322256)
   */
  private async generateUniqueUserId(): Promise<string> {
    for (let attempt = 0; attempt < 10; attempt++) {
      const digits = Math.floor(100000 + Math.random() * 900000).toString();
      const userIdCandidate = `DS${digits}`;
      const existing = await authRepository.findByUserId(userIdCandidate);
      if (!existing) {
        return userIdCandidate;
      }
    }
    throw new Error('Failed to generate unique public user ID. Please retry.');
  }

  /**
   * Enterprise registration logic
   */
  async registerUser(data: {
    email: string;
    username: string;
    name?: string;
    phone?: string;
    country?: string;
    passwordPlain: string;
    parentReferralCode?: string;
  }) {
    const trimmedEmail = data.email.trim().toLowerCase();
    const trimmedUsername = data.username.trim().toLowerCase();

    // 1. Prevent duplicate emails
    const existingEmail = await authRepository.findByEmail(trimmedEmail);
    if (existingEmail) {
      throw new Error('Email address is already registered on this platform.');
    }

    // 1b. Prevent duplicate usernames
    const existingUsername = await authRepository.findByUsername(trimmedUsername);
    if (existingUsername) {
      throw new Error('Username is already registered on this platform.');
    }

    // 2. Validate referral code if provided
    let parentReferralId: string | null = null;
    if (data.parentReferralCode) {
      const parentUser = await authRepository.findByReferralCode(data.parentReferralCode);
      if (!parentUser) {
        throw new Error('The provided referral code is invalid or does not exist.');
      }
      parentReferralId = parentUser.id;
    }

    // 3. Generate unique identifiers securely
    const userId = await this.generateUniqueUserId();
    const referralCode = await this.generateUniqueReferralCode();
    const uid = crypto.randomUUID(); // Unique system authority UID for security and JWT mapping

    // 4. Hash the password before saving
    const passwordHash = await hashPassword(data.passwordPlain);

    // 5. Create user profile in database
    const createdUser = await authRepository.createUser({
      uid,
      email: trimmedEmail,
      username: trimmedUsername,
      name: data.name || null,
      phone: data.phone || null,
      country: data.country || null,
      passwordHash,
      role: UserRole.USER,
      userId,
      referralCode,
      parentReferralId,
    });

    // Strip password hash from returned object
    const { passwordHash: _, ...safeUser } = createdUser;
    return safeUser;
  }

  /**
   * Enterprise login logic
   */
  async loginUser(data: {
    emailOrUsername: string;
    passwordPlain: string;
    ipAddress?: string | null;
    device?: string | null;
    browser?: string | null;
  }) {
    const trimmedIdentifier = data.emailOrUsername.trim().toLowerCase();

    // 1. Retrieve the user record
    let user = await authRepository.findByEmail(trimmedIdentifier);
    if (!user) {
      user = await authRepository.findByUsername(trimmedIdentifier);
    }
    if (!user) {
      // Use generic error for security to prevent username harvesting
      throw new Error('Invalid username, email address or password.');
    }

    // 2. Lockout protection check
    if (user.lockUntil && user.lockUntil > new Date()) {
      const minutesRemaining = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
      throw new Error(`This account is temporarily locked due to multiple failed login attempts. Please try again in ${minutesRemaining} minutes.`);
    }

    // If lockout has expired, reset attempts
    if (user.lockUntil && user.lockUntil <= new Date()) {
      await authRepository.resetFailedLoginAttempts(user.id);
      user.failedLoginAttempts = 0;
      user.lockUntil = null;
    }

    // 3. Prevent inactive/suspended user login
    if (user.status !== 'ACTIVE') {
      throw new Error('This user account has been suspended or is pending verification.');
    }

    // 4. Verify user password securely
    if (!user.passwordHash) {
      throw new Error('Invalid email address or password.');
    }

    const isMatch = await comparePassword(data.passwordPlain, user.passwordHash);
    if (!isMatch) {
      // Increment failed attempts and track
      const updatedUser = await authRepository.incrementFailedLoginAttempts(user.id, user.failedLoginAttempts);
      
      // Log failed login event
      await SecurityLogger.logActivity({
        userId: user.id,
        event: 'LOGIN',
        status: 'FAILED',
        ipAddress: data.ipAddress,
        device: data.device ? `${data.browser || ''} on ${data.device}` : null,
        details: `Incorrect password. Failed attempt count: ${updatedUser.failedLoginAttempts}`,
      });

      if (updatedUser.failedLoginAttempts >= 5) {
        // Log account lock event
        await SecurityLogger.logActivity({
          userId: user.id,
          event: 'SECURITY_EVENT',
          status: 'FAILED',
          ipAddress: data.ipAddress,
          device: data.device ? `${data.browser || ''} on ${data.device}` : null,
          details: `Account temporarily locked due to 5 consecutive failed login attempts.`,
        });
        throw new Error('This account has been temporarily locked due to too many failed login attempts. Please try again in 15 minutes.');
      }

      throw new Error('Invalid email address or password.');
    }

    // Reset attempts on successful login
    if (user.failedLoginAttempts > 0) {
      await authRepository.resetFailedLoginAttempts(user.id);
    }

    // 5. Generate Access and Refresh tokens
    const payload: TokenPayload = {
      uid: user.uid,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // 6. Persist session with refresh token hash in Postgres
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await sessionRepository.createSession({
      userId: user.id,
      tokenHash,
      device: data.device,
      browser: data.browser,
      ipAddress: data.ipAddress,
      expiresAt,
    });

    // 7. Log successful login
    await SecurityLogger.logActivity({
      userId: user.id,
      event: 'LOGIN',
      status: 'SUCCESS',
      ipAddress: data.ipAddress,
      device: data.device ? `${data.browser || ''} on ${data.device}` : null,
      details: 'Successful credentials authentication.',
    });

    const { passwordHash: _, ...safeUser } = user;
    return {
      user: safeUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  /**
   * Refresh token rotation logic (DB-backed and multi-device safe)
   */
  async refreshSession(refreshToken: string, ipAddress?: string | null, device?: string | null, browser?: string | null) {
    // 1. Verify and decode token structure
    let decoded: TokenPayload;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      throw new Error('Session validation failed. Please sign in again.');
    }

    // 2. Hash incoming token and query Postgres
    const tokenHash = hashToken(refreshToken);
    const session = await sessionRepository.findByTokenHash(tokenHash);

    if (!session) {
      throw new Error('Refresh token is invalid or has been revoked.');
    }

    // 3. Reject if revoked or expired
    if (session.revoked) {
      throw new Error('This session has been terminated or the token is revoked.');
    }

    if (session.expiresAt < new Date()) {
      throw new Error('The secure session has expired. Please log in again.');
    }

    // 4. Invalidate the previous refresh token (Rotation)
    await sessionRepository.revokeSession(tokenHash);

    // 5. Generate brand new token pair
    const payload: TokenPayload = {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // 6. Persist the new rotated session
    const newHash = hashToken(newRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await sessionRepository.createSession({
      userId: session.userId,
      tokenHash: newHash,
      device: device || session.device,
      browser: browser || session.browser,
      ipAddress: ipAddress || session.ipAddress,
      expiresAt,
    });

    // 7. Log token rotation activity
    await SecurityLogger.logActivity({
      userId: session.userId,
      event: 'SECURITY_EVENT',
      status: 'SUCCESS',
      ipAddress: ipAddress || session.ipAddress,
      device: device ? `${browser || ''} on ${device}` : (session.device ? `${session.browser || ''} on ${session.device}` : null),
      details: 'Successful refresh token rotation.',
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Revoke session upon logout (DB-backed)
   */
  async logoutUser(refreshToken: string) {
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      const session = await sessionRepository.findByTokenHash(tokenHash);
      if (session) {
        await sessionRepository.revokeSession(tokenHash);
        
        // Log logout event
        await SecurityLogger.logActivity({
          userId: session.userId,
          event: 'LOGOUT',
          status: 'SUCCESS',
          ipAddress: session.ipAddress,
          device: session.device ? `${session.browser || ''} on ${session.device}` : null,
          details: 'Session invalidated on user request.',
        });
      }
    }
  }

  /**
   * Forgot password: Create secure reset token, hash, store, and set expiration
   */
  async forgotPassword(email: string) {
    const trimmedEmail = email.trim().toLowerCase();
    const user = await authRepository.findByEmail(trimmedEmail);

    // Generate a secure reset token
    const plainToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = this.hashResetToken(plainToken);

    // Tokens expire in exactly 1 hour
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    if (user) {
      // Store the hashed reset token referencing the user
      resetTokensStore.set(hashedToken, {
        uid: user.uid,
        expiresAt,
      });
    }

    // Always return success metadata for security.
    // Return plainToken so testing or dev can receive/inspect it directly since emails are omitted.
    return {
      message: 'If the email is registered, a password reset token has been successfully generated.',
      debugToken: plainToken, // For development and verification purposes
    };
  }

  /**
   * Reset password: Confirm token Validity and apply new password securely
   */
  async resetPassword(data: {
    tokenPlain: string;
    passwordPlain: string;
    ipAddress?: string | null;
    device?: string | null;
    browser?: string | null;
  }) {
    const hashedTokenCandidate = this.hashResetToken(data.tokenPlain);
    const tokenRecord = resetTokensStore.get(hashedTokenCandidate);

    if (!tokenRecord) {
      throw new Error('The password reset token is invalid, expired, or has already been used.');
    }

    // Check expiration
    if (tokenRecord.expiresAt < new Date()) {
      resetTokensStore.delete(hashedTokenCandidate);
      throw new Error('The password reset token has expired.');
    }

    // Find user record to obtain user ID for activity logging
    const userRecord = await userRepository.findByUid(tokenRecord.uid);

    // Hash the brand new password
    const newPasswordHash = await hashPassword(data.passwordPlain);

    // Update database credentials
    await authRepository.updatePassword(tokenRecord.uid, newPasswordHash);

    // Invalidate the reset token to prevent replay attacks
    resetTokensStore.delete(hashedTokenCandidate);

    if (userRecord) {
      // Invalidate all active sessions for this user on password change
      await sessionRepository.revokeAllUserSessions(userRecord.id);

      // Log password change event
      await SecurityLogger.logActivity({
        userId: userRecord.id,
        event: 'PASSWORD_CHANGE',
        status: 'SUCCESS',
        ipAddress: data.ipAddress,
        device: data.device ? `${data.browser || ''} on ${data.device}` : null,
        details: 'Password successfully updated. All active sessions invalidated.',
      });
    }

    return {
      message: 'Your account password has been updated successfully.',
    };
  }
}

export const authService = new AuthService();
export default authService;
