/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';
import { Input, PasswordInput, ToggleSwitch } from '../ui/Inputs/index.tsx';
import { Badge } from '../ui/Feedback/index.tsx';
import { Lock, ShieldCheck, Key, Eye, HelpCircle } from 'lucide-react';

export const SecurityView: React.FC = () => {
  const [tfa, setTfa] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  return (
    <div className="space-y-6 text-left" id="security-view-tab">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Security Configurations Left */}
        <Card hoverEffect={true} className="lg:col-span-7 space-y-6">
          <div className="space-y-0.5 pb-4 border-b border-gray-100">
            <h3 className="text-sm font-display font-extrabold text-gray-950 tracking-tight">
              Cryptographic Safeguard Controls
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              Enable advanced multi-factor challenges and configure credential expiration parameters.
            </p>
          </div>

          <div className="space-y-5">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/60">
              <div className="space-y-0.5 text-left max-w-xs sm:max-w-md">
                <span className="text-xs font-bold text-gray-950 block">Two-Factor Authentication (2FA)</span>
                <span className="text-[10px] text-gray-400 font-sans block leading-relaxed">
                  Require a dynamic verification pin from Google Authenticator or custom security tokens before processing withdrawals.
                </span>
              </div>
              <ToggleSwitch checked={tfa} onChange={() => setTfa(!tfa)} />
            </div>

            {/* Biometrics Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/60">
              <div className="space-y-0.5 text-left max-w-xs sm:max-w-md">
                <span className="text-xs font-bold text-gray-950 block">Biometric Node Syncing</span>
                <span className="text-[10px] text-gray-400 font-sans block leading-relaxed">
                  Authenticate sessions instantly via mobile hardware keys (Passkeys / FaceID).
                </span>
              </div>
              <ToggleSwitch checked={biometric} onChange={() => setBiometric(!biometric)} />
            </div>

            {/* Session alerts Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/60">
              <div className="space-y-0.5 text-left max-w-xs sm:max-w-md">
                <span className="text-xs font-bold text-gray-950 block">Instant Session Email Alerts</span>
                <span className="text-[10px] text-gray-400 font-sans block leading-relaxed">
                  Transmit priority encrypted emails immediately whenever IP nodes are linked to this vault.
                </span>
              </div>
              <ToggleSwitch checked={sessionAlerts} onChange={() => setSessionAlerts(!sessionAlerts)} />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 flex items-center space-x-2 text-[10px] font-mono text-emerald-600 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>Vault Security Rank: Highest (A+ Tier Protected)</span>
          </div>
        </Card>

        {/* Change Credentials Right */}
        <div className="lg:col-span-5 space-y-6">
          <Card hoverEffect={true} className="space-y-4">
            <h4 className="text-sm font-display font-bold text-gray-950">Update Operator Password</h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Input your existing password and specify a strong uppercase-alphanumeric replacement key.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <PasswordInput label="Existing Credentials Key" placeholder="••••••••••••" required />
              <PasswordInput label="New Alpha-Numeric Key" placeholder="••••••••••••" required />
              <Button type="button" variant="primary" size="md" className="w-full">
                Seal New Password
              </Button>
            </form>
          </Card>

          <Card hoverEffect={true} className="p-5 bg-blue-50/20 border border-blue-100/50 text-left space-y-3">
            <div className="flex items-center space-x-2 text-blue-700">
              <Key className="w-4 h-4" />
              <h5 className="text-xs font-bold font-display">JWT Security Token Status</h5>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
              Your operator connection is synced under standard SHA-256 tokens. Tokens expire after 24h of inactivity to defend against side-jacking vectors.
            </p>
            <Badge variant="primary">Active SHA-256</Badge>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default SecurityView;
