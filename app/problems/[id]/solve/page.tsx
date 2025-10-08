"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Play, 
  Copy, 
  RotateCcw, 
  Clock, 
  MemoryStick, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Code2,
  TestTube,
  Zap
} from "lucide-react"

interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  tags: string[]
  timeLimit: number
  memoryLimit: number
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
}

const languages = [
  { value: "python", label: "Python 3", extension: ".py" },
  { value: "java", label: "Java", extension: ".java" },
  { value: "cpp", label: "C++", extension: ".cpp" },
  { value: "javascript", label: "JavaScript", extension: ".js" },
  { value: "c", label: "C", extension: ".c" },
]

const defaultCode = {
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
  c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Your code here
    return NULL;
}`
}

export default function SolveProblemPage() {
  const params = useParams()
  const problemId = params.id as string
  
  const [problem, setProblem] = useState<Problem | null>(null)
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (problemId) {
      fetchProblem()
    }
  }, [problemId])

  useEffect(() => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode] || "")
    setOutput("")
    setStatus("idle")
  }, [selectedLanguage])

  const fetchProblem = async () => {
    try {
      const response = await fetch(`/api/problems/${problemId}`)
      const data = await response.json()
      setProblem(data)
    } catch (error) {
      console.error('Error fetching problem:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setStatus("idle")
    setOutput("Running code...")

    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          input: input,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.output || 'No output')
        setExecutionTime(result.executionTime || 0)
        setMemoryUsage(result.memoryUsage || 0)
        setStatus("success")
      } else {
        setOutput(`Error: ${result.error}`)
        setStatus("error")
      }
    } catch (error) {
      setOutput(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setStatus("error")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setTestResults([])

    // Simulate test case execution
    setTimeout(() => {
      const mockResults = [
        { testCase: 1, status: 'passed', input: 'Sample Input 1', expected: 'Expected Output 1', actual: 'Your Output 1' },
        { testCase: 2, status: 'passed', input: 'Sample Input 2', expected: 'Expected Output 2', actual: 'Your Output 2' },
        { testCase: 3, status: 'failed', input: 'Hidden Input 3', expected: 'Hidden Output 3', actual: 'Wrong Output 3' },
        { testCase: 4, status: 'passed', input: 'Hidden Input 4', expected: 'Hidden Output 4', actual: 'Correct Output 4' },
      ]
      
      setTestResults(mockResults)
      setIsSubmitting(false)
    }, 3000)
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error': return <XCircle className="h-5 w-5 text-red-600" />
      case 'timeout': return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default: return <Code2 className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Problem not found</h3>
              <p className="text-muted-foreground">The problem you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Problem Description */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{problem.title}</h2>
                  <Badge className={
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {problem.difficulty}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{problem.description}</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium mb-1">Input:</p>
                        <code className="text-sm">{example.input}</code>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium mb-1">Output:</p>
                        <code className="text-sm">{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium mb-1">Explanation:</p>
                          <p className="text-sm">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Constraints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-mono">{problem.timeLimit}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Limit:</span>
                    <span className="font-mono">{problem.memoryLimit}MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getStatusIcon()}
                      <span>Ready to run</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setCode(defaultCode[selectedLanguage as keyof typeof defaultCode] || "")}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-0 resize-none focus-visible:ring-0 bg-gray-900 text-green-400"
                  placeholder="Write your solution here..."
                />
              </CardContent>
            </Card>

            {/* Input/Output */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Test Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[150px] font-mono text-sm"
                    placeholder="Enter test input here..."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon()}
                      Output
                    </CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {executionTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {executionTime}ms
                        </div>
                      )}
                      {memoryUsage && (
                        <div className="flex items-center gap-1">
                          <MemoryStick className="h-3 w-3" />
                          {memoryUsage}MB
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-36">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {output || "No output yet"}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleRunCode} 
                disabled={isRunning || !code.trim()}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !code.trim()}
                variant="default"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Solution"}
              </Button>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResults.map((result) => (
                      <div key={result.testCase} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {result.status === 'passed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className="font-medium">Test Case {result.testCase}</span>
                        </div>
                        <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                          {result.status === 'passed' ? 'Passed' : 'Failed'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
