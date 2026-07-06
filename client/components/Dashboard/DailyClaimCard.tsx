/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Buttons/index.tsx';

export const DailyClaimCard: React.FC = () => {
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimProgress, setClaimProgress] = useState(75); // 75% directly matching reference image

  const handleClaim = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsClaimed(true);
      setClaimProgress(100);
    }, 1500);
  };

  // SVG parameters for circular progress
  const radius = 64;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (claimProgress / 100) * circumference;

  return (
    <div 
      id="daily-claim-widget" 
      className="relative overflow-hidden border border-[#1e293b]/70 bg-[#070d19] text-white p-6 h-full flex flex-col justify-between shadow-2xl rounded-3xl"
    >
      {/* Soft decorative background glows */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="space-y-6 flex-grow flex flex-col justify-between">
        {/* Header Block: Title on Left, Epoch Tag on Right */}
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-sans font-extrabold text-[#f1f5f9] tracking-wider uppercase">
            YIELD COLLECTION CENTER
          </h3>
          <div className="px-3 py-1 bg-[#10b981]/15 text-[#10b981] text-[9px] font-mono rounded-full font-extrabold uppercase tracking-widest border border-[#10b981]/20">
            24h Active Epoch
          </div>
        </div>

        {/* Central Display: Progress ring on Left, Digital Clock on Right */}
        <div className="flex items-center justify-between py-2">
          
          {/* Progress ring on Left */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.25)]"
            >
              {/* Outer track circle */}
              <circle
                stroke="rgba(255, 255, 255, 0.04)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Active circle */}
              <circle
                stroke="#10b981"
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
              <span className="text-2xl sm:text-2.5xl font-sans font-black text-white tracking-tight">
                {claimProgress}%
              </span>
              <span className="text-[7px] font-mono text-slate-400 font-extrabold uppercase tracking-widest mt-1">YIELD ACTIVE</span>
            </div>
          </div>

          {/* Digital Clock on Right */}
          <div className="space-y-2 text-right">
            <span className="text-[10px] font-sans text-slate-300 font-semibold block tracking-wide leading-none">
              Next Claim Available in
            </span>
            
            {/* Retro clock numbers block */}
            <div className="flex items-center justify-end gap-1.5 select-none">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="bg-[#121b2d] border border-white/5 rounded-xl px-2.5 py-2 font-mono text-base sm:text-lg font-extrabold text-white leading-none min-w-[38px] text-center shadow-inner">
                  {isClaimed ? "00" : "06"}
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">HRS</span>
              </div>
              <span className="font-mono text-sm font-bold text-white/30 pb-4">:</span>
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="bg-[#121b2d] border border-white/5 rounded-xl px-2.5 py-2 font-mono text-base sm:text-lg font-extrabold text-white leading-none min-w-[38px] text-center shadow-inner">
                  {isClaimed ? "00" : "15"}
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">MINS</span>
              </div>
              <span className="font-mono text-sm font-bold text-white/30 pb-4">:</span>
              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="bg-[#121b2d] border border-white/5 rounded-xl px-2.5 py-2 font-mono text-base sm:text-lg font-extrabold text-white leading-none min-w-[38px] text-center shadow-inner">
                  {isClaimed ? "00" : "34"}
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">SECS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Status Metrics block */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 pb-1">
          <div className="text-left space-y-1">
            <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
              LAST STATUS
            </span>
            <span className="text-sm font-sans font-extrabold text-[#10b981] block leading-none">
              Success
            </span>
          </div>
          <div className="text-right space-y-1">
            <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
              EST. REWARDS
            </span>
            <span className="text-sm font-mono font-bold text-[#10b981] block leading-none">
              {isClaimed ? "+$0.00 USD" : "+$245.82 USD"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer & Action Trigger Button */}
      <div className="mt-4 flex flex-col">
        <Button
          onClick={handleClaim}
          disabled={isClaimed}
          className={`w-full text-xs font-sans font-extrabold py-3.5 uppercase tracking-wider flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 ${
            isClaimed 
              ? 'bg-[#121b2d] text-slate-500 border border-slate-800' 
              : 'bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-xl shadow-emerald-950/40 border-transparent hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          <span>{isClaimed ? "Yield Claimed" : "Trigger Yield Claim"}</span>
          {isClaimed ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Sparkles className="w-4 h-4 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default DailyClaimCard;
