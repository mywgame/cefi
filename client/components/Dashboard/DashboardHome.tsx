/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Card } from '../ui/Cards/index.tsx';
import { 
  ArrowUpRight, 
  Sparkles, 
  Users2, 
  Gift, 
  Briefcase,
  CheckSquare,
  Coins,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

import { DailyClaimCard } from './DailyClaimCard.tsx';
import { PortfolioOverview } from './PortfolioOverview.tsx';
import { RecentActivity } from './RecentActivity.tsx';
import { Announcements } from './Announcements.tsx';
import { MetaFirmAssetIcon } from './MetaFirmAssetIcon.tsx';

interface DashboardHomeProps {
  onQuickAction?: (actionType: 'deposit' | 'withdraw' | 'claim' | 'team') => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onQuickAction }) => {
  const { user } = useAuth();
  
  // Display the user's real name instead of email address
  const userDisplayName = user?.name || (user?.email ? user.email.split('@')[0] : 'Amit Kumar');

  return (
    <div className="space-y-6 text-left" id="metafirm-dashboard-home">
      
      {/* ====================================================
          HERO ROW
          ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Total Assets card (left, lg:col-span-7) */}
        <div className="lg:col-span-7 h-full">
          <Card className="p-6 border border-gray-100 bg-white shadow-xl shadow-gray-100/30 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Soft decorative background gradient */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-violet-500/5 to-blue-500/5 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {/* MetaFirm custom Asset icon */}
                <MetaFirmAssetIcon size="lg" />
                
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block leading-none">
                    Total Assets
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-display font-black text-gray-950 tracking-tight">
                      $12,546.67
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +22.4%
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified metadata section */}
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-4 border-t border-gray-100/80">
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50/50 px-2.5 py-1 rounded-full border border-emerald-100/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Reserve Audit Verified
                </span>
                <span className="font-extrabold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100/40">
                  100% Active Liquidity
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Welcome card (right, lg:col-span-5) */}
        <div className="lg:col-span-5 h-full">
          <Card className="p-6 border border-violet-100/60 bg-gradient-to-br from-violet-50/40 via-blue-50/20 to-white shadow-xl shadow-violet-100/10 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden">
            {/* Futuristic shield illustration placeholder */}
            <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
              <ShieldCheck className="w-24 h-24 text-violet-600" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono bg-violet-100 text-violet-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block">
                System Authorized
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black text-gray-950 tracking-tight leading-tight">
                Welcome back! 👋
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                Secure investment vault optimized under zero-trust protocols. Synced and verified in real-time.
              </p>
            </div>
          </Card>
        </div>

      </div>

      {/* ====================================================
          INCOME CARDS ROW (5 Cards)
          ==================================================== */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
            Yield & Performance Income
          </span>
          <span className="text-[10px] font-mono text-violet-600 font-bold bg-violet-50 border border-violet-100/50 px-2 py-0.5 rounded-full uppercase">
            Active Multipliers
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* 1. Daily Yield */}
          <Card className="p-4.5 border border-gray-100 bg-white shadow-xs rounded-2xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckSquare className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Daily Yield
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-display font-black text-gray-950">$56.80</div>
              <div className="text-[9px] font-mono text-emerald-600 font-bold">1.65% Daily Mult.</div>
            </div>
          </Card>

          {/* 2. Referral Income */}
          <Card className="p-4.5 border border-gray-100 bg-white shadow-xs rounded-2xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                <Users2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Referral Income
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-display font-black text-gray-950">$245.00</div>
              <div className="text-[9px] font-mono text-orange-600 font-bold">Verified payouts</div>
            </div>
          </Card>

          {/* 3. Team Income */}
          <Card className="p-4.5 border border-gray-100 bg-white shadow-xs rounded-2xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                <Users2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Team Income
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-display font-black text-gray-950">$320.00</div>
              <div className="text-[9px] font-mono text-violet-600 font-bold">365 member downlines</div>
            </div>
          </Card>

          {/* 4. Incentive Income */}
          <Card className="p-4.5 border border-gray-100 bg-white shadow-xs rounded-2xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <Gift className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Incentive Income
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-display font-black text-gray-950">$117.20</div>
              <div className="text-[9px] font-mono text-rose-600 font-bold">Promotion credits</div>
            </div>
          </Card>

          {/* 5. Salary Income */}
          <Card className="p-4.5 border border-gray-100 bg-white shadow-xs rounded-2xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Salary Income
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="text-xl font-display font-black text-gray-950">$182.50</div>
              <div className="text-[9px] font-mono text-indigo-600 font-bold">Weekly recurring</div>
            </div>
          </Card>

        </div>
      </section>

      {/* ====================================================
          QUICK ACTIONS ROW
          ==================================================== */}
      <section className="p-1 bg-gray-50 border border-gray-100 rounded-3xl shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          
          {/* Deposit Button */}
          <button
            onClick={() => onQuickAction?.('deposit')}
            className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-500/10 hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deposit</span>
          </button>

          {/* Withdraw Button */}
          <button
            onClick={() => onQuickAction?.('withdraw')}
            className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-display font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-rose-500/10 hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw</span>
          </button>

          {/* Rewards Button */}
          <button
            onClick={() => onQuickAction?.('claim')}
            className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-display font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>Rewards</span>
          </button>

          {/* Earn Button */}
          <button
            onClick={() => onQuickAction?.('claim')}
            className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-display font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-amber-500/10 hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <Coins className="w-4 h-4" />
            <span>Earn</span>
          </button>

        </div>
      </section>

      {/* ====================================================
          ANALYTICS SECTION (Graph Left, Claim Center Right)
          ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-full">
          <PortfolioOverview />
        </div>
        <div className="lg:col-span-4 h-full">
          <DailyClaimCard />
        </div>
      </div>

      {/* ====================================================
          BOTTOM SECTION (Recent Transactions Full Width)
          ==================================================== */}
      <div className="w-full">
        <RecentActivity />
      </div>

      {/* Announcements */}
      <div>
        <Announcements />
      </div>

    </div>
  );
};

export default DashboardHome;
