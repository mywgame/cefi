/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth.ts';
import { ArrowRight, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import { Modal, Input, Button, Alert } from './ui/index.ts';
import logoImg from '../../assets/images/branding/logo.png';

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France", "Japan", "China", "Brazil",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cambodia", "Cameroon", "Central African Republic", "Chad", "Chile", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "Gabon",
  "Gambia", "Georgia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe"
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, loading, error: authError } = useAuth();
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  
  // Input fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('United States');
  const [countryCode, setCountryCode] = useState('+1');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMsg(null);

    if (isRegister) {
      if (!fullName.trim()) {
        setValidationError('Please enter your Full Name.');
        return;
      }
      if (!username.trim()) {
        setValidationError('Please enter a Username.');
        return;
      }
      if (!email.trim()) {
        setValidationError('Please enter your Email Address.');
        return;
      }
      if (!mobileNumber.trim()) {
        setValidationError('Please enter your Mobile Number.');
        return;
      }
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match.');
        return;
      }
      
      // Password validation rules
      if (password.length < 8) {
        setValidationError('Password must be at least 8 characters long.');
        return;
      }
      if (!/[A-Z]/.test(password)) {
        setValidationError('Password must contain at least one uppercase letter.');
        return;
      }
      if (!/[a-z]/.test(password)) {
        setValidationError('Password must contain at least one lowercase letter.');
        return;
      }
      if (!/\d/.test(password)) {
        setValidationError('Password must contain at least one number.');
        return;
      }
      if (!/[@$!%*?&()_+\-=\[\]{};':"\\|,.<>\/?#^]/.test(password)) {
        setValidationError('Password must contain at least one special character (e.g., ! @ # $ % & *).');
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setValidationError('Please enter both your Username/Email and password.');
        return;
      }
    }

    try {
      if (isRegister) {
        const fullPhone = `${countryCode} ${mobileNumber.trim()}`;
        await login(email.trim(), password, true, referralCode.trim() || undefined, {
          name: fullName.trim(),
          username: username.trim(),
          phone: fullPhone,
          country,
        });
        setSuccessMsg('Account created and verified. Synchronizing security credentials...');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        await login(email.trim(), password, false);
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
      size={isRegister ? "md" : "sm"}
    >
      {/* Top Decorative gradient strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500 w-full" />

      <div className="pt-2">
        {/* Logo */}
        <div className="mb-4 flex justify-start">
          <img
            src={logoImg}
            alt="MetaFirm Logo"
            referrerPolicy="no-referrer"
            className="h-10 object-contain animate-fade-in"
          />
        </div>

        {/* Header Identity */}
        <div className="mb-4 space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MetaFirm Secure Vault Gateway</span>
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
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1" id="auth-modal-form">
          
          {isRegister ? (
            /* Signup Grid Layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Input
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                id="auth-name-input"
                required
              />

              <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                id="auth-username-input"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investor@metafirm.io"
                id="auth-email-input"
                required
              />

              {/* Country Selector */}
              <div className="space-y-1.5">
                <label htmlFor="auth-country-select" className="block text-xs font-semibold text-gray-700 tracking-wide">
                  Country
                </label>
                <select
                  id="auth-country-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-gray-50/30 transition-all duration-150 focus-visible:outline-none"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Country Code + Mobile Number */}
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="auth-mobile-input" className="block text-xs font-semibold text-gray-700 tracking-wide">
                  Mobile Number
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="auth-country-code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    placeholder="+1"
                    className="w-20 px-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-gray-50/30 text-center transition-all duration-150 focus-visible:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    id="auth-mobile-input"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="555-0199"
                    className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-gray-50/30 transition-all duration-150 focus-visible:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="auth-password-input" className="block text-xs font-semibold text-gray-700 tracking-wide">
                  Password
                </label>
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

              <div className="space-y-1.5">
                <label htmlFor="auth-confirm-password-input" className="block text-xs font-semibold text-gray-700 tracking-wide">
                  Confirm Password
                </label>
                <input
                  id="auth-confirm-password-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-gray-50/30 transition-all duration-150 focus-visible:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Referral Code (Optional)"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="e.g. PARTNER88"
                  id="auth-referral-input"
                />
              </div>

            </div>
          ) : (
            /* Login Layout */
            <div className="space-y-4">
              <Input
                label="Username or Email Address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username or email address"
                id="auth-email-input"
                required
                autoFocus
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="auth-password-input" className="block text-xs font-semibold text-gray-700 tracking-wide">
                    Account Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password recovery has been configured on the backend. Please use standard API password reset features.')}
                    className="text-[10px] font-mono font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
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
            </div>
          )}

          {/* Submit CTA */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full mt-2"
            variant="primary"
            size="lg"
            id="auth-submit-btn"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isRegister ? 'Create Verified Ledger' : 'Authorize Secure Session'}
          </Button>
        </form>

        {/* Bottom Toggle */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
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
