"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Trophy, Target, TrendingUp, Flame } from "lucide-react"

interface ProgressTrackerProps {
  problemId?: string
  courseId?: string
  compact?: boolean
}

export function ProgressTracker({ problemId, courseId, compact = false }: ProgressTrackerProps) {
  const [userProgress, setUserProgress] = useState({
    totalProblems: 150,
    solvedProblems: 47,
    currentStreak: 7,
    todaysSolved: 3,
    weeklyGoal: 20,
    weeklyProgress: 12,
    recentAchievements: [
      { name: "Problem Solver", earned: true },
      { name: "Week Warrior", earned: true },
      { name: "Speed Demon", earned: false, progress: 60 },
    ],
  })

  const overallProgress = Math.round((userProgress.solvedProblems / userProgress.totalProblems) * 100)
  const weeklyProgressPercent = Math.round((userProgress.weeklyProgress / userProgress.weeklyGoal) * 100)

  if (compact) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-sm">Progress</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {userProgress.solvedProblems}/{userProgress.totalProblems}
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{overallProgress}% Complete</span>
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              <span>{userProgress.currentStreak} day streak</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Your Progress
          </CardTitle>
          <CardDescription>Track your coding journey and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {userProgress.solvedProblems} of {userProgress.totalProblems} problems solved
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Weekly Goal</span>
                <span className="text-sm text-muted-foreground">{weeklyProgressPercent}%</span>
              </div>
              <Progress value={weeklyProgressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {userProgress.weeklyProgress} of {userProgress.weeklyGoal} problems this week
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Flame className="h-4 w-4 text-orange-500" />
              <div>
                <div className="font-medium text-sm">{userProgress.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-medium text-sm">{userProgress.todaysSolved}</div>
                <div className="text-xs text-muted-foreground">Today</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <div>
                <div className="font-medium text-sm">#{Math.floor(Math.random() * 2000) + 1000}</div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {userProgress.recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                <div className="flex items-center gap-2">
                  {achievement.earned ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium">{achievement.name}</span>
                </div>
                {achievement.earned ? (
                  <Badge variant="secondary" className="text-xs">
                    Earned
                  </Badge>
                ) : (
                  <div className="flex items-center gap-2">
                    <Progress value={achievement.progress || 0} className="h-1 w-16" />
                    <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
