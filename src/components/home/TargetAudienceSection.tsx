import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_TARGET_AUDIENCES } from '../../data/initialData';
import { GraduationCap, Compass, Home, Palette, ArrowRight, Check } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const { setActiveView } = useApp();
  const [selectedAudienceId, setSelectedAudienceId] = useState(INITIAL_TARGET_AUDIENCES[0].id);

  const selectedAudience = INITIAL_TARGET_AUDIENCES.find(a => a.id === selectedAudienceId) || INITIAL_TARGET_AUDIENCES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Palette':
      default:
        return <Palette className="w-5 h-5" />;
    }
  };

  return (
    <section id="target-audience" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>TAILORED SOLUTIONS</span>
            <span>·</span>
            <span>四大核心客群方案</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            深諳不同領域的設計語言與交付痛點
          </h2>
          <p className="mt-3 text-base text-neutral-600 font-light">
            無論是死線逼近的畢業製作、高精度的建築競圖、特規室內五金或是獨立公仔試產，立方工坊皆有專屬因應策略。
          </p>
        </div>

        {/* Audience Selector Tabs (interactive segmented control) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {INITIAL_TARGET_AUDIENCES.map((item) => {
            const isSelected = item.id === selectedAudienceId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAudienceId(item.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-100/60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-200/80 text-neutral-800'
                  }`}
                >
                  {getIcon(item.icon)}
                </div>
                <div>
                  <div className="text-sm font-semibold leading-snug">{item.title}</div>
                  <div
                    className={`text-[11px] truncate max-w-[130px] sm:max-w-[170px] ${
                      isSelected ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Audience Detail Panel */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 sm:p-12 transition-all">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            
            {/* Left: Pain Points vs Our Solutions */}
            <div className="flex-1 space-y-8">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  COMMON CHALLENGES · 常見痛點
                </span>
                <ul className="mt-3 space-y-2.5">
                  {selectedAudience.painPoints.map((pain, i) => (
                    <li key={i} className="text-xs sm:text-sm text-neutral-600 flex items-start gap-2.5">
                      <span className="text-neutral-400 mt-1 font-mono text-xs">✕</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-600 uppercase font-semibold">
                  CUBE WORK SOLUTION · 立方工坊專屬解方
                </span>
                <ul className="mt-3 space-y-2.5">
                  {selectedAudience.solutions.map((sol, i) => (
                    <li key={i} className="text-xs sm:text-sm text-neutral-900 font-medium flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Recommended Services & Quick CTA */}
            <div className="w-full lg:w-80 p-6 rounded-xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  RECOMMENDED SERVICES
                </span>
                <h4 className="text-base font-semibold text-neutral-900 mt-1 mb-4">
                  最適合此客群的服務
                </h4>
                
                <div className="space-y-2 mb-6">
                  {selectedAudience.recommendedServices.map((rec, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 text-xs font-medium text-neutral-800"
                    >
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveView('upload')}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>針對【{selectedAudience.title}】立即諮詢</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
