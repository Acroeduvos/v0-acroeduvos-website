import { NextRequest, NextResponse } from "next/server"

// Judge0 API configuration
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com"
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || ""

// Language mapping for Judge0
const LANGUAGE_MAP = {
  cpp: 54,    // C++ (GCC 9.2.0)
  cpp14: 54,  // C++ (GCC 9.2.0)
  cpp17: 54,  // C++ (GCC 9.2.0)
  java: 62,   // Java (OpenJDK 13.0.1)
  python: 71, // Python (3.8.1)
  python3: 71, // Python (3.8.1)
  pypy3: 71,  // Python (3.8.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
}

export async function POST(req: NextRequest) {
  try {
    const { code, language, input } = await req.json()
    
    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      )
    }

    const languageId = LANGUAGE_MAP[language as keyof typeof LANGUAGE_MAP] || 71 // Default to Python
    
    // Create submission to Judge0
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input || "",
        expected_output: null,
        cpu_time_limit: 5,
        memory_limit: 128000,
      })
    })

    if (!submissionResponse.ok) {
      throw new Error(`Judge0 API error: ${submissionResponse.status}`)
    }

    const result = await submissionResponse.json()
    
    // Handle different statuses
    let output = ""
    let status = "success"
    
    if (result.status?.id === 3) {
      // Accepted
      output = result.stdout || "No output"
    } else if (result.status?.id === 5) {
      // Time Limit Exceeded
      output = "Time Limit Exceeded"
      status = "error"
    } else if (result.status?.id === 6) {
      // Compilation Error
      output = result.compile_output || "Compilation Error"
      status = "error"
    } else if (result.status?.id === 11) {
      // Runtime Error
      output = result.stderr || "Runtime Error"
      status = "error"
    } else {
      output = result.stderr || result.stdout || "Unknown execution status"
      status = result.status?.id > 3 ? "error" : "success"
    }

    return NextResponse.json({
      output,
      status,
      time: result.time,
      memory: result.memory,
    })

  } catch (error) {
    console.error("Code execution error:", error)
    return NextResponse.json(
      { 
        error: "Failed to execute code",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
