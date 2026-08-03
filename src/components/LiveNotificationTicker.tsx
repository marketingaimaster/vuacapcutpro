import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';

interface TickerItem {
  name: string;
  location: string;
  packageText: string;
  timeAgo: string;
}

const mockPurchases: TickerItem[] = [
  { name: 'Anh Hoàng', location: 'Hà Nội', packageText: 'Gói Tối Đa - 1 Năm', timeAgo: '1 phút trước' },
  { name: 'Chị Thảo', location: 'TP.HCM', packageText: 'Gói Mail Chính Chủ - 6 Tháng', timeAgo: '3 phút trước' },
  { name: 'Minh Đức', location: 'Đà Nẵng', packageText: 'Gói Phổ Thông - 30 Ngày', timeAgo: '5 phút trước' },
  { name: 'Lê Hải', location: 'Hải Phòng', packageText: 'Gói Tối Đa - 6 Tháng', timeAgo: '8 phút trước' },
  { name: 'Chị Mai', location: 'Cần Thơ', packageText: 'Gói Mail Chính Chủ - 1 Năm', timeAgo: '12 phút trước' },
];

export const LiveNotificationTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first popup after 3 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Loop interval
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockPurchases.length);
        setVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const current = mockPurchases[currentIndex];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-30 max-w-xs sm:max-w-sm bg-[#160a33]/95 border border-purple-500/60 rounded-2xl p-3 shadow-2xl backdrop-blur-md animate-slideUp">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-purple-950 flex items-center justify-center flex-shrink-0 font-bold shadow-md">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-left overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white truncate">{current.name}</span>
              <span className="text-[10px] text-purple-300">({current.location})</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            </div>
            <p className="text-[11px] text-yellow-300 font-semibold truncate mt-0.5">
              Đã đăng ký: {current.packageText}
            </p>
            <p className="text-[10px] text-purple-400 font-mono mt-0.5">{current.timeAgo}</p>
          </div>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-purple-400 hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
