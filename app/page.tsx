import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section - matches screenshot */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-700 to-purple-800 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Left: Headline and CTAs */}
            <div>
              <h1 className="text-left text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Learn to Code, Get
                <br />
                Certified
              </h1>
              <p className="mt-6 max-w-xl text-left text-purple-100 text-lg md:text-xl">
                Master programming languages, web development, cybersecurity, and more with our comprehensive FREE
                courses and earn industry-recognized certifications.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 hover:text-white"
                  >
                    Start Learning Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Stats card */}
            <div>
              <Card className="bg-white/5 border-white/10 shadow-2xl">
                <CardContent className="p-6">
                  <div className="mx-auto mb-6 flex justify-center">
                    <div className="relative h-20 w-14 rounded-md overflow-hidden bg-white text-purple-700 grid place-items-center font-semibold">
                      <span>AE</span>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold">Why Choose Acroeduvos?</h3>
                    <p className="text-sm text-purple-100">Your path to programming mastery</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md bg-white/5 px-4 py-5 text-center">
                      <div className="text-2xl font-bold">8+</div>
                      <div className="text-xs text-purple-100 mt-1">Languages</div>
                    </div>
                    <div className="rounded-md bg-white/5 px-4 py-5 text-center">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-xs text-purple-100 mt-1">Free</div>
                    </div>
                    <div className="rounded-md bg-white/5 px-4 py-5 text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-xs text-purple-100 mt-1">Access</div>
                    </div>
                    <div className="rounded-md bg-white/5 px-4 py-5 text-center">
                      <div className="text-2xl font-bold">∞</div>
                      <div className="text-xs text-purple-100 mt-1">Paths</div>
                    </div>
                  </div>
                  <div className="mt-8 rounded-md bg-white/5 p-4">
                    <div className="mb-3 font-semibold">Start Learning Today!</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                        <span>Free Courses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                        <span>Certificates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                        <span>Code Practice</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                        <span>24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Below sections removed to match the exact hero-only front page */}
    </div>
  )
}
