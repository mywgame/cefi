/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, LogIn, Coins, CalendarDays, Users2, ShieldCheck, ArrowRight } from 'lucide-react';
import { timelineSteps } from '../utils/landingData.ts';

const getStepIcon = (step: number) => {
  switch (step) {
    case 1:
      return UserPlus;
    case 2:
      return LogIn;
    case 3:
      return Coins;
    case 4:
      return CalendarDays;
    case 5:
      return Users2;
    case 6:
      return ShieldCheck;
    default:
      return ShieldCheck;
  }
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background visual curves */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dashed bg-gray-100 -translate-y-1/2 hidden lg:block -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-widest block">
            Seamless Onboarding Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
            Your Wealth Journey in Six Steps
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
            Follow our clean, automated onboarding pipeline to establish secure assets and participate in our global referral yield matrix.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative" id="how-it-works-timeline">
          {timelineSteps.map((item, idx) => {
            const Icon = getStepIcon(item.step);
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col justify-between items-center group"
                id={`step-card-${item.step}`}
              >
                {/* Numeric Tag */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-0.5 rounded-full text-[10px] font-mono font-extrabold shadow-sm">
                  Step 0{item.step}
                </div>

                {/* Arrow visual for desktop connection (except last item) */}
                {item.step < 6 && (
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-gray-200 hidden lg:block z-20 pointer-events-none group-hover:text-blue-500 transition-colors">
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  {/* Icon Node */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Text descriptions */}
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-gray-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Minimalist marker at the bottom */}
                <div className="mt-4 w-1.5 h-1.5 rounded-full bg-blue-600/30 group-hover:bg-amber-400 group-hover:scale-125 transition-all" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
