/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { userController } from '../../controllers/userController.ts';
import { requireAuth, requireRole } from '../../middlewares/auth.ts';
import { validateRequest } from '../../middlewares/validate.ts';
import { RegisterUserSchema, UpdateUserAdminSchema } from '../../../shared/validators/index.ts';
import { UserRole } from '../../../shared/types/index.ts';

const router = Router();

/**
 * @route POST /api/v1/users/sync
 * @desc Sync authenticated user credentials
 * @access Private (JWT Auth token required)
 */
router.post(
  '/sync',
  requireAuth,
  validateRequest(RegisterUserSchema),
  userController.syncUser
);

/**
 * @route GET /api/v1/users/profile
 * @desc Get currently authenticated user profile info
 * @access Private
 */
router.get(
  '/profile',
  requireAuth,
  userController.getProfile
);

/**
 * @route PATCH /api/v1/users/admin/update/:targetUid
 * @desc Modify user role (Admin only)
 * @access Private (Admin and Superadmin only)
 */
router.patch(
  '/admin/update/:targetUid',
  requireAuth,
  requireRole([UserRole.ADMIN, UserRole.SUPERADMIN]),
  validateRequest(UpdateUserAdminSchema),
  userController.adminUpdateUser
);

export default router;
