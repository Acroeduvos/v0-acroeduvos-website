"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

export default function CertificatePage({ params }: { params: { id: string } }) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Mock certificate data - in a real app, this would be fetched from an API
  const certificateTypes: Record<string, any> = {
    "c-programming": {
      title: "C Programming Fundamentals",
      course: "C Programming",
      description:
        "This certificate is awarded for successfully completing the C Programming Fundamentals course and demonstrating proficiency in C programming concepts and applications.",
    },
    "cpp-programming": {
      title: "C++ Advanced Concepts",
      course: "C++ Programming",
      description:
        "This certificate is awarded for successfully completing the C++ Advanced Concepts course and demonstrating proficiency in object-oriented programming and STL.",
    },
    "java-development": {
      title: "Java Development",
      course: "Java Programming",
      description:
        "This certificate is awarded for successfully completing the Java Development course and demonstrating proficiency in Java programming and application development.",
    },
    "web-development": {
      title: "Web Development Bootcamp",
      course: "Web Development",
      description:
        "This certificate is awarded for successfully completing the Web Development Bootcamp and demonstrating proficiency in HTML, CSS, JavaScript, and modern frameworks.",
    },
    "cyber-security": {
      title: "Cyber Security Essentials",
      course: "Cyber Security",
      description:
        "This certificate is awarded for successfully completing the Cyber Security Essentials course and demonstrating proficiency in cybersecurity concepts, tools, and best practices.",
    },
    "app-development": {
      title: "Mobile App Development",
      course: "App Development",
      description:
        "This certificate is awarded for successfully completing the Mobile App Development course and demonstrating proficiency in building native mobile applications.",
    },
    "ai-development": {
      title: "AI & Machine Learning",
      course: "AI Development",
      description:
        "This certificate is awarded for successfully completing the AI & Machine Learning course and demonstrating proficiency in artificial intelligence and machine learning algorithms.",
    },
  }

  const certificate = {
    id: params.id,
    title: certificateTypes[params.id]?.title || "Course Completion",
    recipientName: user?.name || "Student Name",
    issueDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    credentialID: `ACRO-${params.id.toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    issuer: "Acropolis Institute of Technology and Research, Indore",
    course: certificateTypes[params.id]?.course || "Programming",
    description:
      certificateTypes[params.id]?.description ||
      "This certificate is awarded for successfully completing the course requirements and demonstrating proficiency in the subject matter.",
  }

  const handleDownload = () => {
    // In a real app, this would use a library like html2canvas or jsPDF to generate a PDF
    alert("Certificate download functionality would be implemented here")
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert("Certificate sharing functionality would be implemented here")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Certificate of Appreciation</h1>
        <div className="flex gap-4">
          <Button onClick={handleDownload} className="flex items-center gap-2 bg-black">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          ref={certificateRef}
          className="relative w-full max-w-4xl overflow-hidden rounded-lg border-8 border-blue-900 bg-white p-8 shadow-lg"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Learn%2C%20Code%2C%20Create%20%2CCertify.jpg-ggjBnEMFM6CjCzItqWxjurgwbTTUoT.jpeg"
            alt="Certificate"
            width={1200}
            height={800}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative z-10 p-4 text-center">
            <div className="mb-6 flex justify-center">
              <Image src="/logo.png" alt="Acroeduvos Logo" width={96} height={96} />
            </div>

            <div className="mt-32 mb-8">
              <p className="text-lg text-gray-800">This certificate is awarded to</p>
              <h2 className="my-4 text-4xl font-bold text-gray-900">{certificate.recipientName}</h2>
              <p className="text-lg text-gray-800">
                in recognition of his/her <span className="font-semibold">Outstanding</span> Performance in course{" "}
                <span className="font-semibold">{certificate.course}</span>
              </p>
              <p className="mt-2 text-lg text-gray-800">
                Organized by <span className="font-semibold">{certificate.issuer}</span>
              </p>
            </div>

            <div className="mt-16 mb-8 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-2 h-px w-full bg-gray-400"></div>
                <p className="text-lg font-medium">SEAL</p>
              </div>
              <div className="text-center">
                <div className="mb-2 h-px w-full bg-gray-400"></div>
                <p className="text-lg font-medium">HEAD OF DEPARTMENT</p>
              </div>
              <div className="text-center">
                <div className="mb-2 h-px w-full bg-gray-400"></div>
                <p className="text-lg font-medium">DIRECTOR</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-600">
                Certificate ID: {certificate.credentialID} • Issue Date: {certificate.issueDate}
              </p>
              <p className="text-sm text-gray-600">
                Verify this certificate at acroeduvos.acroeduvos.in/verify/{certificate.credentialID}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
