"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Award, ArrowRight } from "lucide-react"

export default function CourseCompletionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.push(`/auth/login?returnUrl=/courses/${params.id}/complete`)
      return
    }

    // Get user data
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [params.id, router])

  // Map course IDs to certificate types
  const certificateMap: Record<string, string> = {
    "1": "c-programming",
    "2": "cpp-programming",
    "3": "java-development",
    "4": "web-development",
    "5": "cyber-security",
    "6": "app-development",
    "7": "ai-development",
  }

  // Get the certificate ID for this course
  const certificateId = certificateMap[params.id] || "c-programming"

  if (!isLoggedIn || !user) {
    return <div className="container mx-auto px-4 py-8">Redirecting to login...</div>
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="mb-4 text-center text-4xl font-bold">Congratulations, {user.name}!</h1>
      <p className="mb-8 text-center text-xl text-gray-600">
        You have successfully completed the course and earned your certificate.
      </p>

      <div className="mb-12 w-full max-w-lg">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border-4 border-[#e8e3dc] shadow-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Learn%2C%20Code%2C%20Create%20%2CCertify.jpg-ggjBnEMFM6CjCzItqWxjurgwbTTUoT.jpeg"
            alt="Certificate Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button asChild className="bg-white text-black hover:bg-gray-100">
              <Link href={`/certificates/${certificateId}`}>
                <Award className="mr-2 h-5 w-5" />
                View Your Certificate
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild className="bg-black">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/courses">
            Explore More Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
