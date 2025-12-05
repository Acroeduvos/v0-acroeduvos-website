import { NextRequest, NextResponse } from "next/server"
import { listQuizzes, upsertQuiz, migrate } from "@/lib/server/db"

type Quiz = {
  id: string
  title: string
  duration: number
  questions: Array<{
    id: string
    type: "mcq" | "short"
    prompt: string
    options?: string[]
    answer?: string
    marks: number
  }>
}

export async function GET() {
  await migrate()
  const quizzes = await listQuizzes()
  return NextResponse.json({ quizzes })
}

export async function POST(req: NextRequest) {
  if (req.headers.get("x-role") !== "teacher") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  const body = (await req.json()) as Quiz
  await migrate()
  await upsertQuiz({ id: body.id, title: body.title, duration: body.duration, questions: body.questions })
  return NextResponse.json({ ok: true })
}


