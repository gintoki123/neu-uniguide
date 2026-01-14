export interface FacilityBooking {
  id: string
  facilityId: string
  facilityName: string
  userId: string
  userName: string
  userEmail: string
  date: string
  startTime: string
  endTime: string
  purpose: string
  status: "pending" | "approved" | "rejected" | "cancelled"
  createdAt: string
  attendees?: number
}

export interface FacilityStatus {
  facilityId: string
  isOpen: boolean
  currentOccupancy: number
  maxCapacity: number
  lastUpdated: string
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean
  elevatorAccess: boolean
  accessibleRestrooms: boolean
  assistiveListening: boolean
  brailleSignage: boolean
  parkingAvailable: boolean
}

export interface FacilityPolicy {
  facilityId: string
  rules: { en: string; tr: string; ar: string }[]
  bookingRequirements: { en: string; tr: string; ar: string }[]
  cancellationPolicy: { en: string; tr: string; ar: string }
  maxBookingDuration: number // hours
  advanceBookingDays: number
}

// Generate facility status (simulated real-time)
export function getFacilityStatus(facilityId: string): FacilityStatus {
  const hour = new Date().getHours()
  const isBusinessHours = hour >= 8 && hour < 22

  // Simulate different occupancy levels
  const occupancyLevels: Record<string, { current: number; max: number }> = {
    library: { current: isBusinessHours ? 120 : 15, max: 200 },
    gym: { current: isBusinessHours ? 45 : 0, max: 80 },
    cafeteria: { current: isBusinessHours ? 180 : 0, max: 250 },
    lab: { current: isBusinessHours ? 35 : 5, max: 50 },
    theater: { current: 0, max: 300 },
    pool: { current: isBusinessHours ? 25 : 0, max: 40 },
  }

  const occupancy = occupancyLevels[facilityId] || { current: 0, max: 100 }

  return {
    facilityId,
    isOpen: isBusinessHours,
    currentOccupancy: occupancy.current,
    maxCapacity: occupancy.max,
    lastUpdated: new Date().toISOString(),
  }
}

// Accessibility information for facilities
export const accessibilityData: Record<string, AccessibilityInfo> = {
  library: {
    wheelchairAccessible: true,
    elevatorAccess: true,
    accessibleRestrooms: true,
    assistiveListening: false,
    brailleSignage: true,
    parkingAvailable: true,
  },
  gym: {
    wheelchairAccessible: true,
    elevatorAccess: false,
    accessibleRestrooms: true,
    assistiveListening: false,
    brailleSignage: false,
    parkingAvailable: true,
  },
  cafeteria: {
    wheelchairAccessible: true,
    elevatorAccess: true,
    accessibleRestrooms: true,
    assistiveListening: false,
    brailleSignage: false,
    parkingAvailable: true,
  },
}

// Facility policies
export const facilityPolicies: Record<string, FacilityPolicy> = {
  library: {
    facilityId: "library",
    rules: [
      {
        en: "Maintain silence in study areas",
        tr: "Çalışma alanlarında sessizliği koruyun",
        ar: "حافظ على الهدوء في مناطق الدراسة",
      },
      {
        en: "No food or drinks except water",
        tr: "Su hariç yiyecek ve içecek yok",
        ar: "لا طعام أو مشروبات عدا الماء",
      },
      {
        en: "Return books to designated areas",
        tr: "Kitapları belirlenen alanlara iade edin",
        ar: "أعد الكتب إلى المناطق المخصصة",
      },
    ],
    bookingRequirements: [
      { en: "Valid student ID required", tr: "Geçerli öğrenci kimliği gerekli", ar: "بطاقة طالب صالحة مطلوبة" },
      {
        en: "Booking must be made 24 hours in advance",
        tr: "Rezervasyon 24 saat önceden yapılmalı",
        ar: "يجب إجراء الحجز قبل 24 ساعة",
      },
    ],
    cancellationPolicy: {
      en: "Free cancellation up to 2 hours before",
      tr: "2 saat öncesine kadar ücretsiz iptal",
      ar: "إلغاء مجاني حتى ساعتين قبل",
    },
    maxBookingDuration: 4,
    advanceBookingDays: 7,
  },
  gym: {
    facilityId: "gym",
    rules: [
      {
        en: "Proper athletic attire required",
        tr: "Uygun atletik kıyafet gerekli",
        ar: "يتطلب ارتداء ملابس رياضية مناسبة",
      },
      { en: "Clean equipment after use", tr: "Kullanımdan sonra ekipmanı temizleyin", ar: "نظف المعدات بعد الاستخدام" },
      {
        en: "Maximum 60-minute session during peak hours",
        tr: "Yoğun saatlerde maksimum 60 dakika",
        ar: "جلسة بحد أقصى 60 دقيقة في أوقات الذروة",
      },
    ],
    bookingRequirements: [
      {
        en: "Medical clearance for first-time users",
        tr: "İlk kullananlar için sağlık onayı",
        ar: "تصريح طبي للمستخدمين الجدد",
      },
    ],
    cancellationPolicy: {
      en: "Free cancellation up to 1 hour before",
      tr: "1 saat öncesine kadar ücretsiz iptal",
      ar: "إلغاء مجاني حتى ساعة واحدة قبل",
    },
    maxBookingDuration: 2,
    advanceBookingDays: 3,
  },
}

// Storage functions
export function getFacilityBookings(): FacilityBooking[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("neu_facility_bookings")
  return stored ? JSON.parse(stored) : []
}

export function saveFacilityBooking(booking: FacilityBooking): boolean {
  if (typeof window === "undefined") return false

  const bookings = getFacilityBookings()
  bookings.push(booking)
  localStorage.setItem("neu_facility_bookings", JSON.stringify(bookings))
  return true
}

export function updateBookingStatus(id: string, status: FacilityBooking["status"]): boolean {
  if (typeof window === "undefined") return false

  const bookings = getFacilityBookings()
  const index = bookings.findIndex((b) => b.id === id)

  if (index === -1) return false

  bookings[index].status = status
  localStorage.setItem("neu_facility_bookings", JSON.stringify(bookings))
  return true
}

export function generateBookingId(): string {
  return `book_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function getAvailableTimeSlots(facilityId: string, date: Date): string[] {
  const slots: string[] = []
  const policy = facilityPolicies[facilityId]

  // Generate slots from 8 AM to 10 PM
  for (let hour = 8; hour < 22; hour++) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`
    slots.push(timeString)
  }

  // Filter out booked slots
  const bookings = getFacilityBookings()
  const dateString = date.toISOString().split("T")[0]

  return slots.filter((slot) => {
    return !bookings.some(
      (b) =>
        b.facilityId === facilityId &&
        b.date === dateString &&
        b.startTime === slot &&
        b.status !== "cancelled" &&
        b.status !== "rejected",
    )
  })
}
