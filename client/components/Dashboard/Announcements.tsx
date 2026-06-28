/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Megaphone, Calendar, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';

interface AnnouncementItem {
  id: number;
  category: 'Audit' | 'System' | 'Release' | 'Security';
  title: string;
  excerpt: string;
  date: string;
  important?: boolean;
}

export const Announcements: React.FC = () => {
  const announcements: AnnouncementItem[] = [
    {
      id: 1,
      category: 'Audit',
      title: 'Q2 Sovereign Reserve Verification Seal Issued',
      excerpt: 'Sovereign tier compliance sweeps successfully completed with a 135% active collateral buffer fully certified by lead external node partners.',
      date: 'June 27, 2026',
      important: true,
    },
    {
      id: 2,
      category: 'Security',
      title: 'Mandatory Ledger Shield Upgrade Sequence Complete',
      excerpt: 'New multi-sig hardware modules successfully deployed across all regional network gateway routers. API key access tokens auto-refreshed.',
      date: 'June 24, 2026',
      important: false,
    },
    {
      id: 3,
      category: 'Release',
      title: 'VIP Silver Multiplier Boost Enacted',
      excerpt: 'Effective immediately, VIP Silver accounts benefit from a daily yield velocity bump from 1.55% to 1.65% with auto-compounding active.',
      date: 'June 20, 2026',
      important: false,
    },
    {
      id: 4,
      category: 'System',
      title: 'PostgreSQL Database Pooling Optimizer Activated',
      excerpt: 'Drizzle ORM query buffers fully optimized across our scalable backend clusters to support near-instant ledger index queries.',
      date: 'June 18, 2026',
      important: false,
    },
  ];

  // Resolve visual categories indicators
  const getCatBadge = (category: string) => {
    switch (category) {
      case 'Audit':
        return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'Security':
        return 'bg-red-50 text-red-700 border border-red-100';
      case 'Release':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-100';
    }
  };

  return (
    <Card hoverEffect={true} id="announcements-card" className="border border-gray-100 text-left h-full flex flex-col justify-between">
      
      {/* Header */}
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Megaphone className="w-4 h-4 text-blue-600 animate-bounce" />
            </div>
            <h3 className="text-base font-display font-extrabold text-gray-950 tracking-tight">
              Corporate Bulletin Desk
            </h3>
          </div>
          <span className="text-[9px] font-mono text-gray-400 font-bold uppercase">Admin Feed Active</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed font-sans">
          Keep track of corporate actions, network protocol developments, and structural smart contract sweeps.
        </p>
      </div>

      {/* Scrollable list content */}
      <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 flex-grow" role="feed">
        {announcements.map((item) => (
          <article
            key={item.id}
            className={`p-3.5 rounded-2xl border transition-all text-left relative group ${
              item.important 
                ? 'bg-amber-50/20 border-amber-200/50 hover:border-amber-400' 
                : 'bg-white border-gray-50 hover:border-blue-100 hover:bg-gray-50/30'
            }`}
          >
            {/* Highlight ribbon for vital releases */}
            {item.important && (
              <span className="absolute -top-2.5 left-4 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wide shadow-2xs flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5 animate-spin text-amber-200" />
                <span>Critical Bulletin</span>
              </span>
            )}

            <div className="space-y-2 pt-1.5">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-wider ${getCatBadge(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-[9px] font-mono text-gray-400 font-semibold flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> {item.date}
                </span>
              </div>

              <h4 className="font-display font-bold text-gray-950 text-xs group-hover:text-blue-600 transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                {item.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom control */}
      <button className="mt-5 pt-3.5 border-t border-gray-50 flex items-center justify-between text-[10px] font-mono font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer w-full text-left">
        <span>Request Archive Logs</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

    </Card>
  );
};

export default Announcements;
