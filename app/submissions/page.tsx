"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar } from "lucide-react"

export default function SubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [problemFilter, setProblemFilter] = useState("")
  const [dateRange, setDateRange] = useState("all")

  // Mock submissions data (CodeChef style)
  const submissions = [
    {
      id: "SUB123456",
      problemId: "TWOSUM",
      problemTitle: "Two Sum",
      contestCode: "APRIL25",
      language: "C++17",
      status: "Accepted (AC)",
      runtime: "0.01s",
      memory: "4.2 MB",
      submittedAt: "Apr 15, 2025 20:05 IST",
    },
    {
      id: "SUB123455",
      problemId: "VALIDPAR",
      problemTitle: "Valid Parentheses",
      contestCode: "APRIL25",
      language: "Python3",
      status: "Wrong Answer (WA)",
      runtime: "0.03s",
      memory: "7.8 MB",
      submittedAt: "Apr 15, 2025 19:45 IST",
    },
    {
      id: "SUB123454",
      problemId: "VALIDPAR",
      problemTitle: "Valid Parentheses",
      contestCode: "APRIL25",
      language: "Python3",
      status: "Wrong Answer (WA)",
      runtime: "0.03s",
      memory: "7.9 MB",
      submittedAt: "Apr 15, 2025 19:30 IST",
    },
    {
      id: "SUB123453",
      problemId: "LONGSTR",
      problemTitle: "Longest Substring Without Repeating Characters",
      contestCode: "APRIL25",
      language: "Java",
      status: "Time Limit Exceeded (TLE)",
      runtime: "N/A",
      memory: "N/A",
      submittedAt: "Apr 12, 2025 14:20 IST",
    },
    {
      id: "SUB123452",
      problemId: "MEDIANARY",
      problemTitle: "Median of Two Sorted Arrays",
      contestCode: "APRIL25",
      language: "JavaScript",
      status: "Runtime Error (RE)",
      runtime: "N/A",
      memory: "N/A",
      submittedAt: "Apr 12, 2025 10:15 IST",
    },
    {
      id: "SUB123451",
      problemId: "PALINSUB",
      problemTitle: "Longest Palindromic Substring",
      contestCode: "MARCH25",
      language: "C++17",
      status: "Accepted (AC)",
      runtime: "0.02s",
      memory: "5.1 MB",
      submittedAt: "Mar 25, 2025 16:30 IST",
    },
    {
      id: "SUB123450",
      problemId: "MAXSUB",
      problemTitle: "Maximum Subarray",
      contestCode: "MARCH25",
      language: "C++17",
      status: "Accepted (AC)",
      runtime: "0.01s",
      memory: "4.5 MB",
      submittedAt: "Mar 24, 2025 12:15 IST",
    },
    {
      id: "SUB123449",
      problemId: "WORDSRCH",
      problemTitle: "Word Search",
      contestCode: "MARCH25",
      language: "Python3",
      status: "Compilation Error (CE)",
      runtime: "N/A",
      memory: "N/A",
      submittedAt: "Mar 23, 2025 09:45 IST",
    },
    {
      id: "SUB123448",
      problemId: "WORDSRCH",
      problemTitle: "Word Search",
      contestCode: "MARCH25",
      language: "Python3",
      status: "Accepted (AC)",
      runtime: "0.05s",
      memory: "8.2 MB",
      submittedAt: "Mar 23, 2025 10:30 IST",
    },
    {
      id: "SUB123447",
      problemId: "LRUCACHE",
      problemTitle: "LRU Cache",
      contestCode: "MARCH25",
      language: "Java",
      status: "Accepted (AC)",
      runtime: "0.12s",
      memory: "42.8 MB",
      submittedAt: "Mar 22, 2025 14:20 IST",
    },
  ]

  // Filter submissions based on selected filters
  const filteredSubmissions = submissions.filter((submission) => {
    if (statusFilter !== "all" && !submission.status.includes(statusFilter)) return false
    if (languageFilter !== "all" && submission.language !== languageFilter) return false
    if (
      problemFilter &&
      !submission.problemTitle.toLowerCase().includes(problemFilter.toLowerCase()) &&
      !submission.problemId.toLowerCase().includes(problemFilter.toLowerCase())
    )
      return false

    // Date range filtering
    if (dateRange === "today") {
      const today = new Date().toDateString()
      const submissionDate = new Date(submission.submittedAt.replace(" IST", "")).toDateString()
      if (today !== submissionDate) return false
    } else if (dateRange === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const submissionDate = new Date(submission.submittedAt.replace(" IST", ""))
      if (submissionDate < weekAgo) return false
    } else if (dateRange === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      const submissionDate = new Date(submission.submittedAt.replace(" IST", ""))
      if (submissionDate < monthAgo) return false
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Submissions</h1>
        <p className="mt-2 text-gray-600">View and manage all your problem submissions</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by problem title or code..."
              className="pl-10"
              value={problemFilter}
              onChange={(e) => setProblemFilter(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Filters:</span>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Wrong Answer">Wrong Answer</SelectItem>
                <SelectItem value="Time Limit Exceeded">Time Limit Exceeded</SelectItem>
                <SelectItem value="Runtime Error">Runtime Error</SelectItem>
                <SelectItem value="Compilation Error">Compilation Error</SelectItem>
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="C++17">C++17</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Python3">Python3</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Date Range:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={dateRange === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("all")}
              className={dateRange === "all" ? "bg-[#0d47a1] hover:bg-[#1565c0]" : ""}
            >
              All Time
            </Button>
            <Button
              variant={dateRange === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("today")}
              className={dateRange === "today" ? "bg-[#0d47a1] hover:bg-[#1565c0]" : ""}
            >
              Today
            </Button>
            <Button
              variant={dateRange === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("week")}
              className={dateRange === "week" ? "bg-[#0d47a1] hover:bg-[#1565c0]" : ""}
            >
              Last 7 Days
            </Button>
            <Button
              variant={dateRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange("month")}
              className={dateRange === "month" ? "bg-[#0d47a1] hover:bg-[#1565c0]" : ""}
            >
              Last 30 Days
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submission ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problem</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contest</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Language</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Runtime</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Memory</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:underline">
                  <Link href={`/submissions/${submission.id}`}>{submission.id}</Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/problems/${submission.problemId}`}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    {submission.problemId} - {submission.problemTitle}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{submission.contestCode}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{submission.language}</td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${
                    submission.status.includes("Accepted")
                      ? "text-green-600"
                      : submission.status.includes("Wrong Answer")
                        ? "text-red-600"
                        : submission.status.includes("Time Limit")
                          ? "text-yellow-600"
                          : "text-orange-600"
                  }`}
                >
                  {submission.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{submission.runtime}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{submission.memory}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{submission.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-50">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
