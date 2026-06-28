/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { 
  StatCard 
} from '../ui/Cards/index.tsx';
import { 
  Award, 
  Fingerprint, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles, 
  Users2, 
  Gift, 
  Briefcase 
} from 'lucide-react';

// Import our custom widget layouts
import { DailyClaimCard } from './DailyClaimCard.tsx';
import { PortfolioOverview } from './PortfolioOverview.tsx';
import { TeamOverview } from './TeamOverview.tsx';
import { RecentActivity } from './RecentActivity.tsx';
import { Announcements } from './Announcements.tsx';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  // Premium mock values matching instructions precisely
  const statsList = [
    {
      title: 'VIP Rank Status',
      value: 'VIP SILVER',
      icon: <Award className="w-5 h-5 text-amber-500" />,
      trend: 'Multiplier 1.65x',
      trendDirection: 'up' as const,
    },
    {
      title: 'Operator User ID',
      value: user?.id ? `NODE-${user.id}` : 'NODE-7291',
      icon: <Fingerprint className="w-5 h-5 text-blue-600" />,
      trend: 'Active SHA-256',
      trendDirection: 'neutral' as const,
    },
    {
      title: 'Total Assets (USD)',
      value: '$248,590.52',
      icon: <Wallet className="w-5 h-5 text-indigo-600" />,
      trend: '+$4,295.20 (24h)',
      trendDirection: 'up' as const,
    },
    {
      title: 'Today\'s Income (USD)',
      value: '+$145.20',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      trend: 'EST Business Timezone',
      trendDirection: 'up' as const,
    },
    {
      title: 'Total Income Earned',
      value: '$14,845.10',
      icon: <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />,
      trend: '+12.5% Month-over-Month',
      trendDirection: 'up' as const,
    },
    {
      title: 'Total Deposits (USD)',
      value: '$185,000.00',
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-500" />,
      trend: '3 completed transactions',
      trendDirection: 'neutral' as const,
    },
    {
      title: 'Total Withdrawals',
      value: '$17,500.00',
      icon: <ArrowUpRight className="w-5 h-5 text-red-500" />,
      trend: '1 completed transfer',
      trendDirection: 'neutral' as const,
    },
    {
      title: 'Team Income (USD)',
      value: '+$1,120.45',
      icon: <Users2 className="w-5 h-5 text-blue-500" />,
      trend: 'Synced from 365 downlines',
      trendDirection: 'up' as const,
    },
    {
      title: 'Rewards (USD)',
      value: '$350.00',
      icon: <Gift className="w-5 h-5 text-amber-600" />,
      trend: 'Staking pool multiplier',
      trendDirection: 'neutral' as const,
    },
    {
      title: 'Salary (USD)',
      value: '$1,500.00',
      icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
      trend: 'Weekly recurring contract',
      trendDirection: 'up' as const,
    },
  ];

  return (
    <div className="space-y-8" id="dashboard-home-tab">
      
      {/* 1. Stat Cards Grid (Financial Overview) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-left">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
              Node Balance sheets
            </span>
            <h2 className="text-xl font-display font-extrabold text-gray-950 tracking-tight">
              Financial Overview Console
            </h2>
          </div>
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">
            EST business timezone active
          </span>
        </div>

        {/* 10 Stats cards arranged in a beautiful fluid responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {statsList.map((stat, idx) => (
            <StatCard
              key={idx}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendDirection={stat.trendDirection}
              className="min-h-[140px]"
            />
          ))}
        </div>
      </section>

      {/* 2. Portfolio overview and Daily Claim Card Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-full">
          <PortfolioOverview />
        </div>
        <div className="lg:col-span-4 h-full">
          <DailyClaimCard />
        </div>
      </div>

      {/* 3. Recent Activity & Team Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-full">
          <RecentActivity />
        </div>
        <div className="lg:col-span-4 h-full">
          <TeamOverview />
        </div>
      </div>

      {/* 4. Announcements full width at bottom */}
      <div>
        <Announcements />
      </div>

    </div>
  );
};

export default DashboardHome;
