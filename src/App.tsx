import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureHighlights } from './components/FeatureHighlights';
import { PricingSection } from './components/PricingSection';
import { OrderGuide } from './components/OrderGuide';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { OrderModal } from './components/OrderModal';
import { FloatingCTA } from './components/FloatingCTA';
import { LiveNotificationTicker } from './components/LiveNotificationTicker';
import { OrderSelection } from './types';

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState<OrderSelection | null>(null);

  const handleSelectPricingOption = (selection: OrderSelection) => {
    setSelectedOrder(selection);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const scrollToPricing = () => {
    const elem = document.getElementById('sec-bang-gia');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c041c] text-purple-100 selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onSelectPricing={scrollToPricing} />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Lời Chào (Hero) */}
        <HeroSection />

        {/* Mở Khóa Tính Năng Pro */}
        <FeatureHighlights />

        {/* Section 2: Bảng Giá Ưu Đãi */}
        <PricingSection onSelectOption={handleSelectPricingOption} />

        {/* Section 3: Hướng Dẫn Mua Hàng */}
        <OrderGuide />

        {/* Section 5: FAQ - Câu Hỏi Thường Gặp */}
        <FAQSection />
      </main>

      {/* Section 6 & Footer */}
      <FooterSection />

      {/* Interactive Floating / Modal Elements */}
      <OrderModal selection={selectedOrder} onClose={handleCloseModal} />
      <FloatingCTA />
      <LiveNotificationTicker />
    </div>
  );
}
