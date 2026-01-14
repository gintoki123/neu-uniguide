"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Book, Clock, Award, AlertCircle, ChevronRight } from "lucide-react"
import {
  allAcademicCourses,
  getCoursePrerequisites,
  getCoursesRequiringThis,
  type AcademicCourse,
} from "@/lib/neu-academic-data"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CourseExplorerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: "en" | "tr" | "ar"
}

export function CourseExplorerDialog({ open, onOpenChange, language }: CourseExplorerDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState<"SWE" | "MIS" | "ALL">("ALL")
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL")
  const [selectedType, setSelectedType] = useState<string>("ALL")
  const [selectedCourse, setSelectedCourse] = useState<AcademicCourse | null>(null)

  const filteredCourses = allAcademicCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesProgram = selectedProgram === "ALL" || course.program === selectedProgram
    const matchesYear = selectedYear === "ALL" || course.year === selectedYear
    const matchesType = selectedType === "ALL" || course.type === selectedType

    return matchesSearch && matchesProgram && matchesYear && matchesType
  })

  const prerequisites = selectedCourse ? getCoursePrerequisites(selectedCourse.code) : []
  const requiredBy = selectedCourse ? getCoursesRequiringThis(selectedCourse.code) : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {language === "en" && "Course Explorer"}
            {language === "tr" && "Ders Keşif Aracı"}
            {language === "ar" && "مستكشف الدورات"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "en"
                    ? "Search by course code, name, or description..."
                    : language === "tr"
                      ? "Ders kodu, ad veya açıklama ile ara..."
                      : "ابحث بواسطة رمز الدورة أو الاسم أو الوصف..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <Button
                  variant={selectedProgram === "ALL" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProgram("ALL")}
                >
                  {language === "en" && "All Programs"}
                  {language === "tr" && "Tüm Programlar"}
                  {language === "ar" && "جميع البرامج"}
                </Button>
                <Button
                  variant={selectedProgram === "SWE" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProgram("SWE")}
                >
                  {language === "en" && "Software Engineering"}
                  {language === "tr" && "Yazılım Mühendisliği"}
                  {language === "ar" && "هندسة البرمجيات"}
                </Button>
                <Button
                  variant={selectedProgram === "MIS" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProgram("MIS")}
                >
                  {language === "en" && "MIS"}
                  {language === "tr" && "YBS"}
                  {language === "ar" && "نظم المعلومات الإدارية"}
                </Button>
              </div>

              <div className="flex gap-2">
                {["ALL", 1, 2, 3, 4].map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year as number | "ALL")}
                  >
                    {year === "ALL"
                      ? language === "en"
                        ? "All Years"
                        : language === "tr"
                          ? "Tüm Yıllar"
                          : "كل السنوات"
                      : `${language === "en" ? "Year" : language === "tr" ? "Yıl" : "سنة"} ${year}`}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={selectedType === "ALL" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("ALL")}
                >
                  {language === "en" && "All Types"}
                  {language === "tr" && "Tüm Tipler"}
                  {language === "ar" && "جميع الأنواع"}
                </Button>
                <Button
                  variant={selectedType === "required" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("required")}
                >
                  {language === "en" && "Required"}
                  {language === "tr" && "Zorunlu"}
                  {language === "ar" && "مطلوب"}
                </Button>
                <Button
                  variant={selectedType === "technical-elective" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("technical-elective")}
                >
                  {language === "en" && "Electives"}
                  {language === "tr" && "Seçmeli"}
                  {language === "ar" && "اختياري"}
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {language === "en" && `Found ${filteredCourses.length} courses`}
              {language === "tr" && `${filteredCourses.length} ders bulundu`}
              {language === "ar" && `تم العثور على ${filteredCourses.length} دورة`}
            </div>

            {selectedCourse ? (
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCourse.code}</h3>
                    <p className="text-lg text-muted-foreground">{selectedCourse.name}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
                    {language === "en" && "Back to List"}
                    {language === "tr" && "Listeye Dön"}
                    {language === "ar" && "العودة إلى القائمة"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={selectedCourse.type === "required" ? "default" : "secondary"}>
                    {selectedCourse.type === "required"
                      ? language === "en"
                        ? "Required"
                        : language === "tr"
                          ? "Zorunlu"
                          : "مطلوب"
                      : language === "en"
                        ? "Elective"
                        : language === "tr"
                          ? "Seçmeli"
                          : "اختياري"}
                  </Badge>
                  <Badge variant="outline">{selectedCourse.program}</Badge>
                  <Badge variant="outline">{selectedCourse.semester}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" && "Credits"}
                        {language === "tr" && "Kredi"}
                        {language === "ar" && "ساعات معتمدة"}
                      </p>
                      <p className="font-semibold">{selectedCourse.credits}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">ECTS</p>
                      <p className="font-semibold">{selectedCourse.ects}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" && "Theory"}
                        {language === "tr" && "Teori"}
                        {language === "ar" && "نظرية"}
                      </p>
                      <p className="font-semibold">{selectedCourse.theory}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" && "Lab"}
                        {language === "tr" && "Lab"}
                        {language === "ar" && "مختبر"}
                      </p>
                      <p className="font-semibold">{selectedCourse.lab}h</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {language === "en" && "Description"}
                    {language === "tr" && "Açıklama"}
                    {language === "ar" && "وصف"}
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                </div>

                {selectedCourse.prerequisite && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <span className="font-semibold">
                        {language === "en" && "Prerequisite: "}
                        {language === "tr" && "Ön Koşul: "}
                        {language === "ar" && "المتطلبات الأساسية: "}
                      </span>
                      {selectedCourse.prerequisite}
                    </AlertDescription>
                  </Alert>
                )}

                {prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">
                      {language === "en" && "Prerequisite Chain"}
                      {language === "tr" && "Ön Koşul Zinciri"}
                      {language === "ar" && "سلسلة المتطلبات الأساسية"}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {prerequisites.reverse().map((prereq, index) => (
                        <div key={prereq.code} className="flex items-center gap-2">
                          <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCourse(prereq)}>
                            {prereq.code}
                          </Badge>
                          {index < prerequisites.length - 1 && <ChevronRight className="h-4 w-4" />}
                        </div>
                      ))}
                      <ChevronRight className="h-4 w-4" />
                      <Badge>{selectedCourse.code}</Badge>
                    </div>
                  </div>
                )}

                {requiredBy.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">
                      {language === "en" && "Required For"}
                      {language === "tr" && "Gerekli Olan"}
                      {language === "ar" && "مطلوب لـ"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {requiredBy.map((course) => (
                        <Badge
                          key={course.code}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setSelectedCourse(course)}
                        >
                          {course.code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-2 max-h-[500px] overflow-y-auto">
                {filteredCourses.map((course) => (
                  <div
                    key={course.code}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{course.code}</h4>
                          <Badge variant={course.type === "required" ? "default" : "secondary"} className="text-xs">
                            {course.type === "required"
                              ? language === "en"
                                ? "Required"
                                : language === "tr"
                                  ? "Zorunlu"
                                  : "مطلوب"
                              : language === "en"
                                ? "Elective"
                                : language === "tr"
                                  ? "Seçmeli"
                                  : "اختياري"}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{course.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{course.semester}</span>
                          <span>{course.credits} Credits</span>
                          <span>{course.ects} ECTS</span>
                          {course.prerequisite && (
                            <span className="text-amber-600">Prerequisite: {course.prerequisite}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
