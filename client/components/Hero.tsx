/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Cpu, Globe } from 'lucide-react';
import { companyInfo } from '../utils/landingData.ts';
import { Button, GlassCard } from './ui/index.ts';
import heroBg from '../../assets/hero-background.mp4';

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onNavigateToSection }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/20 via-white to-gray-50/30 isolate"
    >
      {/* Background Video */}
      <video
        src={heroBg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Subtle Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/12 pointer-events-none z-10" />

      {/* Subtle Background Art Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full filter blur-[120px] pointer-events-none z-5 animate-pulse duration-10000" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-50/40 rounded-full filter blur-[100px] pointer-events-none z-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
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

        </div>
      </div>
    </section>
  );
};

export default Hero;
