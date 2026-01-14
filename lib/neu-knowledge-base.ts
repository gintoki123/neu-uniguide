export interface NEUKnowledgeBase {
  academic: {
    faculties: FacultyInfo[]
    programs: ProgramInfo[]
    courses: CourseCategory[]
    rules: AcademicRule[]
  }
  campus: {
    buildings: BuildingInfo[]
    facilities: FacilityInfo[]
    services: ServiceInfo[]
  }
  transportation: TransportationInfo
  studentLife: StudentLifeInfo
}

export interface FacultyInfo {
  name: { en: string; tr: string; ar: string }
  departments: string[]
  dean: string
  contact: string
  building: string
}

export interface ProgramInfo {
  name: { en: string; tr: string; ar: string }
  faculty: string
  duration: string
  credits: number
  degree: string
  language: string
}

export interface CourseCategory {
  category: string
  count: number
  examples: string[]
}

export interface AcademicRule {
  title: { en: string; tr: string; ar: string }
  description: { en: string; tr: string; ar: string }
}

export interface BuildingInfo {
  name: { en: string; tr: string; ar: string }
  type: string
  departments: string[]
  floors: number
  capacity?: number
}

export interface FacilityInfo {
  name: { en: string; tr: string; ar: string }
  type: string
  hours: string
  services: string[]
  location: string
}

export interface ServiceInfo {
  name: { en: string; tr: string; ar: string }
  description: { en: string; tr: string; ar: string }
  contact: string
  location: string
  hours: string
}

export interface TransportationInfo {
  shuttleBus: {
    routes: string[]
    hours: { en: string; tr: string; ar: string }
    frequency: string
    contact: string
  }
  parking: {
    locations: string[]
    capacity: number
    studentParking: boolean
  }
}

export interface StudentLifeInfo {
  clubs: string[]
  sports: string[]
  events: string[]
  dormitories: {
    available: boolean
    capacity: number
    contact: string
  }
}

// Comprehensive NEU Knowledge Base
export const neuKnowledgeBase: NEUKnowledgeBase = {
  academic: {
    faculties: [
      {
        name: {
          en: "Faculty of Engineering",
          tr: "Mühendislik Fakültesi",
          ar: "كلية الهندسة",
        },
        departments: [
          "Computer Engineering",
          "Software Engineering",
          "Electrical Engineering",
          "Mechanical Engineering",
          "Civil Engineering",
          "Industrial Engineering",
        ],
        dean: "Prof. Dr. Ahmet Yılmaz",
        contact: "+90 392 223 6400",
        building: "Engineering Block A, B, C",
      },
      {
        name: {
          en: "Faculty of Economics and Administrative Sciences",
          tr: "İktisat ve İdari Bilimler Fakültesi",
          ar: "كلية الاقتصاد والعلوم الإدارية",
        },
        departments: [
          "Business Administration",
          "Economics",
          "International Relations",
          "Management Information Systems",
          "Banking and Finance",
        ],
        dean: "Prof. Dr. Mehmet Öztürk",
        contact: "+90 392 223 6700",
        building: "Faculty of Economics Building",
      },
      {
        name: {
          en: "Faculty of Medicine",
          tr: "Tıp Fakültesi",
          ar: "كلية الطب",
        },
        departments: [
          "Internal Medicine",
          "Surgery",
          "Pediatrics",
          "Radiology",
          "Anesthesiology",
          "Emergency Medicine",
        ],
        dean: "Prof. Dr. Ayşe Demir",
        contact: "+90 392 223 6900",
        building: "Hospital Building",
      },
      {
        name: {
          en: "Faculty of Law",
          tr: "Hukuk Fakültesi",
          ar: "كلية الحقوق",
        },
        departments: ["Public Law", "Private Law", "International Law"],
        dean: "Prof. Dr. Ali Kaya",
        contact: "+90 392 223 6800",
        building: "Faculty of Law Building",
      },
      {
        name: {
          en: "Faculty of Arts and Sciences",
          tr: "Fen-Edebiyat Fakültesi",
          ar: "كلية العلوم والآداب",
        },
        departments: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "English Literature",
          "Turkish Language and Literature",
          "Psychology",
          "Sociology",
        ],
        dean: "Prof. Dr. Zeynep Arslan",
        contact: "+90 392 223 7000",
        building: "Arts & Sciences Building",
      },
    ],
    programs: [
      {
        name: { en: "Software Engineering", tr: "Yazılım Mühendisliği", ar: "هندسة البرمجيات" },
        faculty: "Engineering",
        duration: "4 years (8 semesters)",
        credits: 240,
        degree: "B.Sc.",
        language: "English",
      },
      {
        name: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
        faculty: "Engineering",
        duration: "4 years (8 semesters)",
        credits: 240,
        degree: "B.Sc.",
        language: "English",
      },
      {
        name: {
          en: "Management Information Systems",
          tr: "Yönetim Bilişim Sistemleri",
          ar: "نظم المعلومات الإدارية",
        },
        faculty: "Economics",
        duration: "4 years (8 semesters)",
        credits: 240,
        degree: "B.Sc.",
        language: "English",
      },
      {
        name: { en: "Business Administration", tr: "İşletme Yönetimi", ar: "إدارة الأعمال" },
        faculty: "Economics",
        duration: "4 years (8 semesters)",
        credits: 240,
        degree: "B.A.",
        language: "English/Turkish",
      },
    ],
    courses: [
      {
        category: "Software Engineering Core Courses",
        count: 35,
        examples: [
          "Programming and Problem Solving",
          "Data Structures and Algorithms",
          "Software Engineering",
          "Database Management Systems",
          "Operating Systems",
          "Web Development",
        ],
      },
      {
        category: "Mathematics and Science",
        count: 12,
        examples: [
          "Calculus I & II",
          "Linear Algebra",
          "Discrete Mathematics",
          "Probability and Statistics",
          "General Physics I & II",
        ],
      },
      {
        category: "Management and Economics",
        count: 8,
        examples: ["Management for Engineers", "Economics for Engineers", "Engineering Ethics"],
      },
    ],
    rules: [
      {
        title: { en: "Minimum GPA", tr: "Minimum Not Ortalaması", ar: "المعدل التراكمي الأدنى" },
        description: {
          en: "Students must maintain a minimum GPA of 2.0 to graduate and remain in good academic standing.",
          tr: "Öğrenciler mezun olmak ve iyi akademik durumda kalmak için minimum 2.0 GPA tutmalıdır.",
          ar: "يجب على الطلاب الحفاظ على معدل تراكمي لا يقل عن 2.0 للتخرج والبقاء في وضع أكاديمي جيد.",
        },
      },
      {
        title: { en: "Course Load Limits", tr: "Ders Yükü Limitleri", ar: "حدود الحمل الدراسي" },
        description: {
          en: "Full-time students take 12-18 credits per semester. Over 18 credits requires dean approval.",
          tr: "Tam zamanlı öğrenciler dönem başına 12-18 kredi alır. 18 kredinin üzeri dekan onayı gerektirir.",
          ar: "يأخذ الطلاب بدوام كامل 12-18 ساعة معتمدة في الفصل. أكثر من 18 ساعة يتطلب موافقة العميد.",
        },
      },
      {
        title: { en: "Summer Practice", tr: "Yaz Stajı", ar: "التدريب الصيفي" },
        description: {
          en: "Engineering students must complete two 40-day summer practice periods in industry.",
          tr: "Mühendislik öğrencileri endüstride iki adet 40 günlük yaz stajı tamamlamalıdır.",
          ar: "يجب على طلاب الهندسة إكمال فترتي تدريب صيفي مدة كل منها 40 يومًا في الصناعة.",
        },
      },
      {
        title: { en: "Graduation Project", tr: "Bitirme Projesi", ar: "مشروع التخرج" },
        description: {
          en: "Final year students complete a two-semester graduation project under faculty supervision.",
          tr: "Son sınıf öğrencileri fakülte gözetiminde iki dönemlik bitirme projesi tamamlar.",
          ar: "يكمل طلاب السنة الأخيرة مشروع تخرج لمدة فصلين دراسيين تحت إشراف هيئة التدريس.",
        },
      },
      {
        title: { en: "Attendance Policy", tr: "Devam Politikası", ar: "سياسة الحضور" },
        description: {
          en: "Students must attend at least 70% of classes. Missing 30% or more results in automatic failure.",
          tr: "Öğrenciler derslerin en az %70'ine katılmalıdır. %30 veya daha fazla devamsızlık otomatik kalmaya yol açar.",
          ar: "يجب على الطلاب حضور 70٪ على الأقل من الفصول. التغيب عن 30٪ أو أكثر يؤدي إلى الرسوب التلقائي.",
        },
      },
    ],
  },
  campus: {
    buildings: [
      {
        name: { en: "Central Library", tr: "Merkez Kütüphane", ar: "المكتبة المركزية" },
        type: "Library",
        departments: ["Study halls", "Digital resources", "Archives"],
        floors: 5,
        capacity: 2000,
      },
      {
        name: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
        type: "Academic",
        departments: ["Computer Engineering", "Software Engineering"],
        floors: 4,
        capacity: 1500,
      },
      {
        name: { en: "Student Center", tr: "Öğrenci Merkezi", ar: "مركز الطلاب" },
        type: "Social",
        departments: ["Student clubs", "Cafeteria", "Recreation areas"],
        floors: 3,
        capacity: 1000,
      },
    ],
    facilities: [
      {
        name: { en: "Main Cafeteria", tr: "Ana Yemekhane", ar: "المقصف الرئيسي" },
        type: "Dining",
        hours: "Monday-Friday 08:00-20:00, Saturday 09:00-18:00",
        services: ["Breakfast", "Lunch", "Dinner", "Snacks"],
        location: "Central Campus",
      },
      {
        name: { en: "Sports Center", tr: "Spor Merkezi", ar: "المركز الرياضي" },
        type: "Recreation",
        hours: "Monday-Sunday 06:00-22:00",
        services: ["Gym", "Basketball courts", "Tennis courts", "Swimming pool", "Football field"],
        location: "Sports Complex",
      },
      {
        name: { en: "Health Center", tr: "Sağlık Merkezi", ar: "المركز الصحي" },
        type: "Medical",
        hours: "Monday-Friday 08:00-17:00, Emergency 24/7",
        services: ["General health", "Emergency care", "Pharmacy", "Counseling"],
        location: "Near Hospital Building",
      },
    ],
    services: [
      {
        name: { en: "Academic Advising", tr: "Akademik Danışmanlık", ar: "الإرشاد الأكاديمي" },
        description: {
          en: "Get help with course selection, academic planning, and degree requirements.",
          tr: "Ders seçimi, akademik planlama ve mezuniyet gereksinimleri konusunda yardım alın.",
          ar: "احصل على مساعدة في اختيار الدورات والتخطيط الأكاديمي ومتطلبات الدرجة.",
        },
        contact: "advising@neu.edu.tr",
        location: "Faculty offices",
        hours: "Monday-Friday 09:00-17:00",
      },
      {
        name: { en: "IT Support", tr: "BT Destek", ar: "دعم تكنولوجيا المعلومات" },
        description: {
          en: "Technical support for student accounts, Wi-Fi, software, and computer labs.",
          tr: "Öğrenci hesapları, Wi-Fi, yazılım ve bilgisayar laboratuvarları için teknik destek.",
          ar: "الدعم الفني لحسابات الطلاب والواي فاي والبرامج ومختبرات الكمبيوter.",
        },
        contact: "itsupport@neu.edu.tr or +90 392 223 6100",
        location: "IT Center, Central Campus",
        hours: "Monday-Friday 08:00-18:00",
      },
      {
        name: { en: "Career Services", tr: "Kariyer Hizmetleri", ar: "خدمات التوظيف" },
        description: {
          en: "Job placement assistance, resume reviews, interview preparation, and career counseling.",
          tr: "İş yerleştirme yardımı, özgeçmiş incelemesi, mülakat hazırlığı ve kariyer danışmanlığı.",
          ar: "المساعدة في التوظيف ومراجعة السيرة الذاتية والتحضير للمقابلات والإرشاد المهني.",
        },
        contact: "career@neu.edu.tr",
        location: "Student Services Building",
        hours: "Monday-Friday 09:00-17:00",
      },
    ],
  },
  transportation: {
    shuttleBus: {
      routes: [
        "Campus → Nicosia City Center",
        "Campus → Dormitories",
        "Engineering Faculty → Hospital",
        "Main Gate → Sports Center",
      ],
      hours: {
        en: "Monday-Friday 07:00-20:00, Saturday 08:00-18:00",
        tr: "Pazartesi-Cuma 07:00-20:00, Cumartesi 08:00-18:00",
        ar: "الإثنين-الجمعة 07:00-20:00، السبت 08:00-18:00",
      },
      frequency: "Every 15-20 minutes during peak hours",
      contact: "+90 392 223 6600",
    },
    parking: {
      locations: ["Central parking lot", "Faculty parking areas", "Dormitory parking"],
      capacity: 2000,
      studentParking: true,
    },
  },
  studentLife: {
    clubs: [
      "Computer Science Club",
      "Robotics Club",
      "Business Club",
      "Photography Club",
      "Music Club",
      "Drama Club",
      "Debate Society",
      "Chess Club",
    ],
    sports: ["Football", "Basketball", "Volleyball", "Tennis", "Swimming", "Athletics", "Table Tennis", "Badminton"],
    events: [
      "Orientation Week",
      "Career Fair",
      "Spring Festival",
      "Graduation Ceremony",
      "Sports Day",
      "Cultural Night",
      "Hackathon",
      "Science Fair",
    ],
    dormitories: {
      available: true,
      capacity: 5000,
      contact: "dormitories@neu.edu.tr or +90 392 223 6200",
    },
  },
}

// Search function for knowledge base
export function searchKnowledgeBase(query: string, language: "en" | "tr" | "ar"): string | null {
  const lowerQuery = query.toLowerCase()

  // Faculty information
  if (lowerQuery.includes("faculty") || lowerQuery.includes("fakülte") || lowerQuery.includes("كلية")) {
    const facultyList = neuKnowledgeBase.academic.faculties
      .map((f) => `${f.name[language]} - Contact: ${f.contact}`)
      .join("\n")
    return facultyList
  }

  // Programs
  if (lowerQuery.includes("program") || lowerQuery.includes("bölüm") || lowerQuery.includes("برنامج")) {
    const programList = neuKnowledgeBase.academic.programs
      .map((p) => `${p.name[language]} (${p.duration}, ${p.credits} credits)`)
      .join("\n")
    return programList
  }

  // Transportation
  if (
    lowerQuery.includes("shuttle") ||
    lowerQuery.includes("bus") ||
    lowerQuery.includes("servis") ||
    lowerQuery.includes("حافلة")
  ) {
    const transport = neuKnowledgeBase.transportation.shuttleBus
    return `Shuttle Bus Service:\nRoutes: ${transport.routes.join(", ")}\nHours: ${transport.hours[language]}\nFrequency: ${transport.frequency}\nContact: ${transport.contact}`
  }

  // Student services
  if (lowerQuery.includes("service") || lowerQuery.includes("hizmet") || lowerQuery.includes("خدمة")) {
    const services = neuKnowledgeBase.campus.services
      .map((s) => `${s.name[language]}: ${s.description[language]} - Contact: ${s.contact}`)
      .join("\n\n")
    return services
  }

  // Dormitories
  if (lowerQuery.includes("dorm") || lowerQuery.includes("yurt") || lowerQuery.includes("سكن")) {
    const dorm = neuKnowledgeBase.studentLife.dormitories
    return `Dormitories:\nCapacity: ${dorm.capacity} students\nContact: ${dorm.contact}`
  }

  // Sports and clubs
  if (lowerQuery.includes("club") || lowerQuery.includes("kulüp") || lowerQuery.includes("نادي")) {
    return `Student Clubs: ${neuKnowledgeBase.studentLife.clubs.join(", ")}`
  }

  if (lowerQuery.includes("sport") || lowerQuery.includes("spor") || lowerQuery.includes("رياضة")) {
    return `Available Sports: ${neuKnowledgeBase.studentLife.sports.join(", ")}`
  }

  // Academic rules
  if (
    lowerQuery.includes("rule") ||
    lowerQuery.includes("regulation") ||
    lowerQuery.includes("kural") ||
    lowerQuery.includes("قاعدة")
  ) {
    const rules = neuKnowledgeBase.academic.rules
      .map((r) => `${r.title[language]}: ${r.description[language]}`)
      .join("\n\n")
    return rules
  }

  return null
}
