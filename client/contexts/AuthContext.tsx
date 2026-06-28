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
  login: (email: string) => Promise<void>;
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
   * Simulate a secure login flow generating a JWT structure
   */
  const login = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      // Prepare a simulated standard JWT structure for demonstration of the flow
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ uid: 'usr_' + Math.random().toString(36).substring(2, 11), email, role: 'USER' }));
      const signature = 'simulated_signature';
      const simulatedToken = `${header}.${payload}.${signature}`;

      setToken(simulatedToken);
      localStorage.setItem('cefi_token', simulatedToken);

      // Trigger the backend API to sync the user record to PostgreSQL database
      const response = await fetch('/api/v1/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${simulatedToken}`
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to synchronize user state with CeFi backend.');
      }

      const resData: ApiResponse<User> = await response.json();
      if (resData.success && resData.data) {
        setUser(resData.data);
        localStorage.setItem('cefi_user', JSON.stringify(resData.data));
      } else {
        throw new Error(resData.error?.message || 'CeFi synchronizer returned invalid payload');
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.message || 'Login failed');
      logout();
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
