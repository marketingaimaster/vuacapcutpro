import React from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface CapCutStickerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFloatingBadges?: boolean;
}

export const CapCutSticker: React.FC<CapCutStickerProps> = ({
  size = 'md',
  className = '',
  showFloatingBadges = true,
}) => {
  const containerClasses = {
    sm: 'w-48 sm:w-52 p-4 sm:p-5',
    md: 'w-60 sm:w-72 p-5 sm:p-7',
    lg: 'w-72 sm:w-80 p-6 sm:p-8',
  };

  const iconSizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 sm:w-40 sm:h-40',
    lg: 'w-40 h-40 sm:w-48 sm:h-48',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const badgeSizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-md',
    md: 'text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[8px]',
    lg: 'text-sm sm:text-base px-3 sm:px-3.5 py-1 rounded-[10px]',
  };

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      {/* Ambient Neon Backglow */}
      <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 rounded-[38px] blur-2xl opacity-35 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"></div>

      {/* Main Die-Cut Vinyl Sticker Card (Matches uploaded image 100%) */}
      <div
        className={`relative bg-white rounded-[28px] sm:rounded-[34px] border-[5px] sm:border-[6px] border-white shadow-[0_20px_45px_rgba(0,0,0,0.65),0_4px_12px_rgba(0,0,0,0.15)] ring-1 ring-purple-300/40 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 ease-out overflow-hidden flex flex-col items-center justify-center ${containerClasses[size]}`}
      >
        {/* Glossy Vinyl Sheen Reflection */}
        <div className="absolute -top-14 -left-14 w-48 h-48 bg-gradient-to-br from-white/70 via-white/15 to-transparent rounded-full blur-md pointer-events-none transform -rotate-45 group-hover:translate-x-28 group-hover:translate-y-28 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>

        {/* Sticker Content: CapCut Icon + Wordmark PRO */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          {/* Authentic CapCut Scissors Logo Mark (Vector SVG) */}
          <div className="flex items-center justify-center w-full py-1">
            <svg
              viewBox="-1 1 26.2 22"
              className={`${iconSizes[size]} text-black fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105`}
              xmlns="http://www.w3.org/2000/svg"
              aria-label="CapCut Logo"
            >
              <path d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z" />
            </svg>
          </div>

          {/* Authentic CapCut Brand Typography + Iridescent PRO Badge */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-2 sm:mt-3 w-full">
            {/* Wordmark "CapCut" */}
            <span
              className={`font-black tracking-tight text-black leading-none select-none ${textSizes[size]}`}
              style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              CapCut
            </span>

            {/* Signature Pastel Iridescent PRO Pill Badge */}
            <div
              className={`bg-gradient-to-r from-[#cad6fd] via-[#decdfb] to-[#ead4f8] text-black font-black uppercase tracking-wider leading-none shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-purple-200/50 flex items-center justify-center ${badgeSizes[size]}`}
            >
              PRO
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Floating Badges */}
      {showFloatingBadges && (
        <>
          {/* Top-Right Badge: GIẢM 80% */}
          <div className="absolute -top-3.5 -right-3 sm:-right-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-purple-950 font-black text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg shadow-amber-500/40 border-2 border-white transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 flex items-center gap-1 z-20">
            <Zap className="w-3 h-3 fill-purple-950" />
            <span>GIẢM 80%</span>
          </div>

          {/* Bottom-Left Badge: 100% Chính Hãng */}
          <div className="absolute -bottom-3 -left-3 sm:-left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full shadow-lg shadow-emerald-900/50 border-2 border-white transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 flex items-center gap-1 z-20">
            <ShieldCheck className="w-3 h-3" />
            <span>100% Chính Hãng</span>
          </div>

          {/* Sparkle decorative element */}
          <div className="absolute -top-2 -left-2 text-yellow-300 animate-pulse pointer-events-none">
            <Sparkles className="w-5 h-5" />
          </div>
        </>
      )}
    </div>
  );
};
