import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState<Array<{ id: string; title: string; duration: number; questions: any[] }>>([])
  useEffect(() => {
    fetch("/api/quizzes").then((r) => r.json()).then((d) => setQuizzes(d.quizzes || []))
  }, [])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-gray-600">Practice assessments and teacher-created tests</p>
        </div>
        <Link href="/quizzes/create" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">Create Quiz</Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q) => (
          <Card key={q.id}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-1">{q.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{q.questions.length} questions • {q.duration} mins</p>
              <div className="flex gap-3">
                <Link href={`/quizzes/${q.id}`} className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white">Take</Link>
                <Link href={`/quizzes/${q.id}/grade`} className="rounded-md border px-4 py-2 text-sm font-medium">Grade</Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {quizzes.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-gray-600">No quizzes yet. Teachers can create one.</div>
        )}
      </div>
    </div>
  )
}


