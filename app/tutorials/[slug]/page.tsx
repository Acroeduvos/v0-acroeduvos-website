import { notFound } from "next/navigation"

export default function TutorialArticle({ params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) return notFound()

  return (
    <div className="container mx-auto px-4 py-10">
      <article className="prose max-w-none">
        <h1 className="mb-2">{slug.replace(/-/g, " ")}</h1>
        <p className="text-gray-600">A practical tutorial with examples and tips.</p>

        <h2>Overview</h2>
        <p>
          This tutorial provides a concise walkthrough so you can get productive quickly. It includes examples, common
          pitfalls, and short exercises.
        </p>

        <h2>Prerequisites</h2>
        <ul>
          <li>Basic programming familiarity</li>
          <li>Text editor and terminal</li>
        </ul>

        <h2>Step-by-step</h2>
        <ol>
          <li>Understand the problem and desired outcome.</li>
          <li>Follow the guided example.</li>
          <li>Try the exercises at the end.</li>
        </ol>

        <h2>Further Reading</h2>
        <ul>
          <li>Official docs</li>
          <li>Community guides</li>
        </ul>
      </article>
    </div>
  )
}
