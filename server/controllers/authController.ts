/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService.ts';
import { ApiError } from '../middlewares/errorHandler.ts';
import { authRepository } from '../repositories/authRepository.ts';

export class AuthController {
  /**
   * Register a new user
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, referralCode } = req.body;

      const user = await authService.registerUser({
        email,
        passwordPlain: password,
        parentReferralCode: referralCode,
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful. Account created.',
        data: { user },
      });
    } catch (error: any) {
      // Never expose raw database or repository errors
      const userMessage = error.message.includes('Database') || error.message.includes('repository') || error.message.includes('persist')
        ? 'A system error occurred during registration. Please try again.'
        : error.message;

      return next(new ApiError(400, userMessage, 'REGISTRATION_FAILED'));
    }
  }

  /**
   * Login a user
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await authService.loginUser({
        email,
        passwordPlain: password,
      });

      return res.status(200).json({
        success: true,
        message: 'Authentication successful.',
        data: result,
      });
    } catch (error: any) {
      const userMessage = error.message.includes('Database') || error.message.includes('query')
        ? 'A system error occurred during authentication.'
        : error.message;

      return next(new ApiError(401, userMessage, 'AUTHENTICATION_FAILED'));
    }
  }

  /**
   * Refresh the access and refresh tokens
   */
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ApiError(400, 'Refresh token is required.', 'BAD_REQUEST');
      }

      const result = await authService.refreshSession(refreshToken);

      return res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully.',
        data: result,
      });
    } catch (error: any) {
      const isRevoked = error.message.includes('revoked') || error.message.includes('validation') || error.message.includes('revocation');
      return next(new ApiError(isRevoked ? 401 : 400, error.message, 'SESSION_REFRESH_FAILED'));
    }
  }

  /**
   * Logout a user (invalidate refresh token)
   */
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      
      // Logout is idempotent and safe even if token is missing/invalid
      if (refreshToken) {
        await authService.logoutUser(refreshToken);
      }

      return res.status(200).json({
        success: true,
        message: 'Logged out successfully. Session invalidated.',
      });
    } catch (error: any) {
      return next(error);
    }
  }

  /**
   * Forgot password: Create reset token
   */
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const result = await authService.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          // Only expose plain token in non-production environments for verification/dev purposes
          debugToken: process.env.NODE_ENV !== 'production' ? result.debugToken : undefined,
        },
      });
    } catch (error: any) {
      return next(error);
    }
  }

  /**
   * Reset password: Apply new password
   */
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;

      const result = await authService.resetPassword({
        tokenPlain: token,
        passwordPlain: password,
      });

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      return next(new ApiError(400, error.message, 'PASSWORD_RESET_FAILED'));
    }
  }

  /**
   * Get current user details
   */
  async me(req: any, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, 'Unauthorized: Access token missing or invalid.', 'UNAUTHORIZED');
      }

      const userDetails = await authRepository.findByEmail(req.user.email);
      if (!userDetails) {
        throw new ApiError(404, 'User profile not found.', 'NOT_FOUND');
      }

      const { passwordHash: _, ...safeUser } = userDetails;

      return res.status(200).json({
        success: true,
        message: 'Current user profile retrieved.',
        data: { user: safeUser },
      });
    } catch (error: any) {
      return next(error);
    }
  }
}

export const authController = new AuthController();
export default authController;
