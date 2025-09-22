"use client"

import { useState } from "react"
import { getUser } from "@/lib/auth-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Question = {
  id: string
  type: "mcq" | "short"
  prompt: string
  options?: string[]
  answer?: string // for mcq: index (string); for short: expected answer (optional)
  marks: number
}

export default function CreateQuizPage() {
  const user = getUser()
  if (!user || user.role !== "teacher") {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">Create Quiz</h1>
        <p className="text-gray-600">Only teachers can create quizzes.</p>
      </div>
    )
  }
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState(30)
  const [questions, setQuestions] = useState<Question[]>([])

  const addMcq = () => {
    setQuestions((q) => [
      ...q,
      { id: crypto.randomUUID(), type: "mcq", prompt: "", options: ["", "", "", ""], answer: "0", marks: 1 },
    ])
  }

  const addShort = () => {
    setQuestions((q) => [...q, { id: crypto.randomUUID(), type: "short", prompt: "", marks: 2 }])
  }

  const saveQuiz = async () => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID()
    const payload = { id, title, duration, questions }
    const res = await fetch("/api/quizzes", { method: "POST", headers: { "Content-Type": "application/json", "x-role": "teacher" }, body: JSON.stringify(payload) })
    if (!res.ok) return alert("Failed to save quiz")
    alert("Quiz saved")
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Create Quiz</h1>
      <p className="text-gray-600 mb-6">Upload/add questions and assign marks</p>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz title" />
            </div>
            <div>
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value || 0))} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={addMcq} className="bg-black">Add MCQ</Button>
            <Button onClick={addShort} variant="outline">Add Short Answer</Button>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Q{idx + 1} • {q.type.toUpperCase()} • {q.marks} mark(s)</div>
                  <Button variant="ghost" onClick={() => setQuestions((all) => all.filter((x) => x.id !== q.id))}>Remove</Button>
                </div>
                <div>
                  <label className="text-sm font-medium">Prompt</label>
                  <Textarea value={q.prompt} onChange={(e) => setQuestions((all) => all.map((x) => x.id === q.id ? { ...x, prompt: e.target.value } : x))} />
                </div>
                {q.type === "mcq" && (
                  <div className="grid gap-3">
                    <div className="text-sm font-medium">Options</div>
                    {q.options?.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input value={opt} onChange={(e) => setQuestions((all) => all.map((x) => x.id === q.id ? { ...x, options: (x.options || []).map((o, oi) => oi === i ? e.target.value : o) } : x))} placeholder={`Option ${i + 1}`} />
                        <label className="text-sm">Correct</label>
                        <input type="radio" name={`ans-${q.id}`} checked={q.answer === String(i)} onChange={() => setQuestions((all) => all.map((x) => x.id === q.id ? { ...x, answer: String(i) } : x))} />
                      </div>
                    ))}
                  </div>
                )}
                {q.type === "short" && (
                  <div>
                    <label className="text-sm font-medium">Reference Answer (optional)</label>
                    <Input value={q.answer || ""} onChange={(e) => setQuestions((all) => all.map((x) => x.id === q.id ? { ...x, answer: e.target.value } : x))} placeholder="For auto-marking/simple checks" />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Marks</label>
                  <Input type="number" value={q.marks} onChange={(e) => setQuestions((all) => all.map((x) => x.id === q.id ? { ...x, marks: Number(e.target.value || 0) } : x))} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={saveQuiz} className="bg-purple-600">Save Quiz</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


