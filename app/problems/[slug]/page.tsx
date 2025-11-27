"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProblemInterface } from "@/components/problem-interface"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProblemPage() {
  const params = useParams()
  const [problem, setProblem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProblem()
  }, [params.slug])

  const fetchProblem = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/problems?slug=${params.slug}`)
      const data = await response.json()
      
      if (data.success) {
        setProblem(data.problem)
      } else {
        setError(data.error || 'Problem not found')
      }
    } catch (err) {
      setError('Failed to load problem')
      console.error('Error fetching problem:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <a href="/practice" className="text-blue-600 hover:underline">
            Back to Problems
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProblemInterface problem={problem} />
    </div>
  )
}
