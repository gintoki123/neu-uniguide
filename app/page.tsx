"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/neu-sidebar"
import { NEUHeader } from "@/components/neu-header"
import { DashboardView } from "@/components/views/dashboard-view"
import { DoctorsView } from "@/components/views/doctors-view"
import { DepartmentsView } from "@/components/views/departments-view"
import { BuildingsView } from "@/components/views/buildings-view"
import { FacilitiesView } from "@/components/views/facilities-view"
import { MapView } from "@/components/views/map-view"
import { ToolsView } from "@/components/views/tools-view"
import { ChatbotView } from "@/components/views/chatbot-view"
import { AdminView } from "@/components/views/admin-view"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { getTheme, setTheme as saveTheme } from "@/lib/storage"

export type Language = "en" | "tr" | "ar"
export type Section =
  | "dashboard"
  | "doctors"
  | "departments"
  | "buildings"
  | "facilities"
  | "map"
  | "tools"
  | "chatbot"
  | "admin"

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("dashboard")
  const [language, setLanguage] = useState<Language>("en")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Initialize theme
    const savedTheme = getTheme()
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    saveTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const renderView = () => {
    switch (currentSection) {
      case "dashboard":
        return <DashboardView language={language} onNavigate={setCurrentSection} />
      case "doctors":
        return <DoctorsView language={language} />
      case "departments":
        return <DepartmentsView language={language} />
      case "buildings":
        return <BuildingsView language={language} />
      case "facilities":
        return <FacilitiesView language={language} />
      case "map":
        return <MapView language={language} />
      case "tools":
        return <ToolsView language={language} />
      case "chatbot":
        return <ChatbotView language={language} />
      case "admin":
        return <AdminView language={language} />
      default:
        return <DashboardView language={language} onNavigate={setCurrentSection} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        language={language}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <NEUHeader
          language={language}
          onLanguageChange={setLanguage}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{renderView()}</main>
      </div>

      {/* Floating Chat Button */}
      {currentSection !== "chatbot" && (
        <FloatingChatButton onClick={() => setCurrentSection("chatbot")} language={language} />
      )}
    </div>
  )
}
