"use client"

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isLoggedIn") === "true"
}

export function getUser(): { username: string; name: string; role?: "teacher" | "student" } | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  if (!userData) return null

  try {
    const parsed = JSON.parse(userData)
    return { ...parsed, role: parsed.role || "student" }
  } catch (e) {
    return null
  }
}

export function setRedirectAfterLogin(path: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("redirectAfterLogin", path)
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("user")
}
