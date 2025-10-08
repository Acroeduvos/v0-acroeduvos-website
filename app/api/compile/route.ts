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

// Judge0 API configuration with production API key
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com'
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || 'YOUR_PRODUCTION_JUDGE0_API_KEY'

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

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AcroEduvos Compiler API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (jsonError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    const { language, code, input = '' }: CompileRequest = body

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

    // Check if we have Judge0 API key for real execution
    if (!JUDGE0_API_KEY || JUDGE0_API_KEY === 'YOUR_PRODUCTION_JUDGE0_API_KEY') {
      // Use enhanced simulation when no API key is configured
      const result = simulateExecution(language, code, input)
      return NextResponse.json({
        ...result,
        isRealTime: false,
        fallback: true,
        message: "Using enhanced simulation - Configure JUDGE0_API_KEY for real execution"
      })
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
        memoryUsage: result.memory ? parseFloat(result.memory) / 1024 : 0, // Convert to MB
        isRealTime: true,
        apiVersion: 'judge0-v1.0',
        status: 'executed_successfully'
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

// Enhanced simulation for realistic code execution
function simulateExecution(language: string, code: string, input: string): CompileResponse {
  // Check for syntax errors first
  const syntaxErrors = {
    python: [
      { pattern: /SyntaxError|IndentationError/, message: 'Syntax Error: Check your Python syntax and indentation' },
      { pattern: /NameError/, message: 'Name Error: Variable not defined' },
      { pattern: /TypeError/, message: 'Type Error: Check data types' },
      { pattern: /IndentationError/, message: 'Indentation Error: Use consistent indentation (4 spaces recommended)' }
    ],
    java: [
      { pattern: /class.*expected/, message: 'Compilation Error: Missing public class declaration' },
      { pattern: /cannot find symbol/, message: 'Compilation Error: Variable or method not found' },
      { pattern: /missing return statement/, message: 'Compilation Error: Missing return statement' },
      { pattern: /public static void main/, message: 'Compilation Error: Missing main method' }
    ],
    cpp: [
      { pattern: /error: expected/, message: 'Compilation Error: Syntax error - check semicolons and brackets' },
      { pattern: /undefined reference/, message: 'Linker Error: Function not defined' },
      { pattern: /segmentation fault/, message: 'Runtime Error: Segmentation fault - invalid memory access' },
      { pattern: /'cout' was not declared/, message: 'Compilation Error: Missing #include <iostream>' }
    ],
    c: [
      { pattern: /error: expected/, message: 'Compilation Error: Syntax error' },
      { pattern: /undefined reference/, message: 'Linker Error: Function not defined' },
      { pattern: /segmentation fault/, message: 'Runtime Error: Segmentation fault' },
      { pattern: /'printf' was not declared/, message: 'Compilation Error: Missing #include <stdio.h>' }
    ],
    javascript: [
      { pattern: /SyntaxError/, message: 'Syntax Error: Check your JavaScript syntax' },
      { pattern: /ReferenceError/, message: 'Reference Error: Variable not defined' },
      { pattern: /TypeError/, message: 'Type Error: Check data types and method calls' }
    ]
  }

  // Check for syntax errors
  const languageErrors = syntaxErrors[language as keyof typeof syntaxErrors]
  if (languageErrors) {
    for (const error of languageErrors) {
      if (error.pattern.test(code)) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  }

  // Enhanced realistic execution simulation
  let output = ''
  let executionTime = Math.random() * 100 + 20
  let memoryUsage = Math.random() * 5 + 1

  // Python execution simulation
  if (language === 'python') {
    // Handle print statements with better regex
    const printMatches = code.match(/print\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)
    if (printMatches) {
      printMatches.forEach(match => {
        const content = match.match(/print\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/)?.[1]
        if (content) {
          output += content + '\n'
        }
      })
    }
    
    // Handle print with variables
    const printVarMatches = code.match(/print\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/g)
    if (printVarMatches) {
      printVarMatches.forEach(match => {
        const varName = match.match(/print\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/)?.[1]
        if (varName) {
          // Simulate variable values based on common patterns
          if (varName.includes('sum') || varName.includes('result')) {
            output += '15\n' // Simulate calculation result
          } else if (varName.includes('name') || varName.includes('user')) {
            output += 'John\n' // Simulate user input
          } else {
            output += `42\n` // Default value
          }
        }
      })
    }
    
    // Handle input simulation
    if (code.includes('input(') && input) {
      const inputLines = input.split('\n')
      let inputIndex = 0
      const inputMatches = code.match(/input\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)
      if (inputMatches) {
        inputMatches.forEach(match => {
          const prompt = match.match(/input\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/)?.[1]
          if (prompt) {
            const value = inputLines[inputIndex++] || 'Default'
            output += `${prompt}${value}\n`
          }
        })
      }
    }
    
    // Handle mathematical operations
    const mathPatterns = [
      { pattern: /(\d+)\s*\+\s*(\d+)/g, operator: '+' },
      { pattern: /(\d+)\s*\-\s*(\d+)/g, operator: '-' },
      { pattern: /(\d+)\s*\*\s*(\d+)/g, operator: '*' },
      { pattern: /(\d+)\s*\/\s*(\d+)/g, operator: '/' }
    ]
    
    mathPatterns.forEach(({ pattern, operator }) => {
      const matches = [...code.matchAll(pattern)]
      matches.forEach(match => {
        const a = parseInt(match[1])
        const b = parseInt(match[2])
        let result = 0
        switch (operator) {
          case '+': result = a + b; break
          case '-': result = a - b; break
          case '*': result = a * b; break
          case '/': result = Math.round((a / b) * 100) / 100; break
        }
        output += `${a} ${operator} ${b} = ${result}\n`
      })
    })
    
    // Handle loops and iterations
    if (code.includes('for') && code.includes('range')) {
      const rangeMatch = code.match(/range\s*\(\s*(\d+)\s*\)/)
      if (rangeMatch) {
        const count = parseInt(rangeMatch[1])
        for (let i = 0; i < Math.min(count, 10); i++) { // Limit to 10 iterations
          output += `Iteration ${i}\n`
        }
      }
    }
    
    // Handle list operations
    if (code.includes('[') && code.includes(']')) {
      const listMatch = code.match(/\[([^\]]+)\]/)
      if (listMatch) {
        const items = listMatch[1].split(',').map(item => item.trim())
        output += `List: [${items.join(', ')}]\n`
        output += `Length: ${items.length}\n`
      }
    }
  }

  // Java execution simulation
  if (language === 'java') {
    if (code.includes('System.out.println')) {
      const printMatches = code.match(/System\.out\.println\(['"`]([^'"`]+)['"`]\)/g)
      if (printMatches) {
        printMatches.forEach(match => {
          const content = match.match(/System\.out\.println\(['"`]([^'"`]+)['"`]\)/)?.[1]
          if (content) {
            output += content + '\n'
          }
        })
      }
    }
  }

  // C++ execution simulation
  if (language === 'cpp') {
    if (code.includes('cout')) {
      const printMatches = code.match(/cout\s*<<\s*['"`]([^'"`]+)['"`]/g)
      if (printMatches) {
        printMatches.forEach(match => {
          const content = match.match(/cout\s*<<\s*['"`]([^'"`]+)['"`]/)?.[1]
          if (content) {
            output += content + '\n'
          }
        })
      }
    }
  }

  // JavaScript execution simulation
  if (language === 'javascript') {
    // Handle console.log statements
    const consoleMatches = code.match(/console\.log\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)
    if (consoleMatches) {
      consoleMatches.forEach(match => {
        const content = match.match(/console\.log\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/)?.[1]
        if (content) {
          output += content + '\n'
        }
      })
    }
    
    // Handle console.log with variables
    const consoleVarMatches = code.match(/console\.log\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/g)
    if (consoleVarMatches) {
      consoleVarMatches.forEach(match => {
        const varName = match.match(/console\.log\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/)?.[1]
        if (varName) {
          output += `${varName}: 42\n`
        }
      })
    }
    
    // Handle mathematical operations
    const mathMatches = code.match(/(\d+)\s*[\+\-\*\/]\s*(\d+)/g)
    if (mathMatches) {
      mathMatches.forEach(match => {
        const parts = match.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/)
        if (parts) {
          const a = parseInt(parts[1])
          const b = parseInt(parts[3])
          const operator = parts[2]
          let result = 0
          switch (operator) {
            case '+': result = a + b; break
            case '-': result = a - b; break
            case '*': result = a * b; break
            case '/': result = Math.round((a / b) * 100) / 100; break
          }
          output += `${a} ${operator} ${b} = ${result}\n`
        }
      })
    }
    
    // Handle array operations
    if (code.includes('[') && code.includes(']')) {
      const arrayMatch = code.match(/\[([^\]]+)\]/)
      if (arrayMatch) {
        const items = arrayMatch[1].split(',').map(item => item.trim())
        output += `Array: [${items.join(', ')}]\n`
        output += `Length: ${items.length}\n`
      }
    }
  }

  // If no specific output was generated, create a generic one
  if (!output.trim()) {
    output = `✅ Code executed successfully!\n📊 Execution completed without errors.\n\n💡 This is a simulated execution for demo purposes.\n🔧 For production use, configure Judge0 API for real-time compilation.`
  }

  return {
    success: true,
    output: output.trim(),
    executionTime: Math.round(executionTime),
    memoryUsage: Math.round(memoryUsage * 100) / 100
  }
}

