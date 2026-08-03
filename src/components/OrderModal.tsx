import React, { useState } from 'react';
import { OrderSelection } from '../types';
import { X, Check, Copy, MessageCircle, ShieldCheck, Zap, Sparkles, QrCode } from 'lucide-react';

interface OrderModalProps {
  selection: OrderSelection | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ selection, onClose }) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);

  if (!selection) return null;

  const { columnTitle, option } = selection;

  const scriptText = `Chào Tuấn Anh, mình muốn đăng ký: ${columnTitle} - ${option.duration} (${option.price}). ${
    userName ? `Họ tên: ${userName}. ` : ''
  }${userPhone ? `SĐT Zalo: ${userPhone}. ` : ''}Tư vấn kích hoạt giúp mình nhé!`;

  const zaloUrl = `https://zalo.me/0363344348?text=${encodeURIComponent(scriptText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

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
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all border border-blue-400/40"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>MỞ ZALO CHAT VỚI TUẤN ANH NGAY</span>
          </a>

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
