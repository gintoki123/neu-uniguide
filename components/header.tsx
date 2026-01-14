"use client"

import { useState, useEffect } from "react"
import { Menu, Star, Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTheme, toggleTheme, getFavorites } from "@/lib/storage"

interface HeaderProps {
  currentSection: string
  onNavigate: (section: string) => void
  language: "en" | "tr"
  onLanguageChange: (lang: "en" | "tr") => void
}

export function Header({ currentSection, onNavigate, language, onLanguageChange }: HeaderProps) {
  const [theme, setThemeState] = useState<"light" | "dark">("light")
  const [favCount, setFavCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setThemeState(getTheme())
    setFavCount(getFavorites().length)

    const interval = setInterval(() => {
      setFavCount(getFavorites().length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = toggleTheme()
    setThemeState(newTheme)
  }

  const navItems = [
    { id: "dashboard", icon: "🏠", label: language === "tr" ? "Panel" : "Dashboard" },
    { id: "map", icon: "🗺️", label: language === "tr" ? "Harita" : "Map" },
    { id: "search", icon: "🔍", label: language === "tr" ? "Ara" : "Search" },
    { id: "doctors", icon: "👨‍⚕️", label: language === "tr" ? "Doktorlar" : "Doctors" },
    { id: "chatbot", icon: "💬", label: language === "tr" ? "Sohbet" : "Chat" },
    { id: "admin", icon: "⚙️", label: language === "tr" ? "Yönetim" : "Admin" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <span className="text-lg font-bold text-white">NEU</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">
                {language === "tr" ? "Yakın Doğu Üniversitesi" : "Near East University"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {language === "tr" ? "Akıllı Navigasyon" : "Smart Navigation"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentSection === item.id ? "default" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className="gap-2"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(language === "en" ? "tr" : "en")}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language === "en" ? "TR" : "EN"}</span>
            </Button>

            {/* Theme Toggle */}
            <Button variant="outline" size="sm" onClick={handleThemeToggle}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Favorites */}
            <Button variant="outline" size="sm" onClick={() => onNavigate("favorites")} className="gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">{favCount}</span>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className="justify-start gap-2"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
