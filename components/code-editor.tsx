"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Send, Copy, Download, CheckCircle, AlertCircle } from "lucide-react"

interface CodeEditorProps {
  initialCode?: string
  initialLanguage?: string
  onRun?: (code: string, language: string, input: string) => Promise<string>
  onSubmit?: (code: string, language: string) => Promise<{ success: boolean; message: string }>
  readOnly?: boolean
  showSubmit?: boolean
}

export function CodeEditor({
  initialCode = "",
  initialLanguage = "cpp",
  onRun,
  onSubmit,
  readOnly = false,
  showSubmit = true,
}: CodeEditorProps) {
  const [language, setLanguage] = useState(initialLanguage)
  const [code, setCode] = useState(initialCode)
  const [customInput, setCustomInput] = useState("")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")

  // Template code for different languages
  const templates = {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// Your solution here

int main() {
    // Read input
    
    // Call your solution
    
    // Output result
    
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    // Your solution here
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Read input
        
        // Call your solution
        
        // Output result
    }
}`,
    python: `# Your solution here

# Read input

# Call your solution

# Output result`,
    javascript: `// Your solution here

// Read input
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    // Process input
});`,
  }

  // Set initial code template if code is empty
  useEffect(() => {
    if (!initialCode && language) {
      setCode(templates[language as keyof typeof templates] || "")
    }
  }, [language, initialCode])

  const handleRun = async () => {
    setStatus("running")

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          input: customInput,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.error) {
        setOutput(`Error: ${result.error}${result.message ? ` - ${result.message}` : ''}`)
        setStatus("error")
      } else {
        setOutput(result.output)
        setStatus(result.status)
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "An error occurred while executing code")
      setStatus("error")
    }
  }

  const handleSubmit = async () => {
    setStatus("running")

    if (onSubmit) {
      try {
        const result = await onSubmit(code, language)
        setOutput(result.message)
        setStatus(result.success ? "success" : "error")
      } catch (error) {
        setOutput(error instanceof Error ? error.message : "An error occurred during submission")
        setStatus("error")
      }
    } else {
      // Mock submission
      setTimeout(() => {
        setOutput("Submission successful! All test cases passed.")
        setStatus("success")
      }, 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={language} onValueChange={setLanguage} disabled={readOnly}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>

        {!readOnly && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setCode(templates[language as keyof typeof templates] || "")}
            >
              <Download className="h-4 w-4" />
              Reset
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-gray-200">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono min-h-[400px] resize-none rounded-none border-0 text-sm"
          placeholder="Write your code here..."
          readOnly={readOnly}
        />
      </div>

      {!readOnly && (
        <>
          <div>
            <h3 className="mb-2 text-sm font-medium">Custom Input</h3>
            <Textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="min-h-[100px] resize-none text-sm font-mono"
              placeholder="Enter your custom input here..."
            />
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1 bg-black" onClick={handleRun} disabled={status === "running"}>
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </Button>
            {showSubmit && (
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleSubmit}
                disabled={status === "running"}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit
              </Button>
            )}
          </div>
        </>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between">
            <h3 className="font-medium">Output</h3>
            <div className="flex items-center">
              {status === "running" && <span className="text-sm text-gray-500">Running...</span>}
              {status === "success" && (
                <span className="flex items-center text-sm text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Success
                </span>
              )}
              {status === "error" && (
                <span className="flex items-center text-sm text-red-600">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  Error
                </span>
              )}
            </div>
          </div>
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap min-h-[100px] max-h-[200px] overflow-auto">
            {output || "Run your code to see the output here."}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
