/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Button } from '../ui/Buttons/index.tsx';
import { Input } from '../ui/Inputs/index.tsx';
import { DashboardTab, Sidebar } from './Sidebar.tsx';
import { TopNav } from './TopNav.tsx';

// Tab Views
import { DashboardHome } from './DashboardHome.tsx';
import { MyTeamView } from './MyTeamView.tsx';
import { ProfileView } from './ProfileView.tsx';
import { SecurityView } from './SecurityView.tsx';
import { SettingsView } from './SettingsView.tsx';
import { SupportView } from './SupportView.tsx';
import { TransactionsView } from './TransactionsView.tsx';

// Overlay
import { ArrowLeft, Check, Copy, Wallet, X } from 'lucide-react';
import { Toast } from '../ui/Feedback/index.tsx';

interface UserDashboardProps {
  onBackToLanding: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onBackToLanding }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Quick Actions Overlays
  const [activeModal, setActiveModal] = useState<'none' | 'deposit' | 'withdraw'>('none');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Form Fields
  const [depositAmount, setDepositAmount] = useState('1000');
  const [withdrawAmount, setWithdrawAmount] = useState('500');
  const [withdrawAddress, setWithdrawAddress] = useState('0x72a9df28c9e120...f82e');

  const handleLogout = () => {
    logout();
    onBackToLanding();
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickAction = (actionType: 'deposit' | 'withdraw' | 'claim' | 'team') => {
    if (actionType === 'deposit') {
      setActiveModal('deposit');
    } else if (actionType === 'withdraw') {
      setActiveModal('withdraw');
    } else if (actionType === 'claim') {
      setActiveTab('dashboard');
      showToast('Centered on Daily Yield Claim widget');
    } else if (actionType === 'team') {
      setActiveTab('team');
    }
  };

  const triggerMockDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal('none');
    showToast(`Inbound request of $${depositAmount} USD transmitted. Waiting for ledger verification...`);
  };

  const triggerMockWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal('none');
    showToast(`Debit transfer of $${withdrawAmount} USD initiated. Check Security Logs...`);
  };

  const handleCopyWalletAddress = () => {
    navigator.clipboard.writeText('0x9821c9e2b45a90d1f43a8b32d541');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Render main sub-view depending on active tab state
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome onQuickAction={handleQuickAction} />;
      case 'profile':
        return <ProfileView />;
      case 'team':
        return <MyTeamView />;
      case 'transactions':
        return <TransactionsView />;
      case 'security':
        return <SecurityView />;
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <SupportView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-gray-900 font-sans" id="premium-user-dashboard">

      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        onLogout={handleLogout}
      />

      {/* 2. Main content chassis block */}
      <div className="flex-grow flex flex-col min-w-0">

        {/* 2.1 Top Bar Navigation */}
        <TopNav
          onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          onQuickAction={handleQuickAction}
          activeTab={activeTab}
        />

        {/* 2.2 Scrollable Content Canvas Container */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto space-y-6 max-w-7xl w-full mx-auto">

          {/* Back to landing shortcut banner */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-violet-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>
          </div>

          {/* Active Child View */}
          {renderActiveView()}

        </main>
      </div>

      {/* 3. Popups/Modals Overlays for Quick Actions */}
      {activeModal === 'deposit' && (
        <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0" onClick={() => setActiveModal('none')} />
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xl max-w-md w-full relative z-10 text-left space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-violet-600">
                <Wallet className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-gray-950 text-sm sm:text-base">Inbound Deposit Gateway</h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1 rounded-lg hover:bg-gray-50 text-gray-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              To credit your balance sheets instantly, transmit USDT (ERC20) to your dedicated multi-sig account address below.
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-gray-400 font-bold uppercase block">Your Destination Address</span>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between font-mono text-xs text-gray-900 select-all">
                  <span className="truncate">0x9821c9e2b45a90d1f43a8b32d541</span>
                  <button onClick={handleCopyWalletAddress} className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-violet-600 cursor-pointer">
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <form onSubmit={triggerMockDeposit} className="space-y-4">
                <Input
                  label="Expected Value Amount (USD equivalent)"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Transmit Inbound Notice
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'withdraw' && (
        <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0" onClick={() => setActiveModal('none')} />
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xl max-w-md w-full relative z-10 text-left space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-amber-500">
                <Wallet className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-gray-950 text-sm sm:text-base">Outbound Withdrawal Gateway</h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1 rounded-lg hover:bg-gray-50 text-gray-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Initiate a debit from your ledger balances. Transmissions are finalized after passing zero-trust dual-factor validation.
            </p>

            <form onSubmit={triggerMockWithdraw} className="space-y-4">
              <Input
                label="Destination Wallet Address"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                required
                className="font-mono text-xs"
              />
              <Input
                label="Withdrawal Amount (USD)"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" className="w-full bg-amber-600 hover:bg-amber-700 hover:shadow-amber-500/10 border-none">
                Submit Outbound Request
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Feedbacks */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          variant="success"
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
};

export default UserDashboard;
