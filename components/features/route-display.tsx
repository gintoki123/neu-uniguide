"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Navigation, Accessibility, MapPin } from "lucide-react"
import type { Language } from "@/app/page"
import type { Route } from "@/lib/map-routing-data"

interface RouteDisplayProps {
  route: Route
  language: Language
  fromName: string
  toName: string
}

const translations = {
  en: {
    title: "Route Guidance",
    from: "From",
    to: "To",
    distance: "Distance",
    duration: "Estimated Time",
    accessible: "Wheelchair Accessible",
    steps: "Directions",
    meters: "meters",
    minutes: "minutes",
    step: "Step",
  },
  tr: {
    title: "Rota Rehberi",
    from: "Başlangıç",
    to: "Hedef",
    distance: "Mesafe",
    duration: "Tahmini Süre",
    accessible: "Tekerlekli Sandalye Erişimi",
    steps: "Yol Tarifi",
    meters: "metre",
    minutes: "dakika",
    step: "Adım",
  },
  ar: {
    title: "إرشادات الطريق",
    from: "من",
    to: "إلى",
    distance: "المسافة",
    duration: "الوقت المقدر",
    accessible: "يمكن الوصول بالكرسي المتحرك",
    steps: "الاتجاهات",
    meters: "متر",
    minutes: "دقائق",
    step: "خطوة",
  },
}

export function RouteDisplay({ route, language, fromName, toName }: RouteDisplayProps) {
  const t = translations[language]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>
          {fromName} → {toName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Route Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-accent">
            <p className="text-2xl font-bold text-primary">{route.distance}</p>
            <p className="text-xs text-muted-foreground">{t.meters}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-accent">
            <p className="text-2xl font-bold text-primary">{route.duration}</p>
            <p className="text-xs text-muted-foreground">{t.minutes}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-accent">
            {route.accessibilityFriendly ? (
              <Accessibility className="w-8 h-8 mx-auto text-green-600" />
            ) : (
              <div className="w-8 h-8 mx-auto" />
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {route.accessibilityFriendly ? t.accessible : "Standard"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Step-by-step directions */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t.steps}
          </h4>
          <div className="space-y-3">
            {route.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < route.steps.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium">{step.instruction[language]}</p>
                  {step.landmark && (
                    <p className="text-sm text-muted-foreground italic mt-1">{step.landmark[language]}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.distance} {t.meters}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
