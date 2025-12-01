"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Trophy, Medal, Award, TrendingUp, Users,
  Code, Target, Zap, Activity, Crown
} from "lucide-react"

interface LeaderboardUser {
  rank: number
  username: string
  score: number
  problemsSolved: number
  contestsWon: number
  streak: number
  country: string
  avatar?: string
}

export default function LeaderboardPage() {
  const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardUser[]>([])
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardUser[]>([])
  const [monthlyLeaderboard, setMonthlyLeaderboard] = useState<LeaderboardUser[]>([])
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchLeaderboard()
    setIsLive(true)
    setLastUpdated(new Date())

    const interval = setInterval(() => {
      fetchLeaderboard()
      setLastUpdated(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const [globalRes, weeklyRes, monthlyRes] = await Promise.all([
        fetch('/api/leaderboard?type=global'),
        fetch('/api/leaderboard?type=weekly'),
        fetch('/api/leaderboard?type=monthly')
      ])

      const [globalData, weeklyData, monthlyData] = await Promise.all([
        globalRes.json(),
        weeklyRes.json(),
        monthlyRes.json()
      ])

      if (globalData.success) setGlobalLeaderboard(globalData.leaderboard)
      if (weeklyData.success) setWeeklyLeaderboard(weeklyData.leaderboard)
      if (monthlyData.success) setMonthlyLeaderboard(monthlyData.leaderboard)
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
      // Fallback to generated data
      generateLeaderboard()
    }
  }

  const generateLeaderboard = () => {
    const names = [
      'CodeMaster', 'AlgoNinja', 'ByteWarrior', 'DataWizard', 'LogicLord',
      'SyntaxSage', 'BugHunter', 'StackOverflow', 'GitGuru', 'DevDynamo',
      'PythonPro', 'JavaJedi', 'CppChampion', 'JSJuggler', 'RustRanger',
      'GoGopher', 'SwiftSamurai', 'KotlinKnight', 'RubyRebel', 'PHPPhantom',
      'TypeScriptTitan', 'ReactRanger', 'VueVirtuoso', 'AngularAce', 'NodeNinja'
    ]

    const countries = ['USA', 'India', 'China', 'UK', 'Germany', 'Canada', 'Japan', 'France', 'Brazil', 'Australia']

    const generateUsers = (count: number, baseScore: number) => {
      return Array.from({ length: count }, (_, i) => ({
        rank: i + 1,
        username: names[i % names.length] + (i > names.length ? Math.floor(i / names.length) : ''),
        score: Math.floor(baseScore - (i * 50) + Math.random() * 100),
        problemsSolved: Math.floor(500 - (i * 10) + Math.random() * 50),
        contestsWon: Math.floor(20 - (i * 0.5) + Math.random() * 5),
        streak: Math.floor(100 - (i * 2) + Math.random() * 10),
        country: countries[Math.floor(Math.random() * countries.length)]
      }))
    }

    setGlobalLeaderboard(generateUsers(50, 10000))
    setWeeklyLeaderboard(generateUsers(50, 5000))
    setMonthlyLeaderboard(generateUsers(50, 8000))
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500">🥇 Champion</Badge>
    if (rank === 2) return <Badge className="bg-gray-400">🥈 Runner-up</Badge>
    if (rank === 3) return <Badge className="bg-amber-600">🥉 Third Place</Badge>
    if (rank <= 10) return <Badge variant="secondary">Top 10</Badge>
    if (rank <= 50) return <Badge variant="outline">Top 50</Badge>
    return null
  }

  const LeaderboardTable = ({ users }: { users: LeaderboardUser[] }) => (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.rank}
          className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : ''
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 text-center">
                {getRankIcon(user.rank)}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 text-white">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-lg">{user.username}</span>
                  {getRankBadge(user.rank)}
                  <Badge variant="outline" className="text-xs">{user.country}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    {user.problemsSolved} solved
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {user.contestsWon} contests
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {user.streak} day streak
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{user.score.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Live Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 animate-pulse" />
                <span className="font-medium">LIVE LEADERBOARD</span>
              </div>
              <span>Updated: {mounted && lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--:--'}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {globalLeaderboard.length} competitors
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <h1 className="text-4xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Compete with programmers worldwide. Rankings update in real-time!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {globalLeaderboard.slice(0, 3).map((user, index) => (
            <Card key={user.rank} className={`${index === 0 ? 'md:order-2 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' :
                index === 1 ? 'md:order-1 bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300' :
                  'md:order-3 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300'
              }`}>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {index === 0 && <Crown className="h-16 w-16 mx-auto text-yellow-500 mb-2" />}
                  {index === 1 && <Medal className="h-16 w-16 mx-auto text-gray-400 mb-2" />}
                  {index === 2 && <Medal className="h-16 w-16 mx-auto text-amber-600 mb-2" />}
                </div>
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 text-white text-2xl">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2">{user.username}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {user.score.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mb-4">points</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>{user.problemsSolved} problems solved</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>{user.contestsWon} contests won</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="global" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="global">
                  <Trophy className="h-4 w-4 mr-2" />
                  Global
                </TabsTrigger>
                <TabsTrigger value="weekly">
                  <Award className="h-4 w-4 mr-2" />
                  This Week
                </TabsTrigger>
                <TabsTrigger value="monthly">
                  <Medal className="h-4 w-4 mr-2" />
                  This Month
                </TabsTrigger>
              </TabsList>

              <TabsContent value="global">
                <LeaderboardTable users={globalLeaderboard} />
              </TabsContent>

              <TabsContent value="weekly">
                <LeaderboardTable users={weeklyLeaderboard} />
              </TabsContent>

              <TabsContent value="monthly">
                <LeaderboardTable users={monthlyLeaderboard} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{globalLeaderboard.length}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">
                {globalLeaderboard.reduce((sum, u) => sum + u.problemsSolved, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Problems Solved</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">
                {globalLeaderboard.reduce((sum, u) => sum + u.contestsWon, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Contests Won</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">
                {Math.max(...globalLeaderboard.map(u => u.streak))}
              </div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
