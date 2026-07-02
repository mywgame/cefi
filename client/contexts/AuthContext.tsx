/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useState, useEffect } from 'react';
import { User, ApiResponse } from '../../shared/types/index.ts';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (
    emailOrUsername: string,
    password?: string,
    isRegister?: boolean,
    referralCode?: string,
    signupData?: { name?: string; username?: string; phone?: string; country?: string }
  ) => Promise<void>;
  logout: () => Promise<void>;
  syncProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-restore session from localStorage on initialization
  useEffect(() => {
    const savedToken = localStorage.getItem('cefi_token');
    const savedUser = localStorage.getItem('cefi_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Synchronize profile info from PostgreSQL back-end using active token
   */
  const syncProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/v1/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user state from CeFi backend.');
      }

      const resData: ApiResponse<User> = await response.json();
      if (resData.success && resData.data) {
        setUser(resData.data);
        localStorage.setItem('cefi_user', JSON.stringify(resData.data));
      }
    } catch (err: any) {
      console.error('CeFi Profile Sync Error:', err);
      setError(err.message || 'Profile sync failed');
    }
  };

  /**
   * Perform secure login/register flow using the CeFi backend API
   */
  const login = async (
    emailOrUsername: string,
    password?: string,
    isRegister?: boolean,
    referralCode?: string,
    signupData?: { name?: string; username?: string; phone?: string; country?: string }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const pwd = password || 'SecurePass123!';

      if (isRegister) {
        // Step A: Register the user with referral code and additional fields
        const registerResponse = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailOrUsername,
            username: signupData?.username || emailOrUsername.split('@')[0],
            name: signupData?.name || '',
            phone: signupData?.phone || '',
            country: signupData?.country || 'United States',
            password: pwd,
            referralCode: referralCode || undefined,
          }),
        });

        if (!registerResponse.ok) {
          const errData = await registerResponse.json().catch(() => ({}));
          throw new Error(errData.error?.message || 'Failed to register account with CeFi backend.');
        }
      }

      // Step B: Authenticate the user to retrieve real JWT
      const loginResponse = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUsername: isRegister ? (signupData?.username || emailOrUsername) : emailOrUsername,
          password: pwd,
        }),
      });

      if (!loginResponse.ok) {
        const errData = await loginResponse.json().catch(() => ({}));
        throw new Error(errData.error?.message || 'Failed to authenticate with CeFi backend.');
      }

      const resData = await loginResponse.json();
      if (resData.success && resData.data) {
        const returnedUser = resData.data.user;
        const returnedToken = resData.data.accessToken || 'cookie_based_token';

        setToken(returnedToken);
        setUser(returnedUser);
        localStorage.setItem('cefi_token', returnedToken);
        localStorage.setItem('cefi_user', JSON.stringify(returnedUser));
      } else {
        throw new Error('CeFi authentication response returned invalid payload');
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.message || 'Authentication failed');
      localStorage.removeItem('cefi_token');
      localStorage.removeItem('cefi_user');
      setToken(null);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Disconnect/Sign Out
   */
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      localStorage.removeItem('cefi_token');
      localStorage.removeItem('cefi_user');
      setToken(null);
      setUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        logout,
        syncProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
