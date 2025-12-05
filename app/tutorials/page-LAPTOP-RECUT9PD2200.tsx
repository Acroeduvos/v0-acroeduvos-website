"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText, Code, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function TutorialsPage() {
    const tutorials = [
        {
            category: "Data Structures",
            icon: Code,
            color: "blue",
            items: [
                { title: "Arrays & Strings", difficulty: "Easy", duration: "30 min", topics: ["Two Pointers", "Sliding Window", "String Manipulation"] },
                { title: "Linked Lists", difficulty: "Easy", duration: "45 min", topics: ["Traversal", "Reversal", "Fast & Slow Pointers"] },
                { title: "Stacks & Queues", difficulty: "Medium", duration: "40 min", topics: ["Monotonic Stack", "Priority Queue", "Deque"] },
                { title: "Trees & Graphs", difficulty: "Medium", duration: "60 min", topics: ["DFS", "BFS", "Binary Search Trees"] },
                { title: "Hash Tables", difficulty: "Easy", duration: "35 min", topics: ["Hash Maps", "Hash Sets", "Collision Handling"] },
            ]
        },
        {
            category: "Algorithms",
            icon: BookOpen,
            color: "purple",
            items: [
                { title: "Sorting Algorithms", difficulty: "Easy", duration: "50 min", topics: ["Quick Sort", "Merge Sort", "Heap Sort"] },
                { title: "Searching Algorithms", difficulty: "Easy", duration: "30 min", topics: ["Binary Search", "Linear Search", "Ternary Search"] },
                { title: "Dynamic Programming", difficulty: "Hard", duration: "90 min", topics: ["Memoization", "Tabulation", "State Optimization"] },
                { title: "Greedy Algorithms", difficulty: "Medium", duration: "45 min", topics: ["Activity Selection", "Huffman Coding", "Fractional Knapsack"] },
                { title: "Backtracking", difficulty: "Hard", duration: "60 min", topics: ["N-Queens", "Sudoku Solver", "Permutations"] },
            ]
        },
        {
            category: "System Design",
            icon: Video,
            color: "green",
            items: [
                { title: "Scalability Basics", difficulty: "Medium", duration: "45 min", topics: ["Load Balancing", "Caching", "Database Sharding"] },
                { title: "Microservices Architecture", difficulty: "Hard", duration: "60 min", topics: ["Service Discovery", "API Gateway", "Message Queues"] },
                { title: "Database Design", difficulty: "Medium", duration: "50 min", topics: ["Normalization", "Indexing", "SQL vs NoSQL"] },
                { title: "Distributed Systems", difficulty: "Hard", duration: "75 min", topics: ["CAP Theorem", "Consistency", "Partition Tolerance"] },
            ]
        }
    ]

    const cheatSheets = [
        { title: "Big O Notation Cheat Sheet", language: "General", size: "2 pages" },
        { title: "Python Syntax Quick Reference", language: "Python", size: "4 pages" },
        { title: "JavaScript ES6+ Features", language: "JavaScript", size: "3 pages" },
        { title: "SQL Commands Reference", language: "SQL", size: "2 pages" },
        { title: "Git Commands Cheat Sheet", language: "Git", size: "2 pages" },
        { title: "Linux Terminal Commands", language: "Linux", size: "3 pages" },
    ]

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700 border-green-300'
            case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
            case 'Hard': return 'bg-red-100 text-red-700 border-red-300'
            default: return ''
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Tutorials & Guides</h1>
                    <p className="text-xl text-muted-foreground">
                        Comprehensive guides to master programming concepts and ace your interviews.
                    </p>
                </div>

                <Tabs defaultValue="written" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="written">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Written Guides
                        </TabsTrigger>
                        <TabsTrigger value="video">
                            <Video className="h-4 w-4 mr-2" />
                            Video Tutorials
                        </TabsTrigger>
                        <TabsTrigger value="cheatsheets">
                            <FileText className="h-4 w-4 mr-2" />
                            Cheat Sheets
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="written" className="space-y-8">
                        {tutorials.map((category, idx) => (
                            <Card key={idx}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                                        {category.category}
                                    </CardTitle>
                                    <CardDescription>
                                        In-depth articles with code examples and practice problems
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {category.items.map((item, itemIdx) => (
                                            <div key={itemIdx} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold mb-1">{item.title}</h3>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span>📚 {item.duration}</span>
                                                            <span>•</span>
                                                            <Badge className={`${getDifficultyColor(item.difficulty)} border text-xs`}>
                                                                {item.difficulty}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <Link href="/compiler">
                                                        <Button size="sm">
                                                            Start Learning
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {item.topics.map((topic, topicIdx) => (
                                                        <Badge key={topicIdx} variant="outline" className="text-xs">
                                                            {topic}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="video" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Video Lecture Series</CardTitle>
                                <CardDescription>
                                    Watch expert explanations of complex topics with visual demonstrations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tutorials.flatMap(cat => cat.items).slice(0, 6).map((item, idx) => (
                                        <Card key={idx} className="border-2">
                                            <CardContent className="p-4">
                                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-lg mb-3 flex items-center justify-center">
                                                    <Video className="h-12 w-12 text-muted-foreground" />
                                                </div>
                                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                                                    <Badge className={`${getDifficultyColor(item.difficulty)} border text-xs`}>
                                                        {item.difficulty}
                                                    </Badge>
                                                </div>
                                                <Button className="w-full mt-3" variant="outline">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Watch Tutorial
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="mt-6 bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">📺 Recommended YouTube Channels</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Abdul Bari - Algorithms</li>
                                        <li>• NeetCode - LeetCode Solutions</li>
                                        <li>• Tech Dummies - System Design</li>
                                        <li>• CS Dojo - Programming Fundamentals</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="cheatsheets" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Reference Guides</CardTitle>
                                <CardDescription>
                                    Downloadable cheat sheets for syntax, patterns, and best practices
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cheatSheets.map((sheet, idx) => (
                                        <div key={idx} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold mb-1">{sheet.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Badge variant="outline" className="text-xs">{sheet.language}</Badge>
                                                        <span>•</span>
                                                        <span>{sheet.size}</span>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    PDF
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                                        <CardContent className="p-4 text-center">
                                            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                            <h4 className="font-semibold mb-1">Time Complexity</h4>
                                            <p className="text-xs text-muted-foreground">Big O notation reference</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                                        <CardContent className="p-4 text-center">
                                            <Code className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                                            <h4 className="font-semibold mb-1">Design Patterns</h4>
                                            <p className="text-xs text-muted-foreground">Common coding patterns</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                                        <CardContent className="p-4 text-center">
                                            <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                            <h4 className="font-semibold mb-1">Best Practices</h4>
                                            <p className="text-xs text-muted-foreground">Code quality guidelines</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
