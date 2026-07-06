/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Megaphone, Calendar, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';

interface AnnouncementItem {
  id: number;
  category: 'Audit' | 'Security' | 'Governance';
  title: string;
  excerpt: string;
  date: string;
}

export const Announcements: React.FC = () => {
  const announcements: AnnouncementItem[] = [
    {
      id: 1,
      category: 'Audit',
      title: 'Q2 Sovereign Reserve Verification Seal Issued',
      excerpt: 'Sovereign tier compliance sweeps successfully completed with a 135% active collateral buffer fully certified by lead external node partners.',
      date: 'June 27, 2025',
    },
    {
      id: 2,
      category: 'Security',
      title: 'Mandatory Ledger Shield Upgrade Sequence Complete',
      excerpt: 'All guardian ledgers upgraded across global nodes. Multisig threshold recalibration (88%) successfully applied.',
      date: 'June 24, 2025',
    },
    {
      id: 3,
      category: 'Governance',
      title: 'Institutional Governance Snapshot Finalized',
      excerpt: 'Voting snapshot for network treasury reallocation and validator incentive model concluded. New epoch cycle initiated.',
      date: 'June 21, 2025',
    },
  ];

  const getCatBadge = (category: 'Audit' | 'Security' | 'Governance') => {
    switch (category) {
      case 'Audit':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50/80 border border-blue-100 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Audit</span>
          </span>
        );
      case 'Security':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50/80 border border-rose-100 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Security</span>
          </span>
        );
      case 'Governance':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-violet-600 bg-violet-50/80 border border-violet-100 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>Governance</span>
          </span>
        );
    }
  };

  return (
    <Card id="announcements-card" className="border border-gray-100 text-left p-6 w-full bg-white shadow-2xs rounded-3xl">
      
      {/* Top Header Row with Title Block on Left and Badge + Button on Right */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-100/60 text-blue-600">
              <Megaphone className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-sans font-extrabold text-gray-900 tracking-wider uppercase">
              Corporate Bulletin Desk
            </h3>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            Keep track of corporate actions, network protocol developments, and structural smart contract sweeps.
          </p>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
            Archon Feed Active
          </span>
          <button className="px-3.5 py-1 text-[10px] font-sans font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-gray-200/80 rounded-full transition-all cursor-pointer">
            View all
          </button>
        </div>
      </div>

      {/* Main content split: 3-column Grid + Scroll Trigger arrow */}
      <div className="flex items-center gap-5 w-full">
        {/* The 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-grow">
          {announcements.map((item) => (
            <article
              key={item.id}
              className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-xs transition-all duration-300 flex flex-col justify-between min-h-[145px]"
            >
              <div className="space-y-3">
                {/* Tag & Date row */}
                <div className="flex items-center justify-between">
                  {getCatBadge(item.category)}
                  <span className="text-[10px] font-mono text-gray-400 font-bold flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {item.date}
                  </span>
                </div>

                {/* Announcement Title */}
                <h4 className="font-sans font-extrabold text-gray-950 text-xs leading-snug hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>

                {/* Excerpt */}
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Right Chevron next/scroll button */}
        <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:border-gray-900 hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all shrink-0 shadow-3xs cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </Card>
  );
};

export default Announcements;
