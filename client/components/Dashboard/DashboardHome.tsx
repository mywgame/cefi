/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Card } from '../ui/Cards/index.tsx';
import { 
  ArrowUpRight, 
  Users2, 
  Gift, 
  Briefcase,
  CheckSquare,
  Coins,
  PlusCircle,
} from 'lucide-react';

import { DailyClaimCard } from './DailyClaimCard.tsx';
import { PortfolioOverview } from './PortfolioOverview.tsx';
import { RecentActivity } from './RecentActivity.tsx';
import { Announcements } from './Announcements.tsx';
import { MetaFirmAssetIcon } from './MetaFirmAssetIcon.tsx';
import logoImg from '../../../assets/images/branding/logo.png';

interface DashboardHomeProps {
  onQuickAction?: (actionType: 'deposit' | 'withdraw' | 'claim' | 'team') => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onQuickAction }) => {
  const { user } = useAuth();
  
  // Display the user's real name instead of email address
  const userDisplayName = user?.name || (user?.email ? user.email.split('@')[0] : 'Amit Kumar');

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full text-left" id="metafirm-dashboard-home">
      
      {/* Dashboard Page Header */}
      <div className="col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pb-4 border-b border-gray-100/60 mb-2 gap-3">
        <div className="flex items-center space-x-3">
          <img
            src={logoImg}
            alt="MetaFirm Logo"
            referrerPolicy="no-referrer"
            className="h-10 object-contain"
          />
          <span className="text-xs font-mono text-violet-600 font-extrabold uppercase tracking-widest bg-violet-50 px-2.5 py-1 rounded-full">
            Institutional Node
          </span>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400 font-medium">Secured Reserve Wallet</p>
          <p className="text-sm font-bold text-gray-950 font-display">{userDisplayName}</p>
        </div>
      </div>
      
      {/* 1. Total Assets Card (Left top column on desktop, first on mobile) */}
      <div className="order-1 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1 w-full" id="total-assets-container">
        <div className="w-full flex justify-center">
          <Card className="p-6 border border-blue-100/60 bg-gradient-to-br from-[#f0f4ff]/80 via-[#f7f9fc]/50 to-white shadow-xs rounded-3xl w-full lg:max-w-[75%] relative overflow-hidden flex items-center justify-between">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full filter blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-indigo-500/5 rounded-full filter blur-xl pointer-events-none" />
            
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block leading-none">
                Total Assets
              </span>
              <div className="text-3xl sm:text-3.5xl font-sans font-extrabold text-gray-950 tracking-tight leading-none pt-0.5">
                $12,546.67
              </div>
              <span className="text-xs text-gray-400 font-medium block pt-0.5">
                All assets value in USD
              </span>
            </div>
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md animate-pulse" />
              <MetaFirmAssetIcon size="lg" className="relative z-10" />
            </div>
          </Card>
        </div>
      </div>

      {/* 2. Income Cards (Left second column on desktop, second on mobile) */}
      <div className="order-2 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2 w-full" id="income-cards-container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          {/* 1. Daily Yield */}
          <Card className="py-3 px-4 border border-gray-100 bg-white shadow-2xs rounded-2xl hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 border border-emerald-100/60 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckSquare className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block truncate">
                Daily Yield
              </span>
            </div>
            <div className="text-lg sm:text-xl font-sans font-extrabold text-gray-950">$56.80</div>
          </Card>

          {/* 2. Referral Income */}
          <Card className="py-3 px-4 border border-gray-100 bg-white shadow-2xs rounded-2xl hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6.5 h-6.5 rounded-lg bg-orange-50 border border-orange-100/60 flex items-center justify-center text-orange-500 shrink-0">
                <Users2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block truncate">
                Referral Income
              </span>
            </div>
            <div className="text-lg sm:text-xl font-sans font-extrabold text-gray-950">$245.00</div>
          </Card>

          {/* 3. Team Income */}
          <Card className="py-3 px-4 border border-gray-100 bg-white shadow-2xs rounded-2xl hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6.5 h-6.5 rounded-lg bg-violet-50 border border-violet-100/60 flex items-center justify-center text-violet-600 shrink-0">
                <Users2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block truncate">
                Team Income
              </span>
            </div>
            <div className="text-lg sm:text-xl font-sans font-extrabold text-gray-950">$320.00</div>
          </Card>

          {/* 4. Incentive Income */}
          <Card className="py-3 px-4 border border-gray-100 bg-white shadow-2xs rounded-2xl hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6.5 h-6.5 rounded-lg bg-rose-50 border border-rose-100/60 flex items-center justify-center text-rose-500 shrink-0">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block truncate">
                Incentive Income
              </span>
            </div>
            <div className="text-lg sm:text-xl font-sans font-extrabold text-gray-950">$117.20</div>
          </Card>

        </div>
      </div>

      {/* 3. Action Buttons (Left third column on desktop, third on mobile) */}
      <div className="order-3 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-3 w-full" id="action-buttons-container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          {/* Deposit Button */}
          <button
            onClick={() => onQuickAction?.('deposit')}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#039875] hover:bg-[#028062] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deposit</span>
          </button>

          {/* Withdraw Button */}
          <button
            onClick={() => onQuickAction?.('withdraw')}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#d91b42] hover:bg-[#be183a] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw</span>
          </button>

          {/* Rewards Button */}
          <button
            onClick={() => onQuickAction?.('claim')}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#1a62d6] hover:bg-[#1450b4] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>Rewards</span>
          </button>

          {/* Earn Button */}
          <button
            onClick={() => onQuickAction?.('claim')}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <Coins className="w-4 h-4" />
            <span>Earn</span>
          </button>

        </div>
      </div>

      {/* 4. Yield Collection Center (Right side column, 4th on mobile) */}
      <div className="order-4 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-3 w-full h-full" id="yield-collection-container">
        <DailyClaimCard />
      </div>

      {/* 5. Recent Transactions Table (Left fourth column on desktop, 5th on mobile) */}
      <div className="order-5 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-4 w-full" id="recent-transactions-container">
        <RecentActivity />
      </div>

      {/* 6. Earnings Overview Analytics Graph (Right side column, 6th on mobile) */}
      <div className="order-6 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-4 w-full" id="analytics-graph-container">
        <PortfolioOverview />
      </div>

      {/* 7. Corporate Bulletin Desk (Announcements, spans full 12 columns at bottom on both) */}
      <div className="order-7 lg:order-none lg:col-span-12 lg:row-start-5 w-full pt-2" id="announcements-container">
        <Announcements />
      </div>

    </div>
  );
};

export default DashboardHome;
