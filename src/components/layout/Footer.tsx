import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ArrowUp, Instagram, Facebook, Share2, ShieldCheck } from 'lucide-react';
import { ShareModal } from '../common/ShareModal';

export const Footer: React.FC = () => {
  const { siteSettings, setActiveView } = useApp();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 text-xs font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" theme="light" showText={true} />
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm pt-2">
              {siteSettings.shortIntro}
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              FDM / SLA 雙製程技術 · Rhino / Grasshopper 參數化建模 · 1:1 實體驗證
            </div>
          </div>

          {/* Col 3: Services Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-white tracking-widest uppercase block">
              SERVICES
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D列印 (快速打樣)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D 建模與 CAD 實體
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  建築與基地等高線模型
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  客製化商品與公仔
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('technology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D 逆向工程與網格修復
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Workflow & Support */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-white tracking-widest uppercase block">
              WORKFLOW
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => scrollToSection('process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  十步精準作業流程
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('technology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FDM vs SLA 雙製程解析
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('technology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  工程塑膠與光固化材料表
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  常見問題解答 (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('upload')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  專案詢價與圖檔上傳
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Access */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-white tracking-widest uppercase block">
              CONNECT
            </span>
            <div className="space-y-2 text-neutral-400">
              <p>電話：{siteSettings.phone}</p>
              <p className="truncate">Email：{siteSettings.email}</p>
              <p>
                <a
                  href={siteSettings.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors underline decoration-neutral-600 underline-offset-4"
                >
                  LINE 官方帳號諮詢 ↗
                </a>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.socialLinks.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Threads"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsShareOpen(true)}
                className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                <span>分享此官網（連結 / LINE / QR Code）</span>
              </button>

              <button
                onClick={() => setActiveView('admin')}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>工坊內部管理後台 CMS</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} 立方工坊 Cube Work (cubeworkshop). All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>{siteSettings.address}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-neutral-300 transition-colors cursor-pointer"
            >
              <span>回到頂部</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Share Modal Dialog */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </footer>
  );
};
