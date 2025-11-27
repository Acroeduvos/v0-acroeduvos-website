import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { writeFileSync, unlinkSync, mkdirSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

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
  'csharp': 51,      // C# 8.0
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

    // STRATEGY 1: Judge0 (Remote Execution)
    // If API key is configured, prefer this as it's the most robust and secure
    if (JUDGE0_API_KEY && JUDGE0_API_KEY !== 'your_judge0_api_key_here') {
      try {
        const judge0Result = await executeWithJudge0(language, code, input)
        return NextResponse.json(judge0Result)
      } catch (error) {
        console.warn('Judge0 execution failed, falling back to local:', error)
        // Fallthrough to local execution
      }
    }

    // STRATEGY 2: Local Execution
    // Try to execute code locally if compilers are available
    const localResult = await executeCodeLocally(language, code, input)

    // If local execution worked, return it
    if (localResult.success) {
      return NextResponse.json(localResult)
    }

    // If local execution failed due to missing compiler/environment issues, fallback to simulation
    // We check for specific error messages that indicate missing tools
    if (localResult.error && (
      localResult.error.includes('ENOENT') ||
      localResult.error.includes('not found') ||
      localResult.error.includes('is not recognized') ||
      localResult.error.includes('spawn') ||
      localResult.error.includes('Language') && localResult.error.includes('not supported')
    )) {
      console.log(`Local execution failed for ${language}, falling back to simulation. Error: ${localResult.error}`)

      // STRATEGY 3: Simulation
      const simResult = simulateExecution(language, code, input)
      return NextResponse.json({
        ...simResult,
        output: `[System: Running in Simulation Mode]\n(Note: Local compiler for ${language} was not found)\n\n${simResult.output}`
      })
    }

    // If it was a genuine runtime/compilation error in local execution, return that
    return NextResponse.json(localResult)

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
    throw new Error(`Unsupported language for Judge0: ${language}`)
  }

  const submissionData = {
    language_id: languageId,
    source_code: Buffer.from(code).toString('base64'),
    stdin: Buffer.from(input).toString('base64'),
    expected_output: null,
    cpu_time_limit: '5.0',
    memory_limit: '128000',
    wall_time_limit: '10.0'
  }

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

  // Map Judge0 status to our response format
  if (result.status?.id === 3) { // Accepted
    const output = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : ''
    const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''
    return {
      success: true,
      output: output + (stderr ? `\n\nWarnings/Errors:\n${stderr}` : ''),
      executionTime: result.time ? parseFloat(result.time) * 1000 : 0,
      memoryUsage: result.memory ? parseFloat(result.memory) / 1024 : 0
    }
  } else {
    const compileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : ''
    const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : ''
    const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : ''

    return {
      success: false,
      error: `${result.status?.description}\n${compileOutput || stderr || stdout || ''}`,
      executionTime: result.time ? parseFloat(result.time) * 1000 : 0
    }
  }
}

async function executeCodeLocally(language: string, code: string, input: string): Promise<ExecuteResponse> {
  const startTime = Date.now()
  const tempDir = join(tmpdir(), 'acroeduvos-execution')

  try {
    mkdirSync(tempDir, { recursive: true })

    let fileName: string
    let command: string
    let args: string[]

    switch (language.toLowerCase()) {
      case 'python':
        fileName = join(tempDir, 'main.py')
        writeFileSync(fileName, code)
        command = 'python'
        args = [fileName]
        break
      case 'javascript':
      case 'js':
        fileName = join(tempDir, 'main.js')
        writeFileSync(fileName, code)
        command = 'node'
        args = [fileName]
        break
      case 'typescript':
      case 'ts':
        fileName = join(tempDir, 'main.ts')
        writeFileSync(fileName, code)
        command = 'npx'
        args = ['ts-node', fileName]
        break
      case 'java':
        fileName = join(tempDir, 'Main.java')
        writeFileSync(fileName, code)
        command = 'javac'
        args = [fileName]
        break
      case 'cpp':
      case 'c++':
        fileName = join(tempDir, 'main.cpp')
        writeFileSync(fileName, code)
        command = 'g++'
        args = ['-o', join(tempDir, 'main'), fileName]
        break
      case 'c':
        fileName = join(tempDir, 'main.c')
        writeFileSync(fileName, code)
        command = 'gcc'
        args = ['-o', join(tempDir, 'main'), fileName]
        break
      case 'go':
        fileName = join(tempDir, 'main.go')
        writeFileSync(fileName, code)
        command = 'go'
        args = ['run', fileName]
        break
      case 'rust':
        fileName = join(tempDir, 'main.rs')
        writeFileSync(fileName, code)
        command = 'rustc'
        args = ['-o', join(tempDir, 'main'), fileName]
        break
      case 'php':
        fileName = join(tempDir, 'main.php')
        writeFileSync(fileName, code)
        command = 'php'
        args = [fileName]
        break
      case 'ruby':
        fileName = join(tempDir, 'main.rb')
        writeFileSync(fileName, code)
        command = 'ruby'
        args = [fileName]
        break
      case 'csharp':
      case 'c#':
        fileName = join(tempDir, 'Program.cs')
        writeFileSync(fileName, code)
        command = 'dotnet'
        args = ['run', '--project', tempDir]
        break
      case 'kotlin':
        fileName = join(tempDir, 'Main.kt')
        writeFileSync(fileName, code)
        command = 'kotlinc'
        args = [fileName, '-include-runtime', '-d', join(tempDir, 'main.jar')]
        break
      default:
        return {
          success: false,
          error: `Language ${language} not supported for local execution`
        }
    }

    return new Promise((resolve) => {
      let output = ''
      let errorOutput = ''
      let actualCommand = command
      let actualArgs = [...args]

      // Compiled languages logic
      if (['java', 'cpp', 'c++', 'c', 'rust', 'csharp', 'c#', 'kotlin'].includes(language.toLowerCase())) {
        const compileProcess = spawn(command, args, { cwd: tempDir, timeout: 10000 })

        compileProcess.stdout.on('data', (data) => { output += data.toString() })
        compileProcess.stderr.on('data', (data) => { errorOutput += data.toString() })

        compileProcess.on('error', (err) => {
          resolve({ success: false, error: `Compiler spawn error: ${err.message}`, executionTime: Date.now() - startTime })
        })

        compileProcess.on('close', (compileCode) => {
          if (compileCode !== 0) {
            resolve({
              success: false,
              error: `Compilation failed:\n${errorOutput}`,
              executionTime: Date.now() - startTime,
              exitCode: compileCode || 1
            })
            return
          }

          // Run logic
          if (language.toLowerCase() === 'java') { actualCommand = 'java'; actualArgs = ['Main'] }
          else if (language.toLowerCase() === 'kotlin') { actualCommand = 'java'; actualArgs = ['-jar', join(tempDir, 'main.jar')] }
          else if (['csharp', 'c#'].includes(language.toLowerCase())) { actualCommand = 'dotnet'; actualArgs = ['run'] }
          else { actualCommand = process.platform === 'win32' ? 'main.exe' : './main'; actualArgs = [] }

          const runProcess = spawn(actualCommand, actualArgs, { cwd: tempDir, timeout: 5000 })
          let runOutput = ''
          let runError = ''

          runProcess.stdout.on('data', (data) => { runOutput += data.toString() })
          runProcess.stderr.on('data', (data) => { runError += data.toString() })

          runProcess.on('error', (err) => {
            resolve({ success: false, error: `Runtime spawn error: ${err.message}`, executionTime: Date.now() - startTime })
          })

          runProcess.on('close', (runCode) => {
            resolve({
              success: runCode === 0,
              output: runOutput.trim(),
              error: runError.trim() || undefined,
              executionTime: Date.now() - startTime,
              exitCode: runCode || 0
            })
          })

          if (input) { runProcess.stdin.write(input); runProcess.stdin.end() }
        })
      } else {
        // Interpreted languages
        const process = spawn(actualCommand, actualArgs, { cwd: tempDir, timeout: 5000 })

        process.stdout.on('data', (data) => { output += data.toString() })
        process.stderr.on('data', (data) => { errorOutput += data.toString() })

        process.on('error', (err) => {
          resolve({ success: false, error: `Interpreter spawn error: ${err.message}`, executionTime: Date.now() - startTime })
        })

        process.on('close', (code) => {
          resolve({
            success: code === 0,
            output: output.trim(),
            error: errorOutput.trim() || undefined,
            executionTime: Date.now() - startTime,
            exitCode: code || 0
          })
        })

        if (input) { process.stdin.write(input); process.stdin.end() }
      }
    })
  } catch (error) {
    return {
      success: false,
      error: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      executionTime: Date.now() - startTime
    }
  } finally {
    // Cleanup
    try {
      const files = ['main.py', 'main.js', 'main.ts', 'Main.java', 'main.cpp', 'main.c', 'main.go', 'main.rs', 'main.php', 'main.rb', 'Program.cs', 'Main.kt', 'main', 'main.exe', 'Main.class', 'main.jar']
      files.forEach(file => { try { unlinkSync(join(tempDir, file)) } catch (e) { } })
    } catch (e) { }
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AcroEduvos Execution API',
    version: '3.0.0',
    strategies: ['judge0', 'local', 'simulation']
  })
}

// Enhanced simulation for realistic code execution (Fallback)
function simulateExecution(language: string, code: string, input: string): ExecuteResponse {
  let output = ''
  let executionTime = Math.random() * 100 + 20
  let memoryUsage = Math.random() * 5 + 1

  // Python execution simulation
  if (language === 'python') {
    const printMatches = code.match(/print\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)
    if (printMatches) {
      printMatches.forEach(match => {
        const content = match.match(/print\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/)?.[1]
        if (content) output += content + '\n'
      })
    }

    // Simple math
    const mathMatch = code.match(/print\s*\(\s*(\d+)\s*([\+\-\*\/])\s*(\d+)\s*\)/)
    if (mathMatch) {
      const a = parseInt(mathMatch[1])
      const op = mathMatch[2]
      const b = parseInt(mathMatch[3])
      let res = 0
      if (op === '+') res = a + b
      else if (op === '-') res = a - b
      else if (op === '*') res = a * b
      else if (op === '/') res = a / b
      output += res + '\n'
    }
  }

  // Java/C++ execution simulation
  if (language === 'java' || language === 'cpp' || language === 'c++') {
    const printMatches = code.match(/(System\.out\.println|cout\s*<<)\s*['"`(]([^'"`)]+)['"`)]/)
    if (printMatches) {
      // Simplified matching for demo
      output += "Hello World\n"
    }
  }

  // JavaScript
  if (language === 'javascript' || language === 'js') {
    const logMatches = code.match(/console\.log\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g)
    if (logMatches) {
      logMatches.forEach(match => {
        const content = match.match(/console\.log\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/)?.[1]
        if (content) output += content + '\n'
      })
    }
  }

  // Generic fallback if output is empty
  if (!output.trim()) {
    if (code.includes('print') || code.includes('log') || code.includes('cout')) {
      output = "Hello World\n"
    } else {
      output = `✅ Execution successful (Simulation)\nNo output detected.`
    }
  }

  return {
    success: true,
    output: output.trim(),
    executionTime: Math.round(executionTime),
    memoryUsage: Math.round(memoryUsage * 100) / 100
  }
}
