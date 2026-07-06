import React from 'react';

interface MetaFirmLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
}

const MetaFirmLogo: React.FC<MetaFirmLogoProps> = ({
  className = '',
  size = 'md',
  iconOnly = false,
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { width: 28, height: 24, fontSize: 'text-base' };
      case 'lg':
        return { width: 48, height: 40, fontSize: 'text-2xl' };
      case 'xl':
        return { width: 64, height: 54, fontSize: 'text-3xl' };
      case 'md':
      default:
        return { width: 38, height: 32, fontSize: 'text-xl' };
    }
  };

  const dim = getDimensions();

  return (
    <div className={`flex items-center gap-2.5 ${className}`} id="metafirm-brand-logo">
      <svg
        width={dim.width}
        height={dim.height}
        viewBox="0 0 120 100"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        role="img"
      >
        <defs>
          <linearGradient id="metaFirmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E040A7" /> {/* Magenta */}
            <stop offset="35%" stopColor="#9153F4" /> {/* Purple */}
            <stop offset="70%" stopColor="#2F6AEC" /> {/* Blue */}
            <stop offset="100%" stopColor="#13B5E6" /> {/* Cyan */}
          </linearGradient>
        </defs>
        <path
          d="M15 75 C12 55, 18 35, 28 25 C38 15, 48 18, 52 35 C56 50, 60 70, 72 45 C80 28, 86 18, 94 20 C102 22, 108 45, 110 75 L100 75 C98 55, 94 36, 92 34 C90 32, 84 34, 78 48 C70 66, 66 75, 58 75 C50 75, 46 62, 42 50 C38 38, 32 30, 26 34 C20 38, 18 55, 20 75 L15 75 Z"
          fill="url(#metaFirmGradient)"
        />
      </svg>

      {!iconOnly && (
        <span
          className={`font-sans font-extrabold tracking-tight select-none leading-none flex items-center ${dim.fontSize}`}
        >
          <span className="text-[#5899F8]">Meta</span>
          <span className="text-[#1356D8]">Firm</span>
        </span>
      )}
    </div>
  );
};

export default MetaFirmLogo;
