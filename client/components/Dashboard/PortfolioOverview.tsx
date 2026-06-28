/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TrendingUp, Activity, BarChart3, Calendar, FileDown } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';

type AnalyticsTab = 'growth' | 'income' | 'deposits' | 'withdrawals';

export const PortfolioOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('growth');

  const tabs = [
    { id: 'growth' as AnalyticsTab, label: 'Asset Growth' },
    { id: 'income' as AnalyticsTab, label: 'Income Trend' },
    { id: 'deposits' as AnalyticsTab, label: 'Deposit History' },
    { id: 'withdrawals' as AnalyticsTab, label: 'Withdrawal History' },
  ];

  // Helper to render responsive mockup SVGs based on active tab
  const renderMockupChart = () => {
    switch (activeTab) {
      case 'growth':
        return (
          <svg className="w-full h-full text-blue-600" viewBox="0 0 100 35" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growth-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="5" x2="100" y2="5" stroke="#f3f4f6" strokeWidth="0.2" />
            <line x1="0" y1="15" x2="100" y2="15" stroke="#f3f4f6" strokeWidth="0.2" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.2" />
            {/* Area Path */}
            <path
              d="M0,30 L10,28 L20,29 L30,22 L40,24 L50,15 L60,18 L70,12 L80,10 L90,6 L100,2 L100,35 L0,35 Z"
              fill="url(#growth-grad)"
            />
            {/* Line Path */}
            <path
              d="M0,30 Q10,27 20,29 T40,23 T60,17 T80,11 T100,2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Interactive dots */}
            <circle cx="60" cy="17" r="1.5" fill="#2563eb" stroke="#ffffff" strokeWidth="0.5" className="animate-pulse" />
            <circle cx="100" cy="2" r="1.5" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
          </svg>
        );
      case 'income':
        return (
          <svg className="w-full h-full text-emerald-600" viewBox="0 0 100 35" preserveAspectRatio="none">
            <defs>
              <linearGradient id="income-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="#f3f4f6" strokeWidth="0.2" />
            <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.2" />
            {/* Area Path */}
            <path
              d="M0,25 Q15,32 30,18 T60,15 T90,8 T100,5 L100,35 L0,35 Z"
              fill="url(#income-grad)"
            />
            {/* Line Path */}
            <path
              d="M0,25 Q15,32 30,18 T60,15 T90,8 T100,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="90" cy="8" r="1.5" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
          </svg>
        );
      case 'deposits':
        return (
          <div className="w-full h-full flex items-end justify-between px-2 pt-6">
            {/* Visual Bars Mock */}
            {[45, 60, 30, 80, 50, 75, 90, 40, 85, 100, 65, 80].map((h, i) => (
              <div key={i} className="flex-grow mx-1 flex flex-col items-center group">
                <div 
                  className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-md transition-all duration-300 relative"
                  style={{ height: `${h * 0.7}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-semibold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap pointer-events-none font-mono">
                    ${(h * 1500).toLocaleString()}
                  </div>
                </div>
                <span className="text-[7px] font-mono text-gray-400 mt-2">M{i+1}</span>
              </div>
            ))}
          </div>
        );
      case 'withdrawals':
        return (
          <div className="w-full h-full flex items-end justify-between px-2 pt-6">
            {/* Visual Bars Mock */}
            {[20, 15, 35, 10, 40, 25, 15, 30, 10, 50, 35, 20].map((h, i) => (
              <div key={i} className="flex-grow mx-1 flex flex-col items-center group">
                <div 
                  className="w-full bg-red-100 hover:bg-red-500 rounded-t-md transition-all duration-300 relative"
                  style={{ height: `${h * 0.7}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-semibold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap pointer-events-none font-mono">
                    -${(h * 800).toLocaleString()}
                  </div>
                </div>
                <span className="text-[7px] font-mono text-gray-400 mt-2">M{i+1}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card hoverEffect={true} id="portfolio-overview" className="border border-gray-100 text-left flex flex-col justify-between h-full">
      
      {/* Top Header Block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
            Performance Indexing
          </span>
          <h3 className="text-base font-display font-extrabold text-gray-950 tracking-tight">
            Portfolio Analytics Desk
          </h3>
        </div>
        
        {/* Quick Excel/Report trigger */}
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<FileDown className="w-3.5 h-3.5" />}
          className="text-xs"
        >
          Download ledger Audit
        </Button>
      </div>

      {/* Tabs list inside Card */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-gray-50 rounded-2xl border border-gray-100 mb-6" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`flex-grow sm:flex-none text-[10px] sm:text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer focus:outline-none ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm border border-gray-100'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Canvas Area */}
      <div className="h-56 bg-gray-50/40 rounded-2xl border border-gray-100/60 p-4 relative flex flex-col justify-between overflow-hidden">
        {/* Overlay info */}
        <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider pointer-events-none">
          <div className="flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Telemetry Nodes Live</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Interval: 1 Year</span>
            <span>UTC Clock</span>
          </div>
        </div>

        {/* Dynamic Graphic SVG Placeholders */}
        <div className="flex-grow flex items-center justify-center relative w-full pt-4">
          {renderMockupChart()}
        </div>

        {/* X-Axis labels */}
        <div className="flex items-center justify-between text-[8px] font-mono text-gray-400 font-bold pt-2 border-t border-gray-100/50">
          <span>Q1 2026</span>
          <span>Q2 2026</span>
          <span>Q3 2026</span>
          <span>Q4 2026</span>
        </div>
      </div>

      {/* Mini legends row */}
      <div className="mt-4 pt-4 border-t border-gray-50/80 flex items-center justify-between text-[10px] font-mono text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="font-semibold text-gray-500">Asset Balance</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-gray-500">Yield Multipliers</span>
          </div>
        </div>
        <span className="font-bold text-emerald-600 flex items-center">
          <TrendingUp className="w-3.5 h-3.5 mr-1" /> +14.6% Avg Rate
        </span>
      </div>

    </Card>
  );
};

export default PortfolioOverview;
