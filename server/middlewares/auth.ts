/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.ts';
import { ApiError } from './errorHandler.ts';
import { UserRole } from '../../shared/types/index.ts';

// Extend Express Request type to attach the authenticated user
export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: UserRole;
  };
}

/**
 * Authentication Middleware: Validates Bearer Access Tokens using jsonwebtoken
 */
export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized: Missing or malformed Bearer token', 'MISSING_TOKEN'));
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    // Verify standard JWT token with config secret
    const decoded = jwt.verify(token, config.jwt.secret) as {
      uid: string;
      email: string;
      role?: UserRole;
    };
    
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role || UserRole.USER,
    };
    
    next();
  } catch (error) {
    console.error('Error verifying identity token:', error);
    return next(new ApiError(401, 'Unauthorized: Invalid or expired access token', 'INVALID_TOKEN'));
  }
};

/**
 * Authorization Middleware: Restricts endpoints to specific Roles
 */
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized: Authentication required', 'AUTHENTICATION_REQUIRED'));
    }

    const hasRole = allowedRoles.includes(req.user.role);
    if (!hasRole) {
      return next(new ApiError(403, 'Forbidden: Insufficient platform permissions', 'INSUFFICIENT_PERMISSIONS'));
    }

    next();
  };
};
