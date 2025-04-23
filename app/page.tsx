import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Trophy, BookOpen, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#f5f2ee] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Enhance Your Coding Skills with AcroEduVos
              </h1>
              <p className="mt-4 text-lg text-gray-600 md:text-xl">
                Practice coding, participate in contests, and learn from a community of programmers.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/problems">
                  <Button className="bg-black text-white hover:bg-gray-800">Start Coding</Button>
                </Link>
                <Link href="/learn">
                  <Button variant="outline" className="border-black text-black hover:bg-black/5">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-64 w-64 md:h-80 md:w-80">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Coding illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">Why Choose AcroEduVos?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Our platform offers everything you need to become a better programmer.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f5f2ee]">
                  <Code className="h-6 w-6" />
                </div>
                <CardTitle>Practice Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Solve over 1,000 coding problems across various difficulty levels and domains.
                </p>
                <Link href="/problems" className="mt-4 inline-flex items-center text-black hover:underline">
                  Browse Problems <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f5f2ee]">
                  <Trophy className="h-6 w-6" />
                </div>
                <CardTitle>Coding Contests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Participate in regular coding contests to test your skills and compete with others.
                </p>
                <Link href="/contests" className="mt-4 inline-flex items-center text-black hover:underline">
                  View Contests <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f5f2ee]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access comprehensive courses and tutorials to master algorithms and data structures.
                </p>
                <Link href="/learn" className="mt-4 inline-flex items-center text-black hover:underline">
                  Explore Courses <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Contests Section */}
      <section className="bg-[#f5f2ee] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Contests</h2>
              <p className="mt-2 text-gray-600">Test your skills in our upcoming coding competitions.</p>
            </div>
            <Link href="/contests">
              <Button variant="outline" className="mt-4 md:mt-0 border-black text-black hover:bg-black/5">
                View All Contests
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Weekly Challenge #42",
                date: "Apr 15, 2025",
                time: "8:00 PM - 11:00 PM",
                participants: 1240,
              },
              {
                title: "Data Structures Marathon",
                date: "Apr 20, 2025",
                time: "9:00 AM - 9:00 PM",
                participants: 856,
              },
              {
                title: "Beginner's Coding Contest",
                date: "Apr 25, 2025",
                time: "6:00 PM - 8:00 PM",
                participants: 2150,
              },
            ].map((contest, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge className="bg-white">{contest.date}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="mr-1 h-4 w-4" />
                      {contest.participants}
                    </div>
                  </div>
                  <CardTitle className="mt-2">{contest.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{contest.time}</p>
                  <Link href={`/contests/${index + 1}`}>
                    <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800">Register Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Problems Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Problems</h2>
              <p className="mt-2 text-gray-600">Challenge yourself with these frequently solved problems.</p>
            </div>
            <Link href="/problems">
              <Button variant="outline" className="mt-4 md:mt-0 border-black text-black hover:bg-black/5">
                View All Problems
              </Button>
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f2ee]">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problem</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acceptance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { title: "Two Sum", difficulty: "Easy", acceptance: "45.2%" },
                  { title: "Valid Parentheses", difficulty: "Easy", acceptance: "40.1%" },
                  {
                    title: "Longest Substring Without Repeating Characters",
                    difficulty: "Medium",
                    acceptance: "32.4%",
                  },
                  { title: "Merge K Sorted Lists", difficulty: "Hard", acceptance: "24.5%" },
                  { title: "LRU Cache", difficulty: "Medium", acceptance: "28.7%" },
                ].map((problem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/problems/${index + 1}`} className="font-medium text-gray-900 hover:underline">
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          problem.difficulty === "Easy"
                            ? "border-green-500 text-green-600"
                            : problem.difficulty === "Medium"
                              ? "border-yellow-500 text-yellow-600"
                              : "border-red-500 text-red-600"
                        }
                      >
                        {problem.difficulty}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{problem.acceptance}</td>
                    <td className="px-6 py-4">
                      <Link href={`/problems/${index + 1}/solve`}>
                        <Button size="sm">Solve</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Start Coding?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Join thousands of programmers who are improving their skills on AcroEduVos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button className="bg-white text-black hover:bg-gray-100">Create Account</Button>
            </Link>
            <Link href="/problems">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
