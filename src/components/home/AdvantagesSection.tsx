import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, Zap, Layers, Sparkles, Ruler } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const { setActiveView, siteSettings } = useApp();

  const advantages = [
    {
      num: '01',
      title: '一站式全流程整合',
      tagline: '減少跨廠商溝通損耗與責任推諉',
      desc: '我們整合 CAD 實體建模、破面修復、FDM/SLA 雙製程成型、手工細砂打磨、UV 二次固化到抗眩消光塗裝。您只需面對單一窗口，即可從手繪草圖獲得成品級打樣。'
    },
    {
      num: '02',
      title: '雙製程多元材料庫',
      tagline: '量身訂製最適材料與公差配比',
      desc: '備有工業級 PLA、高韌耐候 PETG、橡膠級彈性 TPU，以及 0.025mm 極微層高的光固化高韌/透光樹脂。依據您的預算、受力狀態與表面要求提供最具性價比的配置。'
    },
    {
      num: '03',
      title: '設計與工程雙重專業',
      tagline: '懂空間美感，更懂機構公差與拔模收縮',
      desc: '團隊核心具備建築與工業設計背景，深刻理解建築量體比例、光影層次、以及產品卡扣裝配的微米公差。在列印前主動協助排查薄壁破面與裝配干涉。'
    },
    {
      num: '04',
      title: '24-48h 極速打樣響應',
      tagline: '死線前夕最值得信賴的實體化後盾',
      desc: '針對競圖提案、畢業製作、募資發布會或展覽急件，工坊提供 24-48 小時急件快速通道與機台優先排程，並支援台北工坊現場取件確認。'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-neutral-900 text-white border-b border-neutral-800 bg-architect-grid-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-3">
            <span>WHY CUBE WORK</span>
            <span>·</span>
            <span>我們的核心優勢</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
            以設計師的審美標準，
            <br />
            落實工程師的精準公差。
          </h2>
          <p className="mt-3 text-base text-neutral-400 font-light">
            我們消除數位圖檔到實體成型間的鴻溝，讓每一次打樣都成為具備說服力的作品。
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {advantages.map((adv) => (
            <div
              key={adv.num}
              className="p-8 sm:p-10 rounded-2xl bg-neutral-800/60 border border-neutral-700/80 hover:border-neutral-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    ADVANTAGE {adv.num}
                  </span>
                  <span className="text-xs font-medium text-neutral-300">
                    {adv.tagline}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {adv.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {adv.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-700/60 flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>經百件真實案例嚴格驗證之品管流程</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Quote Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-neutral-800/90 border border-neutral-700">
          <div>
            <div className="text-sm font-semibold text-white">
              急件需要 24-48 小時內取件？
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              立即加{' '}
              <a
                href={siteSettings.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white text-emerald-400 font-medium"
              >
                LINE 官方帳號
              </a>{' '}
              或提交表單標註【急件】，專人即刻進行工程審圖。
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('upload')}
              className="px-5 py-2.5 bg-white text-neutral-950 font-semibold text-xs rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              立即提交急件需求
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
