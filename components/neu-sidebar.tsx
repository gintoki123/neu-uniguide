"use client"

import { Home, Users, Building2, MapPin, Wrench, MessageSquare, Shield, GraduationCap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NEULogo } from "@/components/neu-logo"
import { cn } from "@/lib/utils"
import type { Language, Section } from "@/app/page"

interface SidebarProps {
  currentSection: Section
  onNavigate: (section: Section) => void
  isOpen: boolean
  onToggle: () => void
  language: Language
}

const menuItems = {
  en: [
    { id: "dashboard" as Section, label: "Dashboard", icon: Home },
    { id: "doctors" as Section, label: "Doctors", icon: Users },
    { id: "departments" as Section, label: "Departments", icon: GraduationCap },
    { id: "buildings" as Section, label: "Buildings", icon: Building2 },
    { id: "facilities" as Section, label: "Facilities", icon: MapPin },
    { id: "map" as Section, label: "Campus Map", icon: MapPin },
    { id: "tools" as Section, label: "Tools", icon: Wrench },
    { id: "chatbot" as Section, label: "AI Assistant", icon: MessageSquare },
    { id: "admin" as Section, label: "Admin", icon: Shield },
  ],
  tr: [
    { id: "dashboard" as Section, label: "Panel", icon: Home },
    { id: "doctors" as Section, label: "Doktorlar", icon: Users },
    { id: "departments" as Section, label: "Bölümler", icon: GraduationCap },
    { id: "buildings" as Section, label: "Binalar", icon: Building2 },
    { id: "facilities" as Section, label: "Tesisler", icon: MapPin },
    { id: "map" as Section, label: "Kampüs Haritası", icon: MapPin },
    { id: "tools" as Section, label: "Araçlar", icon: Wrench },
    { id: "chatbot" as Section, label: "Yapay Zeka", icon: MessageSquare },
    { id: "admin" as Section, label: "Yönetim", icon: Shield },
  ],
  ar: [
    { id: "dashboard" as Section, label: "لوحة التحكم", icon: Home },
    { id: "doctors" as Section, label: "الأطباء", icon: Users },
    { id: "departments" as Section, label: "الأقسام", icon: GraduationCap },
    { id: "buildings" as Section, label: "المباني", icon: Building2 },
    { id: "facilities" as Section, label: "المرافق", icon: MapPin },
    { id: "map" as Section, label: "خريطة الحرم", icon: MapPin },
    { id: "tools" as Section, label: "الأدوات", icon: Wrench },
    { id: "chatbot" as Section, label: "مساعد الذكاء", icon: MessageSquare },
    { id: "admin" as Section, label: "الإدارة", icon: Shield },
  ],
}

export function Sidebar({ currentSection, onNavigate, isOpen, onToggle, language }: SidebarProps) {
  const items = menuItems[language]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {isOpen ? (
              <NEULogo
                size="sm"
                showText={true}
                className="flex-1 animate-in fade-in slide-in-from-left duration-300"
              />
            ) : (
              <NEULogo size="sm" showText={false} className="mx-auto" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:scale-110 transition-transform duration-200"
              onClick={onToggle}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {items.map((item, i) => {
                const Icon = item.icon
                const isActive = currentSection === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 transition-all duration-200",
                      !isOpen && "lg:justify-center lg:px-2",
                      isActive && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg scale-105",
                      !isActive && "hover:scale-105 hover:bg-accent",
                      "animate-in fade-in slide-in-from-left",
                    )}
                    style={{ animationDelay: `${i * 50}ms` }}
                    onClick={() => {
                      onNavigate(item.id)
                      if (window.innerWidth < 1024) {
                        onToggle()
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex w-full justify-center hover:scale-110 transition-transform duration-200"
              onClick={onToggle}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
