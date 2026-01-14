export interface Course {
  code: string
  name: {
    en: string
    tr: string
    ar: string
  }
  credits: number
  ects: number
  description: {
    en: string
    tr: string
    ar: string
  }
  department: string
  semester: number
  prerequisite?: string
}

export const businessAdminCourses: Course[] = [
  {
    code: "ENG 101",
    name: { en: "English I", tr: "İngilizce I", ar: "الإنجليزية I" },
    credits: 3,
    ects: 4,
    description: {
      en: "The objective of the course is to help students learn how to do business in English.",
      tr: "Kurs, öğrencilere İngilizce iş yapmayı öğretmeyi amaçlamaktadır.",
      ar: "الهدف من الدورة هو مساعدة الطلاب على تعلم كيفية القيام بالأعمال باللغة الإنجليزية.",
    },
    department: "Business Administration",
    semester: 1,
  },
  {
    code: "MAT 171",
    name: {
      en: "Mathematics for Business and Economics I",
      tr: "İşletme ve Ekonomi için Matematik I",
      ar: "الرياضيات للأعمال والاقتصاد I",
    },
    credits: 3,
    ects: 6,
    description: {
      en: "Basic algebra, linear equations, quadratic equations, functions and graphs, inequalities, logarithms and exponential functions.",
      tr: "Temel cebir, doğrusal denklemler, ikinci dereceden denklemler, fonksiyonlar ve grafikler.",
      ar: "الجبر الأساسي، المعادلات الخطية، المعادلات التربيعية، الوظائف والرسوم البيانية.",
    },
    department: "Business Administration",
    semester: 1,
  },
  {
    code: "CIS 151",
    name: { en: "Introduction to Computers", tr: "Bilgisayara Giriş", ar: "مقدمة في الحاسوب" },
    credits: 3,
    ects: 6,
    description: {
      en: "Introduction to computer systems and Windows operating system practice.",
      tr: "Bilgisayar sistemlerine ve Windows işletim sistemine giriş.",
      ar: "مقدمة في أنظمة الحاسوب ونظام التشغيل Windows.",
    },
    department: "Business Administration",
    semester: 1,
  },
  {
    code: "MAN 101",
    name: { en: "Introduction to Business", tr: "İşletmeye Giriş", ar: "مقدمة في إدارة الأعمال" },
    credits: 3,
    ects: 6,
    description: {
      en: "Major topic areas within the field of business, and the challenges and opportunities for managers.",
      tr: "İşletme alanındaki ana konular ve yöneticiler için zorluklar ve fırsatlar.",
      ar: "المجالات الرئيسية في مجال الأعمال والتحديات والفرص للمديرين.",
    },
    department: "Business Administration",
    semester: 1,
  },
  {
    code: "MARK303",
    name: { en: "Principles of Marketing", tr: "Pazarlama İlkeleri", ar: "مبادئ التسويق" },
    credits: 3,
    ects: 6,
    description: {
      en: "Nature and application of marketing ideas and concepts, customer focus, marketing management process.",
      tr: "Pazarlama fikirleri ve kavramları, müşteri odaklılık, pazarlama yönetimi süreci.",
      ar: "طبيعة وتطبيق أفكار ومفاهيم التسويق، التركيز على العملاء، عملية إدارة التسويق.",
    },
    department: "Business Administration",
    semester: 5,
  },
  {
    code: "FIN 301",
    name: { en: "Business Finance", tr: "İşletme Finansmanı", ar: "تمويل الأعمال" },
    credits: 3,
    ects: 6,
    description: {
      en: "Financial statement analysis, time value of money, bond and stock valuation, investment techniques.",
      tr: "Mali tablo analizi, paranın zaman değeri, tahvil ve hisse senedi değerlemesi.",
      ar: "تحليل البيانات المالية، القيمة الزمنية للنقود، تقييم السندات والأسهم.",
    },
    department: "Business Administration",
    semester: 5,
  },
]

export const misCourses: Course[] = [
  {
    code: "MIS 301",
    name: { en: "Management Information System", tr: "Yönetim Bilgi Sistemi", ar: "نظام المعلومات الإدارية" },
    credits: 3,
    ects: 6,
    description: {
      en: "Overview of management functions in hardware, software, personnel. Management issues of planning, developing, installing systems.",
      tr: "Donanım, yazılım, personel yönetimi fonksiyonlarına genel bakış.",
      ar: "نظرة عامة على وظائف الإدارة في الأجهزة والبرمجيات والموظفين.",
    },
    department: "Management Information Systems",
    semester: 5,
  },
  {
    code: "MIS 401",
    name: { en: "E-Business Management", tr: "E-İşletme Yönetimi", ar: "إدارة الأعمال الإلكترونية" },
    credits: 3,
    ects: 6,
    description: {
      en: "Basic concepts of e-business domain, strategic management, e-business models, electronic marketing.",
      tr: "E-işletme alanının temel kavramları, stratejik yönetim, e-işletme modelleri.",
      ar: "المفاهيم الأساسية لمجال الأعمال الإلكترونية، الإدارة الاستراتيجية.",
    },
    department: "Management Information Systems",
    semester: 7,
  },
  {
    code: "MIS 421",
    name: { en: "System Analysis and Design", tr: "Sistem Analizi ve Tasarımı", ar: "تحليل وتصميم الأنظمة" },
    credits: 3,
    ects: 6,
    description: {
      en: "Systems development life cycle, analysis, design, development, implementation and evaluation.",
      tr: "Sistem geliştirme yaşam döngüsü, analiz, tasarım, geliştirme, uygulama.",
      ar: "دورة حياة تطوير الأنظمة، التحليل، التصميم، التطوير، التنفيذ.",
    },
    department: "Management Information Systems",
    semester: 7,
  },
]

export const allCourses = [...businessAdminCourses, ...misCourses]
