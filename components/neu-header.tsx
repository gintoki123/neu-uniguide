"use client"

import { Moon, Sun, Menu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/app/page"

interface NEUHeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  theme: "light" | "dark"
  onThemeToggle: () => void
  sidebarOpen: boolean
  onSidebarToggle: () => void
}

const languageLabels = {
  en: "English",
  tr: "Türkçe",
  ar: "العربية",
}

export function NEUHeader({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  sidebarOpen,
  onSidebarToggle,
}: NEUHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 animate-in slide-in-from-top duration-500">
      <div className="flex items-center gap-4 p-4">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:scale-110 transition-transform duration-200"
          onClick={onSidebarToggle}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">
            {language === "en" ? "NEU UniGuide" : language === "tr" ? "NEU Kampüs Rehberi" : "دليل NEU الجامعي"}
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in fade-in slide-in-from-top-2 duration-200">
              <DropdownMenuItem
                onClick={() => onLanguageChange("en")}
                className="cursor-pointer hover:scale-105 transition-transform duration-150"
              >
                {languageLabels.en}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onLanguageChange("tr")}
                className="cursor-pointer hover:scale-105 transition-transform duration-150"
              >
                {languageLabels.tr}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onLanguageChange("ar")}
                className="cursor-pointer hover:scale-105 transition-transform duration-150"
              >
                {languageLabels.ar}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="hover:scale-110 hover:rotate-180 transition-all duration-300"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
