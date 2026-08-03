import React from 'react';
import { Sparkles, ArrowDown, Check, Play, Zap, Crown } from 'lucide-react';
import { TrustBadges } from './TrustBadges';
import { FlashDealTimer } from './FlashDealTimer';

export const HeroSection: React.FC = () => {
  const scrollToPricing = () => {
    const pricingElem = document.getElementById('sec-bang-gia');
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-purple-gradient border-b border-purple-900/40">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Flash Deal Timer Header */}
        <div className="mb-6 inline-block">
          <FlashDealTimer />
        </div>

        {/* Brand Tagline Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-900/60 border border-purple-500/40 text-purple-200">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span>Thương Hiệu Số 1 Vua Capcutpro Tuấn Anh</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-tight mb-6">
          Nâng Cấp CapCut Pro Chính Hãng Mở Khóa Mọi Tính Năng
          <span className="block mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 underline decoration-yellow-500/50 decoration-wavy">
            Giá Rẻ Hơn 80% Trên App Capcut!
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-purple-100/90 font-normal max-w-3xl mx-auto leading-relaxed mb-8">
          Cam kết ổn định, bảo hành trọn thời gian sử dụng. Nâng tầm video trên các nền tảng Tiktok, Facebook, Youtube,... của bạn ngay hôm nay cùng{' '}
          <strong className="text-yellow-300 font-bold underline">Vua Capcutpro Tuấn Anh</strong>.
        </p>

        {/* Primary CTA Button with pulsing glow and vibration animation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={scrollToPricing}
            className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-purple-950 font-black text-lg sm:text-xl tracking-wide uppercase shadow-2xl animate-pulse-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 border-2 border-yellow-200/80"
          >
            <Zap className="w-6 h-6 fill-purple-950" />
            <span>XEM BẢNG GIÁ ƯU ĐÃI NGAY</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>

        {/* Short Key Benefit Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-purple-200 font-medium mb-10">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Kích hoạt trong 1 phút</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Sử dụng ổn định</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Bảo hành đủ thời hạn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Lỗi 1 đổi 1</span>
          </div>
        </div>

        {/* Visual CapCut Pro Product Preview Box */}
        <div className="relative max-w-4xl mx-auto rounded-2xl p-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 shadow-2xl shadow-purple-950">
          <div className="bg-[#0f0728] rounded-[15px] p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-900/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-xs text-purple-300 font-mono ml-2">CapCut Pro Workspace • Vua Capcutpro Edition</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/40">
                ● PRO Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-950/50 p-3.5 rounded-xl border border-purple-800/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-800/60 text-yellow-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Công Cụ AI Độc Quyền</h4>
                  <p className="text-[11px] text-purple-200/80 mt-0.5">Xóa phông AI, làm nét mặt, đổi giọng đọc chuẩn tiếng Việt.</p>
                </div>
              </div>

              <div className="bg-purple-950/50 p-3.5 rounded-xl border border-purple-800/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-800/60 text-fuchsia-300">
                  <Play className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Mẫu Pro Hot Trend</h4>
                  <p className="text-[11px] text-purple-200/80 mt-0.5">Kho hiệu ứng, chuyển cảnh, lọc màu & âm nhạc bản quyền.</p>
                </div>
              </div>

              <div className="bg-purple-950/50 p-3.5 rounded-xl border border-purple-800/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-800/60 text-cyan-300">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Xuất Video 4K 60FPS</h4>
                  <p className="text-[11px] text-purple-200/80 mt-0.5">Sắc nét tuyệt đối, không có logo watermark gián đoạn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <TrustBadges />

      </div>
    </section>
  );
};
