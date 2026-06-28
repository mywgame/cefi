/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Search, Menu, PlusCircle, ArrowUpRight, HelpCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Button } from '../ui/Buttons/index.tsx';
import { Avatar } from '../ui/Feedback/index.tsx';
import { SearchInput, Dropdown } from '../ui/Inputs/index.tsx';

interface TopNavProps {
  onMobileMenuToggle: () => void;
  onQuickAction: (actionType: 'deposit' | 'withdraw' | 'claim' | 'team') => void;
  activeTab: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  onMobileMenuToggle,
  onQuickAction,
  activeTab,
}) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Security Audit Approved', text: 'Daily reserve audit verified and sealed under cryptographic envelope.', time: '2h ago', unread: true },
    { id: 2, title: 'VIP Tier Upgraded', text: 'Congratulations! Your account progressed to VIP Silver rank.', time: '1d ago', unread: false },
    { id: 3, title: 'Yield Payout Synced', text: 'Interest rate multiplier credited successfully.', time: '2d ago', unread: false }
  ]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header
      id="dashboard-header"
      className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20 text-left"
    >
      {/* Left block: Hamburger toggle for mobile & Section Header Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <p className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            CeFi Investment Vault
          </p>
          <h1 className="text-lg font-display font-extrabold text-gray-950 capitalize tracking-tight leading-none">
            {activeTab === 'dashboard' ? 'Overview Desk' : `${activeTab} Controls`}
          </h1>
        </div>
      </div>

      {/* Middle block: Search Input placeholder */}
      <div className="hidden lg:block max-w-xs w-full mx-4">
        <SearchInput placeholder="Search logs, ledgers, and team nodes..." />
      </div>

      {/* Right block: Notif bell, Quick CTAs, user menu, VIP Indicator */}
      <div className="flex items-center space-x-4">
        
        {/* Quick Actions Action Block */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            onClick={() => onQuickAction('deposit')}
            variant="secondary"
            size="sm"
            leftIcon={<PlusCircle className="w-3.5 h-3.5 text-blue-600" />}
          >
            Deposit
          </Button>
          <Button
            onClick={() => onQuickAction('withdraw')}
            variant="secondary"
            size="sm"
            leftIcon={<ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />}
          >
            Withdraw
          </Button>
        </div>

        {/* Dynamic Notification Bell with dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2.5 rounded-xl bg-white border border-gray-100 hover:border-blue-100 text-gray-500 hover:text-blue-600 transition-all shadow-xs cursor-pointer relative"
            title="Notifications Monitor"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
              <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-3xl shadow-xl z-50 p-4 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-gray-50 mb-3">
                  <span className="text-xs font-bold text-gray-950 font-display">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] font-bold text-blue-600 hover:underline font-mono"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border transition-all text-xs ${
                        n.unread 
                          ? 'bg-blue-50/30 border-blue-100/50' 
                          : 'bg-white border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-gray-900 leading-tight">{n.title}</span>
                        <span className="text-[9px] font-mono text-gray-400 font-semibold">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-normal font-sans">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* VIP Rank and User Identity Profile */}
        <div className="flex items-center space-x-3 border-l border-gray-100 pl-4">
          <div className="text-right hidden sm:block">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-wide text-amber-700 leading-none">
              <span className="w-1 h-1 rounded-full bg-amber-500 mr-0.5" />
              VIP SILVER
            </span>
            <p className="text-xs font-bold text-gray-900 truncate max-w-[120px] mt-0.5">
              {user?.email ? user.email.split('@')[0] : 'Institutional Client'}
            </p>
          </div>

          {/* Collapsible profile menu triggers */}
          <Avatar
            name={user?.email || 'CE'}
            size="md"
            className="cursor-pointer hover:border-blue-300 transition-colors"
          />
        </div>

      </div>
    </header>
  );
};

export default TopNav;
