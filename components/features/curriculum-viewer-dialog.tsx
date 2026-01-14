"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getCoursesBySemester } from "@/lib/neu-academic-data"
import { Book, Award } from "lucide-react"

interface CurriculumViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: "en" | "tr" | "ar"
}

export function CurriculumViewerDialog({ open, onOpenChange, language }: CurriculumViewerDialogProps) {
  const renderSemester = (program: "SWE" | "MIS", semesterNum: number, semesterName: string) => {
    const courses = getCoursesBySemester(program, semesterNum)
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
    const totalECTS = courses.reduce((sum, c) => sum + c.ects, 0)

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{semesterName}</h4>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              {totalCredits} Credits
            </span>
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              {totalECTS} ECTS
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          {courses.map((course) => (
            <Card key={course.code} className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold">{course.code}</span>
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
                    {course.prerequisite && (
                      <Badge variant="outline" className="text-xs">
                        Prereq: {course.prerequisite}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">{course.name}</p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{course.theory}h Theory</span>
                    {course.lab > 0 && <span>{course.lab}h Lab</span>}
                    <span>{course.credits} Credits</span>
                    <span>{course.ects} ECTS</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {language === "en" && "Curriculum & Study Plan"}
            {language === "tr" && "Müfredat ve Çalışma Planı"}
            {language === "ar" && "المناهج وخطة الدراسة"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="swe" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="swe">
              {language === "en" && "Software Engineering"}
              {language === "tr" && "Yazılım Mühendisliği"}
              {language === "ar" && "هندسة البرمجيات"}
            </TabsTrigger>
            <TabsTrigger value="mis">
              {language === "en" && "Management Information Systems"}
              {language === "tr" && "Yönetim Bilişim Sistemleri"}
              {language === "ar" && "نظم المعلومات الإدارية"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="swe" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  1,
                  language === "en"
                    ? "1st Year - Fall Semester"
                    : language === "tr"
                      ? "1. Yıl - Güz Dönemi"
                      : "السنة الأولى - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  2,
                  language === "en"
                    ? "1st Year - Spring Semester"
                    : language === "tr"
                      ? "1. Yıl - Bahar Dönemi"
                      : "السنة الأولى - الفصل الربيعي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  3,
                  language === "en"
                    ? "2nd Year - Fall Semester"
                    : language === "tr"
                      ? "2. Yıl - Güz Dönemi"
                      : "السنة الثانية - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  4,
                  language === "en"
                    ? "2nd Year - Spring Semester"
                    : language === "tr"
                      ? "2. Yıl - Bahar Dönemi"
                      : "السنة الثانية - الفصل الربيعي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  5,
                  language === "en"
                    ? "3rd Year - Fall Semester"
                    : language === "tr"
                      ? "3. Yıl - Güz Dönemi"
                      : "السنة الثالثة - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  6,
                  language === "en"
                    ? "3rd Year - Spring Semester"
                    : language === "tr"
                      ? "3. Yıl - Bahar Dönemi"
                      : "السنة الثالثة - الفصل الربيعي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  7,
                  language === "en"
                    ? "4th Year - Fall Semester"
                    : language === "tr"
                      ? "4. Yıl - Güz Dönemi"
                      : "السنة الرابعة - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "SWE",
                  8,
                  language === "en"
                    ? "4th Year - Spring Semester"
                    : language === "tr"
                      ? "4. Yıl - Bahar Dönemi"
                      : "السنة الرابعة - الفصل الربيعي",
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mis" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  1,
                  language === "en"
                    ? "1st Year - Fall Semester"
                    : language === "tr"
                      ? "1. Yıl - Güz Dönemi"
                      : "السنة الأولى - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  2,
                  language === "en"
                    ? "1st Year - Spring Semester"
                    : language === "tr"
                      ? "1. Yıl - Bahar Dönemi"
                      : "السنة الأولى - الفصل الربيعي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  3,
                  language === "en"
                    ? "2nd Year - Fall Semester"
                    : language === "tr"
                      ? "2. Yıl - Güz Dönemi"
                      : "السنة الثانية - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  4,
                  language === "en"
                    ? "2nd Year - Spring Semester"
                    : language === "tr"
                      ? "2. Yıl - Bahar Dönemi"
                      : "السنة الثانية - الفصل الربيعي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  5,
                  language === "en"
                    ? "3rd Year - Fall Semester"
                    : language === "tr"
                      ? "3. Yıl - Güz Dönemi"
                      : "السنة الثالثة - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  6,
                  language === "en"
                    ? "3rd Year - Spring Semester"
                    : language === "tr"
                      ? "3. Yıl - Bahar Dönemi"
                      : "السنة الثالثة - الفصل الربيعي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  7,
                  language === "en"
                    ? "4th Year - Fall Semester"
                    : language === "tr"
                      ? "4. Yıl - Güz Dönemi"
                      : "السنة الرابعة - الفصل الخريفي",
                )}
              </div>
              <div className="space-y-4">
                {renderSemester(
                  "MIS",
                  8,
                  language === "en"
                    ? "4th Year - Spring Semester"
                    : language === "tr"
                      ? "4. Yıl - Bahar Dönemi"
                      : "السنة الرابعة - الفصل الربيعي",
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
