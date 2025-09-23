"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function VerifyFormPage() {
  const [credentialId, setCredentialId] = useState("")
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verify Certificate</h1>
      <p className="mt-2 text-gray-600">Enter your credential ID to check its validity.</p>
      <form
        className="mt-6 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (credentialId.trim()) router.push(`/verify/${encodeURIComponent(credentialId.trim())}`)
        }}
      >
        <input
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2"
          placeholder="e.g. ACRO-C-2025-1234"
        />
        <Button type="submit" className="bg-black">Verify</Button>
      </form>
    </div>
  )
}

