"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/app/page"

interface FloatingChatButtonProps {
  onClick: () => void
  language: Language
}

const labels = {
  en: "AI Assistant",
  tr: "Yapay Zeka",
  ar: "مساعد الذكاء",
}

export function FloatingChatButton({ onClick, language }: FloatingChatButtonProps) {
  return (
    <Button onClick={onClick} size="lg" className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 px-6 z-40">
      <MessageSquare className="w-5 h-5 mr-2" />
      {labels[language]}
    </Button>
  )
}
