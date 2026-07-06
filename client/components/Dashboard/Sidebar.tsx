/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  History,
  LayoutDashboard,
  Lock,
  LogOut,
  Settings,
  User,
  Users,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import MetaFirmLogo from './MetaFirmLogo.tsx';

export type DashboardTab = 'dashboard' | 'profile' | 'team' | 'transactions' | 'security' | 'settings' | 'support';

interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard' as DashboardTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile' as DashboardTab, label: 'Profile', icon: User },
    { id: 'team' as DashboardTab, label: 'My Team', icon: Users },
    { id: 'transactions' as DashboardTab, label: 'Transactions', icon: History },
    { id: 'security' as DashboardTab, label: 'Security', icon: Lock },
    { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
    { id: 'support' as DashboardTab, label: 'Support', icon: HelpCircle },
  ];

  const handleTabClick = (tabId: DashboardTab) => {
    setActiveTab(tabId);
    setIsMobileOpen(false);
  };

  const renderSidebarContent = (forceExpand = false) => {
    const collapsed = forceExpand ? false : isCollapsed;
    return (
      <div className="flex flex-col h-full bg-white border-r border-gray-100 py-6 text-left">
        {/* Brand Header */}
        <div className={`flex items-center justify-between px-6 mb-8 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center">
            {collapsed ? (
              <MetaFirmLogo iconOnly size="sm" />
            ) : (
              <MetaFirmLogo size="md" />
            )}
          </div>

          {/* Collapse toggle button for Desktop/Tablet */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer focus:outline-none"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-grow px-3 space-y-1" role="menu">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center rounded-2xl py-3 px-4 text-xs font-bold transition-all relative cursor-pointer focus:outline-none ${isActive
                    ? 'text-violet-600 bg-violet-50/60'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                {/* Highlight bar for active item */}
                {isActive && !collapsed && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-violet-600 rounded-r-md" />
                )}

                <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-violet-600' : 'text-gray-400'} ${collapsed ? '' : 'mr-3'}`} />

                {!collapsed && (
                  <span className="tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Logout Row at bottom */}
        <div className="px-3 pt-6 border-t border-gray-50">
          <button
            onClick={onLogout}
            className={`w-full flex items-center rounded-2xl py-3 px-4 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer focus:outline-none ${collapsed ? 'justify-center px-0' : ''
              }`}
            title={collapsed ? "Terminate Session" : undefined}
          >
            <LogOut className={`w-4 h-4 flex-shrink-0 text-gray-400 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span className="tracking-wide">Logout</span>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop & Tablet Persistent Sidebar */}
      <aside
        id="desktop-sidebar"
        className={`hidden md:block h-screen sticky top-0 transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Drawer Overlay Slider */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop mask */}
          <div
            className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Slide out drawer sheet */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-64 max-w-xs h-full bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Close button for mobile inside sidebar drawer sheet */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-5 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            {renderSidebarContent(true)}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
