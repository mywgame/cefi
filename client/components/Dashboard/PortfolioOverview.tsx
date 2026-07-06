/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';
import { FileDown, Info, Calendar } from 'lucide-react';

interface DatasetPoint {
  dayName: string;
  totalAssets: number;
  dailyYield: number;
  teamIncome: number;
  referralIncome: number;
  incentive: number;
}

export const PortfolioOverview: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState<number | null>(6); // Default hover on Day 7

  const datasets: DatasetPoint[] = [
    { dayName: 'Day 1', totalAssets: 420, dailyYield: 380, teamIncome: 280, referralIncome: 100, incentive: 40 },
    { dayName: 'Day 2', totalAssets: 500, dailyYield: 420, teamIncome: 325, referralIncome: 220, incentive: 110 },
    { dayName: 'Day 3', totalAssets: 480, dailyYield: 410, teamIncome: 300, referralIncome: 180, incentive: 90 },
    { dayName: 'Day 4', totalAssets: 650, dailyYield: 510, teamIncome: 430, referralIncome: 240, incentive: 120 },
    { dayName: 'Day 5', totalAssets: 700, dailyYield: 500, teamIncome: 425, referralIncome: 210, incentive: 105 },
    { dayName: 'Day 6', totalAssets: 820, dailyYield: 680, teamIncome: 540, referralIncome: 350, incentive: 150 },
    { dayName: 'Day 7', totalAssets: 930, dailyYield: 810, teamIncome: 650, referralIncome: 430, incentive: 125 },
  ];

  // Map data to SVG viewBox="0 0 700 320"
  // margins: left: 48, right: 12, top: 15, bottom: 30
  const width = 700;
  const height = 320;
  const paddingLeft = 48;
  const paddingRight = 12;
  const paddingTop = 15;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => {
    return paddingLeft + (index / (datasets.length - 1)) * chartWidth;
  };

  const getY = (value: number) => {
    // scale max value $1000 down to $0
    return paddingTop + chartHeight - (value / 1000) * chartHeight;
  };

  // Generate SVG path 'd' for a given key
  const getPathD = (key: keyof Omit<DatasetPoint, 'dayName'>) => {
    return datasets
      .map((d, i) => {
        const x = getX(i);
        const y = getY(d[key] as number);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ');
  };

  // Colors mapping matching mockup
  const linesConfig = [
    { key: 'totalAssets' as const, color: '#3b82f6', label: 'Total Assets' },
    { key: 'dailyYield' as const, color: '#10b981', label: 'Daily Yield' },
    { key: 'teamIncome' as const, color: '#8b5cf6', label: 'Team Income' },
    { key: 'referralIncome' as const, color: '#f97316', label: 'Referral Income' },
    { key: 'incentive' as const, color: '#ef4444', label: 'Incentive Income' },
  ];

  return (
    <Card id="metafirm-enterprise-analytics" className="border border-gray-100 bg-white p-6 rounded-3xl text-left flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
        <div className="space-y-1.5 w-full text-left">
          <h3 className="text-sm font-sans font-extrabold text-gray-950 uppercase tracking-tight">
            Earnings Overview <span className="text-gray-400 font-medium font-sans text-xs lowercase">(last 7 days)</span>
          </h3>
        </div>
      </div>

      {/* Primary Analytics Graph Canvas Container */}
      <div className="relative flex-grow min-h-[260px] bg-slate-50/30 rounded-2xl border border-gray-100/80 pt-4 pb-2 px-1 overflow-hidden">
        
        <div className="w-full h-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full font-mono text-[10px]" preserveAspectRatio="none">
            {/* Grid Horizontal Lines & Y Axis Labels */}
            {[0, 250, 500, 750, 1000].map((val) => {
              const y = getY(val);
              const label = val === 1000 ? '$1K' : `$${val}`;
              return (
                <g key={val} className="opacity-80">
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill="#334155"
                    className="font-sans font-bold text-[11px]"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Vertical lines for each day column */}
            {datasets.map((_, i) => {
              const x = getX(i);
              return (
                <line
                  key={i}
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={height - paddingBottom}
                  stroke="#f8fafc"
                  strokeWidth="1"
                />
              );
            })}

            {/* Render line paths */}
            {linesConfig.map((line) => (
              <g key={line.key}>
                <path
                  d={getPathD(line.key)}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
                
                {/* Dots at intersection points */}
                {datasets.map((point, pointIdx) => (
                  <circle
                    key={pointIdx}
                    cx={getX(pointIdx)}
                    cy={getY(point[line.key] as number)}
                    r={pointIdx === activeDayIndex ? '4.5' : '3'}
                    fill={line.color}
                    stroke="#ffffff"
                    strokeWidth={pointIdx === activeDayIndex ? '2' : '1'}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setActiveDayIndex(pointIdx)}
                  />
                ))}
              </g>
            ))}

            {/* Highlight line for the hovered day */}
            {activeDayIndex !== null && (
              <line
                x1={getX(activeDayIndex)}
                y1={paddingTop}
                x2={getX(activeDayIndex)}
                y2={height - paddingBottom}
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="pointer-events-none"
              />
            )}

            {/* X-Axis labels */}
            {datasets.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={height - 10}
                textAnchor="middle"
                fill="#334155"
                className="font-sans font-bold text-[11px] cursor-pointer"
                onMouseEnter={() => setActiveDayIndex(i)}
              >
                {d.dayName}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Bottom Row - Day 7 Performance */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider w-full">
        <span className="text-blue-600 font-extrabold">DAY 7 PERFORMANCE</span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
          <span>Assets: <strong className="text-slate-900 font-sans font-extrabold">$930</strong></span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span>Yield: <strong className="text-slate-900 font-sans font-extrabold">$810</strong></span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
          <span>Team: <strong className="text-slate-900 font-sans font-extrabold">$650</strong></span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f97316]" />
          <span>Referral: <strong className="text-slate-900 font-sans font-extrabold">$430</strong></span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <span>Incentive: <strong className="text-slate-900 font-sans font-extrabold">$125</strong></span>
        </span>
      </div>

    </Card>
  );
};

export default PortfolioOverview;
