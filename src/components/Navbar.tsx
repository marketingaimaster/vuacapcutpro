import React, { useState } from 'react';
import { Crown, Zap, ShieldCheck, PhoneCall, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSelectPricing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectPricing }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c041c]/90 border-b border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-violet-400 p-0.5 shadow-lg shadow-purple-600/30">
            <div className="w-full h-full bg-[#0c041c] rounded-[10px] flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-purple-400">
                VUA CAPCUTPRO
              </span>
              <span className="bg-purple-950 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-purple-700/60 uppercase">
                Chính Hãng
              </span>
            </div>
            <p className="text-xs text-purple-300/80 font-medium">By Tuấn Anh • Bảo Hành Trọn Đời</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-purple-200">
          <button onClick={() => scrollToSection('sec-bang-gia')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
            Bảng Giá
          </button>
          <button onClick={() => scrollToSection('sec-tinh-nang')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
            Tính Năng Pro
          </button>
          <button onClick={() => scrollToSection('sec-khach-hang')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
            Đánh Giá ({'999+'})
          </button>
          <button onClick={() => scrollToSection('sec-huong-dan')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
            Hướng Dẫn Mua
          </button>
          <button onClick={() => scrollToSection('sec-faq')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
            Câu Hỏi FAQ
          </button>
        </nav>

        {/* Desktop Quick Contact Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://zalo.me/0363344348"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-2 rounded-xl font-semibold text-xs transition-all shadow-md shadow-blue-900/40 border border-blue-400/30"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            <span>Zalo: Tuấn Anh</span>
          </a>
          <button
            onClick={() => scrollToSection('sec-bang-gia')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-purple-950 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>XEM ƯU ĐÃI</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-purple-200 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12072b] border-b border-purple-900/60 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('sec-bang-gia')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-purple-100 hover:bg-purple-900/40 font-medium flex items-center justify-between"
          >
            <span>💰 Bảng Giá Ưu Đãi</span>
            <span className="text-xs text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">Giảm 80%</span>
          </button>
          <button
            onClick={() => scrollToSection('sec-tinh-nang')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-purple-100 hover:bg-purple-900/40 font-medium"
          >
            ✨ Tính Năng Mở Khóa Pro
          </button>
          <button
            onClick={() => scrollToSection('sec-khach-hang')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-purple-100 hover:bg-purple-900/40 font-medium"
          >
            ⭐ Khách Hàng Đánh Giá (999+)
          </button>
          <button
            onClick={() => scrollToSection('sec-huong-dan')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-purple-100 hover:bg-purple-900/40 font-medium"
          >
            🚀 Quy Trình 3 Bước Kích Hoạt
          </button>
          <button
            onClick={() => scrollToSection('sec-faq')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-purple-100 hover:bg-purple-900/40 font-medium"
          >
            ❓ Câu Hỏi Thường Gặp (FAQ)
          </button>
          <div className="pt-2 border-t border-purple-900/50 flex flex-col gap-2">
            <a
              href="https://zalo.me/0363344348"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Nhắn Zalo Tấn Anh Ngay</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
