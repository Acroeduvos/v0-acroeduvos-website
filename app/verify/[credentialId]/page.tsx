import { notFound } from "next/navigation"

// Mock verification against simple pattern and known IDs
function verifyCredential(credentialId: string) {
  const pattern = /^ACRO-[A-Z]+-\d{4}-\d{4}$/
  const known = new Set(["ACRO-C-2025-1234", "ACRO-WEB-2025-5678", "ACRO-JAVA-2025-9012"])
  if (!pattern.test(credentialId)) return { valid: false }
  const isKnown = known.has(credentialId)
  return { valid: true, isKnown }
}

export default function VerifyPage({ params }: { params: { credentialId: string } }) {
  const { credentialId } = params
  const result = verifyCredential(credentialId)
  if (!result.valid) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Certificate Verification</h1>
      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <p className="text-gray-700">
          Credential ID: <span className="font-mono font-semibold">{credentialId}</span>
        </p>
        <p className="mt-2">
          Status: <span className={result.isKnown ? "text-green-700" : "text-yellow-700"}>{result.isKnown ? "Verified" : "Valid format (record not found)"}</span>
        </p>
      </div>
    </div>
  )
}

