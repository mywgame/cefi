/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { User, Copy, Check, ShieldCheck, Mail, Calendar, Key } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';
import { Input } from '../ui/Inputs/index.tsx';
import { Badge } from '../ui/Feedback/index.tsx';

export const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralCode = 'CEFI-SILVER-9821X';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left" id="profile-view-tab">
      
      {/* Profile Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Details Card */}
        <Card hoverEffect={true} className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-display font-bold text-xl shadow-md shadow-blue-500/15">
                {user?.email ? user.email.slice(0, 2).toUpperCase() : 'CE'}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-display font-extrabold text-gray-950 tracking-tight">
                    {user?.email ? user.email.split('@')[0] : 'Institutional Client'}
                  </h3>
                  <Badge variant="amber">VIP Silver</Badge>
                </div>
                <p className="text-xs text-gray-500 font-sans flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {user?.email || 'unverified@cefi.platform'}
                </p>
              </div>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-gray-400 font-bold block uppercase">Account Authority</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center sm:justify-end mt-0.5">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" /> Authorized Operator
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Operator ID (Read Only)"
              value={user?.id || 'CEFI-9281'}
              readOnly
              className="bg-gray-50/70 border-gray-200 text-gray-500 font-mono"
            />
            <Input
              label="Authorization UID Key"
              value={user?.uid || 'UID-SIMULATED-JWT-9821-KEY'}
              readOnly
              className="bg-gray-50/70 border-gray-200 text-gray-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50 flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-gray-400 font-bold uppercase block">Enrollment Timestamp</span>
                <span className="text-xs font-bold text-gray-950 font-mono block">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026-06-27'} UTC
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50 flex items-start space-x-3">
              <Key className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-gray-400 font-bold uppercase block">Credential Status</span>
                <span className="text-xs font-bold text-gray-950 block">JWT Signature Synced</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Affiliate Copy Card */}
        <Card hoverEffect={true} className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
              Node Growth Controls
            </span>
            <h4 className="text-sm font-display font-extrabold text-gray-950 tracking-tight">
              Your Referral Hub
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Expand your network by distributing your secure multi-sig affiliate key to verified operators.
            </p>
          </div>

          {/* Core Code block */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-gray-950">{referralCode}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-100 cursor-pointer shadow-3xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="pt-4 border-t border-gray-50 text-[10px] font-mono text-gray-400">
            <span>Commission rate: 5% direct, 3% level B, 2% C, 1% D.</span>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ProfileView;
