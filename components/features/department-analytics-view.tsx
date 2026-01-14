"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, GraduationCap, Beaker, Globe, Award } from "lucide-react"
import type { Language } from "@/app/page"
import type { DepartmentAnalytics } from "@/lib/department-data"

interface DepartmentAnalyticsViewProps {
  analytics: DepartmentAnalytics
  language: Language
}

const translations = {
  en: {
    title: "Department Analytics",
    subtitle: "Key metrics and statistics",
    students: "Total Students",
    courses: "Total Courses",
    faculty: "Faculty Members",
    research: "Research Projects",
    collaborations: "International Collaborations",
    graduationRate: "Graduation Rate",
  },
  tr: {
    title: "Bölüm Analitiği",
    subtitle: "Temel metrikler ve istatistikler",
    students: "Toplam Öğrenci",
    courses: "Toplam Ders",
    faculty: "Öğretim Üyeleri",
    research: "Araştırma Projeleri",
    collaborations: "Uluslararası İşbirlikleri",
    graduationRate: "Mezuniyet Oranı",
  },
  ar: {
    title: "تحليلات القسم",
    subtitle: "المقاييس والإحصاءات الرئيسية",
    students: "إجمالي الطلاب",
    courses: "إجمالي الدورات",
    faculty: "أعضاء هيئة التدريس",
    research: "مشاريع البحث",
    collaborations: "التعاونات الدولية",
    graduationRate: "معدل التخرج",
  },
}

export function DepartmentAnalyticsView({ analytics, language }: DepartmentAnalyticsViewProps) {
  const t = translations[language]

  const stats = [
    { icon: Users, label: t.students, value: analytics.totalStudents.toString(), color: "text-blue-600" },
    { icon: BookOpen, label: t.courses, value: analytics.totalCourses.toString(), color: "text-green-600" },
    { icon: GraduationCap, label: t.faculty, value: analytics.facultyCount.toString(), color: "text-purple-600" },
    { icon: Beaker, label: t.research, value: analytics.researchProjects.toString(), color: "text-orange-600" },
    {
      icon: Globe,
      label: t.collaborations,
      value: analytics.internationalCollaborations.toString(),
      color: "text-pink-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="bg-accent/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Graduation Rate */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <p className="font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {t.graduationRate}
            </p>
            <span className="text-2xl font-bold text-primary">{analytics.graduationRate}%</span>
          </div>
          <Progress value={analytics.graduationRate} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
