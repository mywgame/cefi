/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings, ShieldCheck, Globe, HelpCircle, Save, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';
import { Input, Select, ToggleSwitch } from '../ui/Inputs/index.tsx';

export interface SystemSettings {
  platformName: string;
  businessTimezone: string;
  minDeposit: number;
  minWithdrawal: number;
  maintenanceMode: boolean;
}

interface SettingsViewProps {
  settings: SystemSettings;
  onSave: (settings: SystemSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSave }) => {
  const [platformName, setPlatformName] = useState(settings.platformName);
  const [businessTimezone, setBusinessTimezone] = useState(settings.businessTimezone);
  const [minDeposit, setMinDeposit] = useState(settings.minDeposit);
  const [minWithdrawal, setMinWithdrawal] = useState(settings.minWithdrawal);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);
    
    // Simulate API delay
    setTimeout(() => {
      onSave({
        platformName,
        businessTimezone,
        minDeposit: Number(minDeposit),
        minWithdrawal: Number(minWithdrawal),
        maintenanceMode,
      });
      setSaving(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 1000);
  };

  const timezoneOptions = [
    { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
    { value: 'America/New_York', label: 'Eastern Standard Time (EST / New York)' },
    { value: 'Europe/London', label: 'London Financial Time (GMT / BST)' },
    { value: 'Asia/Singapore', label: 'Singapore Standard Time (SGT / Asia)' },
    { value: 'Asia/Tokyo', label: 'Tokyo Financial Clock (JST / Japan)' }
  ];

  return (
    <div className="space-y-6 text-left max-w-4xl">
      
      {/* Settings form container */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Banner if maintenance mode is active */}
        {maintenanceMode && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gray-900 font-display">System Maintenance Mode Armed</h4>
              <p className="text-[11px] text-gray-500 font-sans leading-normal">
                All client facing logins and trades are blocked. Multi-signature gateways remain active. Public pages will display the maintenance screen.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Platform Config card */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
              <Settings className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">PLATFORM BRAND IDENTIFIER</h3>
            </div>

            <Input
              label="Enterprise Platform Name"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              required
            />

            <Select
              label="Business Operations Timezone"
              options={timezoneOptions}
              value={businessTimezone}
              onChange={(e) => setBusinessTimezone(e.target.value)}
              required
            />
          </Card>

          {/* Operational thresholds card */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
              <Globe className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">CLEARING RISK THRESHOLDS</h3>
            </div>

            <Input
              label="Minimum Inbound Deposit Threshold (USD)"
              type="number"
              value={minDeposit}
              onChange={(e) => setMinDeposit(Number(e.target.value))}
              required
            />

            <Input
              label="Minimum Outbound Withdrawal Limit (USD)"
              type="number"
              value={minWithdrawal}
              onChange={(e) => setMinWithdrawal(Number(e.target.value))}
              required
            />
          </Card>

        </div>

        {/* System switches */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">SYSTEM DEPLOYMENT STATUS</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-gray-950 font-display">Enforce Global Maintenance Mode</span>
              <p className="text-[10px] text-gray-400 max-w-md font-sans leading-relaxed">
                Blocks public endpoints. Restricts access exclusively to authenticated ROOT networks and approved system administrators.
              </p>
            </div>
            <ToggleSwitch
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode(!maintenanceMode)}
            />
          </div>
        </Card>

        {/* Success feedbacks */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {successMsg && (
              <span className="text-xs font-bold text-emerald-600 font-mono flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                System Constants Sync Succeeded
              </span>
            )}
          </div>
          <Button
            type="submit"
            isLoading={saving}
            className="px-6 py-3 text-xs font-bold rounded-2xl"
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Commit Configurations
          </Button>
        </div>

      </form>

    </div>
  );
};
