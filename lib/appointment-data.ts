export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  patientName: string
  patientEmail: string
  patientPhone: string
  date: string // ISO date string
  time: string // HH:MM format
  duration: number // minutes
  reason: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
  notes?: string
}

export interface TimeSlot {
  time: string
  available: boolean
  doctorId: string
}

export interface DoctorAvailability {
  doctorId: string
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string
  endTime: string
  slotDuration: number // minutes
}

// Default availability for all doctors (Mon-Fri, 9am-5pm)
export const defaultAvailability: DoctorAvailability[] = [
  { doctorId: "all", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
  { doctorId: "all", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
  { doctorId: "all", dayOfWeek: 3, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
  { doctorId: "all", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
  { doctorId: "all", dayOfWeek: 5, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
]

// Generate time slots for a given date and doctor
export function generateTimeSlots(doctorId: string, date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay()
  const availability = defaultAvailability.find((a) => a.doctorId === doctorId || a.doctorId === "all")

  if (!availability || availability.dayOfWeek !== dayOfWeek) {
    return [] // No availability on this day
  }

  const slots: TimeSlot[] = []
  const [startHour, startMin] = availability.startTime.split(":").map(Number)
  const [endHour, endMin] = availability.endTime.split(":").map(Number)

  let currentTime = startHour * 60 + startMin
  const endTime = endHour * 60 + endMin

  while (currentTime < endTime) {
    const hour = Math.floor(currentTime / 60)
    const min = currentTime % 60
    const timeString = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`

    // Check if slot is booked
    const isBooked = isTimeSlotBooked(doctorId, date, timeString)

    slots.push({
      time: timeString,
      available: !isBooked,
      doctorId,
    })

    currentTime += availability.slotDuration
  }

  return slots
}

// Check if a time slot is already booked
function isTimeSlotBooked(doctorId: string, date: Date, time: string): boolean {
  if (typeof window === "undefined") return false

  const appointments = getAppointments()
  const dateString = date.toISOString().split("T")[0]

  return appointments.some(
    (apt) => apt.doctorId === doctorId && apt.date === dateString && apt.time === time && apt.status !== "cancelled",
  )
}

// Storage functions
export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("neu_appointments")
  return stored ? JSON.parse(stored) : []
}

export function saveAppointment(appointment: Appointment): boolean {
  if (typeof window === "undefined") return false

  const appointments = getAppointments()
  appointments.push(appointment)
  localStorage.setItem("neu_appointments", JSON.stringify(appointments))
  return true
}

export function updateAppointmentStatus(id: string, status: Appointment["status"]): boolean {
  if (typeof window === "undefined") return false

  const appointments = getAppointments()
  const index = appointments.findIndex((a) => a.id === id)

  if (index === -1) return false

  appointments[index].status = status
  localStorage.setItem("neu_appointments", JSON.stringify(appointments))
  return true
}

export function getAppointmentsByDoctor(doctorId: string): Appointment[] {
  return getAppointments().filter((a) => a.doctorId === doctorId)
}

export function getAppointmentsByDate(date: string): Appointment[] {
  return getAppointments().filter((a) => a.date === date)
}

// Generate unique appointment ID
export function generateAppointmentId(): string {
  return `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
