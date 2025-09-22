import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function MncsPage() {
  const companies = [
    { slug: "google", name: "Google", roles: ["SDE 1", "SDE 2"], topics: ["DSA", "System Design", "Behavioral"] },
    { slug: "microsoft", name: "Microsoft", roles: ["SWE", "Support Eng"], topics: ["DSA", "OS", "DBMS"] },
    { slug: "amazon", name: "Amazon", roles: ["SDE 1"], topics: ["DSA", "LP", "OOD"] },
    { slug: "tcs", name: "TCS", roles: ["Ninja", "Digital"], topics: ["Aptitude", "Coding", "Email"] },
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">MNCs Question Practice</h1>
        <p className="text-gray-600">Company-specific coding, aptitude, and interview prep</p>
      </div>

      <div className="mb-6 max-w-xl mx-auto relative">
        <input
          type="text"
          placeholder="Search company or topic..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <Card key={c.slug}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-1">{c.name}</h3>
              <p className="text-sm text-gray-600 mb-3">Roles: {c.roles.join(", ")}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {c.topics.map((t) => (
                  <span key={t} className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">{t}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href={`/mncs/${c.slug}`} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">Start</Link>
                <Link href={`/mncs/${c.slug}/questions`} className="rounded-md border px-4 py-2 text-sm font-medium">Questions</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


