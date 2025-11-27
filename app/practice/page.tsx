"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, Filter, TrendingUp, CheckCircle, Clock, 
  Users, Activity, Code, Target, Zap
} from "lucide-react"
import Link from "next/link"

interface Problem {
  id: string
  title: string
  slug: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  tags: string[]
  companies: string[]
  acceptanceRate: number
  isLive?: boolean
  liveSubmissions?: number
  realTimeStats?: {
    activeUsers: number
    submissionsPerMinute: number
    successRate: number
  }
}

export default function PracticePage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedCompany, setSelectedCompany] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [realTimeStats, setRealTimeStats] = useState({
    totalProblems: 0,
    activeUsers: 0,
    totalSubmissions: 0,
    averageSuccessRate: 0
  })

  // Fetch problems from API
  useEffect(() => {
    fetchProblems()
    const interval = setInterval(fetchProblems, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems')
      const data = await response.json()
      
      if (data.success) {
        setProblems(data.problems)
        setFilteredProblems(data.problems)
        setRealTimeStats(data.realTimeStats)
      }
    } catch (error) {
      console.error('Failed to fetch problems:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter problems
  useEffect(() => {
    let filtered = problems

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(p => p.difficulty === selectedDifficulty)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (selectedCompany !== "all") {
      filtered = filtered.filter(p => p.companies.includes(selectedCompany))
    }

    setFilteredProblems(filtered)
  }, [searchQuery, selectedDifficulty, selectedCategory, selectedCompany, problems])

  const categories = Array.from(new Set(problems.map(p => p.category)))
  const companies = Array.from(new Set(problems.flatMap(p => p.companies)))

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      {/* Real-time Stats Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 animate-pulse" />
                <span className="font-medium">LIVE</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>{realTimeStats.totalProblems} problems</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{realTimeStats.activeUsers} users solving</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>{realTimeStats.totalSubmissions} submissions today</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>{realTimeStats.averageSuccessRate.toFixed(1)}% avg success rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-muted-foreground text-lg">
            Solve coding problems from top tech companies. All problems are free and available 24/7.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Problems</p>
                  <p className="text-2xl font-bold">{realTimeStats.totalProblems}</p>
                </div>
                <Code className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Easy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {problems.filter(p => p.difficulty === 'Easy').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Medium</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {problems.filter(p => p.difficulty === 'Medium').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hard</p>
                  <p className="text-2xl font-bold text-red-600">
                    {problems.filter(p => p.difficulty === 'Hard').length}
                  </p>
                </div>
                <Target className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map(comp => (
                    <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Problems ({filteredProblems.length})</span>
              {isLoading && <span className="text-sm font-normal text-muted-foreground">Loading...</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredProblems.map((problem) => (
                <Link key={problem.id} href={`/problems/${problem.slug}`}>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{problem.title}</h3>
                          <Badge className={`${getDifficultyColor(problem.difficulty)} border`}>
                            {problem.difficulty}
                          </Badge>
                          {problem.isLive && (
                            <Badge variant="secondary" className="animate-pulse">
                              <Activity className="h-3 w-3 mr-1" />
                              LIVE
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Code className="h-3 w-3" />
                            {problem.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {problem.acceptanceRate}% acceptance
                          </span>
                          {problem.realTimeStats && (
                            <>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {problem.realTimeStats.activeUsers} solving now
                              </span>
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {problem.liveSubmissions} submissions
                              </span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {problem.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {problem.companies.slice(0, 3).map(company => (
                            <Badge key={company} variant="secondary" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button variant="outline">
                        Solve
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
              
              {filteredProblems.length === 0 && !isLoading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No problems found matching your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedDifficulty("all")
                      setSelectedCategory("all")
                      setSelectedCompany("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
