import { NextRequest, NextResponse } from "next/server"
import { deleteQuiz, getQuiz, migrate } from "@/lib/server/db"

const FILE = "quizzes.json"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await migrate()
  const quiz = await getQuiz(params.id)
  if (!quiz) return new NextResponse("Not found", { status: 404 })
  return NextResponse.json(quiz)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (req.headers.get("x-role") !== "teacher") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  await migrate()
  await deleteQuiz(params.id)
  return NextResponse.json({ ok: true })
}


