import React, { useState } from 'react';
import { PhoneCall, Facebook, ShieldCheck, Crown, Copy, Check, MessageSquare, ExternalLink, QrCode } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phoneNum = '0363.344.348';

  const copyToClipboard = () => {
    navigator.clipboard.writeText('0363344348');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <footer className="bg-[#080214] pt-16 pb-28 sm:pb-16 border-t border-purple-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Final Conversion Pitch Box */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-3xl p-8 sm:p-12 border-2 border-purple-500/60 shadow-2xl mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-amber-400 text-purple-950 uppercase mb-4 shadow-md">
              <Crown className="w-4 h-4 fill-purple-950" />
              <span>Chốt Ưu Đãi Hôm Nay - Giảm 80%</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Sẵn Sàng Sáng Tạo Video Triệu View Cùng CapCut Pro?
            </h2>
            <p className="text-purple-200 text-sm sm:text-base mt-3 leading-relaxed">
              Đừng để tài khoản Free làm gián đoạn cảm hứng và giới hạn chất lượng video của bạn. Nhắn Zalo Tuấn Anh ngay để được tư vấn gói phù hợp nhất!
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://zalo.me/0363344348"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-400 hover:to-indigo-400 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-blue-900/50 flex items-center justify-center gap-2 border border-blue-300/40"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>NHẮN ZALO NHẬN TƯ VẤN NGAY</span>
              </a>

              <button
                onClick={copyToClipboard}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-700/60 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPhone ? 'Đã Sao Chép SĐT!' : `CoPy Hotline: ${phoneNum}`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-purple-900/60">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-yellow-400 font-bold shadow-md">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">VUA CAPCUTPRO</span>
                <p className="text-xs text-amber-400 font-semibold">Tuấn Anh • Chuyên Tài Khoản Bản Quyền</p>
              </div>
            </div>

            <p className="text-xs text-purple-300/80 leading-relaxed max-w-md">
              Chuyên cung cấp giải pháp nâng cấp CapCut Pro chính hãng giá rẻ hơn 80%. Tối ưu chi phí cho Tiktoker, Youtuber, Editor và các doanh nghiệp sáng tạo nội dung.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Bảo hành 1 đổi 1 trọn thời gian đăng ký • Hỗ trợ 24/7</span>
            </div>
          </div>

          {/* Social Links & Trust Verification */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <ul className="space-y-2.5 text-xs text-purple-200 font-medium">
              <li>
                <a
                  href="https://zalo.me/0363344348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>Zalo Hotline: <strong>0363.344.348</strong></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@vuacapcutprotuananh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-pink-400 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.26a8.16 8.16 0 0 0 4.91 1.63v-3.7a4.85 4.85 0 0 1-1-.5z"/>
                  </svg>
                  <span>Kênh tiktok Vua capcutpro Tuấn Anh</span>
                  <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61592491796649&locale=vi_VN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Fanpage: Vua Capcutpro Chính Hãng</span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Zalo Fast QR Code Box */}
          <div className="bg-[#120528] p-4 rounded-2xl border border-purple-800/60 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300">
              <QrCode className="w-4 h-4" />
              <span>Mã QR Zalo Tuấn Anh</span>
            </div>
            <div className="w-28 h-28 bg-white p-2 rounded-xl mx-auto shadow-inner flex items-center justify-center">
              {/* Clean Zalo QR Placeholder Visual */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://zalo.me/0363344348"
                alt="Zalo QR Code"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[11px] text-purple-300/80">Quét mã bằng camera điện thoại để mở Zalo chat nhanh</p>
          </div>

        </div>

        {/* Copyright Footer */}
        <div className="pt-8 text-center text-xs text-purple-400/80">
          <p>© 2026 Vua Capcutpro Tuấn Anh. Bản quyền trang tin nâng cấp CapCut Pro chính hãng.</p>
        </div>

      </div>
    </footer>
  );
};
