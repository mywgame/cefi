/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, ShieldCheck, Clock, Coins } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';

export const DailyClaimCard: React.FC = () => {
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimProgress, setClaimProgress] = useState(75); // 75% matching reference image directly!

  const handleClaim = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsClaimed(true);
      setClaimProgress(100);
    }, 1500);
  };

  // SVG parameters for circular progress
  const radius = 64; // Slightly larger for better visual impact
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (claimProgress / 100) * circumference;

  return (
    <Card 
      id="daily-claim-widget" 
      className="relative overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-[#0f172a] to-[#020617] text-white p-6 h-full flex flex-col justify-between shadow-xl shadow-indigo-950/10 hover:border-slate-700 transition-all"
    >
      {/* Decorative ambient neon background glows */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="space-y-6">
        {/* Header Block with subtitle */}
        <div className="flex flex-col items-center text-center space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest block">
            MetaFirm Yield Protocol
          </span>
          <h3 className="text-base font-display font-black text-white tracking-tight">
            Yield Collection Center
          </h3>
          <div className="px-2.5 py-0.5 bg-slate-800/60 border border-slate-700/50 text-emerald-400 text-[9px] font-mono rounded-full font-bold">
            24h Active Epoch
          </div>
        </div>

        {/* Circular + Info Block */}
        <div className="flex flex-col items-center justify-center space-y-5 bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-xs">
          
          {/* Circular Progress Widget */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            {/* outer background ring */}
            <div className="absolute inset-0 rounded-full border border-white/5 scale-[1.05]" />
            
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.15)]"
            >
              {/* Underlay tracking circle */}
              <circle
                stroke="rgba(255,255,255,0.06)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Active animated tracking circle */}
              <circle
                stroke={isClaimed ? '#10b981' : '#10b981'} // Emerald green yield color
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
              <span className="text-2xl font-display font-black text-white tracking-tight">
                {claimProgress}%
              </span>
              <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-0.5">Yield Active</span>
            </div>
          </div>

          {/* Time counters and metadata matching image */}
          <div className="space-y-3 w-full text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">
                Yield Collection
              </span>
              <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-white">
                <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>{isClaimed ? "Claim Unlocked Tomorrow" : "Next Claim Available in 06:15 hrs"}</span>
              </div>
            </div>

            {/* Metrics grid under circle */}
            <div className="grid grid-cols-2 gap-2 text-center border-t border-white/5 pt-3">
              <div className="border-r border-white/5 pr-1 text-center">
                <span className="text-[8px] font-mono text-slate-400 font-bold block uppercase tracking-wider">Last Status</span>
                <span className="text-[11px] font-extrabold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-ping" />
                  <span>Success</span>
                </span>
              </div>
              <div className="pl-1 text-center">
                <span className="text-[8px] font-mono text-slate-400 font-bold block uppercase tracking-wider">Est. Rewards</span>
                <span className="text-[11px] font-extrabold text-emerald-400 font-mono mt-0.5 block">
                  +$245.82 USD
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Weekly Progress Bar Widget */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Weekly Epoch Progress</span>
            <span className="text-white font-extrabold">5 of 7 Days Completed</span>
          </div>
          {/* Progress outer */}
          <div className="h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: '71.4%' }} // 5/7
            />
          </div>
        </div>
      </div>

      {/* Footer & Action Trigger */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col space-y-3">
        <span className="text-[9px] font-mono text-slate-500 font-bold text-center leading-normal block">
          Continuous 24h institutional staking is verified and active.
        </span>

        <Button
          onClick={handleClaim}
          variant={isClaimed ? "secondary" : "primary"}
          size="sm"
          isLoading={isLoading}
          disabled={isClaimed}
          className={`w-full text-xs font-bold py-3 uppercase tracking-wider ${
            isClaimed 
              ? 'bg-slate-800 text-slate-400 border border-slate-700/50' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black shadow-lg shadow-emerald-500/10 border-transparent hover:scale-[1.01] transition-all'
          }`}
          rightIcon={isClaimed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-slate-950" />}
        >
          {isClaimed ? "Yield Claimed" : "Trigger Yield Claim"}
        </Button>
      </div>
    </Card>
  );
};

export default DailyClaimCard;
