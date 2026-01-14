"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Award, Calendar } from "lucide-react"
import type { Language } from "@/app/page"
import { checkGraduationEligibility, type GraduationCheck } from "@/lib/academic-tools-data"

interface GraduationCheckerProps {
  language: Language
}

const translations = {
  en: {
    title: "Graduation Eligibility Checker",
    subtitle: "Check if you meet graduation requirements",
    completedCredits: "Completed Credits",
    currentSemester: "Current Semester",
    currentGPA: "Current GPA",
    checkEligibility: "Check Eligibility",
    eligible: "Eligible to Graduate!",
    notEligible: "Not Yet Eligible",
    creditsRemaining: "Credits Remaining",
    semestersRemaining: "Semesters Remaining",
    projectedGraduation: "Projected Graduation",
    missingRequirements: "Missing Requirements",
  },
  tr: {
    title: "Mezuniyet Uygunluk Kontrolü",
    subtitle: "Mezuniyet gerekliliklerini karşılayıp karşılamadığınızı kontrol edin",
    completedCredits: "Tamamlanan Kredi",
    currentSemester: "Mevcut Dönem",
    currentGPA: "Mevcut GPA",
    checkEligibility: "Uygunluğu Kontrol Et",
    eligible: "Mezun Olmaya Uygun!",
    notEligible: "Henüz Uygun Değil",
    creditsRemaining: "Kalan Kredi",
    semestersRemaining: "Kalan Dönem",
    projectedGraduation: "Tahmini Mezuniyet",
    missingRequirements: "Eksik Gereklilikler",
  },
  ar: {
    title: "مدقق أهلية التخرج",
    subtitle: "تحقق مما إذا كنت تستوفي متطلبات التخرج",
    completedCredits: "الساعات المعتمدة المكتملة",
    currentSemester: "الفصل الدراسي الحالي",
    currentGPA: "المعدل التراكمي الحالي",
    checkEligibility: "تحقق من الأهلية",
    eligible: "مؤهل للتخرج!",
    notEligible: "غير مؤهل بعد",
    creditsRemaining: "الساعات المعتمدة المتبقية",
    semestersRemaining: "الفصول الدراسية المتبقية",
    projectedGraduation: "التخرج المتوقع",
    missingRequirements: "المتطلبات المفقودة",
  },
}

export function GraduationChecker({ language }: GraduationCheckerProps) {
  const t = translations[language]
  const [formData, setFormData] = useState({
    completedCredits: 180,
    currentSemester: 6,
    gpa: 3.2,
  })
  const [result, setResult] = useState<GraduationCheck | null>(null)

  const handleCheck = () => {
    const check = checkGraduationEligibility(formData.completedCredits, formData.currentSemester, formData.gpa)
    setResult(check)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="credits">{t.completedCredits}</Label>
            <Input
              id="credits"
              type="number"
              min="0"
              max="300"
              value={formData.completedCredits}
              onChange={(e) => setFormData({ ...formData, completedCredits: Number.parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">{t.currentSemester}</Label>
            <Input
              id="semester"
              type="number"
              min="1"
              max="12"
              value={formData.currentSemester}
              onChange={(e) => setFormData({ ...formData, currentSemester: Number.parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa">{t.currentGPA}</Label>
            <Input
              id="gpa"
              type="number"
              min="0"
              max="4"
              step="0.01"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: Number.parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <Button onClick={handleCheck} className="w-full">
          {t.checkEligibility}
        </Button>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <Alert
              className={
                result.eligible
                  ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                  : "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800"
              }
            >
              {result.eligible ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              )}
              <AlertDescription
                className={
                  result.eligible ? "text-green-800 dark:text-green-200" : "text-orange-800 dark:text-orange-200"
                }
              >
                <strong className="text-lg">{result.eligible ? t.eligible : t.notEligible}</strong>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-accent/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary">{result.creditsRemaining}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.creditsRemaining}</p>
                </CardContent>
              </Card>

              <Card className="bg-accent/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary">{result.semestersRemaining}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.semestersRemaining}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-semibold">{t.projectedGraduation}:</span>
                <span>{result.projectedGraduation}</span>
              </div>

              {result.missingRequirements.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="font-semibold">{t.missingRequirements}:</p>
                  <ul className="space-y-1">
                    {result.missingRequirements.map((req, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{req[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
