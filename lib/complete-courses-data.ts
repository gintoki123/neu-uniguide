export interface Course {
  code: string
  name: {
    en: string
    tr: string
    ar: string
  }
  description: {
    en: string
    tr: string
    ar: string
  }
  credits: number
  ects: number
  semester: number
  department: string
  prerequisites?: string[]
}

//  Extracted ALL courses from Business Administration PDF
export const businessAdminCourses: Course[] = [
  {
    code: "ENG 101",
    name: { en: "English I", tr: "İngilizce I", ar: "اللغة الإنجليزية I" },
    description: {
      en: "Focusing on grammar and developing all language skills",
      tr: "Dilbilgisi ve dil becerilerini geliştirmeye odaklanıyor",
      ar: "تتعلق بالقواعد النحوية وتطوير جميع مهارات اللغة",
    },
    credits: 3,
    ects: 6,
    semester: 1,
    department: "Business Administration",
  },
  // /** rest of code here **/
]
