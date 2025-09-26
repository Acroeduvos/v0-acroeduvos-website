import { NextRequest, NextResponse } from "next/server"

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com"
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || ""

const LANGUAGE_MAP = {
  cpp: 54,
  cpp14: 54,
  cpp17: 54,
  java: 62,
  python: 71,
  python3: 71,
  pypy3: 71,
  javascript: 63,
}

export async function POST(req: NextRequest) {
  try {
    const { code, language, input } = await req.json()
    
    if (!code || !language) {
      return NextResponse.json({ error: "Missing code or language" }, { status: 400 })
    }

    const languageId = LANGUAGE_MAP[language.toLowerCase()] || 54 // Default to C++

    // Create submission
    const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input || "",
      }),
    })

    if (!submitResponse.ok) {
      return NextResponse.json(
        { error: "Failed to submit code" },
        { status: submitResponse.status }
      )
    }

    const { token } = await submitResponse.json()

    // Get submission result
    const resultResponse = await fetch(
      `${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,compile_output`,
      {
        headers: {
          "X-RapidAPI-Key": JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    )

    if (!resultResponse.ok) {
      return NextResponse.json(
        { error: "Failed to get results" },
        { status: resultResponse.status }
      )
    }

    const result = await resultResponse.json()

    return NextResponse.json({
      output: result.stdout || result.compile_output || result.stderr || "",
      status: result.status_id,
    })
  } catch (error) {
    console.error("Code execution error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
