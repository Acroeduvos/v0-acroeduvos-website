"use client"

import { useState } from "react"
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
  Download,
  Share,
  RotateCcw,
  Settings,
  Clock,
  MemoryStick as Memory,
  CheckCircle,
  XCircle,
  AlertCircle,
  Code2,
} from "lucide-react"

const languages = [
  {
    value: "python",
    label: "Python",
    version: "3.11",
    extension: ".py",
    example: `# Python Example - Hello World
def greet(name):
    return f"Hello, {name}!"

# Main execution
if __name__ == "__main__":
    name = input("Enter your name: ")
    print(greet(name))
    
    # Example: Simple calculator
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    print(f"Sum: {a + b}")`,
  },
  {
    value: "javascript",
    label: "JavaScript",
    version: "Node.js 18",
    extension: ".js",
    example: `// JavaScript Example - Hello World
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Main execution
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your name: ', (name) => {
    console.log(greet(name));
    
    rl.question('Enter first number: ', (a) => {
        rl.question('Enter second number: ', (b) => {
            console.log(\`Sum: \${parseInt(a) + parseInt(b)}\`);
            rl.close();
        });
    });
});`,
  },
  {
    value: "java",
    label: "Java",
    version: "17",
    extension: ".java",
    example: `// Java Example - Hello World
import java.util.Scanner;

public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println(greet(name));
        
        System.out.print("Enter first number: ");
        int a = scanner.nextInt();
        System.out.print("Enter second number: ");
        int b = scanner.nextInt();
        System.out.println("Sum: " + (a + b));
        
        scanner.close();
    }
}`,
  },
  {
    value: "cpp",
    label: "C++",
    version: "17",
    extension: ".cpp",
    example: `// C++ Example - Hello World
#include <iostream>
#include <string>
using namespace std;

string greet(const string& name) {
    return "Hello, " + name + "!";
}

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << greet(name) << endl;
    
    int a, b;
    cout << "Enter first number: ";
    cin >> a;
    cout << "Enter second number: ";
    cin >> b;
    cout << "Sum: " << (a + b) << endl;
    
    return 0;
}`,
  },
  {
    value: "c",
    label: "C",
    version: "GCC 11",
    extension: ".c",
    example: `// C Example - Hello World
#include <stdio.h>
#include <string.h>

void greet(char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    char name[100];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    
    // Remove newline character
    name[strcspn(name, "\\n")] = 0;
    
    greet(name);
    
    int a, b;
    printf("Enter first number: ");
    scanf("%d", &a);
    printf("Enter second number: ");
    scanf("%d", &b);
    printf("Sum: %d\\n", a + b);
    
    return 0;
}`,
  },
  {
    value: "go",
    label: "Go",
    version: "1.21",
    extension: ".go",
    example: `// Go Example - Hello World
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    
    fmt.Print("Enter your name: ")
    name, _ := reader.ReadString('\\n')
    name = strings.TrimSpace(name)
    fmt.Println(greet(name))
    
    fmt.Print("Enter first number: ")
    aStr, _ := reader.ReadString('\\n')
    a, _ := strconv.Atoi(strings.TrimSpace(aStr))
    
    fmt.Print("Enter second number: ")
    bStr, _ := reader.ReadString('\\n')
    b, _ := strconv.Atoi(strings.TrimSpace(bStr))
    
    fmt.Printf("Sum: %d\\n", a+b)
}`,
  },
  {
    value: "rust",
    label: "Rust",
    version: "1.75",
    extension: ".rs",
    example: `// Rust Example - Hello World
use std::io;

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("Enter your name: ");
    let mut name = String::new();
    io::stdin().read_line(&mut name).expect("Failed to read line");
    let name = name.trim();
    println!("{}", greet(name));
    
    println!("Enter first number: ");
    let mut a_str = String::new();
    io::stdin().read_line(&mut a_str).expect("Failed to read line");
    let a: i32 = a_str.trim().parse().expect("Invalid number");
    
    println!("Enter second number: ");
    let mut b_str = String::new();
    io::stdin().read_line(&mut b_str).expect("Failed to read line");
    let b: i32 = b_str.trim().parse().expect("Invalid number");
    
    println!("Sum: {}", a + b);
}`,
  },
  {
    value: "typescript",
    label: "TypeScript",
    version: "5.0",
    extension: ".ts",
    example: `// TypeScript Example - Hello World
import * as readline from 'readline';

function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your name: ', (name: string) => {
    console.log(greet(name));
    
    rl.question('Enter first number: ', (a: string) => {
        rl.question('Enter second number: ', (b: string) => {
            const sum: number = parseInt(a) + parseInt(b);
            console.log(\`Sum: \${sum}\`);
            rl.close();
        });
    });
});`,
  },
  {
    value: "php",
    label: "PHP",
    version: "8.2",
    extension: ".php",
    example: `<?php
// PHP Example - Hello World
function greet($name) {
    return "Hello, " . $name . "!";
}

echo "Enter your name: ";
$name = trim(fgets(STDIN));
echo greet($name) . "\\n";

echo "Enter first number: ";
$a = (int)trim(fgets(STDIN));
echo "Enter second number: ";
$b = (int)trim(fgets(STDIN));
echo "Sum: " . ($a + $b) . "\\n";
?>`,
  },
  {
    value: "ruby",
    label: "Ruby",
    version: "3.2",
    extension: ".rb",
    example: `# Ruby Example - Hello World
def greet(name)
  "Hello, #{name}!"
end

print "Enter your name: "
name = gets.chomp
puts greet(name)

print "Enter first number: "
a = gets.chomp.to_i
print "Enter second number: "
b = gets.chomp.to_i
puts "Sum: #{a + b}"`,
  },
]

const sampleProblems = [
  {
    title: "Hello World",
    description: "Print 'Hello, World!' to the console",
    difficulty: "Easy",
  },
  {
    title: "Two Sum",
    description: "Find two numbers that add up to a target",
    difficulty: "Easy",
  },
  {
    title: "Fibonacci Sequence",
    description: "Generate the first n Fibonacci numbers",
    difficulty: "Medium",
  },
  {
    title: "Binary Search",
    description: "Implement binary search algorithm",
    difficulty: "Medium",
  },
]

export default function CompilerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "success" | "error" | "timeout">("idle")

  const currentLanguage = languages.find((lang) => lang.value === selectedLanguage)

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    const newLanguage = languages.find((lang) => lang.value === value)
    if (newLanguage) {
      setCode(newLanguage.example)
    }
    setOutput("")
    setStatus("idle")
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setStatus("idle")
    setOutput("Running code...")

    // Simulate code execution
    setTimeout(() => {
      const mockResults = [
        {
          output: "Enter your name: John\nHello, John!\nEnter first number: 5\nEnter second number: 3\nSum: 8",
          time: Math.random() * 1000 + 100,
          memory: Math.random() * 50 + 10,
          status: "success" as const,
        },
        {
          output:
            'Error: SyntaxError: invalid syntax\n  File "main.py", line 5\n    print(Hello World)\n          ^\nSyntaxError: invalid syntax',
          time: 0,
          memory: 0,
          status: "error" as const,
        },
        {
          output: "Time Limit Exceeded\nYour code took too long to execute (>5 seconds)",
          time: 5000,
          memory: 0,
          status: "timeout" as const,
        },
      ]

      const result = mockResults[Math.floor(Math.random() * mockResults.length)]
      setOutput(result.output)
      setExecutionTime(result.time)
      setMemoryUsage(result.memory)
      setStatus(result.status)
      setIsRunning(false)
    }, 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const handleResetCode = () => {
    if (currentLanguage) {
      setCode(currentLanguage.example)
      setOutput("")
      setStatus("idle")
    }
  }

  const handleLoadSample = (problem: (typeof sampleProblems)[0]) => {
    // This would load sample code for the selected problem
    setCode(`// ${problem.title}\n// ${problem.description}\n\n${currentLanguage?.example || ""}`)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-6">
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Online Code Compiler</h1>
                <p className="text-muted-foreground mt-2">Write, compile, and run code in 10+ programming languages</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Problems</CardTitle>
                  <CardDescription>Quick start with common problems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sampleProblems.map((problem, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleLoadSample(problem)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{problem.title}</div>
                        <div className="text-xs text-muted-foreground">{problem.description}</div>
                        <Badge
                          variant={problem.difficulty === "Easy" ? "secondary" : "default"}
                          className="mt-1 text-xs"
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Execution Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Runtime</span>
                    </div>
                    <span className="text-sm font-mono">
                      {executionTime !== null ? `${executionTime.toFixed(0)}ms` : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Memory className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Memory</span>
                    </div>
                    <span className="text-sm font-mono">
                      {memoryUsage !== null ? `${memoryUsage.toFixed(1)}MB` : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Status</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                      {status === "timeout" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      <span className="text-sm capitalize">{status === "idle" ? "Ready" : status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <CardTitle className="ml-4">
                        main{currentLanguage?.extension} - {currentLanguage?.label} {currentLanguage?.version}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={handleCopyCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleResetCode}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[500px] font-mono text-sm border-0 resize-none focus-visible:ring-0 bg-gray-900 text-green-400"
                    placeholder="Write your code here..."
                  />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Input</CardTitle>
                    <CardDescription>Provide input for your program (if needed)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[150px] font-mono text-sm"
                      placeholder="Enter input here..."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Output</CardTitle>
                      {status !== "idle" && (
                        <Badge
                          variant={status === "success" ? "secondary" : status === "error" ? "destructive" : "default"}
                        >
                          {status === "success" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {status === "error" && <XCircle className="mr-1 h-3 w-3" />}
                          {status === "timeout" && <AlertCircle className="mr-1 h-3 w-3" />}
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[150px]">
                      <pre
                        className={`text-sm font-mono whitespace-pre-wrap ${
                          status === "error" ? "text-red-600" : status === "timeout" ? "text-yellow-600" : ""
                        }`}
                      >
                        {output || "Output will appear here..."}
                      </pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleRunCode} disabled={isRunning} className="flex-1" size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  Submit Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
