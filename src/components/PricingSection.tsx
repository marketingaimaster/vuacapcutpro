import React, { useState } from 'react';
import { pricingColumns } from '../data/pricingData';
import { PricingColumn, PricingOption, OrderSelection } from '../types';
import { Check, Flame, Shield, Sparkles, Zap, Smartphone, Monitor, Gift, Award } from 'lucide-react';

interface PricingSectionProps {
  onSelectOption: (selection: OrderSelection) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectOption }) => {
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<string>('all');

  const durationFilters = [
    { key: 'all', label: 'Tất Cả Gói' },
    { key: '30 Ngày', label: '1 Tháng (30 Ngày)' },
    { key: '3 Tháng', label: '3 Tháng' },
    { key: '6 Tháng', label: '6 Tháng' },
    { key: '1 Năm', label: '1 Năm (365 Ngày)' },
  ];

  return (
    <section id="sec-bang-gia" className="py-16 sm:py-24 bg-purple-gradient relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-amber-300 mb-4 shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>BẢNG GIÁ ƯU ĐÃI ĐẶC BIỆT - TIẾT KIỆM ĐẾN 80%</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Chọn Gói CapCut Pro Phù Hợp
          </h2>
          <p className="text-purple-200 text-sm sm:text-base mt-3 leading-relaxed">
            Cam kết ổn định, bảo hành đủ thời hạn gói, lỗi 1 đổi 1, hỗ trợ 24/7.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {durationFilters.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedDurationFilter(tab.key)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedDurationFilter === tab.key
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-purple-950/80 text-purple-300 hover:text-white hover:bg-purple-900 border border-purple-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingColumns.map((col) => {
            const isPopular = col.popular;

            return (
              <div
                key={col.id}
                className={`relative rounded-3xl flex flex-col transition-all duration-300 ${
                  isPopular ? 'order-first md:order-none' : ''
                } ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#2b0c54] via-[#1a0836] to-[#120526] border-2 border-pink-500/80 shadow-2xl shadow-pink-900/40 md:-translate-y-3'
                    : 'bg-[#14082e] border border-purple-800/60 hover:border-purple-500/60 shadow-xl'
                }`}
              >
                {/* Popular / Best Seller Tag */}
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-black text-xs uppercase px-5 py-1.5 rounded-full shadow-lg border border-pink-300 flex items-center gap-1.5 tracking-wider whitespace-nowrap">
                    <Sparkles className="w-4 h-4 fill-white flex-shrink-0" />
                    <span>BÁN CHẠY NHẤT 🔥</span>
                  </div>
                )}

                {/* Column Header */}
                <div className="p-6 pb-4 border-b border-purple-900/60 text-center flex flex-col justify-between min-h-[175px]">
                  <div>
                    {col.tag && (
                      <span className={`inline-block text-[11px] font-bold px-3 py-0.5 rounded-full border mb-2 whitespace-nowrap ${
                        isPopular
                          ? 'bg-pink-950/80 text-pink-300 border-pink-700/50'
                          : 'bg-purple-900/60 text-purple-300 border-purple-700/50'
                      }`}>
                        {col.tag}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-black text-white">{col.title}</h3>
                    <p className="text-xs text-purple-300/80 mt-1 font-medium">{col.subtitle}</p>
                  </div>

                  {/* Target Device Note */}
                  <div className="mt-3 bg-purple-950/80 border border-purple-800/60 rounded-xl p-2.5 text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5 min-h-[44px]">
                    <Monitor className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-center">{col.forWho}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="px-6 py-4 border-b border-purple-900/60 bg-purple-950/20">
                  <p className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                    Quyền Lợi Gói:
                  </p>
                  <ul className="space-y-2 text-xs text-purple-200">
                    {col.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Options List */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    {col.options
                      .filter((opt) => selectedDurationFilter === 'all' || opt.duration.includes(selectedDurationFilter.replace(' (30 Ngày)', '').replace(' (365 Ngày)', '')))
                      .map((opt, idx) => (
                        <div
                          key={idx}
                          className="bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 hover:border-purple-500/70 rounded-2xl p-4 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-white text-sm sm:text-base">{opt.duration}</span>
                              {opt.badge && (
                                <span className="bg-red-950 text-red-300 border border-red-700/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                              Tiết kiệm {opt.savings}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between mt-2">
                            <div>
                              <span className="text-xl sm:text-2xl font-black text-yellow-400">{opt.price}</span>
                              {opt.originalPrice && (
                                <span className="text-xs text-purple-400/80 line-through ml-2 font-medium">
                                  {opt.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bonus Gift or Special Note */}
                          {(opt.bonus || opt.note) && (
                            <div className="mt-2 text-[11px] text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-800/40">
                              <Gift className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{opt.bonus || opt.note}</span>
                            </div>
                          )}

                          {/* CTA Button */}
                          <button
                            onClick={() => onSelectOption({ columnTitle: col.title, option: opt })}
                            className={`w-full mt-3 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wide cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md ${
                              isPopular
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-pink-900/50'
                                : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 shadow-amber-500/20'
                            }`}
                          >
                            <Zap className="w-4 h-4 fill-current" />
                            <span>ĐĂNG KÝ GÓI NÀY</span>
                          </button>
                        </div>
                      ))}
                  </div>

                  {/* Warranty Guarantee Note */}
                  <div className="mt-4 pt-3 border-t border-purple-900/60 text-center">
                    <p className="text-[11px] text-purple-300/80 flex items-center justify-center gap-1 font-medium">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Cam kết bảo hành 1 đổi 1 suốt thời gian dùng</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
