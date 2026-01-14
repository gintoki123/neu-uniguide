"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Clock, CheckCircle2, AlertCircle, Users } from "lucide-react"
import { generateBookingId, saveFacilityBooking, getAvailableTimeSlots, facilityPolicies } from "@/lib/facility-data"
import type { Language } from "@/app/page"
import type { Facility } from "@/lib/massive-data"

interface FacilityBookingDialogProps {
  facility: Facility
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
}

const translations = {
  en: {
    title: "Book Facility",
    selectDate: "Select Date",
    selectTime: "Select Start Time",
    duration: "Duration (hours)",
    attendees: "Number of Attendees",
    yourInfo: "Your Information",
    name: "Full Name",
    email: "Email",
    purpose: "Purpose of Booking",
    purposePlaceholder: "Describe your intended use...",
    submit: "Submit Request",
    cancel: "Cancel",
    success: "Booking Requested!",
    successMsg: "Your booking request has been submitted for approval.",
    error: "Error",
    errorMsg: "Please fill in all required fields.",
    noSlots: "No available time slots for this date",
    policies: "Important Policies",
    maxDuration: "Max duration",
    hours: "hours",
  },
  tr: {
    title: "Tesis Rezervasyonu",
    selectDate: "Tarih Seç",
    selectTime: "Başlangıç Saati Seç",
    duration: "Süre (saat)",
    attendees: "Katılımcı Sayısı",
    yourInfo: "Bilgileriniz",
    name: "Ad Soyad",
    email: "E-posta",
    purpose: "Rezervasyon Amacı",
    purposePlaceholder: "Kullanım amacını açıklayın...",
    submit: "Talep Gönder",
    cancel: "İptal",
    success: "Rezervasyon Talep Edildi!",
    successMsg: "Rezervasyon talebiniz onay için gönderildi.",
    error: "Hata",
    errorMsg: "Lütfen tüm gerekli alanları doldurun.",
    noSlots: "Bu tarih için uygun zaman dilimi yok",
    policies: "Önemli Politikalar",
    maxDuration: "Maksimum süre",
    hours: "saat",
  },
  ar: {
    title: "حجز المرفق",
    selectDate: "اختر التاريخ",
    selectTime: "اختر وقت البدء",
    duration: "المدة (ساعات)",
    attendees: "عدد الحضور",
    yourInfo: "معلوماتك",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    purpose: "غرض الحجز",
    purposePlaceholder: "اوصف الاستخدام المقصود...",
    submit: "إرسال الطلب",
    cancel: "إلغاء",
    success: "تم طلب الحجز!",
    successMsg: "تم إرسال طلب الحجز للموافقة عليه.",
    error: "خطأ",
    errorMsg: "يرجى ملء جميع الحقول المطلوبة.",
    noSlots: "لا توجد أوقات متاحة لهذا التاريخ",
    policies: "السياسات المهمة",
    maxDuration: "الحد الأقصى للمدة",
    hours: "ساعات",
  },
}

export function FacilityBookingDialog({ facility, language, open, onOpenChange }: FacilityBookingDialogProps) {
  const t = translations[language]
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [duration, setDuration] = useState<number>(1)
  const [attendees, setAttendees] = useState<number>(1)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const policy = facilityPolicies[facility.id]

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(undefined)
    if (date) {
      const slots = getAvailableTimeSlots(facility.id, date)
      setAvailableSlots(slots)
    } else {
      setAvailableSlots([])
    }
  }

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.purpose) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    const [startHour] = selectedTime.split(":").map(Number)
    const endHour = startHour + duration
    const endTime = `${endHour.toString().padStart(2, "0")}:00`

    const booking = {
      id: generateBookingId(),
      facilityId: facility.id,
      facilityName: facility.name[language],
      userId: "user_" + Date.now(),
      userName: formData.name,
      userEmail: formData.email,
      date: selectedDate.toISOString().split("T")[0],
      startTime: selectedTime,
      endTime: endTime,
      purpose: formData.purpose,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      attendees,
    }

    const success = saveFacilityBooking(booking)

    if (success) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onOpenChange(false)
        // Reset form
        setSelectedDate(undefined)
        setSelectedTime(undefined)
        setDuration(1)
        setAttendees(1)
        setFormData({ name: "", email: "", purpose: "" })
      }, 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{facility.name[language]}</DialogDescription>
        </DialogHeader>

        {showSuccess && (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>{t.success}</strong> {t.successMsg}
            </AlertDescription>
          </Alert>
        )}

        {showError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>{t.error}:</strong> {t.errorMsg}
            </AlertDescription>
          </Alert>
        )}

        {policy && (
          <Alert>
            <AlertDescription>
              <p className="font-semibold mb-2">{t.policies}:</p>
              <ul className="text-sm space-y-1">
                {policy.rules.slice(0, 2).map((rule, i) => (
                  <li key={i}>• {rule[language]}</li>
                ))}
                <li>
                  • {t.maxDuration}: {policy.maxBookingDuration} {t.hours}
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {t.selectDate}
            </Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          {selectedDate && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t.selectTime}
                </Label>
                {availableSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t.noSlots}</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(slot)}
                        className="w-full"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">{t.duration}</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max={policy?.maxBookingDuration || 4}
                    value={duration}
                    onChange={(e) => setDuration(Number.parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attendees" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t.attendees}
                  </Label>
                  <Input
                    id="attendees"
                    type="number"
                    min="1"
                    value={attendees}
                    onChange={(e) => setAttendees(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-4">
            <Label className="text-base font-semibold">{t.yourInfo}</Label>

            <div className="space-y-2">
              <Label htmlFor="name">{t.name} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">{t.purpose} *</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                placeholder={t.purposePlaceholder}
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSubmit}>{t.submit}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
