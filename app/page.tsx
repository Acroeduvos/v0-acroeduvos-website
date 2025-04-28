import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Trophy, CheckCircle, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  // Featured programming courses
  const featuredProgrammingCourses = [
    {
      id: 1,
      title: "C Programming Fundamentals",
      image: "/placeholder.svg?height=200&width=400&text=C+Programming",
      category: "Programming",
      level: "Basic",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "C++ Advanced Concepts",
      image: "/placeholder.svg?height=200&width=400&text=C%2B%2B+Programming",
      category: "Programming",
      level: "Advanced",
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "Java Development",
      image: "/placeholder.svg?height=200&width=400&text=Java+Development",
      category: "Programming",
      level: "Basic",
      difficulty: "Easy",
    },
    {
      id: 5,
      title: "Cyber Security Essentials",
      image: "/placeholder.svg?height=200&width=400&text=Cyber+Security",
      category: "Security",
      level: "Basic",
      difficulty: "Medium",
    },
  ]

  // Featured problem-solving challenges
  const featuredProblems = [
    { title: "Two Sum", difficulty: "Easy", category: "Arrays" },
    { title: "Valid Parentheses", difficulty: "Easy", category: "Stacks" },
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Strings" },
    { title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked Lists" },
    { title: "LRU Cache", difficulty: "Medium", category: "Design" },
  ]

  return (
    <div>
      {/* Add a section at the top of the homepage that showcases the new logo */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 relative h-32 w-32">
            <Image src="/logo.png" alt="Acroeduvos Logo" fill className="object-contain" priority />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Welcome to AcroEduVos</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Enhance your coding skills with challenges, contests, comprehensive learning resources, and earn
            certifications - all for free!
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[#f5f2ee] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Learn, Code, Create, Certify
              </h1>
              <p className="mt-4 text-lg text-gray-600 md:text-xl">
                Master programming languages, solve coding challenges, and earn certificates - completely free.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button className="bg-black text-white hover:bg-gray-800">Explore Courses</Button>
                </Link>
                <Link href="/problems">
                  <Button variant="outline" className="border-black text-black hover:bg-black/5">
                    Practice Problems
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

      {/* Featured Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Featured Content</h2>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="courses">Programming Courses</TabsTrigger>
              <TabsTrigger value="problems">Coding Problems</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProgrammingCourses.map((course, index) => (
                  <Link
                    key={index}
                    href={`/courses/${course.id}`}
                    className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                          {course.category}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="mt-2 text-xl font-bold group-hover:text-purple-600">{course.title}</h3>
                      <div className="mt-4 flex items-center justify-between">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            course.difficulty === "Easy"
                              ? "bg-green-100 text-green-800"
                              : course.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                        <span className="text-sm font-medium text-purple-700">Free</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline" className="border-black text-black hover:bg-black/5">
                  <Link href="/courses" className="inline-flex items-center">
                    View All Courses <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="problems">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f5f2ee]">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problem</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {featuredProblems.map((problem, index) => (
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
                        <td className="px-6 py-4 text-sm text-gray-700">{problem.category}</td>
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
              <div className="mt-8 text-center">
                <Button asChild variant="outline" className="border-black text-black hover:bg-black/5">
                  <Link href="/problems" className="inline-flex items-center">
                    View All Problems <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
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
                <CardTitle>Free Programming Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Master programming languages like C, C++, Java, and more with comprehensive courses at basic and
                  advanced levels.
                </p>
                <Link href="/courses" className="mt-4 inline-flex items-center text-black hover:underline">
                  Browse Courses <ArrowRight className="ml-1 h-4 w-4" />
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
                  Participate in regular coding contests to test your skills with problems of varying difficulty levels.
                </p>
                <Link href="/contests" className="mt-4 inline-flex items-center text-black hover:underline">
                  View Contests <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f5f2ee]">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle>Free Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Earn certificates that validate your skills and knowledge in various programming languages and
                  technologies.
                </p>
                <Link href="/certificates" className="mt-4 inline-flex items-center text-black hover:underline">
                  View Certificates <ArrowRight className="ml-1 h-4 w-4" />
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
                difficulty: "Medium",
              },
              {
                title: "Data Structures Marathon",
                date: "Apr 20, 2025",
                time: "9:00 AM - 9:00 PM",
                difficulty: "Hard",
              },
              {
                title: "Beginner's Coding Contest",
                date: "Apr 25, 2025",
                time: "6:00 PM - 8:00 PM",
                difficulty: "Easy",
              },
            ].map((contest, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge className="bg-white">{contest.date}</Badge>
                    <Badge
                      className={
                        contest.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : contest.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {contest.difficulty}
                    </Badge>
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

      {/* Certification Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Get Certified in Programming Languages</h2>
              <p className="mt-4 text-gray-600">
                Our free certification program validates your skills in various programming languages and technologies,
                helping you stand out in the job market.
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  "C Programming",
                  "C++ Programming",
                  "Java Development",
                  "Web Development",
                  "Cyber Security",
                  "Mobile App Development",
                  "AI & Machine Learning",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-5 w-5 text-green-500" />
                    <span>{item} Certification</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild className="bg-black">
                  <Link href="/courses">Start Your Certification Journey</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border-8 border-[#e8e3dc] shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Certificate+Sample"
                  alt="Certificate Sample"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24">
                <Image src="/logo.png" alt="Acroeduvos Logo" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Problems Section */}
      <section className="py-16 bg-gray-50">
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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {featuredProblems.map((problem, index) => (
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
                    <td className="px-6 py-4 text-sm text-gray-700">{problem.category}</td>
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
            Join our community of programmers who are improving their skills on AcroEduVos - completely free.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button className="bg-white text-black hover:bg-gray-100">Create Free Account</Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Free Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
