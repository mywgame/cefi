/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Github, Linkedin, Twitter, ArrowUpRight, HelpCircle } from 'lucide-react';
import { companyInfo } from '../utils/landingData.ts';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'About Company', id: 'about' },
    { label: 'Platform Benefits', id: 'benefits' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'VIP Preview Tiers', id: 'vip-preview' },
    { label: 'Security Protocols', id: 'security' },
    { label: 'Frequently Asked Questions', id: 'faq' },
    { label: 'Corporate Desk Support', id: 'contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100/80 pt-16 pb-8 text-left" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-50 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-amber-300" />
              </div>
              <span className="font-display font-bold text-base tracking-tight text-gray-900">
                CeFi Platform
              </span>
            </div>
            
            <p className="text-[11px] sm:text-xs text-gray-500 max-w-sm leading-relaxed font-sans">
              An institutional-grade digital wealth aggregator bridging standard financial asset custody with high-performance automated rewards.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-gray-400">
              <a href="#" className="p-2 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
              Navigation Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigateToSection(link.id)}
                  className="text-left text-xs text-gray-500 hover:text-blue-600 hover:underline transition-all cursor-pointer font-sans"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Regulatory Note / Legals Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
              Legal Agreements
            </h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 font-sans cursor-pointer">
                <span>Terms of Use Envelope</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="#" className="inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 font-sans cursor-pointer">
                <span>Platform Privacy Policy</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="#" className="inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 font-sans cursor-pointer">
                <span>Reserve Transparency File</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="#" className="inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 font-sans cursor-pointer">
                <span>Risk Disclosure Letter</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & License Footer */}
        <div className="space-y-4">
          <p className="text-[9px] text-gray-400 leading-normal font-sans text-center max-w-5xl mx-auto">
            Disclaimer: Digital asset investments contain substantial volatility and risk of capital impairment. Payout rates fluctuate based on overall system reserves and smart contract allocation models. Past performance metrics are not a promise of upcoming daily yields. CeFi Platform is not a licensed commercial bank or depository broker-dealer in all operational regions. Be sure to review complete region-specific legal disclosures before transferring funds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-50 text-[10px] font-mono text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full-Reserve Audits Certified Active (2026)</span>
            </div>
            <div>
              <span>© 2026 {companyInfo.name} Ltd. All Rights Reserved.</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
