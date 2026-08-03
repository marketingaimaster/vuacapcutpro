import React from 'react';
import { customerReviews } from '../data/reviewData';
import { Star, CheckCircle, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="sec-khach-hang" className="py-16 sm:py-24 bg-[#0c041c] border-b border-purple-900/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NGƯỜI THẬT VIỆC THẬT • HƠN 999+ ĐÁNH GIÁ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Khách Hàng Nói Gì Về{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              Vua Capcutpro Tuấn Anh?
            </span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base mt-3">
            Hàng ngàn khách hàng, chủ Shop Online đã tin tưởng sử dụng dịch vụ Vua Capcutpro Tuấn Anh
          </p>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-card-gradient border border-purple-800/60 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/70 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* User Info Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/60 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-white text-base">{rev.name}</h3>
                        {rev.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-400 fill-blue-950" />
                        )}
                      </div>
                      <p className="text-xs text-purple-300/80">{rev.role}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-purple-400 font-medium bg-purple-950 px-2.5 py-1 rounded-full border border-purple-800/60">
                    {rev.date}
                  </span>
                </div>

                {/* Star Rating & Package Used */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
                    {rev.packageUsed}
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-purple-100 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Simulated Zalo Chat Screenshot Snippet Box */}
              {rev.chatSnippet && (
                <div className="mt-4 pt-4 border-t border-purple-900/60">
                  <div className="bg-[#110526] rounded-xl p-3.5 border border-purple-800/40 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-purple-400 font-mono mb-1">
                      <span className="flex items-center gap-1 text-blue-400 font-bold">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Ảnh chụp tin nhắn Zalo hỗ trợ</span>
                      </span>
                      <span>{rev.chatSnippet.time}</span>
                    </div>

                    {/* Customer Bubble */}
                    <div className="flex justify-start">
                      <div className="bg-purple-900/70 text-purple-100 text-xs px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] border border-purple-700/50">
                        {rev.chatSnippet.message}
                      </div>
                    </div>

                    {/* Shop Tuấn Anh Bubble */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-2 rounded-xl rounded-tr-none max-w-[85%] font-medium shadow-sm">
                        {rev.chatSnippet.reply}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Callout Quote Banner */}
        <div className="mt-12 text-center bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 border border-purple-700/60 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-lg sm:text-xl font-black text-white">
            "Niềm tin và uy tín là nền tảng của mọi sự phát triển"
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-2">
            Hỗ trợ khách hàng nhiệt tình kể cả 12h đêm. Cam kết làm ăn lâu dài, chuẩn chỉ 100%!
          </p>
        </div>

      </div>
    </section>
  );
};
