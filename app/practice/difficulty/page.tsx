"use client"

import Link from "next/link"
import { useMemo } from "react"

export default function PracticeByDifficultyPage({ searchParams }: { searchParams: { page?: string; level?: string } }) {
  const page = Number(searchParams.page || 1)
  const level = (searchParams.level || "easy").toLowerCase()
  const levels = ["easy", "medium", "hard"]

  const problems = useMemo(() => {
    const all = Array.from({ length: 300 }).map((_, i) => ({
      id: i + 1,
      title: `Problem ${i + 1}`,
      level: levels[(i % 3)] as "easy" | "medium" | "hard",
      slug: `p-${i + 1}`,
    }))
    return all.filter((p) => p.level === level)
  }, [level])

  const pageSize = 25
  const totalPages = Math.ceil(problems.length / pageSize)
  const start = (page - 1) * pageSize
  const pageItems = problems.slice(start, start + pageSize)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">{level} Problems</h1>
        <div className="space-x-2 text-sm">
          {levels.map((lvl) => (
            <Link key={lvl} href={`/practice/difficulty?level=${lvl}`} className={`rounded border px-3 py-1 ${lvl === level ? "bg-black text-white" : "bg-white"}`}>
              {lvl}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {pageItems.map((p) => (
          <Link key={p.id} href={`/practice/difficulty/${p.slug}`} className="rounded border bg-white p-4 hover:shadow">
            <div className="text-sm text-gray-500">#{p.id}</div>
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="text-xs capitalize text-purple-700">{p.level}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <Link href={`/practice/difficulty?level=${level}&page=${Math.max(1, page - 1)}`} className="rounded border px-3 py-2 text-sm">Previous</Link>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <Link href={`/practice/difficulty?level=${level}&page=${Math.min(totalPages, page + 1)}`} className="rounded border px-3 py-2 text-sm">Next</Link>
      </div>
    </div>
  )
}
