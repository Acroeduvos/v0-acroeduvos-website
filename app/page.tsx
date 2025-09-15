import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Code, Award, BookOpen, Users, ArrowRight } from "lucide-react"

export default function Home() {
  // Featured courses
  const featuredCourses = [
    {
      id: 1,
      title: "C Programming Fundamentals",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      category: "Programming",
    },
    {
      id: 2,
      title: "C++ Advanced Concepts",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
      category: "Programming",
    },
    {
      id: 3,
      title: "Java Development",
      image: "https://images.unsplash.com/photo-1526379095098-e40fd0b8f26e?w=400&h=200&fit=crop",
      category: "Programming",
    },
    {
      id: 5,
      title: "Cyber Security Essentials",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
      category: "Security",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-purple-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-yellow-300">
                Learn to Code, Get Certified
              </h1>
              <p className="mt-6 text-lg text-blue-100 md:text-xl">
                Master programming languages, web development, cybersecurity, and more with our comprehensive FREE courses
                and earn industry-recognized certifications.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-yellow-300 hover:bg-purple-600">
                  <Link href="/courses">Start Learning Free</Link>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-8 text-white">
              <div className="text-center mb-6">
                <div className="mb-4">
                  <Image
                    src="/logo.png"
                    alt="Acroeduvos Logo"
                    width={120}
                    height={80}
                    className="rounded-lg object-contain mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Why Choose Acroeduvos?</h3>
                <p className="text-purple-100">Your path to programming mastery</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-300">8+</div>
                  <div className="text-sm">Languages</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-300">100%</div>
                  <div className="text-sm">Free</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-300">24/7</div>
                  <div className="text-sm">Access</div>
                </div>
                <div className="text-center bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-300">∞</div>
                  <div className="text-sm">Paths</div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-lg font-semibold mb-2">Start Learning Today! 🚀</div>
                <div className="text-sm text-purple-100">Join our community of developers</div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-sm font-medium mb-2">🎯 What You'll Get:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>✅ Free Courses</div>
                  <div>✅ Certificates</div>
                  <div>✅ Code Practice</div>
                  <div>✅ 24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <p className="mt-4 text-gray-600">
              Start your journey with our most popular programming and technology courses
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
                <div className="p-6">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                    {course.category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold group-hover:text-purple-600">{course.title}</h3>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      FREE
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/courses" className="flex items-center">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why Choose Acroeduvos</h2>
            <p className="mt-4 text-gray-600">
              We provide comprehensive programming education with industry-recognized certifications
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Comprehensive Curriculum</h3>
              <p className="text-gray-600">
                Our courses cover everything from programming basics to advanced concepts with hands-on projects and
                exercises.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Industry Certifications</h3>
              <p className="text-gray-600">
                Earn recognized certifications that validate your skills and boost your career prospects.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced professionals who bring real-world expertise to their teaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Get Certified in Programming Languages</h2>
              <p className="mt-4 text-gray-600">
                Our certification program validates your skills in various programming languages and technologies,
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Learn%2C%20Code%2C%20Create%20%2CCertify.jpg-ggjBnEMFM6CjCzItqWxjurgwbTTUoT.jpeg"
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

      {/* CTA */}
      <section className="bg-purple-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
            Join thousands of students who are already learning programming and earning certifications with Acroeduvos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
              <Link href="/courses">Browse Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-purple-600">
              <Link href="/courses">Start Learning Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
