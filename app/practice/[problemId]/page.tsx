import { Header } from "@/components/header"
import { ProblemInterface } from "@/components/problem-interface"
import { getProblemBySlug } from "@/lib/database/queries"
import { notFound } from "next/navigation"

interface ProblemPageProps {
  params: {
    problemId: string
  }
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const problem = await getProblemBySlug(params.problemId)

  if (!problem) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProblemInterface problem={problem} />
      </main>
    </div>
  )
}
