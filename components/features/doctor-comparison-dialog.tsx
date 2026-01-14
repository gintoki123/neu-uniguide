"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, MapPin, Clock, Mail, Phone, GraduationCap } from "lucide-react"
import type { Language } from "@/app/page"
import type { Doctor } from "@/lib/massive-data"

interface DoctorComparisonDialogProps {
  doctors: Doctor[]
  language: Language
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemoveDoctor: (doctorId: string) => void
}

const translations = {
  en: {
    title: "Compare Doctors",
    subtitle: "Side-by-side comparison of selected doctors",
    remove: "Remove",
    name: "Name",
    title_label: "Title",
    department: "Department",
    location: "Location",
    hours: "Office Hours",
    contact: "Contact",
    specialization: "Specialization",
    none: "Not specified",
    floor: "Floor",
    room: "Room",
    selectMore: "Select 2-4 doctors to compare",
  },
  tr: {
    title: "Doktorları Karşılaştır",
    subtitle: "Seçilen doktorların yan yana karşılaştırması",
    remove: "Kaldır",
    name: "İsim",
    title_label: "Unvan",
    department: "Bölüm",
    location: "Konum",
    hours: "Ofis Saatleri",
    contact: "İletişim",
    specialization: "Uzmanlık",
    none: "Belirtilmemiş",
    floor: "Kat",
    room: "Oda",
    selectMore: "Karşılaştırmak için 2-4 doktor seçin",
  },
  ar: {
    title: "قارن الأطباء",
    subtitle: "مقارنة جنبًا إلى جنب للأطباء المحددين",
    remove: "إزالة",
    name: "الاسم",
    title_label: "اللقب",
    department: "القسم",
    location: "الموقع",
    hours: "ساعات العمل",
    contact: "الاتصال",
    specialization: "التخصص",
    none: "غير محدد",
    floor: "طابق",
    room: "غرفة",
    selectMore: "اختر 2-4 أطباء للمقارنة",
  },
}

export function DoctorComparisonDialog({
  doctors,
  language,
  open,
  onOpenChange,
  onRemoveDoctor,
}: DoctorComparisonDialogProps) {
  const t = translations[language]

  if (doctors.length < 2) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground py-8">{t.selectMore}</p>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${doctors.length}, minmax(0, 1fr))` }}>
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 z-10"
                onClick={() => onRemoveDoctor(doctor.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <CardContent className="pt-6 space-y-4">
                {/* Name & Title */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">{doctor.name[language]}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.title[language]}</p>
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{t.department}</p>
                  <Badge variant="secondary" className="text-xs">
                    {doctor.department[language]}
                  </Badge>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{t.location}</p>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>{doctor.building[language]}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.floor} {doctor.floor}, {t.room} {doctor.room}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{t.hours}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{doctor.officeHours[language]}</span>
                  </div>
                </div>

                {/* Specialization */}
                {doctor.specialization && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">{t.specialization}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 flex-shrink-0" />
                      <span>{doctor.specialization[language] || t.none}</span>
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{t.contact}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{doctor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
