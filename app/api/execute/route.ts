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

export async function POST(request: NextRequest) {
  try {
    const { language, code, input = '' }: ExecuteRequest = await request.json()

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: 'Language and code are required' },
        { status: 400 }
      )
    }

    const result = await executeCode(language, code, input)
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

async function executeCode(language: string, code: string, input: string): Promise<ExecuteResponse> {
  const startTime = Date.now()
  const tempDir = join(tmpdir(), 'acroeduvos-execution')
  
  try {
    // Ensure temp directory exists
    mkdirSync(tempDir, { recursive: true })

    let fileName: string
    let command: string
    let args: string[]

    switch (language.toLowerCase()) {
      case 'python':
        fileName = join(tempDir, 'main.py')
        writeFileSync(fileName, code)
        command = 'python3'
        args = [fileName]
        break

      case 'javascript':
      case 'js':
        fileName = join(tempDir, 'main.js')
        writeFileSync(fileName, code)
        command = 'node'
        args = [fileName]
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

      default:
        return {
          success: false,
          error: `Unsupported language: ${language}`
        }
    }

    // Execute the code
    return new Promise((resolve) => {
      let output = ''
      let errorOutput = ''
      let actualCommand = command
      let actualArgs = [...args]

      // For compiled languages, first compile then run
      if (['java', 'cpp', 'c++', 'c', 'rust'].includes(language.toLowerCase())) {
        // First compile
        const compileProcess = spawn(command, args, { 
          cwd: tempDir,
          timeout: 10000 // 10 second timeout
        })

        compileProcess.stdout.on('data', (data) => {
          output += data.toString()
        })

        compileProcess.stderr.on('data', (data) => {
          errorOutput += data.toString()
        })

        compileProcess.on('close', (compileCode) => {
          if (compileCode !== 0) {
            resolve({
              success: false,
              error: `Compilation failed:\n${errorOutput}`,
              executionTime: Date.now() - startTime,
              exitCode: compileCode
            })
            return
          }

          // If compilation successful, run the executable
          if (language.toLowerCase() === 'java') {
            actualCommand = 'java'
            actualArgs = ['Main']
          } else {
            actualCommand = './main'
            actualArgs = []
          }

          const runProcess = spawn(actualCommand, actualArgs, {
            cwd: tempDir,
            timeout: 5000 // 5 second timeout for execution
          })

          let runOutput = ''
          let runError = ''

          runProcess.stdout.on('data', (data) => {
            runOutput += data.toString()
          })

          runProcess.stderr.on('data', (data) => {
            runError += data.toString()
          })

          runProcess.on('close', (runCode) => {
            resolve({
              success: runCode === 0,
              output: runOutput.trim(),
              error: runError.trim() || undefined,
              executionTime: Date.now() - startTime,
              exitCode: runCode
            })
          })

          // Send input to the process
          if (input) {
            runProcess.stdin.write(input)
            runProcess.stdin.end()
          }
        })

      } else {
        // For interpreted languages, run directly
        const process = spawn(actualCommand, actualArgs, {
          cwd: tempDir,
          timeout: 5000 // 5 second timeout
        })

        process.stdout.on('data', (data) => {
          output += data.toString()
        })

        process.stderr.on('data', (data) => {
          errorOutput += data.toString()
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

        // Send input to the process
        if (input) {
          process.stdin.write(input)
          process.stdin.end()
        }
      }
    })

  } catch (error) {
    return {
      success: false,
      error: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      executionTime: Date.now() - startTime
    }
  } finally {
    // Cleanup temp files
    try {
      // Clean up temporary files
      const files = ['main.py', 'main.js', 'Main.java', 'main.cpp', 'main.c', 'main.go', 'main.rs', 'main.php', 'main.rb', 'main', 'Main.class']
      files.forEach(file => {
        try {
          unlinkSync(join(tempDir, file))
        } catch (e) {
          // File might not exist, ignore
        }
      })
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AcroEduvos Real-Time Execution API is running',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    features: ['real-time', 'multi-language', 'docker-safe']
  })
}
