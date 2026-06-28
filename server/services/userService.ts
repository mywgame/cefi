/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { userRepository } from '../repositories/userRepository.ts';
import { UserRole } from '../../shared/types/index.ts';

export class UserService {
  /**
   * Synchronize or register authenticated user state.
   */
  async syncUserAuthentication(uid: string, email: string) {
    // 1. Check if user already exists in the database
    const existingUser = await userRepository.findByUid(uid);
    if (existingUser) {
      return existingUser;
    }

    // 2. Create and persist user record
    return await userRepository.upsertUser({
      uid,
      email,
    });
  }

  /**
   * Fetch authenticated user details by UID
   */
  async getUserProfile(uid: string) {
    const user = await userRepository.findByUid(uid);
    if (!user) {
      throw new Error(`Profile not found for user ${uid}`);
    }
    return user;
  }

  /**
   * Admin-level profile updating (Role configuration)
   */
  async updateProfileByAdmin(uid: string, role?: UserRole) {
    const fieldsToUpdate: Partial<{ role: string }> = {};
    if (role) fieldsToUpdate.role = role;

    const updatedUser = await userRepository.updateUserProfile(uid, fieldsToUpdate);
    if (!updatedUser) {
      throw new Error(`Failed to update user. Profile for ${uid} does not exist.`);
    }
    return updatedUser;
  }
}

export const userService = new UserService();
export default userService;
