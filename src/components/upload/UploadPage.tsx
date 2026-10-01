import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { UploadedFileItem } from '../../types';
import { 
  Upload, 
  FileCode, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft, 
  Info, 
  Clock, 
  ShieldCheck,
  Send,
  FileType
} from 'lucide-react';

export const UploadPage: React.FC = () => {
  const { services, addInquiry, setActiveView } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [companyOrOrg, setCompanyOrOrg] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lineId, setLineId] = useState('');
  const [projectType, setProjectType] = useState('3D 列印代工');
  const [quantity, setQuantity] = useState(1);
  const [dimensions, setDimensions] = useState('');
  const [preferredMaterial, setPreferredMaterial] = useState('由工坊工程師評估建議');
  const [preferredProcess, setPreferredProcess] = useState('由工坊評估最適製程 (FDM 或 SLA)');
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().slice(0, 10);
  });
  const [budgetRange, setBudgetRange] = useState('未定 / 依報價為準');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Submission state
  const [submittedTrackingNo, setSubmittedTrackingNo] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    const processed: UploadedFileItem[] = newFiles.map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: file.name,
      size: file.size,
      type: file.type || file.name.split('.').pop() || 'unknown',
      lastModified: file.lastModified
    }));

    setFiles(prev => [...prev, ...processed]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !email || !phone) {
      alert('請填寫完整姓名、Email 與聯絡電話');
      return;
    }

    if (files.length === 0 && !description) {
      alert('請至少上傳一個 3D 圖檔或填寫詳細需求說明');
      return;
    }

    const trackingNo = addInquiry({
      customerName,
      companyOrOrg,
      email,
      phone,
      lineId,
      projectType,
      quantity: Number(quantity) || 1,
      dimensions,
      preferredMaterial,
      preferredProcess,
      needPostProcessing: [],
      targetDate,
      budgetRange,
      description,
      files
    });

    setSubmittedTrackingNo(trackingNo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 sm:py-20 bg-neutral-50/60 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setActiveView('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>返回首頁</span>
        </button>

        {submittedTrackingNo ? (
          /* Submission Success State */
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 shadow-sm text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              RFQ SUBMITTED SUCCESSFULLY
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-2 mb-3">
              需求與圖檔已成功送達工坊！
            </h1>
            
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 inline-block my-4">
              <span className="text-xs text-neutral-500 block mb-1">您的專案追蹤單號</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-neutral-900 tracking-wider">
                {submittedTrackingNo}
              </span>
            </div>

            <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed mb-8 font-light">
              立方工坊工程師已收到您的委託。我們將在 24 小時內完成圖檔破面檢核、壁厚分析與製程可行性評估，並將詳細報價單發送至您的 Email（<strong>{email}</strong>）。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSubmittedTrackingNo(null);
                  setFiles([]);
                  setDescription('');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-neutral-300 hover:border-neutral-900 text-xs sm:text-sm font-medium text-neutral-800 transition-colors cursor-pointer"
              >
                提交另一筆專案需求
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                瀏覽工坊作品案例
              </button>
            </div>
          </div>
        ) : (
          /* Main RFQ & Upload Form */
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 shadow-xs">
            
            {/* Form Title & Context */}
            <div className="border-b border-neutral-200 pb-8 mb-8">
              <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                REQUEST FOR QUOTATION · 專案詢價與圖檔提交
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-2">
                上傳 3D 模型與專案需求資料
              </h1>
              <p className="text-sm text-neutral-600 mt-2 font-light leading-relaxed">
                支援 <span className="font-mono font-medium text-neutral-800">.STL, .OBJ, .3DM, .SKP, .DWG, .STEP, .STP, .ZIP</span> 以及手繪照片。所有上傳檔案受嚴格專案保密協議保護，僅用於本專案工程評估。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: File Uploader Area */}
              <div>
                <label className="block text-xs font-semibold text-neutral-900 tracking-wider uppercase mb-3">
                  01. 上傳模型檔案或參考圖檔
                </label>

                {/* Drag and Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-neutral-900 bg-neutral-100/80 scale-[1.01]'
                      : 'border-neutral-300 hover:border-neutral-500 bg-neutral-50/50'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                    accept=".stl,.obj,.3dm,.skp,.dwg,.step,.stp,.iges,.igs,.zip,.rar,.7z,.png,.jpg,.jpeg,.pdf"
                  />
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center mx-auto mb-3 text-neutral-700">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-neutral-900">
                    點擊選取檔案，或將 3D 圖檔拖曳至此處
                  </div>
                  <p className="text-xs text-neutral-500 mt-1.5 font-light">
                    單檔建議小於 100MB，超過可打包為 .ZIP 或於備註附上雲端連結
                  </p>
                </div>

                {/* Uploaded File List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-mono text-neutral-500">
                      已就緒上傳清單 ({files.length} 個檔案)：
                    </div>
                    {files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate mr-3">
                          <FileType className="w-4 h-4 text-neutral-500 shrink-0" />
                          <span className="font-medium text-neutral-800 truncate">{file.name}</span>
                          <span className="text-neutral-400 font-mono shrink-0">({formatFileSize(file.size)})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                          title="移除檔案"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 2: Contact Information */}
              <div className="pt-6 border-t border-neutral-200">
                <label className="block text-xs font-semibold text-neutral-900 tracking-wider uppercase mb-4">
                  02. 客戶聯絡資訊
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      姓名 / 稱呼 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="王小明"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      公司 / 事務所 / 學校系所
                    </label>
                    <input
                      type="text"
                      placeholder="無印建築事務所 / 台灣科大設計系"
                      value={companyOrOrg}
                      onChange={e => setCompanyOrOrg(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      聯絡電話 *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912-345-678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      LINE ID（利於快速圖面確認與即時通知）
                    </label>
                    <input
                      type="text"
                      placeholder="cubework_client"
                      value={lineId}
                      onChange={e => setLineId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      電子信箱（報價單將寄送至此） *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Project Specifications */}
              <div className="pt-6 border-t border-neutral-200">
                <label className="block text-xs font-semibold text-neutral-900 tracking-wider uppercase mb-4">
                  03. 專案技術規格與條件
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      專案服務類別
                    </label>
                    <select
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    >
                      {services.filter(s => s.active).map(s => (
                        <option key={s.id} value={s.title}>
                          {s.title}（{s.shortDesc || s.englishTitle}）
                        </option>
                      ))}
                      <option value="其他客製合作">其他客製合作</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      預計製作數量
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      預期偏好製程
                    </label>
                    <select
                      value={preferredProcess}
                      onChange={e => setPreferredProcess(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    >
                      <option value="由工坊評估最適製程 (FDM 或 SLA)">由工坊評估最適製程（推薦）</option>
                      <option value="FDM 熔融沉積（經濟韌性）">FDM 熔融沉積（經濟韌性）</option>
                      <option value="SLA 光固化（超高細節無層紋）">SLA 光固化（超高細節無層紋）</option>
                      <option value="FDM / SLA 複合搭配">FDM / SLA 複合搭配（基地+細部）</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      偏好成型材料
                    </label>
                    <select
                      value={preferredMaterial}
                      onChange={e => setPreferredMaterial(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                    >
                      <option value="由工坊工程師評估建議">由工坊工程師評估建議（推薦）</option>
                      <option value="PLA 環保通用塑料 (白/灰/黑)">PLA 環保通用塑料（白/灰/黑）</option>
                      <option value="PETG 高韌抗衝擊線材">PETG 高韌抗衝擊線材</option>
                      <option value="SLA 高精度光固化標準樹脂">SLA 高精度光固化標準樹脂</option>
                      <option value="SLA 耐衝擊/耐高溫工程樹脂">SLA 耐衝擊/耐高溫工程樹脂</option>
                      <option value="SLA 磨砂半透明透光樹脂">SLA 磨砂半透明透光樹脂</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      成品大致尺寸（長 x 寬 x 高 mm）
                    </label>
                    <input
                      type="text"
                      placeholder="200 x 150 x 80 mm"
                      value={dimensions}
                      onChange={e => setDimensions(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                      期望交付日期 *
                    </label>
                    <input
                      type="date"
                      required
                      value={targetDate}
                      onChange={e => setTargetDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 font-mono"
                    />
                  </div>
                </div>

                {/* Detailed description text area */}
                <div className="mt-5">
                  <label className="block text-xs text-neutral-600 mb-1.5 font-medium">
                    詳細需求說明、公差要求或特殊備註
                  </label>
                  <textarea
                    rows={4}
                    placeholder="請描述模型的用途（如外觀展示、結構干涉測試、受力卡扣、耐溫環境等），或任何裝配上的特殊注意事項..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Submit Button Action */}
              <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-500">
                  送出後將即時建立正式工單並進入後台，我們將於 24 小時內回覆。
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>正式提交專案需求單</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
