"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Circle, Users, Clock } from "lucide-react"
import type { Language } from "@/app/page"
import { getFacilityStatus, type FacilityStatus } from "@/lib/facility-data"

interface FacilityStatusIndicatorProps {
  facilityId: string
  language: Language
}

const translations = {
  en: {
    open: "Open",
    closed: "Closed",
    occupancy: "Current Occupancy",
    capacity: "Capacity",
    updated: "Updated",
    ago: "ago",
  },
  tr: {
    open: "Açık",
    closed: "Kapalı",
    occupancy: "Mevcut Doluluk",
    capacity: "Kapasite",
    updated: "Güncelleme",
    ago: "önce",
  },
  ar: {
    open: "مفتوح",
    closed: "مغلق",
    occupancy: "الإشغال الحالي",
    capacity: "السعة",
    updated: "تم التحديث",
    ago: "منذ",
  },
}

export function FacilityStatusIndicator({ facilityId, language }: FacilityStatusIndicatorProps) {
  const t = translations[language]
  const [status, setStatus] = useState<FacilityStatus | null>(null)

  useEffect(() => {
    // Initial fetch
    const fetchStatus = () => {
      const currentStatus = getFacilityStatus(facilityId)
      setStatus(currentStatus)
    }

    fetchStatus()

    // Update every 30 seconds
    const interval = setInterval(fetchStatus, 30000)

    return () => clearInterval(interval)
  }, [facilityId])

  if (!status) return null

  const occupancyPercentage = (status.currentOccupancy / status.maxCapacity) * 100
  const getOccupancyColor = () => {
    if (occupancyPercentage < 50) return "text-green-600"
    if (occupancyPercentage < 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="bg-accent/30">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Circle
              className={`w-3 h-3 ${status.isOpen ? "fill-green-600 text-green-600" : "fill-red-600 text-red-600"} animate-pulse`}
            />
            <Badge variant={status.isOpen ? "default" : "destructive"} className="font-semibold">
              {status.isOpen ? t.open : t.closed}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>
              {t.updated} 1m {t.ago}
            </span>
          </div>
        </div>

        {status.isOpen && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t.occupancy}
              </span>
              <span className={`font-bold ${getOccupancyColor()}`}>
                {status.currentOccupancy} / {status.maxCapacity}
              </span>
            </div>
            <Progress value={occupancyPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {occupancyPercentage < 50
                ? language === "en"
                  ? "Low occupancy - Great time to visit"
                  : language === "tr"
                    ? "Düşük doluluk - Ziyaret için harika zaman"
                    : "إشغال منخفض - وقت رائع للزيارة"
                : occupancyPercentage < 80
                  ? language === "en"
                    ? "Moderate occupancy"
                    : language === "tr"
                      ? "Orta doluluk"
                      : "إشغال معتدل"
                  : language === "en"
                    ? "High occupancy - Consider visiting later"
                    : language === "tr"
                      ? "Yüksek doluluk - Daha sonra ziyaret etmeyi düşünün"
                      : "إشغال عالٍ - فكر في الزيارة لاحقًا"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
