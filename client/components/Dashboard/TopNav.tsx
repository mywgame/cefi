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
          <p className="text-[10px] font-mono text-violet-600 font-bold uppercase tracking-wider">
            MetaFirm Investment Vault
          </p>
          <h1 className="text-lg font-display font-black text-gray-950 capitalize tracking-tight leading-none">
            {activeTab === 'dashboard' ? 'Overview Desk' : `${activeTab} Controls`}
          </h1>
        </div>
      </div>

      {/* Middle/Right combined block that contains the exact sequence of requested components */}
      <div className="flex-grow flex items-center justify-end space-x-5">
        
        {/* 1. Search Bar */}
        <div className="hidden lg:block max-w-[240px] w-full">
          <SearchInput placeholder="Search logs, ledgers..." />
        </div>

        {/* 2. Hello, User Name */}
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-950 font-display">
            Hello, <span className="text-violet-600">{user?.name || (user?.email ? user.email.split('@')[0] : 'Amit Kumar')}</span>
          </p>
        </div>

        {/* 3. UID */}
        <div className="hidden md:flex items-center space-x-1 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-xl">
          <span className="text-[10px] font-mono text-gray-500 font-bold tracking-wider">
            UID-{user?.id ? `MT${user.id}` : 'MT87436'}
          </span>
        </div>

        {/* 4. VIP Badge */}
        <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-[10px] font-display font-black shadow-xs">
          <span className="text-white">★</span>
          <span>VIP-1</span>
        </div>

        {/* 5. Avatar */}
        <Avatar
          name={user?.name || user?.email || 'CE'}
          size="md"
          className="border border-gray-100 hover:border-violet-300 transition-colors shadow-xs"
        />

        {/* 6. Notification Bell icon with dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2.5 rounded-xl bg-white border border-gray-100 hover:border-violet-100 text-gray-500 hover:text-violet-600 transition-all shadow-xs cursor-pointer relative"
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
                      className="text-[10px] font-bold text-violet-600 hover:underline font-mono"
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
                          ? 'bg-violet-50/30 border-violet-100/50' 
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

      </div>
    </header>
  );
};

export default TopNav;
