import React from 'react';
import { Users, ShieldCheck, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Users,
      text: 'Hơn 999+ Khách Hàng',
      subtext: 'Tin tưởng sử dụng',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      icon: ShieldCheck,
      text: 'Bảo Hành 1 Đổi 1',
      subtext: 'Trọn thời gian dùng',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Headphones,
      text: 'Hỗ Trợ 24/7',
      subtext: 'Kích hoạt trong 5 phút',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: CheckCircle2,
      text: 'Chính Hãng 100%',
      subtext: 'Không mất dữ liệu',
      color: 'from-purple-400 to-fuchsia-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8 sm:mt-12">
      {badges.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3 bg-purple-950/40 backdrop-blur-sm border border-purple-800/40 rounded-xl p-3 sm:p-3.5 hover:border-purple-500/60 transition-all duration-300 shadow-md shadow-purple-950/50"
          >
            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${item.color} text-purple-950 flex-shrink-0 shadow-inner`}>
              <Icon className="w-5 h-5 font-bold" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="font-bold text-xs sm:text-sm text-white tracking-tight leading-snug truncate">
                {item.text}
              </p>
              <p className="text-[11px] text-purple-300/80 leading-tight truncate">
                {item.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
