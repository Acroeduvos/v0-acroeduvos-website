"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink } from "lucide-react"
import { isAuthenticated } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"

export default function CertificatesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = isAuthenticated()
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.push("/auth/login?returnUrl=/certificates")
      return
    }

    // Get user data
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  // Mock certificates data
  const certificates = [
    {
      id: "c-programming",
      title: "C Programming Fundamentals",
      issueDate: "March 15, 2025",
      credentialID: "ACRO-C-2025-1234",
    },
    {
      id: "web-development",
      title: "Web Development Bootcamp",
      issueDate: "February 20, 2025",
      credentialID: "ACRO-WEB-2025-5678",
    },
    {
      id: "java-development",
      title: "Java Development",
      issueDate: "January 10, 2025",
      credentialID: "ACRO-JAVA-2025-9012",
    },
  ]

  if (!isLoggedIn) {
    return <div className="container mx-auto px-4 py-8">Redirecting to login...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Certificates</h1>
        <p className="mt-2 text-gray-600">View and download your earned certificates from completed courses</p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
              <div className="relative h-48 bg-[#f5f2ee]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Learn%2C%20Code%2C%20Create%20%2CCertify.jpg-ggjBnEMFM6CjCzItqWxjurgwbTTUoT.jpeg"
                    alt={certificate.title}
                    fill
                    className="object-cover opacity-50"
                  />
                  <Award className="h-16 w-16 text-purple-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{certificate.title}</h3>
                <div className="mb-4 space-y-1 text-sm text-gray-500">
                  <p>Issued: {certificate.issueDate}</p>
                  <p>Credential ID: {certificate.credentialID}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild className="flex-1 bg-black">
                    <Link href={`/certificates/${certificate.id}`}>View Certificate</Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/certificates/${certificate.id}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Award className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-xl font-bold">No Certificates Yet</h3>
          <p className="mb-6 text-gray-600">Complete courses and pass certification exams to earn your certificates</p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}

      <div className="mt-12 rounded-lg bg-[#f5f2ee] p-6">
        <h2 className="mb-4 text-xl font-bold">About Our Certifications</h2>
        <p className="mb-4 text-gray-700">
          Acroeduvos certificates are awarded to students who successfully complete our courses and pass the required
          assessments. These certificates validate your skills and knowledge in various programming languages and
          technologies.
        </p>
        <p className="text-gray-700">
          Each certificate includes a unique credential ID that can be verified by potential employers or educational
          institutions through our verification system.
        </p>
      </div>
    </div>
  )
}
