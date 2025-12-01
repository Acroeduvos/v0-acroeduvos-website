"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Trophy, Users, Clock, Code, Target, TrendingUp, Award,
    Play, CheckCircle, XCircle, Timer, Zap, Flag, Calendar,
    GitBranch, Star, Medal, Crown
} from "lucide-react"

interface Hackathon {
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    duration: number // in hours
    participants: number
    maxTeamSize: number
    prizes: string[]
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    status: 'upcoming' | 'live' | 'completed'
    problems: Problem[]
    tags: string[]
}

interface Problem {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    points: number
    testCases: number
    solved: number
}

interface Submission {
    problemId: string
    code: string
    language: string
    status: 'pending' | 'accepted' | 'wrong' | 'error'
    score: number
    timestamp: Date
}

interface Team {
    id: string
    name: string
    members: string[]
    score: number
    problemsSolved: number
    lastSubmission: Date
}

export default function HackathonPage() {
    const [view, setView] = useState<'list' | 'hackathon' | 'leaderboard'>('list')
    const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('python')
    const [output, setOutput] = useState('')
    const [isExecuting, setIsExecuting] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [teamScore, setTeamScore] = useState(0)

    const hackathons: Hackathon[] = [
        {
            id: 'winter-code-2024',
            title: 'Winter Code Challenge 2024',
            description: 'A 24-hour coding marathon featuring algorithmic challenges, system design, and real-world problem solving.',
            startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            duration: 24,
            participants: 1250,
            maxTeamSize: 4,
            prizes: ['₹50,000', '₹30,000', '₹20,000'],
            difficulty: 'Advanced',
            status: 'upcoming',
            tags: ['Algorithms', 'Data Structures', 'System Design'],
            problems: [
                { id: 'p1', title: 'Optimize Database Queries', description: 'Optimize slow SQL queries', difficulty: 'Hard', points: 500, testCases: 10, solved: 0 },
                { id: 'p2', title: 'Design URL Shortener', description: 'Design a scalable URL shortener', difficulty: 'Medium', points: 300, testCases: 8, solved: 0 },
                { id: 'p3', title: 'Implement LRU Cache', description: 'Build an LRU cache with O(1) operations', difficulty: 'Medium', points: 300, testCases: 12, solved: 0 }
            ]
        },
        {
            id: 'ai-ml-hackathon',
            title: 'AI/ML Innovation Hackathon',
            description: 'Build innovative AI/ML solutions for real-world problems. Focus on practical applications and model optimization.',
            startDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 22 * 60 * 60 * 1000),
            duration: 24,
            participants: 850,
            maxTeamSize: 3,
            prizes: ['₹1,00,000', '₹60,000', '₹40,000'],
            difficulty: 'Advanced',
            status: 'live',
            tags: ['Machine Learning', 'AI', 'Data Science'],
            problems: [
                { id: 'ml1', title: 'Image Classification Model', description: 'Build a CNN for image classification', difficulty: 'Hard', points: 600, testCases: 15, solved: 125 },
                { id: 'ml2', title: 'Sentiment Analysis', description: 'Analyze sentiment from text data', difficulty: 'Medium', points: 400, testCases: 10, solved: 234 },
                { id: 'ml3', title: 'Time Series Prediction', description: 'Predict stock prices using LSTM', difficulty: 'Hard', points: 500, testCases: 12, solved: 89 }
            ]
        },
        {
            id: 'web-dev-sprint',
            title: 'Full Stack Web Development Sprint',
            description: 'Build a complete web application with modern technologies. Showcase your full-stack development skills.',
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            duration: 48,
            participants: 2100,
            maxTeamSize: 5,
            prizes: ['₹75,000', '₹45,000', '₹30,000'],
            difficulty: 'Intermediate',
            status: 'upcoming',
            tags: ['React', 'Node.js', 'Database', 'API'],
            problems: [
                { id: 'web1', title: 'E-commerce Platform', description: 'Build a complete e-commerce site', difficulty: 'Hard', points: 800, testCases: 20, solved: 0 },
                { id: 'web2', title: 'Real-time Chat App', description: 'Create a WebSocket-based chat', difficulty: 'Medium', points: 500, testCases: 15, solved: 0 },
                { id: 'web3', title: 'API Gateway', description: 'Design and implement an API gateway', difficulty: 'Hard', points: 600, testCases: 18, solved: 0 }
            ]
        }
    ]

    const leaderboard: Team[] = [
        { id: 't1', name: 'Code Ninjas', members: ['Alice', 'Bob', 'Charlie'], score: 1500, problemsSolved: 5, lastSubmission: new Date() },
        { id: 't2', name: 'Algo Masters', members: ['David', 'Emma'], score: 1350, problemsSolved: 4, lastSubmission: new Date() },
        { id: 't3', name: 'Debug Squad', members: ['Frank', 'Grace', 'Henry'], score: 1200, problemsSolved: 4, lastSubmission: new Date() },
        { id: 't4', name: 'Binary Beasts', members: ['Ivy', 'Jack'], score: 1100, problemsSolved: 3, lastSubmission: new Date() },
        { id: 't5', name: 'Stack Overflow', members: ['Kate', 'Leo', 'Mike', 'Nina'], score: 950, problemsSolved: 3, lastSubmission: new Date() }
    ]

    useEffect(() => {
        if (selectedHackathon && selectedHackathon.status === 'live') {
            const endTime = selectedHackathon.endDate.getTime()
            const now = Date.now()
            setTimeLeft(Math.floor((endTime - now) / 1000))

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

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    const executeCode = async () => {
        if (!code.trim()) return

        setIsExecuting(true)
        setOutput('Executing code...')

        try {
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language, input: '' })
            })

            const data = await response.json()

            if (data.success) {
                setOutput(data.output || 'Code executed successfully!')

                // Simulate submission scoring
                const isCorrect = Math.random() > 0.3 // 70% success rate for demo
                const newSubmission: Submission = {
                    problemId: selectedProblem?.id || '',
                    code,
                    language,
                    status: isCorrect ? 'accepted' : 'wrong',
                    score: isCorrect ? (selectedProblem?.points || 0) : 0,
                    timestamp: new Date()
                }

                setSubmissions([...submissions, newSubmission])
                if (isCorrect) {
                    setTeamScore(teamScore + (selectedProblem?.points || 0))
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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming': return <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
            case 'live': return <Badge className="bg-green-100 text-green-700 animate-pulse">🔴 LIVE</Badge>
            case 'completed': return <Badge className="bg-gray-100 text-gray-700">Completed</Badge>
            default: return null
        }
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
                                                    {getStatusBadge(hackathon.status)}
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
                                                    <div className="font-semibold text-sm">{formatDate(hackathon.startDate)}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Duration</div>
                                                    <div className="font-semibold text-sm">{hackathon.duration} hours</div>
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
                                                    <div className="text-xs text-muted-foreground">Prize Pool</div>
                                                    <div className="font-semibold text-sm">{hackathon.prizes[0]}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {hackathon.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-muted-foreground">
                                                {hackathon.problems.length} problems • Team size: {hackathon.maxTeamSize}
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    setSelectedHackathon(hackathon)
                                                    setView('hackathon')
                                                }}
                                                disabled={hackathon.status === 'completed'}
                                            >
                                                {hackathon.status === 'live' ? 'Join Now' : 'View Details'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="live">
                            {hackathons.filter(h => h.status === 'live').map((hackathon) => (
                                <Card key={hackathon.id} className="border-green-500 border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-2xl">{hackathon.title}</CardTitle>
                                            <Badge className="bg-green-100 text-green-700 animate-pulse">🔴 LIVE NOW</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="lg" className="w-full" onClick={() => {
                                            setSelectedHackathon(hackathon)
                                            setView('hackathon')
                                        }}>
                                            <Play className="h-5 w-5 mr-2" />
                                            Join Hackathon
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="upcoming">
                            {hackathons.filter(h => h.status === 'upcoming').map((hackathon) => (
                                <Card key={hackathon.id}>
                                    <CardHeader>
                                        <CardTitle>{hackathon.title}</CardTitle>
                                        <CardDescription>Starts {formatDate(hackathon.startDate)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" onClick={() => {
                                            setSelectedHackathon(hackathon)
                                            setView('hackathon')
                                        }}>
                                            View Details & Register
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
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
                            <Button variant="outline" size="sm" className="bg-white/20 border-white/30" onClick={() => setView('list')}>
                                Exit
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-6 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Problems List */}
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Problems</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {selectedHackathon.problems.map((problem) => (
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
                                            <p className="text-sm text-muted-foreground mb-2">{problem.description}</p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-blue-600 font-semibold">{problem.points} points</span>
                                                <span className="text-muted-foreground">{problem.solved} solved</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
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
                                                    {submissions.slice(-5).reverse().map((sub, idx) => (
                                                        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                                                            <div className="flex items-center gap-2">
                                                                {sub.status === 'accepted' ? (
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
                    </div>
                </div>
            </div>
        )
    }

    return null
}
