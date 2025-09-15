"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Trophy, Award, Calendar, Clock, ArrowRight, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "John Doe",
    username: "johndoe",
    rank: 1245,
    rating: 1842,
    problemsSolved: 127,
    contestsParticipated: 15,
    streak: 7,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back, {user.name}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{user.rank}</div>
            <p className="text-xs text-gray-500">Global ranking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.rating}</div>
            <p className="text-xs text-gray-500">Expert level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Problems Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.problemsSolved}</div>
            <p className="text-xs text-gray-500">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.streak} days</div>
            <p className="text-xs text-gray-500">Keep it going!</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="contests">Contests</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: "Solved", item: "Two Sum", time: "2 hours ago", type: "problem" },
                { action: "Completed", item: "Data Structures Fundamentals", time: "1 day ago", type: "course" },
                { action: "Participated", item: "Weekly Challenge #41", time: "3 days ago", type: "contest" },
                { action: "Earned", item: "Algorithm Specialist Certificate", time: "1 week ago", type: "certificate" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start rounded-lg border border-gray-200 p-4">
                  <div className="mr-4 rounded-full bg-[#f5f2ee] p-2">
                    {activity.type === "problem" ? (
                      <Code className="h-5 w-5 text-gray-700" />
                    ) : activity.type === "course" ? (
                      <BookOpen className="h-5 w-5 text-gray-700" />
                    ) : activity.type === "contest" ? (
                      <Trophy className="h-5 w-5 text-gray-700" />
                    ) : (
                      <Award className="h-5 w-5 text-gray-700" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {activity.action} <span className="text-black">{activity.item}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Progress Overview</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Problem Solving</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Easy (45/100)</span>
                        <span className="text-gray-500">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Medium (30/150)</span>
                        <span className="text-gray-500">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Hard (12/100)</span>
                        <span className="text-gray-500">12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Topic Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Arrays & Strings</span>
                        <span className="text-gray-500">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Dynamic Programming</span>
                        <span className="text-gray-500">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Graph Algorithms</span>
                        <span className="text-gray-500">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Recommended for You</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-[#e8e3dc] text-black">Problem</Badge>
                  <CardTitle className="text-lg">Merge Intervals</CardTitle>
                  <CardDescription>Medium Difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-black">
                    Solve Now
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-[#e8e3dc] text-black">Course</Badge>
                  <CardTitle className="text-lg">Dynamic Programming Masterclass</CardTitle>
                  <CardDescription>Intermediate Level</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Master the art of dynamic programming with step-by-step tutorials and practice problems.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-black">
                    Start Learning
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-[#e8e3dc] text-black">Contest</Badge>
                  <CardTitle className="text-lg">Weekly Challenge #42</CardTitle>
                  <CardDescription>Starts in 2 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Test your skills in this weekly coding challenge with problems of varying difficulty.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-black">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Courses</h2>
            <Link href="/learn" className="text-sm font-medium text-gray-700 hover:text-black">
              Browse all courses <ArrowRight className="ml-1 inline-block h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">In Progress</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Data Structures Fundamentals",
                    progress: 75,
                    lessons: 12,
                    completedLessons: 9,
                    lastAccessed: "2 days ago",
                  },
                  {
                    title: "Algorithms Masterclass",
                    progress: 30,
                    lessons: 18,
                    completedLessons: 5,
                    lastAccessed: "1 week ago",
                  },
                ].map((course, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        {course.completedLessons}/{course.lessons} lessons completed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <p className="text-sm text-gray-500">Last accessed {course.lastAccessed}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-black">Continue Learning</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Completed</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Introduction to Programming",
                    completedDate: "Mar 15, 2025",
                    lessons: 10,
                  },
                  {
                    title: "Web Development Basics",
                    completedDate: "Feb 28, 2025",
                    lessons: 15,
                  },
                ].map((course, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <CardDescription>Completed on {course.completedDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">{course.lessons} lessons</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View Certificate</Button>
                      <Button variant="outline">Review Course</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contests" className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Contests</h2>
            <Link href="/contests" className="text-sm font-medium text-gray-700 hover:text-black">
              Browse all contests <ArrowRight className="ml-1 inline-block h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Upcoming Registrations</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Weekly Challenge #42",
                    date: "Apr 15, 2025",
                    time: "8:00 PM - 11:00 PM",
                    difficulty: "Medium",
                  },
                  {
                    title: "Data Structures Marathon",
                    date: "Apr 20, 2025",
                    time: "9:00 AM - 9:00 PM",
                    difficulty: "Hard",
                  },
                ].map((contest, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{contest.title}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-2">
                          {contest.difficulty}
                        </Badge>
                        Registered
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-2 h-4 w-4" />
                          {contest.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-2 h-4 w-4" />
                          {contest.time}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-black">Set Reminder</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Past Participations</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-[#f5f2ee]">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contest</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[
                          {
                            title: "Weekly Challenge #41",
                            date: "Apr 8, 2025",
                            rank: 245,
                            score: "300/500",
                          },
                          {
                            title: "Algorithm Showdown",
                            date: "Apr 1, 2025",
                            rank: 189,
                            score: "450/600",
                          },
                          {
                            title: "Beginner's Coding Contest",
                            date: "Mar 25, 2025",
                            rank: 56,
                            score: "280/300",
                          },
                        ].map((contest, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{contest.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{contest.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">#{contest.rank}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{contest.score}</td>
                            <td className="px-6 py-4 text-sm">
                              <Button variant="link" className="h-auto p-0 text-black">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Certificates</h2>
            <Link href="/learn" className="text-sm font-medium text-gray-700 hover:text-black">
              Browse all courses <ArrowRight className="ml-1 inline-block h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Algorithm Specialist",
                issueDate: "Mar 10, 2025",
                expiryDate: "Mar 10, 2027",
                credentialID: "ACRO-ALG-2025-1234",
              },
              {
                title: "Data Structures Master",
                issueDate: "Feb 15, 2025",
                expiryDate: "Feb 15, 2027",
                credentialID: "ACRO-DST-2025-5678",
              },
              {
                title: "Web Development Fundamentals",
                issueDate: "Jan 20, 2025",
                expiryDate: "Jan 20, 2027",
                credentialID: "ACRO-WEB-2025-9012",
              },
            ].map((certificate, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-[#e8e3dc] p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white p-3">
                    <Award className="h-full w-full text-black" />
                  </div>
                  <h3 className="text-lg font-semibold">{certificate.title}</h3>
                  <p className="text-sm text-gray-700">Certificate of Completion</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Issued On:</span>
                      <span>{certificate.issueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Valid Until:</span>
                      <span>{certificate.expiryDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Credential ID:</span>
                      <span>{certificate.credentialID}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                  <Button variant="outline">Download</Button>
                  <Button variant="outline">Share</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium">Certificates in Progress</h3>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-[#f5f2ee]">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Progress</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Estimated Completion
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          title: "Dynamic Programming Masterclass",
                          progress: 30,
                          estimatedCompletion: "May 15, 2025",
                        },
                        {
                          title: "Advanced Graph Algorithms",
                          progress: 45,
                          estimatedCompletion: "Apr 30, 2025",
                        },
                      ].map((course, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Progress value={course.progress} className="mr-2 h-2 w-24" />
                              <span className="text-sm text-gray-700">{course.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{course.estimatedCompletion}</td>
                          <td className="px-6 py-4 text-sm">
                            <Button variant="link" className="h-auto p-0 text-black">
                              Continue Course
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
