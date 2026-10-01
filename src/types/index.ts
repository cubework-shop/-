export type ProjectCategory = 
  | '全部'
  | '建築模型'
  | '產品打樣'
  | '3D 列印'
  | '客製化商品'
  | '逆向工程'
  | '展示模型';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, '全部'>;
  clientType: '學校與學生' | '建築師事務所' | '室內設計事務所' | '個人創作者' | '企業客戶';
  description: string;
  material: string;
  process: 'FDM 熔融沉積' | 'SLA 光固化' | 'FDM / SLA 複合製程';
  turnaroundDays: string;
  completionDate: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  specs?: {
    scale?: string;
    precision?: string;
    finish?: string;
    software?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  englishTitle: string;
  shortDesc: string;
  description: string;
  bullets: string[];
  subFeatures: string[];
  materials: string[];
  equipment: string[];
  iconName: string;
  active: boolean;
}

export type InquiryStatus = 
  | '新詢問'
  | '評估中'
  | '已報價'
  | '製作中'
  | '已完成'
  | '已結案';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
  previewUrl?: string;
}

export interface Inquiry {
  id: string;
  trackingNo: string;
  customerName: string;
  companyOrOrg?: string;
  email: string;
  phone: string;
  lineId?: string;
  projectType: string;
  quantity: number;
  dimensions?: string;
  preferredMaterial: string;
  preferredProcess: string;
  needPostProcessing: string[];
  targetDate: string;
  budgetRange?: string;
  description: string;
  files: UploadedFileItem[];
  status: InquiryStatus;
  quoteAmount?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  subtitle: string;
  painPoints: string[];
  solutions: string[];
  recommendedServices: string[];
  icon: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: '技術專欄' | '作品案例' | '工坊公告' | '材料新知';
  date: string;
  readTime: string;
  content: string;
  active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: '檔案與格式' | '報價與付款' | '製程與材料' | '交付與運送';
  active: boolean;
}

export interface PortfolioSectionConfig {
  title: string;
  subtitle: string;
  displayMode: 'all' | 'featured_only';
  maxItems: number; // 0 = all
  showCategoryFilter: boolean;
  heroProjectId?: string;
}

export interface SiteSettings {
  brandName: string;
  brandEnglishName: string;
  tagline: string;
  philosophy: string;
  shortIntro: string;
  phone: string;
  email: string;
  lineId: string;
  lineUrl: string;
  address: string;
  openingHours: string;
  portfolioSection?: PortfolioSectionConfig;
  socialLinks: {
    instagram: string;
    facebook: string;
    threads: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}
