/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Activity, TrendingUp, Cpu, Globe } from 'lucide-react';
import { companyInfo } from '../utils/landingData.ts';
import { Button, GlassCard } from './ui/index.ts';

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onNavigateToSection }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/20 via-white to-gray-50/30"
    >
      {/* Subtle Background Art Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-50/40 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left Block */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100/60 rounded-full px-3.5 py-1 text-xs text-blue-700 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{companyInfo.tagline}</span>
            </motion.div>

            {/* Giant Enterprise Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-gray-950 tracking-tight leading-[1.08] sm:leading-none"
              id="hero-headline"
            >
              Bridging Secure Trust with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
                Ledger Yields
              </span>
            </motion.h1>

            {/* Professional Financial Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              id="hero-description"
            >
              {companyInfo.description} Securely deposit capital, audit real-time reserve balances, 
              and experience automated passive reward structures tailored for institutional and private investors.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-actions"
            >
              <Button
                onClick={() => onOpenAuth('register')}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                id="hero-cta-start"
              >
                Start Investing
              </Button>
              
              <Button
                onClick={() => onOpenAuth('login')}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                id="hero-cta-vault"
              >
                Access Security Vault
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-gray-100 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-xs font-mono text-gray-400 font-bold"
              id="hero-trust-badges"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Full Reserves</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-blue-500" />
                <span>SOC2 Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>Global Multi-Node</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Illustration Block Right Side */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-sm sm:max-w-md"
            >
              <GlassCard hoverEffect={true} id="hero-mockup-card">
                {/* Premium Card Header */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-50 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-400/80" />
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-mono rounded-full font-bold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Ledger Active</span>
                  </div>
                </div>

                {/* Simulated Balance Tracker */}
                <div className="space-y-4">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                      Total Asset Valuation
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-display font-extrabold text-gray-950 tracking-tight">$1,482,504</span>
                      <span className="text-xs font-semibold text-emerald-600 font-mono flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +22.4%
                      </span>
                    </div>
                  </div>

                  {/* Mini Graph Chart Simulation */}
                  <div className="h-32 bg-gray-50/50 rounded-2xl border border-gray-100 p-4 relative flex items-end overflow-hidden">
                    <div className="absolute inset-0 p-4 pointer-events-none flex items-center justify-between">
                      <div className="text-[9px] font-mono text-gray-300 font-semibold uppercase">Performance Timeline</div>
                      <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                    </div>
                    {/* Visual wave lines simulating chart */}
                    <svg className="w-full h-16 text-blue-600" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path
                        d="M0,15 Q15,8 30,12 T60,5 T90,2 T100,5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M0,15 Q15,8 30,12 T60,5 T90,2 T100,5 L100,20 L0,20 Z"
                        fill="url(#blue-gradient)"
                        opacity="0.08"
                      />
                      <defs>
                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Stat details row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-gray-50/60 rounded-2xl border border-gray-100 text-left">
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-semibold block">Yield Rate</span>
                      <span className="text-sm font-bold text-gray-950 block">1.65% Daily</span>
                    </div>
                    <div className="p-3 bg-gray-50/60 rounded-2xl border border-gray-100 text-left">
                      <span className="text-[9px] font-mono text-gray-400 uppercase font-semibold block">Compound Period</span>
                      <span className="text-sm font-bold text-gray-950 block">24 Hours</span>
                    </div>
                  </div>

                  {/* Simulated Ledger Logs */}
                  <div className="space-y-2 text-left pt-2">
                    <span className="text-[9px] font-mono text-gray-400 uppercase font-bold tracking-wider">
                      Recent Verified Payouts
                    </span>
                    <div className="p-2 bg-emerald-50/40 rounded-xl border border-emerald-100/50 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-800 font-bold">VIP Silver Reward</span>
                      <span className="text-emerald-600 font-bold">+$165.00 USD</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-xl border border-gray-100/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-600">Referral Commission</span>
                      <span className="text-gray-800 font-bold">+$42.50 USD</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Float Element: Decorative tag */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 p-3.5 bg-white/95 backdrop-blur-md border border-amber-100/80 shadow-[0_12px_36px_rgba(245,158,11,0.08)] rounded-2xl flex items-center space-x-2 z-20 pointer-events-none hidden sm:flex"
            >
              <div className="bg-amber-400 text-white p-1.5 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="text-[9px] font-mono text-amber-800 uppercase block font-bold">Active Reserves</span>
                <span className="text-xs font-bold text-gray-900 block">135% Backed</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
