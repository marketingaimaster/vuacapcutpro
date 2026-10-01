import React, { useState } from 'react';
import { Crown, Zap, ShieldCheck, PhoneCall, Menu, X, Sparkles, Gift, DollarSign } from 'lucide-react';

interface NavbarProps {
  onSelectPricing: () => void;
  onOpenAffiliate?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectPricing, onOpenAffiliate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0c041c]/95 border-b border-purple-800/40 shadow-lg shadow-purple-950/30">
      <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3 xl:gap-6">
        
        {/* Brand Logo - 100% Horizontal & Zero Word-Wrap */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-purple-600 p-0.5 shadow-lg shadow-purple-600/30 group-hover:shadow-amber-500/40 transition-all duration-300 shrink-0">
            <div className="w-full h-full bg-[#0c041c] rounded-[14px] flex items-center justify-center">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-amber-400"></span>
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-black text-lg sm:text-xl lg:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-fuchsia-200 to-purple-300 uppercase whitespace-nowrap">
                VUA CAPCUTPRO
              </span>
              <span className="bg-purple-950 text-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-500/40 uppercase tracking-widest whitespace-nowrap">
                Chính Hãng
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-purple-200/90 font-medium tracking-wide whitespace-nowrap mt-0.5">
              By Tuấn Anh • Bảo Hành Trọn Đời
            </p>
          </div>
        </a>

        {/* Desktop Navigation - Strictly Horizontal, Spaced Out & Never Wraps Vertically */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs xl:text-[14px] font-semibold text-purple-200 shrink-0">
          <button 
            onClick={() => scrollToSection('sec-bang-gia')} 
            className="whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors py-1.5 px-1 tracking-wide cursor-pointer hover:scale-105"
          >
            Bảng Giá
          </button>
          
          <button 
            onClick={() => scrollToSection('sec-huong-dan')} 
            className="whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors py-1.5 px-1 tracking-wide cursor-pointer hover:scale-105"
          >
            Hướng Dẫn Mua
          </button>
          
          <button 
            onClick={() => scrollToSection('sec-qua-tang')} 
            className="whitespace-nowrap shrink-0 hover:text-amber-200 text-amber-300 font-bold transition-all cursor-pointer py-1.5 px-3 rounded-xl inline-flex items-center gap-1.5 bg-amber-950/60 border border-amber-500/40 shadow-sm shadow-amber-500/10 hover:bg-amber-900/60 hover:scale-105"
          >
            <Gift className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap tracking-wide">Quà Tặng 200K</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('sec-tinh-nang')} 
            className="whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors py-1.5 px-1 tracking-wide cursor-pointer hover:scale-105"
          >
            Tính Năng Pro
          </button>
          
          <button 
            onClick={() => scrollToSection('sec-faq')} 
            className="whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors py-1.5 px-1 tracking-wide cursor-pointer hover:scale-105"
          >
            Câu Hỏi FAQ
          </button>
          
          {onOpenAffiliate && (
            <button
              onClick={onOpenAffiliate}
              className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/25 to-purple-600/35 hover:from-amber-500/40 hover:to-purple-600/50 text-amber-300 font-bold px-3 py-1.5 rounded-xl border border-amber-500/50 transition-all text-xs xl:text-[13px] cursor-pointer shadow-md shadow-amber-500/15 hover:scale-105"
            >
              <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap tracking-wide">Đăng ký Affiliate CTV</span>
              <span className="bg-amber-400 text-purple-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tight shrink-0">Mới</span>
            </button>
          )}
        </nav>

        {/* Desktop Quick Contact & CTA Buttons - Strictly Single Horizontal Row */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
          <a
            href="https://zalo.me/0363344348"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 xl:px-4 py-2 rounded-xl font-bold text-xs xl:text-sm transition-all shadow-md shadow-blue-900/40 border border-blue-400/40 tracking-wide hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-blue-200 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Zalo: Tuấn Anh</span>
          </a>
          
          <button
            onClick={() => scrollToSection('sec-bang-gia')}
            className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-purple-950 px-3.5 xl:px-4.5 py-2 rounded-xl font-black text-xs xl:text-sm transition-all shadow-lg shadow-amber-500/25 cursor-pointer tracking-wider hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
            <span className="whitespace-nowrap">XEM ƯU ĐÃI</span>
          </button>
        </div>

        {/* Mobile / Tablet Hamburger Toggle (Shown when screen is narrower than xl) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-purple-200 hover:text-white rounded-xl bg-purple-950/70 border border-purple-800/80 focus:outline-none cursor-pointer shrink-0"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation with clean horizontal list layout */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#12072b] border-b border-purple-800/60 px-4 sm:px-6 pt-4 pb-6 space-y-3.5 shadow-2xl animate-fadeIn">
          {onOpenAffiliate && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAffiliate();
              }}
              className="w-full text-left py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-950/80 to-purple-950/80 border border-amber-500/50 text-amber-300 font-bold flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="tracking-wide text-sm whitespace-nowrap">Đăng ký Affiliate CTV (18-24%)</span>
              </div>
              <span className="text-[11px] bg-amber-400 text-purple-950 font-black px-2.5 py-1 rounded-full uppercase tracking-tight shrink-0">Đăng ký ngay</span>
            </button>
          )}
          
          <button
            onClick={() => scrollToSection('sec-bang-gia')}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-purple-100 hover:bg-purple-900/50 font-semibold tracking-wide flex items-center justify-between text-sm sm:text-base cursor-pointer"
          >
            <span className="whitespace-nowrap">💰 Bảng Giá Ưu Đãi</span>
            <span className="text-xs text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-500/40 font-bold shrink-0">Giảm 80%</span>
          </button>
          
          <button
            onClick={() => scrollToSection('sec-huong-dan')}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-purple-100 hover:bg-purple-900/50 font-semibold tracking-wide text-sm sm:text-base cursor-pointer"
          >
            <span className="whitespace-nowrap">🚀 Quy Trình 3 Bước Kích Hoạt</span>
          </button>
          
          <button
            onClick={() => scrollToSection('sec-qua-tang')}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-amber-300 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/40 font-bold flex items-center justify-between text-sm sm:text-base cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="tracking-wide whitespace-nowrap">🎁 Quà Tặng Kho Tài Nguyên 200K</span>
            </span>
            <span className="text-xs text-emerald-400 font-black uppercase shrink-0">Miễn Phí</span>
          </button>
          
          <button
            onClick={() => scrollToSection('sec-tinh-nang')}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-purple-100 hover:bg-purple-900/50 font-semibold tracking-wide text-sm sm:text-base cursor-pointer"
          >
            <span className="whitespace-nowrap">✨ Tính Năng Mở Khóa Pro</span>
          </button>
          
          <button
            onClick={() => scrollToSection('sec-faq')}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-purple-100 hover:bg-purple-900/50 font-semibold tracking-wide text-sm sm:text-base cursor-pointer"
          >
            <span className="whitespace-nowrap">❓ Câu Hỏi Thường Gặp (FAQ)</span>
          </button>
          
          <div className="pt-3 border-t border-purple-800/60 flex flex-col gap-2.5">
            <a
              href="https://zalo.me/0363344348"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Nhắn Zalo Tuấn Anh Ngay</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
