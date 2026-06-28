/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import crypto from 'crypto';
import { authRepository } from '../repositories/authRepository.ts';
import { hashPassword, comparePassword } from '../utils/password.ts';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload
} from '../utils/jwt.ts';
import { UserRole } from '../../shared/types/index.ts';

// In-memory store for active refresh tokens to support proper invalidation (logout)
const activeRefreshTokens = new Set<string>();

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
    passwordPlain: string;
    parentReferralCode?: string;
  }) {
    const trimmedEmail = data.email.trim().toLowerCase();

    // 1. Prevent duplicate emails
    const existingEmail = await authRepository.findByEmail(trimmedEmail);
    if (existingEmail) {
      throw new Error('Email address is already registered on this platform.');
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
    email: string;
    passwordPlain: string;
  }) {
    const trimmedEmail = data.email.trim().toLowerCase();

    // 1. Retrieve the user record
    const user = await authRepository.findByEmail(trimmedEmail);
    if (!user) {
      // Use generic error for security to prevent username harvest
      throw new Error('Invalid email address or password.');
    }

    // 2. Prevent inactive/suspended user login
    if (user.status !== 'ACTIVE') {
      throw new Error('This user account has been suspended or is pending verification.');
    }

    // 3. Verify user password securely
    if (!user.passwordHash) {
      throw new Error('Invalid email address or password.');
    }

    const isMatch = await comparePassword(data.passwordPlain, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email address or password.');
    }

    // 4. Generate Access and Refresh tokens
    const payload: TokenPayload = {
      uid: user.uid,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // 5. Add refresh token to active in-memory list
    activeRefreshTokens.add(refreshToken);

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
   * Refresh token rotation logic
   */
  async refreshSession(refreshToken: string) {
    // 1. Verify existence in in-memory whitelist
    if (!activeRefreshTokens.has(refreshToken)) {
      throw new Error('Refresh token is invalid or has been revoked.');
    }

    try {
      // 2. Parse and verify token structure and expiration
      const decoded = verifyRefreshToken(refreshToken);

      // 3. Remove old refresh token to achieve rotation
      activeRefreshTokens.delete(refreshToken);

      // 4. Generate brand new token pair
      const payload: TokenPayload = {
        uid: decoded.uid,
        email: decoded.email,
        role: decoded.role,
      };

      const newAccessToken = generateAccessToken(payload);
      const newRefreshToken = generateRefreshToken(payload);

      // 5. Register new refresh token
      activeRefreshTokens.add(newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      activeRefreshTokens.delete(refreshToken); // Invalidate potentially compromised token
      throw new Error('Session validation failed. Please sign in again.');
    }
  }

  /**
   * Revoke session upon logout
   */
  async logoutUser(refreshToken: string) {
    if (refreshToken) {
      activeRefreshTokens.delete(refreshToken);
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

    // Hash the brand new password
    const newPasswordHash = await hashPassword(data.passwordPlain);

    // Update database credentials
    await authRepository.updatePassword(tokenRecord.uid, newPasswordHash);

    // Invalidate the reset token to prevent replay attacks
    resetTokensStore.delete(hashedTokenCandidate);

    return {
      message: 'Your account password has been updated successfully.',
    };
  }
}

export const authService = new AuthService();
export default authService;
