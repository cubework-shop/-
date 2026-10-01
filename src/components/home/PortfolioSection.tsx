import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectCategory, Project } from '../../types';
import { ProjectModal } from '../portfolio/ProjectModal';
import { ArrowUpRight, Plus, Eye, Layers, Star } from 'lucide-react';

const CATEGORIES: ProjectCategory[] = [
  '全部',
  '建築模型',
  '產品打樣',
  '3D 列印',
  '客製化商品',
  '逆向工程',
  '展示模型'
];

export const PortfolioSection: React.FC = () => {
  const { siteSettings, projects, setActiveView, isAdminLoggedIn } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('全部');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const config = siteSettings.portfolioSection || {
    title: '精準落地，從概念到實體的每一次實現',
    subtitle: '涵蓋建築比例模型、生醫手持原型、賽車風洞導風件至限定藝術公仔之真實產出。',
    displayMode: 'all',
    maxItems: 0,
    showCategoryFilter: true,
  };

  let activeProjects = projects.filter(p => p.active);
  if (config.displayMode === 'featured_only') {
    activeProjects = activeProjects.filter(p => p.featured);
  }

  const filteredProjects = activeProjects
    .filter(p => selectedCategory === '全部' || p.category === selectedCategory);

  const displayProjects = config.maxItems && config.maxItems > 0
    ? filteredProjects.slice(0, config.maxItems)
    : filteredProjects;

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
              <span>SELECTED WORKS & CASE STUDIES</span>
              <span>·</span>
              <span>精選作品案例</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
              {config.title || '精準落地，從概念到實體的每一次實現'}
            </h2>
            <p className="mt-3 text-base text-neutral-600 font-light">
              {config.subtitle || '涵蓋建築比例模型、生醫手持原型、賽車風洞導風件至限定藝術公仔之真實產出。'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => setActiveView('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>後台自訂案例</span>
              </button>
            )}
            <button
              onClick={() => setActiveView('upload')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            >
              <span>提交您的圖檔</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters (Interactive Segmented Control Buttons) */}
        {config.showCategoryFilter !== false && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 border-b border-neutral-100 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100/70 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setModalProject(project)}
              className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-neutral-300 flex flex-col justify-between"
            >
              <div>
                {/* Large Visual Asset */}
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Scrim on Hover */}
                  <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      查看規格與細節
                    </span>
                  </div>

                  {/* Top Category Text Overlay */}
                  <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono font-medium text-white">
                    {project.category}
                  </div>

                  {/* Top Right Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-neutral-950 font-bold text-[10px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-neutral-950 text-neutral-950" />
                      <span>精選案例</span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Unboxed Metadata Discipline */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                    <span>{project.clientType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.process}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{project.turnaroundDays}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-light mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom spec ticker */}
              <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="truncate max-w-[200px]">材料：{project.material}</span>
                <span className="text-neutral-900 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  案例解析 →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center border border-dashed border-neutral-300 rounded-2xl">
            <Layers className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-700">目前此分類尚無發布的作品案例</p>
            <p className="text-xs text-neutral-500 mt-1">您可以透過後台 CMS 隨時新增作品</p>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};
