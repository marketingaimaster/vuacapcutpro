import React from 'react';
import { Sparkles, Mic, Video, Cloud, Wand2, Music, Lock, Building2, ShoppingBag, Compass, Radio, Film, GraduationCap, ExternalLink } from 'lucide-react';

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

  const videoTypes = [
    {
      icon: Building2,
      badge: 'Bất Động Sản',
      title: 'Video Bất Động Sản & Review Nhà Đất',
      desc: 'Màu Cinematic sang trọng, tracking chữ 3D nổi và thước phim flycam mượt mà.',
      tagColor: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40',
      link: 'https://www.tiktok.com/@emlinhnhaxinh/video/7533959964503657746',
    },
    {
      icon: ShoppingBag,
      badge: 'Bán Hàng Online',
      title: 'Video TikTok Shop & Bán Hàng',
      desc: 'Phụ đề nhảy chữ bắt trend, giọng đọc AI tiếng Việt chốt đơn thu hút khách.',
      tagColor: 'from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/40',
      link: 'https://www.tiktok.com/@halinhofficial/video/7674519085614370066',
    },
    {
      icon: Compass,
      badge: 'VLOG Du Lịch',
      title: 'VLOG Du Lịch, Ẩm Thực & Đời Sống',
      desc: 'Chuyển cảnh Pro giật gân, bộ lọc màu phim điện ảnh và hiệu ứng âm thanh sống động.',
      tagColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40',
      link: 'https://www.tiktok.com/@nguyen.nhan.28/video/7672406253741690133?q=du%20l%E1%BB%8Bch&t=1788881241506',
    },
    {
      icon: Radio,
      badge: 'Podcast & Voice',
      title: 'Podcast & Bản Tin AI Tự Động',
      desc: 'Tự động tạo phụ đề chính xác 98%, khử sạch tiếng ồn micro như thu âm studio.',
      tagColor: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/40',
      link: 'https://www.tiktok.com/@thaukinhdinhduong26/video/7594155041410338069?q=video%20AI&t=1788881375099',
    },
    {
      icon: Film,
      badge: 'Doanh Nghiệp',
      title: 'Intro & Video Giới Thiệu Công Ty',
      desc: 'Hiệu ứng VIP độc quyền, xuất file 4K 60FPS sắc nét không dính logo watermark.',
      tagColor: 'from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/40',
      link: 'https://www.tiktok.com/@daiviet.jsc/video/7452663529175567624',
    },
    {
      icon: GraduationCap,
      badge: 'Khóa Học & Chia Sẻ',
      title: 'Video Khóa Học & Kiến Thức AI',
      desc: 'Xóa phông xanh 1 chạm, chèn hình ảnh B-roll và sticker đồ họa hướng dẫn trực quan.',
      tagColor: 'from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/40',
      link: 'https://www.tiktok.com/@taion_aiwork/video/7680893804131454229',
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

        {/* Mục nhỏ phía dưới cùng: Các Video Bạn Có Thể Làm Khi Có Capcutpro */}
        <div className="mt-14 pt-10 border-t border-purple-800/40">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-amber-300 border border-amber-500/40 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SÁNG TẠO KHÔNG GIỚI HẠN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Các Video Bạn Có Thể Làm Khi Có Capcutpro
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/80 mt-1.5">
              Tối ưu cho mọi nền tảng TikTok, Facebook Reels, YouTube Shorts & video chất lượng cao
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoTypes.map((item, idx) => {
              const TypeIcon = item.icon;
              const isLinked = !!item.link;

              if (isLinked) {
                return (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 hover:border-pink-500/80 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-900/30 cursor-pointer block"
                  >
                    <div className="flex items-center justify-between gap-2.5 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-900/80 border border-purple-700/60 flex items-center justify-center text-amber-300 shrink-0">
                          <TypeIcon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-gradient-to-r ${item.tagColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-pink-300 bg-pink-950/80 group-hover:bg-pink-600 group-hover:text-white px-2 py-0.5 rounded-full border border-pink-600/50 transition-all">
                        <span>Xem mẫu TikTok</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 group-hover:text-pink-300 transition-colors flex items-center gap-1.5">
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs text-purple-300/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </a>
                );
              }

              return (
                <div
                  key={idx}
                  className="bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/50 hover:border-purple-600/70 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-900/80 border border-purple-700/60 flex items-center justify-center text-amber-300 shrink-0">
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-gradient-to-r ${item.tagColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-purple-300/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
