/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';
import { UserRole } from '../types/index.ts';

// User registration validation schema
export const RegisterUserSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Admin User Role Update schema
export const UpdateUserAdminSchema = z.object({
  role: z.nativeEnum(UserRole).optional(),
});
