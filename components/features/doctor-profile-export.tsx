"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Printer, FileText, Share2 } from "lucide-react"
import type { Language } from "@/app/page"
import type { Doctor } from "@/lib/massive-data"

interface DoctorProfileExportProps {
  doctor: Doctor
  language: Language
}

const translations = {
  en: {
    export: "Export",
    print: "Print Profile",
    downloadPdf: "Download as PDF",
    downloadText: "Download as Text",
    copyLink: "Copy Profile Link",
    copied: "Copied!",
  },
  tr: {
    export: "Dışa Aktar",
    print: "Profili Yazdır",
    downloadPdf: "PDF olarak İndir",
    downloadText: "Metin olarak İndir",
    copyLink: "Profil Bağlantısını Kopyala",
    copied: "Kopyalandı!",
  },
  ar: {
    export: "تصدير",
    print: "طباعة الملف الشخصي",
    downloadPdf: "تنزيل كـ PDF",
    downloadText: "تنزيل كنص",
    copyLink: "نسخ رابط الملف الشخصي",
    copied: "تم النسخ!",
  },
}

export function DoctorProfileExport({ doctor, language }: DoctorProfileExportProps) {
  const t = translations[language]

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>${doctor.name[language]} - Profile</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #333; margin-bottom: 10px; }
            h2 { color: #666; font-size: 16px; font-weight: normal; margin-top: 0; }
            .section { margin: 20px 0; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
          </style>
        </head>
        <body>
          <h1>${doctor.name[language]}</h1>
          <h2>${doctor.title[language]}</h2>
          
          <div class="section">
            <p><span class="label">Department:</span><span class="value">${doctor.department[language]}</span></p>
            <p><span class="label">Faculty:</span><span class="value">${doctor.faculty[language]}</span></p>
          </div>
          
          <div class="section">
            <p><span class="label">Location:</span><span class="value">${doctor.building[language]}, Floor ${doctor.floor}, Room ${doctor.room}</span></p>
            <p><span class="label">Office Hours:</span><span class="value">${doctor.officeHours[language]}</span></p>
          </div>
          
          <div class="section">
            <p><span class="label">Email:</span><span class="value">${doctor.email}</span></p>
            <p><span class="label">Phone:</span><span class="value">${doctor.phone}</span></p>
          </div>
        </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }
  }

  const handleDownloadText = () => {
    const textContent = `
${doctor.name[language]}
${doctor.title[language]}

Department: ${doctor.department[language]}
Faculty: ${doctor.faculty[language]}

Location: ${doctor.building[language]}, Floor ${doctor.floor}, Room ${doctor.room}
Office Hours: ${doctor.officeHours[language]}

Contact:
Email: ${doctor.email}
Phone: ${doctor.phone}

Generated from Near East University UniGuide
    `.trim()

    const blob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${doctor.name.en.replace(/\s+/g, "_")}_profile.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}?section=doctors&doctor=${doctor.id}`
    navigator.clipboard.writeText(link)
    alert(t.copied)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          {t.export}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          {t.print}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadText}>
          <FileText className="w-4 h-4 mr-2" />
          {t.downloadText}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <Share2 className="w-4 h-4 mr-2" />
          {t.copyLink}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
