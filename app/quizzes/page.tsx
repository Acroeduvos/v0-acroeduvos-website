"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Timer, Trophy, Play, CheckCircle, XCircle, Award } from "lucide-react"

interface Quiz {
    id: string
    title: string
    category: string
    questions: number
    duration: number
    difficulty: 'Easy' | 'Medium' | 'Hard'
    topics: string[]
}

interface QuizResult {
    quizId: string
    score: number
    totalQuestions: number
    timeTaken: number
}

export default function QuizzesPage() {
    const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

    const quizzes: Quiz[] = [
        {
            id: 'dsa-basics',
            title: 'Data Structures Fundamentals',
            category: 'DSA',
            questions: 20,
            duration: 15,
            difficulty: 'Easy',
            topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues']
        },
        {
            id: 'algorithms-speed',
            title: 'Algorithm Speed Test',
            category: 'Algorithms',
            questions: 15,
            duration: 10,
            difficulty: 'Medium',
            topics: ['Sorting', 'Searching', 'Recursion']
        },
        {
            id: 'os-concepts',
            title: 'Operating Systems Quiz',
            category: 'OS',
            questions: 25,
            duration: 20,
            difficulty: 'Medium',
            topics: ['Processes', 'Memory', 'Scheduling', 'Deadlocks']
        },
        {
            id: 'dbms-advanced',
            title: 'Database Management',
            category: 'DBMS',
            questions: 20,
            duration: 15,
            difficulty: 'Hard',
            topics: ['SQL', 'Normalization', 'Transactions', 'Indexing']
        },
        {
            id: 'networking',
            title: 'Computer Networks',
            category: 'CN',
            questions: 18,
            duration: 12,
            difficulty: 'Medium',
            topics: ['TCP/IP', 'HTTP', 'DNS', 'Routing']
        },
        {
            id: 'debugging-challenge',
            title: 'Code Debugging Challenge',
            category: 'Debugging',
            questions: 10,
            duration: 8,
            difficulty: 'Hard',
            topics: ['Bug Finding', 'Code Analysis', 'Logic Errors']
        }
    ]

    // Sample question for demo
    const sampleQuestions = [
        {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            correctAnswer: 1
        },
        {
            question: "Which data structure uses LIFO principle?",
            options: ["Queue", "Stack", "Array", "Tree"],
            correctAnswer: 1
        },
        {
            question: "What does SQL stand for?",
            options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
            correctAnswer: 0
        }
    ]

    useEffect(() => {
        if (quizStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleQuizComplete()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [quizStarted, timeLeft])

    const startQuiz = (quiz: Quiz) => {
        setActiveQuiz(quiz.id)
        setQuizStarted(true)
        setTimeLeft(quiz.duration * 60)
        setCurrentQuestion(0)
        setScore(0)
        setQuizCompleted(false)
        setSelectedAnswer(null)
    }

    const handleAnswer = (answerIndex: number) => {
        setSelectedAnswer(answerIndex)
        if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1)
        }

        setTimeout(() => {
            if (currentQuestion < sampleQuestions.length - 1) {
                setCurrentQuestion(prev => prev + 1)
                setSelectedAnswer(null)
            } else {
                handleQuizComplete()
            }
        }, 1000)
    }

    const handleQuizComplete = () => {
        setQuizCompleted(true)
        setQuizStarted(false)
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700 border-green-300'
            case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
            case 'Hard': return 'bg-red-100 text-red-700 border-red-300'
            default: return ''
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    if (quizStarted && activeQuiz) {
        const currentQ = sampleQuestions[currentQuestion]
        const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                <Header />
                <div className="container mx-auto py-12 px-4 max-w-4xl">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                                <CardTitle>Question {currentQuestion + 1} of {sampleQuestions.length}</CardTitle>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className="text-lg">
                                        <Timer className="h-4 w-4 mr-2" />
                                        {formatTime(timeLeft)}
                                    </Badge>
                                    <Badge variant="secondary">
                                        Score: {score}/{currentQuestion}
                                    </Badge>
                                </div>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <h2 className="text-2xl font-semibold">{currentQ.question}</h2>
                            <div className="space-y-3">
                                {currentQ.options.map((option, idx) => (
                                    <Button
                                        key={idx}
                                        variant={selectedAnswer === idx ? "default" : "outline"}
                                        className={`w-full justify-start text-left h-auto py-4 ${selectedAnswer !== null && idx === currentQ.correctAnswer
                                                ? 'bg-green-100 border-green-500 hover:bg-green-100'
                                                : selectedAnswer === idx && idx !== currentQ.correctAnswer
                                                    ? 'bg-red-100 border-red-500 hover:bg-red-100'
                                                    : ''
                                            }`}
                                        onClick={() => handleAnswer(idx)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        <span className="font-semibold mr-3">{String.fromCharCode(65 + idx)}.</span>
                                        {option}
                                        {selectedAnswer !== null && idx === currentQ.correctAnswer && (
                                            <CheckCircle className="h-5 w-5 ml-auto text-green-600" />
                                        )}
                                        {selectedAnswer === idx && idx !== currentQ.correctAnswer && (
                                            <XCircle className="h-5 w-5 ml-auto text-red-600" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (quizCompleted) {
        const percentage = (score / sampleQuestions.length) * 100

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                <Header />
                <div className="container mx-auto py-12 px-4 max-w-2xl">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Award className="h-20 w-20 text-yellow-500" />
                            </div>
                            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-6xl font-bold text-blue-600">
                                {percentage.toFixed(0)}%
                            </div>
                            <div className="text-xl text-muted-foreground">
                                You scored {score} out of {sampleQuestions.length}
                            </div>
                            <Progress value={percentage} className="h-4" />
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                    <div className="font-semibold">{score} Correct</div>
                                </div>
                                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                                    <div className="font-semibold">{sampleQuestions.length - score} Wrong</div>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <Button className="flex-1" onClick={() => {
                                    setQuizCompleted(false)
                                    setActiveQuiz(null)
                                }}>
                                    Back to Quizzes
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => {
                                    const quiz = quizzes.find(q => q.id === activeQuiz)
                                    if (quiz) startQuiz(quiz)
                                }}>
                                    Retry Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Technical Quizzes</h1>
                    <p className="text-xl text-muted-foreground">
                        Test your knowledge with timed quizzes and challenges. Track your progress!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <Card key={quiz.id} className="hover:shadow-lg transition-all">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <CardTitle className="flex items-center gap-2">
                                        {quiz.category === 'DSA' && <Brain className="h-6 w-6 text-pink-600" />}
                                        {quiz.category === 'Algorithms' && <Timer className="h-6 w-6 text-orange-600" />}
                                        {quiz.category === 'Debugging' && <Trophy className="h-6 w-6 text-yellow-600" />}
                                        {!['DSA', 'Algorithms', 'Debugging'].includes(quiz.category) && <Brain className="h-6 w-6 text-blue-600" />}
                                        {quiz.title}
                                    </CardTitle>
                                    <Badge className={`${getDifficultyColor(quiz.difficulty)} border`}>
                                        {quiz.difficulty}
                                    </Badge>
                                </div>
                                <CardDescription>{quiz.category}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Questions:</span>
                                        <span className="font-semibold">{quiz.questions}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Duration:</span>
                                        <span className="font-semibold">{quiz.duration} minutes</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {quiz.topics.map((topic, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {topic}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Button className="w-full" onClick={() => startQuiz(quiz)}>
                                        <Play className="h-4 w-4 mr-2" />
                                        Start Quiz
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Weekly Contest Section */}
                <div className="mt-12">
                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-2 border-yellow-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Trophy className="h-8 w-8 text-yellow-600" />
                                Weekly Contest
                            </CardTitle>
                            <CardDescription>
                                Participate in our weekly quiz contest and win badges!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                                    <div className="text-3xl font-bold text-blue-600">247</div>
                                    <div className="text-sm text-muted-foreground">Participants</div>
                                </div>
                                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                                    <div className="text-3xl font-bold text-green-600">30</div>
                                    <div className="text-sm text-muted-foreground">Questions</div>
                                </div>
                                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                                    <div className="text-3xl font-bold text-purple-600">25</div>
                                    <div className="text-sm text-muted-foreground">Minutes</div>
                                </div>
                            </div>
                            <Button className="w-full" size="lg">
                                <Trophy className="h-5 w-5 mr-2" />
                                Join This Week's Contest
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
