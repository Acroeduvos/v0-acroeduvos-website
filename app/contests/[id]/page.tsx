"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Clock, Users, Trophy, AlertTriangle, CheckCircle } from "lucide-react"

export default function ContestPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("problems")

  // Mock contest data (CodeChef style)
  const contest = {
    id: params.id,
    title: "April Long Challenge 2025",
    code: "APRIL25",
    startTime: "Apr 15, 2025 15:00 IST",
    endTime: "Apr 25, 2025 15:00 IST",
    duration: "10 days",
    status: "ongoing", // upcoming, ongoing, ended
    participants: 12450,
    description: `Welcome to the April Long Challenge 2025!
    
This is a 10-day long contest with 10 problems of varying difficulty levels. The problems are designed to test your algorithmic and problem-solving skills.

The contest is rated for all participants. Good luck and have fun!`,
    rules: [
      "You can use any programming language supported by our platform.",
      "Each participant can submit solutions multiple times, but only the highest scoring submission for each problem will be considered.",
      "The leaderboard is determined by the total score across all problems.",
      "In case of a tie, the participant who reached the score earlier wins.",
      "Plagiarism will result in disqualification.",
      "Internet access is allowed during the contest.",
      "Discussion of problems is allowed, but sharing code is prohibited.",
    ],
    scoring: `Points for each problem depend on its difficulty:
- Division 1: 100-1000 points
- Division 2: 100-750 points
- Division 3: 100-500 points

Partial scoring is available for some problems.`,
    problems: [
      {
        id: "TWOSUM",
        title: "Two Sum",
        difficulty: "Easy (Div 3)",
        solved: 8760,
        attempted: 10240,
        points: 100,
        status: "solved", // solved, attempted, unattempted
      },
      {
        id: "VALIDPAR",
        title: "Valid Parentheses",
        difficulty: "Easy (Div 3)",
        solved: 7420,
        attempted: 9500,
        points: 100,
        status: "attempted",
      },
      {
        id: "LONGSTR",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium (Div 2)",
        solved: 5120,
        attempted: 8200,
        points: 250,
        status: "unattempted",
      },
      {
        id: "MERGEKL",
        title: "Merge K Sorted Lists",
        difficulty: "Hard (Div 1)",
        solved: 2450,
        attempted: 5600,
        points: 500,
        status: "unattempted",
      },
      {
        id: "LRUCACHE",
        title: "LRU Cache",
        difficulty: "Medium (Div 2)",
        solved: 3200,
        attempted: 5800,
        points: 300,
        status: "unattempted",
      },
      {
        id: "TRAPRAIN",
        title: "Trapping Rain Water",
        difficulty: "Hard (Div 1)",
        solved: 1800,
        attempted: 4200,
        points: 750,
        status: "unattempted",
      },
      {
        id: "MAXSUB",
        title: "Maximum Subarray",
        difficulty: "Easy (Div 3)",
        solved: 6500,
        attempted: 8900,
        points: 150,
        status: "unattempted",
      },
      {
        id: "WORDSRCH",
        title: "Word Search",
        difficulty: "Medium (Div 2)",
        solved: 4100,
        attempted: 6700,
        points: 350,
        status: "unattempted",
      },
      {
        id: "MEDIANARY",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard (Div 1)",
        solved: 1200,
        attempted: 3500,
        points: 1000,
        status: "unattempted",
      },
      {
        id: "PALINSUB",
        title: "Longest Palindromic Substring",
        difficulty: "Medium (Div 2)",
        solved: 3800,
        attempted: 6200,
        points: 400,
        status: "unattempted",
      },
    ],
    mySubmissions: [
      {
        problemId: "TWOSUM",
        submissionId: "SUB123456",
        language: "C++17",
        status: "Accepted",
        time: "0.01s",
        memory: "4.2 MB",
        points: 100,
        submittedAt: "Apr 15, 2025 20:05 IST",
      },
      {
        problemId: "VALIDPAR",
        submissionId: "SUB123457",
        language: "Python3",
        status: "Wrong Answer",
        time: "0.03s",
        memory: "7.8 MB",
        points: 0,
        submittedAt: "Apr 15, 2025 21:15 IST",
      },
      {
        problemId: "VALIDPAR",
        submissionId: "SUB123458",
        language: "Python3",
        status: "Wrong Answer",
        time: "0.03s",
        memory: "7.9 MB",
        points: 0,
        submittedAt: "Apr 15, 2025 21:25 IST",
      },
    ],
    leaderboard: [
      {
        rank: 1,
        username: "codemaster42",
        country: "India",
        score: 2850,
        problemsSolved: "9/10",
      },
      {
        rank: 2,
        username: "algorithmPro",
        country: "United States",
        score: 2800,
        problemsSolved: "9/10",
      },
      {
        rank: 3,
        username: "byteCoder",
        country: "Japan",
        score: 2500,
        problemsSolved: "8/10",
      },
      {
        rank: 4,
        username: "devGenius",
        country: "Germany",
        score: 2350,
        problemsSolved: "8/10",
      },
      {
        rank: 5,
        username: "codingNinja",
        country: "China",
        score: 2200,
        problemsSolved: "7/10",
      },
      {
        rank: 42,
        username: "johndoe",
        country: "India",
        score: 100,
        problemsSolved: "1/10",
        isCurrentUser: true,
      },
    ],
  }

  // Calculate time remaining or elapsed
  const calculateTimeStatus = () => {
    const now = new Date()
    const endTime = new Date(contest.endTime.replace(" IST", ""))
    const startTime = new Date(contest.startTime.replace(" IST", ""))

    if (now < startTime) {
      const diff = startTime.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      return `Starts in ${days}d ${hours}h`
    } else if (now < endTime) {
      const diff = endTime.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      return `Ends in ${days}d ${hours}h`
    } else {
      return "Contest ended"
    }
  }

  // Calculate my score and rank
  const myScore = contest.mySubmissions.reduce((total, submission) => total + submission.points, 0)
  const myRank = contest.leaderboard.find((entry) => entry.isCurrentUser)?.rank || "-"

  // Calculate contest progress
  const calculateProgress = () => {
    const now = new Date()
    const endTime = new Date(contest.endTime.replace(" IST", ""))
    const startTime = new Date(contest.startTime.replace(" IST", ""))

    if (now < startTime) return 0
    if (now > endTime) return 100

    const totalDuration = endTime.getTime() - startTime.getTime()
    const elapsed = now.getTime() - startTime.getTime()
    return Math.floor((elapsed / totalDuration) * 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/contests" className="flex items-center text-sm font-medium text-gray-700 hover:text-black">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Contests
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{contest.title}</h1>
              <Badge className="ml-2 bg-gray-100 text-gray-800">{contest.code}</Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {contest.startTime} - {contest.endTime}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-1 h-4 w-4" />
                {contest.participants.toLocaleString()} participants
              </div>
              <Badge
                className={
                  contest.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : contest.status === "ongoing"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                }
              >
                {contest.status === "upcoming" ? "Upcoming" : contest.status === "ongoing" ? "Ongoing" : "Ended"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">My Score</div>
              <div className="text-2xl font-bold">{myScore}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">My Rank</div>
              <div className="text-2xl font-bold">#{myRank}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">{calculateTimeStatus()}</div>
              <Progress value={calculateProgress()} className="mt-1 h-2 w-32" />
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="discuss">Discuss</TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problem</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Points</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Solved/Attempted</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contest.problems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{problem.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {problem.status === "solved" ? (
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            ) : problem.status === "attempted" ? (
                              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                            ) : null}
                            <Link
                              href={`/contests/${params.id}/problems/${problem.id}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              {problem.title}
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{problem.difficulty}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{problem.points}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {problem.solved.toLocaleString()}/{problem.attempted.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/contests/${params.id}/problems/${problem.id}/solve`}>
                            <Button size="sm" className="bg-[#0d47a1] hover:bg-[#1565c0]">
                              Solve
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submission ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problem</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Language</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Memory</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Points</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contest.mySubmissions.map((submission, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:underline">
                          <Link href={`/submissions/${submission.submissionId}`}>{submission.submissionId}</Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.problemId}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.language}</td>
                        <td
                          className={`px-6 py-4 text-sm ${
                            submission.status === "Accepted" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {submission.status}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.time}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.memory}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.points}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Username</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Country</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problems Solved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contest.leaderboard.map((entry) => (
                      <tr
                        key={entry.rank}
                        className={`${entry.isCurrentUser ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"}`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {entry.rank === 1 ? <Trophy className="h-5 w-5 text-yellow-500" /> : entry.rank}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {entry.username}
                          {entry.isCurrentUser && <span className="ml-2 text-xs text-blue-600">(You)</span>}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{entry.country}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{entry.score}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{entry.problemsSolved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contest Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-gray-700">{contest.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                {contest.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-gray-700">{contest.scoring}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discuss" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Discussion Forum</CardTitle>
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
                        <div className="font-medium">codemaster42</div>
                        <div className="text-xs text-gray-500">2 days ago</div>
                      </div>
                    </div>
                    <Badge variant="outline">Announcement</Badge>
                  </div>
                  <p className="mt-3 text-gray-700">
                    Welcome to the April Long Challenge 2025! Feel free to discuss the problems here, but remember not
                    to share your code.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span>24 replies</span>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="ml-3">
                        <div className="font-medium">algorithmPro</div>
                        <div className="text-xs text-gray-500">1 day ago</div>
                      </div>
                    </div>
                    <Badge variant="outline">Question</Badge>
                  </div>
                  <p className="mt-3 text-gray-700">
                    Is anyone else getting TLE on problem TRAPRAIN? I've tried optimizing my solution but still can't
                    get it to pass all test cases.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span>12 replies</span>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="ml-3">
                        <div className="font-medium">byteCoder</div>
                        <div className="text-xs text-gray-500">12 hours ago</div>
                      </div>
                    </div>
                    <Badge variant="outline">Hint</Badge>
                  </div>
                  <p className="mt-3 text-gray-700">
                    For problem LONGSTR, think about using a sliding window approach. It's much more efficient than the
                    brute force method.
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span>8 replies</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
