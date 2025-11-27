"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Timer, Trophy } from "lucide-react"

export default function QuizzesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Technical Quizzes</h1>
                    <p className="text-xl text-muted-foreground">
                        Test your knowledge with timed quizzes and challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-6 w-6 text-pink-600" />
                                Concept Drills
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Quick-fire questions on DSA, OS, DBMS, and CN.
                            </p>
                            <div className="text-sm font-medium text-pink-600">Coming Soon</div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Timer className="h-6 w-6 text-orange-600" />
                                Speed Tests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Race against the clock to solve debugging challenges.
                            </p>
                            <div className="text-sm font-medium text-orange-600">Coming Soon</div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                                Weekly Contest
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Participate in weekly quizzes and win badges.
                            </p>
                            <div className="text-sm font-medium text-yellow-600">Coming Soon</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
