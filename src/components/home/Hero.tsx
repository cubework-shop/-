import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Upload, Layers, Box, Phone, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView, projects, siteSettings } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamically resolve the showcase project for the Hero section
  const heroSettingId = siteSettings.portfolioSection?.heroProjectId;
  const showcaseProject = 
    (heroSettingId ? projects.find(p => p.id === heroSettingId) : null) ||
    projects.find(p => p.active && p.featured) ||
    projects.find(p => p.active) ||
    projects[0];

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white min-h-[90vh] flex items-center bg-architect-grid-dense">
      {/* Background Layer Lines and Subtle Radial Glow */}
      <div className="absolute inset-0 bg-layer-texture-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Subtle Brand Kicker / Philosophy Tag */}
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-neutral-400 mb-6">
              <span className="w-6 h-px bg-neutral-600" />
              <span>CUBE WORKSTUDIO · 數位設計與一站式製造工坊</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.15] mb-6 text-balance">
              讓創意快速成形，
              <br />
              <span className="text-neutral-400 font-normal">讓設計真正落地。</span>
            </h1>

            {/* Core Brand Value & Slogan */}
            <div className="mb-6 flex items-center gap-4 text-sm sm:text-base font-medium text-neutral-300">
              <span className="text-white font-semibold tracking-wider">快速</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white font-semibold tracking-wider">精準</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white font-semibold tracking-wider">客製化</span>
            </div>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-10 font-light">
              立方工坊不只是 3D 列印，而是從需求討論、3D 建模、快速打樣、列印製造到後加工的
              <strong className="text-white font-medium"> 一站式數位製造夥伴</strong>。協助建築師、設計事務所、新創企業與創作者大幅降低打樣成本，加速概念實體化。
            </p>

            {/* Primary Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {/* Primary: Request Quote */}
              <button
                onClick={() => setActiveView('upload')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 font-medium text-sm rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span>立即詢價</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Upload Files Direct */}
              <button
                onClick={() => setActiveView('upload')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-800 hover:bg-neutral-750 text-white border border-neutral-700 font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <Upload className="w-4 h-4 text-neutral-400" />
                <span>上傳檔案 (STL / STEP / 3DM)</span>
              </button>

              {/* Secondary Navigation Anchors */}
              <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
                <button
                  onClick={() => scrollTo('services')}
                  className="px-4 py-2.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-md transition-colors cursor-pointer"
                >
                  查看服務
                </button>
                <span className="text-neutral-700">·</span>
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="px-4 py-2.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-md transition-colors cursor-pointer"
                >
                  查看作品
                </button>
                <span className="text-neutral-700">·</span>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-4 py-2.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-md transition-colors cursor-pointer"
                >
                  聯絡我們
                </button>
              </div>
            </div>

            {/* Quick Proof Trust Markers */}
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4 sm:gap-6 text-xs text-neutral-400">
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums">24 - 48h</span>
                <span className="text-neutral-400 mt-0.5">極速打樣評估</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums">FDM + SLA</span>
                <span className="text-neutral-400 mt-0.5">工業雙製程技術</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums">±0.05 mm</span>
                <span className="text-neutral-400 mt-0.5">高精度裝配公差</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Framing with Subtle Tech Border */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-750 bg-neutral-950 shadow-2xl group">
                <img
                  src={showcaseProject?.imageUrl || '/src/assets/images/hero_3d_architectural_model_1790766162791.jpg'}
                  alt={showcaseProject?.title || '立方工坊精密 3D 列印建築比例模型與機構手板打樣'}
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

                {/* Floating Architectural Spec Card */}
                {showcaseProject && (
                  <div 
                    onClick={() => scrollTo('portfolio')}
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/70 text-left cursor-pointer hover:border-neutral-500 transition-colors shadow-lg"
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                      <span className="font-mono text-neutral-300 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {showcaseProject.category} · {showcaseProject.clientType}
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px] bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                        {showcaseProject.specs?.scale || showcaseProject.process}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white line-clamp-1">
                      {showcaseProject.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                      <span className="truncate max-w-[180px]">{showcaseProject.material}</span>
                      <span>·</span>
                      <span>{showcaseProject.specs?.precision || showcaseProject.turnaroundDays}</span>
                      <span>·</span>
                      <span className="text-neutral-300 hover:text-white underline">查看詳情 →</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative Corner Coordinate Guides */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neutral-600 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neutral-600 pointer-events-none" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
