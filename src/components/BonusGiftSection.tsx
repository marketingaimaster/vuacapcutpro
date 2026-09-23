import React, { useState } from 'react';
import {
  Gift,
  Folder,
  FolderOpen,
  Sparkles,
  Film,
  Zap,
  Type,
  Music,
  Sliders,
  Palette,
  ShieldCheck,
  Maximize2,
  CheckCircle2,
  Download,
  ArrowRight,
  HardDrive,
  Eye,
  Layers,
  Smile,
  Volume2
} from 'lucide-react';

interface ResourceItem {
  id: string;
  folderName: string;
  shortTitle: string;
  count: string;
  category: 'video' | 'audio' | 'graphic' | 'color';
  categoryLabel: string;
  description: string;
  highlights: string[];
  format: string;
  size: string;
  icon: React.ElementType;
  accentColor: string;
}

export const BonusGiftSection: React.FC<{ onClaimGift: () => void }> = ({ onClaimGift }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'drive'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<ResourceItem | null>(null);

  const resourceList: ResourceItem[] = [
    {
      id: 'bg-video',
      folderName: '50+ Backgroud video - Vua Capcut Pro Tuấn Anh',
      shortTitle: '50+ Background Video Động',
      count: '50+ Videos',
      category: 'video',
      categoryLabel: 'Video Nền',
      description: 'Phông nền motion background 4K/Full HD, hiệu ứng hạt bụi cinematic, ánh sáng sân khấu và loop vô tận cực đẹp.',
      highlights: ['Độ phân giải Full HD & 4K siêu nét', 'Loop chuyển động mượt mà không giật lag', 'Chuyên dùng làm phông nền podcast, talking-head, vlog'],
      format: 'MP4 / 60fps',
      size: '8.4 GB',
      icon: Film,
      accentColor: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'transition',
      folderName: '50+ Chuyển cảnh - Vua Capcut Pro Tuấn Anh',
      shortTitle: '50+ Hiệu Ứng Chuyển Cảnh',
      count: '50+ Effects',
      category: 'video',
      categoryLabel: 'Chuyển Cảnh',
      description: 'Bộ sưu tập chuyển cảnh bắt trend TikTok: Zoom In/Out, Glitch, Whip Pan, Film Roll, Light Leak cắt nhịp video cực cuốn.',
      highlights: ['Có kênh Alpha tách nền tự động', 'Chỉ cần kéo thả vào CapCut ăn khớp 1 chạm', 'Tăng nhịp điệu kích thích người xem giữ mắt lại'],
      format: 'Alpha MOV / MP4 Overlay',
      size: '4.2 GB',
      icon: Zap,
      accentColor: 'from-amber-500 to-rose-500',
    },
    {
      id: 'text-effect',
      folderName: '50+ Text Hiệu Ứng - Vua Capcut Pro Tuấn Anh',
      shortTitle: '50+ Text & Title Động Sáng Tạo',
      count: '50+ Text Styles',
      category: 'graphic',
      categoryLabel: 'Hiệu Ứng Chữ',
      description: 'Mẫu tiêu đề giật gân, chữ phát sáng Neon Glow, Kinetic Typography động chuẩn phong cách video viral triệu view.',
      highlights: ['Hiệu ứng nảy chữ, lóa sáng bắt mắt 3 giây đầu', 'Dễ dàng thay đổi nội dung chữ theo ý muốn', 'Tối ưu độ tương phản trên mọi nền video'],
      format: 'CapCut Template / Overlay',
      size: '2.8 GB',
      icon: Type,
      accentColor: 'from-fuchsia-500 to-pink-600',
    },
    {
      id: 'illustration',
      folderName: '100+ Hình Minh Họa - Vua Capcut Pro Tuấn Anh',
      shortTitle: '100+ Sticker & Hình Minh Họa 3D',
      count: '100+ Stickers',
      category: 'graphic',
      categoryLabel: 'Đồ Họa & Icon',
      description: 'Kho icon 3D nổi bật, sticker PNG tách nền chuẩn nét, mũi tên chỉ dẫn, biểu cảm vui nhộn cho video review & giáo dục.',
      highlights: ['Ảnh PNG trong suốt 300 DPI không viền trắng', 'Icon mạng xã hội: TikTok, YouTube, Like, Share', 'Họa tiết sticker vẽ tay vui nhộn tăng tính giải trí'],
      format: 'PNG Trong Suốt (Alpha)',
      size: '1.9 GB',
      icon: Smile,
      accentColor: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'lut-camera',
      folderName: '100+ LUT Backmagic Camera - Vua Capcut Pro Tuấn Anh',
      shortTitle: '100+ LUT Màu Điện Ảnh Blackmagic',
      count: '100+ LUTs',
      category: 'color',
      categoryLabel: 'Màu Sắc / LUT',
      description: 'Preset màu Blackmagic điện ảnh Hollywood, tone màu phim hoài cổ, tone da trắng hồng rạng rỡ, áp 1 chạm đẹp tức thì.',
      highlights: ['Tone màu phim nhựa Cine Teal & Orange', 'Tone trắng sáng mịn da tự nhiên chuẩn sao Hàn', 'Tương thích 100% mục Bộ Lọc / LUT trên CapCut'],
      format: '.CUBE / 3D LUT',
      size: '850 MB',
      icon: Sliders,
      accentColor: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'font-viet-hoa',
      folderName: '1000+ Font Việt Hóa Edit - Vua Capcut Pro Tuấn Anh',
      shortTitle: '1000+ Font Chữ Việt Hóa Tuyển Chọn',
      count: '1000+ Fonts',
      category: 'graphic',
      categoryLabel: 'Font Chữ',
      description: 'Kho font chữ việt hóa chuẩn 100% không lỗi dấu, đầy đủ phong cách: font tiêu đề mạnh mẽ, font tròn mập cute, font vlog viết tay.',
      highlights: ['Đã việt hóa toàn bộ ký tự có dấu tiếng Việt', 'Cài đặt trực tiếp vào điện thoại và máy tính', 'Font chữ được các YouTuber, TikToker hàng đầu sử dụng'],
      format: 'TTF / OTF Cài Đặt',
      size: '1.2 GB',
      icon: Type,
      accentColor: 'from-orange-500 to-amber-600',
    },
    {
      id: 'sound-effects',
      folderName: '1000+ Sound effect, nhạc nền video - Vua Capcut Pro Tuấn Anh',
      shortTitle: '1000+ Âm Thanh & Nhạc Nền Hot Trend',
      count: '1000+ Audio',
      category: 'audio',
      categoryLabel: 'Âm Thanh & Nhạc',
      description: 'Kho sound FX đa dạng: tiếng Whoosh, Pop, Ting ting, tiếng cười meme hài, kịch tính hồi hộp và danh sách nhạc nền không bản quyền.',
      highlights: ['Âm thanh chuẩn 320kbps trong trẻo, không rè', 'Phân loại theo cảm xúc: vui nhộn, giật gân, xúc động', 'Không bị quét bản quyền khi đăng TikTok/Facebook'],
      format: 'MP3 / WAV High Quality',
      size: '6.5 GB',
      icon: Volume2,
      accentColor: 'from-red-500 to-rose-600',
    },
    {
      id: 'gradient',
      folderName: 'Gradient - Vua Capcut Pro Tuấn Anh',
      shortTitle: 'Bộ Gradient Nền Hiện Đại',
      count: '50+ Gradients',
      category: 'color',
      categoryLabel: 'Gradient Nền',
      description: 'Dải màu chuyển Gradient thời thượng theo xu hướng thiết kế 2026, tạo chiều sâu thẩm mỹ cực cao cho video và thumbnail.',
      highlights: ['Tạo độ sang trọng cho video bán hàng và chia sẻ', 'Tỷ lệ khung hình chuẩn 9:16 (Dọc) và 16:9 (Ngang)', 'Màu sắc phối hài hòa, tôn chữ và chủ thể'],
      format: 'PNG / JPG 4K UHD',
      size: '1.5 GB',
      icon: Palette,
      accentColor: 'from-violet-500 to-purple-600',
    },
    {
      id: 'safe-zone',
      folderName: 'Khung vi phạm nền tảng - Vua Capcut Pro Tuấn Anh',
      shortTitle: 'Khung Căn Chuẩn Nền Tảng (Safe Zone)',
      count: 'Trọn Bộ Thước Căn',
      category: 'graphic',
      categoryLabel: 'Thước Căn Chỉnh',
      description: 'Lưới đo tỷ lệ an toàn hiển thị cho TikTok, Reels, Shorts giúp phụ đề và nút kêu gọi không bao giờ bị nút like/comment che mất.',
      highlights: ['Tránh lỗi che chữ nghiêm trọng khiến tụt tương tác', 'Thước đo hiển thị rõ vùng cấm (nút like, mô tả, âm thanh)', 'Chỉ cần kéo đè lên timeline khi căn chỉnh rồi xóa'],
      format: 'PNG Thước Đo Chuẩn',
      size: '350 MB',
      icon: Layers,
      accentColor: 'from-yellow-500 to-emerald-600',
    },
    {
      id: 'meme-broll',
      folderName: 'Video meme Broll - Vua Capcutpro Tuấn Anh',
      shortTitle: 'Kho Video Meme & Cảnh B-Roll Hút Mắt',
      count: '200+ Clips',
      category: 'video',
      categoryLabel: 'Meme & B-Roll',
      description: 'Tập hợp các đoạn clip meme kinh điển gây cười, cảnh chèn b-roll minh họa điện ảnh giữ chân người xem đến giây cuối cùng.',
      highlights: ['Meme hot trend Việt Nam & quốc tế cắt sẵn', 'Cảnh B-roll công nghệ, đếm tiền, suy nghĩ, bất ngờ', 'Bí quyết giúp giữ chân xem hết video đạt đề xuất'],
      format: 'MP4 Tách Nền & Full Khung',
      size: '7.8 GB',
      icon: Film,
      accentColor: 'from-blue-600 to-indigo-700',
    },
  ];

  const filteredResources = activeFilter === 'all'
    ? resourceList
    : resourceList.filter((item) => item.category === activeFilter);

  return (
    <section id="sec-qua-tang" className="py-16 sm:py-24 bg-[#0a0318] relative overflow-hidden border-t border-purple-900/50">
      {/* Background Neon Elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 mb-4 shadow-lg shadow-amber-950/40">
            <Gift className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="tracking-wide uppercase">QUÀ TẶNG KÈM ĐỘC QUYỀN TRỊ GIÁ &gt;200.000Đ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Kho Tài Nguyên Edit Video VIP
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              Tặng Kèm Miễn Phí 100% Khi Nâng Cấp
            </span>
          </h2>

          <p className="text-purple-200 text-sm sm:text-base mt-4 leading-relaxed">
            Khách hàng đăng ký bất kỳ gói CapCut Pro nào tại <strong className="text-yellow-300">Vua Capcutpro Tuấn Anh</strong> đều được nhận ngay link <strong className="text-emerald-400">Google Drive VIP vĩnh viễn</strong> chứa trọn bộ <strong className="text-white">10 thư mục tài nguyên</strong> đồ sộ dưới đây.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-purple-900/60">
            <div className="bg-purple-950/60 border border-purple-800/40 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-300">10 Thư Mục</div>
              <div className="text-[11px] text-purple-300/80 font-medium mt-0.5">Phân loại chuyên nghiệp</div>
            </div>
            <div className="bg-purple-950/60 border border-purple-800/40 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100% Sẵn Dùng</div>
              <div className="text-[11px] text-purple-300/80 font-medium mt-0.5">Kéo thả dùng ngay</div>
            </div>
            <div className="bg-purple-950/60 border border-purple-800/40 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-300">Google Drive</div>
              <div className="text-[11px] text-purple-300/80 font-medium mt-0.5">Tải tốc độ cao vĩnh viễn</div>
            </div>
            <div className="bg-purple-950/60 border border-purple-800/40 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-pink-400">0 Đồng</div>
              <div className="text-[11px] text-purple-300/80 font-medium mt-0.5">Thị trường bán &gt;200k</div>
            </div>
          </div>
        </div>

        {/* Toolbar: Category Filters & View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#14082e] p-2.5 sm:p-3 rounded-2xl border border-purple-800/50 shadow-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
              }`}
            >
              Tất Cả Thư Mục (10)
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'video'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
              }`}
            >
              🎬 Video & Chuyển Cảnh (3)
            </button>
            <button
              onClick={() => setActiveFilter('graphic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'graphic'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
              }`}
            >
              🎨 Font, Text & Đồ Họa (4)
            </button>
            <button
              onClick={() => setActiveFilter('audio')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'audio'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
              }`}
            >
              🔊 Âm Thanh (1)
            </button>
            <button
              onClick={() => setActiveFilter('color')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'color'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-900/60'
              }`}
            >
              🌈 Màu Sắc & LUTs (2)
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-purple-950/80 p-1 rounded-xl border border-purple-800/60 shrink-0 self-end sm:self-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Dạng Thẻ VIP</span>
            </button>
            <button
              onClick={() => setViewMode('drive')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'drive'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dạng Google Drive</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Luxury Visual Cards Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFolder(item)}
                  className="bg-[#150a30] hover:bg-[#1b0d3d] border border-purple-800/50 hover:border-amber-400/60 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-purple-950/50 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                >
                  {/* Glowing corner accent */}
                  <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl ${item.accentColor} opacity-20 group-hover:opacity-40 rounded-full blur-xl transition-opacity`}></div>

                  <div>
                    {/* Top Row: Folder Icon & Category Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.accentColor} p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}>
                          <div className="w-full h-full bg-[#120726] rounded-[14px] flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2 py-0.5 rounded-md border border-purple-800/60">
                            {item.categoryLabel}
                          </span>
                          <span className="block text-xs font-bold text-amber-300 mt-1">
                            {item.count}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800/40">
                        VIP Tải Ngay
                      </span>
                    </div>

                    {/* Official Folder Name (Exact from image) */}
                    <div className="flex items-center gap-1.5 text-xs text-purple-300/90 font-medium mb-1.5 bg-[#0e041d] p-2 rounded-xl border border-purple-900/60">
                      <Folder className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{item.folderName}</span>
                    </div>

                    {/* Short Title & Description */}
                    <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors mt-2 mb-2">
                      {item.shortTitle}
                    </h3>
                    <p className="text-purple-200/90 text-xs leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-1.5 mb-5 border-t border-purple-900/50 pt-3">
                      {item.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-purple-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-purple-900/60 flex items-center justify-between text-xs">
                    <span className="text-purple-400 text-[11px] font-medium">
                      Định dạng: <strong className="text-purple-200">{item.format}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-300 group-hover:text-amber-200 font-bold">
                      <span>Chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Authentic Google Drive VIP Explorer */}
        {viewMode === 'drive' && (
          <div className="bg-[#110729] rounded-3xl border border-purple-800/60 shadow-2xl overflow-hidden">
            {/* Google Drive Header Simulation */}
            <div className="bg-[#0b031b] px-4 sm:px-6 py-4 border-b border-purple-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Google Drive Logo Visual */}
                <div className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
                    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                    <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                    <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">
                      Google Drive VIP: Vua Capcut Pro Tuấn Anh
                    </span>
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                      Đã Cấp Quyền Tải Vĩnh Viễn
                    </span>
                  </div>
                  <p className="text-xs text-purple-300/70">Đầy đủ trọn bộ / Không giới hạn băng thông tải về</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-purple-300">
                <span className="hidden sm:inline">Tổng cộng:</span>
                <strong className="text-amber-300 bg-purple-900/60 px-2 py-1 rounded-lg border border-purple-800">
                  {filteredResources.length} Thư Mục
                </strong>
              </div>
            </div>

            {/* Simulated Drive File List Table */}
            <div className="divide-y divide-purple-900/40 overflow-x-auto">
              {filteredResources.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedFolder(item)}
                  className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-purple-900/30 transition-colors cursor-pointer group"
                >
                  {/* Left: Folder Icon & Name matching uploaded photo */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-purple-900/60 border border-purple-700/60 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400 transition-colors">
                      <Folder className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-white group-hover:text-amber-300 text-xs sm:text-sm block truncate transition-colors">
                        {item.folderName}
                      </span>
                      <span className="text-[11px] text-purple-300/70 block truncate sm:hidden">
                        {item.count} • {item.format}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Details (Desktop) */}
                  <div className="hidden sm:flex items-center gap-6 shrink-0 text-xs">
                    <span className="text-purple-300 font-medium w-28 text-right">
                      {item.count}
                    </span>
                    <span className="text-purple-300/80 w-32 text-right">
                      {item.format}
                    </span>
                  </div>

                  {/* Right: View Button */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFolder(item);
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-bold text-amber-300 bg-purple-950 border border-purple-800 hover:border-amber-400/80 hover:bg-purple-900 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem thử</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Drive Footer Tip */}
            <div className="bg-[#0b031b] px-6 py-3.5 border-t border-purple-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-300/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kho tài nguyên Google Drive VIP tốc độ cao, tải trực tiếp và sử dụng trọn đời.</span>
              </div>
              <a
                href="https://drive.google.com/drive/folders/1r3_zzNNEr3T9dnm-pHoWv_s2fzO6G5Zg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 underline cursor-pointer"
              >
                <span>Nhận bộ quà tặng Miễn Phí</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Big Value Banner & Call To Action */}
        <div className="mt-12 bg-gradient-to-r from-purple-950 via-[#210947] to-purple-950 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Ambient Sheen */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>CAM KẾT QUYỀN LỢI KHÁCH HÀNG</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Sở Hữu Trọn Bộ 10 Kho Tài Nguyên Này <span className="text-amber-300">0Đ</span>
              </h3>
              <p className="text-purple-200 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                Khi mua lẻ, các kho tài nguyên này có giá từ <span className="line-through text-purple-400">200.000đ – 350.000đ</span>. Nhưng tại <strong className="text-yellow-300">Vua Capcutpro Tuấn Anh</strong>, bạn được <strong className="text-emerald-300">tặng miễn phí 100%</strong> trọn đời kèm theo mỗi gói đăng ký CapCut Pro!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://drive.google.com/drive/folders/1r3_zzNNEr3T9dnm-pHoWv_s2fzO6G5Zg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wide bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                <span>Nhận bộ quà tặng Miễn Phí</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Detail Modal for Selected Resource Folder */}
      {selectedFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#170a36] border border-purple-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFolder(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${selectedFolder.accentColor} flex items-center justify-center text-white shadow-lg`}>
                <selectedFolder.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                  {selectedFolder.categoryLabel}
                </span>
                <h4 className="text-lg font-black text-white mt-1">
                  {selectedFolder.shortTitle}
                </h4>
              </div>
            </div>

            {/* Folder Name box */}
            <div className="bg-[#0e041d] p-3 rounded-xl border border-purple-900/80 mb-4 text-xs font-mono text-purple-200 flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{selectedFolder.folderName}</span>
            </div>

            {/* Description */}
            <p className="text-purple-200 text-xs sm:text-sm leading-relaxed mb-4">
              {selectedFolder.description}
            </p>

            {/* Key Highlights */}
            <div className="space-y-2 mb-5 bg-purple-950/40 p-3.5 rounded-2xl border border-purple-900/50">
              <div className="text-[11px] font-bold uppercase text-purple-300 tracking-wider">
                Điểm nổi bật của thư mục:
              </div>
              {selectedFolder.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Meta Information Grid */}
            <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-purple-900/60 mb-5 text-center text-xs">
              <div>
                <span className="text-[10px] text-purple-400 block">Số Lượng</span>
                <strong className="text-white font-bold">{selectedFolder.count}</strong>
              </div>
              <div>
                <span className="text-[10px] text-purple-400 block">Định Dạng</span>
                <strong className="text-amber-300 font-bold">{selectedFolder.format}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://drive.google.com/drive/folders/1r3_zzNNEr3T9dnm-pHoWv_s2fzO6G5Zg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Nhận bộ quà tặng Miễn Phí</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
