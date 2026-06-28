/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { securityHighlights } from '../utils/landingData.ts';

const getSecurityIcon = (name: string): React.ComponentType<any> => {
  switch (name) {
    case 'Fingerprint':
      return Icons.Fingerprint;
    case 'ServerCrash':
      return Icons.ServerCrash;
    case 'Activity':
      return Icons.Activity;
    case 'Eye':
      return Icons.Eye;
    case 'ShieldAlert':
      return Icons.ShieldAlert;
    default:
      return Icons.Shield;
  }
};

export const Security: React.FC = () => {
  return (
    <section id="security" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-widest block">
              Cryptographic Safeguards
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
              Zero-Trust Security Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              Our financial platform is engineered with defensive security layers at every level of the protocol stack. 
              We protect both client sessions and core systems from extraction and vector attacks.
            </p>
          </div>

          {/* Secure Audit Certificate visual representation */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="bg-blue-600 text-white rounded-3xl p-6 max-w-sm w-full shadow-lg shadow-blue-500/15 relative overflow-hidden text-left border border-blue-500/30">
              {/* Overlay art */}
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Icons.Shield className="w-40 h-40" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Icons.Award className="w-5 h-5 text-amber-300" />
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-blue-100">Audit Status: A+ Rated</span>
                </div>
                <h4 className="text-lg font-display font-bold leading-snug">Continuous Real-time Ledger Verification</h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Third-party cybersecurity leaders perform weekly automated penetration sweeps and constant integrity monitoring of our Postgres databases.
                </p>
                <div className="pt-2 flex items-center space-x-3 border-t border-blue-500/50 text-[10px] font-mono text-blue-200">
                  <div className="flex items-center space-x-1">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SSL/TLS 1.3 Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AES-256 Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="security-pillar-grid">
          {securityHighlights.map((pillar, idx) => {
            const Icon = getSecurityIcon(pillar.iconName);
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow text-left space-y-4"
                id={`security-${pillar.id}`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-semibold text-gray-950 text-sm sm:text-base">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Security;
