"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  ChevronLeft,
  Play,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Maximize2,
  HelpCircle,
  FileText,
  ThumbsUp,
} from "lucide-react"

export default function ProblemSolvePage({ params }: { params: { id: string } }) {
  const [language, setLanguage] = useState("cpp17")
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState("14px")
  const [code, setCode] = useState("")
  const [customInput, setCustomInput] = useState("")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState("problem")
  const [timeLeft, setTimeLeft] = useState(7200) // 2 hours in seconds
  const [customChecks, setCustomChecks] = useState({
    useCustomInput: true,
    saveCode: true,
    publicSubmission: true,
  })

  // Mock problem data
  const problem = {
    id: params.id,
    title: "Two Sum",
    difficulty: "Easy",
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    sourceSizeLimit: "50000 Bytes",
    author: "admin",
    successfulSubmissions: 12500,
    accuracy: "45.2%",
    tags: ["Arrays", "Hash Table", "Data Structures"],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: `The first line contains an integer n, the size of the array.
The second line contains n space-separated integers representing the array elements.
The third line contains a single integer target.`,
    outputFormat: `Return two integers i and j (0-indexed) such that nums[i] + nums[j] == target and i != j.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: `4
2 7 11 15
9`,
        output: `0 1`,
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: `3
3 2 4
6`,
        output: `1 2`,
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    hints: ["Create a hash map to store the values and their indices as you iterate through the array."],
  }

  // Template code for different languages (CodeChef style)
  const templates = {
    cpp17: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}

int main() {
    int n;
    cin >> n;
    
    vector<int> nums(n);
    for(int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    int target;
    cin >> target;
    
    vector<int> result = twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    
    return 0;
}`,
    cpp14: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}

int main() {
    int n;
    cin >> n;
    
    vector<int> nums(n);
    for(int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    int target;
    cin >> target;
    
    vector<int> result = twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    
    return 0;
}`,
    java: `import java.util.*;
import java.lang.*;
import java.io.*;

class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
    
    public static void main(String[] args) throws java.lang.Exception {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        
        int[] nums = new int[n];
        for(int i = 0; i < n; i++) {
            nums[i] = scanner.nextInt();
        }
        
        int target = scanner.nextInt();
        
        int[] result = twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
    python3: `# cook your dish here
def two_sum(nums, target):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    
    result = two_sum(nums, target)
    print(f"{result[0]} {result[1]}")`,
    pypy3: `# cook your dish here
def two_sum(nums, target):
    # Your code here
    pass

if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    
    result = two_sum(nums, target)
    print(f"{result[0]} {result[1]}")`,
    javascript: `// cook your dish here
function twoSum(nums, target) {
    // Your code here
}

// Reading input
process.stdin.resume();
process.stdin.setEncoding('utf8');

let input = '';
process.stdin.on('data', function(chunk) {
    input += chunk;
});

process.stdin.on('end', function() {
    const lines = input.trim().split('\\n');
    const n = parseInt(lines[0]);
    const nums = lines[1].split(' ').map(Number);
    const target = parseInt(lines[2]);
    
    const result = twoSum(nums, target);
    console.log(result[0] + ' ' + result[1]);
});`,
  }

  // Set initial code template based on selected language
  useEffect(() => {
    setCode(templates[language as keyof typeof templates] || "")
  }, [language])

  // Countdown timer for contest problems
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  const handleRun = () => {
    setStatus("running")
    // Simulate code execution (CodeChef style)
    setTimeout(() => {
      if (customInput.trim() === problem.examples[0].input.trim()) {
        setOutput(problem.examples[0].output)
        setStatus("success")
      } else if (customInput.trim() === problem.examples[1].input.trim()) {
        setOutput(problem.examples[1].output)
        setStatus("success")
      } else {
        setOutput("Input doesn't match any test case. Please check your input format.")
        setStatus("error")
      }
    }, 1500)
  }

  const handleSubmit = () => {
    setStatus("running")
    // Simulate submission (CodeChef style)
    setTimeout(() => {
      setStatus("success")
      setOutput("Submission successful!\n\nVerdict: Accepted (AC)\nTime: 0.01s\nMemory: 4.2 MB")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/problems/${params.id}`}
              className="mr-4 flex items-center text-sm font-medium text-gray-700 hover:text-black"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Problem
            </Link>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {problem.id}. {problem.title}
            </h1>
            <Badge variant="outline" className="ml-2 border-green-500 text-green-600">
              {problem.difficulty}
            </Badge>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="submissions">My Submissions</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                <TabsTrigger value="discuss">Discuss</TabsTrigger>
              </TabsList>
              <TabsContent value="problem" className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Problem Description</h2>
                    <p className="mt-2 whitespace-pre-line text-gray-700">{problem.description}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Input Format</h2>
                    <p className="mt-2 whitespace-pre-line text-gray-700">{problem.inputFormat}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Output Format</h2>
                    <p className="mt-2 whitespace-pre-line text-gray-700">{problem.outputFormat}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Constraints</h2>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Examples</h2>
                    <div className="mt-2 space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="rounded-lg border border-gray-200">
                          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-medium">
                            Example {index + 1}
                          </div>
                          <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="p-4">
                              <h3 className="mb-2 text-sm font-medium">Input:</h3>
                              <pre className="whitespace-pre-wrap rounded bg-gray-100 p-2 text-sm font-mono">
                                {example.input}
                              </pre>
                            </div>
                            <div className="p-4">
                              <h3 className="mb-2 text-sm font-medium">Output:</h3>
                              <pre className="whitespace-pre-wrap rounded bg-gray-100 p-2 text-sm font-mono">
                                {example.output}
                              </pre>
                            </div>
                          </div>
                          {example.explanation && (
                            <div className="border-t border-gray-200 p-4">
                              <h3 className="mb-2 text-sm font-medium">Explanation:</h3>
                              <p className="text-sm text-gray-700">{example.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Problem Information</h2>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-500">Author</p>
                        <p className="font-medium">{problem.author}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time Limit</p>
                        <p className="font-medium">{problem.timeLimit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Memory Limit</p>
                        <p className="font-medium">{problem.memoryLimit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Source Size Limit</p>
                        <p className="font-medium">{problem.sourceSizeLimit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Successful Submissions</p>
                        <p className="font-medium">{problem.successfulSubmissions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Accuracy</p>
                        <p className="font-medium">{problem.accuracy}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Tags</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {problem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {problem.hints && (
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                      <div className="flex items-start">
                        <Info className="mr-2 h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium text-blue-800">Hints</h3>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-blue-700">
                            {problem.hints.map((hint, index) => (
                              <li key={index}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="submissions" className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Submission ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">When</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Language</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Memory</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          id: "SUB123456",
                          when: "2 hours ago",
                          language: "C++17",
                          status: "Accepted",
                          time: "0.01s",
                          memory: "4.2 MB",
                        },
                        {
                          id: "SUB123455",
                          when: "3 hours ago",
                          language: "Python3",
                          status: "Wrong Answer",
                          time: "0.03s",
                          memory: "7.8 MB",
                        },
                      ].map((submission, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-blue-600 hover:underline">
                            {submission.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{submission.when}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{submission.language}</td>
                          <td
                            className={`px-4 py-3 text-sm ${
                              submission.status === "Accepted" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {submission.status}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{submission.time}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{submission.memory}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="editorial" className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Approach</h2>
                    <p className="mt-2 text-gray-700">
                      The key insight to solving this problem efficiently is to use a hash map to store the values we've
                      seen so far and their indices. This allows us to check in O(1) time if the complement of the
                      current number (target - current) exists in the array.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Algorithm</h2>
                    <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-700">
                      <li>Create an empty hash map to store values and their indices.</li>
                      <li>Iterate through the array.</li>
                      <li>For each element, calculate its complement (target - current element).</li>
                      <li>
                        If the complement exists in the hash map, return the current index and the complement's index.
                      </li>
                      <li>Otherwise, add the current element and its index to the hash map.</li>
                    </ol>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Complexity Analysis</h2>
                    <ul className="mt-2 space-y-2 text-gray-700">
                      <li>
                        <span className="font-medium">Time Complexity:</span> O(n) where n is the length of the array.
                        We traverse the array once.
                      </li>
                      <li>
                        <span className="font-medium">Space Complexity:</span> O(n) for storing the hash map in the
                        worst case.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Sample Solution (C++)</h2>
                    <pre className="mt-2 whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm font-mono">
                      {`#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {}; // No solution found
}

int main() {
    int n;
    cin >> n;
    
    vector<int> nums(n);
    for(int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    int target;
    cin >> target;
    
    vector<int> result = twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="discuss" className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Discussion</h2>
                    <Button variant="outline" size="sm">
                      New Topic
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                          <div className="ml-3">
                            <div className="font-medium">user123</div>
                            <div className="text-xs text-gray-500">2 days ago</div>
                          </div>
                        </div>
                        <Badge variant="outline">Question</Badge>
                      </div>
                      <p className="mt-3 text-gray-700">
                        The hash map approach is O(n) time complexity and O(n) space complexity. Is there a way to solve
                        this with O(1) space?
                      </p>
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <button className="flex items-center hover:text-gray-700">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>12</span>
                        </button>
                        <span className="mx-2">•</span>
                        <span>3 replies</span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                          <div className="ml-3">
                            <div className="font-medium">coder456</div>
                            <div className="text-xs text-gray-500">1 day ago</div>
                          </div>
                        </div>
                        <Badge variant="outline">Tip</Badge>
                      </div>
                      <p className="mt-3 text-gray-700">
                        If you're getting TLE (Time Limit Exceeded), make sure you're using an unordered_map instead of
                        a regular map in C++. The lookup time is O(1) vs O(log n).
                      </p>
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <button className="flex items-center hover:text-gray-700">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>8</span>
                        </button>
                        <span className="mx-2">•</span>
                        <span>1 reply</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            {/* CodeChef-style IDE header */}
            <div className="flex items-center justify-between rounded-t-lg border border-gray-200 bg-gray-50 px-4 py-2">
              <div className="flex items-center">
                <Select value={language} onValueChange={setLanguage}>
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
                style={{ fontSize }}
              />
            </div>

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
                    onCheckedChange={(checked) =>
                      setCustomChecks((prev) => ({ ...prev, saveCode: checked as boolean }))
                    }
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
        </div>
      </div>
  )
}
