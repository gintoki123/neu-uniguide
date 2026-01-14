"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight } from "lucide-react"
import type { Language } from "@/app/page"
import type { Doctor } from "@/lib/massive-data"

interface RelatedDoctorsProps {
  currentDoctor: Doctor
  allDoctors: Doctor[]
  language: Language
  onDoctorSelect: (doctor: Doctor) => void
}

const translations = {
  en: {
    title: "Related Doctors",
    subtitle: "Other doctors in the same department",
    viewProfile: "View Profile",
    noRelated: "No related doctors found",
  },
  tr: {
    title: "İlgili Doktorlar",
    subtitle: "Aynı bölümdeki diğer doktorlar",
    viewProfile: "Profili Görüntüle",
    noRelated: "İlgili doktor bulunamadı",
  },
  ar: {
    title: "الأطباء ذوو الصلة",
    subtitle: "أطباء آخرون في نفس القسم",
    viewProfile: "عرض الملف الشخصي",
    noRelated: "لم يتم العثور على أطباء ذوي صلة",
  },
}

export function RelatedDoctors({ currentDoctor, allDoctors, language, onDoctorSelect }: RelatedDoctorsProps) {
  const t = translations[language]

  // Find doctors in same department, excluding current doctor
  const relatedDoctors = allDoctors
    .filter((d) => d.departmentId === currentDoctor.departmentId && d.id !== currentDoctor.id)
    .slice(0, 3)

  if (relatedDoctors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">{t.noRelated}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-sm">{doctor.name[language]}</p>
              <p className="text-xs text-muted-foreground">{doctor.title[language]}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {doctor.department[language]}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onDoctorSelect(doctor)}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
