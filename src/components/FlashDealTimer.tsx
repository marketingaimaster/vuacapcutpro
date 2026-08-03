import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';

export const FlashDealTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 48,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-950/80 via-purple-950/80 to-red-950/80 border border-red-500/40 rounded-full px-4 py-2 shadow-lg shadow-red-900/20 backdrop-blur-md">
      <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs sm:text-sm uppercase tracking-wider animate-pulse">
        <Flame className="w-4 h-4 fill-red-500 text-red-500" />
        <span>ƯU ĐÃI GIẢM 80% CHỈ CÒN:</span>
      </div>
      <div className="flex items-center gap-1 text-white font-mono font-bold text-xs sm:text-sm">
        <span className="bg-red-600 px-2 py-0.5 rounded text-white shadow-inner">{formatNum(timeLeft.hours)}</span>
        <span className="text-red-400">:</span>
        <span className="bg-red-600 px-2 py-0.5 rounded text-white shadow-inner">{formatNum(timeLeft.minutes)}</span>
        <span className="text-red-400">:</span>
        <span className="bg-red-600 px-2 py-0.5 rounded text-white shadow-inner">{formatNum(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};
