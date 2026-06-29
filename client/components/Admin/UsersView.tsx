/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserMinus, 
  ShieldAlert, 
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import { Card, TableContainer } from '../ui/Cards/index.tsx';
import { Button } from '../ui/Buttons/index.tsx';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  vipTier: 'None' | 'Level 1' | 'Level 2' | 'Level 3';
  status: 'Active' | 'Suspended' | 'Flagged';
  registrationDate: string;
}

interface UsersViewProps {
  users: AdminUser[];
  onUpdateUser: (userId: string, fields: Partial<AdminUser>) => void;
}

export const UsersView: React.FC<UsersViewProps> = ({ users, onUpdateUser }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended' | 'Flagged'>('All');
  const [vipFilter, setVipFilter] = useState<'All' | 'None' | 'Level 1' | 'Level 2' | 'Level 3'>('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Actions menu state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter users based on criteria
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase()) ||
                          u.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    const matchesVip = vipFilter === 'All' || u.vipTier === vipFilter;
    
    return matchesSearch && matchesStatus && matchesVip;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status: AdminUser['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
      case 'Suspended':
        return 'bg-red-50 text-red-700 border-red-100/50';
      case 'Flagged':
        return 'bg-amber-50 text-amber-700 border-amber-100/50';
    }
  };

  const getVipBadgeColor = (vip: AdminUser['vipTier']) => {
    switch (vip) {
      case 'None':
        return 'bg-gray-50 text-gray-400 border-gray-100';
      case 'Level 1':
        return 'bg-blue-50 text-blue-700 border-blue-100/50';
      case 'Level 2':
        return 'bg-purple-50 text-purple-700 border-purple-100/50';
      case 'Level 3':
        return 'bg-amber-50 text-amber-700 border-amber-100/50';
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Search & Filter bar Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between">
        
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by ID, Full Name, Email address..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 focus:border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all bg-white"
          />
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap gap-3 items-center">
          
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-xl px-2 py-1">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase px-1.5">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="text-xs font-semibold text-gray-700 focus:outline-none bg-transparent cursor-pointer py-1"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>

          {/* VIP Filter */}
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-xl px-2 py-1">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase px-1.5">VIP Tier:</span>
            <select
              value={vipFilter}
              onChange={(e) => {
                setVipFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="text-xs font-semibold text-gray-700 focus:outline-none bg-transparent cursor-pointer py-1"
            >
              <option value="All">All Tiers</option>
              <option value="None">None (Standard)</option>
              <option value="Level 1">Level 1 Elite</option>
              <option value="Level 2">Level 2 Prime</option>
              <option value="Level 3">Level 3 Apex</option>
            </select>
          </div>

        </div>

      </div>

      {/* Users Table Container */}
      <TableContainer>
        <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/5">
                User ID
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/4">
                Full Name
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/4">
                Email Address
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-center w-[12%]">
                VIP Tier
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-center w-[12%]">
                Status
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/6">
                Reg Date
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-right w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-150 relative">
                  
                  {/* User ID block */}
                  <td className="py-3.5 px-5 text-left font-mono text-xs text-gray-900 font-bold select-all">
                    {user.id}
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-5 text-left font-display font-bold text-gray-900">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-5 text-left text-gray-500 font-mono text-[11px]">
                    {user.email}
                  </td>

                  {/* VIP Level badge */}
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${getVipBadgeColor(user.vipTier)}`}>
                      <Award className="w-2.5 h-2.5" />
                      {user.vipTier}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest border ${getStatusColor(user.status)}`}>
                      <span className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Flagged' ? 'bg-amber-500' : 'bg-red-500'}`} />
                      {user.status}
                    </span>
                  </td>

                  {/* Reg Date */}
                  <td className="py-3.5 px-5 text-left text-gray-400 font-mono text-[10px] font-semibold">
                    {user.registrationDate}
                  </td>

                  {/* Actions Dropdown desk */}
                  <td className="py-3.5 px-5 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 border border-transparent hover:border-gray-100 transition-colors cursor-pointer"
                        title="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === user.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-gray-100 shadow-xl ring-1 ring-black/5 z-50 py-1.5 text-left">
                            
                            {/* Toggle active status */}
                            {user.status !== 'Active' ? (
                              <button
                                onClick={() => {
                                  onUpdateUser(user.id, { status: 'Active' });
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Activate Account</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  onUpdateUser(user.id, { status: 'Suspended' });
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <UserMinus className="w-3.5 h-3.5" />
                                <span>Suspend Account</span>
                              </button>
                            )}

                            {/* Flag Status switch */}
                            {user.status !== 'Flagged' && (
                              <button
                                onClick={() => {
                                  onUpdateUser(user.id, { status: 'Flagged' });
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-3.5 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                              >
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span>Flag for Security</span>
                              </button>
                            )}

                            <div className="h-px bg-gray-50 my-1" />

                            {/* VIP Tiers Adjustments */}
                            <div className="px-3.5 py-1 text-[8px] font-mono font-extrabold text-gray-400 uppercase tracking-widest">
                              Modify VIP Tier
                            </div>

                            {['Level 1', 'Level 2', 'Level 3'].map((tier) => (
                              <button
                                key={tier}
                                disabled={user.vipTier === tier}
                                onClick={() => {
                                  onUpdateUser(user.id, { vipTier: tier as any });
                                  setActiveMenuId(null);
                                }}
                                className={`w-full flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold ${
                                  user.vipTier === tier 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
                                }`}
                              >
                                <Award className="w-3.5 h-3.5" />
                                <span>Promo to {tier}</span>
                              </button>
                            ))}

                            {user.vipTier !== 'None' && (
                              <button
                                onClick={() => {
                                  onUpdateUser(user.id, { vipTier: 'None' });
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-3.5 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <Award className="w-3.5 h-3.5" />
                                <span>Revoke VIP status</span>
                              </button>
                            )}

                          </div>
                        </>
                      )}
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400 font-mono text-xs">
                  No matching user accounts found in general ledger.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableContainer>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-gray-400">
            Showing Page <strong className="text-gray-900">{currentPage}</strong> of <strong className="text-gray-900">{totalPages}</strong> ({filteredUsers.length} total entries)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
