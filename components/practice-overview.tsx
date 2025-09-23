"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Code, CheckCircle, Circle, Trophy, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

interface PracticeOverviewProps {
  problems: any[] // This would be properly typed based on your database schema
}

const categories = [
  "All",
  "Array",
  "Two Pointers",
  "Sliding Window",
  "Linked List",
  "Tree",
  "Graph",
  "Dynamic Programming",
]
const difficulties = ["All", "Easy", "Medium", "Hard"]

export function PracticeOverview({ problems }: PracticeOverviewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Mock user progress data
  const completedCount = 2 // This would come from user progress
  const totalCount = problems.length

  // Filter problems based on search and filters
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  // Group problems by company
  const problemsByCompany = problems.reduce(
    (acc, problem) => {
      problem.problem_companies?.forEach((pc: any) => {
        if (!acc[pc.company_name]) {
          acc[pc.company_name] = []
        }
        acc[pc.company_name].push(problem)
      })
      return acc
    },
    {} as Record<string, any[]>,
  )

  // Group problems by category
  const problemsByCategory = problems.reduce(
    (acc, problem) => {
      if (!acc[problem.category]) {
        acc[problem.category] = []
      }
      acc[problem.category].push(problem)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Practice Problems</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Solve coding problems from top tech companies and improve your algorithmic thinking
              </p>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{completedCount}</div>
                        <div className="text-sm text-muted-foreground">Solved</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Target className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{totalCount}</div>
                        <div className="text-sm text-muted-foreground">Total Problems</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{Math.round((completedCount / totalCount) * 100)}%</div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="problems">All Problems</TabsTrigger>
            <TabsTrigger value="companies">By Company</TabsTrigger>
            <TabsTrigger value="topics">By Topic</TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search problems..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff}>
                            {diff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problems List */}
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredProblems.map((problem, index) => {
                    const isCompleted = index < completedCount // Mock completion status
                    const companies = problem.problem_companies?.map((pc: any) => pc.company_name) || []

                    return (
                      <div
                        key={problem.id}
                        className={`flex items-center justify-between p-6 hover:bg-muted/50 transition-colors ${
                          index !== filteredProblems.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-lg">{problem.title}</h3>
                              <Badge
                                variant={
                                  problem.difficulty === "Easy"
                                    ? "secondary"
                                    : problem.difficulty === "Medium"
                                      ? "default"
                                      : "destructive"
                                }
                              >
                                {problem.difficulty}
                              </Badge>
                              <Badge variant="outline">{problem.category}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-2 line-clamp-2">{problem.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {problem.acceptance_rate && <span>Acceptance: {problem.acceptance_rate}%</span>}
                              {problem.time_complexity && <span>Time: {problem.time_complexity}</span>}
                              {problem.space_complexity && <span>Space: {problem.space_complexity}</span>}
                            </div>
                            <div className="flex gap-1 mt-2">
                              {companies.slice(0, 3).map((company: string) => (
                                <Badge key={company} variant="outline" className="text-xs">
                                  {company}
                                </Badge>
                              ))}
                              {companies.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{companies.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Link href={`/practice/${problem.slug}`}>
                          <Button>
                            <Code className="mr-2 h-4 w-4" />
                            Solve
                          </Button>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(problemsByCompany).map(([company, companyProblems]) => {
                const solved = companyProblems.slice(0, 1).length // Mock solved count

                return (
                  <Card key={company}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {company}
                        <Badge variant="secondary">
                          {solved}/{companyProblems.length}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{companyProblems.length} problems available</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {companyProblems.slice(0, 3).map((problem) => (
                          <div key={problem.id} className="flex items-center justify-between text-sm">
                            <span>{problem.title}</span>
                            <Badge
                              variant={
                                problem.difficulty === "Easy"
                                  ? "secondary"
                                  : problem.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                        ))}
                        {companyProblems.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{companyProblems.length - 3} more problems
                          </div>
                        )}
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        View All Problems
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(problemsByCategory).map(([category, categoryProblems]) => {
                const solved = categoryProblems.slice(0, 1).length // Mock solved count

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {category}
                        <Badge variant="secondary">
                          {solved}/{categoryProblems.length}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{categoryProblems.length} problems in this topic</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categoryProblems.slice(0, 3).map((problem) => (
                          <div key={problem.id} className="flex items-center justify-between text-sm">
                            <span>{problem.title}</span>
                            <Badge
                              variant={
                                problem.difficulty === "Easy"
                                  ? "secondary"
                                  : problem.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                        ))}
                        {categoryProblems.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{categoryProblems.length - 3} more problems
                          </div>
                        )}
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        Practice {category}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
