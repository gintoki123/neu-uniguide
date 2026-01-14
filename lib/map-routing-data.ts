export interface RouteStep {
  instruction: { en: string; tr: string; ar: string }
  distance: number // meters
  landmark?: { en: string; tr: string; ar: string }
}

export interface Route {
  from: string
  to: string
  distance: number // meters
  duration: number // minutes
  steps: RouteStep[]
  accessibilityFriendly: boolean
}

// Calculate simple route between buildings
export function calculateRoute(fromBuildingId: string, toBuildingId: string, accessible = false): Route {
  // Simulated routing logic
  const baseDistance = Math.floor(Math.random() * 300) + 100
  const baseDuration = Math.ceil(baseDistance / 80) // assuming 80m/min walking speed

  // Generate steps
  const steps: RouteStep[] = [
    {
      instruction: {
        en: "Exit the building and turn right",
        tr: "Binadan çıkın ve sağa dönün",
        ar: "اخرج من المبنى ثم انعطف يمينًا",
      },
      distance: 20,
    },
    {
      instruction: {
        en: "Walk straight along the main pathway",
        tr: "Ana yol boyunca düz yürüyün",
        ar: "امش مباشرة على المسار الرئيسي",
      },
      distance: baseDistance * 0.6,
      landmark: {
        en: "Pass by the fountain",
        tr: "Çeşmenin yanından geçin",
        ar: "مر بجانب النافورة",
      },
    },
    {
      instruction: {
        en: "Turn left at the intersection",
        tr: "Kavşakta sola dönün",
        ar: "انعطف يسارًا عند التقاطع",
      },
      distance: 15,
    },
    {
      instruction: {
        en: "Continue straight for about 50 meters",
        tr: "Yaklaşık 50 metre düz devam edin",
        ar: "استمر مباشرة لمسافة 50 مترًا تقريبًا",
      },
      distance: baseDistance * 0.3,
    },
    {
      instruction: {
        en: "Your destination will be on your right",
        tr: "Varış noktanız sağınızda olacak",
        ar: "ستكون وجهتك على يمينك",
      },
      distance: 10,
    },
  ]

  return {
    from: fromBuildingId,
    to: toBuildingId,
    distance: baseDistance,
    duration: baseDuration + (accessible ? 2 : 0), // Add extra time for accessible route
    steps,
    accessibilityFriendly: accessible,
  }
}

// Find nearest building of a certain type
export function findNearestFacility(
  currentBuildingId: string,
  facilityType: string,
  allBuildings: any[],
): string | null {
  // Simulate finding nearest - in real app would use coordinates
  const facilities = allBuildings.filter((b) => b.type === facilityType)
  if (facilities.length === 0) return null

  // Return random nearby facility for simulation
  return facilities[Math.floor(Math.random() * facilities.length)].id
}

// Building categories for filtering
export interface BuildingCategory {
  id: string
  name: { en: string; tr: string; ar: string }
  icon: string
  color: string
}

export const buildingCategories: BuildingCategory[] = [
  {
    id: "academic",
    name: { en: "Academic Buildings", tr: "Akademik Binalar", ar: "المباني الأكاديمية" },
    icon: "GraduationCap",
    color: "bg-blue-500",
  },
  {
    id: "administrative",
    name: { en: "Administrative", tr: "İdari", ar: "الإدارة" },
    icon: "Building",
    color: "bg-purple-500",
  },
  {
    id: "facilities",
    name: { en: "Facilities", tr: "Tesisler", ar: "المرافق" },
    icon: "Warehouse",
    color: "bg-green-500",
  },
  {
    id: "residential",
    name: { en: "Residential", tr: "Konut", ar: "سكني" },
    icon: "Home",
    color: "bg-orange-500",
  },
  {
    id: "recreation",
    name: { en: "Recreation", tr: "Rekreasyon", ar: "الترفيه" },
    icon: "Dumbbell",
    color: "bg-pink-500",
  },
]

// Estimate which category a building belongs to
export function categorizeBuilding(buildingName: string): string {
  const name = buildingName.toLowerCase()
  if (name.includes("faculty") || name.includes("department") || name.includes("engineering")) return "academic"
  if (name.includes("admin") || name.includes("rector") || name.includes("office")) return "administrative"
  if (name.includes("library") || name.includes("gym") || name.includes("cafeteria") || name.includes("sports"))
    return "facilities"
  if (name.includes("dorm") || name.includes("residence") || name.includes("housing")) return "residential"
  if (name.includes("recreation") || name.includes("pool") || name.includes("theater")) return "recreation"
  return "academic" // default
}
