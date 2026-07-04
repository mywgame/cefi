/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MetaFirmLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MetaFirmLogo: React.FC<MetaFirmLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { width: '28px', height: '28px', fontSize: 'text-base' };
      case 'lg':
        return { width: '48px', height: '48px', fontSize: 'text-2xl' };
      case 'md':
    default:
        return { width: '36px', height: '36px', fontSize: 'text-xl' };
    }
  };

  const dim = getDimensions();

  return (
    <div className={`flex items-center gap-2.5 ${className}`} id="metafirm-brand-logo">
      {/* Abstract overlapping futuristic M icon with purple-to-blue-to-pink gradient */}
      <svg
        style={{ width: dim.width, height: dim.height }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 filter drop-shadow-sm"
      >
        <defs>
          <linearGradient id="metafirm-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" /> {/* Pink/Magenta */}
            <stop offset="50%" stopColor="#8b5cf6" /> {/* Violet */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
          </linearGradient>
          <linearGradient id="metafirm-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* Left vertical pillar */}
        <path
          d="M6 34V6C6 6 12 10 16 16V34H6Z"
          fill="url(#metafirm-grad-1)"
          opacity="0.95"
        />
        {/* Middle swooping intersection */}
        <path
          d="M16 16L24 24L32 10V34H24V24L16 34V16Z"
          fill="url(#metafirm-grad-2)"
          opacity="0.9"
        />
        {/* Right protective enterprise wing */}
        <path
          d="M32 10C34.5 13 34 26 34 34H26V24L32 10Z"
          fill="url(#metafirm-grad-1)"
          opacity="0.85"
        />
      </svg>

      {!iconOnly && (
        <span className={`font-display font-black text-gray-950 tracking-tight select-none ${dim.fontSize}`}>
          Meta<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Firm</span>
        </span>
      )}
    </div>
  );
};

export default MetaFirmLogo;
