/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { vipTiers } from '../utils/landingData.ts';

interface VipPreviewProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const VipPreview: React.FC<VipPreviewProps> = ({ onOpenAuth }) => {
  return (
    <section id="vip-preview" className="py-20 lg:py-28 bg-gray-50/50 border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-widest block">
            Exclusive Capital Tiers
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
            Tiered VIP Yield Accounts
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
            Maximize your passive performance. Scale your security limits and daily yield multipliers by advancing 
            your digital capital reserves.
          </p>
        </div>

        {/* Horizontal scroll on mobile, flex grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6" id="vip-cards-container">
          {vipTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-200 relative group text-left ${
                tier.popular
                  ? 'border-amber-400 shadow-xl shadow-amber-500/5 ring-1 ring-amber-400'
                  : 'border-gray-100 shadow-sm hover:shadow-md'
              }`}
              id={`vip-tier-card-${tier.id}`}
            >
              {/* Highlight Ribbon for Popular card */}
              {tier.popular && (
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold shadow-sm flex items-center space-x-1 uppercase tracking-wider animate-pulse">
                  <Star className="w-2.5 h-2.5 text-amber-200 fill-amber-200" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Tier Name */}
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  {tier.name.split(' ')[1] || 'VIP'} Category
                </span>
                <h3 className="font-display font-bold text-gray-950 mt-1 mb-3 text-base sm:text-lg">
                  {tier.name}
                </h3>

                {/* Investment Range */}
                <div className="py-4 border-y border-gray-50/80 mb-4 space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 block font-bold">Min Investment</span>
                  <span className="text-2xl font-display font-extrabold text-gray-950 block">
                    {tier.minInvestment}
                  </span>
                </div>

                {/* Daily Reward Rate Accent */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-gray-400 block font-bold">Reward Velocity</span>
                  <span className="text-lg font-display font-bold text-blue-600">
                    {tier.rewardRate}
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-2.5 text-xs text-gray-500 mb-6 font-sans">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight text-[11px]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Open Auth Trigger button */}
              <button
                onClick={() => onOpenAuth('register')}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-center ${
                  tier.popular
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/10'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
                id={`vip-card-cta-${tier.id}`}
              >
                <span>Select {tier.name.split(' ')[1]}</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Small Trust Footer inside VIP section */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-gray-400 font-mono flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Yield payouts are subject to automatic smart reserve calculations for sustained growth.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default VipPreview;
