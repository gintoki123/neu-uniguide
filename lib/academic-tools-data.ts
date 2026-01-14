export interface CourseRecord {
  code: string
  name: string
  credits: number
  grade: string
  semester: string
  passed: boolean
}

export interface CreditProgress {
  totalRequired: number
  totalCompleted: number
  coreCompleted: number
  coreRequired: number
  electiveCompleted: number
  electiveRequired: number
  generalCompleted: number
  generalRequired: number
  percentageComplete: number
}

export interface WorkloadAnalysis {
  totalCredits: number
  totalCourses: number
  estimatedStudyHours: number // per week
  difficultyLevel: "light" | "moderate" | "heavy" | "extreme"
  recommendation: { en: string; tr: string; ar: string }
}

export interface StudySchedule {
  courseCode: string
  courseName: string
  weeklyHours: number
  studySessions: StudySession[]
}

export interface StudySession {
  day: string
  startTime: string
  duration: number // minutes
  type: "lecture" | "study" | "assignment" | "review"
}

export interface GraduationCheck {
  eligible: boolean
  creditsRemaining: number
  semestersRemaining: number
  missingRequirements: { en: string; tr: string; ar: string }[]
  projectedGraduation: string // semester
}

// Calculate credit progress
export function calculateCreditProgress(courses: CourseRecord[]): CreditProgress {
  const completedCourses = courses.filter((c) => c.passed)

  const totalCompleted = completedCourses.reduce((sum, c) => sum + c.credits, 0)
  const totalRequired = 240 // typical bachelor's degree

  // Rough estimation of course types
  const coreCompleted = completedCourses.filter((c) => c.code.includes("CS") || c.code.includes("MATH")).length * 6
  const electiveCompleted = completedCourses.filter((c) => c.code.includes("ELEC")).length * 6
  const generalCompleted = completedCourses.filter((c) => c.code.includes("ENG") || c.code.includes("HIST")).length * 4

  return {
    totalRequired,
    totalCompleted,
    coreCompleted,
    coreRequired: 144,
    electiveCompleted,
    electiveRequired: 60,
    generalCompleted,
    generalRequired: 36,
    percentageComplete: Math.round((totalCompleted / totalRequired) * 100),
  }
}

// Analyze semester workload
export function analyzeWorkload(courses: { credits: number; difficulty?: string }[]): WorkloadAnalysis {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
  const totalCourses = courses.length

  // Estimate study hours: 2-3 hours per credit
  const estimatedStudyHours = totalCredits * 2.5

  let difficultyLevel: WorkloadAnalysis["difficultyLevel"]
  let recommendation: WorkloadAnalysis["recommendation"]

  if (totalCredits <= 12) {
    difficultyLevel = "light"
    recommendation = {
      en: "Light workload. Consider adding more courses or extracurricular activities.",
      tr: "Hafif iş yükü. Daha fazla ders veya ders dışı etkinlik eklemeyi düşünün.",
      ar: "عبء عمل خفيف. فكر في إضافة المزيد من الدورات أو الأنشطة اللامنهجية.",
    }
  } else if (totalCredits <= 18) {
    difficultyLevel = "moderate"
    recommendation = {
      en: "Moderate workload. Good balance for most students.",
      tr: "Orta iş yükü. Çoğu öğrenci için iyi bir denge.",
      ar: "عبء عمل معتدل. توازن جيد لمعظم الطلاب.",
    }
  } else if (totalCredits <= 21) {
    difficultyLevel = "heavy"
    recommendation = {
      en: "Heavy workload. Ensure you can manage the time commitment.",
      tr: "Ağır iş yükü. Zaman taahhüdünü yönetebileceğinizden emin olun.",
      ar: "عبء عمل ثقيل. تأكد من قدرتك على إدارة الالتزام الزمني.",
    }
  } else {
    difficultyLevel = "extreme"
    recommendation = {
      en: "Extreme workload. Consider reducing course load to maintain quality.",
      tr: "Aşırı iş yükü. Kaliteyi korumak için ders yükünü azaltmayı düşünün.",
      ar: "عبء عمل مفرط. فكر في تقليل الحمل الدراسي للحفاظ على الجودة.",
    }
  }

  return {
    totalCredits,
    totalCourses,
    estimatedStudyHours,
    difficultyLevel,
    recommendation,
  }
}

// Generate study time planner
export function generateStudySchedule(courses: { code: string; name: string; credits: number }[]): StudySchedule[] {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return courses.map((course, index) => {
    const weeklyHours = course.credits * 2 // 2 hours study per credit

    // Distribute study sessions across the week
    const sessions: StudySession[] = []
    let hoursRemaining = weeklyHours

    // Add lecture times (simulate 2-3 lectures per week)
    const lectureCount = Math.min(3, Math.ceil(course.credits / 2))
    for (let i = 0; i < lectureCount; i++) {
      const dayIndex = (index * 2 + i) % 5 // Spread across weekdays
      sessions.push({
        day: days[dayIndex],
        startTime: `${9 + i * 2}:00`,
        duration: 90,
        type: "lecture",
      })
      hoursRemaining -= 1.5
    }

    // Add study sessions for remaining hours
    while (hoursRemaining > 0) {
      const sessionDuration = Math.min(120, hoursRemaining * 60)
      const dayIndex = sessions.length % 7
      sessions.push({
        day: days[dayIndex],
        startTime: `${14 + (sessions.length % 3) * 2}:00`,
        duration: sessionDuration,
        type: "study",
      })
      hoursRemaining -= sessionDuration / 60
    }

    return {
      courseCode: course.code,
      courseName: course.name,
      weeklyHours,
      studySessions: sessions,
    }
  })
}

// Check graduation eligibility
export function checkGraduationEligibility(
  completedCredits: number,
  currentSemester: number,
  gpa: number,
): GraduationCheck {
  const requiredCredits = 240
  const requiredSemesters = 8
  const minGPA = 2.0

  const creditsRemaining = Math.max(0, requiredCredits - completedCredits)
  const semestersRemaining = Math.max(0, requiredSemesters - currentSemester)

  const missingRequirements: GraduationCheck["missingRequirements"] = []

  if (creditsRemaining > 0) {
    missingRequirements.push({
      en: `Complete ${creditsRemaining} more credits`,
      tr: `${creditsRemaining} kredi daha tamamlayın`,
      ar: `أكمل ${creditsRemaining} ساعة معتمدة أخرى`,
    })
  }

  if (gpa < minGPA) {
    missingRequirements.push({
      en: `Raise GPA to at least ${minGPA} (currently ${gpa.toFixed(2)})`,
      tr: `GPA'yı en az ${minGPA}'a yükseltin (şu anda ${gpa.toFixed(2)})`,
      ar: `رفع المعدل التراكمي إلى ${minGPA} على الأقل (حاليًا ${gpa.toFixed(2)})`,
    })
  }

  if (currentSemester < requiredSemesters) {
    missingRequirements.push({
      en: `Complete ${semestersRemaining} more semesters`,
      tr: `${semestersRemaining} dönem daha tamamlayın`,
      ar: `أكمل ${semestersRemaining} فصل دراسي آخر`,
    })
  }

  const eligible = missingRequirements.length === 0

  // Project graduation semester
  const projectedSemester = currentSemester + Math.ceil(creditsRemaining / 18)
  const projectedYear = Math.floor((projectedSemester - 1) / 2) + 1
  const spring = projectedSemester % 2 === 0
  const projectedGraduation = `Year ${projectedYear}, ${spring ? "Spring" : "Fall"}`

  return {
    eligible,
    creditsRemaining,
    semestersRemaining,
    missingRequirements,
    projectedGraduation,
  }
}

// Sample course data for testing
export const sampleCourses: CourseRecord[] = [
  { code: "CS101", name: "Intro to Programming", credits: 6, grade: "A", semester: "Fall 2023", passed: true },
  { code: "MATH101", name: "Calculus I", credits: 6, grade: "B+", semester: "Fall 2023", passed: true },
  { code: "ENG101", name: "Academic English I", credits: 4, grade: "A-", semester: "Fall 2023", passed: true },
  { code: "PHY101", name: "Physics I", credits: 6, grade: "B", semester: "Fall 2023", passed: true },
  { code: "CS102", name: "Discrete Mathematics", credits: 6, grade: "A", semester: "Fall 2023", passed: true },
  { code: "CS103", name: "Data Structures", credits: 6, grade: "B+", semester: "Spring 2024", passed: true },
  { code: "MATH102", name: "Calculus II", credits: 6, grade: "B", semester: "Spring 2024", passed: true },
  { code: "ENG102", name: "Academic English II", credits: 4, grade: "A", semester: "Spring 2024", passed: true },
  { code: "PHY102", name: "Physics II", credits: 6, grade: "B+", semester: "Spring 2024", passed: true },
  { code: "CS104", name: "OOP", credits: 6, grade: "A-", semester: "Spring 2024", passed: true },
]
