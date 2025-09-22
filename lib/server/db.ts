import { sql } from "@vercel/postgres"

export async function migrate() {
  await sql`CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    duration INT NOT NULL,
    questions JSONB NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    answers JSONB NOT NULL,
    auto_score INT NOT NULL,
    final_score INT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;
}

export type QuizRow = { id: string; title: string; duration: number; questions: any[] }

export async function listQuizzes(): Promise<QuizRow[]> {
  const { rows } = await sql`SELECT id, title, duration, questions FROM quizzes ORDER BY title`
  return rows as any
}

export async function upsertQuiz(q: QuizRow) {
  await sql`INSERT INTO quizzes (id, title, duration, questions) VALUES (${q.id}, ${q.title}, ${q.duration}, ${sql.json(q.questions)})
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, duration = EXCLUDED.duration, questions = EXCLUDED.questions`;
}

export async function getQuiz(id: string): Promise<QuizRow | null> {
  const { rows } = await sql`SELECT id, title, duration, questions FROM quizzes WHERE id = ${id} LIMIT 1`
  return (rows[0] as any) || null
}

export async function deleteQuiz(id: string) {
  await sql`DELETE FROM quizzes WHERE id = ${id}`
}

export async function listSubmissions(quizId: string) {
  const { rows } = await sql`SELECT id, quiz_id, user_name, answers, auto_score, final_score, remarks, created_at FROM submissions WHERE quiz_id = ${quizId} ORDER BY created_at DESC`
  return rows as any
}

export async function upsertSubmission(s: { id?: string; quizId: string; user: string; answers: any; autoScore: number; finalScore?: number; remarks?: string }) {
  const id = s.id || crypto.randomUUID()
  await sql`INSERT INTO submissions (id, quiz_id, user_name, answers, auto_score, final_score, remarks)
    VALUES (${id}, ${s.quizId}, ${s.user}, ${sql.json(s.answers)}, ${s.autoScore}, ${s.finalScore ?? null}, ${s.remarks ?? null})
    ON CONFLICT (id) DO UPDATE SET answers = EXCLUDED.answers, auto_score = EXCLUDED.auto_score, final_score = EXCLUDED.final_score, remarks = EXCLUDED.remarks`;
  return id
}


