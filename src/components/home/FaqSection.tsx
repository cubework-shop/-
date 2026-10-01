import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, setActiveView } = useApp();
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const toggle = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const activeFaqs = faqs.filter(f => f.active);

  return (
    <section className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span>·</span>
            <span>常見問題解答</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            為您解開 3D 列印代工與建模的常見疑惑
          </h2>
          <p className="mt-3 text-base text-neutral-600 font-light">
            了解檔案準備規範、報價邏輯、交付時程與製程建議。
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-14">
          {activeFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-neutral-200/90 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-neutral-400 uppercase hidden sm:inline">
                      {faq.category}
                    </span>
                    <span className="text-base font-semibold text-neutral-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed font-light border-t border-neutral-100 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="text-center p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs">
          <h4 className="text-base font-semibold text-neutral-900 mb-1">
            還有其他技術或特殊規格上的疑問？
          </h4>
          <p className="text-xs sm:text-sm text-neutral-500 mb-6 font-light">
            歡迎直接透過 LINE 官方帳號與工程師一對一對談，或在詢價單內詳述您的特殊工況。
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('contact')}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              檢視聯絡方式與 LINE
            </button>
            <button
              onClick={() => setActiveView('upload')}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              直接上傳檔案詢價
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
