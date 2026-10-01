import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureHighlights } from './components/FeatureHighlights';
import { PricingSection } from './components/PricingSection';
import { BonusGiftSection } from './components/BonusGiftSection';
import { OrderGuide } from './components/OrderGuide';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { OrderModal } from './components/OrderModal';
import { FloatingCTA } from './components/FloatingCTA';
import { LiveNotificationTicker } from './components/LiveNotificationTicker';
import { AffiliateModal } from './components/AffiliateModal';
import { OrderSelection } from './types';
import { trackReferralVisit, getStoredReferralCode } from './services/affiliateService';
import { Sparkles, DollarSign } from 'lucide-react';

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState<OrderSelection | null>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [referredByCode, setReferredByCode] = useState<string | null>(null);

  useEffect(() => {
    // Automatically capture ?ref=... or ?aff=... from URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('aff');
    if (ref) {
      trackReferralVisit(ref);
      setReferredByCode(ref.toUpperCase());
    } else {
      const stored = getStoredReferralCode();
      if (stored) setReferredByCode(stored);
    }
  }, []);

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
    <div className="min-h-screen bg-[#0c041c] text-purple-100 selection:bg-purple-600 selection:text-white relative">
      {/* Referral Welcome Notification Banner if referred */}
      {referredByCode && (
        <div className="bg-gradient-to-r from-amber-600 via-purple-700 to-indigo-600 text-white text-xs py-2 px-4 text-center font-semibold shadow-md flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Bạn đang nhận ưu đãi thông qua đối tác CTV: <strong className="underline font-mono">{referredByCode}</strong> (Bảo hành 1 đổi 1 & Tặng quà 200k)</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar 
        onSelectPricing={scrollToPricing} 
        onOpenAffiliate={() => setIsAffiliateModalOpen(true)} 
      />

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

        {/* Section 4: Quà Tặng Độc Quyền (Kho Tài Nguyên 200k) */}
        <BonusGiftSection onClaimGift={scrollToPricing} />

        {/* Section 5: FAQ - Câu Hỏi Thường Gặp */}
        <FAQSection />
      </main>

      {/* Section 6 & Footer */}
      <FooterSection onOpenAffiliate={() => setIsAffiliateModalOpen(true)} />

      {/* Interactive Floating / Modal Elements */}
      <OrderModal selection={selectedOrder} onClose={handleCloseModal} />
      <FloatingCTA />
      <LiveNotificationTicker />

      {/* Affiliate Portal Modal (Database Powered) */}
      <AffiliateModal 
        isOpen={isAffiliateModalOpen} 
        onClose={() => setIsAffiliateModalOpen(false)} 
      />
    </div>
  );
}
