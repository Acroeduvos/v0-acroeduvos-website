"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import {
  Play,
  Copy,
  RotateCcw,
  CheckCircle,
  Clock,
  MemoryStick as Memory,
  XCircle,
  AlertCircle,
  Lightbulb,
  Code2,
  Send,
  History,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface ProblemInterfaceProps {
  problem: any // This would be properly typed based on your database schema
}

const languages = [
  { value: "python", label: "Python", version: "3.11" },
  { value: "javascript", label: "JavaScript", version: "Node.js 18" },
  { value: "java", label: "Java", version: "17" },
  { value: "cpp", label: "C++", version: "17" },
  { value: "c", label: "C", version: "GCC 11" },
  { value: "go", label: "Go", version: "1.21" },
  { value: "rust", label: "Rust", version: "1.75" },
  { value: "typescript", label: "TypeScript", version: "5.0" },
]

export function ProblemInterface({ problem }: ProblemInterfaceProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "success" | "error" | "timeout">("idle")
  const [testResults, setTestResults] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [showHints, setShowHints] = useState<boolean[]>([])

  const { toast } = useToast()
  const supabase = createClient()

  // Initialize code with starter code for selected language
  useEffect(() => {
    const solution = problem.problem_solutions?.find((sol: any) => sol.language === selectedLanguage)
    if (solution?.starter_code) {
      setCode(solution.starter_code)
    } else {
      // Fallback starter code
      const starterTemplates: Record<string, string> = {
        python: `def solution():
    # Write your solution here
    pass`,
        javascript: `function solution() {
    // Write your solution here
}`,
        java: `class Solution {
    public void solution() {
        // Write your solution here
    }
}`,
        cpp: `class Solution {
public:
    void solution() {
        // Write your solution here
    }
};`,
      }
      setCode(starterTemplates[selectedLanguage] || "// Write your solution here")
    }
    setOutput("")
    setStatus("idle")
    setTestResults([])
  }, [selectedLanguage, problem])

  // Initialize hints visibility
  useEffect(() => {
    if (problem.hints) {
      setShowHints(new Array(problem.hints.length).fill(false))
    }
  }, [problem])

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setStatus("idle")
    setOutput("Running code...")

    try {
      // Simulate code execution with test cases
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock test results
      const mockResults = [
        {
          input: problem.examples?.[0]?.input || "Test case 1",
          expected: problem.examples?.[0]?.output || "Expected output",
          actual: problem.examples?.[0]?.output || "Expected output",
          passed: Math.random() > 0.3,
          runtime: Math.random() * 100 + 50,
          memory: Math.random() * 20 + 10,
        },
        {
          input: problem.examples?.[1]?.input || "Test case 2",
          expected: problem.examples?.[1]?.output || "Expected output",
          actual: problem.examples?.[1]?.output || "Expected output",
          passed: Math.random() > 0.3,
          runtime: Math.random() * 100 + 50,
          memory: Math.random() * 20 + 10,
        },
      ]

      const allPassed = mockResults.every((result) => result.passed)
      const avgRuntime = mockResults.reduce((sum, result) => sum + result.runtime, 0) / mockResults.length
      const avgMemory = mockResults.reduce((sum, result) => sum + result.memory, 0) / mockResults.length

      setTestResults(mockResults)
      setExecutionTime(avgRuntime)
      setMemoryUsage(avgMemory)
      setStatus(allPassed ? "success" : "error")
      setOutput(
        allPassed
          ? `All test cases passed!\nRuntime: ${avgRuntime.toFixed(0)}ms\nMemory: ${avgMemory.toFixed(1)}MB`
          : `Some test cases failed. Check the results below.`,
      )
    } catch (error) {
      setStatus("error")
      setOutput("Runtime error occurred")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitSolution = async () => {
    setIsSubmitting(true)

    try {
      // First run the code
      await handleRunCode()

      // Then submit to database (mock for now)
      const submission = {
        user_id: "mock-user-id", // This would come from auth
        problem_id: problem.id,
        language: selectedLanguage,
        code: code,
        status: status === "success" ? ("Accepted" as const) : ("Wrong Answer" as const),
        runtime_ms: executionTime ? Math.round(executionTime) : null,
        memory_mb: memoryUsage,
        test_cases_passed: testResults.filter((r) => r.passed).length,
        total_test_cases: testResults.length,
      }

      // In a real app, this would call the database
      console.log("Submitting:", submission)

      toast({
        title: submission.status === "Accepted" ? "Solution Accepted!" : "Solution Needs Work",
        description:
          submission.status === "Accepted"
            ? "Congratulations! Your solution passed all test cases."
            : "Some test cases failed. Keep trying!",
      })
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit solution. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard",
    })
  }

  const handleResetCode = () => {
    const solution = problem.problem_solutions?.find((sol: any) => sol.language === selectedLanguage)
    if (solution?.starter_code) {
      setCode(solution.starter_code)
    }
    setOutput("")
    setStatus("idle")
    setTestResults([])
  }

  const toggleHint = (index: number) => {
    setShowHints((prev) => {
      const newHints = [...prev]
      newHints[index] = !newHints[index]
      return newHints
    })
  }

  const companies = problem.problem_companies?.map((pc: any) => pc.company_name) || []

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Problem Description Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      problem.difficulty === "Easy"
                        ? "secondary"
                        : problem.difficulty === "Medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {problem.difficulty}
                  </Badge>
                  <Badge variant="outline">{problem.category}</Badge>
                  {problem.acceptance_rate && <Badge variant="outline">{problem.acceptance_rate}% acceptance</Badge>}
                </div>
                <div className="flex gap-1">
                  {companies.slice(0, 3).map((company: string) => (
                    <Badge key={company} variant="outline" className="text-xs">
                      {company}
                    </Badge>
                  ))}
                  {companies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{companies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed whitespace-pre-line">{problem.description}</p>
                </div>

                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Examples</h3>
                    {problem.examples.map((example: any, index: number) => (
                      <div key={index} className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <div className="font-medium">Example {index + 1}:</div>
                        <div className="font-mono text-sm">
                          <div>
                            <strong>Input:</strong> {example.input}
                          </div>
                          <div>
                            <strong>Output:</strong> {example.output}
                          </div>
                          {example.explanation && (
                            <div>
                              <strong>Explanation:</strong> {example.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Constraints</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {problem.constraints.map((constraint: string, index: number) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {problem.hints && problem.hints.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Hints
                    </h3>
                    {problem.hints.map((hint: string, index: number) => (
                      <div key={index} className="border rounded-lg">
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-4 h-auto"
                          onClick={() => toggleHint(index)}
                        >
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            <span>Hint {index + 1}</span>
                            {showHints[index] ? (
                              <span className="text-xs text-muted-foreground">(Click to hide)</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">(Click to reveal)</span>
                            )}
                          </div>
                        </Button>
                        {showHints[index] && (
                          <div className="px-4 pb-4">
                            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">{hint}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Code Editor Panel */}
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-4 font-medium">
                    {problem.title} - {languages.find((l) => l.value === selectedLanguage)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{lang.label}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {lang.version}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" onClick={handleCopyCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleResetCode}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 font-mono text-sm border-0 resize-none focus-visible:ring-0 bg-gray-900 text-green-400 rounded-none"
                placeholder="Write your solution here..."
              />
            </div>

            {/* Bottom Panel */}
            <div className="border-t">
              <Tabs defaultValue="console" className="h-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="console">Console</TabsTrigger>
                    <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  </TabsList>
                  <div className="flex gap-2">
                    <Button onClick={handleRunCode} disabled={isRunning} variant="outline">
                      <Play className="mr-2 h-4 w-4" />
                      {isRunning ? "Running..." : "Run"}
                    </Button>
                    <Button onClick={handleSubmitSolution} disabled={isSubmitting || isRunning}>
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </div>

                <TabsContent value="console" className="p-4 h-64">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Input</label>
                          <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="h-20 font-mono text-sm"
                            placeholder="Enter input here..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Output</label>
                          <div className="h-20 p-3 bg-muted rounded border font-mono text-sm overflow-auto">
                            <pre
                              className={`whitespace-pre-wrap ${
                                status === "error" ? "text-red-600" : status === "timeout" ? "text-yellow-600" : ""
                              }`}
                            >
                              {output || "Output will appear here..."}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {(executionTime !== null || memoryUsage !== null) && (
                        <>
                          <Separator />
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>Runtime: {executionTime?.toFixed(0)}ms</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Memory className="h-4 w-4" />
                                <span>Memory: {memoryUsage?.toFixed(1)}MB</span>
                              </div>
                            </div>
                            <Badge
                              variant={
                                status === "success" ? "secondary" : status === "error" ? "destructive" : "default"
                              }
                            >
                              {status === "success" && <CheckCircle className="mr-1 h-3 w-3" />}
                              {status === "error" && <XCircle className="mr-1 h-3 w-3" />}
                              {status === "timeout" && <AlertCircle className="mr-1 h-3 w-3" />}
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Badge>
                          </div>
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="testcases" className="p-4 h-64">
                  <ScrollArea className="h-full">
                    <div className="space-y-3">
                      {testResults.length > 0 ? (
                        testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span className="font-medium">Test Case {index + 1}</span>
                              <Badge variant="outline" className="text-xs">
                                {result.runtime.toFixed(0)}ms
                              </Badge>
                            </div>
                            <div className="text-sm font-mono space-y-1">
                              <div>
                                <strong>Input:</strong> {result.input}
                              </div>
                              <div>
                                <strong>Expected:</strong> {result.expected}
                              </div>
                              <div>
                                <strong>Actual:</strong> {result.actual}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-8">
                          <Code2 className="h-8 w-8 mx-auto mb-2" />
                          <p>Run your code to see test results</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="submissions" className="p-4 h-64">
                  <ScrollArea className="h-full">
                    <div className="text-center text-muted-foreground py-8">
                      <History className="h-8 w-8 mx-auto mb-2" />
                      <p>Your submission history will appear here</p>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
