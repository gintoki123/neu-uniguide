import { doctors, buildings, facilities } from "./data"
import { callOpenRouterAPI, type OpenRouterMessage } from "./openrouter"
import { allAcademicCourses, programRequirements, searchCourses } from "./neu-academic-data"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  data?: {
    type: "doctor" | "building" | "facility" | "directions" | "text"
    items?: any[]
    route?: { from: string; to: string; distance: string; time: string }
  }
}

export interface ChatbotResponse {
  message: string
  type: "doctor" | "building" | "facility" | "directions" | "text" | "error"
  data?: any
}

// Detect language from text
export function detectLanguage(text: string): "en" | "tr" | "ar" {
  const arabicChars = /[\u0600-\u06FF]/
  const turkishChars = /[şğüıöçŞĞÜİÖÇ]/
  const turkishWords = ["nerede", "nasıl", "ne", "kim", "saat", "kaç", "doktor", "bina", "fakülte"]

  if (arabicChars.test(text)) return "ar"
  if (turkishChars.test(text)) return "tr"

  const lowerText = text.toLowerCase()
  const hasTurkishWord = turkishWords.some((word) => lowerText.includes(word))
  if (hasTurkishWord) return "tr"

  return "en"
}

// Process chatbot query
export async function processChatbotQuery(
  query: string,
  language: "en" | "tr" | "ar" = "en",
): Promise<ChatbotResponse> {
  const detectedLang = detectLanguage(query)
  const lang = language || detectedLang

  const lowerQuery = query.toLowerCase()

  const isCourseQuery =
    lowerQuery.includes("course") ||
    lowerQuery.includes("ders") ||
    lowerQuery.includes("دورة") ||
    lowerQuery.includes("credit") ||
    lowerQuery.includes("kredi") ||
    lowerQuery.includes("sاعة") ||
    lowerQuery.includes("ects") ||
    lowerQuery.includes("prerequisite") ||
    lowerQuery.includes("ön koşul") ||
    lowerQuery.includes("متطلب") ||
    lowerQuery.includes("semester") ||
    lowerQuery.includes("dönem") ||
    lowerQuery.includes("فصل") ||
    lowerQuery.includes("graduation") ||
    lowerQuery.includes("mezuniyet") ||
    lowerQuery.includes("تخرج") ||
    lowerQuery.includes("software engineering") ||
    lowerQuery.includes("yazılım mühendisliği") ||
    lowerQuery.includes("هندسة البرمجيات") ||
    lowerQuery.includes("mis") ||
    lowerQuery.includes("ybs") ||
    lowerQuery.includes("curriculum") ||
    lowerQuery.includes("müfredat") ||
    lowerQuery.includes("منهج")

  if (isCourseQuery) {
    // Search courses from official PDF data
    const foundCourses = searchCourses(query)

    if (foundCourses.length > 0) {
      const messages: { [key: string]: string } = {
        en: `Found ${foundCourses.length} course(s) from official catalog:`,
        tr: `Resmi katalogdan ${foundCourses.length} ders bulundu:`,
        ar: `تم العثور على ${foundCourses.length} دورة من الكتالوج الرسمي:`,
      }

      // Format course information
      const courseInfo = foundCourses
        .slice(0, 3)
        .map(
          (c) =>
            `${c.code}: ${c.name} (${c.credits} Credits, ${c.ects} ECTS)${c.prerequisite ? ` - Prerequisite: ${c.prerequisite}` : ""}`,
        )
        .join("\n")

      return {
        message: `${messages[lang]}\n\n${courseInfo}`,
        type: "text",
        data: { courses: foundCourses.slice(0, 3) },
      }
    }

    // Handle graduation requirements query
    if (
      lowerQuery.includes("graduation") ||
      lowerQuery.includes("mezuniyet") ||
      lowerQuery.includes("تخرج") ||
      lowerQuery.includes("requirement") ||
      lowerQuery.includes("gereksinim") ||
      lowerQuery.includes("متطلب")
    ) {
      const sweReq = programRequirements[0]
      const misReq = programRequirements[1]

      const messages: { [key: string]: string } = {
        en: `**Graduation Requirements:**\n\n**Software Engineering:** ${sweReq.totalCredits} credits, ${sweReq.totalECTS} ECTS, ${sweReq.requiredCourses} required courses, ${sweReq.technicalElectives} technical electives, 2 summer training periods, graduation project required.\n\n**MIS:** ${misReq.totalCredits} credits, ${misReq.totalECTS} ECTS, minimum GPA 2.0.`,
        tr: `**Mezuniyet Gereksinimleri:**\n\n**Yazılım Mühendisliği:** ${sweReq.totalCredits} kredi, ${sweReq.totalECTS} ECTS, ${sweReq.requiredCourses} zorunlu ders, ${sweReq.technicalElectives} teknik seçmeli, 2 yaz stajı, bitirme projesi gerekli.\n\n**YBS:** ${misReq.totalCredits} kredi, ${misReq.totalECTS} ECTS, minimum GPA 2.0.`,
        ar: `**متطلبات التخرج:**\n\n**هندسة البرمجيات:** ${sweReq.totalCredits} ساعة معتمدة، ${sweReq.totalECTS} ECTS، ${sweReq.requiredCourses} دورات مطلوبة، ${sweReq.technicalElectives} اختيارية فنية، تدريبان صيفيان، مشروع تخرج مطلوب.\n\n**نظم المعلومات:** ${misReq.totalCredits} ساعة، ${misReq.totalECTS} ECTS، معدل تراكمي 2.0 كحد أدنى.`,
      }

      return {
        message: messages[lang],
        type: "text",
      }
    }
  }

  // Check if query is about database content (doctors, buildings, facilities)
  const isDatabaseQuery =
    lowerQuery.includes("doctor") ||
    lowerQuery.includes("dr.") ||
    lowerQuery.includes("doktor") ||
    lowerQuery.includes("طبيب") ||
    lowerQuery.includes("office") ||
    lowerQuery.includes("hours") ||
    lowerQuery.includes("saat") ||
    lowerQuery.includes("ساعات") ||
    lowerQuery.includes("where") ||
    lowerQuery.includes("location") ||
    lowerQuery.includes("nerede") ||
    lowerQuery.includes("أين") ||
    lowerQuery.includes("building") ||
    lowerQuery.includes("bina") ||
    lowerQuery.includes("مبنى") ||
    lowerQuery.includes("faculty") ||
    lowerQuery.includes("fakülte") ||
    lowerQuery.includes("كلية") ||
    lowerQuery.includes("library") ||
    lowerQuery.includes("kütüphane") ||
    lowerQuery.includes("مكتبة") ||
    lowerQuery.includes("cafeteria") ||
    lowerQuery.includes("yemekhane") ||
    lowerQuery.includes("مقصف") ||
    lowerQuery.includes("direction") ||
    lowerQuery.includes("route") ||
    lowerQuery.includes("yol") ||
    lowerQuery.includes("طريق")

  if (isDatabaseQuery) {
    // Doctor queries
    if (
      lowerQuery.includes("doctor") ||
      lowerQuery.includes("dr.") ||
      lowerQuery.includes("doktor") ||
      lowerQuery.includes("طبيب")
    ) {
      const foundDoctors = doctors.filter(
        (doc) =>
          doc.name.toLowerCase().includes(lowerQuery.replace("dr.", "").trim()) ||
          doc.department.toLowerCase().includes(lowerQuery) ||
          (doc.name_ar && lowerQuery.includes(doc.name_ar.toLowerCase())) ||
          (doc.department_ar && lowerQuery.includes(doc.department_ar.toLowerCase())) ||
          query.toLowerCase().includes(doc.name.toLowerCase().split(" ").pop() || ""),
      )

      if (foundDoctors.length > 0) {
        const messages: { [key: string]: string } = {
          en: `Found ${foundDoctors.length} doctor(s):`,
          tr: `${foundDoctors.length} doktor bulundu:`,
          ar: `تم العثور على ${foundDoctors.length} طبيب:`,
        }

        return {
          message: messages[lang],
          type: "doctor",
          data: foundDoctors,
        }
      }
    }

    // Building/location queries
    if (
      lowerQuery.includes("where") ||
      lowerQuery.includes("location") ||
      lowerQuery.includes("nerede") ||
      lowerQuery.includes("أين") ||
      lowerQuery.includes("building") ||
      lowerQuery.includes("bina") ||
      lowerQuery.includes("مبنى") ||
      lowerQuery.includes("faculty") ||
      lowerQuery.includes("fakülte") ||
      lowerQuery.includes("كلية")
    ) {
      const foundBuildings = buildings.filter(
        (building) =>
          building.name.toLowerCase().includes(lowerQuery) ||
          building.departments.some((dept) => lowerQuery.includes(dept.toLowerCase())) ||
          building.type.toLowerCase().includes(lowerQuery),
      )

      if (foundBuildings.length > 0) {
        const messages: { [key: string]: string } = {
          en: `Found ${foundBuildings.length} building(s):`,
          tr: `${foundBuildings.length} bina bulundu:`,
          ar: `تم العثور على ${foundBuildings.length} مبنى:`,
        }

        return {
          message: messages[lang],
          type: "building",
          data: foundBuildings,
        }
      }
    }

    // Hours/facility queries
    if (
      lowerQuery.includes("hour") ||
      lowerQuery.includes("open") ||
      lowerQuery.includes("close") ||
      lowerQuery.includes("saat") ||
      lowerQuery.includes("açık") ||
      lowerQuery.includes("kapalı") ||
      lowerQuery.includes("ساعات") ||
      lowerQuery.includes("مفتوح")
    ) {
      const foundFacilities = facilities.filter(
        (facility) =>
          facility.name.toLowerCase().includes(lowerQuery) || facility.type.toLowerCase().includes(lowerQuery),
      )

      if (foundFacilities.length > 0) {
        const messages: { [key: string]: string } = {
          en: "Facility hours:",
          tr: "Tesis saatleri:",
          ar: "ساعات المرافق:",
        }

        return {
          message: messages[lang],
          type: "facility",
          data: foundFacilities,
        }
      }
    }

    // Direction queries
    if (
      (lowerQuery.includes("to") && lowerQuery.includes("from")) ||
      lowerQuery.includes("direction") ||
      lowerQuery.includes("route") ||
      lowerQuery.includes("how to get") ||
      lowerQuery.includes("yol tarifi") ||
      lowerQuery.includes("طريق")
    ) {
      const words = lowerQuery.split(/\s+/)
      const fromIndex = words.findIndex((w) => w === "from" || w === "başlangıç" || w === "من")
      const toIndex = words.findIndex((w) => w === "to" || w === "varış" || w === "إلى")

      if (fromIndex >= 0 && toIndex >= 0) {
        const from = words.slice(fromIndex + 1, toIndex).join(" ")
        const to = words.slice(toIndex + 1).join(" ")

        const messages: { [key: string]: string } = {
          en: `Directions from ${from} to ${to}:`,
          tr: `${from} → ${to} için yol tarifi:`,
          ar: `الاتجاهات من ${from} إلى ${to}:`,
        }

        return {
          message: messages[lang],
          type: "directions",
          data: {
            from,
            to,
            distance: "500m",
            time: "8-10 minutes",
            steps:
              lang === "ar"
                ? ["اتجه نحو المخرج", "اتبع الطريق الرئيسي", "صل إلى الوجهة"]
                : lang === "tr"
                  ? ["Çıkışa doğru ilerle", "Ana yolu takip et", "Hedefe ulaş"]
                  : ["Head to the exit", "Follow the main path", "Arrive at destination"],
          },
        }
      }
    }
  }

  // If not a database query, use OpenRouter AI API
  try {
    const systemPrompts: { [key: string]: string } = {
      en: `You are a helpful assistant for Near East University (NEU) campus. You have access to official academic information:

**Software Engineering Program:** ${programRequirements[0].totalCredits} credits, ${programRequirements[0].totalECTS} ECTS, ${allAcademicCourses.filter((c) => c.program === "SWE").length} courses including required courses and technical electives. Requires 2 summer training periods and graduation project.

**MIS Program:** ${programRequirements[1].totalCredits} credits, ${programRequirements[1].totalECTS} ECTS, ${allAcademicCourses.filter((c) => c.program === "MIS").length} courses.

Provide brief, friendly answers about university life, academics, facilities, courses, and student services. Keep responses concise (2-3 sentences). When asked about courses, refer to official catalog data.`,
      tr: `Yakın Doğu Üniversitesi (YDÜ) kampüsü için yardımcı bir asistansınız. Resmi akademik bilgilere erişiminiz var:

**Yazılım Mühendisliği Programı:** ${programRequirements[0].totalCredits} kredi, ${programRequirements[0].totalECTS} ECTS, ${allAcademicCourses.filter((c) => c.program === "SWE").length} ders. 2 yaz stajı ve bitirme projesi gereklidir.

**YBS Programı:** ${programRequirements[1].totalCredits} kredi, ${programRequirements[1].totalECTS} ECTS, ${allAcademicCourses.filter((c) => c.program === "MIS").length} ders.

Üniversite yaşamı, akademik konular, tesisler, dersler ve öğrenci hizmetleri hakkında kısa ve samimi cevaplar verin. Yanıtları kısa tutun (2-3 cümle).`,
      ar: `أنت مساعد مفيد لجامعة الشرق الأدنى (NEU). لديك وصول إلى المعلومات الأكاديمية الرسمية:

**برنامج هندسة البرمجيات:** ${programRequirements[0].totalCredits} ساعة معتمدة، ${programRequirements[0].totalECTS} ECTS، ${allAcademicCourses.filter((c) => c.program === "SWE").length} دورة. يتطلب تدريبين صيفيين ومشروع تخرج.

**برنامج نظم المعلومات:** ${programRequirements[1].totalCredits} ساعة، ${programRequirements[1].totalECTS} ECTS، ${allAcademicCourses.filter((c) => c.program === "MIS").length} دورة.

قدم إجابات موجزة وودية حول الحياة الجامعية والأكاديميات والمرافق والدورات وخدمات الطلاب. اجعل الردود مختصرة (2-3 جمل).`,
    }

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompts[lang] },
      { role: "user", content: query },
    ]

    const aiResponse = await callOpenRouterAPI(messages)

    return {
      message: aiResponse,
      type: "text",
    }
  } catch (error) {
    console.error("[v0] Error calling OpenRouter API:", error)

    // Fallback to default helpful response
    const fallbackMessages: { [key: string]: string } = {
      en: "How can I help you? You can ask about courses, doctor information, building locations, facility hours, graduation requirements, or directions.",
      tr: "Size nasıl yardımcı olabilirim? Dersler, doktor bilgileri, bina konumları, tesis saatleri, mezuniyet gereksinimleri veya yol tarifleri hakkında soru sorabilirsiniz.",
      ar: "كيف يمكنني مساعدتك؟ يمكنك السؤال عن الدورات، ومعلومات الأطباء، ومواقع المباني، وساعات المرافق، ومتطلبات التخرج، أو الاتجاهات.",
    }

    return {
      message: fallbackMessages[lang],
      type: "text",
      data: {
        suggestions:
          lang === "ar"
            ? [
                "ما هي دورات السنة الثانية في هندسة البرمجيات؟",
                "كم عدد الساعات المعتمدة المطلوبة للتخرج؟",
                "أين مكتب د. عائشة أوزتورك؟",
                "ما هي ساعات المكتبة؟",
              ]
            : lang === "tr"
              ? [
                  "Yazılım Mühendisliği 2. yıl dersleri neler?",
                  "Mezun olmak için kaç kredi gerekli?",
                  "Dr. Ayşe Öztürk'ün ofisi nerede?",
                  "Kütüphane kaçta açılıyor?",
                ]
              : [
                  "What courses are in Software Engineering year 2?",
                  "How many credits required to graduate?",
                  "Where is Dr. Ayşe Öztürk's office?",
                  "What time does the library open?",
                ],
      },
    }
  }
}

// Generate chat suggestions
export function getChatSuggestions(language: "en" | "tr" | "ar"): string[] {
  if (language === "ar") {
    return [
      "ما هي دورات السنة الثانية في هندسة البرمجيات؟",
      "كم عدد الساعات المعتمدة المطلوبة للتخرج؟",
      "أين مكتب د. عائشة أوزتورك؟",
      "ما هي ساعات المكتبة؟",
      "الاتجاهات من المكتبة إلى كلية الهندسة",
    ]
  }

  if (language === "tr") {
    return [
      "Yazılım Mühendisliği 2. yıl dersleri neler?",
      "Mezun olmak için kaç kredi gerekli?",
      "Dr. Ayşe Öztürk'ün ofisi nerede?",
      "Kütüphane kaçta açılıyor?",
      "Kütüphaneden Mühendislik'e yol tarifi",
    ]
  }

  return [
    "What courses are in Software Engineering year 2?",
    "How many credits required to graduate?",
    "Where is Dr. Ayşe Öztürk's office?",
    "What time does the library open?",
    "Directions from Library to Engineering",
  ]
}
