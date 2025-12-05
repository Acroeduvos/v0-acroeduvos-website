"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getUser } from "@/lib/auth-utils"
import { Input } from "@/components/ui/input"

type Submission = { id: string; name: string; answers: Record<string, string>; autoScore: number; remarks?: string; finalScore?: number }

async function fetchSubmissions(id: string) {
  const res = await fetch(`/api/quizzes/${id}/submissions`)
  if (!res.ok) return [] as Submission[]
  const data = await res.json()
  return data.submissions as Submission[]
}

export default function GradeQuizPage() {
  const params = useParams<{ id: string }>()
  const user = getUser()
  if (!user || user.role !== "teacher") {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Grade Quiz</h1>
        <p className="text-gray-600">Only teachers can grade submissions.</p>
      </div>
    )
  }

  const [subs, setSubs] = useState<Submission[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => {
    fetchSubmissions(params.id).then((s) => {
      setSubs(s)
      setSelected(s[0]?.id || null)
    })
  }, [params])
  const current = useMemo(() => subs.find((s) => s.id === selected), [subs, selected])

  const saveGrade = async () => {
    const cur = current
    if (!cur) return
    await fetch(`/api/quizzes/${params.id}/submissions`, { method: "POST", headers: { "Content-Type": "application/json", "x-role": "teacher" }, body: JSON.stringify({ ...cur }) })
    alert("Saved")
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Grade Quiz • {params.id}</h1>
          <p className="text-gray-600">Manually adjust subjective marks, add remarks</p>
        </div>
        <Link href={`/quizzes/${params.id}`} className="rounded-md border px-3 py-2 text-sm">Back</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-lg border">
          <div className="p-4 border-b font-medium">Submissions</div>
          <div className="p-2">
            {subs.map((s) => (
              <button key={s.id} onClick={() => setSelected(s.id)} className={`w-full text-left rounded-md px-3 py-2 ${selected === s.id ? 'bg-purple-50' : ''}`}>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">AutoScore: {s.autoScore}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              {current ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium">Student</div>
                      <div>{current.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Auto Score</div>
                      <div>{current.autoScore}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Final Score</div>
                    <Input type="number" value={current.finalScore ?? current.autoScore} onChange={(e) => setSubs((all) => all.map((x) => x.id === current.id ? { ...x, finalScore: Number(e.target.value || 0) } : x))} />
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Remarks</div>
                    <Textarea value={current.remarks || ''} onChange={(e) => setSubs((all) => all.map((x) => x.id === current.id ? { ...x, remarks: e.target.value } : x))} />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveGrade} className="bg-purple-600">Save</Button>
                  </div>
                </>
              ) : (
                <div className="p-6 text-gray-600">Select a submission to grade.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


