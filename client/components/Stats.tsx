/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Globe2, Landmark, History, BadgePercent } from 'lucide-react';
import { platformStats } from '../utils/landingData.ts';

const getStatIcon = (id: string) => {
  switch (id) {
    case 'members':
      return Users;
    case 'countries':
      return Globe2;
    case 'assets':
      return Landmark;
    case 'transactions':
      return History;
    case 'liquidity':
      return BadgePercent;
    default:
      return TrendingUp;
  }
};

export const Stats: React.FC = () => {
  return (
    <section id="statistics-section" className="py-16 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics Grid */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-5 gap-8 bg-white border border-gray-100/80 rounded-[32px] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.02)]"
          id="statistics-display-grid"
          role="region"
          aria-label="Platform Statistics Overview"
        >
          {platformStats.map((stat, idx) => {
            const Icon = getStatIcon(stat.id);
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="text-center space-y-2 flex flex-col justify-between items-center group"
                id={`stat-card-${stat.id}`}
              >
                {/* Visual Icon Accent */}
                <div className="p-2.5 rounded-2xl bg-gray-50 border border-gray-100 text-blue-600 shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Big numeric display */}
                <div className="space-y-1 text-center">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-gray-950 tracking-tight block">
                    {stat.value}
                  </span>
                  
                  {/* Human Label */}
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 block leading-tight max-w-[130px] mx-auto font-mono">
                    {stat.label}
                  </span>
                </div>

                {/* Secure Badge Marker */}
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs" title="Reserve Sync Live" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Stats;
