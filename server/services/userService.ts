/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { eq, and, ne, desc } from 'drizzle-orm';
import { db } from '../../src/db/index.ts';
import { users, wallets, vipStatus, sessions, activityLogs, auditLogs } from '../../src/db/schema.ts';
import { UserRole } from '../../shared/types/index.ts';
import { hashPassword, comparePassword } from '../utils/password.ts';
import { SecurityLogger } from '../utils/securityLogger.ts';
import crypto from 'crypto';

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export class UserService {
  /**
   * Synchronize or register authenticated user state.
   */
  async syncUserAuthentication(uid: string, email: string) {
    const existingUser = await db.select().from(users).where(eq(users.uid, uid));
    if (existingUser[0]) {
      // Lazy initialize wallet and vipStatus if missing
      await this.ensureUserResources(existingUser[0].id);
      return existingUser[0];
    }

    // Generate a visible unique User ID (e.g. DS followed by 6 random digits)
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    const generatedUserId = `DS${randomDigits}`;
    
    // Generate a short 8-character unique referral code
    const generatedReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    const result = await db
      .insert(users)
      .values({
        uid,
        email: email.toLowerCase().trim(),
        role: UserRole.USER,
        userId: generatedUserId,
        referralCode: generatedReferralCode,
        status: 'ACTIVE',
      })
      .returning();

    const createdUser = result[0];
    await this.ensureUserResources(createdUser.id);
    return createdUser;
  }

  /**
   * Lazy initialize user resources like wallets and vipStatus
   */
  private async ensureUserResources(userId: string) {
    try {
      const existingWallet = await db.select().from(wallets).where(eq(wallets.userId, userId));
      if (!existingWallet[0]) {
        await db.insert(wallets).values({
          userId,
          availableBalance: '0.00000000',
          lockedBalance: '0.00000000',
          totalDeposited: '0.00000000',
          totalWithdrawn: '0.00000000',
          totalEarned: '0.00000000',
        });
      }

      const existingVip = await db.select().from(vipStatus).where(eq(vipStatus.userId, userId));
      if (!existingVip[0]) {
        await db.insert(vipStatus).values({
          userId,
          tier: 'VIP_0',
          points: '0.00000000',
        });
      }
    } catch (err) {
      console.error(`Failed to ensure resources for user ${userId}:`, err);
    }
  }

  /**
   * Fetch authenticated user details by UID
   */
  async getUserProfile(uid: string) {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    if (!user[0]) {
      throw new Error(`Profile not found for user ${uid}`);
    }
    await this.ensureUserResources(user[0].id);
    return user[0];
  }

  /**
   * Change user password with security validation
   */
  async changePassword(uid: string, data: { currentPlain: string; newPlain: string }, ipAddress?: string | null, userAgent?: string | null) {
    const user = await this.getUserProfile(uid);

    // 1. Password verification
    if (!user.passwordHash) {
      throw new Error('No password hash established for this account. Cannot verify current password.');
    }

    const isMatch = await comparePassword(data.currentPlain, user.passwordHash);
    if (!isMatch) {
      throw new Error('Current password does not match.');
    }

    // 2. Validate password requirements
    if (data.newPlain.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(data.newPlain)) {
      throw new Error('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(data.newPlain)) {
      throw new Error('Password must contain at least one lowercase letter.');
    }
    if (!/\d/.test(data.newPlain)) {
      throw new Error('Password must contain at least one number.');
    }
    if (!/[@$!%*?&()_+\-=\[\]{};':"\\|,.<>\/?#^]/.test(data.newPlain)) {
      throw new Error('Password must contain at least one special character.');
    }

    // 3. Hash and update
    const hashed = await hashPassword(data.newPlain);
    await db
      .update(users)
      .set({
        passwordHash: hashed,
        passwordChangedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.uid, uid));

    // 4. Log actions
    await SecurityLogger.logActivity({
      userId: user.id,
      event: 'PASSWORD_CHANGE',
      status: 'SUCCESS',
      ipAddress,
      device: userAgent,
      details: 'Password changed by user in Account Security Center.',
    });

    await SecurityLogger.logAudit({
      actorUid: uid,
      action: 'PASSWORD_CHANGE',
      resource: `users/${uid}`,
      ipAddress,
      device: userAgent,
      newValue: 'Password successfully updated',
    });

    return { message: 'Password updated successfully.' };
  }

  /**
   * Change user email address
   */
  async changeEmail(uid: string, data: { currentPlain: string; newEmail: string }, ipAddress?: string | null, userAgent?: string | null) {
    const user = await this.getUserProfile(uid);

    // 1. Verify current password
    if (!user.passwordHash) {
      throw new Error('No password hash established for this account. Cannot verify current password.');
    }

    const isMatch = await comparePassword(data.currentPlain, user.passwordHash);
    if (!isMatch) {
      throw new Error('Current password does not match.');
    }

    const newEmailLower = data.newEmail.trim().toLowerCase();

    // 2. Verify duplicate email
    const duplicate = await db.select().from(users).where(eq(users.email, newEmailLower));
    if (duplicate[0]) {
      throw new Error('This email address is already registered.');
    }

    // 3. Update
    await db
      .update(users)
      .set({
        email: newEmailLower,
        updatedAt: new Date(),
      })
      .where(eq(users.uid, uid));

    // 4. Log actions
    await SecurityLogger.logActivity({
      userId: user.id,
      event: 'PROFILE_UPDATE',
      status: 'SUCCESS',
      ipAddress,
      device: userAgent,
      details: `Email updated from ${user.email} to ${newEmailLower}`,
    });

    await SecurityLogger.logAudit({
      actorUid: uid,
      action: 'EMAIL_CHANGE',
      resource: `users/${uid}`,
      ipAddress,
      device: userAgent,
      oldValue: user.email,
      newValue: newEmailLower,
    });

    return { message: 'Email address updated successfully.' };
  }

  /**
   * Update Profile info (Name & Phone)
   */
  async updateProfile(uid: string, data: { name?: string; phone?: string }, ipAddress?: string | null, userAgent?: string | null) {
    const user = await this.getUserProfile(uid);

    await db
      .update(users)
      .set({
        name: data.name !== undefined ? data.name.trim() : user.name,
        phone: data.phone !== undefined ? data.phone.trim() : user.phone,
        updatedAt: new Date(),
      })
      .where(eq(users.uid, uid));

    // Log activity
    await SecurityLogger.logActivity({
      userId: user.id,
      event: 'PROFILE_UPDATE',
      status: 'SUCCESS',
      ipAddress,
      device: userAgent,
      details: `Profile info updated: ${data.name ? 'name ' : ''}${data.phone ? 'phone' : ''}`,
    });

    return { message: 'Profile information updated successfully.' };
  }

  /**
   * Retrieve active, valid sessions for current user
   */
  async getSessions(uid: string) {
    const user = await this.getUserProfile(uid);
    const results = await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.userId, user.id), eq(sessions.revoked, false), ne(sessions.expiresAt, new Date())))
      .orderBy(desc(sessions.createdAt));

    return results;
  }

  /**
   * Logout all other sessions
   */
  async logoutAllOthers(uid: string, currentRefreshToken: string, ipAddress?: string | null, userAgent?: string | null) {
    const user = await this.getUserProfile(uid);
    const tokenHash = hashToken(currentRefreshToken);

    await db
      .update(sessions)
      .set({ revoked: true })
      .where(and(eq(sessions.userId, user.id), ne(sessions.tokenHash, tokenHash)));

    // Log Audit
    await SecurityLogger.logAudit({
      actorUid: uid,
      action: 'LOGOUT_ALL_SESSIONS',
      resource: `users/${uid}/sessions`,
      ipAddress,
      device: userAgent,
      newValue: 'All other active sessions terminated by the user.',
    });

    return { message: 'All other active sessions have been terminated successfully.' };
  }

  /**
   * Admin-level user listing with aggregated resources (wallets, VIP tiers)
   */
  async getAdminUserList() {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    const list = [];

    for (const u of allUsers) {
      await this.ensureUserResources(u.id);

      // Get wallet available balance
      const walletRecord = await db.select().from(wallets).where(eq(wallets.userId, u.id));
      const balance = walletRecord[0] ? walletRecord[0].availableBalance : '0.00000000';

      // Get VIP tier
      const vipRecord = await db.select().from(vipStatus).where(eq(vipStatus.userId, u.id));
      const vipTier = vipRecord[0] ? vipRecord[0].tier : 'VIP_0';

      // Get Last Login activity time and IP
      const lastLoginRecord = await db
        .select()
        .from(activityLogs)
        .where(and(eq(activityLogs.userId, u.id), eq(activityLogs.event, 'LOGIN'), eq(activityLogs.status, 'SUCCESS')))
        .orderBy(desc(activityLogs.createdAt))
        .limit(1);

      const lastLoginTime = lastLoginRecord[0] ? lastLoginRecord[0].createdAt : null;
      const lastLoginIp = lastLoginRecord[0] ? lastLoginRecord[0].ipAddress : null;

      list.push({
        id: u.id,
        uid: u.uid,
        name: u.name || '',
        email: u.email,
        phone: u.phone || '',
        role: u.role,
        status: u.status,
        vipTier,
        walletBalance: parseFloat(balance),
        registrationDate: u.createdAt,
        lastLogin: lastLoginTime,
        lastLoginIp,
        failedLoginAttempts: u.failedLoginAttempts,
        lockUntil: u.lockUntil,
        passwordChangedAt: u.passwordChangedAt,
      });
    }

    return list;
  }

  /**
   * Admin updates user profile / configuration
   */
  async updateProfileByAdmin(uid: string, role?: UserRole) {
    const fieldsToUpdate: Partial<{ role: string }> = {};
    if (role) fieldsToUpdate.role = role;

    const updatedUser = await db
      .update(users)
      .set({
        ...fieldsToUpdate,
        updatedAt: new Date(),
      })
      .where(eq(users.uid, uid))
      .returning();

    if (!updatedUser[0]) {
      throw new Error(`Failed to update user. Profile for ${uid} does not exist.`);
    }
    return updatedUser[0];
  }

  /**
   * Admin operations: Reset Password, Suspend/Unlock User, Force Password Change, Change Role/VIP
   */
  async adminActionUser(
    adminUid: string,
    targetUid: string,
    payload: {
      action: 'RESET_PASSWORD' | 'FORCE_PASSWORD_CHANGE' | 'SUSPEND' | 'UNLOCK' | 'CHANGE_ROLE' | 'CHANGE_VIP';
      password?: string;
      value?: any;
    },
    ipAddress?: string | null,
    userAgent?: string | null
  ) {
    const targetUser = await this.getUserProfile(targetUid);
    const updates: any = { updatedAt: new Date() };

    switch (payload.action) {
      case 'RESET_PASSWORD': {
        if (!payload.password || payload.password.trim().length < 8) {
          throw new Error('A secure password of at least 8 characters is required for reset.');
        }
        const hash = await hashPassword(payload.password);
        updates.passwordHash = hash;
        updates.passwordChangedAt = new Date();

        // Revoke target user's active sessions for security!
        await db.update(sessions).set({ revoked: true }).where(eq(sessions.userId, targetUser.id));

        await SecurityLogger.logAudit({
          actorUid: adminUid,
          action: 'PASSWORD_RESET',
          resource: `users/${targetUid}`,
          ipAddress,
          device: userAgent,
          newValue: 'Password manually reset by Administrator.',
        });
        break;
      }

      case 'SUSPEND': {
        updates.status = 'SUSPENDED';
        // Terminate all sessions upon suspension
        await db.update(sessions).set({ revoked: true }).where(eq(sessions.userId, targetUser.id));

        await SecurityLogger.logAudit({
          actorUid: adminUid,
          action: 'USER_SUSPEND',
          resource: `users/${targetUid}`,
          ipAddress,
          device: userAgent,
          oldValue: targetUser.status,
          newValue: 'SUSPENDED',
        });
        break;
      }

      case 'UNLOCK': {
        updates.status = 'ACTIVE';
        updates.failedLoginAttempts = 0;
        updates.lockUntil = null;

        await SecurityLogger.logAudit({
          actorUid: adminUid,
          action: 'USER_UNLOCK',
          resource: `users/${targetUid}`,
          ipAddress,
          device: userAgent,
          oldValue: targetUser.status,
          newValue: 'ACTIVE',
        });
        break;
      }

      case 'CHANGE_ROLE': {
        const allowedRoles = Object.values(UserRole);
        if (!payload.value || !allowedRoles.includes(payload.value)) {
          throw new Error('Invalid security role specified.');
        }
        updates.role = payload.value;

        await SecurityLogger.logAudit({
          actorUid: adminUid,
          action: 'ROLE_CHANGE',
          resource: `users/${targetUid}`,
          ipAddress,
          device: userAgent,
          oldValue: targetUser.role,
          newValue: payload.value,
        });
        break;
      }

      case 'CHANGE_VIP': {
        if (!payload.value) {
          throw new Error('VIP tier is required.');
        }
        // Update vip_status table
        await db
          .update(vipStatus)
          .set({
            tier: payload.value,
            updatedAt: new Date(),
          })
          .where(eq(vipStatus.userId, targetUser.id));

        await SecurityLogger.logAudit({
          actorUid: adminUid,
          action: 'CHANGE_VIP',
          resource: `users/${targetUid}/vip`,
          ipAddress,
          device: userAgent,
          newValue: payload.value,
        });
        break;
      }

      default:
        throw new Error(`Unsupported administrative security operation: ${payload.action}`);
    }

    // Apply main user table updates
    const result = await db
      .update(users)
      .set(updates)
      .where(eq(users.uid, targetUid))
      .returning();

    return result[0];
  }

  /**
   * SECURITY DASHBOARD: Returns a high-level security audit profile summary for a user
   */
  async getSecuritySummary(uid: string) {
    const user = await this.getUserProfile(uid);

    // Get current login details from active session
    const currentSession = await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.userId, user.id), eq(sessions.revoked, false)))
      .orderBy(desc(sessions.lastActivity))
      .limit(1);

    // Get last login log
    const lastLoginLogs = await db
      .select()
      .from(activityLogs)
      .where(and(eq(activityLogs.userId, user.id), eq(activityLogs.event, 'LOGIN')))
      .orderBy(desc(activityLogs.createdAt))
      .limit(2);

    const prevLogin = lastLoginLogs[1] || lastLoginLogs[0] || null;

    return {
      passwordChangedAt: user.passwordChangedAt,
      failedLoginAttempts: user.failedLoginAttempts,
      accountLockStatus: user.lockUntil && user.lockUntil > new Date() ? 'LOCKED' : 'UNLOCKED',
      lockUntil: user.lockUntil,
      currentLoginDevice: currentSession[0] ? `${currentSession[0].browser || ''} on ${currentSession[0].device || ''}` : null,
      lastLoginTime: prevLogin ? prevLogin.createdAt : null,
      lastLoginIp: prevLogin ? prevLogin.ipAddress : null,
    };
  }
}

export const userService = new UserService();
export default userService;
