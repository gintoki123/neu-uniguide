"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, BookOpen, GraduationCap } from "lucide-react"
import type { Language } from "@/app/page"
import type { CreditProgress } from "@/lib/academic-tools-data"

interface CreditTrackerProps {
  progress: CreditProgress
  language: Language
}

const translations = {
  en: {
    title: "Credit Completion Tracker",
    subtitle: "Track your progress towards graduation",
    total: "Total Credits",
    core: "Core Courses",
    elective: "Elective Courses",
    general: "General Education",
    completed: "completed",
    remaining: "remaining",
    of: "of",
  },
  tr: {
    title: "Kredi Tamamlama Takibi",
    subtitle: "Mezuniyete doğru ilerlemenizi takip edin",
    total: "Toplam Kredi",
    core: "Zorunlu Dersler",
    elective: "Seçmeli Dersler",
    general: "Genel Eğitim",
    completed: "tamamlandı",
    remaining: "kalan",
    of: "/",
  },
  ar: {
    title: "متتبع إكمال الساعات المعتمدة",
    subtitle: "تتبع تقدمك نحو التخرج",
    total: "إجمالي الساعات المعتمدة",
    core: "الدورات الأساسية",
    elective: "الدورات الاختيارية",
    general: "التعليم العام",
    completed: "مكتمل",
    remaining: "متبقي",
    of: "من",
  },
}

export function CreditTracker({ progress, language }: CreditTrackerProps) {
  const t = translations[language]

  const sections = [
    {
      label: t.core,
      completed: progress.coreCompleted,
      required: progress.coreRequired,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: t.elective,
      completed: progress.electiveCompleted,
      required: progress.electiveRequired,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: t.general,
      completed: progress.generalCompleted,
      required: progress.generalRequired,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{t.total}</h4>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">{progress.percentageComplete}%</span>
              <p className="text-xs text-muted-foreground">
                {progress.totalCompleted} {t.of} {progress.totalRequired}
              </p>
            </div>
          </div>
          <Progress value={progress.percentageComplete} className="h-3" />
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4 pt-4 border-t">
          {sections.map((section) => {
            const Icon = section.icon
            const percentage = (section.completed / section.required) * 100

            return (
              <div key={section.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <Icon className={`w-4 h-4 ${section.color}`} />
                    </div>
                    <span className="font-medium">{section.label}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {section.completed} / {section.required}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {Math.max(0, section.required - section.completed)} {t.remaining}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
