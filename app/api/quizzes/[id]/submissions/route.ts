import { NextRequest, NextResponse } from "next/server"
import { listSubmissions, migrate, upsertSubmission } from "@/lib/server/db"

type Submission = {
  id: string
  quizId: string
  user: string
  answers: Record<string, string>
  autoScore: number
  finalScore?: number
  remarks?: string
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await migrate()
  const submissions = await listSubmissions(params.id)
  return NextResponse.json({ submissions })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await migrate()
  const body = (await req.json()) as Omit<Submission, "id"> & { id?: string }
  const id = await upsertSubmission({ id: body.id, quizId: params.id, user: body.user, answers: body.answers, autoScore: body.autoScore, finalScore: body.finalScore, remarks: body.remarks })
  return NextResponse.json({ ok: true, id })
}


