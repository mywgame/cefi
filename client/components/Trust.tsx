/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { trustIndicators } from '../utils/landingData.ts';
import { SectionHeader } from './ui/index.ts';

// Helper to look up Lucide icons safely
const getIconComponent = (name: string): React.ComponentType<any> => {
  switch (name) {
    case 'Shield':
      return Icons.ShieldCheck;
    case 'Globe':
      return Icons.Globe;
    case 'CheckCircle':
      return Icons.CheckCircle2;
    case 'Headphones':
      return Icons.Headphones;
    case 'Eye':
      return Icons.Eye;
    case 'Cpu':
      return Icons.Cpu;
    default:
      return Icons.Info;
  }
};

export const Trust: React.FC = () => {
  return (
    <section id="trust-section" className="py-16 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Title Header */}
        <SectionHeader
          badge="Institutional Trust Pillars"
          title="Engineered for Security, Certified for Stability"
          description="Our infrastructure combines bank-grade cryptographic architecture with rigorous physical and digital compliance."
          className="mb-12"
        />

        {/* 6-Column Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="trust-indicator-grid" role="list">
          {trustIndicators.map((indicator, idx) => {
            const IconComponent = getIconComponent(indicator.iconName);
            return (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-gray-50/50 hover:bg-white rounded-3xl p-6 border border-gray-100/80 hover:border-blue-100/80 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.06)] transition-all duration-300 text-left group"
                id={`trust-${indicator.id}`}
                role="listitem"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon wrap */}
                  <div className="p-3 rounded-2xl bg-white border border-gray-100 text-blue-600 shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base">
                      {indicator.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {indicator.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Trust;
