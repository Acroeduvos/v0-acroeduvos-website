"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, MessageSquare, Share2, Bookmark, ChevronLeft, ChevronRight, Code, FileText } from "lucide-react"

function SolveButton({ problemId }: { problemId: string }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/problems/${problemId}/solve`)
    } else {
      localStorage.setItem("redirectAfterLogin", `/problems/${problemId}/solve`)
      router.push("/auth/login")
    }
  }

  return (
    <Button onClick={handleClick} className="flex items-center gap-2 bg-[#0d47a1] hover:bg-[#1565c0]">
      <Code className="h-4 w-4" />
      {isLoggedIn ? "Solve Problem" : "Login to Solve"}
    </Button>
  )
}

export default function ProblemPage({ params }: { params: { id: string } }) {
  // This would normally fetch the problem data based on the ID
  const problem = {
    id: params.id,
    code: "TWOSUM",
    title: "Two Sum",
    difficulty: "Easy (Div 3)",
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/problems" className="flex items-center text-sm font-medium text-gray-700 hover:text-black">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Problems
        </Link>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              {problem.code} - {problem.title}
            </h1>
            <Badge variant="outline" className="ml-2 border-green-500 text-green-600">
              {problem.difficulty}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-500">Time Limit: {problem.timeLimit}</span>
            <span className="text-sm text-gray-500">Memory Limit: {problem.memoryLimit}</span>
            <span className="text-sm text-gray-500">Source Limit: {problem.sourceSizeLimit}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SolveButton problemId={params.id} />
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            Like
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Discuss
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="problem">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="problem">Problem</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          <TabsTrigger value="editorial">Editorial</TabsTrigger>
          <TabsTrigger value="discuss">Discuss</TabsTrigger>
        </TabsList>

        <TabsContent value="problem" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/problems/THREESUM" className="text-sm text-gray-900 hover:underline">
                        THREESUM - 3Sum
                      </Link>
                      <Badge variant="outline" className="ml-2 border-yellow-500 text-yellow-600">
                        Medium
                      </Badge>
                    </li>
                    <li>
                      <Link href="/problems/FOURSUM" className="text-sm text-gray-900 hover:underline">
                        FOURSUM - 4Sum
                      </Link>
                      <Badge variant="outline" className="ml-2 border-red-500 text-red-600">
                        Hard
                      </Badge>
                    </li>
                    <li>
                      <Link href="/problems/TWOSUM2" className="text-sm text-gray-900 hover:underline">
                        TWOSUM2 - Two Sum II - Input Array Is Sorted
                      </Link>
                      <Badge variant="outline" className="ml-2 border-green-500 text-green-600">
                        Easy
                      </Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Problem Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Author</p>
                      <p className="font-medium">{problem.author}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Successful Submissions</p>
                      <p className="font-medium">{problem.successfulSubmissions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Accuracy</p>
                      <p className="font-medium">{problem.accuracy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tags</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {problem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Link href={`/problems/${params.id}/solve`}>
                        <Button className="w-full bg-[#0d47a1] hover:bg-[#1565c0]">Solve Problem</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Submissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
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
                        status: "Accepted (AC)",
                        time: "0.01s",
                        memory: "4.2 MB",
                      },
                      {
                        id: "SUB123455",
                        when: "3 hours ago",
                        language: "Python3",
                        status: "Wrong Answer (WA)",
                        time: "0.03s",
                        memory: "7.8 MB",
                      },
                    ].map((submission, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-blue-600 hover:underline">
                          <Link href={`/submissions/${submission.id}`}>{submission.id}</Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{submission.when}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{submission.language}</td>
                        <td
                          className={`px-4 py-3 text-sm ${
                            submission.status.includes("Accepted") ? "text-green-600" : "text-red-600"
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editorial" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-gray-500" />
                <CardTitle>Editorial</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Approach</h2>
                  <p className="mt-2 text-gray-700">
                    The key insight to solving this problem efficiently is to use a hash map to store the values we've
                    seen so far and their indices. This allows us to check in O(1) time if the complement of the current
                    number (target - current) exists in the array.
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
                      <span className="font-medium">Time Complexity:</span> O(n) where n is the length of the array. We
                      traverse the array once.
                    </li>
                    <li>
                      <span className="font-medium">Space Complexity:</span> O(n) for storing the hash map in the worst
                      case.
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discuss" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-gray-500" />
                  <CardTitle>Discussion</CardTitle>
                </div>
                <Button className="bg-[#0d47a1] hover:bg-[#1565c0]">New Topic</Button>
              </div>
            </CardHeader>
            <CardContent>
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
                    If the array is sorted, you can use two pointers approach with O(1) extra space. But sorting would
                    take O(n log n) time.
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Problem
        </Button>
        <Button variant="outline" className="flex items-center">
          Next Problem
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
