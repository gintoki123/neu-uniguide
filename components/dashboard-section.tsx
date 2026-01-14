"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Map, UserRound, History, Star, Bell, TrendingUp, Clock } from "lucide-react"
import {
  getFavorites,
  getRecentSearches,
  getAnnouncements,
  clearRecentSearches,
  type FavoriteItem,
} from "@/lib/storage"
import { doctors, buildings } from "@/lib/data"

interface DashboardSectionProps {
  language: "en" | "tr"
  onNavigate: (section: string) => void
  onSearch: (query: string) => void
}

export function DashboardSection({ language, onNavigate, onSearch }: DashboardSectionProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [recentSearches, setRecentSearches] = useState<any[]>([])
  const [showRecent, setShowRecent] = useState(false)

  useEffect(() => {
    setFavorites(getFavorites())
    setRecentSearches(getRecentSearches())
  }, [])

  const t =
    language === "tr"
      ? {
          welcome: "Yakın Doğu Üniversitesi Kampüs Navigasyonuna Hoş Geldiniz",
          welcomeDesc:
            "Lefkoşa, Kuzey Kıbrıs'taki en büyük kampüste yolunuzu bulun. Bina konumları, doktor bilgileri ve daha fazlasına erişin.",
          quickActions: "Hızlı İşlemler",
          smartSearch: "Akıllı Arama",
          smartSearchDesc: "Kampüste her şeyi bulun",
          interactiveMap: "Etkileşimli Harita",
          mapDesc: "Kampüs düzenini keşfedin",
          doctorDirectory: "Doktor Dizini",
          doctorDesc: "Akademik personeli bulun",
          recentSearches: "Son Aramalar",
          recentDesc: "Arama geçmişiniz",
          yourFavorites: "Favorileriniz",
          noFavorites: "Henüz favori yok. Öğe eklemeye başlayın!",
          popularLocations: "Popüler Konumlar",
          getDirections: "Yol Tarifi Al",
          announcements: "Duyurular",
          clearAll: "Hepsini Temizle",
          viewAll: "Tümünü Gör",
          campusStats: "Kampüs İstatistikleri",
          totalDoctors: "Toplam Doktor",
          totalBuildings: "Toplam Bina",
          quickLinks: "Hızlı Bağlantılar",
        }
      : {
          welcome: "Welcome to Near East University Campus Navigation",
          welcomeDesc:
            "Find your way around the largest campus in Nicosia, North Cyprus. Access building locations, doctor information, and more.",
          quickActions: "Quick Actions",
          smartSearch: "Smart Search",
          smartSearchDesc: "Find anything on campus",
          interactiveMap: "Interactive Map",
          mapDesc: "Explore campus layout",
          doctorDirectory: "Doctor Directory",
          doctorDesc: "Find faculty members",
          recentSearches: "Recent Searches",
          recentDesc: "Your search history",
          yourFavorites: "Your Favorites",
          noFavorites: "No favorites yet. Start adding items!",
          popularLocations: "Popular Locations",
          getDirections: "Get Directions",
          announcements: "Announcements",
          clearAll: "Clear All",
          viewAll: "View All",
          campusStats: "Campus Statistics",
          totalDoctors: "Total Doctors",
          totalBuildings: "Total Buildings",
          quickLinks: "Quick Links",
        }

  const quickActions = [
    {
      icon: Search,
      title: t.smartSearch,
      desc: t.smartSearchDesc,
      action: "search",
      color: "bg-blue-100 text-blue-600",
    },
    { icon: Map, title: t.interactiveMap, desc: t.mapDesc, action: "map", color: "bg-green-100 text-green-600" },
    {
      icon: UserRound,
      title: t.doctorDirectory,
      desc: t.doctorDesc,
      action: "doctors",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: History,
      title: t.recentSearches,
      desc: t.recentDesc,
      action: "recent",
      color: "bg-yellow-100 text-yellow-600",
    },
  ]

  const popularLocations = [
    { name: "Grand Library", icon: "📚", desc: "24/7 access", building: "library" },
    { name: "Engineering Faculty", icon: "⚙️", desc: "Computer Engineering", building: "engineering" },
    { name: "NEU Hospital", icon: "🏥", desc: "Medical services", building: "hospital" },
    { name: "Sports Complex", icon: "⚽", desc: "Gym & facilities", building: "sports" },
  ]

  const announcements = getAnnouncements()

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-0">
        <CardHeader>
          <CardTitle className="text-3xl">{t.welcome}</CardTitle>
          <CardDescription className="text-blue-50 text-lg">{t.welcomeDesc}</CardDescription>
        </CardHeader>
      </Card>

      {/* Campus Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalDoctors}</p>
                <p className="text-3xl font-bold">{doctors.length}</p>
              </div>
              <UserRound className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalBuildings}</p>
                <p className="text-3xl font-bold">{buildings.length}</p>
              </div>
              <Map className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.announcements}</p>
                <p className="text-3xl font-bold">{announcements.length}</p>
              </div>
              <Bell className="h-12 w-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>{t.announcements}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <Badge variant={announcement.type === "warning" ? "destructive" : "secondary"}>
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{announcement.date.toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t.quickActions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => (action.action === "recent" ? setShowRecent(!showRecent) : onNavigate(action.action))}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      {showRecent && recentSearches.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <CardTitle>{t.recentSearches}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  clearRecentSearches()
                  setRecentSearches([])
                }}
              >
                {t.clearAll}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearches.map((search) => (
                <Card key={search.id} className="cursor-pointer hover:bg-muted" onClick={() => onSearch(search.query)}>
                  <CardContent className="pt-4">
                    <p className="font-medium truncate">{search.query}</p>
                    <p className="text-sm text-muted-foreground">
                      {search.results} {language === "tr" ? "sonuç" : "results"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Favorites */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <CardTitle>{t.yourFavorites}</CardTitle>
            <Badge variant="secondary">
              {favorites.length} {language === "tr" ? "öğe" : "items"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t.noFavorites}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((fav) => (
                <Card key={fav.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge>{fav.type}</Badge>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold">{fav.data.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {fav.data.department || fav.data.location || fav.data.building}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Locations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>{t.popularLocations}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularLocations.map((location, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{location.icon}</div>
                  <h3 className="font-bold mb-1">{location.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{location.desc}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => onNavigate("map")}
                  >
                    {t.getDirections}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
