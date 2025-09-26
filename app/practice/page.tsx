import Link from "next/link"

export default function PracticePage() {
  const sections = [
    {
      href: "/practice/difficulty",
      title: "By Difficulty Level",
      desc: "Problems categorized by difficulty - Easy, Medium, and Hard",
      stats: {
        total: 500,
        categories: [
          { name: "Easy", count: 200 },
          { name: "Medium", count: 200 },
          { name: "Hard", count: 100 },
        ],
      },
    },
    {
      href: "/practice/mncs",
      title: "MNC Interview Questions",
      desc: "Real interview questions from top tech companies",
      stats: {
        total: 500,
        companies: [
          { name: "Google", count: 100 },
          { name: "Microsoft", count: 100 },
          { name: "Amazon", count: 100 },
          { name: "Meta", count: 100 },
          { name: "Others", count: 100 },
        ],
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-purple-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Practice</h1>
          <p className="mx-auto mt-4 max-w-2xl text-purple-100">Sharpen your skills with 500+ curated problems.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-purple-600">{section.title}</h3>
                  <p className="mt-2 text-gray-600">{section.desc}</p>
                </div>

                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">Total Problems:</span>
                    <span className="ml-2 text-lg font-bold text-purple-600">{section.stats.total}</span>
                  </div>

                  <div className="grid gap-2">
                    {section.stats.categories ? (
                      section.stats.categories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{cat.name}</span>
                          <span className="text-sm text-gray-500">{cat.count} problems</span>
                        </div>
                      ))
                    ) : (
                      section.stats.companies?.map((company) => (
                        <div key={company.name} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{company.name}</span>
                          <span className="text-sm text-gray-500">{company.count} problems</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
