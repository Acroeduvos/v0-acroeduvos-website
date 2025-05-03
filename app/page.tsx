import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Award, Briefcase } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Learn, Code, Create, Certify</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-100 md:text-xl">
            Free programming courses and MNC interview preparation resources to help you advance your career in tech
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                Explore Courses
              </Button>
            </Link>
            <Link href="/problems">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-600">
                Practice MNC Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Acroeduvos?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Free Learning Resources</h3>
              <p className="text-gray-600">
                Access all our courses and learning materials completely free of charge, with no hidden fees.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-4">
                <Code className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Hands-on Practice</h3>
              <p className="text-gray-600">
                Apply your knowledge with coding exercises, projects, and real-world problem-solving.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Free Certification</h3>
              <p className="text-gray-600">
                Earn certificates upon course completion to showcase your skills to potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Featured Learning Paths</h2>
            <p className="mt-4 text-gray-600">
              Choose from our wide range of free programming courses and MNC interview preparation resources
            </p>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="courses">Programming Courses</TabsTrigger>
              <TabsTrigger value="mnc">MNC Interview Prep</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Code className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        Basic & Advanced
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">C/C++ Programming</h3>
                    <p className="mb-4 text-gray-600">
                      Master C and C++ programming from basics to advanced concepts with hands-on projects.
                    </p>
                    <Link href="/courses?category=programming">
                      <Button className="w-full">View Courses</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Code className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        Basic & Advanced
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Web Development</h3>
                    <p className="mb-4 text-gray-600">
                      Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.
                    </p>
                    <Link href="/courses?category=web">
                      <Button className="w-full">View Courses</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Code className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                        Basic & Advanced
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">AI & Machine Learning</h3>
                    <p className="mb-4 text-gray-600">
                      Explore artificial intelligence and machine learning concepts and applications.
                    </p>
                    <Link href="/courses?category=ai">
                      <Button className="w-full">View Courses</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mnc">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        FAANG
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Amazon Interview Prep</h3>
                    <p className="mb-4 text-gray-600">
                      Practice real interview questions asked at Amazon technical interviews.
                    </p>
                    <Link href="/problems?company=amazon">
                      <Button className="w-full">View Questions</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        FAANG
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Google Interview Prep</h3>
                    <p className="mb-4 text-gray-600">
                      Master the coding and system design questions asked at Google interviews.
                    </p>
                    <Link href="/problems?company=google">
                      <Button className="w-full">View Questions</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-full bg-purple-100 p-3">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                        Tech Giants
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Microsoft Interview Prep</h3>
                    <p className="mb-4 text-gray-600">
                      Practice technical questions commonly asked in Microsoft interviews.
                    </p>
                    <Link href="/problems?company=microsoft">
                      <Button className="w-full">View Questions</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MNC Interview Prep Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Prepare for MNC Technical Interviews</h2>
            <p className="mt-4 text-gray-600">
              Practice with real interview questions asked at top multinational companies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold">Company-Specific Questions</h3>
              <p className="mb-6 text-gray-600">
                Our platform offers a comprehensive collection of technical interview questions from top companies like
                Amazon, Google, Microsoft, Meta, and more. Practice with questions tailored to specific company
                interview patterns.
              </p>
              <Link href="/problems">
                <Button className="bg-purple-600 hover:bg-purple-700">Explore Questions</Button>
              </Link>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold">Topic-Based Practice</h3>
              <p className="mb-6 text-gray-600">
                Master key topics frequently tested in technical interviews, including data structures, algorithms,
                system design, and more. Build your skills systematically with our structured approach.
              </p>
              <Link href="/problems?tag=algorithms">
                <Button className="bg-purple-600 hover:bg-purple-700">Practice by Topic</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Start Your Learning Journey Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
            Join thousands of learners who are advancing their careers with our free courses and resources
          </p>
          <div className="mt-8">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
