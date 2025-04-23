"use client"

import { AuthCheck } from "@/components/auth-check"
import { useParams } from "next/navigation"
import { CodeChefIDE } from "@/components/codechef-ide"

export default function ContestProblemSolvePage() {
  const params = useParams()

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Solve Problem in Contest</h1>
        <p className="mb-4">
          Contest ID: {params.id}, Problem ID: {params.problemId}
        </p>

        <CodeChefIDE />
      </div>
    </AuthCheck>
  )
}
