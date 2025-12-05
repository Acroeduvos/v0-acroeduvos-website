"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type MCQ = { id: string; type: "mcq"; prompt: string; options: string[]; answer: string; marks: number }
type Short = { id: string; type: "short"; prompt: string; answer?: string; marks: number }
type Q = MCQ | Short

async function fetchQuiz(id: string) {
  const res = await fetch(`/api/quizzes/${id}`)
  if (!res.ok) return null
  return (await res.json()) as { title: string; duration: number; questions: Q[] }
}

export default function TakeQuizPage() {
  const params = useParams<{ id: string }>()
  const [quiz, setQuiz] = useState<{ title: string; duration: number; questions: Q[] } | null>(null)
  useEffect(() => {
    fetchQuiz(params.id).then(setQuiz)
  }, [params])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [score, setScore] = useState<number | null>(null)

  const submit = () => {
    if (!quiz) return
    let total = 0
    let obtained = 0
    quiz.questions.forEach((q) => {
      total += q.marks
      const a = answers[q.id]
      if (q.type === "mcq") {
        if (a === q.answer) obtained += q.marks
      } else {
        if (q.answer && a && a.trim().toLowerCase().includes(q.answer.trim().toLowerCase())) obtained += q.marks
      }
    })
    setScore(Math.max(0, obtained))
    // Persist submission
    await fetch(`/api/quizzes/${params.id}/submissions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: "student", answers, autoScore: obtained }) })
    alert(`Submitted. Score: ${obtained}/${total}`)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{quiz?.title || "Quiz"}</h1>
          <p className="text-gray-600">Duration: {quiz?.duration} mins</p>
        </div>
        <Link href="/quizzes" className="rounded-md border px-3 py-2 text-sm">Back</Link>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {quiz?.questions.map((q, idx) => (
            <div key={q.id} className="rounded-lg border p-4 space-y-3">
              <div className="text-sm text-gray-600">Q{idx + 1} • {q.marks} mark(s)</div>
              <div className="font-medium">{q.prompt}</div>
              {q.type === "mcq" ? (
                <div className="grid gap-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input type="radio" name={q.id} onChange={() => setAnswers((a) => ({ ...a, [q.id]: String(i) }))} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <Input placeholder="Type your answer" onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))} />
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <Button onClick={submit} className="bg-purple-600">Submit</Button>
          </div>

          {score !== null && (
            <div className="rounded-lg border p-4">Score: {score}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


