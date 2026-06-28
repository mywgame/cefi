/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Badge } from '../ui/Feedback/index.tsx';
import { TableContainer } from '../ui/Cards/index.tsx';
import { ArrowDownLeft, ArrowUpRight, Award, CircleDollarSign, ShieldCheck, UserPlus } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Reward' | 'Salary' | 'Claim' | 'Referral Bonus';
  amount: string;
  status: 'Complete' | 'Processing' | 'Failed';
  timestamp: string;
  txHash: string;
}

export const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    { id: 'TX-83921', type: 'Claim', amount: '+$245.82 USD', status: 'Complete', timestamp: '2026-06-28 12:45 UTC', txHash: '0x3f8a...c9e2' },
    { id: 'TX-83905', type: 'Deposit', amount: '+$50,000.00 USD', status: 'Complete', timestamp: '2026-06-27 18:20 UTC', txHash: '0x9d11...f43a' },
    { id: 'TX-83894', type: 'Withdrawal', amount: '-$12,500.00 USD', status: 'Complete', timestamp: '2026-06-27 09:14 UTC', txHash: '0x7e2d...b15c' },
    { id: 'TX-83782', type: 'Salary', amount: '+$1,500.00 USD', status: 'Complete', timestamp: '2026-06-26 00:00 UTC', txHash: '0x8b32...d541' },
    { id: 'TX-83741', type: 'Referral Bonus', amount: '+$340.50 USD', status: 'Complete', timestamp: '2026-06-25 15:32 UTC', txHash: '0x5c42...a90e' },
    { id: 'TX-83601', type: 'Reward', amount: '+$124.15 USD', status: 'Processing', timestamp: '2026-06-24 11:05 UTC', txHash: '0x2a91...e420' },
  ];

  // Helper to resolve transaction icons
  const getTxIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-600" />;
      case 'Withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case 'Salary':
        return <CircleDollarSign className="w-4 h-4 text-blue-600" />;
      case 'Referral Bonus':
        return <UserPlus className="w-4 h-4 text-purple-600" />;
      case 'Reward':
      case 'Claim':
        return <Award className="w-4 h-4 text-amber-500 animate-pulse" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-gray-400" />;
    }
  };

  // Helper to resolve Badge colors
  const getStatusBadge = (status: 'Complete' | 'Processing' | 'Failed') => {
    switch (status) {
      case 'Complete':
        return <Badge variant="emerald">Complete</Badge>;
      case 'Processing':
        return <Badge variant="amber">Processing</Badge>;
      case 'Failed':
        return <Badge variant="rose">Failed</Badge>;
      default:
        return <Badge variant="neutral">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4 text-left" id="recent-activity-section">
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
            Security audit Logs
          </span>
          <h3 className="text-base font-display font-extrabold text-gray-950 tracking-tight">
            Recent Ledger Entries
          </h3>
        </div>
        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">6 entries synced</span>
      </div>

      <TableContainer>
        <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50/60 border-b border-gray-100/80">
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/4">
                Transaction ID
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/5">
                Type
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/5">
                Amount
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/6">
                Status
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/4">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/50 text-gray-700 bg-white">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/40 transition-colors duration-150">
                {/* ID with simulated hex hash */}
                <td className="py-3 px-5 text-left">
                  <div className="space-y-0.5">
                    <span className="font-bold text-gray-950 font-mono block text-xs">{item.id}</span>
                    <span className="text-[9px] font-mono text-gray-400 font-medium select-all block leading-none">{item.txHash}</span>
                  </div>
                </td>

                {/* Type block with custom visual icons */}
                <td className="py-3 px-5 text-left">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                      {React.isValidElement(getTxIcon(item.type)) ? React.cloneElement(getTxIcon(item.type) as React.ReactElement, { className: 'w-3.5 h-3.5' }) : getTxIcon(item.type)}
                    </div>
                    <span className="font-bold text-gray-800 font-display text-xs">{item.type}</span>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-3 px-5 text-left font-mono font-bold text-xs">
                  <span className={item.amount.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}>
                    {item.amount}
                  </span>
                </td>

                {/* Status Badges */}
                <td className="py-3 px-5 text-left align-middle">
                  <div className="inline-flex">
                    {getStatusBadge(item.status)}
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 px-5 text-left text-gray-400 font-mono text-[10px] font-semibold">
                  {item.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default RecentActivity;
