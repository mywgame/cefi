/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqItems } from '../utils/landingData.ts';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq1'); // Default open first faq

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-widest block">
            Frequently Asked Inquiries
          </span>
          <h2 className="text-3xl font-display font-extrabold text-gray-950 tracking-tight leading-none">
            Platform Operations & Answers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto font-sans">
            Have questions about ledger architecture, investment minimums, or yields? Read our comprehensive guidelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-600/30 bg-blue-50/10 shadow-xs'
                    : 'border-gray-100 bg-gray-50/30 hover:bg-gray-50/60'
                }`}
                id={`faq-item-${item.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="font-display font-bold text-gray-950 text-xs sm:text-sm md:text-base tracking-tight leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-1 bg-white rounded-lg border border-gray-100 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600 border-blue-100' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-gray-50 text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
