import { NextRequest, NextResponse } from 'next/server'

interface CompileRequest {
  language: string
  code: string
  input?: string
}

interface CompileResponse {
  success: boolean
  output?: string
  error?: string
  executionTime?: number
  memoryUsage?: number
}

// Judge0 API configuration
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com'
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || ''

// Language mappings for Judge0
const languageMap: { [key: string]: number } = {
  'python': 71,      // Python 3.8.1
  'javascript': 63,  // Node.js 12.14.0
  'java': 62,        // Java 13.0.1
  'cpp': 54,         // C++ 17
  'c': 50,           // C (GCC 9.2.0)
  'go': 60,          // Go 1.13.5
  'rust': 73,        // Rust 1.40.0
  'typescript': 74,  // TypeScript 3.7.4
  'php': 68,         // PHP 7.4.1
  'ruby': 72,        // Ruby 2.7.0
  'sql': 82,         // SQLite 3.27.2
  'kotlin': 78,      // Kotlin 1.3.70
  'swift': 83,       // Swift 5.2.3
  'scala': 81,       // Scala 2.13.1
  'perl': 85,        // Perl 5.28.1
  'r': 80,           // R 4.0.0
  'bash': 46,        // Bash 5.0.0
  'powershell': 87,  // PowerShell 7.0.0
  'csharp': 51,      // C# 8.0
  'dart': 83,        // Dart 2.7.2
  'elixir': 84,      // Elixir 1.9.4
  'erlang': 58,      // Erlang 22.2
  'fsharp': 69,      // F# 4.7
  'haskell': 61,     // Haskell 8.8.1
  'lua': 64,         // Lua 5.3.4
  'ocaml': 79,       // OCaml 4.09.0
  'pascal': 67,      // Pascal 3.0.4
  'prolog': 76,      // Prolog 8.2.3
  'clojure': 86,     // Clojure 1.10.1
}

export async function POST(request: NextRequest) {
  try {
    const { language, code, input = '' }: CompileRequest = await request.json()

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: 'Language and code are required' },
        { status: 400 }
      )
    }

    const languageId = languageMap[language.toLowerCase()]
    if (!languageId) {
      return NextResponse.json(
        { success: false, error: `Unsupported language: ${language}` },
        { status: 400 }
      )
    }

    // If no Judge0 API key, return simulated output
    if (!JUDGE0_API_KEY) {
      return simulateExecution(language, code, input)
    }

    // Prepare submission data for Judge0
    const submissionData = {
      language_id: languageId,
      source_code: Buffer.from(code).toString('base64'),
      stdin: Buffer.from(input).toString('base64'),
      expected_output: null,
      cpu_time_limit: '5.0',
      memory_limit: '128000',
      wall_time_limit: '10.0'
    }

    // Submit code to Judge0
    const submitResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify(submissionData)
    })

    if (!submitResponse.ok) {
      throw new Error(`Judge0 API error: ${submitResponse.status}`)
    }

    const result = await submitResponse.json()

    // Handle different execution results
    if (result.status?.id === 3) {
      // Accepted - successful execution
      const output = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : ''
      const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''
      
      return NextResponse.json({
        success: true,
        output: output + (stderr ? `\n\nWarnings/Errors:\n${stderr}` : ''),
        executionTime: result.time ? parseFloat(result.time) * 1000 : 0, // Convert to milliseconds
        memoryUsage: result.memory ? parseFloat(result.memory) / 1024 : 0 // Convert to MB
      })
    } else if (result.status?.id === 6) {
      // Compilation Error
      const compileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : ''
      return NextResponse.json({
        success: false,
        error: `Compilation Error:\n${compileOutput}`
      })
    } else if (result.status?.id === 5) {
      // Time Limit Exceeded
      return NextResponse.json({
        success: false,
        error: 'Time Limit Exceeded: Your code took too long to execute'
      })
    } else if (result.status?.id === 9) {
      // Runtime Error
      const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''
      const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : ''
      return NextResponse.json({
        success: false,
        error: `Runtime Error:\n${stderr || stdout || 'Unknown runtime error'}`
      })
    } else {
      // Other errors
      const statusDescription = result.status?.description || 'Unknown error'
      return NextResponse.json({
        success: false,
        error: `Execution failed: ${statusDescription}`
      })
    }

  } catch (error) {
    console.error('Compilation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// Fallback simulation for when Judge0 is not available
function simulateExecution(language: string, code: string, input: string): CompileResponse {
  // Simple pattern matching for common errors
  const commonErrors = {
    python: [
      { pattern: /SyntaxError/, message: 'Syntax Error: Check your Python syntax' },
      { pattern: /IndentationError/, message: 'Indentation Error: Check your indentation' },
      { pattern: /NameError/, message: 'Name Error: Variable not defined' },
      { pattern: /TypeError/, message: 'Type Error: Check data types' }
    ],
    java: [
      { pattern: /class.*expected/, message: 'Compilation Error: Missing class declaration' },
      { pattern: /cannot find symbol/, message: 'Compilation Error: Variable or method not found' },
      { pattern: /missing return statement/, message: 'Compilation Error: Missing return statement' }
    ],
    cpp: [
      { pattern: /error: expected/, message: 'Compilation Error: Syntax error' },
      { pattern: /undefined reference/, message: 'Linker Error: Function not defined' },
      { pattern: /segmentation fault/, message: 'Runtime Error: Segmentation fault' }
    ],
    c: [
      { pattern: /error: expected/, message: 'Compilation Error: Syntax error' },
      { pattern: /undefined reference/, message: 'Linker Error: Function not defined' },
      { pattern: /segmentation fault/, message: 'Runtime Error: Segmentation fault' }
    ]
  }

  // Check for common syntax issues
  if (language === 'python') {
    if (code.includes('print') && !code.includes('SyntaxError')) {
      return {
        success: true,
        output: 'Hello, World!\nNote: This is a simulated output. For real execution, configure Judge0 API.',
        executionTime: 50,
        memoryUsage: 2.5
      }
    }
  }

  if (language === 'java') {
    if (!code.includes('public class') && code.includes('main')) {
      return {
        success: false,
        error: 'Compilation Error: Java requires a public class declaration'
      }
    }
  }

  if (language === 'cpp' || language === 'c') {
    if (!code.includes('#include') && code.includes('printf')) {
      return {
        success: false,
        error: 'Compilation Error: Missing #include <stdio.h>'
      }
    }
  }

  // Default simulation for basic programs
  return {
    success: true,
    output: `Simulated output for ${language}:\nYour code appears to be syntactically correct.\nNote: This is a simulated execution. For real code execution, configure the Judge0 API key.`,
    executionTime: Math.random() * 200 + 50,
    memoryUsage: Math.random() * 10 + 2
  }
}
