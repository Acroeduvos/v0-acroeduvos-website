export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h1>
      <div className="mt-6 space-y-4">
        {[
          { q: "Is Acroeduvos free?", a: "Yes, courses and practice resources are free." },
          { q: "Do certificates cost anything?", a: "No, certifications are free upon completion." },
          { q: "Can I reset my password?", a: "Use the Forgot password link on the login page." },
        ].map(({ q, a }) => (
          <details key={q} className="rounded-lg border bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-medium">{q}</summary>
            <p className="mt-2 text-gray-600">{a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

