"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Play, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Code, 
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  FileText
} from "lucide-react"

export default function CompilerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [executionTime, setExecutionTime] = useState(0)
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")

  const languages = [
    { id: "python", name: "Python", version: "3.9", icon: "🐍", color: "bg-yellow-100 text-yellow-800" },
    { id: "javascript", name: "JavaScript", version: "Node.js 18", icon: "🟨", color: "bg-yellow-100 text-yellow-800" },
    { id: "java", name: "Java", version: "OpenJDK 17", icon: "☕", color: "bg-red-100 text-red-800" },
    { id: "cpp", name: "C++", version: "GCC 11", icon: "⚡", color: "bg-blue-100 text-blue-800" },
    { id: "c", name: "C", version: "GCC 11", icon: "🔧", color: "bg-gray-100 text-gray-800" },
    { id: "go", name: "Go", version: "1.19", icon: "🐹", color: "bg-cyan-100 text-cyan-800" },
    { id: "rust", name: "Rust", version: "1.70", icon: "🦀", color: "bg-orange-100 text-orange-800" },
    { id: "php", name: "PHP", version: "8.1", icon: "🐘", color: "bg-purple-100 text-purple-800" },
    { id: "ruby", name: "Ruby", version: "3.1", icon: "💎", color: "bg-red-100 text-red-800" },
    { id: "swift", name: "Swift", version: "5.7", icon: "🦉", color: "bg-orange-100 text-orange-800" }
  ]

  const templates = {
    python: `# Python Template
def main():
    print("Hello, World!")
    
    # Read input
    n = int(input())
    print(f"Number: {n}")
    
    # Your code here

if __name__ == "__main__":
    main()`,
    javascript: `// JavaScript Template
function main() {
    console.log("Hello, World!");
    
    // Read input
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Enter a number: ', (answer) => {
        console.log(\`Number: \${answer}\`);
        rl.close();
    });
}

main();`,
    java: `// Java Template
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        System.out.println("Number: " + n);
        
        // Your code here
        
        scanner.close();
    }
}`,
    cpp: `// C++ Template
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    int n;
    cin >> n;
    cout << "Number: " << n << endl;
    
    // Your code here
    
    return 0;
}`,
    c: `// C Template
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    int n;
    scanf("%d", &n);
    printf("Number: %d\\n", n);
    
    // Your code here
    
    return 0;
}`,
    go: `// Go Template
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    var n int
    fmt.Scan(&n)
    fmt.Printf("Number: %d\\n", n)
    
    // Your code here
}`,
    rust: `// Rust Template
use std::io;

fn main() {
    println!("Hello, World!");
    
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let n: i32 = input.trim().parse().expect("Please enter a number");
    println!("Number: {}", n);
    
    // Your code here
}`,
    php: `<?php
// PHP Template
echo "Hello, World!\\n";

$n = (int)readline();
echo "Number: $n\\n";

// Your code here
?>`,
    ruby: `# Ruby Template
puts "Hello, World!"

n = gets.chomp.to_i
puts "Number: #{n}"

# Your code here`,
    swift: `// Swift Template
import Foundation

print("Hello, World!")

if let input = readLine(), let n = Int(input) {
    print("Number: \\(n)")
}

// Your code here`
  }

  const sampleProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
      testCases: [
        { input: "[2,7,11,15]\n9", expected: "[0,1]" },
        { input: "[3,2,4]\n6", expected: "[1,2]" },
        { input: "[3,3]\n6", expected: "[0,1]" }
      ]
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as an array of characters.",
      example: "Input: s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]",
      testCases: [
        { input: "[\"h\",\"e\",\"l\",\"l\",\"o\"]", expected: "[\"o\",\"l\",\"l\",\"e\",\"h\"]" },
        { input: "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", expected: "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]" }
      ]
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      example: "Input: s = \"()\"\nOutput: true",
      testCases: [
        { input: "\"()\"", expected: "true" },
        { input: "\"()[]{}\"", expected: "true" },
        { input: "\"(]\"", expected: "false" }
      ]
    }
  ]

  const [selectedProblem, setSelectedProblem] = useState(sampleProblems[0])

  useEffect(() => {
    setCode(templates[selectedLanguage as keyof typeof templates])
  }, [selectedLanguage])

  const handleRun = async () => {
    setIsRunning(true)
    setStatus("running")
    setOutput("")
    
    const startTime = Date.now()
    
    // Simulate code execution
    setTimeout(() => {
      const endTime = Date.now()
      setExecutionTime(endTime - startTime)
      
      // Simulate different outcomes
      const random = Math.random()
      if (random > 0.1) {
        setStatus("success")
        setOutput("Code executed successfully!\n\nOutput:\nHello, World!\nNumber: 42\n\nExecution completed in " + (endTime - startTime) + "ms")
      } else {
        setStatus("error")
        setOutput("Runtime Error:\nTraceback (most recent call last):\n  File \"main.py\", line 5, in <module>\n    print(undefined_variable)\nNameError: name 'undefined_variable' is not defined")
      }
      
      setIsRunning(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleReset = () => {
    setCode(templates[selectedLanguage as keyof typeof templates])
    setInput("")
    setOutput("")
    setStatus("idle")
    setExecutionTime(0)
  }

  const handleLoadProblem = (problem: typeof sampleProblems[0]) => {
    setSelectedProblem(problem)
    // Load problem-specific template based on language
    setCode(templates[selectedLanguage as keyof typeof templates])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Code Compiler</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Write, compile, and run code in multiple programming languages. Practice coding problems 
          with real-time execution and instant feedback.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Problem Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Practice Problems</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleProblems.map(problem => (
                <div 
                  key={problem.id} 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedProblem.id === problem.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleLoadProblem(problem)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{problem.title}</h3>
                    <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{problem.description}</p>
                  <div className="text-xs text-gray-500">
                    <p className="font-medium">Example:</p>
                    <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {problem.example}
                    </pre>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Code Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Code Editor</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.icon}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge className={languages.find(l => l.id === selectedLanguage)?.color}>
                    {languages.find(l => l.id === selectedLanguage)?.version}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Code Editor */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Code</label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Write your code here..."
                />
              </div>

              {/* Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Input</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[100px] font-mono text-sm"
                  placeholder="Enter input data..."
                />
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <Button onClick={handleRun} disabled={isRunning} className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </Button>
                <Button variant="outline" onClick={handleReset} className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Load</span>
                </Button>
              </div>

              {/* Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Output</label>
                  <div className="flex items-center space-x-2">
                    {status === "running" && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Clock className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Executing...</span>
                      </div>
                    )}
                    {status === "success" && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm">Success</span>
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex items-center space-x-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Error</span>
                      </div>
                    )}
                    {executionTime > 0 && (
                      <span className="text-sm text-gray-500">
                        {executionTime}ms
                      </span>
                    )}
                  </div>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-gray-50"
                  placeholder="Output will appear here..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

