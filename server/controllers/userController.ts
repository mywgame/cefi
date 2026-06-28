/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.ts';
import { userService } from '../services/userService.ts';
import { sendSuccess } from '../utils/response.ts';
import { ApiError } from '../middlewares/errorHandler.ts';
import { UserRole } from '../../shared/types/index.ts';

export class UserController {
  /**
   * Sync authenticated User credentials to local PostgreSQL database
   */
  async syncUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, 'Authentication credentials required', 'UNAUTHORIZED');
      }

      const { uid, email } = req.user;

      const syncedUser = await userService.syncUserAuthentication(uid, email);
      return sendSuccess(res, syncedUser, 200);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch details of currently authenticated user profile
   */
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, 'Authentication credentials required', 'UNAUTHORIZED');
      }

      const user = await userService.getUserProfile(req.user.uid);
      return sendSuccess(res, user, 200);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin Endpoint: Manually update user roles for security configuration
   */
  async adminUpdateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { targetUid } = req.params;
      const { role } = req.body;

      if (!targetUid) {
        throw new ApiError(400, 'Target user UID is required', 'BAD_REQUEST');
      }

      const updatedUser = await userService.updateProfileByAdmin(
        targetUid,
        role as UserRole
      );
      return sendSuccess(res, updatedUser, 200);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
export default userController;
