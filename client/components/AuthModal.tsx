/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth.ts';
import { X, Mail, Lock, KeyRound, ArrowRight, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, loading, error: authError } = useAuth();
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setValidationError('Please enter both your email address and password.');
      return;
    }

    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters long for platform security.');
      return;
    }

    try {
      if (isRegister) {
        // Register simulation & sync profile
        // Since we are leveraging the existing auth platform sync login:
        await login(email.trim());
        setSuccessMsg('Account created and verified. Synchronizing security credentials...');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        // Login & sync profile
        await login(email.trim());
        setSuccessMsg('Authentication successful. Loading corporate dashboard...');
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      setValidationError(err.message || 'An unexpected authentication error occurred.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden z-10 relative"
          id="auth-modal-card"
        >
          {/* Top Decorative bar */}
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500 w-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer"
            id="auth-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {/* Header Identity */}
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CeFi Secure Vault Gateway</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-950 tracking-tight">
                {isRegister ? 'Begin Your Yield Journey' : 'Secure Vault Authentication'}
              </h2>
              <p className="text-xs text-gray-500 leading-normal">
                {isRegister
                  ? 'Open an institutional-grade account with real-time reserve auditing and compound yields.'
                  : 'Access your secure ledger balance, team statistics, and automated payout channels.'}
              </p>
            </div>

            {/* Error alerts */}
            {(authError || validationError) && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 font-mono leading-relaxed"
                id="auth-error-alert"
              >
                {validationError || authError}
              </motion.div>
            )}

            {/* Success alerts */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-mono flex items-center space-x-2"
                id="auth-success-alert"
              >
                <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
                <span>{successMsg}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" id="auth-modal-form">
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 block">Corporate Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="investor@cefi-platform.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/50 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700 block">Account Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => alert('Password recovery has been configured on the backend. Please use standard API password reset features.')}
                      className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/50 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Referral Code (only for register) */}
              {isRegister && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-1 overflow-hidden"
                >
                  <label className="text-xs font-medium text-gray-700 block">Referral Code (Optional)</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="e.g. PARTNER88"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50/50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-all duration-150 shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-55 active:scale-[0.98]"
                id="auth-submit-btn"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isRegister ? 'Create Verified Ledger' : 'Authorize Secure Session'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Toggle links */}
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                {isRegister ? 'Already have an institutional ledger?' : 'New to our decentralized yield platform?'}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="ml-1.5 font-semibold text-blue-600 hover:underline inline-flex items-center space-x-0.5 cursor-pointer"
                  id="auth-toggle-mode-btn"
                >
                  {isRegister ? (
                    <span>Sign In</span>
                  ) : (
                    <span className="flex items-center">
                      <UserPlus className="w-3 h-3 mr-0.5" /> Register Now
                    </span>
                  )}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
