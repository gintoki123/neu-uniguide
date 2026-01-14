"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Briefcase, TrendingUp, Building, Award, DollarSign } from "lucide-react"
import type { Language } from "@/app/page"
import type { CareerOutcome } from "@/lib/department-data"

interface CareerOutcomesViewProps {
  outcome: CareerOutcome
  language: Language
}

const translations = {
  en: {
    title: "Career Outcomes",
    subtitle: "Explore career opportunities and statistics",
    jobTitles: "Job Titles",
    industries: "Industries",
    employmentRate: "Employment Rate",
    averageSalary: "Average Starting Salary",
    topEmployers: "Top Employers",
    keySkills: "Key Skills",
    perYear: "/year",
  },
  tr: {
    title: "Kariyer Sonuçları",
    subtitle: "Kariyer fırsatlarını ve istatistikleri keşfedin",
    jobTitles: "İş Unvanları",
    industries: "Sektörler",
    employmentRate: "İstihdam Oranı",
    averageSalary: "Ortalama Başlangıç Maaşı",
    topEmployers: "En İyi İşverenler",
    keySkills: "Temel Beceriler",
    perYear: "/yıl",
  },
  ar: {
    title: "نتائج الوظائف",
    subtitle: "استكشف فرص العمل والإحصاءات",
    jobTitles: "المسميات الوظيفية",
    industries: "الصناعات",
    employmentRate: "معدل التوظيف",
    averageSalary: "متوسط الراتب الابتدائي",
    topEmployers: "أفضل أصحاب العمل",
    keySkills: "المهارات الأساسية",
    perYear: "/سنة",
  },
}

export function CareerOutcomesView({ outcome, language }: CareerOutcomesViewProps) {
  const t = translations[language]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Employment Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t.employmentRate}
              </p>
              <span className="text-2xl font-bold text-primary">{outcome.employmentRate}%</span>
            </div>
            <Progress value={outcome.employmentRate} className="h-2" />
          </div>

          {/* Average Salary */}
          {outcome.averageSalary && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <p className="font-semibold">{t.averageSalary}</p>
              </div>
              <p className="text-3xl font-bold">
                {outcome.averageSalary.amount.toLocaleString()} {outcome.averageSalary.currency}
                <span className="text-base text-muted-foreground font-normal">{t.perYear}</span>
              </p>
            </div>
          )}

          {/* Job Titles */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">{t.jobTitles}</p>
            <div className="flex flex-wrap gap-2">
              {outcome.jobTitles.map((job, i) => (
                <Badge key={i} variant="secondary">
                  {job[language]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Building className="w-4 h-4" />
              {t.industries}
            </p>
            <div className="flex flex-wrap gap-2">
              {outcome.industries.map((industry, i) => (
                <Badge key={i} variant="outline">
                  {industry[language]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Top Employers */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">{t.topEmployers}</p>
            <div className="grid grid-cols-2 gap-2">
              {outcome.topEmployers.map((employer, i) => (
                <div key={i} className="p-2 rounded border bg-card text-sm font-medium text-center">
                  {employer}
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              {t.keySkills}
            </p>
            <div className="flex flex-wrap gap-2">
              {outcome.skills.map((skill, i) => (
                <Badge key={i} className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-200">
                  {skill[language]}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
