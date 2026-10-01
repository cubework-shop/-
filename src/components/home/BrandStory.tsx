import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, ArrowRight, ShieldCheck, Cpu, Compass, Sparkles } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { siteSettings, setActiveView } = useApp();

  return (
    <section id="brand-story" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>ABOUT CUBE WORK</span>
            <span>·</span>
            <span>品牌定位與設計理念</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight text-balance">
            不只是 3D 列印，
            <br />
            更是陪伴您將設計呈現實體的製造夥伴。
          </h2>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
            {siteSettings.shortIntro
              ? siteSettings.shortIntro.replace(/3D\s*列印代工/g, '3D 列印').replace(/代工/g, '')
              : '立方工坊不只是 3D 列印，而是從設計、建模到製造的一站式數位製造夥伴。我們協助企業、新創團隊、建築師、室內設計師及個人創作者降低開發成本、縮短時程，將數位構想具現為精準實體成果。'}
          </p>
        </div>

        {/* 6-Stage Full Lifecycle Pipeline Card Strip */}
        <div className="mb-20">
          <div className="text-xs font-mono tracking-wider text-neutral-500 uppercase mb-4">
            THE DIGITAL FABRICATION LIFECYCLE · 一站式數位製造歷程
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { num: '01', title: '需求討論', desc: '幾何公差與受力評估' },
              { num: '02', title: '3D 建模', desc: 'CAD 實體與網格修復' },
              { num: '03', title: '快速打樣', desc: '24-48h 機構初版手板' },
              { num: '04', title: '列印製造', desc: 'FDM / SLA 雙製程成型' },
              { num: '05', title: '後加工處置', desc: '去支撐打磨消光噴塗' },
              { num: '06', title: '產品交付', desc: '尺寸公差檢驗與自取/快遞' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50 hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-semibold text-neutral-900 mt-2">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Three-Stage Vision Roadmap */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-layer-texture-dark opacity-20 pointer-events-none" />
          
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              STUDIO ROADMAP & VISION
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold mt-2 text-white">
              立方工坊三階段品牌願景
            </h3>
            <p className="text-sm text-neutral-300 mt-3 font-light leading-relaxed">
              從專業數位製造邁向自主創新，持續深耕數位工藝與空間材料科技。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            
            {/* Short-term */}
            <div className="p-6 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                  <span>PHASE 01</span>
                  <span className="text-neutral-300">短期目標</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  奠定專業口碑與穩定客源
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  建立透明可預期的報價與極速交付，累積實體合作案例。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-700 text-xs text-neutral-400">
                指標：服務超過 500+ 設計案件與 99% 按時交付率
              </div>
            </div>

            {/* Mid-term */}
            <div className="p-6 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                  <span>PHASE 02</span>
                  <span className="text-neutral-300">中期目標</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  工業擴充與 OEM / ODM 開發
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  擴充大幅面工業級列印設備，導入碳纖增強、阻燃耐候與工程級材料；協助硬體新創進行 OEM / ODM 整合試產與小批量交付。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-700 text-xs text-neutral-400">
                指標：引進大型列印機與複合材質
              </div>
            </div>

            {/* Long-term */}
            <div className="p-6 rounded-xl bg-neutral-800/80 border border-neutral-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                  <span>PHASE 03</span>
                  <span className="text-neutral-300">長期目標</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  自有品牌、永續製造與出海
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  推出工坊獨立設計家居與建築微縮文創品牌；推動可回收循環線材與永續低碳製造，推廣數位製造教育並將服務拓展至海外市場。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-700 text-xs text-neutral-400">
                指標：自有設計品牌商品化與綠色永續製造認證
              </div>
            </div>

          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-neutral-400">
              有任何特殊的量產或合作構想？歡迎隨時與我們的工程團隊預約諮詢。
            </p>
            <button
              onClick={() => setActiveView('contact')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-neutral-200 cursor-pointer"
            >
              <span>前往預約諮詢</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
