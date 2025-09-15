"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Download, Copy, ExternalLink } from "lucide-react"
import { CodeChefIDE } from "@/components/codechef-ide"

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  // Mock submission data - in a real app, this would be fetched from an API
  const submission = {
    id: params.id,
    problemId: "TWOSUM",
    problemTitle: "Two Sum",
    contestCode: "APRIL25",
    language: "cpp17",
    status: "Accepted",
    runtime: "0.01s",
    memory: "4.2 MB",
    submittedAt: "Apr 15, 2025 20:05 IST",
    code: `#include <bits/stdc++.h>
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
}`,
    testCases: [
      {
        input: `4
2 7 11 15
9`,
        expectedOutput: "0 1",
        actualOutput: "0 1",
        result: "Passed",
      },
      {
        input: `3
3 2 4
6`,
        expectedOutput: "1 2",
        actualOutput: "1 2",
        result: "Passed",
      },
      {
        input: `2
3 3
6`,
        expectedOutput: "0 1",
        actualOutput: "0 1",
        result: "Passed",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/submissions" className="flex items-center text-sm font-medium text-gray-700 hover:text-black">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Submissions
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Submission Details</h1>
        <p className="mt-2 text-gray-600">
          Submission for{" "}
          <Link href={`/problems/${submission.problemId}`} className="font-medium text-blue-600 hover:underline">
            {submission.problemTitle}
          </Link>
          {submission.contestCode && (
            <>
              {" "}
              in contest{" "}
              <Link href={`/contests/${submission.contestCode}`} className="font-medium text-blue-600 hover:underline">
                {submission.contestCode}
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="code">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="testcases">Test Cases</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="mt-4">
              <div className="mb-4 flex justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Submitted: {submission.submittedAt}</span>
                  <span>•</span>
                  <span>Language: {submission.language}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <CodeChefIDE initialCode={submission.code} initialLanguage={submission.language} readOnly={true} />
            </TabsContent>
            <TabsContent value="testcases" className="mt-4">
              <div className="space-y-6">
                {submission.testCases.map((testCase, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium">Test Case {index + 1}</h3>
                      <span
                        className={`text-sm font-medium ${
                          testCase.result === "Passed" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {testCase.result}
                      </span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Input:</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-auto">{testCase.input}</pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Expected Output:</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-auto">
                          {testCase.expectedOutput}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Your Output:</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-auto">
                          {testCase.actualOutput}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold">Submission Information</h2>
            </div>
            <div className="p-4">
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd className={`font-medium ${submission.status === "Accepted" ? "text-green-600" : "text-red-600"}`}>
                    {submission.status}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Language</dt>
                  <dd className="font-medium">{submission.language}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Runtime</dt>
                  <dd className="font-medium">{submission.runtime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Memory</dt>
                  <dd className="font-medium">{submission.memory}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Submitted At</dt>
                  <dd className="font-medium">{submission.submittedAt}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Submission ID</dt>
                  <dd className="font-medium">{submission.id}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Link href={`/problems/${submission.problemId}/solve`}>
              <Button className="w-full bg-[#0d47a1] hover:bg-[#1565c0]">Try Again</Button>
            </Link>
            <Link href={`/problems/${submission.problemId}`}>
              <Button variant="outline" className="w-full">
                View Problem
              </Button>
            </Link>
            {submission.contestCode && (
              <Link href={`/contests/${submission.contestCode}`}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  Back to Contest
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
