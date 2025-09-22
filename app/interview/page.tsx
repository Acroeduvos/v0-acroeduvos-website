import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function InterviewPage() {
  const sections = [
    { slug: "dsa", title: "DSA Roadmap", desc: "Topic-wise practice with patterns and levels." },
    { slug: "system-design", title: "System Design", desc: "Foundations, scalability, and real designs with tradeoffs." },
    { slug: "behavioral", title: "Behavioral", desc: "STAR method, leadership, and conflict scenarios." },
    { slug: "resume", title: "Resume & Projects", desc: "ATS-friendly resume and impactful project storytelling." },
    { slug: "mock", title: "Mock Interviews", desc: "Timed mocks with feedback and scoring rubrics." },
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Interview Prep</h1>
        <p className="text-gray-600">Structured prep material and practice paths</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Card key={s.slug}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
              <Link href={`/interview/${s.slug}`} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">Explore</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


