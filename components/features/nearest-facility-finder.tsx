"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Library, Coffee, Dumbbell, Utensils, Wifi } from "lucide-react"
import type { Language } from "@/app/page"

interface NearestFacilityFinderProps {
  currentBuildingId: string
  currentBuildingName: string
  allBuildings: any[]
  language: Language
  onRouteRequest: (fromId: string, toId: string, toName: string) => void
}

const translations = {
  en: {
    title: "Find Nearest",
    subtitle: "Quick access to nearby facilities",
    library: "Library",
    cafeteria: "Cafeteria",
    gym: "Gym",
    restaurant: "Restaurant",
    wifi: "WiFi Spot",
    getDirections: "Get Directions",
    distance: "Approx",
    minutes: "min walk",
  },
  tr: {
    title: "En Yakın Bul",
    subtitle: "Yakındaki tesislere hızlı erişim",
    library: "Kütüphane",
    cafeteria: "Kafeterya",
    gym: "Spor Salonu",
    restaurant: "Restoran",
    wifi: "WiFi Noktası",
    getDirections: "Yol Tarifi Al",
    distance: "Yaklaşık",
    minutes: "dak yürüme",
  },
  ar: {
    title: "ابحث عن الأقرب",
    subtitle: "وصول سريع إلى المرافق القريبة",
    library: "مكتبة",
    cafeteria: "كافتيريا",
    gym: "صالة رياضية",
    restaurant: "مطعم",
    wifi: "نقطة WiFi",
    getDirections: "احصل على الاتجاهات",
    distance: "تقريبًا",
    minutes: "دقيقة مشي",
  },
}

const facilityTypes = [
  { id: "library", icon: Library, color: "text-blue-600" },
  { id: "cafeteria", icon: Coffee, color: "text-orange-600" },
  { id: "gym", icon: Dumbbell, color: "text-green-600" },
  { id: "restaurant", icon: Utensils, color: "text-red-600" },
  { id: "wifi", icon: Wifi, color: "text-purple-600" },
]

export function NearestFacilityFinder({
  currentBuildingId,
  currentBuildingName,
  allBuildings,
  language,
  onRouteRequest,
}: NearestFacilityFinderProps) {
  const t = translations[language]
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)

  const handleFindNearest = (facilityType: string) => {
    // Find nearest building with this facility type
    // For simulation, just pick a random building
    const randomBuilding = allBuildings[Math.floor(Math.random() * allBuildings.length)]
    if (randomBuilding) {
      onRouteRequest(currentBuildingId, randomBuilding.id, randomBuilding.name[language])
      setSelectedFacility(facilityType)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {facilityTypes.map((facility) => {
            const Icon = facility.icon
            const isSelected = selectedFacility === facility.id
            return (
              <Button
                key={facility.id}
                variant={isSelected ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleFindNearest(facility.id)}
              >
                <Icon className={`w-6 h-6 ${isSelected ? "" : facility.color}`} />
                <span className="text-sm">{t[facility.id as keyof typeof t]}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
