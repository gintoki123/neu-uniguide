"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles } from "lucide-react"
import { doctors, buildings, facilities } from "@/lib/data"
import { addRecentSearch } from "@/lib/storage"

interface SearchSectionProps {
  language: "en" | "tr"
}

export function SearchSection({ language }: SearchSectionProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const t =
    language === "tr"
      ? {
          title: "Akıllı Kampüs Arama",
          subtitle: "Doğal dil kullanarak binaları, doktorları veya tesisleri bulun",
          placeholder: "Örnek: 'Mühendislik nerede?', 'Dr. Ali ofisi', 'Kütüphane saatleri'",
          search: "Ara",
          results: "Arama Sonuçları",
          count: "sonuç",
          examples: "Örnek Aramalar:",
          doctor: "Doktor",
          building: "Bina",
          facility: "Tesis",
        }
      : {
          title: "Smart Campus Search",
          subtitle: "Find buildings, doctors, or facilities using natural language",
          placeholder: "Try: 'Where is Engineering?', 'Dr. Ali office', 'Library hours'",
          search: "Search",
          results: "Search Results",
          count: "results",
          examples: "Example Searches:",
          doctor: "Doctor",
          building: "Building",
          facility: "Facility",
        }

  const exampleSearches = [
    language === "tr" ? "Mühendislik Fakültesi nerede?" : "Where is Engineering Faculty?",
    language === "tr" ? "Dr. Ayşe Öztürk ofis saatleri" : "Dr. Ayşe Öztürk office hours",
    language === "tr" ? "Kütüphane saatleri" : "Library hours",
    language === "tr" ? "Tıp Fakültesi kaç katlı?" : "How many floors is Medicine Faculty?",
  ]

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const foundResults: any[] = []

    // Search doctors
    doctors.forEach((doctor) => {
      if (
        doctor.name.toLowerCase().includes(query) ||
        doctor.department.toLowerCase().includes(query) ||
        doctor.building.toLowerCase().includes(query)
      ) {
        foundResults.push({ type: "doctor", data: doctor })
      }
    })

    // Search buildings
    buildings.forEach((building) => {
      if (
        building.name.toLowerCase().includes(query) ||
        building.type.toLowerCase().includes(query) ||
        building.departments.some((dept) => dept.toLowerCase().includes(query))
      ) {
        foundResults.push({ type: "building", data: building })
      }
    })

    // Search facilities
    facilities.forEach((facility) => {
      if (
        facility.name.toLowerCase().includes(query) ||
        facility.type.toLowerCase().includes(query) ||
        facility.description.toLowerCase().includes(query)
      ) {
        foundResults.push({ type: "facility", data: facility })
      }
    })

    setResults(foundResults)
    addRecentSearch(searchQuery, foundResults.length)
  }

  const handleSearch = () => {
    performSearch(query)
    setShowSuggestions(false)
  }

  useEffect(() => {
    if (query.length > 2) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={t.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={!query.trim()}>
              <Search className="h-4 w-4 mr-2" />
              {t.search}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example Searches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t.examples}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleSearches.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 text-left bg-transparent"
                onClick={() => {
                  setQuery(example)
                  performSearch(example)
                }}
              >
                <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{example}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.results}</CardTitle>
              <Badge variant="secondary">
                {results.length} {t.count}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={
                          result.type === "doctor" ? "default" : result.type === "building" ? "secondary" : "outline"
                        }
                      >
                        {result.type === "doctor" ? t.doctor : result.type === "building" ? t.building : t.facility}
                      </Badge>
                    </div>

                    {result.type === "doctor" && (
                      <div>
                        <h3 className="font-bold text-lg mb-1">{result.data.name}</h3>
                        <p className="text-muted-foreground mb-2">{result.data.department}</p>
                        <div className="text-sm space-y-1">
                          <p>
                            📍 {result.data.building} - Floor {result.data.floor}, Room {result.data.room}
                          </p>
                          <p>🕐 {result.data.office_hours}</p>
                          <p>✉️ {result.data.email}</p>
                        </div>
                      </div>
                    )}

                    {result.type === "building" && (
                      <div>
                        <h3 className="font-bold text-lg mb-1">
                          {result.data.icon} {result.data.name}
                        </h3>
                        <p className="text-muted-foreground mb-2">{result.data.description}</p>
                        <div className="text-sm space-y-1">
                          <p>📍 {result.data.location}</p>
                          <p>🏢 {result.data.floors} floors</p>
                          <p>🕐 {result.data.hours}</p>
                        </div>
                      </div>
                    )}

                    {result.type === "facility" && (
                      <div>
                        <h3 className="font-bold text-lg mb-1">{result.data.name}</h3>
                        <p className="text-muted-foreground mb-2">{result.data.description}</p>
                        <div className="text-sm space-y-1">
                          <p>📍 {result.data.location}</p>
                          <p>🕐 {result.data.hours}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {query && results.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              {language === "tr"
                ? "Sonuç bulunamadı. Farklı anahtar kelimeler deneyin."
                : "No results found. Try different keywords."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
