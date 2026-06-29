/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { TableContainer } from '../ui/Cards/index.tsx';

export interface AdminWithdrawal {
  id: string;
  userEmail: string;
  amount: number;
  destinationAddress: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  timestamp: string;
}

interface WithdrawalsViewProps {
  withdrawals: AdminWithdrawal[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const WithdrawalsView: React.FC<WithdrawalsViewProps> = ({ withdrawals, onApprove, onReject }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredWithdrawals = withdrawals.filter(w => {
    const matchesSearch = w.userEmail.toLowerCase().includes(search.toLowerCase()) ||
                          w.id.toLowerCase().includes(search.toLowerCase()) ||
                          w.destinationAddress.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage) || 1;
  const paginatedWithdrawals = filteredWithdrawals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadgeColor = (status: AdminWithdrawal['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-100/50';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100/50';
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by ID, email, destination blockchain address..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-gray-200 focus:border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all bg-white"
          />
        </div>

        <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-xl px-2 py-1">
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase px-1.5">Settlement State:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="text-xs font-semibold text-gray-700 focus:outline-none bg-transparent cursor-pointer py-1"
          >
            <option value="All">All Transactions</option>
            <option value="Pending">Pending Audit</option>
            <option value="Approved">Approved / Cleared</option>
            <option value="Rejected">Rejected / Failed</option>
          </select>
        </div>
      </div>

      {/* Financial Settlement table */}
      <TableContainer>
        <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/5">
                Settlement Hash
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/4">
                User Email
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-right w-1/6">
                Debit Value (USD)
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-[22%]">
                Destination Address
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-center w-[12%]">
                Status
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-left w-1/5">
                Timestamp
              </th>
              <th className="py-3 px-5 font-bold text-gray-400 font-mono text-[10px] tracking-wider uppercase text-right w-1/6">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedWithdrawals.length > 0 ? (
              paginatedWithdrawals.map((w) => (
                <tr key={w.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  
                  {/* Settlement Hash */}
                  <td className="py-3.5 px-5 font-mono text-xs text-gray-900 font-bold select-all">
                    {w.id}
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-5 font-semibold text-gray-950">
                    {w.userEmail}
                  </td>

                  {/* Debit Value */}
                  <td className="py-3.5 px-5 text-right font-display font-extrabold text-amber-600">
                    -${w.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Destination blockchain address */}
                  <td className="py-3.5 px-5 font-mono text-[11px] text-gray-500 select-all truncate max-w-[180px]" title={w.destinationAddress}>
                    {w.destinationAddress}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${getStatusBadgeColor(w.status)}`}>
                      {w.status === 'Approved' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      {w.status === 'Rejected' && <XCircle className="w-3 h-3 text-red-500" />}
                      {w.status === 'Pending' && <Clock className="w-3 h-3 text-amber-500 animate-pulse" />}
                      {w.status}
                    </span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-3.5 px-5 text-gray-400 font-mono text-[10px] font-semibold">
                    {w.timestamp}
                  </td>

                  {/* Approval Actions workflow buttons */}
                  <td className="py-3.5 px-5 text-right">
                    {w.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onReject(w.id)}
                          className="px-2.5 py-1 text-[10px] font-bold text-red-600 hover:bg-red-50 border border-red-100 rounded-lg hover:text-red-700 transition-colors cursor-pointer"
                          title="Reject Outbound Debit Request"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => onApprove(w.id)}
                          className="px-2.5 py-1 text-[10px] font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          title="Authorize HSM Cryptographic Signing"
                        >
                          <Cpu className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                      </div>
                    ) : (
                      <span className={`text-[10px] font-mono font-bold uppercase flex items-center justify-end gap-1 select-none ${w.status === 'Approved' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {w.status === 'Approved' ? (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Settled
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5" />
                            Rejected
                          </>
                        )}
                      </span>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400 font-mono text-xs">
                  No pending or finalized withdrawal settlement entries found.
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
            Showing Page <strong className="text-gray-900">{currentPage}</strong> of <strong className="text-gray-900">{totalPages}</strong> ({filteredWithdrawals.length} transactions)
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
