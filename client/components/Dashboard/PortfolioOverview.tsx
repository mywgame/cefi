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
    { dayName: 'Day 1', totalAssets: 180, dailyYield: 140, teamIncome: 80, referralIncome: 50, incentive: 30 },
    { dayName: 'Day 2', totalAssets: 230, dailyYield: 180, teamIncome: 150, referralIncome: 100, incentive: 40 },
    { dayName: 'Day 3', totalAssets: 210, dailyYield: 160, teamIncome: 120, referralIncome: 80, incentive: 30 },
    { dayName: 'Day 4', totalAssets: 280, dailyYield: 230, teamIncome: 190, referralIncome: 120, incentive: 50 },
    { dayName: 'Day 5', totalAssets: 320, dailyYield: 220, teamIncome: 180, referralIncome: 110, incentive: 40 },
    { dayName: 'Day 6', totalAssets: 390, dailyYield: 300, teamIncome: 240, referralIncome: 150, incentive: 60 },
    { dayName: 'Day 7', totalAssets: 460, dailyYield: 380, teamIncome: 310, referralIncome: 180, incentive: 50 },
  ];

  // Map data to SVG viewBox="0 0 700 320"
  // margins: left: 60, right: 20, top: 20, bottom: 40
  const width = 700;
  const height = 320;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => {
    return paddingLeft + (index / (datasets.length - 1)) * chartWidth;
  };

  const getY = (value: number) => {
    // scale max value $500 down to $0
    return paddingTop + chartHeight - (value / 500) * chartHeight;
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-violet-600 font-bold uppercase tracking-widest block">
            MetaFirm Institutional Analytics
          </span>
          <h3 className="text-sm font-display font-black text-gray-950 uppercase tracking-tight">
            Earnings Overview <span className="text-gray-400 font-medium font-sans text-xs lowercase">(last 7 days)</span>
          </h3>
        </div>
        
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<FileDown className="w-3.5 h-3.5 text-violet-600" />}
          className="text-xs font-bold border border-gray-100 hover:bg-gray-50/80 rounded-xl"
        >
          Download Audit Log
        </Button>
      </div>

      {/* Primary Analytics Graph Canvas Container */}
      <div className="relative flex-grow min-h-[260px] bg-slate-50/30 rounded-2xl border border-gray-100/80 p-4 overflow-hidden">
        
        {/* Dynamic Tooltip Hover Display */}
        {activeDayIndex !== null && (
          <div className="absolute top-3 left-4 bg-white/95 backdrop-blur-md border border-gray-100 p-2.5 rounded-xl shadow-lg z-10 text-[10px] space-y-1 font-sans">
            <p className="font-bold text-gray-950 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-violet-500" /> {datasets[activeDayIndex].dayName} Performance
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-gray-600">
              {linesConfig.map((line) => (
                <div key={line.key} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line.color }} />
                  <span className="font-mono text-gray-500">{line.label}:</span>
                  <span className="font-bold text-gray-950">${datasets[activeDayIndex][line.key]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full h-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full font-mono text-[10px]" preserveAspectRatio="none">
            {/* Grid Horizontal Lines & Y Axis Labels */}
            {[0, 100, 200, 300, 400, 500].map((val) => {
              const y = getY(val);
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
                    x={paddingLeft - 12}
                    y={y + 3}
                    textAnchor="end"
                    fill="#94a3b8"
                    className="font-bold text-[9px]"
                  >
                    ${val}
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
                y={height - 12}
                textAnchor="middle"
                fill="#94a3b8"
                className="font-bold text-[9px] cursor-pointer"
                onMouseEnter={() => setActiveDayIndex(i)}
              >
                {d.dayName}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Horizontal Legend Layout directly matching reference */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-gray-500 font-bold">
        <div className="flex flex-wrap items-center gap-4">
          {linesConfig.map((line) => (
            <div key={line.key} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
              <span className="text-gray-600">{line.label}</span>
            </div>
          ))}
        </div>
        <span className="text-[9px] text-gray-400 uppercase tracking-wide">
          Real-Time Ledger Feed
        </span>
      </div>

    </Card>
  );
};

export default PortfolioOverview;
