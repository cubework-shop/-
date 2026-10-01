import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { news } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const activeNews = news.filter(n => n.active);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>INSIGHTS & ANNOUNCEMENTS</span>
            <span>·</span>
            <span>最新消息與作品分享</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            製造新知、材料評測與工坊動態
          </h2>
          <p className="mt-3 text-base text-neutral-600 font-light">
            分享數位製造前沿技術、材料應用深度指南與真實專案拆解。
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeNews.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Unboxed Metadata Discipline */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                  <span className="font-medium text-neutral-800">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light line-clamp-3 mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs font-medium text-neutral-900">
                <span>閱讀完整文章</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-semibold text-neutral-800">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{selectedArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 leading-tight">
              {selectedArticle.title}
            </h3>

            <div className="prose prose-neutral max-w-none text-sm text-neutral-700 leading-relaxed space-y-4 font-light">
              <p className="font-normal text-neutral-800 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                {selectedArticle.summary}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <p>
                在立方工坊的實務經驗中，我們發現許多設計師在前期建模時容易忽略材料本身的收縮係數與重力形變。例如 FDM 線材在不同擠出溫度下的層間結合強度存在顯著方向異方性（Z 軸拉伸強度通常低於 XY 軸 30%~50%），因此在切片擺放方向的選擇上需要精密的力學考量。
              </p>
              <p>
                而光固化 SLA 製程雖然在外觀與微細特徵上具備無可比擬的優勢，但在大面積封閉薄殼結構中，則需規劃排液透氣孔以防止吸盤效應導致的成型脫層瑕疵。若您對專案選型有任何疑問，歡迎隨時攜帶圖檔至工坊現場交流。
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                關閉文章
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
