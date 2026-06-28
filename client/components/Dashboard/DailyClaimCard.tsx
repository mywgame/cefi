/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';

export const DailyClaimCard: React.FC = () => {
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimProgress, setClaimProgress] = useState(85); // 85% ready

  const handleClaim = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsClaimed(true);
      setClaimProgress(100);
    }, 1500);
  };

  // SVG parameters for circular progress
  const radius = 40;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (claimProgress / 100) * circumference;

  return (
    <Card hoverEffect={true} className="overflow-hidden relative border border-gray-100 flex flex-col justify-between text-center p-5 h-full">
      {/* Decorative subtle background gradient corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-full filter blur-xl pointer-events-none -z-10" />

      <div className="space-y-5">
        {/* Header Block */}
        <div className="flex flex-col items-center space-y-1">
          <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">
            Automated Pool Protocol
          </span>
          <h3 className="text-base font-display font-extrabold text-gray-950 tracking-tight">
            Daily Yield Claim Center
          </h3>
          <div className="px-2 py-0.5 bg-blue-50 border border-blue-100/50 text-blue-700 text-[9px] font-mono rounded-full font-bold">
            24h Epoch
          </div>
        </div>

        {/* Circular + Info Block */}
        <div className="flex flex-col items-center justify-center space-y-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 p-4.5">
          
          {/* Circular Progress Widget */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke={isClaimed ? '#10b981' : '#2563eb'}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center leading-none">
              <span className="text-sm font-display font-black text-gray-950">
                {claimProgress}%
              </span>
              <span className="text-[8px] font-mono text-gray-400 font-bold uppercase">Ready</span>
            </div>
          </div>

          {/* Time counters and metadata */}
          <div className="space-y-3 w-full text-center">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-400 font-bold uppercase block">Next Claim Window</span>
              <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-gray-950">
                <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>{isClaimed ? "Unlocked tomorrow" : "04h 18m 32s"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center border-t border-gray-100/80 pt-2.5">
              <div className="border-r border-gray-100/80 pr-1 text-center">
                <span className="text-[8px] font-mono text-gray-400 font-bold block uppercase">Last Claim Status</span>
                <span className="text-[11px] font-bold text-gray-800 flex items-center justify-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="truncate">Successful</span>
                </span>
              </div>
              <div className="pl-1 text-center">
                <span className="text-[8px] font-mono text-gray-400 font-bold block uppercase">Est. Rewards</span>
                <span className="text-[11px] font-bold text-blue-600 font-mono">+$245.82 USD</span>
              </div>
            </div>
          </div>

        </div>

        {/* Weekly Progress Bar Widget */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-gray-400 font-bold uppercase">Weekly Epoch Progress</span>
            <span className="text-gray-900 font-bold">5 of 7 Completed</span>
          </div>
          {/* Progress outer */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: '71.4%' }} // 5/7
            />
          </div>
        </div>
      </div>

      {/* Footer & Action Trigger */}
      <div className="mt-5 pt-3.5 border-t border-gray-50/80 flex flex-col space-y-2.5">
        <div className="text-[9px] font-mono text-gray-400 font-semibold text-center leading-normal">
          Rules: Vault requires 24h continuous staking node.
        </div>

        <Button
          onClick={handleClaim}
          variant={isClaimed ? "secondary" : "primary"}
          size="sm"
          isLoading={isLoading}
          disabled={isClaimed}
          className="w-full text-xs font-bold py-2"
          rightIcon={isClaimed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Sparkles className="w-3.5 h-3.5" />}
        >
          {isClaimed ? "Yield Claimed" : "Trigger Yield Claim"}
        </Button>
      </div>
    </Card>
  );
};

export default DailyClaimCard;
