"use client"

import Link from "next/link"
import { useMemo } from "react"

export default function PracticeMNCsPage({ searchParams }: { searchParams: { page?: string; company?: string } }) {
  const page = Number(searchParams.page || 1)
  const companies = ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Uber", "Flipkart", "Paytm"]
  const company = searchParams.company || "Google"

  const problems = useMemo(() => {
    const all = Array.from({ length: 240 }).map((_, i) => ({
      id: i + 1,
      title: `${companies[i % companies.length]} Problem ${i + 1}`,
      company: companies[i % companies.length],
      slug: `m-${i + 1}`,
    }))
    return all.filter((p) => p.company === company)
  }, [company])

  const pageSize = 25
  const totalPages = Math.ceil(problems.length / pageSize)
  const start = (page - 1) * pageSize
  const pageItems = problems.slice(start, start + pageSize)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{company} Problems</h1>
        <div className="space-x-2 text-sm">
          {companies.map((c) => (
            <Link key={c} href={`/practice/mncs?company=${encodeURIComponent(c)}`} className={`rounded border px-3 py-1 ${c === company ? "bg-black text-white" : "bg-white"}`}>
              {c}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {pageItems.map((p) => (
          <Link key={p.id} href={`/practice/mncs/${p.slug}`} className="rounded border bg-white p-4 hover:shadow">
            <div className="text-sm text-gray-500">#{p.id}</div>
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="text-xs text-purple-700">{p.company}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <Link href={`/practice/mncs?company=${encodeURIComponent(company)}&page=${Math.max(1, page - 1)}`} className="rounded border px-3 py-2 text-sm">Previous</Link>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <Link href={`/practice/mncs?company=${encodeURIComponent(company)}&page=${Math.min(totalPages, page + 1)}`} className="rounded border px-3 py-2 text-sm">Next</Link>
      </div>
    </div>
  )
}
