import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Share2,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteSettings, addInquiry, setActiveView } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    lineId: '',
    projectType: '3D 列印',
    message: ''
  });

  const [submittedTrackingNo, setSubmittedTrackingNo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('請填寫完整姓名、Email 與聯絡電話');
      return;
    }

    const tracking = addInquiry({
      customerName: formData.name,
      companyOrOrg: formData.company,
      email: formData.email,
      phone: formData.phone,
      lineId: formData.lineId,
      projectType: formData.projectType,
      quantity: 1,
      preferredMaterial: '由工坊專業推薦',
      preferredProcess: '由工坊評估最適製程',
      needPostProcessing: ['一般去支撐'],
      targetDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
      description: formData.message || '透過聯絡我們快速表單諮詢',
      files: []
    });

    setSubmittedTrackingNo(tracking);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      lineId: '',
      projectType: '3D 列印',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            <span>GET IN TOUCH</span>
            <span>·</span>
            <span>聯絡我們</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
            與立方工坊工程團隊啟動您的專案
          </h2>
          <p className="mt-3 text-base text-neutral-600 font-light">
            無論是初步構想評估、特殊工程材料諮詢，或是實體樣品參觀，我們隨時在此為您解答。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              
              {/* LINE Official Banner */}
              <div className="p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                    OFFICIAL LINE · 最快回覆通道
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1 break-all">
                    LINE 官方帳號：
                    <a
                      href={siteSettings.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      {siteSettings.lineUrl}
                    </a>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    營業時間：{siteSettings.openingHours} · 即時線上估價
                  </p>
                </div>
                <a
                  href={siteSettings.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap inline-flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                >
                  <span>加入 LINE 好友</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase mb-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>電話諮詢</span>
                  </div>
                  <a
                    href={`tel:${siteSettings.phone}`}
                    className="text-base font-semibold text-neutral-900 hover:text-neutral-600 font-mono"
                  >
                    {siteSettings.phone}
                  </a>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase mb-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>專案電子信箱</span>
                  </div>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-600 truncate block"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900">地址：</span>
                    <span className="block text-neutral-600 mt-0.5">{siteSettings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-neutral-200/50">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900">營業時間：</span>
                    <span className="block text-neutral-600 mt-0.5">{siteSettings.openingHours}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-mono text-neutral-400 uppercase block mb-3">
                  FOLLOW US · 社群平台動態
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={siteSettings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-900 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={siteSettings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-900 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={siteSettings.socialLinks.threads}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 hover:border-neutral-900 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Threads</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-50/70 p-8 sm:p-10 rounded-2xl border border-neutral-200">
            <div className="mb-6">
              <span className="text-xs font-mono text-neutral-400 uppercase">
                QUICK INQUIRY · 快速留言諮詢
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                填寫您的聯絡方式與專案需求
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                若您已有 3D 圖檔（.stl / .step 等），建議直接使用【
                <button
                  type="button"
                  onClick={() => setActiveView('upload')}
                  className="text-neutral-900 underline font-medium hover:text-neutral-600"
                >
                  完整上傳檔案估價單
                </button>
                】以獲得最精準報價。
              </p>
            </div>

            {submittedTrackingNo ? (
              <div className="p-8 bg-white rounded-xl border border-emerald-200 text-center animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-neutral-900 mb-1">
                  諮詢需求已成功送達工坊！
                </h4>
                <p className="text-xs text-neutral-600 mb-4">
                  您的案件追蹤編號為：<strong className="font-mono text-neutral-900 text-sm">{submittedTrackingNo}</strong>
                </p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  工程團隊已接收資料，我們將於 24 小時內透過 Email 或 LINE 與您聯繫確認幾何細節。
                </p>
                <button
                  onClick={() => setSubmittedTrackingNo(null)}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  繼續填寫其他諮詢
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      您的姓名 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="林設計師"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      公司 / 學校系所單位
                    </label>
                    <input
                      type="text"
                      placeholder="十方建築事務所 / 實踐工設"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      聯絡電話 *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912-345-678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      LINE ID（方便即時圖文溝通）
                    </label>
                    <input
                      type="text"
                      placeholder="lin_design2026"
                      value={formData.lineId}
                      onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    電子郵件信箱 *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="service@client.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    預計諮詢的服務類別
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  >
                    <option value="3D 列印">3D 列印（快速打樣 / 零件 / 小量產）</option>
                    <option value="3D 建模與設計">3D 建模與 CAD 實體設計</option>
                    <option value="建築模型製作">建築比例模型 / 地形基地模型</option>
                    <option value="客製化商品">客製化商品 / 原創公仔 / 禮品</option>
                    <option value="逆向工程">逆向工程 / 3D 掃描處理</option>
                    <option value="其他客製合作">其他跨界製造合作</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    需求說明或問題描述
                  </label>
                  <textarea
                    rows={4}
                    placeholder="請簡述您的模型尺寸、材質期待、期望完成日期或預算範圍..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>送出快速諮詢需求</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
