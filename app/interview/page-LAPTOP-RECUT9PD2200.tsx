"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, CheckCircle, BookOpen, Download, Play } from "lucide-react"
import Link from "next/link"

export default function InterviewPage() {
    const [selectedTab, setSelectedTab] = useState("mock")

    const behavioralQuestions = [
        {
            category: "Leadership",
            questions: [
                "Tell me about a time when you led a team through a difficult project",
                "Describe a situation where you had to motivate team members",
                "How do you handle conflicts within your team?"
            ]
        },
        {
            category: "Problem Solving",
            questions: [
                "Describe a challenging technical problem you solved",
                "Tell me about a time you failed and what you learned",
                "How do you approach debugging a complex issue?"
            ]
        },
        {
            category: "Communication",
            questions: [
                "Describe a time you had to explain a technical concept to a non-technical person",
                "Tell me about a disagreement with a colleague and how you resolved it",
                "How do you handle feedback?"
            ]
        }
    ]

    const interviewChecklists = [
        {
            title: "Software Engineer Interview",
            items: [
                "Review data structures (Arrays, LinkedLists, Trees, Graphs)",
                "Practice algorithmic problems (Sorting, Searching, DP)",
                "Prepare system design basics",
                "Review your projects and be ready to discuss",
                "Prepare questions to ask the interviewer"
            ]
        },
        {
            title: "Frontend Developer Interview",
            items: [
                "JavaScript fundamentals (closures, promises, async/await)",
                "React/Vue/Angular concepts",
                "CSS layouts and responsive design",
                "Browser APIs and performance optimization",
                "Build a small project to showcase"
            ]
        },
        {
            title: "Backend Developer Interview",
            items: [
                "Database design and SQL queries",
                "RESTful API design principles",
                "Authentication and authorization",
                "Caching strategies",
                "Microservices architecture basics"
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Interview Preparation</h1>
                    <p className="text-xl text-muted-foreground">
                        Ace your next technical interview with our comprehensive prep resources.
                    </p>
                </div>

                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="mock">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Mock Interviews
                        </TabsTrigger>
                        <TabsTrigger value="behavioral">
                            <Users className="h-4 w-4 mr-2" />
                            Behavioral
                        </TabsTrigger>
                        <TabsTrigger value="checklists">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Checklists
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="mock" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Practice Mock Interviews</CardTitle>
                                <CardDescription>
                                    Simulate real interview conditions with our interactive platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="border-2">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                <Play className="h-5 w-5 text-blue-600" />
                                                Coding Interview Practice
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Practice solving problems in a timed environment with our compiler
                                            </p>
                                            <Link href="/practice">
                                                <Button className="w-full">Start Practice Session</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-2">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                <BookOpen className="h-5 w-5 text-purple-600" />
                                                System Design Practice
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Learn to design scalable systems with real-world examples
                                            </p>
                                            <Link href="/tutorials">
                                                <Button variant="outline" className="w-full">View Resources</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">Interview Tips</h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• Think out loud - explain your thought process</li>
                                        <li>• Ask clarifying questions before jumping into code</li>
                                        <li>• Start with a brute force solution, then optimize</li>
                                        <li>• Test your code with edge cases</li>
                                        <li>• Discuss time and space complexity</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="behavioral" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Behavioral Interview Questions</CardTitle>
                                <CardDescription>
                                    Use the STAR method (Situation, Task, Action, Result) to structure your answers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {behavioralQuestions.map((category, idx) => (
                                        <div key={idx} className="border rounded-lg p-4">
                                            <h3 className="font-semibold mb-3 text-lg">{category.category}</h3>
                                            <ul className="space-y-2">
                                                {category.questions.map((question, qIdx) => (
                                                    <li key={qIdx} className="flex items-start gap-2">
                                                        <span className="text-blue-600 font-bold mt-1">Q:</span>
                                                        <span className="text-sm">{question}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">STAR Method Framework</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <strong>Situation:</strong>
                                            <p className="text-muted-foreground">Set the context</p>
                                        </div>
                                        <div>
                                            <strong>Task:</strong>
                                            <p className="text-muted-foreground">Describe the challenge</p>
                                        </div>
                                        <div>
                                            <strong>Action:</strong>
                                            <p className="text-muted-foreground">Explain what you did</p>
                                        </div>
                                        <div>
                                            <strong>Result:</strong>
                                            <p className="text-muted-foreground">Share the outcome</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="checklists" className="space-y-6">
                        {interviewChecklists.map((checklist, idx) => (
                            <Card key={idx}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        {checklist.title}
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {checklist.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start gap-2">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">General Interview Preparation</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>✓ Research the company and role thoroughly</li>
                                    <li>✓ Prepare 3-5 questions to ask the interviewer</li>
                                    <li>✓ Review your resume and be ready to discuss each point</li>
                                    <li>✓ Practice coding on a whiteboard or paper</li>
                                    <li>✓ Get a good night's sleep before the interview</li>
                                    <li>✓ Test your equipment if it's a virtual interview</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
