import React from 'react';
import { ShoppingCart, MessageCircle, Video, ArrowRight, Zap } from 'lucide-react';

export const OrderGuide: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Chọn Gói Phù Hợp',
      desc: 'Xem bảng giá và bấm "ĐĂNG KÝ GÓI NÀY" (Gói Phổ Thông, Gói Tối Đa hoặc Gói Cao Cấp Mail Chính Chủ).',
      icon: ShoppingCart,
      color: 'from-amber-400 to-yellow-500',
    },
    {
      step: '02',
      title: 'Nhắn Zalo Tuấn Anh',
      desc: 'Bấm gửi thông tin gói đăng ký qua Zalo chính chủ Vua Capcutpro Tuấn Anh (0363.344.348).',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg',
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: '03',
      title: 'Nhận tài khoản & Edit',
      desc: 'Nhận thông tin tài khoản capcutpro và bắt đầu edit video của bạn nhanh chóng nhất',
      icon: Video,
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <section id="sec-huong-dan" className="py-16 sm:py-24 bg-purple-gradient border-b border-purple-900/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold bg-purple-900 text-purple-200 px-3 py-1 rounded-full border border-purple-700/50 uppercase">
            Quy Trình Đơn Giản
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Hướng Dẫn Mua Hàng Trong 3 Bước
          </h2>
          <p className="text-purple-200 text-sm sm:text-base mt-2">
            Thao tác cực kỳ nhanh gọn, có tài khoản sử dụng ngay chỉ sau 1 phút!
          </p>
        </div>

        {/* 3-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#150933] border border-purple-800/60 rounded-3xl p-8 relative flex flex-col items-center text-center shadow-xl hover:border-purple-500/80 transition-all duration-300 group"
              >
                {/* Step Number Badge */}
                <span className="absolute -top-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black text-sm px-4 py-1 rounded-full shadow-md border border-purple-300">
                  BƯỚC {item.step}
                </span>

                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-purple-950 flex items-center justify-center my-4 shadow-lg group-hover:scale-110 transition-transform overflow-hidden p-2`}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  ) : Icon ? (
                    <Icon className="w-8 h-8 font-black" />
                  ) : null}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-purple-200/80 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Quick CTA button to jump directly to Zalo */}
        <div className="mt-12 text-center">
          <a
            href="https://zalo.me/0363344348"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white font-black text-base uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all border border-blue-400/40"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-6 h-6 object-contain rounded-md" referrerPolicy="no-referrer" />
            <span>NHẮN ZALO KÍCH HOẠT NGAY LẬP TỨC</span>
            <Zap className="w-5 h-5 text-amber-300" />
          </a>
        </div>

      </div>
    </section>
  );
};
