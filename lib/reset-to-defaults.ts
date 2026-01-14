import { doctors, buildings, departments } from "./massive-data"

export function resetToDefaults() {
  if (typeof window === "undefined") return

  const confirmMsg = "Are you sure you want to reset all data to defaults? This will delete all your changes."

  if (confirm(confirmMsg)) {
    // Reset all localStorage data
    localStorage.setItem("neu_admin_doctors", JSON.stringify(doctors))
    localStorage.setItem("neu_admin_buildings", JSON.stringify(buildings))
    localStorage.setItem("neu_admin_departments", JSON.stringify(departments))

    // Reload the page to reflect changes
    window.location.reload()
  }
}
