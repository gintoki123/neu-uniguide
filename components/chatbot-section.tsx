"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, MapPin, Clock, Phone, Mail } from "lucide-react"
import { processChatbotQuery, getChatSuggestions, type ChatMessage } from "@/lib/chatbot"
import type { Doctor, Building, Facility } from "@/lib/data"

interface ChatbotSectionProps {
  language: "en" | "tr"
}

export function ChatbotSection({ language }: ChatbotSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const t =
    language === "tr"
      ? {
          title: "Akıllı Kampüs Asistanı",
          subtitle: "Size nasıl yardımcı olabilirim?",
          placeholder: "Bir şeyler sorun...",
          send: "Gönder",
          suggestions: "Önerilen sorular:",
          typing: "Yazıyor...",
        }
      : {
          title: "Smart Campus Assistant",
          subtitle: "How can I help you today?",
          placeholder: "Ask me anything...",
          send: "Send",
          suggestions: "Suggested questions:",
          typing: "Typing...",
        }

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content:
          language === "tr"
            ? "Merhaba! Size kampüs hakkında yardımcı olabilirim. Doktor bilgileri, bina konumları veya yol tarifleri hakkında soru sorabilirsiniz."
            : "Hello! I can help you navigate the campus. Ask me about doctor information, building locations, or directions.",
        timestamp: new Date(),
      }
      setMessages([welcomeMsg])
    }
  }, [language, messages.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const response = await processChatbotQuery(input, language)

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.message,
      timestamp: new Date(),
      data: {
        type: response.type,
        items: response.data,
      },
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const suggestions = getChatSuggestions(language)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>{t.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <ScrollArea ref={scrollRef} className="h-[500px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user" ? "bg-blue-600" : "bg-muted"
                    }`}
                  >
                    {message.role === "user" ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className={`flex-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {/* Render data cards */}
                    {message.data && message.data.items && (
                      <div className="mt-3 space-y-2">
                        {message.data.type === "doctor" &&
                          message.data.items.map((doctor: Doctor) => (
                            <Card key={doctor.id} className="text-left">
                              <CardContent className="pt-4">
                                <h4 className="font-bold mb-2">{doctor.name}</h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{doctor.department}</Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    <span>
                                      {doctor.building} - Floor {doctor.floor}, Room {doctor.room}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{doctor.office_hours}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-3 w-3" />
                                    <span>{doctor.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-3 w-3" />
                                    <span>{doctor.phone}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                        {message.data.type === "building" &&
                          message.data.items.map((building: Building) => (
                            <Card key={building.id} className="text-left">
                              <CardContent className="pt-4">
                                <h4 className="font-bold mb-2">
                                  {building.name} {building.icon}
                                </h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <p>{building.description}</p>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    <span>
                                      {building.location} • {building.floors} floors
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{building.hours}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {building.departments.map((dept, i) => (
                                      <Badge key={i} variant="outline">
                                        {dept}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                        {message.data.type === "facility" &&
                          message.data.items.map((facility: Facility) => (
                            <Card key={facility.id} className="text-left">
                              <CardContent className="pt-4">
                                <h4 className="font-bold mb-2">{facility.name}</h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <p>{facility.description}</p>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{facility.hours}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    <span>{facility.location}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                        {message.data.type === "directions" && (
                          <Card className="text-left">
                            <CardContent className="pt-4">
                              <h4 className="font-bold mb-3">
                                {message.data.items.from} → {message.data.items.to}
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{message.data.items.time} walk</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>{message.data.items.distance}</span>
                                </div>
                                <ol className="list-decimal list-inside space-y-1 mt-3">
                                  {message.data.items.steps?.map((step: string, i: number) => (
                                    <li key={i}>{step}</li>
                                  ))}
                                </ol>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.data?.data?.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">{t.suggestions}</p>
                        <div className="flex flex-wrap gap-2">
                          {message.data.data.suggestions.map((suggestion: string, i: number) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              onClick={() => setInput(suggestion)}
                              className="text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion, i) => (
              <Button key={i} variant="outline" size="sm" onClick={() => setInput(suggestion)} className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                {suggestion}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.placeholder}
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
