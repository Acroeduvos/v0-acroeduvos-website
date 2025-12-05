import { NextRequest, NextResponse } from 'next/server'

interface ExecuteRequest {
  language: string
  code: string
  input?: string
}

interface ExecuteResponse {
  success: boolean
  output?: string
  error?: string
  executionTime?: number
  memoryUsage?: number
  exitCode?: number
}

// Free Judge0 Community Edition API
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com'
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || 'test'
const JUDGE0_API_HOST = 'judge0-ce.p.rapidapi.com'

// Language mappings for Judge0
const languageMap: { [key: string]: number } = {
  'python': 71,      // Python 3.8.1
  'javascript': 63,  // Node.js 12.14.0
  'java': 62,        // Java 13.0.1
  'cpp': 54,         // C++ 17
  'c++': 54,         // C++ 17
  'c': 50,           // C (GCC 9.2.0)
  'go': 60,          // Go 1.13.5
  'rust': 73,        // Rust 1.40.0
  'typescript': 74,  // TypeScript 3.7.4
  'php': 68,         // PHP 7.4.1
  'ruby': 72,        // Ruby 2.7.0
  'csharp': 51,      // C# 8.0
  'c#': 51,          // C# 8.0
  'kotlin': 78,      // Kotlin 1.3.70
}

export async function POST(request: NextRequest) {
  try {
    const { language, code, input = '' }: ExecuteRequest = await request.json()

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: 'Language and code are required' },
        { status: 400 }
      )
    }

    // Use Judge0 for real-time execution
    const result = await executeWithJudge0(language, code, input)
    return NextResponse.json(result)

  } catch (error) {
    console.error('Execution error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

async function executeWithJudge0(language: string, code: string, input: string): Promise<ExecuteResponse> {
  const languageId = languageMap[language.toLowerCase()]

  if (!languageId) {
    return {
      success: false,
      error: `Unsupported language: ${language}. Supported: ${Object.keys(languageMap).join(', ')}`
    }
  }

  try {
    // Prepare submission
    const submissionData = {
      language_id: languageId,
      source_code: Buffer.from(code).toString('base64'),
      stdin: Buffer.from(input).toString('base64'),
      cpu_time_limit: 5,
      memory_limit: 128000,
      wall_time_limit: 10
    }

    // Submit to Judge0
    const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': JUDGE0_API_HOST
      },
      body: JSON.stringify(submissionData)
    })

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text()
      throw new Error(`Judge0 API error (${submitResponse.status}): ${errorText}`)
    }

    const result = await submitResponse.json()

    // Process result based on status
    const statusId = result.status?.id

    if (statusId === 3) {
      // Accepted - Success
      const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : ''
      const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''

      return {
        success: true,
        output: stdout + (stderr ? `\n\nWarnings:\n${stderr}` : ''),
        executionTime: result.time ? parseFloat(result.time) * 1000 : 0,
        memoryUsage: result.memory ? parseFloat(result.memory) / 1024 : 0,
        exitCode: 0
      }
    } else if (statusId === 6) {
      // Compilation Error
      const compileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : 'Compilation failed'
      return {
        success: false,
        error: `Compilation Error:\n${compileOutput}`,
        executionTime: result.time ? parseFloat(result.time) * 1000 : 0
      }
    } else if (statusId === 5) {
      // Time Limit Exceeded
      return {
        success: false,
        error: 'Time Limit Exceeded: Your code took too long to execute (limit: 5 seconds)',
        executionTime: 5000
      }
    } else if (statusId === 11 || statusId === 12) {
      // Runtime Error
      const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''
      const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : ''
      return {
        success: false,
        error: `Runtime Error:\n${stderr || stdout || 'Unknown runtime error'}`,
        executionTime: result.time ? parseFloat(result.time) * 1000 : 0
      }
    } else {
      // Other errors
      const statusDesc = result.status?.description || 'Unknown error'
      const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''
      return {
        success: false,
        error: `Execution failed: ${statusDesc}\n${stderr}`,
        executionTime: result.time ? parseFloat(result.time) * 1000 : 0
      }
    }

  } catch (error) {
    console.error('Judge0 execution error:', error)
    return {
      success: false,
      error: `Execution service error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AcroEduvos Real-Time Execution API',
    version: '4.0.0',
    mode: 'real-time',
    engine: 'Judge0 Community Edition'
  })
}
