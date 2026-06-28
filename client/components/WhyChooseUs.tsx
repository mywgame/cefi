/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { featureCards } from '../utils/landingData.ts';
import { SectionHeader } from './ui/index.ts';

// Helper to look up Lucide icons safely
const getIconComponent = (name: string): React.ComponentType<any> => {
  switch (name) {
    case 'Lock':
      return Icons.Lock;
    case 'Coins':
      return Icons.Coins;
    case 'ArrowUpRight':
      return Icons.ArrowUpRight;
    case 'Users':
      return Icons.Users;
    case 'Map':
      return Icons.Map;
    case 'Layout':
      return Icons.Layout;
    case 'TrendingUp':
      return Icons.TrendingUp;
    case 'Server':
      return Icons.Server;
    default:
      return Icons.HelpCircle;
  }
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="benefits" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Competitive Edge & Benefits"
          title="An Uncompromising Investment Ledger"
          description="Our technology stack and commercial frameworks ensure that capital security aligns perfectly with scalable, consistent passive yield structures."
          className="mb-16"
        />

        {/* Dynamic Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="benefits-card-grid" role="list">
          {featureCards.map((card, idx) => {
            const IconComponent = getIconComponent(card.iconName);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-gray-50/40 hover:bg-white rounded-[32px] p-6 border border-gray-100/80 hover:border-blue-100/80 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.06)] transition-all duration-300 text-left flex flex-col justify-between group"
                id={`benefit-${card.id}`}
                role="listitem"
              >
                <div className="space-y-4">
                  {/* Decorative Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100/80 text-blue-600 flex items-center justify-center shadow-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  {/* Text details */}
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-gray-950 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100/50 flex items-center text-[10px] font-mono font-bold text-gray-400 group-hover:text-blue-600 transition-colors duration-250">
                  <span>Audit Grade Active</span>
                  <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-1.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
