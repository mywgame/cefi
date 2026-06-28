/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { faqItems } from '../utils/landingData.ts';
import { SectionHeader, Accordion } from './ui/index.ts';

export const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Frequently Asked Inquiries"
          title="Platform Operations & Answers"
          description="Have questions about ledger architecture, investment minimums, or yields? Read our comprehensive guidelines."
          className="mb-16"
        />

        {/* Accordion List */}
        <Accordion items={faqItems} className="space-y-4" />

      </div>
    </section>
  );
};

export default Faq;
