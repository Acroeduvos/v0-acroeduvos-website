import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LearnLandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Learning Hub</h1>
      <p className="mt-2 text-gray-600">Choose a path and start learning for free.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "C/C++ Programming", href: "/courses?category=programming" },
          { title: "Web Development", href: "/courses?category=web" },
          { title: "AI & Machine Learning", href: "/courses?category=ai" },
          { title: "Interview Preparation", href: "/problems" },
          { title: "Certificates", href: "/certificates" },
          { title: "Practice Problems", href: "/problems" },
        ].map(({ title, href }) => (
          <Link key={title} href={href} className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{title}</h2>
              <Button variant="outline" size="sm">Explore</Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

