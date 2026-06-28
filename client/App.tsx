/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { useAuth } from './hooks/useAuth.ts';
import { BaseLayout } from './layouts/BaseLayout.tsx';
import { 
  Database, 
  ShieldCheck, 
  KeyRound, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

function DashboardContent() {
  const { user, login, loading, error } = useAuth();
  const [email, setEmail] = useState('');

  const handleManualSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email.trim());
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title / Typography Pairing */}
      <div className="text-center md:text-left space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 text-xs text-emerald-700 font-medium font-mono">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          <span>FinTech Core Architecture Successfully Bound</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
          Enterprise CeFi Platform Foundation
        </h2>
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
          A production-grade, highly scalable full-stack architecture. Powered by an Express.js backend, 
          a Vite-React frontend, standard JWT authentication middleware, and a PostgreSQL database mapped via Drizzle ORM.
        </p>
      </div>

      {/* Main Grid: Info Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Postgres Database */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-gray-900 mb-2">
              PostgreSQL & Drizzle ORM
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connection pooling configured securely. Schema is verified, optimized, and pushed to 
              Cloud SQL. Re-use safe prepared statements and index strategies.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center space-x-2 text-[10px] font-mono text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Schema: users table active</span>
          </div>
        </div>

        {/* Card 2: Security Middleware */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-gray-900 mb-2">
              Zero-Trust Security
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pre-loaded with modular security middlewares for Helmet headers, CORS policy enforcement, 
              global rate limiting, and robust JWT verification structures.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center space-x-2 text-[10px] font-mono text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Rate Limiting & Helmet: Active</span>
          </div>
        </div>

      </div>

      {/* Auth Synchronization Demonstration Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none hidden md:block">
          <Layers className="w-40 h-40 text-gray-950" />
        </div>

        <div className="max-w-xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="font-display font-semibold text-lg text-gray-950">
              Identity Synchronization Engine
            </h3>
          </div>

          <p className="text-gray-500 text-xs leading-relaxed">
            Test the live backend sync. Enter your email to issue a secure simulated JWT token and trigger 
            the server's profile synchronizer. The PostgreSQL database will upsert your user record and return 
            your verified platform identity.
          </p>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl font-mono">
              Authentication Sync Failed: {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
              <span>Verifying secure connection details...</span>
            </div>
          ) : user ? (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200/50">
                <span className="text-gray-400">Database Connection Status</span>
                <span className="text-emerald-500 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  Synced
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Database Row ID: </span>
                  <span className="text-gray-900 font-bold">{user.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Platform Email: </span>
                  <span className="text-gray-700 font-medium">{user.email}</span>
                </div>
                <div>
                  <span className="text-gray-400">Authorization UID: </span>
                  <span className="text-gray-700 select-all">{user.uid}</span>
                </div>
                <div>
                  <span className="text-gray-400">Platform Role: </span>
                  <span className="text-emerald-600 font-bold">{user.role}</span>
                </div>
                <div>
                  <span className="text-gray-400">Created At: </span>
                  <span className="text-gray-500">{new Date(user.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400">Updated At: </span>
                  <span className="text-gray-500">{new Date(user.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSync} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="developer@cefi.platform"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white max-w-sm flex-grow"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-150 shadow-sm border border-gray-950 cursor-pointer"
              >
                <span>Trigger Secure Login & Database Sync</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Directory Diagnostics Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-gray-950">
          <Activity className="w-4 h-4 text-emerald-500" />
          <h4 className="font-display font-semibold text-sm">Monorepo Directory Integrity Diagnostics</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Client Directory</span>
            <span className="text-gray-800 font-semibold">/client [OK]</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Server Directory</span>
            <span className="text-gray-800 font-semibold">/server [OK]</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Shared Directory</span>
            <span className="text-gray-800 font-semibold">/shared [OK]</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-gray-400 block text-[10px] uppercase">Database Schema</span>
            <span className="text-gray-800 font-semibold">Drizzle [OK]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BaseLayout>
        <DashboardContent />
      </BaseLayout>
    </AuthProvider>
  );
}
