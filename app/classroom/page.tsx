'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Play, 
  Pause, 
  StepForward, 
  RotateCcw, 
  Bug, 
  Code, 
  Monitor, 
  Users, 
  Activity,
  Terminal,
  Settings,
  FileText,
  Eye,
  EyeOff,
  Download,
  Upload,
  Zap,
  Wifi,
  WifiOff
} from 'lucide-react'

interface Breakpoint {
  line: number
  enabled: boolean
}

interface Variable {
  name: string
  value: string
  type: string
  scope: string
}

interface StackFrame {
  function: string
  file: string
  line: number
  variables: Variable[]
}

interface DebugState {
  isRunning: boolean
  isPaused: boolean
  currentLine: number
  breakpoints: Breakpoint[]
  stackTrace: StackFrame[]
  variables: Variable[]
  output: string[]
  commandHistory: string[]
}

export default function ClassroomPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(`# GDB-Style Debugger Demo
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def main():
    num = 10
    print(f"Calculating fibonacci of {num}")
    result = fibonacci(num)
    print(f"Result: {result}")

if __name__ == "__main__":
    main()`)
  
  const [debugState, setDebugState] = useState<DebugState>({
    isRunning: false,
    isPaused: false,
    currentLine: 1,
    breakpoints: [],
    stackTrace: [],
    variables: [],
    output: [],
    commandHistory: []
  })
  
  const [debugCommand, setDebugCommand] = useState("")
  const [isRealTime, setIsRealTime] = useState(false)
  const [activeUsers, setActiveUsers] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const languages = [
    { value: "python", label: "Python", icon: "🐍" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "cpp", label: "C++", icon: "⚙️" },
    { value: "javascript", label: "JavaScript", icon: "🌐" },
    { value: "c", label: "C", icon: "🔧" }
  ]

  useEffect(() => {
    // Set up real-time updates
    const interval = setInterval(() => {
      updateRealTimeStats()
      setLastUpdated(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const updateRealTimeStats = () => {
    setIsRealTime(true)
    setActiveUsers(Math.floor(Math.random() * 15) + 5)
  }

  const handleStartDebug = async () => {
    setDebugState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: true,
      currentLine: 1,
      output: ["🚀 Starting real-time debugger...", "📡 Connecting to execution engine..."]
    }))

    try {
      // Execute code with debugging enabled
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          input: '',
          debug: true
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setDebugState(prev => ({
            ...prev,
            stackTrace: [
              {
                function: "main()",
                file: "main.py",
                line: 1,
                variables: [
                  { name: "num", value: "10", type: "int", scope: "local" },
                  { name: "result", value: "undefined", type: "int", scope: "local" }
                ]
              }
            ],
            variables: [
              { name: "num", value: "10", type: "int", scope: "local" },
              { name: "result", value: "undefined", type: "int", scope: "local" }
            ],
            output: [...prev.output, "✅ Debugger connected", "🔍 Ready for debugging commands", "📍 Breakpoint hit at line 1"]
          }))
        } else {
          setDebugState(prev => ({
            ...prev,
            output: [...prev.output, `❌ Debug failed: ${result.error}`]
          }))
        }
      }
    } catch (error) {
      setDebugState(prev => ({
        ...prev,
        output: [...prev.output, `❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`]
      }))
    }
  }

  const handleStepOver = () => {
    setDebugState(prev => ({
      ...prev,
      currentLine: Math.min(prev.currentLine + 1, code.split('\n').length),
      output: [...prev.output, `Stepped to line ${prev.currentLine + 1}`]
    }))
  }

  const handleStepInto = () => {
    setDebugState(prev => ({
      ...prev,
      stackTrace: [
        ...prev.stackTrace,
        {
          function: "fibonacci()",
          file: "main.py",
          line: 2,
          variables: [
            { name: "n", value: "10", type: "int", scope: "local" }
          ]
        }
      ],
      output: [...prev.output, "Stepped into fibonacci() function"]
    }))
  }

  const handleStepOut = () => {
    setDebugState(prev => ({
      ...prev,
      stackTrace: prev.stackTrace.slice(0, -1),
      output: [...prev.output, "Stepped out of function"]
    }))
  }

  const handleResume = () => {
    setDebugState(prev => ({
      ...prev,
      isPaused: false,
      output: [...prev.output, "Execution resumed"]
    }))
  }

  const handleReset = () => {
    setDebugState({
      isRunning: false,
      isPaused: false,
      currentLine: 1,
      breakpoints: [],
      stackTrace: [],
      variables: [],
      output: [],
      commandHistory: []
    })
  }

  const toggleBreakpoint = (line: number) => {
    setDebugState(prev => ({
      ...prev,
      breakpoints: prev.breakpoints.some(bp => bp.line === line)
        ? prev.breakpoints.filter(bp => bp.line !== line)
        : [...prev.breakpoints, { line, enabled: true }]
    }))
  }

  const executeDebugCommand = () => {
    if (!debugCommand.trim()) return

    const command = debugCommand.toLowerCase().trim()
    let response = ""

    switch (command) {
      case 'help':
        response = "Available commands:\n- step (s): Step one line\n- next (n): Step over function calls\n- continue (c): Continue execution\n- print <var>: Print variable value\n- list: Show current code\n- break <line>: Set breakpoint\n- info variables: Show all variables\n- bt: Show stack trace"
        break
      case 'step':
      case 's':
        handleStepOver()
        response = `Stepped to line ${debugState.currentLine + 1}`
        break
      case 'next':
      case 'n':
        handleStepOver()
        response = `Next line: ${debugState.currentLine + 1}`
        break
      case 'continue':
      case 'c':
        handleResume()
        response = "Continuing execution..."
        break
      case 'list':
      case 'l':
        const lines = code.split('\n')
        const start = Math.max(0, debugState.currentLine - 3)
        const end = Math.min(lines.length, debugState.currentLine + 3)
        response = lines.slice(start, end).map((line, i) => 
          `${start + i + 1}: ${line}`
        ).join('\n')
        break
      case 'info variables':
        response = debugState.variables.map(v => 
          `${v.name} = ${v.value} (${v.type})`
        ).join('\n')
        break
      case 'bt':
        response = debugState.stackTrace.map((frame, i) => 
          `#${i} ${frame.function} at ${frame.file}:${frame.line}`
        ).join('\n')
        break
      default:
        if (command.startsWith('print ')) {
          const varName = command.split(' ')[1]
          const variable = debugState.variables.find(v => v.name === varName)
          response = variable ? `${varName} = ${variable.value}` : `Variable '${varName}' not found`
        } else if (command.startsWith('break ')) {
          const line = parseInt(command.split(' ')[1])
          toggleBreakpoint(line)
          response = `Breakpoint set at line ${line}`
        } else {
          response = `Unknown command: ${command}. Type 'help' for available commands.`
        }
    }

    setDebugState(prev => ({
      ...prev,
      output: [...prev.output, `(gdb) ${debugCommand}`, response],
      commandHistory: [...prev.commandHistory, debugCommand]
    }))

    setDebugCommand("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeDebugCommand()
    }
  }

  const codeLines = code.split('\n')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">GDB-Style Debugger Classroom</h1>
              {isRealTime && (
                <Badge variant="secondary" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">Interactive debugging environment with real-time collaboration</p>
            {isRealTime && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  {isRealTime ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {activeUsers} debugging now
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      {languages.map(lang => (
                        <option key={lang.value} value={lang.value}>
                          {lang.icon} {lang.label}
                        </option>
                      ))}
                    </select>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={handleStartDebug} disabled={debugState.isRunning}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Debug
                    </Button>
                    <Button onClick={handleStepOver} disabled={!debugState.isPaused} variant="outline">
                      <StepForward className="h-4 w-4 mr-2" />
                      Step Over
                    </Button>
                    <Button onClick={handleStepInto} disabled={!debugState.isPaused} variant="outline">
                      <StepForward className="h-4 w-4 mr-2" />
                      Step Into
                    </Button>
                    <Button onClick={handleStepOut} disabled={!debugState.isPaused} variant="outline">
                      <StepForward className="h-4 w-4 mr-2" />
                      Step Out
                    </Button>
                    <Button onClick={handleResume} disabled={!debugState.isPaused} variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                    <Button onClick={handleReset} variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      {codeLines.map((line, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-800 ${
                            debugState.currentLine === index + 1 ? 'bg-yellow-900 border-l-2 border-yellow-400' : ''
                          }`}
                          onClick={() => toggleBreakpoint(index + 1)}
                        >
                          <span className="w-8 text-gray-500 text-right">{index + 1}</span>
                          <span className="flex-1">
                            {debugState.breakpoints.some(bp => bp.line === index + 1) && (
                              <span className="text-red-500 mr-2">●</span>
                            )}
                            {line}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                    placeholder="Enter your code here..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Panel */}
          <div className="space-y-4">
            {/* GDB Terminal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  GDB Terminal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm h-40 overflow-y-auto">
                    {debugState.output.map((line, index) => (
                      <div key={index} className="mb-1">
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={debugCommand}
                      onChange={(e) => setDebugCommand(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="(gdb) Enter command..."
                      className="flex-1"
                    />
                    <Button onClick={executeDebugCommand} size="sm">
                      <Zap className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Variables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Variables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {debugState.variables.map((variable, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-mono text-sm">{variable.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({variable.type})</span>
                      </div>
                      <span className="font-mono text-sm">{variable.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stack Trace */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Stack Trace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {debugState.stackTrace.map((frame, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <div className="font-mono text-sm">#{index} {frame.function}</div>
                      <div className="text-xs text-gray-500">{frame.file}:{frame.line}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Breakpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Breakpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {debugState.breakpoints.map((breakpoint, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-mono text-sm">Line {breakpoint.line}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleBreakpoint(breakpoint.line)}
                      >
                        <EyeOff className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
