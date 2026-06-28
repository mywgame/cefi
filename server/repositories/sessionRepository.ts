/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { eq, and } from 'drizzle-orm';
import { db } from '../../src/db/index.ts';
import { sessions } from '../../src/db/schema.ts';

export interface CreateSessionInput {
  userId: string;
  tokenHash: string;
  device?: string | null;
  browser?: string | null;
  ipAddress?: string | null;
  expiresAt: Date;
}

export class SessionRepository {
  /**
   * Create and persist a new user session
   */
  async createSession(data: CreateSessionInput) {
    try {
      const result = await db
        .insert(sessions)
        .values({
          userId: data.userId,
          tokenHash: data.tokenHash,
          device: data.device || null,
          browser: data.browser || null,
          ipAddress: data.ipAddress || null,
          expiresAt: data.expiresAt,
          createdAt: new Date(),
          lastActivity: new Date(),
          revoked: false,
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error('Failed to create session in database:', error);
      throw new Error('Failed to persist secure session in database.');
    }
  }

  /**
   * Find a session by its secure token hash
   */
  async findByTokenHash(tokenHash: string) {
    try {
      const result = await db
        .select()
        .from(sessions)
        .where(eq(sessions.tokenHash, tokenHash));
      return result[0] || null;
    } catch (error) {
      console.error('Failed to query session by token hash:', error);
      throw new Error('Failed to query session from database.');
    }
  }

  /**
   * Update the last activity timestamp for session lifetime tracking
   */
  async updateLastActivity(id: string) {
    try {
      await db
        .update(sessions)
        .set({ lastActivity: new Date() })
        .where(eq(sessions.id, id));
    } catch (error) {
      console.error('Failed to update session last activity:', error);
    }
  }

  /**
   * Revoke a specific session (soft delete / logout)
   */
  async revokeSession(tokenHash: string) {
    try {
      await db
        .update(sessions)
        .set({ revoked: true })
        .where(eq(sessions.tokenHash, tokenHash));
    } catch (error) {
      console.error('Failed to revoke session:', error);
      throw new Error('Failed to revoke session in database.');
    }
  }

  /**
   * Revoke all sessions for a specific user (global sign-out)
   */
  async revokeAllUserSessions(userId: string) {
    try {
      await db
        .update(sessions)
        .set({ revoked: true })
        .where(eq(sessions.userId, userId));
    } catch (error) {
      console.error('Failed to revoke all user sessions:', error);
      throw new Error('Failed to terminate all active sessions.');
    }
  }
}

export const sessionRepository = new SessionRepository();
export default sessionRepository;
