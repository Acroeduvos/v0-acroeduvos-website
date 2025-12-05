"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { CodeEditor } from "@/components/code-editor"

const PROBLEMS: Record<string, Record<string, { title: string; statement: string; sampleInput?: string; sampleOutput?: string }>> = {
  google: {
    "two-sum": {
      title: "Two Sum",
      statement:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      sampleInput: "4\n2 7 11 15\n9",
      sampleOutput: "0 1",
    },
    "word-ladder": {
      title: "Word Ladder",
      statement: "Given two words and a dictionary, find the length of shortest transformation sequence.",
    },
  },
  tcs: {
    "sum-of-digits": {
      title: "Sum of Digits",
      statement: "Given an integer N, compute sum of its digits.",
      sampleInput: "12345",
      sampleOutput: "15",
    },
  },
}

export default function SolveCompanyProblemPage() {
  const params = useParams<{ company: string; id: string }>()
  const problem = useMemo(() => PROBLEMS[params.company]?.[params.id], [params])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{problem?.title || "Problem"}</h1>
          <p className="text-gray-600 capitalize">{params.company} • {params.id}</p>
        </div>
        <Link href={`/mncs/${params.company}/questions`} className="rounded-md border px-3 py-2 text-sm">Back</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">Problem Statement</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{problem?.statement || "Problem statement coming soon."}</p>
          {problem?.sampleInput && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Sample Input</h3>
              <pre className="rounded bg-gray-50 p-2 text-sm">{problem.sampleInput}</pre>
            </div>
          )}
          {problem?.sampleOutput && (
            <div className="mt-2">
              <h3 className="text-sm font-medium">Sample Output</h3>
              <pre className="rounded bg-gray-50 p-2 text-sm">{problem.sampleOutput}</pre>
            </div>
          )}
        </div>

        <div>
          <CodeEditor initialLanguage="cpp" />
        </div>
      </div>
    </div>
  )
}


