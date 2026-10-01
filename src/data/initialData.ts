import { Project, ServiceItem, TargetAudience, NewsArticle, FaqItem, SiteSettings, Inquiry } from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandName: '立方工坊',
  brandEnglishName: 'Cube Work / cubeworkshop',
  tagline: '快速、精準、客製化',
  philosophy: '讓創意快速成形，讓設計真正落地',
  shortIntro: '立方工坊不只是 3D 列印，而是從設計、建模到製造的一站式數位製造夥伴。我們協助企業、新創團隊、建築師、室內設計師及個人創作者降低開發成本、縮短時程，將數位構想具現為精準實體成果。',
  phone: '04-2662-0216',
  email: 'cubeworkshop0623@gmail.com',
  lineId: 'https://lin.ee/xiHBeXP',
  lineUrl: 'https://lin.ee/xiHBeXP',
  address: '臺中市梧棲區中華路二段167號',
  openingHours: '每週一至週五 08:00 - 19:00',
  portfolioSection: {
    title: '精準落地，從概念到實體的每一次實現',
    subtitle: '涵蓋建築比例模型、生醫手持原型、賽車風洞導風件至限定藝術公仔之真實產出。',
    displayMode: 'all',
    maxItems: 0,
    showCategoryFilter: true,
  },
  socialLinks: {
    instagram: 'https://instagram.com/cubework.design',
    facebook: 'https://facebook.com/cubeworkshop.tw',
    threads: 'https://threads.net/@cubework.design'
  },
  seo: {
    metaTitle: '立方工坊 Cube Work | 3D 列印整合應用、數位設計與客製化製造工作室',
    metaDescription: '立方工坊 Cube Work 提供 3D 列印、3D 建模、建築模型、逆向工程、客製化商品及小量生產。快速、精準、客製化，讓創意快速成形，讓設計真正落地。',
    keywords: '立方工坊, Cube Work, 3D列印, 3D建模, 建築模型, 逆向工程, 客製化商品, 少量生產, FDM, SLA, 光固化, 台中3D列印, 梧棲3D列印'
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'service-3d-print',
    title: '3D列印',
    englishTitle: 'On-Demand 3D Printing',
    shortDesc: '具備工業級 FDM 與高解析度 SLA 雙製程，支援各類工程塑膠與光固化樹脂，提供極速打樣與小量生產。',
    description: '針對不同產品需求，靈活配置最佳成型技術。從結構驗證、功能性原型測試到終端產品客製化小批量生產，兼顧強度、尺寸公差與表面精緻度。',
    bullets: [
      '產品快速打樣（Rapid Prototyping）：機構干涉驗證、功能性手板製作',
      '客製化精密零件：特規夾治具、裝配件、替換零組件',
      '外觀與展示模型：高質感參展原型、募資提案樣品',
      '小量彈性生產（Low-Volume Production）：5 - 500 件免開模客製製造',
      '精緻表面後加工：支撐手工拆除打磨、消光/亮光保護層、多色專業噴漆'
    ],
    subFeatures: ['快速打樣', '客製零件', '展示模型', '小量生產', '後加工處理'],
    materials: ['PLA 環保無毒塑料', 'PETG 耐衝擊韌性材料', 'SLA 高韌性光固化樹脂', '耐高溫/阻燃工程樹脂'],
    equipment: ['工業級高精度 FDM 列印機組', '4K/8K 超高解析 SLA 光固化機組', '超音波清洗與 UV 二次固化箱', '專業微型噴砂與水性噴漆烤箱'],
    iconName: 'Printer',
    active: true
  },
  {
    id: 'service-3d-modeling',
    title: '3D 建模與設計',
    englishTitle: '3D Modeling & CAD Engineering',
    shortDesc: '專精工業設計、CAD 參數化實體建模、逆向工程掃描處理與網格修復，協助將手繪草圖轉為可製造模型。',
    description: '由具備建築與工業設計背景的工程團隊執行，熟悉材料收縮率、脫模角、結構壁厚與公差裝配，確保每一份圖檔都能完美進入數位製造流程。',
    bullets: [
      'CAD 三維實體建模：SolidWorks / Rhino 參數化精密幾何建模',
      '產品外觀與機構設計：兼顧人體工學、組裝干涉與量產可行性',
      '逆向工程（Reverse Engineering）：3D 掃描點雲轉 CAD 實體曲面重構',
      'STL 網格修復與破面縫補：解決非流形、交錯薄殼與網格細分問題',
      'Grasshopper 參數化運算式造型：複雜曲面、輕量化多孔骨架結構設計'
    ],
    subFeatures: ['CAD 實體建模', '外觀結構設計', '逆向工程重構', '破面網格修復', '參數化演算法造型'],
    materials: ['STEP / IGES 實體格式', 'STL / OBJ 網格格式', '3DM / SKP / DWG 相容支援'],
    equipment: ['Rhino 8 + Grasshopper', 'AutoCAD / Revit BIM 整合環境', '高精度藍光 3D 逆向掃描工作站'],
    iconName: 'Box',
    active: true
  },
  {
    id: 'service-architectural',
    title: '建築模型製作',
    englishTitle: 'Architectural Physical Models',
    shortDesc: '為建築師事務所、室內設計師與競圖團隊提供精準的比例模型、量體推敲模型與細部空間構件。',
    description: '結合雷射切割、3D 列印複合工藝與壓克力手工細作，精準還原建築師的空間哲學。適用於概念提案、都市競圖、業主審查與展覽展示。',
    bullets: [
      '建築等比縮尺模型（1:50 / 1:100 / 1:200 / 1:500）：高精細外觀與開窗質感',
      '基地環境與地形等高線模型：精準結合地籍圖與 GIS 等高線高低層次',
      '量體推敲模型（Massing Models）：快速推敲日照、通風與天際線關係',
      '細部構造與室內剖面模型：1:20 至 1:5 局部構件、家具比例打樣',
      '複合材質整合：壓克力、胡桃木片、磨砂透光光固化樹脂搭配組合'
    ],
    subFeatures: ['比例展示模型', '地形基地模型', '量體推敲模型', '細部構造模型', '剖面透視模型'],
    materials: ['消光純白 PLA', '象牙白/冷灰 SLA 樹脂', '透光磨砂光固化材料', '雷切壓克力/椴木輔材'],
    equipment: ['大幅面 FDM 列印機 (可承造大尺寸基地)', '光固化高細節細部機組', '精密雷射切割輔助系統'],
    iconName: 'Building2',
    active: true
  },
  {
    id: 'service-custom-products',
    title: '客製化商品與文創',
    englishTitle: 'Custom Merchandise & Art Goods',
    shortDesc: '從原創公仔、企業專屬禮贈品、桌遊配件到生活擺飾，實現獨一無二的個人化與小量文創產出。',
    description: '突破傳統模具限制，即便 1 件也能客製化生產。協助創作者與企業打造深具紀念價值與工藝細膩度的實體物件。',
    bullets: [
      '原創公仔與角色模型：雕塑級細節呈現、表面細緻無層紋光固化製作',
      '文創生活用品與家飾擺飾：花器、燈具配件、幾何收納托盤',
      '企業客製化禮贈品與榮譽紀念碑：金屬質感塗裝、專屬雷雕刻字',
      '桌遊配件與兵棋模型：微縮模型、特規骰盅、沉浸式遊戲 Token',
      '個人化穿戴配件與生活小物：特規耳機支架、人體工學手托'
    ],
    subFeatures: ['原創公仔模型', '文創生活家飾', '企業專屬禮品', '桌遊微縮配件', '個人紀念禮物'],
    materials: ['高細緻光固化樹脂 (0.025mm 層高)', '金屬粉填充複合材料', '消光色系環保線材'],
    equipment: ['8K 超高精度光固化系統', '手繪與工業級噴筆組裝工坊', '防塵上色塗裝工作間'],
    iconName: 'Sparkles',
    active: true
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-0',
    title: '現代教堂與音樂演藝廳 1:100 剖面建築空間實體手板模型',
    category: '建築模型',
    clientType: '建築師事務所',
    description: '配合知名建築師事務所之空間實體評審與展覽提案，透過高精度 3D 列印複合製程打造多層次空間剖面實體模型。細膩呈現階梯式演藝禮堂、弧形聲學天花、立體圖書書牆格柵與梁柱結構系統，並結合手工分色點綴的紅色彩繪比例人物，精準呈現宏偉的垂直動線與空間視覺張力。',
    material: '高細緻消光白光固化樹脂 + 高剛性 PLA + 彩繪微縮比例人物',
    process: 'FDM / SLA 複合製程',
    turnaroundDays: '5 個工作天',
    completionDate: '2026-03-28',
    imageUrl: '/src/assets/images/church_section_model_1790836825075.jpg',
    featured: true,
    active: true,
    specs: {
      scale: '1:100 全剖面空間比例',
      precision: '±0.05mm 超細公差',
      finish: '手工精修去支撐、超細番號水砂紙拋光、消光純白均勻噴塗、微型比例人物手工精緻點色',
      software: 'Rhino 8 + Revit BIM 空間轉譯模型'
    }
  },
  {
    id: 'proj-1',
    title: '當代文化中心國際競圖 1:200 空間量體模型',
    category: '建築模型',
    clientType: '建築師事務所',
    description: '配合知名建築師事務所參與市立文化中心競圖，以消光純白 PLA 與微磨砂透光光固化樹脂呈現錯層懸挑與穿透中庭，展現純粹的空間幾何與光影對話。',
    material: '消光白 PLA / 高透光固化樹脂',
    process: 'FDM / SLA 複合製程',
    turnaroundDays: '4 個工作天',
    completionDate: '2026-03-15',
    imageUrl: '/src/assets/images/architectural_massing_model_1790766183460.jpg',
    featured: true,
    active: true,
    specs: {
      scale: '1:200 比例',
      precision: '±0.15mm',
      finish: '手工去支撐、超細番號水砂紙打磨、消光純白均勻噴塗',
      software: 'Rhino 8 + Grasshopper 參數化細分'
    }
  },
  {
    id: 'proj-2',
    title: '醫療級手持生理監測儀 外觀與結構驗證原型',
    category: '產品打樣',
    clientType: '企業客戶',
    description: '新創生醫團隊委託製作的首款手持監測設備。外殼採用高韌性剛性樹脂確保緊密封閉公差，側面防滑按鍵採用雙製程套印，順利通過人體工學與卡扣干涉測試。',
    material: 'SLA 耐衝擊工程樹脂 + 高韌性塑料',
    process: 'FDM / SLA 複合製程',
    turnaroundDays: '3 個工作天',
    completionDate: '2026-03-02',
    imageUrl: '/src/assets/images/product_rapid_prototyping_1790766172965.jpg',
    featured: true,
    active: true,
    specs: {
      scale: '1:1 全尺寸驗證手板',
      precision: '±0.08mm 緊密卡扣裝配',
      finish: '醫療器材灰霧面噴砂手感質感',
      software: 'SolidWorks 實體結構與機構干涉分析'
    }
  },
  {
    id: 'proj-3',
    title: '未來移動概念載具 主動進氣格柵風洞測試構件',
    category: '3D 列印',
    clientType: '企業客戶',
    description: '大專院校工學院方程式賽車隊空氣動力學部件，採用碳纖維增強 PETG 列印薄壁導風葉片，兼顧輕量化與高速氣流剛性，提供實車風洞壓力測試。',
    material: '碳纖增強 PETG-CF (耐候抗溫)',
    process: 'FDM 熔融沉積',
    turnaroundDays: '2 個工作天',
    completionDate: '2026-02-20',
    imageUrl: '/src/assets/images/hero_3d_architectural_model_1790766162791.jpg',
    featured: true,
    active: true,
    specs: {
      scale: '1:1 實體裝車構件',
      precision: '0.12mm 層高緻密充填',
      finish: '耐熱消光抗 UV 塗層',
      software: 'AutoCAD + Ansys CFD 幾何校準'
    }
  },
  {
    id: 'proj-4',
    title: '解構主義原創藝術雕塑「幾何之丘」限定小量生產',
    category: '客製化商品',
    clientType: '個人創作者',
    description: '獨立當代藝術家委託之限量 30 體藝術家藏品。透過 8K 高精度光固化樹脂完美保留雕塑家細微的刀痕與非對稱曲面，表面以冷灰礦物調色手工多層乾刷處理。',
    material: '8K 超高精細光固化光敏樹脂',
    process: 'SLA 光固化',
    turnaroundDays: '5 個工作天',
    completionDate: '2026-02-08',
    imageUrl: '/src/assets/images/custom_design_figurine_art_1790766194395.jpg',
    featured: true,
    active: true,
    specs: {
      scale: '高 240mm 限量藝廊藏品',
      precision: '0.025mm 極微層高',
      finish: '手工無縫接合、冷灰漸層消光烤漆',
      software: 'ZBrush 數位雕塑優化 + 網格空心打孔'
    }
  },
  {
    id: 'proj-5',
    title: '百年老屋古蹟窗花五金 3D 逆向掃描與等比重構',
    category: '逆向工程',
    clientType: '室內設計事務所',
    description: '歷史建築修復案中佚失之裝飾銅鎖座與鑄鐵花窗角碼。利用高精光學掃描現場殘件，於 CAD 中消除百年磨損公差，逆向重建標準工程圖檔並翻印鑄造用母模。',
    material: '灰階工程韌性樹脂 (高耐磨)',
    process: 'SLA 光固化',
    turnaroundDays: '3 個工作天',
    completionDate: '2026-01-18',
    imageUrl: '/src/assets/images/product_rapid_prototyping_1790766172965.jpg',
    featured: false,
    active: true,
    specs: {
      scale: '1:1 逆向翻模實品',
      precision: '掃描公差 0.03mm / 實體裝配公差 0.1mm',
      finish: '高精度清洗脫脂、二次完全紫外固化',
      software: 'Geomagic Design X + Rhino 逆向曲面重構'
    }
  },
  {
    id: 'proj-6',
    title: '新創智能手環磁吸充電底座 50 套彈性小批量交付',
    category: '展示模型',
    clientType: '企業客戶',
    description: '硬體新創產品量產前的試銷與募資展示階段，為客戶快速製作 50 組高質感消光黑磁吸充電座，內嵌配重鐵塊與強磁槽，為客戶省下數十萬模具費用與一個月開模等待。',
    material: '消光炭黑 PETG (高韌耐衝擊)',
    process: 'FDM 熔融沉積',
    turnaroundDays: '3 個工作天',
    completionDate: '2025-12-28',
    imageUrl: '/src/assets/images/hero_3d_architectural_model_1790766162791.jpg',
    featured: false,
    active: true,
    specs: {
      scale: '量產級試銷外殼 50 套',
      precision: '磁鐵公差 ±0.05mm 壓配卡合',
      finish: '表面微紋理抗指紋處理',
      software: 'Fusion 360 零件組裝與公差配對'
    }
  }
];

export const INITIAL_TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: 'students-schools',
    title: '學校與學生',
    subtitle: '建築系、工設系、多媒系畢業製作與專題設計',
    painPoints: [
      '學校設備排隊冗長、列印容易翻車失敗、時程壓力緊迫',
      '對模型公差、壁厚與切片支撐設定不熟悉，容易白花材料費',
      '畢業製作預算有限，需要透明可預期的價格'
    ],
    solutions: [
      '提供專屬學生審圖指導，提前揪出薄壁、破面與非流形錯誤',
      '快速排程優先處理畢設急件，支援 24-48 小時急件自取',
      '出示有效學生證享有畢設專屬折扣與團體合印優惠'
    ],
    recommendedServices: ['建築基地與量體模型', '工設外觀手板打樣', 'STL 破面網格修復'],
    icon: 'GraduationCap'
  },
  {
    id: 'architects',
    title: '建築師事務所',
    subtitle: '競圖提案、量體推敲、都市規劃與業主溝通',
    painPoints: [
      '手工割壓克力與珍珠板耗費建築師大量核心設計時間',
      '複雜曲面、流線造型與參數化立面難以用傳統工法手作還原',
      '競圖死線逼近，必須在數天內同步看到多種量體方案實體'
    ],
    solutions: [
      '直接承接 Rhino / SketchUp / Revit BIM 檔案，快速轉成製造圖',
      'FDM 大尺寸地形基座 + SLA 高解析度細部欄杆窗花複合組裝',
      '純粹極簡 architectural white 專業配色，凸顯空間光影與純度'
    ],
    recommendedServices: ['1:100 ~ 1:500 比例模型', '等高線地形模型', '量體推敲模型 (Massing)'],
    icon: 'Compass'
  },
  {
    id: 'interior-designers',
    title: '室內設計事務所',
    subtitle: '特規五金、異形裝飾構件、1:1 實體裝配確認',
    painPoints: [
      '市售現成五金規格不合，找工廠開模動輒數萬元且量少不接',
      '業主對 3D 渲染圖無法理解真實比例與觸感，溝通成本高',
      '需要小批量訂製專屬燈具遮光件、隱藏把手或特殊管線轉接頭'
    ],
    solutions: [
      '1 件起印，免模具費，1-3 天迅速交付 1:1 實體安裝試裝',
      '支援金屬色噴漆、消光黑、木質色調等多種室內風格表面處理',
      '提供工程級高強度 PETG 與高耐溫材料，兼具美觀與耐用度'
    ],
    recommendedServices: ['特規五金與構件', '展示模型打樣', '空間細部比例樣品'],
    icon: 'Home'
  },
  {
    id: 'creators-makers',
    title: '個人創作者與客製需求',
    subtitle: '原創公仔、文創周邊、桌遊配件、獨一無二紀念禮',
    painPoints: [
      '只有手繪平面圖或概念草圖，不知道如何轉為 3D 模型實體',
      '光固化樹脂表面清洗與 UV 固化工序複雜，在家操作有毒氣異味',
      '市面代工廠只接大單，對少樣客製化需求回覆冷淡'
    ],
    solutions: [
      '提供從 2D 手繪轉 3D 雕塑建模的一條龍全流程諮詢服務',
      '專業無塵噴塗與打磨後加工，交付達到商品販售級的細膩質感',
      '友善耐心溝通，陪伴創作者將熱情原型打造成具體的文創周邊'
    ],
    recommendedServices: ['原創角色公仔製作', '客製化紀念商品', '桌遊微縮模型與零件'],
    icon: 'Palette'
  }
];

export const SERVICE_PROCESS_STEPS = [
  {
    step: '01',
    title: '提交需求',
    desc: '透過線上表單或 LINE 提交 3D 檔案（STL / OBJ / 3DM / STEP 等）或設計需求草圖，說明用途、數量、預算與期望交付日期。',
    tag: '線上提交'
  },
  {
    step: '02',
    title: '圖檔／資料確認',
    desc: '工程師檢查模型幾何完整性，檢驗壁厚、破面、非流形幾何與組裝公差，確保具備實體製造條件。',
    tag: '工程檢核'
  },
  {
    step: '03',
    title: '可行性評估',
    desc: '依據強度要求、表面精度、耐溫性與預算，評估推薦最佳成型製程（FDM / SLA）與適配材料（PLA / PETG / TPU / 工程樹脂）。',
    tag: '製程推薦'
  },
  {
    step: '04',
    title: '報價與確認',
    desc: '提供透明清晰的報價單（包含成型費、材料費、後加工處理與運費），明定預計工作天數。',
    tag: '透明報價'
  },
  {
    step: '05',
    title: '客戶確認',
    desc: '雙方核對規格、切片擺放方向、分件組裝邏輯與交期，確認訂單後即刻建立生產工單。',
    tag: '工單成立'
  },
  {
    step: '06',
    title: '排程製作',
    desc: '專業切片軟體微調支撐結構與列印參數，最佳化擺放角度以最大程度降低層紋並強化弱向拉伸強度。',
    tag: '數位切片'
  },
  {
    step: '07',
    title: '3D 列印／建模',
    desc: '啟動專屬工業級機台精密成型。建模委託案在此階段進行 CAD 實體建構與多重視角渲染預覽確認。',
    tag: '精密成型'
  },
  {
    step: '08',
    title: '後加工處理',
    desc: '依方案進行超音波無水清洗、二次精密紫外線深度固化、手工去支撐修整、細水砂打磨與抗 UV 表面塗裝。',
    tag: '精緻表面'
  },
  {
    step: '09',
    title: '品質檢驗',
    desc: '使用高精度游標卡尺進行尺寸公差檢驗（±0.1mm 等級），確認關鍵裝配位、外觀無翹曲瑕疵。',
    tag: '嚴格品管'
  },
  {
    step: '10',
    title: '出貨／取件',
    desc: '多層防震氣泡袋包裝妥善封箱，支援黑貓宅急便隔日送達、超商取貨或台北工坊預約現場點件自取。',
    tag: '安全交付'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: '【材料指南】FDM 與 SLA 怎麼選？從結構強度、細節公差到預算的完整選型策略',
    summary: '深入解析熱熔沉積（FDM）與光固化（SLA）兩大主流技術的材料特性、表面紋理與適用場景，幫您精準控制專案預算。',
    category: '材料新知',
    date: '2026-03-22',
    readTime: '4 分鐘',
    content: '在 3D 列印的數位製造流程中，選擇正確的製程往往是專案成敗的關鍵第一步。FDM 適合具備抗衝擊、高韌性或大尺寸量體推敲的機構零件；而 SLA 則擅長於 0.025mm 極微細節與無層紋外觀展示件...',
    active: true
  },
  {
    id: 'news-2',
    title: '【案例分享】當代文化中心競圖模型幕後：如何以 3D 列印在 4 天內完成複雜曲面挑空',
    summary: '記錄立方工坊與建築師團隊合作，運用 Rhino + Grasshopper 參數化拆解，將複雜流線曲面精確落地的實戰歷程。',
    category: '作品案例',
    date: '2026-03-10',
    readTime: '6 分鐘',
    content: '在競圖死線前夕，建築師面臨最大挑戰是懸挑跨度與流動中庭的物理支撐。我們透過將建築量體拆分為 7 個關鍵模組，兼顧 FDM 穩定度與光固化樹脂通透性...',
    active: true
  },
  {
    id: 'news-3',
    title: '【技術專欄】什麼是 3D 逆向工程？從零件掃描到 CAD 參數實體重構的完整技術解析',
    summary: '老舊機件沒有設計圖？停產零件卡扣斷裂？透過 3D 藍光光學掃描與網格重構，讓損壞零件重獲新生。',
    category: '技術專欄',
    date: '2026-02-18',
    readTime: '5 分鐘',
    content: '逆向工程並非單純的 3D 掃描點雲複製，而是從高密度網格中萃取真實設計意圖（Design Intent），重新定義同心度、拔模角與幾何基準面...',
    active: true
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '請問需要準備什麼檔案才能進行 3D 列印或估價？',
    answer: '我們最推薦提供 .STL, .OBJ, .STEP (STP) 或 .3DM 檔案。如果您使用的是建築軟體（如 SketchUp .SKP, AutoCAD .DWG, Revit），我們亦可協助導出與修復；若您目前只有 2D 手繪草圖、照片或想法，工坊亦提供完整的 3D 建模與設計代工服務。',
    category: '檔案與格式',
    active: true
  },
  {
    id: 'faq-2',
    question: '3D 列印代工的計價方式是如何計算的？',
    answer: '報價主要根據：① 實體成型體積與所需耗材克數（包含必要支撐結構）、② 機台運作時長（與層高精度設定相關）、③ 選用材料種類（如一般 PLA、工程 PETG、彈性 TPU 或光固化樹脂）、④ 後加工需求（如手工去支撐打磨、二次固化、專業噴漆上色）。我們提供完全透明的明細報價單。',
    category: '報價與付款',
    active: true
  },
  {
    id: 'faq-3',
    question: '一般專案通常需要多久製作時間？有支援急件嗎？',
    answer: '一般小中型列印訂單在確認圖檔與款項後，通常於 2 至 3 個工作天內完成製作並寄出；大型建築模型或需多道打磨噴漆的樣品約 4 至 7 個工作天。若有競圖、發表會或參展急件需求，工坊提供 24-48 小時極速排程通道（酌收急件服務費），並支援台北工坊現場取件。',
    category: '交付與運送',
    active: true
  },
  {
    id: 'faq-4',
    question: 'FDM 與 SLA 兩種列印技術有什麼差異？我該選哪一種？',
    answer: 'FDM（熔融沉積）以線材熱熔層層堆疊，強度與韌性佳、耐候性好、成本平實，非常適合機構功能驗證、大尺寸建築量體、特規工具與日常耐用品；SLA（光固化樹脂）以紫外光固化液態樹脂，精度可達 0.025mm，表面極度光滑無明顯層紋，最適合公仔雕塑、極高精密卡扣、珠寶或微小零件。您可以告訴我們用途，由工坊工程師為您推薦最適製程。',
    category: '製程與材料',
    active: true
  },
  {
    id: 'faq-5',
    question: '如果我的 3D 模型圖檔有破損、破面或非流形，工坊能幫忙修復嗎？',
    answer: '可以的！這是立方工坊的一大專業特色。我們的工程師具備 CAD 實體與網格修復能力，能夠在進機台前使用專業軟體檢測並自動修復破面、縫補破洞、去除重疊網格、優化壁厚結構，確保列印成功率與裝配準確度。',
    category: '檔案與格式',
    active: true
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-2026-001',
    trackingNo: 'CW-20260330-881',
    customerName: '林晉瑋',
    companyOrOrg: '十方建築設計事務所',
    email: 'jw.lin@shifang-arch.com',
    phone: '0912-345-678',
    lineId: 'jw_lin_arch',
    projectType: '建築模型',
    quantity: 1,
    dimensions: '600mm x 450mm x 180mm',
    preferredMaterial: '消光純白 PLA + SLA 透光樹脂',
    preferredProcess: 'FDM / SLA 複合製程',
    needPostProcessing: ['手工去支撐打磨', '消光保護層'],
    targetDate: '2026-04-10',
    budgetRange: '$12,000 - $18,000',
    description: '此為新北市某文化園區概念競圖 1:300 基地及主建築量體模型。建築主體有雙曲面懸挑設計，希望以透光樹脂展現天窗桁架。附件為 Rhino 8 (.3dm) 完整檔案。',
    files: [
      { id: 'f-1', name: 'Cultural_Center_Base_1_300.3dm', size: 48234000, type: 'application/octet-stream' },
      { id: 'f-2', name: 'Site_Contour_Plan_DWG.dwg', size: 12560000, type: 'application/acad' }
    ],
    status: '評估中',
    quoteAmount: 14500,
    adminNotes: '已由工程師完成 Rhino 破面檢測，曲面厚度 1.8mm 符合成型標準，已排入排程評估。',
    createdAt: '2026-03-29T14:20:00Z',
    updatedAt: '2026-03-30T09:15:00Z'
  },
  {
    id: 'inq-2026-002',
    trackingNo: 'CW-20260328-402',
    customerName: '陳雅萱',
    companyOrOrg: '極光生醫智能股份有限公司',
    email: 'yh.chen@aurora-med.io',
    phone: '0988-765-432',
    lineId: 'aurora_chen',
    projectType: '產品打樣',
    quantity: 3,
    dimensions: '145mm x 62mm x 28mm',
    preferredMaterial: 'SLA 耐衝擊工程樹脂',
    preferredProcess: 'SLA 光固化',
    needPostProcessing: ['手工去支撐打磨', '精密噴漆 (醫療灰 Pantone Cool Gray 2C)'],
    targetDate: '2026-04-05',
    budgetRange: '$6,000 - $10,000',
    description: '手持檢測儀外殼上下蓋手板 3 套，需要精準卡扣組裝與螺柱預埋，表面需噴塗接近量產質感的霧面醫療灰。已上傳 STEP 檔案。',
    files: [
      { id: 'f-3', name: 'Aurora_Handheld_RevC_Step.stp', size: 24100000, type: 'application/step' }
    ],
    status: '製作中',
    quoteAmount: 8200,
    adminNotes: '客戶已付 50% 訂金，正於 8K 光固化機台進行批次成型中。預計 4/3 進行表面噴漆。',
    createdAt: '2026-03-28T10:11:00Z',
    updatedAt: '2026-03-29T16:00:00Z'
  },
  {
    id: 'inq-2026-003',
    trackingNo: 'CW-20260326-119',
    customerName: '張家銘',
    companyOrOrg: '實踐大學工業產品設計學系',
    email: 'jiaming.chang98@gmail.com',
    phone: '0933-210-987',
    lineId: 'jiaming_c',
    projectType: '3D 列印',
    quantity: 2,
    dimensions: '210mm x 180mm x 95mm',
    preferredMaterial: 'PETG 耐韌塑料',
    preferredProcess: 'FDM 熔融沉積',
    needPostProcessing: ['一般去支撐'],
    targetDate: '2026-04-02',
    budgetRange: '$2,000 - $3,500',
    description: '畢設智慧家電底座骨架測試手板，需要檢視馬達固定孔位是否干涉。預算偏緊，一般去支撐即可，學生證已附上。',
    files: [
      { id: 'f-4', name: 'Graduation_Project_Base_v2.stl', size: 15300000, type: 'application/sla' }
    ],
    status: '已完成',
    quoteAmount: 2300,
    adminNotes: '套用學生畢設 88 折優惠，已於 3/29 完成列印與公差檢驗，通知自取完成。',
    createdAt: '2026-03-26T09:30:00Z',
    updatedAt: '2026-03-29T17:40:00Z'
  }
];
