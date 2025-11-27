"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, CheckCircle } from "lucide-react"

export default function InterviewPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Interview Preparation</h1>
                    <p className="text-xl text-muted-foreground">
                        Ace your next technical interview with our prep kit.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-6 w-6 text-indigo-600" />
                                Mock Interviews
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Practice with peers or AI interviewers.
                            </p>
                            <div className="text-sm font-medium text-indigo-600">Coming Soon</div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-6 w-6 text-cyan-600" />
                                Behavioral
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Prepare for HR and behavioral questions (STAR method).
                            </p>
                            <div className="text-sm font-medium text-cyan-600">Coming Soon</div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-6 w-6 text-emerald-600" />
                                Checklists
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Last-minute revision checklists for different roles.
                            </p>
                            <div className="text-sm font-medium text-emerald-600">Coming Soon</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
