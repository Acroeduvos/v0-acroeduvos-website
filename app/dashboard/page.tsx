"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Target, CheckCircle, XCircle, TrendingUp, Code, Flame, Zap, Brain } from "lucide-react"

const userStats = {
  totalProblems: 150,
  solvedProblems: 47,
  easyProblems: { solved: 25, total: 60 },
  mediumProblems: { solved: 18, total: 70 },
  hardProblems: { solved: 4, total: 20 },
  currentStreak: 7,
  maxStreak: 15,
  totalSubmissions: 89,
  acceptedSubmissions: 47,
  rank: 1247,
  points: 2850,
  badges: [
    { name: "First Solve", icon: Trophy, color: "text-yellow-500" },
    { name: "Week Warrior", icon: Flame, color: "text-orange-500" },
    { name: "Problem Solver", icon: Brain, color: "text-purple-500" },
    { name: "Code Master", icon: Code, color: "text-blue-500" },
  ],
}

const recentActivity = [
  { problem: "Two Sum", status: "accepted", time: "2 hours ago", difficulty: "Easy" },
  { problem: "Valid Parentheses", status: "accepted", time: "5 hours ago", difficulty: "Easy" },
  { problem: "Merge Two Sorted Lists", status: "wrong-answer", time: "1 day ago", difficulty: "Easy" },
  { problem: "Longest Substring", status: "accepted", time: "2 days ago", difficulty: "Medium" },
  { problem: "Container With Most Water", status: "accepted", time: "3 days ago", difficulty: "Medium" },
]

const weeklyProgress = [
  { day: "Mon", problems: 3 },
  { day: "Tue", problems: 2 },
  { day: "Wed", problems: 4 },
  { day: "Thu", problems: 1 },
  { day: "Fri", problems: 5 },
  { day: "Sat", problems: 2 },
  { day: "Sun", problems: 3 },
]

const achievements = [
  {
    title: "First Blood",
    description: "Solve your first problem",
    progress: 100,
    unlocked: true,
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    title: "Speed Demon",
    description: "Solve 5 problems in one day",
    progress: 100,
    unlocked: true,
    icon: Zap,
    color: "text-blue-500",
  },
  {
    title: "Consistency King",
    description: "Maintain a 30-day streak",
    progress: 23,
    unlocked: false,
    icon: Flame,
    color: "text-orange-500",
  },
  {
    title: "Algorithm Master",
    description: "Solve 100 problems",
    progress: 47,
    unlocked: false,
    icon: Brain,
    color: "text-purple-500",
  },
]

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const acceptanceRate = Math.round((userStats.acceptedSubmissions / userStats.totalSubmissions) * 100)
  const overallProgress = Math.round((userStats.solvedProblems / userStats.totalProblems) * 100)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-6">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track your coding progress and achievements</p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.solvedProblems}</div>
                    <p className="text-xs text-muted-foreground">{overallProgress}% of total problems</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    <Flame className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.currentStreak}</div>
                    <p className="text-xs text-muted-foreground">Max streak: {userStats.maxStreak} days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
                    <Target className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{acceptanceRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {userStats.acceptedSubmissions}/{userStats.totalSubmissions} submissions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">#{userStats.rank}</div>
                    <p className="text-xs text-muted-foreground">{userStats.points} points earned</p>
                  </CardContent>
                </Card>
              </div>

              {/* Problem Breakdown */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Difficulty Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Easy</span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.easyProblems.solved}/{userStats.easyProblems.total}
                        </span>
                      </div>
                      <Progress
                        value={(userStats.easyProblems.solved / userStats.easyProblems.total) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Medium</span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.mediumProblems.solved}/{userStats.mediumProblems.total}
                        </span>
                      </div>
                      <Progress
                        value={(userStats.mediumProblems.solved / userStats.mediumProblems.total) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Hard</span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.hardProblems.solved}/{userStats.hardProblems.total}
                        </span>
                      </div>
                      <Progress
                        value={(userStats.hardProblems.solved / userStats.hardProblems.total) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between h-32">
                      {weeklyProgress.map((day, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div
                            className="bg-primary rounded-sm w-8 transition-all hover:bg-primary/80"
                            style={{ height: `${(day.problems / 5) * 100}px` }}
                          />
                          <span className="text-xs text-muted-foreground">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Earned Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {userStats.badges.map((badge, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div className="p-3 rounded-full bg-muted">
                          <badge.icon className={`h-6 w-6 ${badge.color}`} />
                        </div>
                        <span className="text-xs font-medium">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>Your journey through all problems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{overallProgress}%</div>
                      <p className="text-muted-foreground">Complete</p>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{userStats.solvedProblems} solved</span>
                      <span>{userStats.totalProblems - userStats.solvedProblems} remaining</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Distribution</CardTitle>
                    <CardDescription>Your strengths across different topics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { skill: "Arrays & Strings", progress: 85 },
                      { skill: "Dynamic Programming", progress: 45 },
                      { skill: "Trees & Graphs", progress: 60 },
                      { skill: "Sorting & Searching", progress: 75 },
                      { skill: "Math & Logic", progress: 30 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.skill}</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={achievement.unlocked ? "border-green-200" : ""}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-green-100" : "bg-muted"}`}>
                          <achievement.icon
                            className={`h-5 w-5 ${achievement.unlocked ? achievement.color : "text-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                        {achievement.unlocked && (
                          <Badge variant="secondary" className="ml-auto">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    {!achievement.unlocked && (
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest problem-solving sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            {activity.status === "accepted" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <div>
                              <div className="font-medium">{activity.problem}</div>
                              <div className="text-sm text-muted-foreground">{activity.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                activity.difficulty === "Easy"
                                  ? "secondary"
                                  : activity.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {activity.difficulty}
                            </Badge>
                            <Badge variant={activity.status === "accepted" ? "secondary" : "destructive"}>
                              {activity.status === "accepted" ? "Accepted" : "Wrong Answer"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
