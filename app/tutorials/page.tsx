"use client"

import Link from "next/link"

export default function TutorialsPage() {
  const tutorials = Array.from({ length: 36 }).map((_, i) => ({
    slug: `getting-started-${i + 1}`,
    title: `Getting Started Guide ${i + 1}`,
    excerpt:
      "Step-by-step tutorial covering core concepts, examples, and best practices for beginners.",
    category: ["Programming", "Web", "Data Structures", "Algorithms"][i % 4],
    readTime: `${8 + (i % 7)} min read`,
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-purple-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tutorials</h1>
          <p className="mx-auto mt-4 max-w-2xl text-purple-100">
            Curated tutorials to learn faster—concise, practical, and certification-aligned.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((t) => (
              <Link
                key={t.slug}
                href={`/tutorials/${t.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 text-xs font-medium text-purple-700">{t.category}</div>
                <h3 className="text-lg font-bold">{t.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.excerpt}</p>
                <div className="mt-3 text-xs text-gray-500">{t.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
