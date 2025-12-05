"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy, Calendar, Clock, Users, Target,
  Activity, Award, TrendingUp, Play, CheckCircle
} from "lucide-react"
import Link from "next/link"

interface Contest {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  duration: number // in minutes
  participants: number
  problems: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  prize?: string
  status: 'upcoming' | 'live' | 'completed'
  registrations: number
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([])
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchContests()
    setIsLive(true)
    setLastUpdated(new Date())

    const interval = setInterval(() => {
      fetchContests()
      setLastUpdated(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchContests = async () => {
    try {
      const response = await fetch('/api/contests')
      const data = await response.json()

      if (data.success) {
        setContests(data.contests.map((c: any) => ({
          ...c,
          startTime: new Date(c.startTime),
          endTime: new Date(c.endTime)
        })))
      } else {
        // Fallback to generated contests if API fails
        generateContests()
      }
    } catch (error) {
      console.error('Failed to fetch contests:', error)
      generateContests()
    }
  }

  const generateContests = () => {
    const now = new Date()
    const contestTemplates = [
      { title: 'Weekly Challenge', desc: 'Test your skills with curated problems', duration: 120, problems: 4 },
      { title: 'Speed Coding Sprint', desc: 'Fast-paced problem solving', duration: 60, problems: 3 },
      { title: 'Algorithm Marathon', desc: 'Advanced algorithmic challenges', duration: 180, problems: 5 },
      { title: 'Data Structures Deep Dive', desc: 'Master complex data structures', duration: 150, problems: 4 },
      { title: 'Dynamic Programming Challenge', desc: 'Solve DP problems efficiently', duration: 120, problems: 4 },
      { title: 'Graph Theory Contest', desc: 'Navigate through graph problems', duration: 90, problems: 3 }
    ]

    const difficulties: Array<'Beginner' | 'Intermediate' | 'Advanced'> = ['Beginner', 'Intermediate', 'Advanced']

    const newContests: Contest[] = []

    // Generate upcoming contests
    for (let i = 0; i < 6; i++) {
      const template = contestTemplates[i % contestTemplates.length]
      const startTime = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000)
      const endTime = new Date(startTime.getTime() + template.duration * 60 * 1000)

      newContests.push({
        id: `upcoming-${i}`,
        title: `${template.title} #${Math.floor(Math.random() * 100) + 1}`,
        description: template.desc,
        startTime,
        endTime,
        duration: template.duration,
        participants: 0,
        problems: template.problems,
        difficulty: difficulties[i % 3],
        status: 'upcoming',
        registrations: Math.floor(Math.random() * 500) + 100
      })
    }

    // Generate live contests
    for (let i = 0; i < 2; i++) {
      const template = contestTemplates[i]
      const startTime = new Date(now.getTime() - 30 * 60 * 1000)
      const endTime = new Date(now.getTime() + template.duration * 60 * 1000)

      newContests.push({
        id: `live-${i}`,
        title: `${template.title} #${Math.floor(Math.random() * 100) + 1}`,
        description: template.desc,
        startTime,
        endTime,
        duration: template.duration,
        participants: Math.floor(Math.random() * 300) + 50,
        problems: template.problems,
        difficulty: difficulties[i % 3],
        status: 'live',
        registrations: Math.floor(Math.random() * 500) + 200
      })
    }

    // Generate completed contests
    for (let i = 0; i < 8; i++) {
      const template = contestTemplates[i % contestTemplates.length]
      const endTime = new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000)
      const startTime = new Date(endTime.getTime() - template.duration * 60 * 1000)

      newContests.push({
        id: `completed-${i}`,
        title: `${template.title} #${Math.floor(Math.random() * 100) + 1}`,
        description: template.desc,
        startTime,
        endTime,
        duration: template.duration,
        participants: Math.floor(Math.random() * 400) + 100,
        problems: template.problems,
        difficulty: difficulties[i % 3],
        status: 'completed',
        registrations: Math.floor(Math.random() * 600) + 200
      })
    }

    setContests(newContests)
  }

  const getTimeUntil = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()

    if (diff < 0) return 'Started'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const getTimeRemaining = (endDate: Date) => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()

    if (diff < 0) return 'Ended'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m remaining`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-300'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-300'
      default: return ''
    }
  }

  const ContestCard = ({ contest }: { contest: Contest }) => (
    <Card className={`${contest.status === 'live' ? 'border-green-500 border-2' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{contest.title}</CardTitle>
              {contest.status === 'live' && (
                <Badge className="bg-green-500 animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
              {contest.status === 'upcoming' && (
                <Badge variant="secondary">Upcoming</Badge>
              )}
              {contest.status === 'completed' && (
                <Badge variant="outline">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <CardDescription>{contest.description}</CardDescription>
          </div>
          <Badge className={`${getDifficultyColor(contest.difficulty)} border`}>
            {contest.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">
                  {contest.startTime.toLocaleDateString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {contest.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{contest.duration} min</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{contest.problems} problems</div>
                <div className="text-xs text-muted-foreground">To solve</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">
                  {contest.status === 'live' ? contest.participants : contest.registrations}
                </div>
                <div className="text-xs text-muted-foreground">
                  {contest.status === 'live' ? 'Participating' :
                    contest.status === 'upcoming' ? 'Registered' : 'Participated'}
                </div>
              </div>
            </div>
          </div>

          {contest.status === 'upcoming' && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm">
                <span className="text-muted-foreground">Starts in: </span>
                <span className="font-semibold">{getTimeUntil(contest.startTime)}</span>
              </div>
              <Button>
                <Trophy className="h-4 w-4 mr-2" />
                Register
              </Button>
            </div>
          )}

          {contest.status === 'live' && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm">
                <span className="text-muted-foreground">{getTimeRemaining(contest.endTime)}</span>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-2" />
                Join Now
              </Button>
            </div>
          )}

          {contest.status === 'completed' && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Ended {contest.endTime.toLocaleDateString()}
              </div>
              <Button variant="outline">
                <Award className="h-4 w-4 mr-2" />
                View Results
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const liveContests = contests.filter(c => c.status === 'live')
  const upcomingContests = contests.filter(c => c.status === 'upcoming')
  const completedContests = contests.filter(c => c.status === 'completed')

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
                <span className="font-medium">CONTESTS LIVE</span>
              </div>
              <span>{liveContests.length} active contests</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {liveContests.reduce((sum, c) => sum + c.participants, 0)} competing now
              </span>
              <span>Updated: {mounted && lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--:--'}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <h1 className="text-4xl font-bold">Contests</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Compete in real-time coding contests. Test your skills and climb the leaderboard!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{liveContests.length}</div>
              <div className="text-sm text-muted-foreground">Live Now</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{upcomingContests.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">
                {contests.reduce((sum, c) => sum + (c.status === 'live' ? c.participants : c.registrations), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Participants</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{completedContests.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Contests Tabs */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="live">
              <Activity className="h-4 w-4 mr-2" />
              Live ({liveContests.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming ({upcomingContests.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed ({completedContests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {liveContests.length > 0 ? (
              liveContests.map(contest => (
                <ContestCard key={contest.id} contest={contest} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No live contests at the moment</p>
                  <p className="text-sm text-muted-foreground mt-2">Check upcoming contests!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingContests.map(contest => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedContests.map(contest => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
