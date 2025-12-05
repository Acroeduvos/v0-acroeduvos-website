"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Play, Send, CheckCircle, AlertCircle, Settings, Maximize2, HelpCircle, FileText } from "lucide-react"

interface CodeChefIDEProps {
  initialCode?: string
  initialLanguage?: string
  onRun?: (code: string, language: string, input: string) => Promise<string>
  onSubmit?: (code: string, language: string) => Promise<{ success: boolean; message: string }>
  readOnly?: boolean
}

export function CodeChefIDE({
  initialCode = "",
  initialLanguage = "cpp17",
  onRun,
  onSubmit,
  readOnly = false,
}: CodeChefIDEProps) {
  const [language, setLanguage] = useState(initialLanguage)
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState("14px")
  const [code, setCode] = useState(initialCode)
  const [customInput, setCustomInput] = useState("")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [customChecks, setCustomChecks] = useState({
    useCustomInput: true,
    saveCode: true,
    publicSubmission: true,
  })

  // Template code for different languages (CodeChef style)
  const templates = {
    cpp17: `#include <bits/stdc++.h>
using namespace std;

// Your solution here

int main() {
    // Read input
    
    // Call your solution
    
    // Output result
    
    return 0;
}`,
    cpp14: `#include <bits/stdc++.h>
using namespace std;

// Your solution here

int main() {
    // Read input
    
    // Call your solution
    
    // Output result
    
    return 0;
}`,
    java: `import java.util.*;
import java.lang.*;
import java.io.*;

class Main {
    // Your solution here
    
    public static void main(String[] args) throws java.lang.Exception {
        // Read input
        
        // Call your solution
        
        // Output result
    }
}`,
    python3: `# cook your dish here

# Read input

# Call your solution

# Output result`,
    pypy3: `# cook your dish here

# Read input

# Call your solution

# Output result`,
    javascript: `// cook your dish here

// Reading input
process.stdin.resume();
process.stdin.setEncoding('utf8');

let input = '';
process.stdin.on('data', function(chunk) {
    input += chunk;
});

process.stdin.on('end', function() {
    // Parse input
    
    // Call your solution
    
    // Output result
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

    if (onRun) {
      try {
        const result = await onRun(code, language, customInput)
        setOutput(result)
        setStatus("success")
      } catch (error) {
        setOutput(error instanceof Error ? error.message : "An error occurred")
        setStatus("error")
      }
    } else {
      // Mock execution (CodeChef style)
      setTimeout(() => {
        setOutput("Program executed successfully.\nOutput will appear here.")
        setStatus("success")
      }, 1500)
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
      // Mock submission (CodeChef style)
      setTimeout(() => {
        setOutput("Submission successful!\n\nVerdict: Accepted (AC)\nTime: 0.01s\nMemory: 4.2 MB")
        setStatus("success")
      }, 2000)
    }
  }

  return (
    <div className="space-y-4">
      {/* CodeChef-style IDE header */}
      <div className="flex items-center justify-between rounded-t-lg border border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center">
          <Select value={language} onValueChange={setLanguage} disabled={readOnly}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpp17">C++17</SelectItem>
              <SelectItem value="cpp14">C++14</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="python3">Python3</SelectItem>
              <SelectItem value="pypy3">PyPy3</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-4 flex items-center space-x-2">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="monokai">Monokai</SelectItem>
              </SelectContent>
            </Select>

            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12px">12px</SelectItem>
                <SelectItem value="14px">14px</SelectItem>
                <SelectItem value="16px">16px</SelectItem>
                <SelectItem value="18px">18px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" title="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Full Screen">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Help">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Code editor */}
      <div className="rounded-b-lg border border-gray-200 border-t-0">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono min-h-[400px] resize-none rounded-none border-0 text-sm"
          placeholder="Write your code here..."
          readOnly={readOnly}
          style={{ fontSize }}
        />
      </div>

      {!readOnly && (
        <>
          {/* CodeChef-style submission options */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Submission Options</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useCustomInput"
                  checked={customChecks.useCustomInput}
                  onCheckedChange={(checked) =>
                    setCustomChecks((prev) => ({ ...prev, useCustomInput: checked as boolean }))
                  }
                />
                <Label htmlFor="useCustomInput">Use custom input</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveCode"
                  checked={customChecks.saveCode}
                  onCheckedChange={(checked) => setCustomChecks((prev) => ({ ...prev, saveCode: checked as boolean }))}
                />
                <Label htmlFor="saveCode">Save code</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="publicSubmission"
                  checked={customChecks.publicSubmission}
                  onCheckedChange={(checked) =>
                    setCustomChecks((prev) => ({ ...prev, publicSubmission: checked as boolean }))
                  }
                />
                <Label htmlFor="publicSubmission">Make submission public</Label>
              </div>
            </div>
          </div>

          {/* Custom input */}
          {customChecks.useCustomInput && (
            <div>
              <h3 className="mb-2 text-sm font-medium">Custom Input</h3>
              <Textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="min-h-[100px] resize-none text-sm font-mono"
                placeholder="Enter your custom input here..."
              />
            </div>
          )}

          {/* CodeChef-style action buttons */}
          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-[#1b5e20] hover:bg-[#2e7d32]"
              onClick={handleRun}
              disabled={status === "running"}
            >
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </Button>
            <Button
              className="flex-1 bg-[#0d47a1] hover:bg-[#1565c0]"
              onClick={handleSubmit}
              disabled={status === "running"}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
        </>
      )}

      {/* Output panel (CodeChef style) */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Output</h3>
            </div>
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
