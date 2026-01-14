export interface FavoriteItem {
  id: string
  type: "doctor" | "building" | "facility" | "route"
  data: any
  savedAt: Date
}

export interface RecentSearch {
  id: string
  query: string
  timestamp: Date
  results: number
}

// Favorites
export function getFavorites(type?: string): FavoriteItem[] | string[] {
  if (typeof window === "undefined") return []
  const key = `neu_favorites_${type || "all"}`
  const stored = localStorage.getItem(key)
  if (!stored) return []

  if (type) {
    return JSON.parse(stored)
  } else {
    return JSON.parse(stored).map((item: any) => ({
      ...item,
      savedAt: new Date(item.savedAt),
    }))
  }
}

export function addFavorite(type: FavoriteItem["type"], data: any): void {
  const favorites = getFavorites(type)
  const id = `${type}-${data.id || data.name}`

  if (Array.isArray(favorites) && favorites.some((fav) => fav.id === id)) {
    return // Already favorited
  }

  if (Array.isArray(favorites)) {
    favorites.push({
      id,
      type,
      data,
      savedAt: new Date(),
    })
  } else {
    localStorage.setItem("neu_favorites_all", JSON.stringify([{ id, type, data, savedAt: new Date() }]))
  }

  localStorage.setItem(`neu_favorites_${type}`, JSON.stringify(favorites))
}

export function removeFavorite(type: string, id: string): void {
  const favorites = getFavorites(type)
  if (Array.isArray(favorites)) {
    const filtered = favorites.filter((fav) => fav.id !== id)
    localStorage.setItem(`neu_favorites_${type}`, JSON.stringify(filtered))
  }
}

export function isFavorite(type: string, id: string | number): boolean {
  const favorites = getFavorites(type)
  const favId = `${type}-${id}`
  if (Array.isArray(favorites)) {
    return favorites.some((fav) => fav.id === favId)
  } else {
    return favorites.includes(favId)
  }
}

// Wrapper functions for favorites
export function addToFavorites(type: string, id: string): void {
  if (typeof window === "undefined") return
  const key = `neu_favorites_${type}`
  const stored = localStorage.getItem(key)
  const favorites: string[] = stored ? JSON.parse(stored) : []

  if (!favorites.includes(id)) {
    favorites.push(id)
    localStorage.setItem(key, JSON.stringify(favorites))
  }
}

export function removeFromFavorites(type: string, id: string): void {
  if (typeof window === "undefined") return
  const key = `neu_favorites_${type}`
  const stored = localStorage.getItem(key)
  const favorites: string[] = stored ? JSON.parse(stored) : []

  const filtered = favorites.filter((favId) => favId !== id)
  localStorage.setItem(key, JSON.stringify(filtered))
}

// Recent Searches
export function getRecentSearches(): RecentSearch[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("neu_recent_searches")
  if (!stored) return []
  return JSON.parse(stored)
    .map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }))
    .slice(0, 10) // Keep only last 10
}

export function addRecentSearch(query: string, results: number): void {
  const searches = getRecentSearches()
  const id = `search-${Date.now()}`

  searches.unshift({
    id,
    query,
    timestamp: new Date(),
    results,
  })

  localStorage.setItem("neu_recent_searches", JSON.stringify(searches.slice(0, 10)))
}

export function clearRecentSearches(): void {
  localStorage.setItem("neu_recent_searches", JSON.stringify([]))
}

// Theme
export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return (localStorage.getItem("neu_theme") as "light" | "dark") || "light"
}

export function setTheme(theme: "light" | "dark"): void {
  localStorage.setItem("neu_theme", theme)
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

export function toggleTheme(): "light" | "dark" {
  const current = getTheme()
  const newTheme = current === "light" ? "dark" : "light"
  setTheme(newTheme)
  return newTheme
}

// Announcements
export interface Announcement {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "maintenance"
  date: Date
}

export function getAnnouncements(): Announcement[] {
  return [
    {
      id: "1",
      title: "Library Maintenance",
      message: "The Grand Library will undergo scheduled maintenance on Dec 25-26. Online resources remain available.",
      type: "maintenance",
      date: new Date("2024-12-20"),
    },
    {
      id: "2",
      title: "Holiday Schedule",
      message: "Campus facilities will operate on reduced hours during the winter break.",
      type: "info",
      date: new Date("2024-12-15"),
    },
  ]
}
