/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Eye, Map, Lightbulb, ShieldAlert } from 'lucide-react';
import { companyInfo } from '../utils/landingData.ts';

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
                <p className="text-[11px] text-gray-600 leading-normal">
                  Our core policies forbid unbacked asset-lending or leverage models. Your capital stays protected inside segregated ledger nodes.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Bento Grid Cards (Mission, Vision, etc.) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-bento-grid">
            
            {/* Card 1: Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 text-sm sm:text-base">Our Mission</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {companyInfo.mission}
              </p>
            </motion.div>

            {/* Card 2: Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Eye className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 text-sm sm:text-base">Our Vision</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {companyInfo.vision}
              </p>
            </motion.div>

            {/* Card 3: Financial Transparency */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 text-sm sm:text-base">Financial Transparency</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {companyInfo.transparencyPolicy}
              </p>
            </motion.div>

            {/* Card 4: Global Expansion & Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                <Map className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 text-sm sm:text-base">Global Expansion & Tech</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {companyInfo.globalExpansionPlan} {companyInfo.innovationFocus}
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
