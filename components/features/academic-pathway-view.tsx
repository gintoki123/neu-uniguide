"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award } from "lucide-react"
import type { Language } from "@/app/page"
import type { AcademicPathway } from "@/lib/department-data"

interface AcademicPathwayViewProps {
  pathway: AcademicPathway
  language: Language
}

const translations = {
  en: {
    title: "Academic Pathway",
    degree: "Degree",
    duration: "Duration",
    semesters: "semesters",
    totalCredits: "Total Credits",
    year: "Year",
    semester: "Semester",
    credits: "Credits",
    core: "Core",
    elective: "Elective",
    general: "General Education",
  },
  tr: {
    title: "Akademik Yol Haritası",
    degree: "Derece",
    duration: "Süre",
    semesters: "dönem",
    totalCredits: "Toplam Kredi",
    year: "Yıl",
    semester: "Dönem",
    credits: "Kredi",
    core: "Zorunlu",
    elective: "Seçmeli",
    general: "Genel Eğitim",
  },
  ar: {
    title: "المسار الأكاديمي",
    degree: "الدرجة",
    duration: "المدة",
    semesters: "فصول",
    totalCredits: "إجمالي الساعات المعتمدة",
    year: "السنة",
    semester: "الفصل",
    credits: "ساعات معتمدة",
    core: "إلزامي",
    elective: "اختياري",
    general: "التعليم العام",
  },
}

const degreeNames = {
  bachelor: { en: "Bachelor's Degree", tr: "Lisans", ar: "درجة البكالوريوس" },
  master: { en: "Master's Degree", tr: "Yüksek Lisans", ar: "درجة الماجستير" },
  phd: { en: "PhD", tr: "Doktora", ar: "الدكتوراه" },
}

export function AcademicPathwayView({ pathway, language }: AcademicPathwayViewProps) {
  const t = translations[language]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {t.title}
          </CardTitle>
          <CardDescription>
            {degreeNames[pathway.degree][language]} - {pathway.duration} {t.semesters}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.degree}</p>
              <p className="font-semibold">{degreeNames[pathway.degree][language]}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.duration}</p>
              <p className="font-semibold">
                {pathway.duration} {t.semesters}
              </p>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-sm text-muted-foreground">{t.totalCredits}</p>
              <div className="flex items-center gap-3">
                <Progress value={(pathway.totalCredits / 300) * 100} className="flex-1" />
                <span className="font-semibold">{pathway.totalCredits}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {pathway.yearlyStructure.map((yearData) => (
        <Card key={yearData.year}>
          <CardHeader>
            <CardTitle className="text-lg">
              {t.year} {yearData.year}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {yearData.semesters.map((semesterData) => (
              <div key={semesterData.semester} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">
                    {t.semester} {semesterData.semester}
                  </h4>
                  <Badge variant="secondary">
                    {semesterData.totalCredits} {t.credits}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {semesterData.courses.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold">{course.code}</span>
                          <Badge
                            variant="outline"
                            className={
                              course.type === "core"
                                ? "bg-primary/10"
                                : course.type === "elective"
                                  ? "bg-blue-500/10"
                                  : "bg-green-500/10"
                            }
                          >
                            {course.type === "core" ? t.core : course.type === "elective" ? t.elective : t.general}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{course.name[language]}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Award className="w-4 h-4" />
                        {course.credits}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
