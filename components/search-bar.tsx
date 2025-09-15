"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)

  // Update the query state when the URL search param changes
  useEffect(() => {
    setQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search problems, contests..."
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
