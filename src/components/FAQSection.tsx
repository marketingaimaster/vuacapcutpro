import React, { useState } from 'react';
import { faqList } from '../data/faqData';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Search, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = faqList.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="sec-faq" className="py-16 sm:py-24 bg-[#0c041c] border-b border-purple-900/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-700/60 mb-3">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>GIẢI ĐÁP THẮC MẮC 100%</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base mt-2">
            Giải đáp chi tiết mọi lo ngại của bạn trước khi quyết định nâng cấp CapCut Pro.
          </p>

          {/* Search Bar & Category Filter */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#160936] p-2 rounded-2xl border border-purple-800/60">
            <div className="relative w-full sm:w-2/3 flex items-center">
              <Search className="w-4 h-4 text-purple-400 absolute left-3" />
              <input
                type="text"
                placeholder="Tìm kiếm thắc mắc (ví dụ: bảo hành, chính chủ, thiết bị...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-purple-950/80 text-white pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 border border-purple-800/40 placeholder-purple-400/60"
              />
            </div>
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-950 text-purple-300 hover:text-white'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setSelectedCategory('bao-hanh')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === 'bao-hanh'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-950 text-purple-300 hover:text-white'
                }`}
              >
                Bảo hành
              </button>
              <button
                onClick={() => setSelectedCategory('tinh-nang')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === 'tinh-nang'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-950 text-purple-300 hover:text-white'
                }`}
              >
                Tính năng
              </button>
              <button
                onClick={() => setSelectedCategory('thiet-bi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === 'thiet-bi'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-950 text-purple-300 hover:text-white'
                }`}
              >
                Thiết bị
              </button>
            </div>
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-gradient-to-b from-[#1c0b3d] to-[#120528] border-purple-500 shadow-lg shadow-purple-950/80'
                      : 'bg-[#120528] border-purple-800/60 hover:border-purple-600/80'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-purple-200 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-purple-200/90 leading-relaxed border-t border-purple-900/50">
                      <p className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/40">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-purple-950/40 rounded-2xl border border-purple-800/60">
              <p className="text-purple-300">Không tìm thấy câu hỏi phù hợp. Vui lòng nhắn tin Zalo để Tuấn Anh hỗ trợ trực tiếp!</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
