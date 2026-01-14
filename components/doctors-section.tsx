"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, Mail, Phone, Star } from "lucide-react"
import { doctors, type Doctor } from "@/lib/data"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/storage"

interface DoctorsSectionProps {
  language: "en" | "tr"
}

export function DoctorsSection({ language }: DoctorsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors)
  const [favorites, setFavorites] = useState<Record<number, boolean>>({})

  useEffect(() => {
    // Initialize favorites
    const favs: Record<number, boolean> = {}
    doctors.forEach((doc) => {
      favs[doc.id] = isFavorite("doctor", doc.id)
    })
    setFavorites(favs)
  }, [])

  useEffect(() => {
    // Filter doctors based on search query
    if (!searchQuery.trim()) {
      setFilteredDoctors(doctors)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(query) ||
        doc.department.toLowerCase().includes(query) ||
        doc.building.toLowerCase().includes(query) ||
        doc.room.toLowerCase().includes(query),
    )
    setFilteredDoctors(filtered)
  }, [searchQuery])

  const toggleFavorite = (doctor: Doctor) => {
    if (favorites[doctor.id]) {
      removeFavorite(`doctor-${doctor.id}`)
      setFavorites({ ...favorites, [doctor.id]: false })
    } else {
      addFavorite("doctor", doctor)
      setFavorites({ ...favorites, [doctor.id]: true })
    }
  }

  const t =
    language === "tr"
      ? {
          title: "Doktor Dizini",
          subtitle: "Akademik personeli ve ofis konumlarını bulun",
          searchPlaceholder: "İsim, bölüm veya bina ile ara...",
          results: "sonuç",
          department: "Bölüm",
          building: "Bina",
          floor: "Kat",
          room: "Oda",
          officeHours: "Ofis Saatleri",
          email: "E-posta",
          phone: "Telefon",
        }
      : {
          title: "Doctor Directory",
          subtitle: "Find faculty members and their office locations",
          searchPlaceholder: "Search by name, department, or building...",
          results: "results",
          department: "Department",
          building: "Building",
          floor: "Floor",
          room: "Room",
          officeHours: "Office Hours",
          email: "Email",
          phone: "Phone",
        }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Badge variant="secondary">
              {filteredDoctors.length} {t.results}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.department}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(doctor)}
                  className={favorites[doctor.id] ? "text-yellow-500" : "text-muted-foreground"}
                >
                  <Star className={`h-4 w-4 ${favorites[doctor.id] ? "fill-yellow-500" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{doctor.building}</p>
                    <p className="text-muted-foreground">
                      {t.floor} {doctor.floor}, {t.room} {doctor.room}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{doctor.office_hours}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline truncate">
                    {doctor.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <a href={`tel:${doctor.phone}`} className="text-blue-600 hover:underline">
                    {doctor.phone}
                  </a>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                {language === "tr" ? "Haritada Göster" : "Show on Map"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {language === "tr"
                ? "Sonuç bulunamadı. Farklı bir arama deneyin."
                : "No results found. Try a different search."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
