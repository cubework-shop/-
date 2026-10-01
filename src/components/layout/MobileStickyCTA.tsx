import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Upload, ArrowUpRight } from 'lucide-react';

export const MobileStickyCTA: React.FC = () => {
  const { siteSettings, setActiveView, activeView } = useApp();

  // Hide in Admin view to allow full workspace focus
  if (activeView === 'admin') return null;

  return (
    <aside 
      aria-label="行動版快速操作列"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 sm:hidden shadow-lg"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* LINE Contact Quick Action */}
        <a
          href={siteSettings.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors text-center whitespace-nowrap"
        >
          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
          <span>LINE 官方諮詢</span>
        </a>

        {/* Primary Quote / Upload Action */}
        <button
          onClick={() => setActiveView('upload')}
          className="flex-1 py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center whitespace-nowrap shadow-xs"
        >
          <Upload className="w-3.5 h-3.5 shrink-0" />
          <span>立即詢價 / 上傳檔案</span>
        </button>
      </div>
    </aside>
  );
};
