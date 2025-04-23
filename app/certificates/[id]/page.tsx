"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2 } from "lucide-react"

export default function CertificatePage({ params }: { params: { id: string } }) {
  const certificateRef = useRef<HTMLDivElement>(null)

  // Mock certificate data - in a real app, this would be fetched from an API
  const certificate = {
    id: params.id,
    title: "Algorithm Specialist",
    recipientName: "John Doe",
    issueDate: "March 10, 2025",
    expiryDate: "March 10, 2027",
    credentialID: "ACRO-ALG-2025-1234",
    issuer: "Acroeduvos Learning Platform",
    description:
      "This certificate is awarded for successfully completing the Algorithm Specialist course and demonstrating proficiency in algorithm design, analysis, and implementation.",
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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Certificate of Completion</h1>
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
          className="relative w-full max-w-4xl overflow-hidden rounded-lg border-8 border-[#e8e3dc] bg-white p-8 shadow-lg"
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#e8e3dc]/20"></div>
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#e8e3dc]/20"></div>

          <div className="relative z-10 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative h-24 w-24">
                <Image src="/logo.png" alt="Acroeduvos Logo" fill className="object-contain" />
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-light uppercase tracking-widest text-gray-600">
              Certificate of Completion
            </h2>
            <h3 className="mb-8 text-4xl font-bold text-gray-900">{certificate.title}</h3>

            <p className="mb-8 text-lg text-gray-600">This is to certify that</p>
            <p className="mb-8 text-3xl font-bold text-gray-900">{certificate.recipientName}</p>

            <p className="mb-8 text-lg text-gray-600">
              has successfully completed the course requirements and demonstrated proficiency in the subject matter.
            </p>

            <div className="mb-8 flex justify-center">
              <Award className="h-16 w-16 text-[#c2b8a3]" />
            </div>

            <div className="mb-8 grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium uppercase text-gray-500">Issue Date</p>
                <p className="text-lg font-medium">{certificate.issueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase text-gray-500">Valid Until</p>
                <p className="text-lg font-medium">{certificate.expiryDate}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium uppercase text-gray-500">Credential ID</p>
              <p className="text-lg font-medium">{certificate.credentialID}</p>
            </div>

            <div className="mb-8 flex justify-between">
              <div>
                <div className="mb-4 h-px w-40 bg-gray-300"></div>
                <p className="text-lg font-medium">Course Director</p>
              </div>
              <div>
                <div className="mb-4 h-px w-40 bg-gray-300"></div>
                <p className="text-lg font-medium">Platform Director</p>
              </div>
            </div>

            <div className="rounded-lg bg-[#f5f2ee] p-4 text-sm text-gray-600">
              <p>
                Verify this certificate at{" "}
                <span className="font-medium">acroeduvos.acroeduvos.in/verify/{certificate.credentialID}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
