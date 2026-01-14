"use client"

import { useState } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Language } from "@/app/page"

interface VoiceAssistantProps {
  language: Language
  onResponse: (query: string) => Promise<string>
}

export function VoiceAssistant({ language, onResponse }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)

  const titles = {
    en: "Voice Assistant",
    tr: "Sesli Asistan",
    ar: "مساعد صوتي",
  }

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert(
        language === "en"
          ? "Voice input not supported in your browser"
          : language === "tr"
            ? "Tarayıcınızda sesli giriş desteklenmiyor"
            : "المتصفح الخاص بك لا يدعم الإدخال الصوتي",
      )
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = language === "en" ? "en-US" : language === "tr" ? "tr-TR" : "ar-SA"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
      setResponse("")
    }

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      setIsListening(false)

      // Get AI response
      const aiResponse = await onResponse(text)
      setResponse(aiResponse)

      // Speak the response
      speakText(aiResponse)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-US" : language === "tr" ? "tr-TR" : "ar-SA"
      utterance.rate = 1.0
      utterance.pitch = 1.0

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titles[language]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={startListening} disabled={isListening} className="flex-1">
            {isListening ? <MicOff className="w-4 h-4 mr-2 animate-pulse" /> : <Mic className="w-4 h-4 mr-2" />}
            {isListening
              ? language === "en"
                ? "Listening..."
                : language === "tr"
                  ? "Dinliyor..."
                  : "جارٍ الاستماع..."
              : language === "en"
                ? "Start Voice Query"
                : language === "tr"
                  ? "Sesli Sorgu Başlat"
                  : "ابدأ الاستعلام الصوتي"}
          </Button>
          {isSpeaking && (
            <Button onClick={stopSpeaking} variant="destructive">
              <Volume2 className="w-4 h-4 mr-2" />
              {language === "en" ? "Stop" : language === "tr" ? "Durdur" : "توقف"}
            </Button>
          )}
        </div>

        {transcript && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">
              {language === "en" ? "You said:" : language === "tr" ? "Söylediniz:" : "قلت:"}
            </p>
            <p className="text-sm">{transcript}</p>
          </div>
        )}

        {response && (
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-sm font-semibold">
              {language === "en" ? "Assistant:" : language === "tr" ? "Asistan:" : "المساعد:"}
            </p>
            <p className="text-sm">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
