"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  Code, 
  Database, 
  Globe,
  Shield,
  Smartphone,
  Brain,
  Server
} from "lucide-react"

export default function MNCQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const companies = [
    { id: "google", name: "Google", icon: <Globe className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" },
    { id: "microsoft", name: "Microsoft", icon: <Code className="h-4 w-4" />, color: "bg-green-100 text-green-800" },
    { id: "amazon", name: "Amazon", icon: <Database className="h-4 w-4" />, color: "bg-orange-100 text-orange-800" },
    { id: "meta", name: "Meta", icon: <Users className="h-4 w-4" />, color: "bg-purple-100 text-purple-800" },
    { id: "apple", name: "Apple", icon: <Smartphone className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" },
    { id: "netflix", name: "Netflix", icon: <Globe className="h-4 w-4" />, color: "bg-red-100 text-red-800" },
    { id: "uber", name: "Uber", icon: <Globe className="h-4 w-4" />, color: "bg-black text-white" },
    { id: "airbnb", name: "Airbnb", icon: <Globe className="h-4 w-4" />, color: "bg-pink-100 text-pink-800" },
  ]

  const questionCategories = [
    {
      id: "coding",
      title: "Coding Problems",
      description: "Algorithm and data structure problems",
      icon: <Code className="h-6 w-6" />,
      count: 150,
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Large-scale system architecture questions",
      icon: <Server className="h-6 w-6" />,
      count: 45,
      color: "bg-green-50 border-green-200"
    },
    {
      id: "behavioral",
      title: "Behavioral Questions",
      description: "Leadership and teamwork scenarios",
      icon: <Users className="h-6 w-6" />,
      count: 80,
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: "technical",
      title: "Technical Concepts",
      description: "Deep technical knowledge questions",
      icon: <Brain className="h-6 w-6" />,
      count: 120,
      color: "bg-orange-50 border-orange-200"
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Cybersecurity and data protection",
      icon: <Shield className="h-6 w-6" />,
      count: 35,
      color: "bg-red-50 border-red-200"
    }
  ]

  const sampleQuestions = [
    {
      id: 1,
      title: "Two Sum Problem",
      company: "google",
      difficulty: "easy",
      category: "coding",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      timeLimit: "30 min",
      attempts: 1250,
      successRate: 78
    },
    {
      id: 2,
      title: "Design a URL Shortener",
      company: "microsoft",
      difficulty: "medium",
      category: "system-design",
      description: "Design a system like bit.ly that can handle millions of URL shortening requests per day.",
      timeLimit: "45 min",
      attempts: 890,
      successRate: 65
    },
    {
      id: 3,
      title: "Tell me about a challenging project",
      company: "amazon",
      difficulty: "medium",
      category: "behavioral",
      description: "Describe a time when you had to work on a challenging project and how you overcame the obstacles.",
      timeLimit: "15 min",
      attempts: 2100,
      successRate: 82
    },
    {
      id: 4,
      title: "Binary Tree Traversal",
      company: "meta",
      difficulty: "medium",
      category: "coding",
      description: "Implement inorder, preorder, and postorder traversal of a binary tree.",
      timeLimit: "40 min",
      attempts: 1560,
      successRate: 71
    },
    {
      id: 5,
      title: "Design a Chat System",
      company: "apple",
      difficulty: "hard",
      category: "system-design",
      description: "Design a real-time chat system that can handle millions of concurrent users.",
      timeLimit: "60 min",
      attempts: 670,
      successRate: 58
    }
  ]

  const filteredQuestions = sampleQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCompany = selectedCompany === "all" || question.company === selectedCompany
    const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty
    return matchesSearch && matchesCompany && matchesDifficulty
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MNC Interview Questions</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Practice with real interview questions from top tech companies. Master coding problems, 
          system design challenges, and behavioral questions used by Google, Microsoft, Amazon, and more.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Companies</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Question Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questionCategories.map(category => (
                <div key={category.id} className={`p-4 rounded-lg border-2 ${category.color} cursor-pointer hover:shadow-md transition-shadow`}>
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium">{category.count} questions</span>
                        <Button size="sm" variant="outline">Practice</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Practice Questions</h2>
            <p className="text-gray-600">Found {filteredQuestions.length} questions</p>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map(question => {
              const company = companies.find(c => c.id === question.company)
              return (
                <Card key={question.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold">{question.title}</h3>
                          <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{question.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{question.timeLimit}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{question.attempts} attempts</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{question.successRate}% success rate</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {company && (
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${company.color}`}>
                            {company.icon}
                            <span>{company.name}</span>
                          </div>
                        )}
                        <Button>Start Practice</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

