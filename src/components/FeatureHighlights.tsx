import React from 'react';
import { Sparkles, Mic, Video, Cloud, Wand2, Music, Check, Lock } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Wand2,
      title: 'Xóa Nền Video AI 1-Click',
      description: 'Tách nền phông xanh hoặc cảnh phức tạp mịn màng chỉ với 1 cú nhấp chuột mà không cần đạo cụ cồng kềnh.',
      tag: 'HOT AI',
    },
    {
      icon: Mic,
      title: 'Khử Nhiễu Audio & Giọng AI',
      description: 'Lọc âm nhiễu micro, tạo giọng đọc AI tiếng Việt đa dạng giọng vùng miền cực kỳ tự nhiên.',
      tag: 'ĐỘC QUYỀN PRO',
    },
    {
      icon: Video,
      title: 'Xuất Video 4K 60FPS Chuẩn Nét',
      description: 'Không dính logo CapCut watermark, xuất video độ phân giải cao nhất không bị bóp dung lượng.',
      tag: '4K ULTRA HD',
    },
    {
      icon: Music,
      title: 'Kho Nhạc & Hiệu Ứng Bản Quyền',
      description: 'Mở khóa hàng ngàn hiệu ứng chuyển cảnh Pro, lọc màu cinematic & kho nhạc TikTok hot trend.',
      tag: 'TRENDING',
    },
    {
      icon: Cloud,
      title: 'Dung Lượng Mây 1TB Cloud Storage',
      description: 'Đồng bộ dự án quay dựng tức thì giữa điện thoại và máy tính, không sợ mất file khi đổi máy.',
      tag: 'GÓI 1TB',
    },
    {
      icon: Sparkles,
      title: 'Làm Đẹp Khuôn Mặt AI & Auto Sub',
      description: 'Tự động tạo phụ đề tiếng Việt chính xác 98%, chỉnh sửa làn da, răng trắng, thon gọn tự nhiên.',
      tag: 'CHUYÊN NGHIỆP',
    },
  ];

  return (
    <section id="sec-tinh-nang" className="py-16 sm:py-20 bg-[#0e0524] border-b border-purple-900/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-700/60 mb-3">
            <Lock className="w-3.5 h-3.5 text-yellow-400" />
            <span>MỞ KHÓA GIỚI HẠN BẢN FREE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tại Sao Bạn Nên Nâng Cấp{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              CapCut Pro?
            </span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base mt-3">
            Tiết kiệm 80% chi phí edit video, biến mọi clip thô thành phẩm chất lượng triệu view trên mạng xã hội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-card-gradient border border-purple-800/40 hover:border-purple-500/70 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/60 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-yellow-300 group-hover:scale-110 group-hover:bg-purple-800 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider uppercase bg-purple-950 text-purple-300 px-2.5 py-1 rounded-full border border-purple-700/60">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-purple-200/80 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
