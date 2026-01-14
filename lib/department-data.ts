export interface AcademicPathway {
  departmentId: string
  degree: "bachelor" | "master" | "phd"
  duration: number // semesters
  totalCredits: number
  yearlyStructure: YearStructure[]
}

export interface YearStructure {
  year: number
  semesters: SemesterStructure[]
}

export interface SemesterStructure {
  semester: number
  courses: CourseInPathway[]
  totalCredits: number
}

export interface CourseInPathway {
  code: string
  name: { en: string; tr: string; ar: string }
  credits: number
  type: "core" | "elective" | "general"
}

export interface CareerOutcome {
  departmentId: string
  jobTitles: { en: string; tr: string; ar: string }[]
  industries: { en: string; tr: string; ar: string }[]
  averageSalary?: { currency: string; amount: number }
  employmentRate: number // percentage
  topEmployers: string[]
  skills: { en: string; tr: string; ar: string }[]
}

export interface DepartmentAnalytics {
  departmentId: string
  totalStudents: number
  totalCourses: number
  facultyCount: number
  researchProjects: number
  internationalCollaborations: number
  graduationRate: number // percentage
}

// Sample academic pathways
export const academicPathways: AcademicPathway[] = [
  {
    departmentId: "cs",
    degree: "bachelor",
    duration: 8,
    totalCredits: 240,
    yearlyStructure: [
      {
        year: 1,
        semesters: [
          {
            semester: 1,
            totalCredits: 30,
            courses: [
              {
                code: "CS101",
                name: { en: "Introduction to Programming", tr: "Programlamaya Giriş", ar: "مقدمة في البرمجة" },
                credits: 6,
                type: "core",
              },
              {
                code: "MATH101",
                name: { en: "Calculus I", tr: "Kalkülüs I", ar: "حساب التفاضل والتكامل I" },
                credits: 6,
                type: "core",
              },
              {
                code: "ENG101",
                name: { en: "Academic English I", tr: "Akademik İngilizce I", ar: "الإنجليزية الأكاديمية I" },
                credits: 4,
                type: "general",
              },
              { code: "PHY101", name: { en: "Physics I", tr: "Fizik I", ar: "الفيزياء I" }, credits: 6, type: "core" },
              {
                code: "CS102",
                name: { en: "Discrete Mathematics", tr: "Ayrık Matematik", ar: "الرياضيات المنفصلة" },
                credits: 6,
                type: "core",
              },
            ],
          },
          {
            semester: 2,
            totalCredits: 30,
            courses: [
              {
                code: "CS103",
                name: { en: "Data Structures", tr: "Veri Yapıları", ar: "هياكل البيانات" },
                credits: 6,
                type: "core",
              },
              {
                code: "MATH102",
                name: { en: "Calculus II", tr: "Kalkülüs II", ar: "حساب التفاضل والتكامل II" },
                credits: 6,
                type: "core",
              },
              {
                code: "ENG102",
                name: { en: "Academic English II", tr: "Akademik İngilizce II", ar: "الإنجليزية الأكاديمية II" },
                credits: 4,
                type: "general",
              },
              {
                code: "PHY102",
                name: { en: "Physics II", tr: "Fizik II", ar: "الفيزياء II" },
                credits: 6,
                type: "core",
              },
              {
                code: "CS104",
                name: { en: "Object-Oriented Programming", tr: "Nesne Yönelimli Programlama", ar: "البرمجة الكائنية" },
                credits: 6,
                type: "core",
              },
            ],
          },
        ],
      },
      {
        year: 2,
        semesters: [
          {
            semester: 3,
            totalCredits: 30,
            courses: [
              {
                code: "CS201",
                name: { en: "Algorithms", tr: "Algoritmalar", ar: "الخوارزميات" },
                credits: 6,
                type: "core",
              },
              {
                code: "CS202",
                name: { en: "Database Systems", tr: "Veritabanı Sistemleri", ar: "أنظمة قواعد البيانات" },
                credits: 6,
                type: "core",
              },
              {
                code: "CS203",
                name: { en: "Computer Architecture", tr: "Bilgisayar Mimarisi", ar: "بنية الحاسوب" },
                credits: 6,
                type: "core",
              },
              {
                code: "MATH201",
                name: { en: "Linear Algebra", tr: "Doğrusal Cebir", ar: "الجبر الخطي" },
                credits: 6,
                type: "core",
              },
              {
                code: "HIST101",
                name: { en: "Ataturk's Principles", tr: "Atatürk İlkeleri", ar: "مبادئ أتاتورك" },
                credits: 2,
                type: "general",
              },
            ],
          },
          {
            semester: 4,
            totalCredits: 30,
            courses: [
              {
                code: "CS204",
                name: { en: "Operating Systems", tr: "İşletim Sistemleri", ar: "أنظمة التشغيل" },
                credits: 6,
                type: "core",
              },
              {
                code: "CS205",
                name: { en: "Web Development", tr: "Web Geliştirme", ar: "تطوير الويب" },
                credits: 6,
                type: "core",
              },
              {
                code: "CS206",
                name: { en: "Software Engineering", tr: "Yazılım Mühendisliği", ar: "هندسة البرمجيات" },
                credits: 6,
                type: "core",
              },
              {
                code: "MATH202",
                name: { en: "Probability & Statistics", tr: "Olasılık ve İstatistik", ar: "الاحتمالات والإحصاء" },
                credits: 6,
                type: "core",
              },
              {
                code: "TUR101",
                name: { en: "Turkish Language", tr: "Türk Dili", ar: "اللغة التركية" },
                credits: 2,
                type: "general",
              },
            ],
          },
        ],
      },
    ],
  },
]

// Career outcomes
export const careerOutcomes: CareerOutcome[] = [
  {
    departmentId: "cs",
    jobTitles: [
      { en: "Software Developer", tr: "Yazılım Geliştirici", ar: "مطور برمجيات" },
      { en: "Data Scientist", tr: "Veri Bilimci", ar: "عالم بيانات" },
      { en: "Systems Analyst", tr: "Sistem Analisti", ar: "محلل أنظمة" },
      { en: "DevOps Engineer", tr: "DevOps Mühendisi", ar: "مهندس DevOps" },
      { en: "AI/ML Engineer", tr: "Yapay Zeka/Makine Öğrenmesi Mühendisi", ar: "مهندس الذكاء الاصطناعي" },
    ],
    industries: [
      { en: "Technology", tr: "Teknoloji", ar: "التكنولوجيا" },
      { en: "Finance", tr: "Finans", ar: "المالية" },
      { en: "Healthcare", tr: "Sağlık", ar: "الرعاية الصحية" },
      { en: "E-commerce", tr: "E-ticaret", ar: "التجارة الإلكترونية" },
      { en: "Gaming", tr: "Oyun", ar: "الألعاب" },
    ],
    averageSalary: { currency: "USD", amount: 65000 },
    employmentRate: 92,
    topEmployers: ["Google", "Microsoft", "Amazon", "Apple", "Meta"],
    skills: [
      { en: "Programming", tr: "Programlama", ar: "البرمجة" },
      { en: "Problem Solving", tr: "Problem Çözme", ar: "حل المشكلات" },
      { en: "Database Management", tr: "Veritabanı Yönetimi", ar: "إدارة قواعد البيانات" },
      { en: "Cloud Computing", tr: "Bulut Bilişim", ar: "الحوسبة السحابية" },
      { en: "Agile Methodologies", tr: "Çevik Metodolojiler", ar: "المنهجيات الرشيقة" },
    ],
  },
]

// Department analytics
export const departmentAnalytics: DepartmentAnalytics[] = [
  {
    departmentId: "cs",
    totalStudents: 850,
    totalCourses: 62,
    facultyCount: 28,
    researchProjects: 15,
    internationalCollaborations: 8,
    graduationRate: 88,
  },
  {
    departmentId: "eng",
    totalStudents: 420,
    totalCourses: 48,
    facultyCount: 18,
    researchProjects: 10,
    internationalCollaborations: 5,
    graduationRate: 85,
  },
  {
    departmentId: "med",
    totalStudents: 320,
    totalCourses: 72,
    facultyCount: 35,
    researchProjects: 22,
    internationalCollaborations: 12,
    graduationRate: 95,
  },
]

export function getPathwayByDepartment(deptId: string): AcademicPathway | undefined {
  return academicPathways.find((p) => p.departmentId === deptId)
}

export function getCareerOutcomesByDepartment(deptId: string): CareerOutcome | undefined {
  return careerOutcomes.find((c) => c.departmentId === deptId)
}

export function getAnalyticsByDepartment(deptId: string): DepartmentAnalytics | undefined {
  return departmentAnalytics.find((a) => a.departmentId === deptId)
}
