"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Plus, X, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { Language } from "@/app/page"
import { analyzeWorkload, type WorkloadAnalysis } from "@/lib/academic-tools-data"

interface WorkloadEstimatorProps {
  language: Language
}

const translations = {
  en: {
    title: "Semester Workload Estimator",
    subtitle: "Plan your course load for optimal performance",
    addCourse: "Add Course",
    courseName: "Course Name",
    credits: "Credits",
    analyze: "Analyze Workload",
    remove: "Remove",
    results: "Analysis Results",
    totalCredits: "Total Credits",
    totalCourses: "Total Courses",
    studyHours: "Weekly Study Hours",
    workload: "Workload Level",
    recommendation: "Recommendation",
    light: "Light",
    moderate: "Moderate",
    heavy: "Heavy",
    extreme: "Extreme",
  },
  tr: {
    title: "Dönem İş Yükü Tahminleyici",
    subtitle: "Optimal performans için ders yükünüzü planlayın",
    addCourse: "Ders Ekle",
    courseName: "Ders Adı",
    credits: "Kredi",
    analyze: "İş Yükünü Analiz Et",
    remove: "Kaldır",
    results: "Analiz Sonuçları",
    totalCredits: "Toplam Kredi",
    totalCourses: "Toplam Ders",
    studyHours: "Haftalık Çalışma Saati",
    workload: "İş Yükü Seviyesi",
    recommendation: "Öneri",
    light: "Hafif",
    moderate: "Orta",
    heavy: "Ağır",
    extreme: "Aşırı",
  },
  ar: {
    title: "مُقدر عبء العمل الفصلي",
    subtitle: "خطط عبء دراستك للحصول على أداء مثالي",
    addCourse: "إضافة دورة",
    courseName: "اسم الدورة",
    credits: "الساعات المعتمدة",
    analyze: "تحليل عبء العمل",
    remove: "إزالة",
    results: "نتائج التحليل",
    totalCredits: "إجمالي الساعات المعتمدة",
    totalCourses: "إجمالي الدورات",
    studyHours: "ساعات الدراسة الأسبوعية",
    workload: "مستوى العبء",
    recommendation: "التوصية",
    light: "خفيف",
    moderate: "معتدل",
    heavy: "ثقيل",
    extreme: "مفرط",
  },
}

export function WorkloadEstimator({ language }: WorkloadEstimatorProps) {
  const t = translations[language]
  const [courses, setCourses] = useState<{ name: string; credits: number }[]>([])
  const [newCourse, setNewCourse] = useState({ name: "", credits: 3 })
  const [analysis, setAnalysis] = useState<WorkloadAnalysis | null>(null)

  const handleAddCourse = () => {
    if (newCourse.name.trim()) {
      setCourses([...courses, newCourse])
      setNewCourse({ name: "", credits: 3 })
      setAnalysis(null)
    }
  }

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index))
    setAnalysis(null)
  }

  const handleAnalyze = () => {
    if (courses.length > 0) {
      const result = analyzeWorkload(courses)
      setAnalysis(result)
    }
  }

  const getWorkloadColor = (level: WorkloadAnalysis["difficultyLevel"]) => {
    switch (level) {
      case "light":
        return "bg-green-500"
      case "moderate":
        return "bg-blue-500"
      case "heavy":
        return "bg-orange-500"
      case "extreme":
        return "bg-red-500"
    }
  }

  const getWorkloadIcon = (level: WorkloadAnalysis["difficultyLevel"]) => {
    switch (level) {
      case "light":
        return <CheckCircle className="w-5 h-5" />
      case "moderate":
        return <Info className="w-5 h-5" />
      case "heavy":
      case "extreme":
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Course Input */}
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="courseName">{t.courseName}</Label>
            <Input
              id="courseName"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              placeholder="e.g., Data Structures"
              onKeyPress={(e) => e.key === "Enter" && handleAddCourse()}
            />
          </div>
          <div className="w-24 space-y-2">
            <Label htmlFor="credits">{t.credits}</Label>
            <Input
              id="credits"
              type="number"
              min="1"
              max="12"
              value={newCourse.credits}
              onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) || 3 })}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddCourse}>
              <Plus className="w-4 h-4 mr-2" />
              {t.addCourse}
            </Button>
          </div>
        </div>

        {/* Course List */}
        {courses.length > 0 && (
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.credits} {t.credits}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveCourse(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button onClick={handleAnalyze} className="w-full mt-4">
              {t.analyze}
            </Button>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold">{t.results}</h4>

            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-accent/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary">{analysis.totalCredits}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.totalCredits}</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary">{analysis.totalCourses}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.totalCourses}</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold text-primary">{analysis.estimatedStudyHours}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.studyHours}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">{t.workload}:</span>
                <Badge className={`${getWorkloadColor(analysis.difficultyLevel)} text-white`}>
                  {getWorkloadIcon(analysis.difficultyLevel)}
                  <span className="ml-2">{t[analysis.difficultyLevel]}</span>
                </Badge>
              </div>

              <Alert>
                {getWorkloadIcon(analysis.difficultyLevel)}
                <AlertDescription>
                  <strong>{t.recommendation}:</strong> {analysis.recommendation[language]}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
