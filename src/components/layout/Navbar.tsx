import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { Menu, X, ArrowUpRight, ShieldCheck, Share2 } from 'lucide-react';
import { ShareModal } from '../common/ShareModal';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleNavClick = (view: AppView, targetSectionId?: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'home' && targetSectionId) {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (targetSectionId) {
      const el = document.getElementById(targetSectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Zone (Single element / wordmark lockup) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none group cursor-pointer"
          aria-label="Cube Work 立方工坊 首頁"
        >
          <Logo size="md" theme="dark" showText={true} />
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => handleNavClick('home', 'brand-story')}
            className="hover:text-neutral-900 transition-colors py-1 relative hover:underline underline-offset-8 cursor-pointer"
          >
            關於立方
          </button>
          <button
            onClick={() => handleNavClick('home', 'services')}
            className="hover:text-neutral-900 transition-colors py-1 relative hover:underline underline-offset-8 cursor-pointer"
          >
            服務項目
          </button>
          <button
            onClick={() => handleNavClick('home', 'portfolio')}
            className="hover:text-neutral-900 transition-colors py-1 relative hover:underline underline-offset-8 cursor-pointer"
          >
            作品案例
          </button>
          <button
            onClick={() => handleNavClick('home', 'technology')}
            className="hover:text-neutral-900 transition-colors py-1 relative hover:underline underline-offset-8 cursor-pointer"
          >
            技術與材料
          </button>
          <button
            onClick={() => handleNavClick('home', 'process')}
            className="hover:text-neutral-900 transition-colors py-1 relative hover:underline underline-offset-8 cursor-pointer"
          >
            服務流程
          </button>
          <button
            onClick={() => handleNavClick('home', 'contact')}
            className="hover:text-neutral-900 transition-colors py-1 relative hover:underline underline-offset-8 cursor-pointer"
          >
            聯絡我們
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Share Website Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium rounded-md border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 bg-white transition-colors cursor-pointer"
            title="分享官網連結 / QR Code"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">分享</span>
          </button>

          {/* Admin CMS Access */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              activeView === 'admin'
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'text-neutral-600 border-neutral-300 hover:border-neutral-900 hover:text-neutral-900 bg-white'
            }`}
            title="管理後台 CMS"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{isAdminLoggedIn ? '後台管理' : '管理登入'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('upload')}
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-lg text-white transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap ${
              activeView === 'upload'
                ? 'bg-neutral-800 ring-2 ring-neutral-900 ring-offset-2'
                : 'bg-neutral-950 hover:bg-neutral-800'
            }`}
          >
            <span>上傳檔案 / 立即詢價</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-6 py-6 shadow-xl animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4 text-base font-medium text-neutral-800">
            <button
              onClick={() => handleNavClick('home', 'brand-story')}
              className="text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              關於立方工坊
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              服務項目
            </button>
            <button
              onClick={() => handleNavClick('home', 'portfolio')}
              className="text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              精選作品案例
            </button>
            <button
              onClick={() => handleNavClick('home', 'technology')}
              className="text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              技術與設備規格
            </button>
            <button
              onClick={() => handleNavClick('home', 'process')}
              className="text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              10 步服務流程
            </button>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              聯絡我們
            </button>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => handleNavClick('upload')}
                className="w-full py-3 bg-neutral-900 text-white rounded-lg text-center font-medium text-sm flex items-center justify-center gap-2"
              >
                <span>上傳檔案 / 立即詢價</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsShareModalOpen(true);
                }}
                className="w-full py-2.5 bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-lg text-center font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-100"
              >
                <Share2 className="w-4 h-4 text-neutral-600" />
                <span>分享官方網站（連結 / LINE / QR Code）</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2.5 bg-neutral-100 text-neutral-800 rounded-lg text-center font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-neutral-600" />
                <span>進入網站後台 CMS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal Dialog */}
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </header>
  );
};
