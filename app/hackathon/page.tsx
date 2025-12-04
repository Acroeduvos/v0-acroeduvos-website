"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Trophy, Users, Clock, Code, Play, CheckCircle, XCircle, Timer, Calendar,
    Loader2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Hackathon {
    id: string
    title: string
    description: string
    startTime: string
    endTime: string
    duration: number
    participants: number
    problems: number
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    status: 'upcoming' | 'live' | 'completed'
    registrations: number
}

interface Problem {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    points: number
    testCases: any[]
}

interface Submission {
    problemId: string
    code: string
    language: string
    status: 'Accepted' | 'Wrong Answer' | 'Error'
    score: number
    timestamp: Date
}

export default function HackathonPage() {
    const [view, setView] = useState<'list' | 'hackathon' | 'team-setup'>('list')
    const [hackathons, setHackathons] = useState<Hackathon[]>([])
    const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)
    const [problems, setProblems] = useState<Problem[]>([])
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('python')
    const [output, setOutput] = useState('')
    const [isExecuting, setIsExecuting] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [teamScore, setTeamScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()

    const [team, setTeam] = useState<any>(null)
    const [teamName, setTeamName] = useState('')
    const [leaderboard, setLeaderboard] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState('problems')

    useEffect(() => {
        fetchHackathons()
    }, [])

    useEffect(() => {
        if (selectedHackathon && team) {
            fetchLeaderboard()
            const interval = setInterval(fetchLeaderboard, 30000) // Refresh every 30s
            return () => clearInterval(interval)
        }
    }, [selectedHackathon, team])

    const fetchHackathons = async () => {
        try {
            const response = await fetch('/api/contests')
            const data = await response.json()
            if (data.success) {
                setHackathons(data.contests)
            }
        } catch (error) {
            console.error('Failed to fetch hackathons:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchProblems = async () => {
        try {
            const response = await fetch('/api/problems')
            const data = await response.json()
            if (data.success) {
                const hackathonProblems = data.problems.slice(0, 5).map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    difficulty: p.difficulty,
                    points: p.difficulty === 'Hard' ? 500 : p.difficulty === 'Medium' ? 300 : 100,
                    testCases: p.testCases
                }))
                setProblems(hackathonProblems)
            }
        } catch (error) {
            console.error('Failed to fetch problems:', error)
        }
    }

    const fetchLeaderboard = async () => {
        if (!selectedHackathon) return
        try {
            const response = await fetch(`/api/leaderboard?contestId=${selectedHackathon.id}`)
            const data = await response.json()
            if (data.success) {
                setLeaderboard(data.leaderboard)
                // Update own team score if found
                const myTeam = data.leaderboard.find((t: any) => t.teamId === team?.id)
                if (myTeam) {
                    setTeamScore(myTeam.score)
                }
            }
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error)
        }
    }

    const createTeam = async () => {
        if (!teamName.trim() || !selectedHackathon) return
        try {
            const response = await fetch('/api/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'create',
                    name: teamName,
                    contestId: selectedHackathon.id,
                    username: 'CurrentUser' // Mock user
                })
            })
            const data = await response.json()
            if (data.success) {
                setTeam(data.team)
                setView('hackathon')
                fetchProblems()
            } else {
                toast({ title: "Error", description: data.error, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to create team", variant: "destructive" })
        }
    }

    useEffect(() => {
        if (selectedHackathon && selectedHackathon.status === 'live') {
            const endTime = new Date(selectedHackathon.endTime).getTime()
            const timer = setInterval(() => {
                const remaining = Math.floor((endTime - Date.now()) / 1000)
                setTimeLeft(remaining > 0 ? remaining : 0)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [selectedHackathon])

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const executeCode = async () => {
        if (!code.trim() || !selectedProblem || !team) return

        setIsExecuting(true)
        setOutput('Executing code against test cases...')

        try {
            const testCase = selectedProblem.testCases[0]
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    language,
                    input: testCase.input
                })
            })

            const data = await response.json()

            if (data.success) {
                const actualOutput = data.output?.trim()
                const expectedOutput = testCase.expectedOutput?.trim()

                if (actualOutput === expectedOutput) {
                    setOutput(`Test Case 1 Passed!\nOutput: ${actualOutput}\n\nSubmitting full solution...`)

                    // Submit solution
                    const submitResponse = await fetch('/api/submissions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            problemId: selectedProblem.id,
                            code,
                            language,
                            status: 'Accepted',
                            teamId: team.id,
                            userId: 'CurrentUser'
                        })
                    })

                    if (submitResponse.ok) {
                        const newSubmission: Submission = {
                            problemId: selectedProblem.id,
                            code,
                            language,
                            status: 'Accepted',
                            score: selectedProblem.points,
                            timestamp: new Date()
                        }
                        setSubmissions([newSubmission, ...submissions])
                        fetchLeaderboard() // Refresh leaderboard

                        toast({
                            title: "Problem Solved!",
                            description: `You earned ${selectedProblem.points} points.`,
                        })
                    }
                } else {
                    setOutput(`Test Case 1 Failed.\nExpected: ${expectedOutput}\nActual: ${actualOutput}`)
                    toast({
                        title: "Wrong Answer",
                        description: "Your output didn't match the expected output.",
                        variant: "destructive"
                    })
                }
            } else {
                setOutput(`Error: ${data.error || 'Execution failed'}`)
            }
        } catch (error) {
            setOutput(`Error: ${error}`)
        } finally {
            setIsExecuting(false)
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': case 'Beginner': return 'bg-green-100 text-green-700 border-green-300'
            case 'Medium': case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
            case 'Hard': case 'Advanced': return 'bg-red-100 text-red-700 border-red-300'
            default: return ''
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    // Hackathon List View
    if (view === 'list') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                <Header />
                <div className="container mx-auto py-12 px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Hackathon Platform
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Compete in coding challenges, win prizes, and showcase your skills
                        </p>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="all">All Hackathons</TabsTrigger>
                            <TabsTrigger value="live">Live Now</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-6">
                            {hackathons.map((hackathon) => (
                                <Card key={hackathon.id} className="hover:shadow-xl transition-all">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-2xl">{hackathon.title}</CardTitle>
                                                    {hackathon.status === 'live' && <Badge className="bg-green-100 text-green-700 animate-pulse">🔴 LIVE</Badge>}
                                                    {hackathon.status === 'upcoming' && <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>}
                                                    {hackathon.status === 'completed' && <Badge className="bg-gray-100 text-gray-700">Completed</Badge>}
                                                </div>
                                                <CardDescription className="text-base">{hackathon.description}</CardDescription>
                                            </div>
                                            <Badge className={`${getDifficultyColor(hackathon.difficulty)} border ml-4`}>
                                                {hackathon.difficulty}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Start Date</div>
                                                    <div className="font-semibold text-sm">{new Date(hackathon.startTime).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Duration</div>
                                                    <div className="font-semibold text-sm">{hackathon.duration} mins</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Participants</div>
                                                    <div className="font-semibold text-sm">{hackathon.participants}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Trophy className="h-5 w-5 text-yellow-600" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Problems</div>
                                                    <div className="font-semibold text-sm">{hackathon.problems}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Button
                                                onClick={() => {
                                                    setSelectedHackathon(hackathon)
                                                    if (hackathon.status === 'live') {
                                                        setView('team-setup')
                                                    } else {
                                                        setView('hackathon') // View only
                                                    }
                                                }}
                                                disabled={hackathon.status === 'completed'}
                                                className="w-full"
                                            >
                                                {hackathon.status === 'live' ? 'Join Hackathon' : 'View Details'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        )
    }

    // Team Setup View
    if (view === 'team-setup' && selectedHackathon) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Join {selectedHackathon.title}</CardTitle>
                        <CardDescription>Create a team to start competing</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Team Name</label>
                            <Textarea
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Enter your team name..."
                                className="min-h-[40px]"
                            />
                        </div>
                        <Button onClick={createTeam} className="w-full">
                            Create Team & Start
                        </Button>
                        <Button variant="ghost" onClick={() => setView('list')} className="w-full">
                            Cancel
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Hackathon Coding View
    if (view === 'hackathon' && selectedHackathon) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
                    <div className="container mx-auto flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{selectedHackathon.title}</h2>
                            <p className="text-sm opacity-90">{selectedHackathon.status === 'live' ? 'Live Now' : 'View Only'}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {selectedHackathon.status === 'live' && (
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                                    <Timer className="h-5 w-5" />
                                    <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                                <Trophy className="h-5 w-5" />
                                <span className="font-bold">{teamScore} pts</span>
                            </div>
                            {team && (
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                                    <Users className="h-5 w-5" />
                                    <span className="font-bold">{team.name}</span>
                                </div>
                            )}
                            <Button variant="outline" size="sm" className="bg-white/20 border-white/30" onClick={() => setView('list')}>
                                Exit
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-6 px-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="problems">Problems</TabsTrigger>
                            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                        </TabsList>

                        <TabsContent value="problems" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Problems List */}
                            <Card className="lg:col-span-1 h-fit">
                                <CardHeader>
                                    <CardTitle>Problems</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {problems.map((problem) => (
                                        <Card
                                            key={problem.id}
                                            className={`cursor-pointer hover:shadow-md transition-all ${selectedProblem?.id === problem.id ? 'ring-2 ring-blue-500' : ''
                                                }`}
                                            onClick={() => setSelectedProblem(problem)}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold">{problem.title}</h4>
                                                    <Badge className={`${getDifficultyColor(problem.difficulty)} border text-xs`}>
                                                        {problem.difficulty}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{problem.description}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-blue-600 font-semibold">{problem.points} points</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {problems.length === 0 && (
                                        <div className="text-center text-muted-foreground py-4">
                                            No problems available for this hackathon.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Code Editor */}
                            <div className="lg:col-span-2 space-y-4">
                                {selectedProblem ? (
                                    <>
                                        <Card>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle>{selectedProblem.title}</CardTitle>
                                                    <div className="flex items-center gap-2">
                                                        <Select value={language} onValueChange={setLanguage}>
                                                            <SelectTrigger className="w-40">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="python">Python</SelectItem>
                                                                <SelectItem value="javascript">JavaScript</SelectItem>
                                                                <SelectItem value="cpp">C++</SelectItem>
                                                                <SelectItem value="java">Java</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <Button onClick={executeCode} disabled={isExecuting}>
                                                            {isExecuting ? 'Running...' : <><Play className="h-4 w-4 mr-2" />Run Code</>}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <Textarea
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    placeholder="Write your code here..."
                                                    className="font-mono min-h-[400px]"
                                                />
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-sm">Output</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-[150px] font-mono text-sm overflow-auto">
                                                    {output || 'Run your code to see output...'}
                                                </pre>
                                            </CardContent>
                                        </Card>

                                        {submissions.length > 0 && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-sm">Submissions</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2">
                                                        {submissions.map((sub, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                                                                <div className="flex items-center gap-2">
                                                                    {sub.status === 'Accepted' ? (
                                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                                    ) : (
                                                                        <XCircle className="h-4 w-4 text-red-600" />
                                                                    )}
                                                                    <span className="text-sm">{sub.language}</span>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-sm font-semibold">{sub.score} pts</span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {sub.timestamp.toLocaleTimeString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </>
                                ) : (
                                    <Card>
                                        <CardContent className="p-12 text-center">
                                            <Code className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                            <h3 className="text-xl font-semibold mb-2">Select a Problem</h3>
                                            <p className="text-muted-foreground">Choose a problem from the list to start coding</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="leaderboard">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Live Leaderboard</CardTitle>
                                    <CardDescription>Real-time rankings for {selectedHackathon.title}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {leaderboard.map((entry, index) => (
                                            <div key={entry.teamId} className={`flex items-center justify-between p-4 rounded-lg border ${entry.teamId === team?.id ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                        index === 1 ? 'bg-gray-100 text-gray-700' :
                                                            index === 2 ? 'bg-orange-100 text-orange-700' :
                                                                'bg-slate-100 text-slate-700'
                                                        }`}>
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{entry.teamName}</div>
                                                        <div className="text-sm text-muted-foreground">{entry.members.join(', ')}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <div className="text-sm text-muted-foreground">Solved</div>
                                                        <div className="font-medium">{entry.solved}</div>
                                                    </div>
                                                    <div className="text-right w-20">
                                                        <div className="text-sm text-muted-foreground">Score</div>
                                                        <div className="font-bold text-lg text-blue-600">{entry.score}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {leaderboard.length === 0 && (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No teams on the leaderboard yet. Be the first!
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        )
    }

    return null
}
