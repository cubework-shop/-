import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_PROCESS_STEPS } from '../../data/initialData';
import { ArrowRight, CheckCircle2, FileCheck, Layers, PackageCheck } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <section id="process" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>WORKFLOW & TRANSPARENCY</span>
            <span>·</span>
            <span>服務流程</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            十步精準作業流程，讓合作透明可預期
          </h2>
          <p className="mt-3 text-base text-neutral-600 font-light">
            從最初檔案幾何審核到最終表面品檢出貨，每一個環節皆有嚴格工程檢核點。
          </p>
        </div>

        {/* 10 Step Flow Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {SERVICE_PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-all flex flex-col justify-between group relative hover:border-neutral-400"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    STEP {step.step}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500">
                    {step.tag}
                  </span>
                </div>
                
                <h3 className="text-base font-semibold text-neutral-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              {/* Progress connector indicator */}
              <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-400">
                <span>階段 0{idx < 4 ? '1 評估' : idx < 7 ? '2 製程' : '3 驗收'}</span>
                {idx < SERVICE_PROCESS_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 hidden lg:block" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Assurance Banner */}
        <div className="rounded-xl bg-neutral-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
              <PackageCheck className="w-6 h-6 text-neutral-200" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">
                準備好開始您的第一個專案了嗎？
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                上傳 3D 圖檔（.stl / .step / .3dm / .skp），工坊將於 24 小時內回覆可行性評估與正式報價。
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveView('upload')}
            className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap"
          >
            立即提交圖檔估價
          </button>
        </div>

      </div>
    </section>
  );
};
