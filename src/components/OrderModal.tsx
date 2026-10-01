import React, { useState, useEffect } from 'react';
import { OrderSelection } from '../types';
import { X, Check, Copy, MessageCircle, ShieldCheck, Zap, Sparkles, QrCode, Tag, ExternalLink } from 'lucide-react';
import { getStoredReferralCode, recordReferralOrder } from '../services/affiliateService';
import { generateVietQrUrl, generateVietQrFallbackUrl } from '../utils/vietqr';

interface OrderModalProps {
  selection: OrderSelection | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ selection, onClose }) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedStk, setCopiedStk] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [showBankQr, setShowBankQr] = useState<boolean>(false);

  useEffect(() => {
    const code = getStoredReferralCode();
    if (code) setRefCode(code);
  }, []);

  if (!selection) return null;

  const { columnTitle, option } = selection;

  const scriptText = `Chào Tuấn Anh, mình muốn đăng ký: ${columnTitle} - ${option.duration} (${option.price}). ${
    userName ? `Họ tên: ${userName}. ` : ''
  }${userPhone ? `SĐT Zalo: ${userPhone}. ` : ''}${refCode ? `[Mã CTV: ${refCode}] ` : ''}Tư vấn kích hoạt giúp mình nhé!`;

  const zaloUrl = `https://zalo.me/0363344348?text=${encodeURIComponent(scriptText)}`;

  const handleOrderClick = () => {
    if (refCode) {
      recordReferralOrder(
        userName || 'Khách đặt mua Web',
        userPhone || 'Liên hệ Zalo',
        `${columnTitle} - ${option.duration}`,
        option.price,
        refCode
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const numericPrice = parseInt(option.price.replace(/[^0-9]/g, ''), 10) || 199000;
  const memoText = `Capcut ${option.duration.replace(/\s+/g, '')} ${userPhone ? userPhone.slice(-4) : ''} ${refCode || ''}`.trim();
  const shopVietQrUrl = generateVietQrUrl('MB', '0363344348', numericPrice, 'NGUYEN TUAN ANH', memoText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#12062b] border-2 border-purple-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl shadow-purple-950 text-left overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white p-2 rounded-full bg-purple-950 border border-purple-800/60 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>XÁC NHẬN ĐĂNG KÝ KÍCH HOẠT</span>
          </div>
          <h3 className="text-2xl font-black text-white">Nâng Cấp CapCut Pro</h3>
          <p className="text-xs text-purple-200/80 mt-1">
            Vua Capcutpro Tuấn Anh • Kích hoạt tức thì 2-5 phút
          </p>
          {refCode && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-purple-900/60 text-amber-300 border border-purple-700/60 px-2.5 py-0.5 rounded-lg text-[11px] font-medium">
              <Tag className="w-3 h-3 text-amber-400" />
              <span>Được giới thiệu bởi CTV: <strong className="text-white font-mono">{refCode}</strong></span>
            </div>
          )}
        </div>

        {/* Plan Summary Card */}
        <div className="bg-gradient-to-r from-purple-950 to-indigo-950 p-4 rounded-2xl border border-purple-700/60 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-300 font-bold uppercase">{columnTitle}</span>
            <span className="text-xs text-amber-300 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-500/40">
              Tiết kiệm {option.savings}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg font-black text-white">{option.duration}</span>
            <span className="text-2xl font-black text-yellow-400">{option.price}</span>
          </div>

          {option.bonus && (
            <p className="text-xs text-emerald-300 font-semibold mt-2 pt-2 border-t border-purple-800/60">
              🎁 Quà tặng: {option.bonus}
            </p>
          )}
        </div>

        {/* Optional User Info Fields */}
        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1">
              Họ & Tên của bạn (Không bắt buộc):
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Nguyễn Văn Minh"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-purple-950 border border-purple-800/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 placeholder-purple-400/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1">
              SĐT Zalo của bạn (Để shop hỗ trợ lại):
            </label>
            <input
              type="tel"
              placeholder="Ví dụ: 0987654321"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full bg-purple-950 border border-purple-800/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 placeholder-purple-400/50"
            />
          </div>
        </div>

        {/* Script Preview */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-purple-300 mb-1">
            Nội dung tin nhắn sẵn gửi Tuấn Anh:
          </label>
          <div className="bg-[#0c041c] p-3 rounded-xl border border-purple-800/60 text-xs text-purple-100 font-mono leading-relaxed relative">
            {scriptText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={zaloUrl}
            onClick={handleOrderClick}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all border border-blue-400/40 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>MỞ ZALO CHAT VỚI TUẤN ANH NGAY</span>
          </a>

          <button
            onClick={() => {
              setShowBankQr(!showBankQr);
              handleOrderClick();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-600/30 hover:from-amber-500/30 hover:to-purple-600/40 text-amber-300 border border-amber-500/50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>{showBankQr ? 'Ẩn Mã QR Chuyển Khoản' : '💳 Quét Mã QR Ngân Hàng MB Thanh Toán Nhanh'}</span>
          </button>

          {/* Bank QR Code display inside OrderModal */}
          {showBankQr && (
            <div className="p-4 bg-[#100424] rounded-2xl border-2 border-amber-500/60 text-center space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Mã VietQR Napas247 - MB Bank Tuấn Anh
                </span>
                <span className="text-[10px] text-purple-300 bg-purple-900 px-2 py-0.5 rounded font-mono">
                  MB Bank (970422)
                </span>
              </div>

              <div className="bg-white p-3 rounded-2xl mx-auto w-56 h-auto shadow-2xl flex flex-col items-center justify-center">
                <img
                  src={shopVietQrUrl}
                  alt="VietQR MB Bank Tuấn Anh"
                  className="w-full h-auto object-contain rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('qr_only')) {
                      target.src = generateVietQrFallbackUrl('MB', '0363344348', numericPrice, memoText);
                    }
                  }}
                />
              </div>

              <div className="text-xs text-purple-200 space-y-1.5 bg-purple-950/60 p-3 rounded-xl border border-purple-800/60 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Ngân hàng:</span>
                  <strong className="text-white">MB Bank (Quân Đội)</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Số tài khoản:</span>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-amber-300 font-mono text-sm select-all">0363344348</strong>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('0363344348');
                        setCopiedStk(true);
                        setTimeout(() => setCopiedStk(false), 2000);
                      }}
                      className="p-1 hover:bg-purple-800 rounded text-purple-300 hover:text-white"
                      title="Sao chép STK"
                    >
                      {copiedStk ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Chủ tài khoản:</span>
                  <strong className="text-white uppercase">NGUYEN TUAN ANH</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Số tiền:</span>
                  <strong className="text-yellow-400 font-mono font-black text-sm">{numericPrice.toLocaleString('vi-VN')} VND</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300">Nội dung CK:</span>
                  <strong className="text-white font-mono select-all text-xs">{memoText}</strong>
                </div>
              </div>

              <p className="text-[11px] text-purple-300 leading-relaxed">
                📱 Sau khi chuyển khoản, bạn chỉ cần bấm nút <strong>Mở Zalo Chat</strong> bên trên nhắn Tuấn Anh kèm ảnh bill là được cấp tài khoản dùng ngay sau 1 phút!
              </p>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800/80 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedScript ? 'Đã Sao Chép Lời Nhắn!' : 'Sao Chép Cú Pháp Tin Nhắn'}</span>
          </button>
        </div>

        {/* Guarantee footer note */}
        <div className="mt-4 pt-3 border-t border-purple-900/60 text-center text-[11px] text-purple-300/80 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bảo hành trọn thời gian sử dụng 1 đổi 1 • Hỗ trợ 24/7</span>
        </div>
      </div>
    </div>
  );
};
