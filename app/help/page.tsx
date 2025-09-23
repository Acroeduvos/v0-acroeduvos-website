export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Help Center</h1>
      <p className="mt-2 text-gray-600">Find answers to common questions and get support.</p>
      <div className="mt-6 space-y-4">
        <details className="rounded-lg border bg-white p-4 shadow-sm">
          <summary className="cursor-pointer font-medium">How do I register?</summary>
          <p className="mt-2 text-gray-600">Go to the Sign up page and create your free account.</p>
        </details>
        <details className="rounded-lg border bg-white p-4 shadow-sm">
          <summary className="cursor-pointer font-medium">How do I earn a certificate?</summary>
          <p className="mt-2 text-gray-600">Complete a course and pass the assessments to receive a certificate.</p>
        </details>
      </div>
    </div>
  )
}

