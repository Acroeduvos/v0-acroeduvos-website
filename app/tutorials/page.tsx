"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, FileText } from "lucide-react"

export default function TutorialsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Tutorials & Guides</h1>
                    <p className="text-xl text-muted-foreground">
                        Comprehensive guides to master programming concepts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-teal-600" />
                                Written Guides
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                In-depth articles on algorithms, system design, and more.
                            </p>
                            <div className="text-sm font-medium text-teal-600">Coming Soon</div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Video className="h-6 w-6 text-red-600" />
                                Video Lectures
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Watch expert explanations of complex topics.
                            </p>
                            <div className="text-sm font-medium text-red-600">Coming Soon</div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-6 w-6 text-blue-600" />
                                Cheat Sheets
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Quick reference guides for syntax and patterns.
                            </p>
                            <div className="text-sm font-medium text-blue-600">Coming Soon</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
