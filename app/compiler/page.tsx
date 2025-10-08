'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play, Copy, RotateCcw, Save, FolderOpen, Upload, Activity, Users, Zap, Wifi, WifiOff, TrendingUp
} from "lucide-react"

const languages = [
  {
    value: "python",
    label: "Python",
    icon: "🐍",
    description: "Versatile programming language",
    features: ["Easy syntax", "Rich libraries", "Data science"],
    difficulty: "Beginner",
    example: `# Welcome to Python!
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate sum of first 10 Fibonacci numbers
total = 0
for i in range(10):
    total += fibonacci(i)

print(f"Sum of first 10 Fibonacci numbers: {total}")

# List comprehension example
squares = [x**2 for x in range(1, 11)]
print(f"Squares of 1-10: {squares}")

# Dictionary example
student = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 90, 78, 92]
}
print(f"Student: {student['name']}, Average: {sum(student['grades'])/len(student['grades']):.1f}")`,
    sampleInput: `5
10
Alice`,
    sampleOutput: `Sum of first 10 Fibonacci numbers: 88
Squares of 1-10: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Student: Alice, Average: 86.2`
  },
  {
    value: "javascript",
    label: "JavaScript",
    icon: "🟨",
    description: "Web development powerhouse",
    features: ["Async/await", "DOM manipulation", "Modern ES6+"],
    difficulty: "Intermediate",
    example: `// Modern JavaScript Features
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(\`\${a} + \${b} = \${result}\`);
        return result;
    }
    
    getHistory() {
        return this.history;
    }
}

// Async function example
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);

// Calculator demo
const calc = new Calculator();
console.log('5 + 3 =', calc.add(5, 3));
console.log('10 + 7 =', calc.add(10, 7));
console.log('History:', calc.getHistory());`,
    sampleInput: `Hello World
42`,
    sampleOutput: `Original: [1, 2, 3, 4, 5]
Doubled: [2, 4, 6, 8, 10]
Evens: [2, 4]
Sum: 15
5 + 3 = 8
10 + 7 = 17
History: ['5 + 3 = 8', '10 + 7 = 17']`
  },
  {
    value: "java",
    label: "Java",
    icon: "☕",
    description: "Enterprise-grade programming",
    features: ["OOP", "Platform independent", "Strong typing"],
    difficulty: "Intermediate",
    example: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
        
        // Create a student object
        Student student = new Student("John Doe", 20);
        student.addGrade(85);
        student.addGrade(90);
        student.addGrade(78);
        
        System.out.println("Student: " + student.getName());
        System.out.println("Age: " + student.getAge());
        System.out.println("Average Grade: " + student.getAverageGrade());
        
        // ArrayList example
        ArrayList<String> subjects = new ArrayList<>();
        subjects.add("Mathematics");
        subjects.add("Physics");
        subjects.add("Chemistry");
        
        System.out.println("Subjects:");
        for (String subject : subjects) {
            System.out.println("- " + subject);
        }
    }
}

class Student {
    private String name;
    private int age;
    private List<Integer> grades;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.grades = new ArrayList<>();
    }
    
    public void addGrade(int grade) {
        grades.add(grade);
    }
    
    public double getAverageGrade() {
        if (grades.isEmpty()) return 0.0;
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return (double) sum / grades.size();
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}`,
    sampleInput: `John Doe
20
85 90 78`,
    sampleOutput: `Welcome to Java Programming!
Student: John Doe
Age: 20
Average Grade: 84.33333333333333
Subjects:
- Mathematics
- Physics
- Chemistry`
  },
  {
    value: "cpp",
    label: "C++",
    icon: "⚡",
    description: "High-performance systems programming",
    features: ["Memory management", "STL", "Templates"],
    difficulty: "Advanced",
    example: `#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>

class Student {
private:
    std::string name;
    int age;
    std::vector<int> grades;

public:
    Student(const std::string& n, int a) : name(n), age(a) {}
    
    void addGrade(int grade) {
        grades.push_back(grade);
    }
    
    double getAverageGrade() const {
        if (grades.empty()) return 0.0;
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return static_cast<double>(sum) / grades.size();
    }
    
    void displayInfo() const {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
        std::cout << "Average Grade: " << getAverageGrade() << std::endl;
    }
};

int main() {
    std::cout << "Welcome to C++ Programming!" << std::endl;
    
    // Create student using smart pointer
    auto student = std::make_unique<Student>("Alice Smith", 22);
    student->addGrade(88);
    student->addGrade(92);
    student->addGrade(85);
    
    student->displayInfo();
    
    // STL vector example
    std::vector<int> numbers = {10, 5, 8, 3, 7};
    std::cout << "Original numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Sort and display
    std::sort(numbers.begin(), numbers.end());
    std::cout << "Sorted numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
    sampleInput: `Alice Smith
22
88 92 85`,
    sampleOutput: `Welcome to C++ Programming!
Name: Alice Smith
Age: 22
Average Grade: 88.3333
Original numbers: 10 5 8 3 7 
Sorted numbers: 3 5 7 8 10 `
  }
]

const sampleProblems = [
  {
    title: "Two Sum",
    description: "Find two numbers that add up to target",
    difficulty: "Easy",
    acceptance: "45.2%"
  },
  {
    title: "Binary Search",
    description: "Search element in sorted array",
    difficulty: "Medium",
    acceptance: "38.7%"
  },
  {
    title: "Merge Sort",
    description: "Implement merge sort algorithm",
    difficulty: "Medium",
    acceptance: "42.1%"
  }
]

export default function CompilerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [savedInput, setSavedInput] = useState("")
  const [savedOutput, setSavedOutput] = useState("")
  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 0,
    submissionsPerMinute: 0,
    lastSubmission: new Date()
  })
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const currentLanguage = languages.find((lang) => lang.value === selectedLanguage)

  useEffect(() => {
    if (currentLanguage) {
      setCode(currentLanguage.example)
      setInput(savedInput || currentLanguage.sampleInput)
      setOutput("")
      setExecutionTime(null)
      setMemoryUsage(null)
    }
    setStatus("idle")
  }, [selectedLanguage, currentLanguage, savedInput])

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats({
        activeUsers: Math.floor(Math.random() * 50) + 20,
        submissionsPerMinute: Math.floor(Math.random() * 30) + 10,
        lastSubmission: new Date()
      })
      setIsRealTime(true)
      setLastUpdated(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRunCode = async () => {
    setIsRunning(true)
    setStatus("running")
    setOutput("Running code...")

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          input: input
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.output || '')
        setExecutionTime(result.executionTime || 0)
        setMemoryUsage(result.memoryUsage || 0)
        setStatus("success")
      } else {
        setOutput(result.error || 'Execution failed')
        setStatus("error")
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setStatus("error")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSaveInput = () => {
    setSavedInput(input)
    localStorage.setItem('savedInput', input)
  }

  const handleLoadSavedInput = () => {
    const saved = localStorage.getItem('savedInput')
    if (saved) {
      setInput(saved)
      setSavedInput(saved)
    }
  }

  const handleSaveOutput = () => {
    setSavedOutput(output)
    localStorage.setItem('savedOutput', output)
  }

  const handleLoadSavedOutput = () => {
    const saved = localStorage.getItem('savedOutput')
    if (saved) {
      setOutput(saved)
      setSavedOutput(saved)
    }
  }

  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'python' ? 'py' : selectedLanguage === 'java' ? 'java' : 'cpp'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
      }
      reader.readAsText(file)
    }
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    const newLanguage = languages.find((lang) => lang.value === value)
    if (newLanguage) {
      setCode(newLanguage.example)
      setInput(savedInput || newLanguage.sampleInput)
      setOutput("")
      setExecutionTime(null)
      setMemoryUsage(null)
    }
    setStatus("idle")
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const handleResetCode = () => {
    if (currentLanguage) {
      setCode(currentLanguage.example)
      setInput(currentLanguage.sampleInput)
      setOutput("")
      setStatus("idle")
    }
  }

  const handleLoadSample = (problem: (typeof sampleProblems)[0]) => {
    setCode(`// ${problem.title}\n// ${problem.description}\n\n${currentLanguage?.example || ""}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Real-time Code Compiler</h1>
              {isRealTime && (
                <Badge variant="secondary" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">Write, compile, and execute code in multiple languages</p>
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
                  {realTimeStats.activeUsers} users coding
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {realTimeStats.submissionsPerMinute} runs/min
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Code Editor */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Code Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <span>{lang.icon}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm resize-none"
                  placeholder="Write your code here..."
                />
                
                <div className="flex gap-2">
                  <Button onClick={handleRunCode} disabled={isRunning}>
                    <Play className="mr-2 h-4 w-4" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button variant="outline" onClick={handleCopyCode}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" onClick={handleResetCode}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button variant="outline" onClick={handleSaveToFile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" asChild>
                    <label>
                      <Upload className="mr-2 h-4 w-4" />
                      Load
                      <input
                        type="file"
                        accept=".py,.js,.java,.cpp,.c"
                        onChange={handleLoadFromFile}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language Info</CardTitle>
              </CardHeader>
              <CardContent>
                {currentLanguage && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentLanguage.icon}</span>
                      <div>
                        <div className="font-semibold">{currentLanguage.label}</div>
                        <div className="text-sm text-muted-foreground">{currentLanguage.description}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {currentLanguage.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline">Difficulty: {currentLanguage.difficulty}</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleProblems.map((problem, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handleLoadSample(problem)}>
                      <div className="font-medium text-sm">{problem.title}</div>
                      <div className="text-xs text-muted-foreground">{problem.description}</div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {problem.acceptance}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Activity */}
            {isRealTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium">{realTimeStats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Runs/Minute</span>
                      <span className="font-medium">{realTimeStats.submissionsPerMinute}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Run</span>
                      <span className="font-medium text-xs">{realTimeStats.lastSubmission.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Input/Output Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Input</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveInput}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLoadSavedInput}>
                    <FolderOpen className="h-3 w-3 mr-1" />
                    Load
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
                placeholder="Enter input here..."
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveOutput}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLoadSavedOutput}>
                    <FolderOpen className="h-3 w-3 mr-1" />
                    Load
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[120px] border rounded-md p-4 bg-muted/30">
                <pre className="text-sm font-mono whitespace-pre-wrap">{output || "Output will appear here..."}</pre>
              </ScrollArea>
              {executionTime && memoryUsage && (
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Time: {executionTime.toFixed(2)}ms</span>
                  <span>Memory: {memoryUsage.toFixed(2)}MB</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}