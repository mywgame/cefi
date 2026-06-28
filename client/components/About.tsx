/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Eye, Map, ShieldAlert } from 'lucide-react';
import { companyInfo } from '../utils/landingData.ts';
import { InfoCard } from './ui/index.ts';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Core Corporate Thesis Statement */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-widest block">
              Corporate Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
              A Secure Standard in Centered Assets
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              As decentralized ledgers continue to reshape the global liquidity flow, institutional investors require 
              a bridge of supreme operational compliance. Our company combines traditional asset controls with high-fidelity 
              yield matching.
            </p>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-left flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-amber-800 uppercase block">Reserve Declaration</span>
                <p className="text-[11px] text-gray-600 leading-normal font-sans">
                  Our core policies forbid unbacked asset-lending or leverage models. Your capital stays protected inside segregated ledger nodes.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Bento Grid Cards (Mission, Vision, etc.) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-bento-grid" role="list">
            
            {/* Card 1: Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              role="listitem"
            >
              <InfoCard
                title="Our Mission"
                icon={<Compass className="w-5 h-5" />}
                className="h-full"
              >
                {companyInfo.mission}
              </InfoCard>
            </motion.div>

            {/* Card 2: Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              role="listitem"
            >
              <InfoCard
                title="Our Vision"
                icon={<Eye className="w-5 h-5" />}
                className="h-full"
              >
                {companyInfo.vision}
              </InfoCard>
            </motion.div>

            {/* Card 3: Financial Transparency */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.15 }}
              role="listitem"
            >
              <InfoCard
                title="Financial Transparency"
                icon={<ShieldAlert className="w-5 h-5" />}
                badge="Policy"
                badgeVariant="emerald"
                className="h-full"
              >
                {companyInfo.transparencyPolicy}
              </InfoCard>
            </motion.div>

            {/* Card 4: Global Expansion & Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.2 }}
              role="listitem"
            >
              <InfoCard
                title="Global Expansion & Tech"
                icon={<Map className="w-5 h-5" />}
                badge="Innovation"
                badgeVariant="amber"
                className="h-full"
              >
                {companyInfo.globalExpansionPlan} {companyInfo.innovationFocus}
              </InfoCard>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
