import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, 
  ServiceItem, 
  Inquiry, 
  NewsArticle, 
  FaqItem, 
  SiteSettings, 
  InquiryStatus 
} from '../types';
import { 
  INITIAL_SITE_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_NEWS, 
  INITIAL_FAQS, 
  INITIAL_INQUIRIES 
} from '../data/initialData';

export type AppView = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'portfolio' 
  | 'upload' 
  | 'contact' 
  | 'admin';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  moveService: (id: string, direction: 'up' | 'down') => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  moveProject: (id: string, direction: 'up' | 'down') => void;
  inquiries: Inquiry[];
  addInquiry: (inquiryData: Omit<Inquiry, 'id' | 'trackingNo' | 'status' | 'createdAt' | 'updatedAt'>) => string;
  updateInquiryStatus: (id: string, status: InquiryStatus, notes?: string, quote?: number) => void;
  news: NewsArticle[];
  addNews: (newsItem: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, updated: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;
  resetAllData: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'cw_site_settings_v2',
  SERVICES: 'cw_services_v2',
  PROJECTS: 'cw_projects_v2',
  INQUIRIES: 'cw_inquiries_v1',
  NEWS: 'cw_news_v1',
  FAQS: 'cw_faqs_v1',
  ADMIN_AUTH: 'cw_admin_auth_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Site settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!saved) return INITIAL_SITE_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.shortIntro) {
        parsed.shortIntro = parsed.shortIntro.replace(/3D\s*列印代工/g, '3D 列印').replace(/代工/g, '');
      }
      return { ...INITIAL_SITE_SETTINGS, ...parsed };
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const list: ServiceItem[] = saved ? JSON.parse(saved) : INITIAL_SERVICES;
    return list.map(s => ({
      ...s,
      materials: s.materials ? s.materials.filter(m => !m.toUpperCase().includes('TPU')) : []
    }));
  });

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    const list: Project[] = saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    return list.map(p => ({
      ...p,
      material: p.material ? p.material.replace(/FDM\s*TPU\s*95A/gi, '高韌性塑料').replace(/TPU\s*95A/gi, '彈性軟料').replace(/TPU/gi, '') : p.material
    }));
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // News
  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  // FAQs
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  // Navigation state
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Toast helper
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const updateSiteSettings = (newPartial: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newPartial }));
    addToast('網站資訊已更新成功');
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `service-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
    addToast('已成功新增服務項目');
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
    addToast('服務項目內容已儲存');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    addToast('服務項目已刪除', 'info');
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    setServices((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const newServices = [...prev];
      const [moved] = newServices.splice(index, 1);
      newServices.splice(targetIndex, 0, moved);
      return newServices;
    });
    addToast(direction === 'up' ? '服務項目順序已上移' : '服務項目順序已下移');
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newProject, ...prev]);
    addToast('新作品已成功發布');
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    addToast('作品資料已成功更新');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addToast('作品已刪除', 'info');
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    setProjects((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const newProjects = [...prev];
      const [moved] = newProjects.splice(index, 1);
      newProjects.splice(targetIndex, 0, moved);
      return newProjects;
    });
    addToast(direction === 'up' ? '作品排序已往上移' : '作品排序已往下移');
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'trackingNo' | 'status' | 'createdAt' | 'updatedAt'>): string => {
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(100 + Math.random() * 900);
    const trackingNo = `CW-${dateStr}-${rand}`;
    const newId = `inq-${Date.now()}`;

    const newInquiry: Inquiry = {
      ...inquiryData,
      id: newId,
      trackingNo,
      status: '新詢問',
      createdAt: timestamp.toISOString(),
      updatedAt: timestamp.toISOString(),
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    addToast(`需求已成功送出！案件追蹤單號：${trackingNo}`, 'success');
    return trackingNo;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus, notes?: string, quote?: number) => {
    const now = new Date().toISOString();
    setInquiries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            ...(notes !== undefined ? { adminNotes: notes } : {}),
            ...(quote !== undefined ? { quoteAmount: quote } : {}),
            updatedAt: now,
          };
        }
        return item;
      })
    );
    addToast(`詢價案件狀態已更新為「${status}」`);
  };

  const addNews = (newsData: Omit<NewsArticle, 'id'>) => {
    const item: NewsArticle = {
      ...newsData,
      id: `news-${Date.now()}`,
    };
    setNews((prev) => [item, ...prev]);
    addToast('消息文章已發布');
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
    addToast('文章內容已更新');
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    addToast('文章已刪除', 'info');
  };

  const addFaq = (faqData: Omit<FaqItem, 'id'>) => {
    const item: FaqItem = {
      ...faqData,
      id: `faq-${Date.now()}`,
    };
    setFaqs((prev) => [...prev, item]);
    addToast('常見問題已新增');
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
    addToast('常見問題已更新');
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    addToast('常見問題已移除', 'info');
  };

  const resetAllData = () => {
    setSiteSettings(INITIAL_SITE_SETTINGS);
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setInquiries(INITIAL_INQUIRIES);
    setNews(INITIAL_NEWS);
    setFaqs(INITIAL_FAQS);
    localStorage.clear();
    addToast('所有資料已重置為預設範例', 'info');
  };

  return (
    <AppContext.Provider
      value={{
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
        addInquiry,
        updateInquiryStatus,
        news,
        addNews,
        updateNews,
        deleteNews,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        activeView,
        setActiveView,
        selectedProjectId,
        setSelectedProjectId,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        resetAllData,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
