"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { generateTimeSlots, generateAppointmentId, saveAppointment, type TimeSlot } from "@/lib/appointment-data"
import type { Language } from "@/app/page"
import type { Doctor } from "@/lib/massive-data"

interface AppointmentRequestDialogProps {
  doctor: Doctor
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
}

const translations = {
  en: {
    title: "Request Appointment",
    selectDate: "Select Date",
    selectTime: "Select Time Slot",
    noSlots: "No available time slots for this date",
    personalInfo: "Your Information",
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    reason: "Reason for Appointment",
    reasonPlaceholder: "Brief description of your concern...",
    submit: "Submit Request",
    cancel: "Cancel",
    success: "Appointment Requested!",
    successMsg: "Your appointment request has been submitted. You will receive confirmation via email.",
    error: "Error",
    errorMsg: "Please fill in all required fields and select a time slot.",
    available: "Available",
    booked: "Booked",
  },
  tr: {
    title: "Randevu Talebi",
    selectDate: "Tarih Seç",
    selectTime: "Zaman Dilimi Seç",
    noSlots: "Bu tarih için uygun zaman dilimi yok",
    personalInfo: "Bilgileriniz",
    name: "Ad Soyad",
    email: "E-posta",
    phone: "Telefon Numarası",
    reason: "Randevu Nedeni",
    reasonPlaceholder: "Endişenizin kısa açıklaması...",
    submit: "Talep Gönder",
    cancel: "İptal",
    success: "Randevu Talep Edildi!",
    successMsg: "Randevu talebiniz gönderildi. E-posta ile onay alacaksınız.",
    error: "Hata",
    errorMsg: "Lütfen tüm gerekli alanları doldurun ve zaman dilimi seçin.",
    available: "Müsait",
    booked: "Dolu",
  },
  ar: {
    title: "طلب موعد",
    selectDate: "اختر التاريخ",
    selectTime: "اختر الوقت",
    noSlots: "لا توجد أوقات متاحة في هذا التاريخ",
    personalInfo: "معلوماتك",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    reason: "سبب الموعد",
    reasonPlaceholder: "وصف موجز لقلقك...",
    submit: "إرسال الطلب",
    cancel: "إلغاء",
    success: "تم طلب الموعد!",
    successMsg: "تم إرسال طلب الموعد. ستتلقى تأكيدًا عبر البريد الإلكتروني.",
    error: "خطأ",
    errorMsg: "يرجى ملء جميع الحقول المطلوبة واختيار وقت.",
    available: "متاح",
    booked: "محجوز",
  },
}

export function AppointmentRequestDialog({ doctor, language, open, onOpenChange }: AppointmentRequestDialogProps) {
  const t = translations[language]
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(undefined)
    if (date) {
      const slots = generateTimeSlots(doctor.id, date)
      setTimeSlots(slots)
    } else {
      setTimeSlots([])
    }
  }

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone || !formData.reason) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    const appointment = {
      id: generateAppointmentId(),
      doctorId: doctor.id,
      doctorName: doctor.name[language],
      patientName: formData.name,
      patientEmail: formData.email,
      patientPhone: formData.phone,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      duration: 30,
      reason: formData.reason,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    const success = saveAppointment(appointment)

    if (success) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onOpenChange(false)
        // Reset form
        setSelectedDate(undefined)
        setSelectedTime(undefined)
        setFormData({ name: "", email: "", phone: "", reason: "" })
      }, 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {doctor.name[language]} - {doctor.department[language]}
          </DialogDescription>
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

        <div className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {t.selectDate}
            </Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t.selectTime}
              </Label>
              {timeSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t.noSlots}</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="w-full"
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Personal Information Form */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">{t.personalInfo}</Label>

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
              <Label htmlFor="phone">{t.phone} *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+90 123 456 7890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">{t.reason} *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder={t.reasonPlaceholder}
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
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
