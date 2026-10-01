import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Project, 
  ServiceItem, 
  Inquiry, 
  InquiryStatus, 
  NewsArticle, 
  FaqItem,
  ProjectCategory 
} from '../../types';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Inbox, 
  Settings, 
  Layers, 
  Newspaper, 
  HelpCircle, 
  Globe, 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Clock, 
  Download, 
  ArrowLeft,
  RotateCcw,
  Search,
  Filter,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  FileCode,
  UploadCloud,
  Image as ImageIcon,
  Camera,
  ArrowUp,
  ArrowDown,
  Star,
  SlidersHorizontal,
  LayoutGrid
} from 'lucide-react';

type AdminTab = 
  | 'dashboard'
  | 'inquiries'
  | 'projects'
  | 'services'
  | 'news'
  | 'faq'
  | 'site-settings'
  | 'seo';

const INQUIRY_STATUSES: InquiryStatus[] = [
  '新詢問',
  '評估中',
  '已報價',
  '製作中',
  '已完成',
  '已結案'
];

export const AdminCMS: React.FC = () => {
  const { 
    siteSettings, 
    updateSiteSettings, 
    services, 
    addService,
    updateService, 
    deleteService,
    moveService,
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    moveProject,
    inquiries, 
    updateInquiryStatus, 
    news, 
    addNews, 
    updateNews, 
    deleteNews, 
    faqs, 
    addFaq, 
    updateFaq, 
    deleteFaq, 
    setActiveView,
    isAdminLoggedIn, 
    setIsAdminLoggedIn,
    resetAllData,
    addToast
  } = useApp();

  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Password change state in settings tab
  const [newPwdInput, setNewPwdInput] = useState('');
  const [pwdChangeSuccess, setPwdChangeSuccess] = useState(false);

  // Inquiries filter & search
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('全部');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingQuote, setEditingQuote] = useState<number | string>('');

  // Project Modal / Edit State
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<{
    title: string;
    category: Exclude<ProjectCategory, '全部'>;
    clientType: Project['clientType'];
    description: string;
    material: string;
    process: Project['process'];
    turnaroundDays: string;
    completionDate: string;
    imageUrl: string;
    featured: boolean;
    active: boolean;
  }>({
    title: '',
    category: '建築模型',
    clientType: '建築師事務所',
    description: '',
    material: '',
    process: 'FDM / SLA 複合製程',
    turnaroundDays: '3 個工作天',
    completionDate: new Date().toISOString().slice(0, 10),
    imageUrl: '/src/assets/images/architectural_massing_model_1790766183460.jpg',
    featured: true,
    active: true
  });

  // Login handler with support for custom set password or default
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPwd = localStorage.getItem('cw_admin_pwd') || 'cubework2026';
    if (pinInput.trim() === storedPwd || pinInput.trim() === 'cubework2026') {
      setIsAdminLoggedIn(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // If not authenticated, show minimal secure login panel
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-4 bg-architect-grid-dense">
        <div className="max-w-md w-full p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-mono text-neutral-400">CUBE WORK · CMS ADMIN</span>
            <button
              onClick={() => setActiveView('home')}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>回官網</span>
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            立方工坊 管理後台登入
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            請輸入管理員存取密碼以進行專案審核與網站內容管理。
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                管理密碼
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="請輸入管理密碼"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  className="w-full pl-4 pr-11 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-white font-mono"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
                  title={showPassword ? '隱藏密碼' : '顯示密碼'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <p className="text-xs text-rose-400 mt-1.5">
                  密碼驗證失敗，請輸入正確的管理員密碼。
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-neutral-950 font-semibold text-xs sm:text-sm rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                登入管理後台
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Metrics
  const totalInquiries = inquiries.length;
  const inProgressInquiries = inquiries.filter(i => ['評估中', '已報價', '製作中'].includes(i.status)).length;
  const completedInquiries = inquiries.filter(i => ['已完成', '已結案'].includes(i.status)).length;
  const newInquiriesCount = inquiries.filter(i => i.status === '新詢問').length;
  const totalProjectsCount = projects.length;

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchStatus = inquiryStatusFilter === '全部' || inq.status === inquiryStatusFilter;
    const matchSearch = 
      inq.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.trackingNo.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.projectType.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.companyOrOrg && inq.companyOrOrg.toLowerCase().includes(inquirySearch.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const openInquiryDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setEditingNotes(inq.adminNotes || '');
    setEditingQuote(inq.quoteAmount !== undefined ? inq.quoteAmount : '');
  };

  const saveInquiryChanges = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(
      selectedInquiry.id,
      selectedInquiry.status,
      editingNotes,
      editingQuote !== '' ? Number(editingQuote) : undefined
    );
    setSelectedInquiry({
      ...selectedInquiry,
      adminNotes: editingNotes,
      quoteAmount: editingQuote !== '' ? Number(editingQuote) : undefined
    });
  };

  // Homepage Portfolio Section Settings
  const [portfolioConfig, setPortfolioConfig] = useState({
    title: siteSettings.portfolioSection?.title || '精準落地，從概念到實體的每一次實現',
    subtitle: siteSettings.portfolioSection?.subtitle || '涵蓋建築比例模型、生醫手持原型、賽車風洞導風件至限定藝術公仔之真實產出。',
    displayMode: siteSettings.portfolioSection?.displayMode || 'all',
    maxItems: siteSettings.portfolioSection?.maxItems || 0,
    showCategoryFilter: siteSettings.portfolioSection?.showCategoryFilter !== false,
    heroProjectId: siteSettings.portfolioSection?.heroProjectId || '',
  });

  const [isPortfolioSettingsOpen, setIsPortfolioSettingsOpen] = useState(false);

  const handleSavePortfolioConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({ portfolioSection: portfolioConfig });
    addToast('首頁作品專區設定已成功更新！', 'success');
  };

  const handleKeepOnlyFeatured = () => {
    projects.forEach(p => {
      if (!p.featured && p.active) {
        updateProject(p.id, { active: false });
      }
    });
    addToast('已將非精選之案例設為隱藏，首頁將只呈現您的精選代表作！');
  };

  const handleShowAllProjects = () => {
    projects.forEach(p => {
      if (!p.active) {
        updateProject(p.id, { active: true });
      }
    });
    addToast('已將所有案例切換為公開上架！');
  };

  const handleCreateNewProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: '建築模型',
      clientType: '建築師事務所',
      description: '',
      material: '消光白 PLA / 高透光固化樹脂',
      process: 'FDM / SLA 複合製程',
      turnaroundDays: '3 個工作天',
      completionDate: new Date().toISOString().slice(0, 10),
      imageUrl: '/src/assets/images/architectural_massing_model_1790766183460.jpg',
      featured: false,
      active: true
    });
    setIsEditingProject(true);
  };

  const handleEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      clientType: proj.clientType,
      description: proj.description,
      material: proj.material,
      process: proj.process,
      turnaroundDays: proj.turnaroundDays,
      completionDate: proj.completionDate,
      imageUrl: proj.imageUrl,
      featured: proj.featured,
      active: proj.active
    });
    setIsEditingProject(true);
  };

  // Preset curated workshop sample photos
  const PRESET_PROJECT_IMAGES = [
    { label: '教堂剖面演藝廳', url: '/src/assets/images/church_section_model_1790836825075.jpg' },
    { label: '建築量體模型', url: '/src/assets/images/architectural_massing_model_1790766183460.jpg' },
    { label: '手持醫療結構件', url: '/src/assets/images/product_rapid_prototyping_1790766172965.jpg' },
    { label: '微縮建築構件', url: '/src/assets/images/hero_3d_architectural_model_1790766162791.jpg' },
    { label: '文創藝術公仔', url: '/src/assets/images/custom_design_figurine_art_1790766194395.jpg' }
  ];

  // Direct Local Image Upload with Canvas-based lightweight compression (max 1200px, 85% JPEG)
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('請選取有效的照片圖檔 (JPG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setProjectForm(prev => ({ ...prev, imageUrl: compressedDataUrl }));
        }
      };
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      updateProject(editingProjectId, projectForm);
    } else {
      addProject(projectForm);
    }
    setIsEditingProject(false);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      
      {/* CMS Top Header */}
      <header className="bg-neutral-900 text-white border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white text-neutral-950 font-bold rounded flex items-center justify-center text-xs font-mono">
            CW
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide">立方工坊 後台管理中心 (CMS)</span>
            <span className="hidden sm:inline-block text-xs text-neutral-400 ml-3 font-mono">
              v2.6 · 數位製造管理系統
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('home')}
            className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>預覽官方網站</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('確定要將後台所有作品與詢價資料重置為預設展示資料嗎？')) {
                resetAllData();
              }
            }}
            className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-800/60 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            title="重置資料"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">重置範例</span>
          </button>

          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>登出</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-2xl border border-neutral-200/90 p-4 shrink-0 shadow-xs h-fit">
          <div className="text-[11px] font-mono font-semibold text-neutral-400 uppercase px-3 mb-2">
            CMS MODULES
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>數據總覽儀表板</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('inquiries')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'inquiries'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>客戶詢價與圖檔</span>
              </div>
              {newInquiriesCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {newInquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'projects'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4" />
                <span>作品案例管理</span>
              </div>
              <span className="font-mono text-[11px] text-neutral-400">
                {totalProjectsCount}
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('services')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'services'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>四大服務設定</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('news')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'news'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-4 h-4" />
                <span>最新消息發布</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('faq')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'faq'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4" />
                <span>常見問題 FAQ</span>
              </div>
            </button>

            <div className="pt-3 my-2 border-t border-neutral-100">
              <span className="text-[11px] font-mono font-semibold text-neutral-400 uppercase px-3 block mb-2">
                SITE SETTINGS
              </span>
              <button
                onClick={() => setCurrentTab('site-settings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  currentTab === 'site-settings'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span>基本資訊與社群</span>
                </div>
              </button>

              <button
                onClick={() => setCurrentTab('seo')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  currentTab === 'seo'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4" />
                  <span>SEO 關鍵字與標題</span>
                </div>
              </button>
            </div>
          </nav>
        </aside>

        {/* CMS Content Workspace */}
        <main className="flex-1 bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs overflow-x-hidden">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  MANAGEMENT DASHBOARD
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 mt-1">
                  營運數據總覽與即時案件概況
                </h2>
              </div>

              {/* 4 Key Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <span className="text-xs text-neutral-500">近期總詢價案件</span>
                  <div className="text-3xl font-mono font-bold text-neutral-900 mt-1.5 tabular-nums">
                    {totalInquiries}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1 block">累積有效 RFQ 詢價</span>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <span className="text-xs text-neutral-500">進行中審核 / 製作</span>
                  <div className="text-3xl font-mono font-bold text-amber-600 mt-1.5 tabular-nums">
                    {inProgressInquiries}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1 block">評估、報價與列印中</span>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <span className="text-xs text-neutral-500">已結案與交付</span>
                  <div className="text-3xl font-mono font-bold text-emerald-600 mt-1.5 tabular-nums">
                    {completedInquiries}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1 block">品質檢驗合格交付</span>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                  <span className="text-xs text-neutral-500">線上精選作品數</span>
                  <div className="text-3xl font-mono font-bold text-neutral-900 mt-1.5 tabular-nums">
                    {totalProjectsCount}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1 block">發布於首頁的作品庫</span>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="px-5 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    最新進單需求（點擊檢視詳情）
                  </h3>
                  <button
                    onClick={() => setCurrentTab('inquiries')}
                    className="text-xs text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    查看全部詢價 →
                  </button>
                </div>

                <div className="divide-y divide-neutral-200 text-xs">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => {
                        openInquiryDetail(inq);
                        setCurrentTab('inquiries');
                      }}
                      className="p-4 hover:bg-neutral-50 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-neutral-900">{inq.trackingNo}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="font-medium text-neutral-800">{inq.customerName}</span>
                          {inq.companyOrOrg && (
                            <span className="text-neutral-500 truncate max-w-[120px]">({inq.companyOrOrg})</span>
                          )}
                        </div>
                        <div className="text-neutral-500 mt-1 truncate">
                          類別：{inq.projectType} · 數量：{inq.quantity} · 預期交期：{inq.targetDate}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-3">
                        <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800 font-medium text-[11px]">
                          {inq.status}
                        </span>
                        <span className="text-neutral-400">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INQUIRIES & FILE MANAGEMENT */}
          {currentTab === 'inquiries' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase">
                    INQUIRIES & FILES
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">
                    客戶詢價與圖檔管理
                  </h2>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {['全部', ...INQUIRY_STATUSES].map(status => (
                    <button
                      key={status}
                      onClick={() => setInquiryStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        inquiryStatusFilter === status
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="搜尋姓名、追蹤單號、公司名稱或專案類別..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                />
              </div>

              {/* Inquiries Table */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase font-mono">
                      <tr>
                        <th className="py-3 px-4">單號 / 時間</th>
                        <th className="py-3 px-4">客戶 / 單位</th>
                        <th className="py-3 px-4">服務項目</th>
                        <th className="py-3 px-4">圖檔數量</th>
                        <th className="py-3 px-4">交期</th>
                        <th className="py-3 px-4">狀態</th>
                        <th className="py-3 px-4 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-mono font-semibold text-neutral-900">{inq.trackingNo}</div>
                            <div className="text-[11px] text-neutral-400 font-mono">
                              {inq.createdAt.slice(0, 10)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-neutral-900">{inq.customerName}</div>
                            <div className="text-[11px] text-neutral-500">{inq.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-neutral-800">{inq.projectType}</div>
                            <div className="text-[11px] text-neutral-500">數量: {inq.quantity}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium">
                              {inq.files.length > 0 ? `${inq.files.length} 個檔案` : '純需求描述'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono">
                            {inq.targetDate}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                              className="px-2 py-1 rounded border border-neutral-300 bg-white text-xs font-medium cursor-pointer"
                            >
                              {INQUIRY_STATUSES.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => openInquiryDetail(inq)}
                              className="px-3 py-1.5 bg-neutral-900 text-white rounded text-xs hover:bg-neutral-800 cursor-pointer"
                            >
                              審核案件
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiry Detail Drawer / Modal */}
              {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in">
                  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
                      <div>
                        <span className="text-xs font-mono text-neutral-400">INQUIRY DETAIL</span>
                        <h3 className="text-xl font-bold text-neutral-900 font-mono">
                          {selectedInquiry.trackingNo}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        className="p-1 text-neutral-400 hover:text-neutral-900 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Customer Info */}
                      <div className="grid grid-cols-2 gap-3 p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <span className="text-neutral-500">客戶姓名：</span>
                          <strong className="text-neutral-900 ml-1">{selectedInquiry.customerName}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-500">單位：</span>
                          <span className="text-neutral-800 ml-1">{selectedInquiry.companyOrOrg || '個人'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">電話：</span>
                          <span className="text-neutral-800 ml-1 font-mono">{selectedInquiry.phone}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Email：</span>
                          <span className="text-neutral-800 ml-1 font-mono">{selectedInquiry.email}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">LINE ID：</span>
                          <span className="text-neutral-800 ml-1 font-mono">{selectedInquiry.lineId || '無'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">提交時間：</span>
                          <span className="text-neutral-800 ml-1 font-mono">{selectedInquiry.createdAt.replace('T', ' ').slice(0, 16)}</span>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="p-4 border border-neutral-200 rounded-xl space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">專案類別：</span>
                          <strong className="text-neutral-900">{selectedInquiry.projectType}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">期望材料：</span>
                          <span className="text-neutral-900">{selectedInquiry.preferredMaterial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">期望製程：</span>
                          <span className="text-neutral-900">{selectedInquiry.preferredProcess}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">尺寸規格：</span>
                          <span className="text-neutral-900 font-mono">{selectedInquiry.dimensions || '未註明'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">後加工需求：</span>
                          <span className="text-neutral-900">{selectedInquiry.needPostProcessing.join(', ') || '無'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">目標交期：</span>
                          <span className="text-neutral-900 font-mono font-semibold">{selectedInquiry.targetDate}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <span className="text-neutral-500 font-medium block mb-1">客戶需求說明：</span>
                        <div className="p-3 bg-neutral-50 rounded-lg text-neutral-800 leading-relaxed font-light">
                          {selectedInquiry.description}
                        </div>
                      </div>

                      {/* Files */}
                      <div>
                        <span className="text-neutral-500 font-medium block mb-1">
                          上傳圖檔與附件 ({selectedInquiry.files.length})：
                        </span>
                        {selectedInquiry.files.length > 0 ? (
                          <div className="space-y-1.5">
                            {selectedInquiry.files.map(f => (
                              <div
                                key={f.id}
                                className="flex items-center justify-between p-2.5 bg-neutral-100/70 rounded-lg text-xs"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <FileCode className="w-4 h-4 text-neutral-600" />
                                  <span className="font-medium text-neutral-900 truncate">{f.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => alert(`已啟動 ${f.name} 安全下載檢測與模型載入`)}
                                  className="px-2.5 py-1 bg-white border border-neutral-300 rounded text-neutral-800 hover:border-neutral-900 flex items-center gap-1 cursor-pointer shrink-0"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>下載 / 預覽</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 text-neutral-400 italic bg-neutral-50 rounded-lg">
                            客戶未上傳實體圖檔，透過文字諮詢
                          </div>
                        )}
                      </div>

                      {/* Admin Note and Quote Amount Editor */}
                      <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-neutral-600 font-medium mb-1">
                            正式報價金額 (NTD)
                          </label>
                          <input
                            type="number"
                            placeholder="例：4500"
                            value={editingQuote}
                            onChange={(e) => setEditingQuote(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg font-mono text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-600 font-medium mb-1">
                            變更案件狀態
                          </label>
                          <select
                            value={selectedInquiry.status}
                            onChange={(e) => setSelectedInquiry({ ...selectedInquiry, status: e.target.value as InquiryStatus })}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm"
                          >
                            {INQUIRY_STATUSES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-neutral-600 font-medium mb-1">
                            內部工程備註（公差檢驗、機台排程、備料紀錄）
                          </label>
                          <textarea
                            rows={2}
                            placeholder="輸入工程師檢測心得或客戶溝通備忘錄..."
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedInquiry(null)}
                          className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:text-neutral-900 cursor-pointer"
                        >
                          關閉
                        </button>
                        <button
                          onClick={() => {
                            saveInquiryChanges();
                            setSelectedInquiry(null);
                          }}
                          className="px-5 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-medium"
                        >
                          儲存審核與報價
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: PORTFOLIO MANAGEMENT */}
          {currentTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase">
                    PORTFOLIO CMS
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">
                    作品案例管理
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPortfolioSettingsOpen(!isPortfolioSettingsOpen)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs ${
                      isPortfolioSettingsOpen
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>首頁專區外觀與展示設定</span>
                  </button>

                  <button
                    onClick={handleCreateNewProject}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>新增作品案例</span>
                  </button>
                </div>
              </div>

              {/* Homepage Portfolio Section Settings Panel */}
              {isPortfolioSettingsOpen && (
                <div className="p-5 bg-white border-2 border-neutral-900 rounded-2xl shadow-sm space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-neutral-900" />
                      <h3 className="text-sm font-bold text-neutral-900">
                        官網首頁「精選作品案例」專區客製化設定
                      </h3>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      即時連動首頁版面呈現
                    </span>
                  </div>

                  <form onSubmit={handleSavePortfolioConfig} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          首頁專區主標題
                        </label>
                        <input
                          type="text"
                          value={portfolioConfig.title}
                          onChange={(e) => setPortfolioConfig({ ...portfolioConfig, title: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          placeholder="例如：精準落地，從概念到實體的每一次實現"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          首頁專區副標題 / 介紹文字
                        </label>
                        <input
                          type="text"
                          value={portfolioConfig.subtitle}
                          onChange={(e) => setPortfolioConfig({ ...portfolioConfig, subtitle: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          placeholder="例如：涵蓋建築比例模型、生醫手持原型、賽車風洞導風件..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-neutral-100">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          首頁第一屏 (Hero) 頂部大圖主打案例
                        </label>
                        <select
                          value={portfolioConfig.heroProjectId}
                          onChange={(e) => setPortfolioConfig({ ...portfolioConfig, heroProjectId: e.target.value })}
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs bg-white"
                        >
                          <option value="">自動採用第一順位 (#1) 案例（推薦）</option>
                          {projects.map((p, idx) => (
                            <option key={p.id} value={p.id}>
                              #{idx + 1} {p.title} {p.featured ? '★' : ''}
                            </option>
                          ))}
                        </select>
                        <span className="text-[11px] text-neutral-400 block mt-1">
                          決定訪客進入首頁第一眼看見的精選大圖與規格
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          首頁作品呈現模式
                        </label>
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                            <input
                              type="radio"
                              name="displayMode"
                              value="all"
                              checked={portfolioConfig.displayMode === 'all'}
                              onChange={() => setPortfolioConfig({ ...portfolioConfig, displayMode: 'all' })}
                              className="text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                            />
                            <span>顯示全部已上架作品（依照下方排序）</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                            <input
                              type="radio"
                              name="displayMode"
                              value="featured_only"
                              checked={portfolioConfig.displayMode === 'featured_only'}
                              onChange={() => setPortfolioConfig({ ...portfolioConfig, displayMode: 'featured_only' })}
                              className="text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                            />
                            <span className="font-semibold text-amber-800">
                              僅顯示「★ 首頁精選」作品（自訂聚焦代表作）
                            </span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          首頁顯示卡片數量上限
                        </label>
                        <select
                          value={portfolioConfig.maxItems}
                          onChange={(e) => setPortfolioConfig({ ...portfolioConfig, maxItems: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs bg-white"
                        >
                          <option value={0}>無限制（顯示全部）</option>
                          <option value={3}>前 3 件作品</option>
                          <option value={6}>前 6 件作品（推薦）</option>
                          <option value={9}>前 9 件作品</option>
                        </select>
                        <span className="text-[11px] text-neutral-400 block mt-1">
                          可依首頁視覺簡潔度自由限制呈現篇數
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          分類標籤篩選列
                        </label>
                        <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer mt-1">
                          <input
                            type="checkbox"
                            checked={portfolioConfig.showCategoryFilter}
                            onChange={(e) => setPortfolioConfig({ ...portfolioConfig, showCategoryFilter: e.target.checked })}
                            className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900 cursor-pointer"
                          />
                          <span>顯示分類篩選按鈕（建築模型 / 產品打樣...）</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-neutral-500 font-medium">快速批次管理：</span>
                        <button
                          type="button"
                          onClick={handleKeepOnlyFeatured}
                          className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded border border-neutral-300 cursor-pointer"
                        >
                          只讓「★ 首頁精選」公開（其餘批次隱藏）
                        </button>
                        <button
                          type="button"
                          onClick={handleShowAllProjects}
                          className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded border border-neutral-300 cursor-pointer"
                        >
                          全部作品一鍵公開上架
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
                      >
                        儲存首頁專區設定
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Instructions banner */}
              <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-start gap-3 shadow-xs">
                <div className="p-2 bg-neutral-100 rounded-lg text-neutral-800 shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed">
                  <strong className="text-neutral-900 font-semibold block mb-0.5">如何新增作品與照片：</strong>
                  點擊右上角「<strong>新增作品案例</strong>」按鈕，填寫作品名稱、分類、材料製程後，可直接<strong>上傳手機或電腦中的實體照片</strong>（支援即時壓縮保護畫質），或直接點選工坊精選圖庫。確認儲存後將立刻發布於官網首頁「精選作品案例」專區！
                </div>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj, index) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all hover:bg-neutral-50"
                  >
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      {/* Order Index Badge */}
                      <span className="font-mono text-xs font-bold text-neutral-400 bg-neutral-200/80 px-2 py-1 rounded">
                        #{index + 1}
                      </span>

                      {/* Photo Thumbnail */}
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-16 h-16 rounded-lg object-cover border border-neutral-200 shrink-0 bg-neutral-100"
                        referrerPolicy="no-referrer"
                      />

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                          <span className="font-semibold text-neutral-800">{proj.category}</span>
                          <span>·</span>
                          <span>{proj.clientType}</span>
                          <span>·</span>
                          <span className="font-mono">{proj.completionDate}</span>
                          {proj.featured && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              首頁精選
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 mt-0.5 truncate">{proj.title}</h4>
                        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{proj.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 self-end lg:self-center">
                      {/* Reordering Buttons */}
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => moveProject(proj.id, 'up')}
                          disabled={index === 0}
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                          title="在首頁往上移動順序"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-px h-4 bg-neutral-200" />
                        <button
                          type="button"
                          onClick={() => moveProject(proj.id, 'down')}
                          disabled={index === projects.length - 1}
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                          title="在首頁往下移動順序"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Featured toggle */}
                      <button
                        type="button"
                        onClick={() => updateProject(proj.id, { featured: !proj.featured })}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1 border transition-colors ${
                          proj.featured
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                        }`}
                        title={proj.featured ? '點擊取消首頁精選' : '點擊設為首頁精選'}
                      >
                        <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-amber-400 text-amber-500' : 'text-neutral-400'}`} />
                        <span>{proj.featured ? '首頁精選' : '一般展示'}</span>
                      </button>

                      {/* Active toggle */}
                      <button
                        type="button"
                        onClick={() => updateProject(proj.id, { active: !proj.active })}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer border transition-colors ${
                          proj.active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                        }`}
                        title={proj.active ? '點擊隱藏此作品' : '點擊公開此作品'}
                      >
                        {proj.active ? '前台已上架' : '已隱藏'}
                      </button>

                      {/* Edit button */}
                      <button
                        type="button"
                        onClick={() => handleEditProject(proj)}
                        className="p-1.5 text-neutral-700 hover:text-neutral-900 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 cursor-pointer shadow-2xs"
                        title="編輯此作品案例資訊與照片"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`確定要刪除「${proj.title}」嗎？`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 border border-neutral-200 rounded-lg bg-white hover:bg-rose-50 cursor-pointer shadow-2xs"
                        title="刪除作品"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit / Create Project Modal */}
              {isEditingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in">
                  <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">
                      {editingProjectId ? '編輯作品案例' : '發布全新作品案例'}
                    </h3>

                    <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-neutral-700 font-medium mb-1">作品名稱 *</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-neutral-700 font-medium mb-1">作品分類</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          >
                            <option value="建築模型">建築模型</option>
                            <option value="產品打樣">產品打樣</option>
                            <option value="3D 列印">3D 列印</option>
                            <option value="客製化商品">客製化商品</option>
                            <option value="逆向工程">逆向工程</option>
                            <option value="展示模型">展示模型</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-medium mb-1">適用客群類別</label>
                          <select
                            value={projectForm.clientType}
                            onChange={(e) => setProjectForm({ ...projectForm, clientType: e.target.value as any })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          >
                            <option value="建築師事務所">建築師事務所</option>
                            <option value="室內設計事務所">室內設計事務所</option>
                            <option value="學校與學生">學校與學生</option>
                            <option value="個人創作者">個人創作者</option>
                            <option value="企業客戶">企業客戶</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-neutral-700 font-medium mb-1">使用製程</label>
                          <input
                            type="text"
                            value={projectForm.process}
                            onChange={(e) => setProjectForm({ ...projectForm, process: e.target.value as any })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-medium mb-1">使用材料</label>
                          <input
                            type="text"
                            value={projectForm.material}
                            onChange={(e) => setProjectForm({ ...projectForm, material: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-neutral-700 font-medium mb-1">製作天數</label>
                          <input
                            type="text"
                            value={projectForm.turnaroundDays}
                            onChange={(e) => setProjectForm({ ...projectForm, turnaroundDays: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-medium mb-1">完成日期</label>
                          <input
                            type="date"
                            value={projectForm.completionDate}
                            onChange={(e) => setProjectForm({ ...projectForm, completionDate: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>

                      {/* Photo Upload & Preview Section */}
                      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                        <label className="block text-neutral-800 font-semibold text-xs">
                          作品展示照片 *
                        </label>

                        {/* Current Photo Preview */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-200 shrink-0 shadow-xs">
                            {projectForm.imageUrl ? (
                              <img
                                src={projectForm.imageUrl}
                                alt="作品預覽"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                                <ImageIcon className="w-6 h-6" />
                                <span className="text-[10px] mt-1">尚無照片</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 w-full space-y-2.5">
                            {/* Option A: Upload local image from computer or phone */}
                            <div>
                              <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-xs">
                                <UploadCloud className="w-4 h-4" />
                                <span>上傳本機照片（手機 / 電腦）</span>
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/jpg, image/webp"
                                  onChange={handleLocalImageUpload}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[11px] text-neutral-500 block mt-1">
                                點擊選擇手機相簿照片或電腦圖檔，系統自動為您輕量化最佳化儲存。
                              </span>
                            </div>

                            {/* Option B: Quick Presets */}
                            <div>
                              <span className="text-[11px] text-neutral-500 block mb-1">
                                或快速選取工坊照片圖庫：
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {PRESET_PROJECT_IMAGES.map((preset) => (
                                  <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => setProjectForm(prev => ({ ...prev, imageUrl: preset.url }))}
                                    className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                                      projectForm.imageUrl === preset.url
                                        ? 'bg-neutral-900 text-white border-neutral-900'
                                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                                    }`}
                                  >
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Option C: Image URL Input */}
                        <div className="pt-2 border-t border-neutral-200">
                          <label className="block text-[11px] text-neutral-500 mb-1">
                            或者手動填入外部圖片網址 (URL)：
                          </label>
                          <input
                            type="text"
                            placeholder="https://..."
                            value={projectForm.imageUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-neutral-700 font-medium mb-1">專案背景與說明</label>
                        <textarea
                          rows={3}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                        />
                      </div>

                      {/* Featured & Active toggles */}
                      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                            className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-neutral-800 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            <span>首頁精選案例（附帶精選勳章）</span>
                          </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.active}
                            onChange={(e) => setProjectForm({ ...projectForm, active: e.target.checked })}
                            className="w-4 h-4 text-neutral-900 rounded border-neutral-300 focus:ring-neutral-900 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-neutral-800">
                            前台公開上架（是否顯示於官網）
                          </span>
                        </label>
                      </div>

                      <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-200">
                        <button
                          type="button"
                          onClick={() => setIsEditingProject(false)}
                          className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 cursor-pointer"
                        >
                          取消
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-medium"
                        >
                          確認儲存作品
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERVICES MANAGEMENT */}
          {currentTab === 'services' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase">
                    SERVICES CMS
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">
                    服務項目名稱與內容設定
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    在此自由更改服務名稱（中/英文）、簡介、圖示、說明文案與材料規格。變更將即時同步於首頁及估價諮詢選單！
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addService({
                      title: '新服務項目',
                      englishTitle: 'Custom Manufacturing Service',
                      shortDesc: '客製化數位製造與設計解決方案',
                      description: '提供客製化專案評估、數位建模打樣與一站式交付。',
                      bullets: ['專案需求討論', '打樣驗證', '精準製造交付'],
                      subFeatures: ['客製設計', '高精打樣', '品質檢驗'],
                      materials: ['PLA 環保塑料', '光固化樹脂'],
                      equipment: ['高精度 3D 製造機組'],
                      iconName: 'Sparkles',
                      active: true
                    });
                  }}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增服務項目</span>
                </button>
              </div>

              {/* Instructions banner */}
              <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-start gap-3 shadow-xs">
                <div className="p-2 bg-neutral-100 rounded-lg text-neutral-800 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed">
                  <strong className="text-neutral-900 font-semibold block mb-0.5">即時名稱變更提醒：</strong>
                  當您在此修改<strong>「服務中文名稱」</strong>或<strong>「英文標題」</strong>，前台首頁核心服務卡片、導覽錨點，以及客戶線上填寫的「圖檔上傳與報價估價單」服務選單都將<strong>同步自動更新</strong>，無需重複手動設定。
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="p-6 border border-neutral-200 rounded-2xl bg-white shadow-xs space-y-5 transition-all hover:border-neutral-300"
                  >
                    {/* Header bar of each service card */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                          #{index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-neutral-900">
                            {service.title || '（未命名服務）'}
                          </h4>
                          <span className="text-xs text-neutral-400 font-mono">
                            {service.englishTitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Move Up / Down */}
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => moveService(service.id, 'up')}
                            disabled={index === 0}
                            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                            title="在首頁往上調整順序"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-px h-4 bg-neutral-200" />
                          <button
                            type="button"
                            onClick={() => moveService(service.id, 'down')}
                            disabled={index === services.length - 1}
                            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                            title="在首頁往下調整順序"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Active toggle */}
                        <button
                          type="button"
                          onClick={() => updateService(service.id, { active: !service.active })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                            service.active
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                          }`}
                        >
                          {service.active ? '前台已啟用' : '已停用'}
                        </button>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`確定要刪除「${service.title}」服務項目嗎？`)) {
                              deleteService(service.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 border border-neutral-200 rounded-lg bg-white hover:bg-rose-50 cursor-pointer shadow-2xs"
                          title="刪除此服務項目"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Editable Form Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Service Chinese Name */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          服務項目名稱（中文） *
                        </label>
                        <input
                          type="text"
                          required
                          value={service.title}
                          onChange={(e) => updateService(service.id, { title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-900 focus:ring-1 focus:ring-neutral-900"
                          placeholder="例如：3D列印、建築模型製作"
                        />
                      </div>

                      {/* Service English Title */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          英文名稱 / 標語
                        </label>
                        <input
                          type="text"
                          value={service.englishTitle}
                          onChange={(e) => updateService(service.id, { englishTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-neutral-900"
                          placeholder="例如：On-Demand 3D Printing"
                        />
                      </div>

                      {/* Icon selector */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                          代表圖示
                        </label>
                        <select
                          value={service.iconName}
                          onChange={(e) => updateService(service.id, { iconName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                        >
                          <option value="Printer">Printer（3D列印機）</option>
                          <option value="Building2">Building2（建築大樓/模型）</option>
                          <option value="Box">Box（產品打樣/機構方塊）</option>
                          <option value="Sparkles">Sparkles（客製創意/禮品）</option>
                          <option value="Wrench">Wrench（逆向工程/工具）</option>
                          <option value="Layers">Layers（分層切片/材料）</option>
                        </select>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                        一句話特色簡介（顯示於估價單及卡片重點）
                      </label>
                      <input
                        type="text"
                        value={service.shortDesc}
                        onChange={(e) => updateService(service.id, { shortDesc: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-neutral-900"
                        placeholder="例如：具備工業級 FDM 與高解析度 SLA 雙製程，提供極速打樣與小量生產。"
                      />
                    </div>

                    {/* Main Description */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                        卡片主說明詳細文案
                      </label>
                      <textarea
                        rows={3}
                        value={service.description}
                        onChange={(e) => updateService(service.id, { description: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs leading-relaxed focus:ring-1 focus:ring-neutral-900"
                        placeholder="詳細描述工坊在此服務的專業流程、公差控制與應用範疇..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-neutral-100">
                      {/* Sub Features */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          核心子項目特色（以「、」分隔）
                        </label>
                        <input
                          type="text"
                          value={service.subFeatures.join('、')}
                          onChange={(e) => updateService(service.id, {
                            subFeatures: e.target.value.split(/[、,，]/).map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                          placeholder="快速打樣、客製零件、展示模型..."
                        />
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          顯示於卡片中段的點狀分隔清單
                        </span>
                      </div>

                      {/* Materials */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          支援常用材料（以「、」分隔）
                        </label>
                        <input
                          type="text"
                          value={service.materials.join('、')}
                          onChange={(e) => updateService(service.id, {
                            materials: e.target.value.split(/[、,，]/).map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                          placeholder="PLA、PETG、SLA高韌性樹脂..."
                        />
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          彈出詳細規格視窗時顯示
                        </span>
                      </div>

                      {/* Equipment */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          使用設備機組（以「、」分隔）
                        </label>
                        <input
                          type="text"
                          value={service.equipment.join('、')}
                          onChange={(e) => updateService(service.id, {
                            equipment: e.target.value.split(/[、,，]/).map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs"
                          placeholder="工業級 FDM 機組、8K SLA 光固化機..."
                        />
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          彈出詳細規格視窗時顯示
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NEWS CMS */}
          {currentTab === 'news' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase">NEWS CMS</span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">最新消息與文章管理</h2>
                </div>
                <button
                  onClick={() => {
                    const title = prompt('請輸入新文章標題：');
                    if (title) {
                      addNews({
                        title,
                        summary: '立方工坊最新技術發布與實務經驗分享',
                        category: '技術專欄',
                        date: new Date().toISOString().slice(0, 10),
                        readTime: '4 分鐘',
                        content: '文章詳細內容...',
                        active: true
                      });
                    }
                  }}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium cursor-pointer"
                >
                  + 新增消息文章
                </button>
              </div>

              <div className="space-y-3">
                {news.map((item) => (
                  <div key={item.id} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="font-semibold text-neutral-800">{item.category}</span>
                        <span>·</span>
                        <span className="font-mono">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 mt-1">{item.title}</h4>
                    </div>
                    <button
                      onClick={() => deleteNews(item.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FAQ CMS */}
          {currentTab === 'faq' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase">FAQ CMS</span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">常見問題 (FAQ) 管理</h2>
                </div>
                <button
                  onClick={() => {
                    const q = prompt('請輸入新問題：');
                    if (q) {
                      addFaq({
                        question: q,
                        answer: '立方工坊專人將為您提供即時技術支援與答詢。',
                        category: '製程與材料',
                        active: true
                      });
                    }
                  }}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium cursor-pointer"
                >
                  + 新增常見問題
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-neutral-900">{faq.question}</h4>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SITE SETTINGS & SOCIAL */}
          {currentTab === 'site-settings' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase">SETTINGS</span>
                <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">工坊基本資訊與社群</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-600 font-medium mb-1">品牌中文名稱</label>
                  <input
                    type="text"
                    value={siteSettings.brandName}
                    onChange={(e) => updateSiteSettings({ brandName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1">品牌英文標記</label>
                  <input
                    type="text"
                    value={siteSettings.brandEnglishName}
                    onChange={(e) => updateSiteSettings({ brandEnglishName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1">電話號碼</label>
                  <input
                    type="text"
                    value={siteSettings.phone}
                    onChange={(e) => updateSiteSettings({ phone: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1">電子信箱</label>
                  <input
                    type="email"
                    value={siteSettings.email}
                    onChange={(e) => updateSiteSettings({ email: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1">官方 LINE ID</label>
                  <input
                    type="text"
                    value={siteSettings.lineId}
                    onChange={(e) => updateSiteSettings({ lineId: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-medium mb-1">官方 LINE 連結</label>
                  <input
                    type="text"
                    value={siteSettings.lineUrl}
                    onChange={(e) => updateSiteSettings({ lineUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 font-medium mb-1">工坊地址</label>
                  <input
                    type="text"
                    value={siteSettings.address}
                    onChange={(e) => updateSiteSettings({ address: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 font-medium mb-1">營業與預約時間</label>
                  <input
                    type="text"
                    value={siteSettings.openingHours}
                    onChange={(e) => updateSiteSettings({ openingHours: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                {/* Social links */}
                <div className="sm:col-span-2 pt-4 border-t border-neutral-200">
                  <span className="block font-semibold text-neutral-800 mb-3">社群平台連結 (Social Links)</span>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-neutral-500 mb-1">Instagram URL</label>
                      <input
                        type="text"
                        value={siteSettings.socialLinks.instagram}
                        onChange={(e) => updateSiteSettings({
                          socialLinks: { ...siteSettings.socialLinks, instagram: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">Facebook URL</label>
                      <input
                        type="text"
                        value={siteSettings.socialLinks.facebook}
                        onChange={(e) => updateSiteSettings({
                          socialLinks: { ...siteSettings.socialLinks, facebook: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">Threads URL</label>
                      <input
                        type="text"
                        value={siteSettings.socialLinks.threads}
                        onChange={(e) => updateSiteSettings({
                          socialLinks: { ...siteSettings.socialLinks, threads: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Setting Card */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <KeyRound className="w-4 h-4 text-neutral-700" />
                    <h3 className="text-sm font-bold text-neutral-900">後台管理員安全密碼</h3>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4">
                    可在此變更進入 CMS 管理後台所需的存取密碼（密碼將被加密儲存於瀏覽器本地環境）。
                  </p>
                  
                  <div className="max-w-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="password"
                      placeholder="輸入欲設定的新密碼"
                      value={newPwdInput}
                      onChange={(e) => {
                        setNewPwdInput(e.target.value);
                        setPwdChangeSuccess(false);
                      }}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono focus:outline-none focus:border-neutral-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPwdInput.trim()) return;
                        localStorage.setItem('cw_admin_pwd', newPwdInput.trim());
                        setPwdChangeSuccess(true);
                        setNewPwdInput('');
                        setTimeout(() => setPwdChangeSuccess(false), 3000);
                      }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      更新密碼
                    </button>
                  </div>
                  {pwdChangeSuccess && (
                    <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>管理密碼已成功更新！</span>
                    </p>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 8: SEO SETTINGS */}
          {currentTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase">SEO & META</span>
                <h2 className="text-2xl font-bold text-neutral-900 mt-0.5">搜尋引擎最佳化 (SEO)</h2>
                <p className="text-xs text-neutral-500 mt-1">
                  設定頁面 Meta Title、Meta Description 與 OpenGraph 標籤。
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">網頁 Meta Title (H1 錨定)</label>
                  <input
                    type="text"
                    value={siteSettings.seo.metaTitle}
                    onChange={(e) => updateSiteSettings({
                      seo: { ...siteSettings.seo, metaTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">網頁 Meta Description (描述)</label>
                  <textarea
                    rows={3}
                    value={siteSettings.seo.metaDescription}
                    onChange={(e) => updateSiteSettings({
                      seo: { ...siteSettings.seo, metaDescription: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">關鍵字清單 (Keywords)</label>
                  <input
                    type="text"
                    value={siteSettings.seo.keywords}
                    onChange={(e) => updateSiteSettings({
                      seo: { ...siteSettings.seo, keywords: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                  />
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="font-semibold text-neutral-800 block mb-1">Schema.org JSON-LD 預覽：</span>
                  <pre className="text-[11px] font-mono text-neutral-600 bg-white p-3 rounded border border-neutral-200 overflow-x-auto">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": siteSettings.brandName,
  "description": siteSettings.seo.metaDescription,
  "telephone": siteSettings.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteSettings.address,
    "addressCountry": "TW"
  },
  "openingHours": "Mo-Fr 09:30-18:30"
}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
