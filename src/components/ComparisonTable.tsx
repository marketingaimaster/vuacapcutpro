import React from 'react';
import { Check, X, Crown, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonItems = [
    { feature: 'Giá đăng ký', free: '0 VNĐ (Rất hạn chế)', pro: 'Chỉ từ 1.9k / ngày (Giảm 80%)' },
    { feature: 'Công cụ AI Pro (Xóa phông, Auto Sub, Make up)', free: 'Khóa 90% tính năng Pro', pro: 'Mở khóa 100% không giới hạn' },
    { feature: 'Lọc âm nhiễu & Giọng đọc AI Tiếng Việt', free: 'Bị giới hạn dải giọng', pro: 'Mở toàn bộ giọng đọc tự nhiên' },
    { feature: 'Kho Mẫu Effect, Filter, Chuyển cảnh', free: 'Chỉ dùng mẫu cơ bản', pro: 'Đầy đủ mẫu Hot Trend độc quyền' },
    { feature: 'Xuất Video 4K 60FPS không Watermark', free: 'Bị dính logo & vỡ nét', pro: 'Sắc nét 4K 60fps không dính logo' },
    { feature: 'Lưu trữ đám mây Cloud', free: '5GB mặc định', pro: 'Lên tới 1TB Cloud Storage' },
    { feature: 'Đăng nhập đa thiết bị (Đồng bộ PC & Mobile)', free: 'Dễ bị mất dữ liệu', pro: 'Đồng bộ mượt mà 1-2 thiết bị' },
    { feature: 'Bảo hành & Hỗ trợ kỹ thuật', free: 'Không có', pro: 'Bảo hành 1 đổi 1 24/7 từ Tuấn Anh' },
  ];

  return (
    <section className="py-16 bg-[#0f0728] border-b border-purple-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold bg-purple-900 text-purple-200 px-3 py-1 rounded-full border border-purple-700/50 uppercase">
            So Sánh Trực Quan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
            Sự Khác Biệt Giữa Bản Miễn Phí & CapCut Pro
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-purple-800/60 shadow-2xl bg-[#14082e]">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-purple-950 border-b border-purple-800/80 text-sm">
                <th className="p-4 sm:p-5 text-purple-300 font-bold w-2/5">Tính Năng</th>
                <th className="p-4 sm:p-5 text-purple-400 font-bold w-1/4 text-center">CapCut Free</th>
                <th className="p-4 sm:p-5 text-yellow-300 font-extrabold w-1/3 text-center bg-purple-900/60 border-l border-purple-700/60">
                  <div className="flex items-center justify-center gap-1.5">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span>CapCut Pro Vua Capcutpro</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/50 text-xs sm:text-sm">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-purple-900/30 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-purple-100">{item.feature}</td>
                  <td className="p-4 sm:p-5 text-center text-purple-300/70">
                    <div className="flex items-center justify-center gap-1">
                      <X className="w-4 h-4 text-red-400" />
                      <span>{item.free}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-center font-bold text-emerald-300 bg-purple-950/40 border-l border-purple-800/60">
                    <div className="flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{item.pro}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
