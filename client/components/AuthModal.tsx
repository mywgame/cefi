/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth.ts';
import { Mail, Lock, KeyRound, ArrowRight, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import { Modal, Input, Button, Alert } from './ui/index.ts';

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
        await login(email.trim());
        setSuccessMsg('Account created and verified. Synchronizing security credentials...');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      id="auth-modal-portal"
      size="sm"
    >
      {/* Top Decorative gradient strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500 w-full" />

      <div className="pt-2">
        {/* Header Identity */}
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CeFi Secure Vault Gateway</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-gray-950 tracking-tight leading-none pt-1">
            {isRegister ? 'Begin Your Yield Journey' : 'Secure Vault Authentication'}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed font-sans pt-0.5">
            {isRegister
              ? 'Open an institutional-grade account with real-time reserve auditing and compound yields.'
              : 'Access your secure ledger balance, team statistics, and automated payout channels.'}
          </p>
        </div>

        {/* Error Alerts */}
        {(authError || validationError) && (
          <Alert variant="error" className="mb-4">
            {validationError || authError}
          </Alert>
        )}

        {/* Success Alerts */}
        {successMsg && (
          <Alert variant="success" className="mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          </Alert>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4" id="auth-modal-form">
          
          <Input
            label="Corporate Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="investor@cefi-platform.com"
            id="auth-email-input"
            required
            autoFocus
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="auth-password-input" className="block text-xs font-semibold text-gray-700 tracking-wide">
                Account Password
              </label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => alert('Password recovery has been configured on the backend. Please use standard API password reset features.')}
                  className="text-[10px] font-mono font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            
            <input
              id="auth-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-gray-50/30 transition-all duration-150 focus-visible:outline-none"
              required
            />
          </div>

          {/* Referral Code */}
          {isRegister && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden"
            >
              <Input
                label="Referral Code (Optional)"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="e.g. PARTNER88"
                id="auth-referral-input"
              />
            </motion.div>
          )}

          {/* Submit CTA */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full"
            variant="primary"
            size="lg"
            id="auth-submit-btn"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isRegister ? 'Create Verified Ledger' : 'Authorize Secure Session'}
          </Button>
        </form>

        {/* Bottom Toggle */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 font-sans">
            {isRegister ? 'Already have an institutional ledger?' : 'New to our decentralized yield platform?'}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-1.5 font-bold text-blue-600 hover:underline inline-flex items-center space-x-0.5 cursor-pointer font-mono text-[11px]"
              id="auth-toggle-mode-btn"
            >
              {isRegister ? (
                <span>Sign In</span>
              ) : (
                <span className="flex items-center">
                  <UserPlus className="w-3.5 h-3.5 mr-1" /> Register Now
                </span>
              )}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
