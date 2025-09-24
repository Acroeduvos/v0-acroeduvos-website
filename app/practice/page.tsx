import Link from "next/link"

export default function PracticePage() {
  const cards = [
    { href: "/practice/difficulty", title: "By Difficulty", desc: "Solve Easy, Medium, Hard problems." },
    { href: "/practice/mncs", title: "MNC Problem Sets", desc: "Company-wise curated coding questions." },
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
          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((c) => (
              <Link key={c.href} href={c.href} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-gray-600">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
