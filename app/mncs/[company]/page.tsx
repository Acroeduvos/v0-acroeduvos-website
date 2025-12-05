import Link from "next/link"
import { notFound } from "next/navigation"

const COMPANIES: Record<string, { name: string; blurb: string; tracks: string[] }> = {
  google: {
    name: "Google",
    blurb: "Practice coding interviews, algorithmic thinking, and system design the Google way.",
    tracks: ["DSA", "System Design", "Behavioral", "Concurrency"],
  },
  microsoft: {
    name: "Microsoft",
    blurb: "Strengthen DSA, OS, DBMS, and design questions commonly asked at Microsoft.",
    tracks: ["DSA", "OS", "DBMS", "Behavioral"],
  },
  amazon: {
    name: "Amazon",
    blurb: "Ace LP-focused interviews with coding and design problems aligned to Leadership Principles.",
    tracks: ["DSA", "LP", "OOD", "Behavioral"],
  },
  tcs: {
    name: "TCS",
    blurb: "Prepare for Ninja/Digital roles with aptitude, coding, and communication.",
    tracks: ["Aptitude", "Coding", "Email"],
  },
}

export default function CompanyHubPage({ params }: { params: { company: string } }) {
  const info = COMPANIES[params.company]
  if (!info) return notFound()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{info.name} Prep Hub</h1>
      <p className="text-gray-600 mb-6">{info.blurb}</p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Tracks</h2>
        <div className="flex flex-wrap gap-2">
          {info.tracks.map((t) => (
            <span key={t} className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">{t}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/mncs/${params.company}/questions`} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">Start Questions</Link>
        <Link href={`/interview`} className="rounded-md border px-4 py-2 text-sm font-medium">Interview Prep</Link>
      </div>
    </div>
  )
}


