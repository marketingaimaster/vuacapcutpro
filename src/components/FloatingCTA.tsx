import React from 'react';
import { MessageCircle, PhoneCall, Zap, Crown } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const zaloUrl = 'https://zalo.me/0363344348';

  const scrollToPricing = () => {
    const elem = document.getElementById('sec-bang-gia');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Desktop & Tablet Bottom-Right Zalo Widget */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2">
        {/* Status Bubble */}
        <div className="bg-[#18093c] border border-purple-500/60 text-white text-xs px-3 py-1.5 rounded-2xl shadow-xl shadow-purple-950/80 flex items-center gap-2 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold text-[11px]">Tuấn Anh Online • Hỗ trợ ngay</span>
        </div>

        {/* Zalo Button */}
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3.5 rounded-full font-black text-sm shadow-2xl shadow-blue-900/60 border-2 border-blue-300/40 hover:scale-105 transition-all duration-300"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-600"></span>
          </div>
          <span className="uppercase tracking-wider">NHẮN ZALO TƯ VẤN</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (Fixed to bottom screen) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0c041c]/95 border-t border-purple-700/60 p-2.5 backdrop-blur-lg shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={scrollToPricing}
            className="w-1/3 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-black text-xs uppercase tracking-tight flex items-center justify-center gap-1 shadow-md cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 fill-purple-950" />
            <span>XEM GIÁ</span>
          </button>

          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg animate-pulse"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>NHẮN ZALO TƯ VẤN NGAY</span>
          </a>
        </div>
      </div>
    </>
  );
};
