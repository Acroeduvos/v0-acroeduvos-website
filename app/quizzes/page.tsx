"use client"

import { useState, useEffect } from "react"
"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProblemInterface } from "@/components/problem-interface"
import { codingProblems } from "@/lib/coding-problems"
import {
    Brain,
    Trophy,
    Timer,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    Flag,
    Eye,
    Play,
    Target,
    TrendingUp,
    Bookmark,
    BookmarkPlus,
    Code2,
    Maximize,
    Minimize
} from "lucide-react"

// Types
type QuestionType = 'mcq' | 'coding'

interface BaseQuestion {
    id: number
    type: QuestionType
    question: string
    topic: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
}

interface MCQQuestion extends BaseQuestion {
    type: 'mcq'
    options: string[]
    correctAnswer: number
    explanation: string
}

interface CodingQuestion extends BaseQuestion {
    type: 'coding'
    problemId: string // Reference to codingProblems
}

type Question = MCQQuestion | CodingQuestion

interface Quiz {
    id: number
    title: string
    description: string
    questions: number
    duration: number // in minutes
    difficulty: 'Easy' | 'Medium' | 'Hard'
    topics: string[]
    category: 'Mock Test' | 'Practice'
}

interface Answer {
    questionId: number
    selectedAnswer: number | null // For MCQ
    codeSubmission?: { // For Coding
        code: string
        passed: boolean
    }
    isBookmarked: boolean
    timeSpent: number
}

// Extended Question Bank
const questionBank: Question[] = [
    {
        id: 1,
        type: 'mcq',
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        explanation: "Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity.",
        topic: "Algorithms",
        difficulty: "Easy"
    },
    {
        id: 2,
        type: 'mcq',
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Array", "Tree"],
        correctAnswer: 1,
        explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
        topic: "Data Structures",
        difficulty: "Easy"
    },
    {
        id: 3,
        type: 'coding',
        question: "Solve the Two Sum problem",
        problemId: "two-sum",
        topic: "Arrays",
        difficulty: "Easy"
    },
    {
        id: 4,
        type: 'mcq',
        question: "What is the purpose of the 'virtual' keyword in C++?",
        options: [
            "To create virtual memory",
            "To enable runtime polymorphism",
            "To declare virtual variables",
            "To optimize performance"
        ],
        correctAnswer: 1,
        explanation: "The 'virtual' keyword enables runtime polymorphism by allowing derived classes to override base class methods.",
        topic: "OOP",
        difficulty: "Medium"
    },
    {
        id: 5,
        type: 'mcq',
        question: "In a B-tree of order m, what is the maximum number of children a node can have?",
        options: ["m", "m-1", "2m", "m+1"],
        correctAnswer: 0,
        explanation: "In a B-tree of order m, each node can have at most m children.",
        topic: "Data Structures",
        difficulty: "Hard"
    },
    {
        id: 6,
        type: 'coding',
        question: "Implement Reverse String",
        problemId: "reverse-string",
        topic: "Strings",
        difficulty: "Easy"
    },
    {
        id: 7,
        type: 'mcq',
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
        correctAnswer: 1,
        explanation: "Merge Sort has O(n log n) average-case time complexity, which is optimal for comparison-based sorting.",
        topic: "Algorithms",
        difficulty: "Medium"
    },
    {
        id: 8,
        type: 'mcq',
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "Standard Query Language",
            "System Query Language"
        ],
        correctAnswer: 0,
        explanation: "SQL stands for Structured Query Language, used for managing relational databases.",
        topic: "Database",
        difficulty: "Easy"
    },
    {
        id: 9,
        type: 'mcq',
        question: "Which of the following is NOT a principle of OOP?",
        options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"],
        correctAnswer: 2,
        explanation: "Compilation is not an OOP principle. The four main principles are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
        topic: "OOP",
        difficulty: "Easy"
    },
    {
        id: 10,
        type: 'coding',
        question: "Check for Palindrome Number",
        problemId: "palindrome-number",
        topic: "Math",
        difficulty: "Easy"
    }
]

const mockTests: Quiz[] = [
    {
        id: 1,
        title: "Full Stack Developer Assessment",
        description: "Comprehensive test covering DS, Algo, OOP, and System Design",
        questions: 10,
        duration: 45,
        difficulty: "Medium",
        topics: ["DSA", "OOP", "System Design", "Database"],
        category: "Mock Test"
    },
    {
        id: 2,
        title: "Frontend React Specialist",
        description: "Test your knowledge of React, JavaScript, and CSS",
        questions: 15,
        duration: 30,
        difficulty: "Hard",
        topics: ["React", "JavaScript", "CSS", "Web Vitals"],
        category: "Mock Test"
    },
    {
        id: 3,
        title: "Data Structures Basics",
        description: "Quick check on fundamental data structures",
        questions: 5,
        duration: 15,
        difficulty: "Easy",
        topics: ["Arrays", "LinkedList", "Stack", "Queue"],
        category: "Practice"
    }
]

export default function QuizzesPage() {
    const [view, setView] = useState<'home' | 'test' | 'result'>('home')
    const [selectedTest, setSelectedTest] = useState<Quiz | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Answer[]>([])
    const [timeLeft, setTimeLeft] = useState(0)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [showReview, setShowReview] = useState(false)
    const [testStartTime, setTestStartTime] = useState<Date | null>(null)

    // Timer Logic
    useEffect(() => {
        if (view === 'test' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleSubmitTest()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [view, timeLeft])

    const startTest = (test: Quiz) => {
        setSelectedTest(test)
        setView('test')
        setTimeLeft(test.duration * 60)
        setTestStartTime(new Date())
        setCurrentQuestion(0)
        // Initialize answers array
        const initialAnswers: Answer[] = questionBank.slice(0, test.questions).map((q) => ({
            questionId: q.id,
            selectedAnswer: null,
            isBookmarked: false,
            timeSpent: 0
        }))
        setAnswers(initialAnswers)
    }

    const handleAnswer = (answerIndex: number) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion].selectedAnswer = answerIndex
        setAnswers(newAnswers)
    }

    const toggleBookmark = () => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion].isBookmarked = !newAnswers[currentQuestion].isBookmarked
        setAnswers(newAnswers)
    }

    const navigateQuestion = (index: number) => {
        setCurrentQuestion(index)
    }

    const handleSubmitTest = () => {
        setView('result')
    }

    const calculateResults = () => {
        let correct = 0
        let incorrect = 0
        let unanswered = 0

        answers.forEach((answer, index) => {
            const question = questionBank[index]
            if (question.type === 'mcq') {
                if (answer.selectedAnswer === null) {
                    unanswered++
                } else if (answer.selectedAnswer === (question as MCQQuestion).correctAnswer) {
                    correct++
                } else {
                    incorrect++
                }
            } else if (question.type === 'coding') {
                // For coding, we assume it's correct if they passed (this logic can be enhanced)
                // In a real scenario, we'd check the submission status from the DB or state
                // For now, let's treat it as unanswered if no code, or we can't easily track "correctness" without submission result persistence here
                // Simplified: Coding questions are manually graded or assumed correct if submitted (placeholder logic)
                if (answer.codeSubmission?.passed) {
                    correct++
                } else {
                    // Treat as incorrect or unanswered depending on if they tried
                    unanswered++
                }
            }
        })

        const percentage = (correct / answers.length) * 100
        const timeTaken = selectedTest ? (selectedTest.duration * 60 - timeLeft) : 0

        return { correct, incorrect, unanswered, percentage, timeTaken }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700 border-green-300'
            case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
            case 'Hard': return 'bg-red-100 text-red-700 border-red-300'
            default: return ''
        }
    }

    // Home View
    if (view === 'home') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
                <Header />
                <div className="container mx-auto py-12 px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Mock Test Platform</h1>
                        <p className="text-xl text-muted-foreground">
                            Practice with realistic mock tests and track your progress
                        </p>
                    </div>

                    <Tabs defaultValue="mock" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="mock">
                                <Trophy className="h-4 w-4 mr-2" />
                                Mock Tests
                            </TabsTrigger>
                            <TabsTrigger value="practice">
                                <Brain className="h-4 w-4 mr-2" />
                                Quick Practice
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="mock" className="space-y-6">
                            {mockTests.filter(t => t.category === 'Mock Test').map((test) => (
                                <Card key={test.id} className="hover:shadow-lg transition-all">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-2xl mb-2">{test.title}</CardTitle>
                                                <CardDescription>Comprehensive mock test to evaluate your skills</CardDescription>
                                            </div>
                                            <Badge className={`${getDifficultyColor(test.difficulty)} border`}>
                                                {test.difficulty}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <Target className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <div className="font-semibold">{test.questions} Questions</div>
                                                    <div className="text-xs text-muted-foreground">Total problems</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <div className="font-semibold">{test.duration} Minutes</div>
                                                    <div className="text-xs text-muted-foreground">Time limit</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <div className="font-semibold">Detailed Analysis</div>
                                                    <div className="text-xs text-muted-foreground">Performance report</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {test.topics.map((topic) => (
                                                <Badge key={topic} variant="outline" className="text-xs">
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>

                                        <Button className="w-full" size="lg" onClick={() => startTest(test)}>
                                            <Play className="h-5 w-5 mr-2" />
                                            Start Mock Test
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="practice" className="space-y-6">
                            {mockTests.filter(t => t.category === 'Practice').map((test) => (
                                <Card key={test.id} className="hover:shadow-lg transition-all">
                                    <CardHeader>
                                        <CardTitle>{test.title}</CardTitle>
                                        <CardDescription>Quick practice session for skill improvement</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex gap-4 text-sm">
                                                <span>{test.questions} questions</span>
                                                <span>•</span>
                                                <span>{test.duration} minutes</span>
                                            </div>
                                            <Badge className={`${getDifficultyColor(test.difficulty)} border`}>
                                                {test.difficulty}
                                            </Badge>
                                        </div>
                                        <Button className="w-full" onClick={() => startTest(test)}>
                                            <Play className="h-4 w-4 mr-2" />
                                            Start Practice
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

    // Test View
    if (view === 'test' && selectedTest) {
        const currentQ = questionBank[currentQuestion]
        const answeredCount = answers.filter(a => a.selectedAnswer !== null || a.codeSubmission).length
        const bookmarkedCount = answers.filter(a => a.isBookmarked).length

        return (
            <div className={`min-h-screen bg-white dark:bg-gray-900 ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
                {/* Test Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
                    <div className="container mx-auto flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{selectedTest.title}</h2>
                            <p className="text-sm opacity-90">Question {currentQuestion + 1} of {selectedTest.questions}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                                <Timer className="h-5 w-5" />
                                <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/20 border-white/30 hover:bg-white/30"
                                onClick={() => setIsFullScreen(!isFullScreen)}
                            >
                                {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-6 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Question Area */}
                        <div className="lg:col-span-3 space-y-6">
                            <Card className={currentQ.type === 'coding' ? 'border-0 shadow-none' : ''}>
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge variant="outline">{currentQ.topic}</Badge>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={toggleBookmark}
                                            className={answers[currentQuestion]?.isBookmarked ? 'text-yellow-600' : ''}
                                        >
                                            {answers[currentQuestion]?.isBookmarked ? (
                                                <Bookmark className="h-5 w-5 fill-current" />
                                            ) : (
                                                <BookmarkPlus className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                    {currentQ.type === 'mcq' && (
                                        <CardTitle className="text-2xl">{currentQ.question}</CardTitle>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-3 p-0">
                                    {currentQ.type === 'mcq' ? (
                                        <div className="p-6 pt-0 space-y-3">
                                            {((currentQ as MCQQuestion).options).map((option, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant={answers[currentQuestion]?.selectedAnswer === idx ? "default" : "outline"}
                                                    className="w-full justify-start text-left h-auto py-4 px-6"
                                                    onClick={() => handleAnswer(idx)}
                                                >
                                                    <span className="font-semibold mr-3">{String.fromCharCode(65 + idx)}.</span>
                                                    <span className="flex-1">{option}</span>
                                                    {answers[currentQuestion]?.selectedAnswer === idx && (
                                                        <CheckCircle className="h-5 w-5 ml-2" />
                                                    )}
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="border rounded-lg overflow-hidden">
                                            <ProblemInterface
                                                problem={codingProblems.find(p => p.id === (currentQ as CodingQuestion).problemId) || codingProblems[0]}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Navigation */}
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => navigateQuestion(Math.max(0, currentQuestion - 1))}
                                    disabled={currentQuestion === 0}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>

                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setShowReview(!showReview)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Review
                                    </Button>
                                    <Button variant="destructive" onClick={handleSubmitTest}>
                                        <Flag className="h-4 w-4 mr-2" />
                                        Submit Test
                                    </Button>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => navigateQuestion(Math.min(selectedTest.questions - 1, currentQuestion + 1))}
                                    disabled={currentQuestion === selectedTest.questions - 1}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                        {/* Question Navigator */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Progress</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Answered</span>
                                            <span className="font-bold">{answeredCount}/{selectedTest.questions}</span>
                                        </div>
                                        <Progress value={(answeredCount / selectedTest.questions) * 100} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                                            <span>Answered</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-gray-300 rounded"></div>
                                            <span>Not Answered</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                            <span>Bookmarked ({bookmarkedCount})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                            <span>Coding</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Questions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-5 gap-2">
                                        {answers.map((answer, idx) => {
                                            const q = questionBank[idx];
                                            return (
                                                <Button
                                                    key={idx}
                                                    variant="outline"
                                                    size="sm"
                                                    className={`relative ${idx === currentQuestion ? 'ring-2 ring-blue-500' : ''
                                                        } ${answer.selectedAnswer !== null || answer.codeSubmission ? 'bg-green-100 hover:bg-green-200' : ''
                                                        } ${q.type === 'coding' ? 'border-blue-200' : ''}`}
                                                    onClick={() => navigateQuestion(idx)}
                                                >
                                                    {idx + 1}
                                                    {answer.isBookmarked && (
                                                        <Bookmark className="h-3 w-3 absolute top-0 right-0 fill-yellow-500 text-yellow-500" />
                                                    )}
                                                    {q.type === 'coding' && (
                                                        <Code2 className="h-3 w-3 absolute bottom-0 right-0 text-blue-500" />
                                                    )}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Result View
    if (view === 'result' && selectedTest) {
        const results = calculateResults()

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                <Header />
                <div className="container mx-auto py-12 px-4 max-w-4xl">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Award className="h-20 w-20 text-yellow-500" />
                            </div>
                            <CardTitle className="text-3xl">Test Completed!</CardTitle>
                            <CardDescription>Here's your detailed performance analysis</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Score */}
                            <div className="text-center">
                                <div className="text-6xl font-bold text-blue-600 mb-2">
                                    {results.percentage.toFixed(1)}%
                                </div>
                                <div className="text-xl text-muted-foreground">
                                    {results.correct} out of {answers.length} correct
                                </div>
                            </div>

                            <Progress value={results.percentage} className="h-4" />

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="bg-green-50 dark:bg-green-950">
                                    <CardContent className="p-4 text-center">
                                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                        <div className="text-2xl font-bold">{results.correct}</div>
                                        <div className="text-xs text-muted-foreground">Correct</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-red-50 dark:bg-red-950">
                                    <CardContent className="p-4 text-center">
                                        <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                                        <div className="text-2xl font-bold">{results.incorrect}</div>
                                        <div className="text-xs text-muted-foreground">Incorrect</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gray-50 dark:bg-gray-950">
                                    <CardContent className="p-4 text-center">
                                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                        <div className="text-2xl font-bold">{results.unanswered}</div>
                                        <div className="text-xs text-muted-foreground">Unanswered</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-blue-50 dark:bg-blue-950">
                                    <CardContent className="p-4 text-center">
                                        <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                        <div className="text-2xl font-bold">{formatTime(results.timeTaken)}</div>
                                        <div className="text-xs text-muted-foreground">Time Taken</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Detailed Review */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Question-wise Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                                    {answers.map((answer, idx) => {
                                        const question = questionBank[idx]
                                        const isMCQ = question.type === 'mcq'

                                        let isCorrect = false
                                        let wasAnswered = false

                                        if (isMCQ) {
                                            isCorrect = answer.selectedAnswer === (question as MCQQuestion).correctAnswer
                                            wasAnswered = answer.selectedAnswer !== null
                                        } else {
                                            // Coding question logic
                                            isCorrect = !!answer.codeSubmission?.passed
                                            wasAnswered = !!answer.codeSubmission
                                        }

                                        return (
                                            <div key={idx} className="p-4 border rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <div className="font-semibold mb-1">
                                                            Q{idx + 1}. {question.question}
                                                            {!isMCQ && <Badge variant="secondary" className="ml-2">Coding</Badge>}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">{question.topic}</div>
                                                    </div>
                                                    {wasAnswered ? (
                                                        isCorrect ? (
                                                            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                                        ) : (
                                                            <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                                                        )
                                                    ) : (
                                                        <AlertCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                                                    )}
                                                </div>

                                                {wasAnswered && isMCQ && (
                                                    <div className="mt-2 text-sm">
                                                        <div className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                                            Your answer: {(question as MCQQuestion).options[answer.selectedAnswer!]}
                                                        </div>
                                                        {!isCorrect && (
                                                            <div className="text-green-600">
                                                                Correct answer: {(question as MCQQuestion).options[(question as MCQQuestion).correctAnswer]}
                                                            </div>
                                                        )}
                                                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                                                            💡 {(question as MCQQuestion).explanation}
                                                        </div>
                                                    </div>
                                                )}

                                                {wasAnswered && !isMCQ && (
                                                    <div className="mt-2 text-sm">
                                                        <div className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                                            Result: {isCorrect ? 'Passed all test cases' : 'Failed test cases'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <Button className="flex-1" onClick={() => setView('home')}>
                                    Back to Tests
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => startTest(selectedTest)}>
                                    Retake Test
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return null
}

function Award({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
    )
}
