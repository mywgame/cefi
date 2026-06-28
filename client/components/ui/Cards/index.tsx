/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TOKENS } from '../theme.ts';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-gray-100/80 rounded-[32px] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.02)] ${
        hoverEffect ? 'hover:border-blue-100/80 hover:shadow-[0_24px_48px_rgba(37,99,235,0.04)] transition-all duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendDirection = 'neutral',
  className = '',
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-white border border-gray-100/80 rounded-[32px] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.02)] hover:border-blue-100/80 hover:shadow-[0_24px_48px_rgba(37,99,235,0.05)] text-center sm:text-left flex flex-col justify-between items-center sm:items-start group ${className}`}
      {...props}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
        {icon && (
          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-blue-600 shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1 text-center sm:text-left flex-grow">
          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
            {title}
          </span>
          <span className="text-2xl sm:text-3xl font-display font-extrabold text-gray-950 block leading-tight">
            {value}
          </span>
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-3 border-t border-gray-50/80 w-full flex items-center justify-center sm:justify-start space-x-1.5 text-[10px] font-mono">
          <span
            className={`font-bold ${
              trendDirection === 'up'
                ? 'text-emerald-600'
                : trendDirection === 'down'
                ? 'text-red-600'
                : 'text-gray-400'
            }`}
          >
            {trend}
          </span>
          <span className="text-gray-400">vs Last Period</span>
        </div>
      )}
    </motion.div>
  );
};

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: 'primary' | 'amber' | 'emerald';
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  icon,
  badge,
  badgeVariant = 'primary',
  className = '',
  ...props
}) => {
  const badgeColors = {
    primary: 'bg-blue-50 text-blue-700 border border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  };

  return (
    <div
      className={`bg-white border border-gray-100/80 rounded-[32px] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.02)] hover:border-blue-100/80 hover:shadow-[0_24px_48px_rgba(37,99,235,0.04)] transition-all duration-300 text-left space-y-4 group ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        {icon && (
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            {icon}
          </div>
        )}
        {badge && (
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-wider ${badgeColors[badgeVariant]}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display font-semibold text-gray-950 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <div className="text-xs text-gray-500 leading-relaxed font-sans">
          {children}
        </div>
      </div>
    </div>
  );
};

export const GlassCard: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.03)] relative overflow-hidden ${
        hoverEffect ? 'hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)] transition-all duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const TableContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-3xl shadow-xs overflow-hidden ${className}`}
      {...props}
    >
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
