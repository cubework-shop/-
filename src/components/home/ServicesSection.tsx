import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { 
  Printer, 
  Box, 
  Building2, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Layers, 
  Wrench,
  X
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, setActiveView } = useApp();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer':
        return <Printer className="w-5 h-5 text-neutral-900" />;
      case 'Box':
        return <Box className="w-5 h-5 text-neutral-900" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-neutral-900" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-neutral-900" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-neutral-900" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-neutral-900" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
              <span>OUR SERVICES</span>
              <span>·</span>
              <span>核心服務項目</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              全方位數位設計與實體製造解決方案
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 font-light">
              涵蓋由前期圖檔建模修復、功能打樣、高精細成型到細緻後加工塗裝的四項核心能力。
            </p>
          </div>

          <button
            onClick={() => setActiveView('upload')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer group shrink-0"
          >
            <span>依您的需求專案估價</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4 Cards Bento / Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.filter(s => s.active).map((service, index) => (
            <div
              key={service.id}
              className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:border-neutral-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Card Top: Numbering + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    0{index + 1}. {service.englishTitle}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center border border-neutral-200 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Sub Features as Clean Unboxed Text with Separators */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-neutral-700 pb-6 mb-6 border-b border-neutral-100">
                  {service.subFeatures.map((sub, i) => (
                    <React.Fragment key={i}>
                      <span>{sub}</span>
                      {i < service.subFeatures.length - 1 && (
                        <span className="text-neutral-300" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Key Bullet List */}
                <ul className="space-y-3 mb-8">
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Detail & RFQ Action */}
              <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  查看適用材料與設備細節 →
                </button>

                <button
                  onClick={() => setActiveView('upload')}
                  className="px-3.5 py-2 text-xs font-semibold rounded-md bg-neutral-900 hover:bg-neutral-800 text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>立即諮詢此項目</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal for Service Equipment & Materials */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-neutral-400 uppercase mb-1">
              SPECIFICATION & CAPABILITIES
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              {activeModalService.title}
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              {activeModalService.shortDesc}
            </p>

            {/* Materials */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-600" />
                常用材料與規格
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                {activeModalService.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment / Software */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase mb-2.5 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-neutral-600" />
                工坊設備與技術環境
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                {activeModalService.equipment.map((eq, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                關閉
              </button>
              <button
                onClick={() => {
                  setActiveModalService(null);
                  setActiveView('upload');
                }}
                className="px-5 py-2.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                上傳此項目檔案估價
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
