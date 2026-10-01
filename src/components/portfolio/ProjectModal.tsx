import React from 'react';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Layers, Clock, ArrowRight, Check } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { setActiveView } = useApp();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 relative animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-neutral-600 hover:text-neutral-950 hover:bg-white shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-16/9 w-full bg-neutral-900 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
              {project.category} · {project.clientType}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white text-balance">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Metadata Bar (Zero-pill discipline) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-neutral-600 border-b border-neutral-200 pb-4">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-neutral-400" />
              <span>製程：<strong>{project.process}</strong></span>
            </div>
            <span className="text-neutral-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <span>材料：<strong>{project.material}</strong></span>
            </div>
            <span className="text-neutral-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>製作時程：<strong>{project.turnaroundDays}</strong></span>
            </div>
            <span className="text-neutral-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span className="font-mono tabular-nums">完成日期：{project.completionDate}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-mono">
              CASE BRIEF & BACKGROUND · 專案背景與挑戰
            </h4>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Specifications Box */}
          {project.specs && (
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-2.5 text-xs sm:text-sm">
              <h5 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider mb-3">
                技術規格與後加工處理
              </h5>
              {project.specs.scale && (
                <div className="flex justify-between py-1 border-b border-neutral-200/50">
                  <span className="text-neutral-500">模型比例 / 尺寸</span>
                  <span className="font-medium text-neutral-800">{project.specs.scale}</span>
                </div>
              )}
              {project.specs.precision && (
                <div className="flex justify-between py-1 border-b border-neutral-200/50">
                  <span className="text-neutral-500">關鍵公差要求</span>
                  <span className="font-medium text-neutral-800 font-mono">{project.specs.precision}</span>
                </div>
              )}
              {project.specs.finish && (
                <div className="flex justify-between py-1 border-b border-neutral-200/50">
                  <span className="text-neutral-500">表面後加工處理</span>
                  <span className="font-medium text-neutral-800">{project.specs.finish}</span>
                </div>
              )}
              {project.specs.software && (
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">支援軟體與前處理</span>
                  <span className="font-medium text-neutral-800">{project.specs.software}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200">
            <span className="text-xs text-neutral-500 text-center sm:text-left">
              有類似的打樣或製作需求？將此案例作為參考提交詢價。
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                關閉視窗
              </button>
              <button
                onClick={() => {
                  onClose();
                  setActiveView('upload');
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>以此案規格立即詢價</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
