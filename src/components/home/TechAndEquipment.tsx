import React, { useState } from 'react';
import { Layers, Cpu, Wrench, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const TechAndEquipment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'process' | 'materials' | 'software'>('process');

  return (
    <section id="technology" className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>TECHNOLOGY & CAPABILITIES</span>
            <span>·</span>
            <span>技術與設備</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            FDM 與 SLA 雙製程架構，精準適配各類應用
          </h2>
          <p className="mt-3 text-base text-neutral-600 font-light">
            從大尺寸結構驗證到 0.025mm 極微細節微雕，我們依據材料力學、尺寸公差與外觀需求靈活配置。
          </p>
        </div>

        {/* Tab switch control (functional buttons, zero-pill) */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-200/70 rounded-lg max-w-md mb-12">
          <button
            onClick={() => setActiveTab('process')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap text-center ${
              activeTab === 'process'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            雙製程對比 (FDM vs SLA)
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap text-center ${
              activeTab === 'materials'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            常用工程材料表
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap text-center ${
              activeTab === 'software'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            數位設計與軟體技術棧
          </button>
        </div>

        {/* Tab 1: FDM vs SLA Detailed Comparison */}
        {activeTab === 'process' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FDM Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-neutral-400">PROCESS 01</span>
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">熱融積層成型</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                FDM 熔融沉積製程
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-light">
                將熱塑性線材加熱融化後精確擠出成型。具備優良的耐衝擊韌性、耐候性與經濟性，最適合大尺寸結構驗證與功能性手板。
              </p>

              <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">成型層高範圍</span>
                  <span className="font-mono font-semibold text-neutral-900">0.08 mm - 0.28 mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">典型尺寸公差</span>
                  <span className="font-mono font-semibold text-neutral-900">±0.15 mm（視結構特徵）</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">最大單件成型尺寸</span>
                  <span className="font-mono font-semibold text-neutral-900">300 x 300 x 400 mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">主力常用線材</span>
                  <span className="font-medium text-neutral-900">PLA / PETG / 碳纖 PETG</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">核心優勢</span>
                  <span className="font-medium text-neutral-900">抗摔耐摔、性價比高、成型尺寸大</span>
                </div>
              </div>
            </div>

            {/* SLA Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-neutral-400">PROCESS 02</span>
                <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">光化學固化成型</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                SLA 光固化製程
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-light">
                利用精準紫外光逐層固化高感度液態光敏樹脂。表面幾近無層紋，能完美呈現極小文字、微細縫隙與細緻浮雕曲面。
              </p>

              <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">成型層高範圍</span>
                  <span className="font-mono font-semibold text-neutral-900">0.025 mm - 0.05 mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">典型尺寸公差</span>
                  <span className="font-mono font-semibold text-neutral-900">±0.05 mm（高精密級）</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">最大單件成型尺寸</span>
                  <span className="font-mono font-semibold text-neutral-900">220 x 140 x 250 mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-50">
                  <span className="text-neutral-500">主力常用材料</span>
                  <span className="font-medium text-neutral-900">高精標準樹脂 / 高韌工程樹脂 / 透光樹脂</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-500">核心優勢</span>
                  <span className="font-medium text-neutral-900">無層紋鏡面感、極致細部、微縮公仔首選</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Materials Comparison */}
        {activeTab === 'materials' && (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-700 font-semibold">
                  <tr>
                    <th className="py-4 px-6">材料名稱</th>
                    <th className="py-4 px-4">製程類別</th>
                    <th className="py-4 px-4">硬度 / 特性</th>
                    <th className="py-4 px-4">耐溫極限</th>
                    <th className="py-4 px-6">最適合應用場景</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/70 text-neutral-700">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-neutral-900">
                      PLA 環保塑料
                    </td>
                    <td className="py-4 px-4 font-mono">FDM</td>
                    <td className="py-4 px-4">剛性高、收縮率極低</td>
                    <td className="py-4 px-4 font-mono tabular-nums">約 55°C</td>
                    <td className="py-4 px-6">建築概念模型、外觀檢視、一般治具、學生作業</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-neutral-900">
                      PETG 高韌抗衝擊料
                    </td>
                    <td className="py-4 px-4 font-mono">FDM</td>
                    <td className="py-4 px-4">高韌性、抗化學耐酸鹼</td>
                    <td className="py-4 px-4 font-mono tabular-nums">約 75°C</td>
                    <td className="py-4 px-6">機構功能卡扣件、終端替換零件、戶外防水抗 UV 構件</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-neutral-900">
                      SLA 高精細光固化樹脂
                    </td>
                    <td className="py-4 px-4 font-mono">SLA</td>
                    <td className="py-4 px-4">表面細膩無紋、微米精準</td>
                    <td className="py-4 px-4 font-mono tabular-nums">約 60°C</td>
                    <td className="py-4 px-6">藝術公仔、精密五金樣板、建築細部窗花、飾品</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-neutral-900">
                      SLA 耐衝擊工程樹脂
                    </td>
                    <td className="py-4 px-4 font-mono">SLA</td>
                    <td className="py-4 px-4">兼具 ABS 級韌性與 SLA 精準</td>
                    <td className="py-4 px-4 font-mono tabular-nums">約 70°C</td>
                    <td className="py-4 px-6">醫療儀器外殼手板、開模前試裝、穿戴卡扣原型</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Software & CAD Ecosystem */}
        {activeTab === 'software' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-400">STACK 01</span>
              <h4 className="text-lg font-bold text-neutral-900 mt-2 mb-2">Rhino & Grasshopper</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                專精於複雜雙曲面、自由造形曲面及參數化演算法造型拆解，能處理高難度建築立面與漸變多孔結構。
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-400">STACK 02</span>
              <h4 className="text-lg font-bold text-neutral-900 mt-2 mb-2">SketchUp & AutoCAD</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                直接無縫對接建築師事務所與室內設計師最常用的 DWG 地籍平面與 SKP 空間量體，快速轉換為可列印閉合網格。
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-400">STACK 03</span>
              <h4 className="text-lg font-bold text-neutral-900 mt-2 mb-2">Revit BIM 數位整合</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                具備大型建築資訊模型（BIM）空間簡化與分層抽取能力，過濾多餘內部管線，保留精準梁柱與立面構造。
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-400">STACK 04</span>
              <h4 className="text-lg font-bold text-neutral-900 mt-2 mb-2">逆向工程與網格修復</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                將掃描點雲與損壞網格進行破面縫合、法向量校正與流形閉合，重新建立高精確度的 STEP 實體工程幾何。
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
