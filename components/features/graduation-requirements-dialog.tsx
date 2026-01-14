"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { programRequirements, allAcademicCourses } from "@/lib/neu-academic-data"
import { Award, BookOpen, GraduationCap, Clock, CheckCircle } from "lucide-react"

interface GraduationRequirementsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: "en" | "tr" | "ar"
}

export function GraduationRequirementsDialog({ open, onOpenChange, language }: GraduationRequirementsDialogProps) {
  const sweReq = programRequirements[0]
  const misReq = programRequirements[1]

  const renderRequirements = (req: typeof sweReq, program: "SWE" | "MIS") => {
    const requiredCourses = allAcademicCourses.filter((c) => c.program === program && c.type === "required")
    const electiveCourses = allAcademicCourses.filter((c) => c.program === program && c.type !== "required")

    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {language === "en" && "Program Overview"}
            {language === "tr" && "Program Genel Bakış"}
            {language === "ar" && "نظرة عامة على البرنامج"}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{req.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{req.totalCredits}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" && "Total Credits Required"}
                    {language === "tr" && "Toplam Gerekli Kredi"}
                    {language === "ar" && "إجمالي الاعتمادات المطلوبة"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{req.totalECTS}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" && "Total ECTS Required"}
                    {language === "tr" && "Toplam Gerekli ECTS"}
                    {language === "ar" && "إجمالي ECTS المطلوبة"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{requiredCourses.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" && "Required Courses"}
                    {language === "tr" && "Zorunlu Dersler"}
                    {language === "ar" && "الدورات المطلوبة"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{req.minGPA}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" && "Minimum GPA"}
                    {language === "tr" && "Minimum GPA"}
                    {language === "ar" && "الحد الأدنى للمعدل التراكمي"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {language === "en" && "Course Requirements"}
            {language === "tr" && "Ders Gereksinimleri"}
            {language === "ar" && "متطلبات الدورة"}
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === "en" && "Required Courses"}
                  {language === "tr" && "Zorunlu Dersler"}
                  {language === "ar" && "الدورات المطلوبة"}
                </span>
                <span className="text-sm text-muted-foreground">{requiredCourses.length} courses</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === "en" && "Technical Electives"}
                  {language === "tr" && "Teknik Seçmeli"}
                  {language === "ar" && "الاختيارية الفنية"}
                </span>
                <span className="text-sm text-muted-foreground">{req.technicalElectives} required</span>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {language === "en" &&
                  `Choose ${req.technicalElectives} from ${electiveCourses.length} available electives`}
                {language === "tr" &&
                  `${electiveCourses.length} mevcut seçmeli dersten ${req.technicalElectives} seçin`}
                {language === "ar" && `اختر ${req.technicalElectives} من ${electiveCourses.length} اختيارية متاحة`}
              </p>
            </div>
          </div>
        </Card>

        {program === "SWE" && (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              {language === "en" && "Additional Requirements"}
              {language === "tr" && "Ek Gereksinimler"}
              {language === "ar" && "متطلبات إضافية"}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {language === "en" && "Summer Training"}
                    {language === "tr" && "Yaz Stajı"}
                    {language === "ar" && "التدريب الصيفي"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" &&
                      "Two summer training periods (40 working days each) in manufacturing or service organizations"}
                    {language === "tr" &&
                      "Üretim veya hizmet kuruluşlarında iki yaz stajı dönemi (her biri 40 iş günü)"}
                    {language === "ar" && "فترتا تدريب صيفي (40 يوم عمل لكل منهما) في منظمات التصنيع أو الخدمات"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {language === "en" && "Graduation Project"}
                    {language === "tr" && "Bitirme Projesi"}
                    {language === "ar" && "مشروع التخرج"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" &&
                      "Two-semester graduation project (SWE491 and SWE492) with technical report and oral presentation"}
                    {language === "tr" &&
                      "Teknik rapor ve sözlü sunum ile iki dönemlik bitirme projesi (SWE491 ve SWE492)"}
                    {language === "ar" && "مشروع تخرج من فصلين دراسيين (SWE491 و SWE492) مع تقرير فني وعرض شفهي"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-primary/5">
          <h3 className="text-xl font-bold mb-4">
            {language === "en" && "Academic Rules"}
            {language === "tr" && "Akademik Kurallar"}
            {language === "ar" && "القواعد الأكاديمية"}
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span>
                {language === "en" && "Students must maintain a minimum CGPA of 2.0 to graduate"}
                {language === "tr" && "Mezun olmak için öğrenciler minimum 2.0 CGPA'yı korumalıdır"}
                {language === "ar" && "يجب على الطلاب الحفاظ على معدل تراكمي 2.0 على الأقل للتخرج"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span>
                {language === "en" && "All required courses must be passed with a minimum grade of D"}
                {language === "tr" && "Tüm zorunlu dersler en az D notu ile geçilmelidir"}
                {language === "ar" && "يجب اجتياز جميع الدورات المطلوبة بدرجة لا تقل عن D"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span>
                {language === "en" && "Prerequisites must be completed before enrolling in advanced courses"}
                {language === "tr" && "İleri düzey derslere kaydolmadan önce ön koşullar tamamlanmalıdır"}
                {language === "ar" && "يجب إكمال المتطلبات الأساسية قبل التسجيل في الدورات المتقدمة"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span>
                {language === "en" && "Maximum study duration is 7 years for bachelor's degree programs"}
                {language === "tr" && "Lisans programları için maksimum çalışma süresi 7 yıldır"}
                {language === "ar" && "الحد الأقصى لمدة الدراسة هو 7 سنوات لبرامج البكالوريوس"}
              </span>
            </li>
          </ul>
        </Card>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {language === "en" && "Graduation Requirements"}
            {language === "tr" && "Mezuniyet Gereksinimleri"}
            {language === "ar" && "متطلبات التخرج"}
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

          <TabsContent value="swe" className="mt-6">
            {renderRequirements(sweReq, "SWE")}
          </TabsContent>

          <TabsContent value="mis" className="mt-6">
            {renderRequirements(misReq, "MIS")}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
