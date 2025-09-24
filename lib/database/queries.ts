import { createClient } from "@/lib/supabase/server"
import type { Database } from "./types"

type Problem = Database["public"]["Tables"]["problems"]["Row"]
type ProblemSubmission = Database["public"]["Tables"]["problem_submissions"]["Row"]

export async function getProblems() {
  const supabase = await createClient()

  const { data: problems, error } = await supabase
    .from("problems")
    .select(`
      *,
      problem_companies (
        company_name
      )
    `)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching problems:", error)
    return []
  }

  return problems
}

export async function getProblemBySlug(slug: string) {
  const supabase = await createClient()

  const { data: problem, error } = await supabase
    .from("problems")
    .select(`
      *,
      problem_companies (
        company_name
      ),
      problem_solutions (
        language,
        starter_code,
        solution_code,
        explanation,
        approach,
        time_complexity,
        space_complexity
      )
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching problem:", error)
    return null
  }

  return problem
}

export async function getCourses() {
  const supabase = await createClient()

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching courses:", error)
    return []
  }

  return courses
}

export async function getUserProgress(userId: string, courseId?: string) {
  const supabase = await createClient()

  let query = supabase.from("user_progress").select("*").eq("user_id", userId)

  if (courseId) {
    query = query.eq("course_id", courseId)
  }

  const { data: progress, error } = await query

  if (error) {
    console.error("Error fetching user progress:", error)
    return []
  }

  return progress
}

export async function submitProblemSolution(submission: {
  user_id: string
  problem_id: string
  language: string
  code: string
  status: ProblemSubmission["status"]
  runtime_ms?: number
  memory_mb?: number
  test_cases_passed?: number
  total_test_cases?: number
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("problem_submissions").insert(submission).select().single()

  if (error) {
    console.error("Error submitting solution:", error)
    return null
  }

  return data
}

export async function getUserSubmissions(userId: string, problemId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from("problem_submissions")
    .select(`
      *,
      problems (
        title,
        slug,
        difficulty
      )
    `)
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false })

  if (problemId) {
    query = query.eq("problem_id", problemId)
  }

  const { data: submissions, error } = await query

  if (error) {
    console.error("Error fetching submissions:", error)
    return []
  }

  return submissions
}
