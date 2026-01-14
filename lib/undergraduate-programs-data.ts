export interface UndergraduateProgram {
  id: string
  name: string
  faculty: string
  language: "English" | "Turkish" | "English/Turkish"
  duration: number // years
  tuitionFee: {
    annual: number // in EUR
    annualWithScholarship: number
    semesterWithScholarship: number
  }
  description: string
}

export const undergraduateProgramsData: UndergraduateProgram[] = [
  // ATATURK FACULTY OF EDUCATION
  {
    id: "edu-001",
    name: "Computer Education and Instructional Technology",
    faculty: "Ataturk Faculty of Education",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Prepares teachers to integrate technology into education, develop educational software, and design instructional materials.",
  },
  {
    id: "edu-002",
    name: "English Language Teaching",
    faculty: "Ataturk Faculty of Education",
    language: "English",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Trains qualified English teachers with modern teaching methodologies and language acquisition theories.",
  },
  {
    id: "edu-003",
    name: "Pre-School Teaching",
    faculty: "Ataturk Faculty of Education",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Develops early childhood educators skilled in child development, play-based learning, and curriculum design.",
  },
  {
    id: "edu-004",
    name: "Psychological Counselling and Guidance",
    faculty: "Ataturk Faculty of Education",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Trains school counselors in psychological assessment, career guidance, and student support services.",
  },

  // ENGINEERING
  {
    id: "eng-001",
    name: "Software Engineering",
    faculty: "Engineering",
    language: "English",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Comprehensive program covering software design, development, testing, and project management with industry-standard tools.",
  },
  {
    id: "eng-002",
    name: "Computer Engineering",
    faculty: "Engineering",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Combines hardware and software training covering computer architecture, networks, embedded systems, and AI.",
  },
  {
    id: "eng-003",
    name: "Artificial Intelligence Engineering",
    faculty: "Engineering",
    language: "English",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Cutting-edge program in machine learning, deep learning, neural networks, and AI applications.",
  },
  {
    id: "eng-004",
    name: "Electrical and Electronic Engineering",
    faculty: "Engineering",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Covers power systems, electronics, telecommunications, and control systems with extensive lab work.",
  },
  {
    id: "eng-005",
    name: "Mechanical Engineering",
    faculty: "Engineering",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Studies thermodynamics, mechanics, materials science, and manufacturing with hands-on projects.",
  },

  // ECONOMICS AND ADMINISTRATIVE SCIENCES
  {
    id: "econ-001",
    name: "Business Administration",
    faculty: "Economics and Administrative Sciences",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Comprehensive business education covering management, marketing, finance, and entrepreneurship.",
  },
  {
    id: "econ-002",
    name: "Management Information Systems",
    faculty: "Economics and Administrative Sciences",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Bridges business and technology, focusing on database management, business analytics, and IT strategy.",
  },
  {
    id: "econ-003",
    name: "Banking and Finance",
    faculty: "Economics and Administrative Sciences",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Prepares financial analysts and bankers with knowledge in investments, risk management, and financial markets.",
  },

  // HEALTH SCIENCES
  {
    id: "health-001",
    name: "Nursing",
    faculty: "Nursing",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Trains professional nurses with clinical skills, patient care, and healthcare management expertise.",
  },
  {
    id: "health-002",
    name: "Physiotherapy and Rehabilitation",
    faculty: "Health Sciences",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Develops rehabilitation specialists skilled in physical therapy, exercise science, and patient recovery.",
  },

  // MEDICINE
  {
    id: "med-001",
    name: "Medicine",
    faculty: "Medicine",
    language: "English/Turkish",
    duration: 6,
    tuitionFee: { annual: 13480, annualWithScholarship: 13480, semesterWithScholarship: 6740 },
    description:
      "Comprehensive 6-year MD program with clinical rotations at JCI-accredited NEU Hospital, training future physicians.",
  },
  {
    id: "med-002",
    name: "Dentistry",
    faculty: "Dentistry",
    language: "English/Turkish",
    duration: 5,
    tuitionFee: { annual: 12430, annualWithScholarship: 12430, semesterWithScholarship: 6215 },
    description: "5-year DDS program with state-of-the-art dental clinics and comprehensive clinical training.",
  },
  {
    id: "med-003",
    name: "Pharmacy",
    faculty: "Pharmacy",
    language: "English",
    duration: 5,
    tuitionFee: { annual: 8600, annualWithScholarship: 4765, semesterWithScholarship: 2382.5 },
    description:
      "5-year pharmaceutical sciences program covering drug development, clinical pharmacy, and pharmaceutical care.",
  },
  {
    id: "med-004",
    name: "Veterinary Medicine",
    faculty: "Veterinary Medicine",
    language: "English/Turkish",
    duration: 5,
    tuitionFee: { annual: 8600, annualWithScholarship: 4765, semesterWithScholarship: 2382.5 },
    description: "5-year veterinary program with animal hospital facilities for hands-on clinical experience.",
  },

  // ARCHITECTURE
  {
    id: "arch-001",
    name: "Architecture",
    faculty: "Architecture",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Develops architects with skills in design, construction, sustainability, and urban planning.",
  },
  {
    id: "arch-002",
    name: "Interior Architecture",
    faculty: "Architecture",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Focuses on interior space design, furniture design, and creating functional living environments.",
  },

  // LAW
  {
    id: "law-001",
    name: "Law",
    faculty: "Law",
    language: "Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Comprehensive legal education covering civil, criminal, commercial, and international law.",
  },
  {
    id: "law-002",
    name: "International Law",
    faculty: "Law",
    language: "English",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description: "Specializes in international relations, human rights, trade law, and diplomatic practices.",
  },

  // COMMUNICATION
  {
    id: "comm-001",
    name: "Journalism",
    faculty: "Communication",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Trains journalists in news writing, investigative reporting, digital media, and broadcast journalism.",
  },
  {
    id: "comm-002",
    name: "Public Relations and Advertising",
    faculty: "Communication",
    language: "English/Turkish",
    duration: 4,
    tuitionFee: { annual: 5600, annualWithScholarship: 3190, semesterWithScholarship: 1595 },
    description:
      "Develops PR and advertising professionals skilled in brand management, campaign design, and media strategy.",
  },
]

export function searchPrograms(query: string): UndergraduateProgram[] {
  const normalizedQuery = query.toLowerCase().trim()
  return undergraduateProgramsData.filter(
    (program) =>
      program.name.toLowerCase().includes(normalizedQuery) ||
      program.faculty.toLowerCase().includes(normalizedQuery) ||
      program.description.toLowerCase().includes(normalizedQuery),
  )
}

export function getProgramsByFaculty(faculty: string): UndergraduateProgram[] {
  return undergraduateProgramsData.filter((program) => program.faculty === faculty)
}

export function getProgramsByLanguage(language: string): UndergraduateProgram[] {
  return undergraduateProgramsData.filter((program) => program.language.includes(language))
}
