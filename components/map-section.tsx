"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation, Clock, Star } from "lucide-react"
import { buildings, type Building } from "@/lib/data"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/storage"

interface MapSectionProps {
  language: "en" | "tr"
}

export function MapSection({ language }: MapSectionProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [showRoute, setShowRoute] = useState(false)

  const t =
    language === "tr"
      ? {
          title: "İnteraktif Kampüs Haritası",
          subtitle: "Detaylar için binalara tıklayın veya rota planlayıcıyı kullanın",
          routePlanner: "Rota Planlayıcı",
          from: "Başlangıç:",
          to: "Varış:",
          selectStart: "Başlangıç noktası seçin",
          selectDest: "Hedef seçin",
          getRoute: "Rota Al",
          clear: "Temizle",
          estimatedTime: "Tahmini süre:",
          walkingTime: "8-10 dakika yürüyüş",
          buildingInfo: "Bina Bilgileri",
          type: "Tip",
          floors: "Katlar",
          hours: "Çalışma Saatleri",
          departments: "Bölümler",
          showOnMap: "Haritada Göster",
        }
      : {
          title: "Interactive Campus Map",
          subtitle: "Click on buildings for details or use route planner",
          routePlanner: "Route Planner",
          from: "From:",
          to: "To:",
          selectStart: "Select starting point",
          selectDest: "Select destination",
          getRoute: "Get Route",
          clear: "Clear",
          estimatedTime: "Estimated time:",
          walkingTime: "8-10 minute walk",
          buildingInfo: "Building Information",
          type: "Type",
          floors: "Floors",
          hours: "Hours",
          departments: "Departments",
          showOnMap: "Show on Map",
        }

  const handleGetRoute = () => {
    if (fromLocation && toLocation) {
      setShowRoute(true)
    }
  }

  const handleClear = () => {
    setFromLocation("")
    setToLocation("")
    setShowRoute(false)
  }

  const toggleFavorite = (building: Building) => {
    if (isFavorite("building", building.id)) {
      removeFavorite(`building-${building.id}`)
    } else {
      addFavorite("building", building)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
      </Card>

      {/* Route Planner */}
      <Card>
        <CardHeader>
          <CardTitle>{t.routePlanner}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t.from}</label>
              <Select value={fromLocation} onValueChange={setFromLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStart} />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.icon} {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.to}</label>
              <Select value={toLocation} onValueChange={setToLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectDest} />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.icon} {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button onClick={handleGetRoute} disabled={!fromLocation || !toLocation}>
              <Navigation className="h-4 w-4 mr-2" />
              {t.getRoute}
            </Button>
            <Button variant="outline" onClick={handleClear}>
              {t.clear}
            </Button>
          </div>

          {showRoute && (
            <Card className="mt-4 bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">
                    {buildings.find((b) => b.id === fromLocation)?.name} →{" "}
                    {buildings.find((b) => b.id === toLocation)?.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t.estimatedTime} <strong>{t.walkingTime}</strong>
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Campus Map Grid */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500px]">
            {buildings.map((building) => (
              <Card
                key={building.id}
                className={`cursor-pointer hover:shadow-lg transition-all ${building.color} ${selectedBuilding?.id === building.id ? "ring-2 ring-blue-600" : ""}`}
                onClick={() => setSelectedBuilding(building)}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">{building.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{building.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {building.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Building Info */}
      {selectedBuilding && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-3xl">{selectedBuilding.icon}</span>
                  {selectedBuilding.name}
                </CardTitle>
                <CardDescription>{selectedBuilding.description}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => toggleFavorite(selectedBuilding)}>
                <Star
                  className={`h-5 w-5 ${isFavorite("building", selectedBuilding.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.type}</p>
                <p className="font-medium capitalize">{selectedBuilding.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.floors}</p>
                <p className="font-medium">{selectedBuilding.floors}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.hours}</p>
                <p className="font-medium">{selectedBuilding.hours}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{selectedBuilding.location}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.departments}</p>
              <div className="flex flex-wrap gap-2">
                {selectedBuilding.departments.map((dept, index) => (
                  <Badge key={index} variant="outline">
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
