'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Play, CheckCircle, Clock, Users, Star, Code, FileText, Activity, Zap, Target, Award, ArrowRight, ExternalLink } from 'lucide-react'

export default function CppCoursePage() {
  const [progress, setProgress] = useState(0)
  const [isLive, setIsLive] = useState(false)
  const [activeUsers, setActiveUsers] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(true)
      setActiveUsers(Math.floor(Math.random() * 50) + 20)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const modules = [
    {
      id: 1,
      title: "C++ Basics and OOP Introduction",
      description: "Learn C++ fundamentals and object-oriented programming concepts",
      duration: "3 hours",
      lessons: 10,
      content: ["C++ syntax and features", "Variables and data types", "Input/output operations", "Classes and objects", "Constructors and destructors", "Member functions", "Access specifiers", "Encapsulation basics", "Memory management", "Standard library introduction"]
    },
    {
      id: 2,
      title: "Advanced OOP Concepts",
      description: "Master inheritance, polymorphism, and abstraction",
      duration: "4 hours",
      lessons: 12,
      content: ["Inheritance types", "Virtual functions", "Abstract classes", "Interfaces", "Function overloading", "Operator overloading", "Friend functions", "Static members", "Virtual destructors", "Multiple inheritance", "Diamond problem", "Pure virtual functions"]
    },
    {
      id: 3,
      title: "STL and Containers",
      description: "Standard Template Library and container classes",
      duration: "3 hours",
      lessons: 10,
      content: ["Vector container", "List and deque", "Set and multiset", "Map and multimap", "Stack and queue", "Priority queue", "Algorithms", "Iterators", "Function objects", "Lambda expressions"]
    },
    {
      id: 4,
      title: "Memory Management and Pointers",
      description: "Advanced memory management and smart pointers",
      duration: "2.5 hours",
      lessons: 8,
      content: ["Raw pointers", "Dynamic allocation", "Memory leaks", "Smart pointers", "Unique_ptr", "Shared_ptr", "Weak_ptr", "RAII principles"]
    },
    {
      id: 5,
      title: "Templates and Generic Programming",
      description: "Template programming and generic algorithms",
      duration: "3 hours",
      lessons: 9,
      content: ["Function templates", "Class templates", "Template specialization", "Variadic templates", "Template metaprogramming", "SFINAE", "Concepts (C++20)", "Auto keyword", "Type deduction"]
    },
    {
      id: 6,
      title: "Exception Handling",
      description: "Error handling and exception safety",
      duration: "2 hours",
      lessons: 6,
      content: ["Try-catch blocks", "Exception types", "Throwing exceptions", "Exception specifications", "RAII and exceptions", "Exception safety guarantees"]
    },
    {
      id: 7,
      title: "File I/O and Streams",
      description: "File operations and stream processing",
      duration: "2 hours",
      lessons: 7,
      content: ["File streams", "Text vs binary files", "Stream manipulators", "String streams", "File operations", "Error handling", "Stream states"]
    },
    {
      id: 8,
      title: "Advanced C++ Features",
      description: "Modern C++ features and best practices",
      duration: "3 hours",
      lessons: 10,
      content: ["Move semantics", "Perfect forwarding", "Lambda expressions", "Range-based loops", "Auto and decltype", "Constexpr", "Variadic templates", "Perfect forwarding", "Rvalue references", "Forwarding references"]
    },
    {
      id: 9,
      title: "Concurrency and Threading",
      description: "Multithreading and concurrent programming",
      duration: "3 hours",
      lessons: 8,
      content: ["Thread creation", "Thread synchronization", "Mutex and locks", "Condition variables", "Atomic operations", "Thread pools", "Async programming", "Future and promise"]
    },
    {
      id: 10,
      title: "Real-World Projects",
      description: "Build comprehensive C++ applications",
      duration: "5 hours",
      lessons: 6,
      content: ["Game development basics", "System programming", "Database connectivity", "Network programming", "GUI applications", "Performance optimization"]
    }
  ]

  const resources = [
    { title: "W3Schools C++ Tutorial", description: "Complete C++ programming guide", url: "https://www.w3schools.com/cpp/", type: "Tutorial" },
    { title: "TutorialsPoint C++ Programming", description: "Comprehensive C++ reference", url: "https://www.tutorialspoint.com/cplusplus/", type: "Guide" },
    { title: "C++ Reference", description: "Official C++ documentation", url: "https://devdocs.io/cpp/", type: "Reference" },
    { title: "Online C++ Compiler", description: "Practice C++ programming online", url: "/compiler", type: "Tool" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">C++ Programming Course</h1>
              {isLive && <Badge variant="secondary" className="animate-pulse"><Activity className="h-3 w-3 mr-1" />LIVE</Badge>}
            </div>
            <p className="text-muted-foreground mt-2">Master C++ programming from basics to advanced OOP concepts</p>
            {isLive && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1"><Users className="h-4 w-4" />{activeUsers} students learning</div>
                <div className="flex items-center gap-1"><Zap className="h-4 w-4" />Real-time progress tracking</div>
              </div>
            )}
          </div>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700"><Play className="mr-2 h-5 w-5" />Start Learning</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Course Modules</CardTitle>
                <CardDescription>10 comprehensive modules covering C++ programming from basics to advanced</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">Module {module.id}</Badge>
                              <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />{module.duration}</Badge>
                              <Badge variant="secondary"><FileText className="h-3 w-3 mr-1" />{module.lessons} lessons</Badge>
                            </div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription className="mt-1">{module.description}</CardDescription>
                          </div>
                          <Button variant="outline" size="sm"><Play className="h-4 w-4 mr-2" />Start</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.content.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                          {module.content.length > 4 && (
                            <div className="col-span-2 text-sm text-muted-foreground">+{module.content.length - 4} more topics</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ExternalLink className="h-5 w-5" />Learning Resources</CardTitle>
                <CardDescription>Curated resources from W3Schools, TutorialsPoint, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <CardDescription className="text-sm">{resource.description}</CardDescription>
                          </div>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(resource.url, '_blank')}>
                          <ExternalLink className="h-4 w-4 mr-2" />Visit Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span>Overall Progress</span><span>{progress}%</span></div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-2xl font-bold">0</div><div className="text-sm text-muted-foreground">Modules Completed</div></div>
                    <div><div className="text-2xl font-bold">0</div><div className="text-sm text-muted-foreground">Lessons Completed</div></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Course Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between"><span className="text-sm">Total Duration</span><span className="font-medium">31.5 hours</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Total Lessons</span><span className="font-medium">86 lessons</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Difficulty Level</span><Badge variant="secondary">Intermediate to Advanced</Badge></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Rating</span><div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="font-medium">4.9</span></div></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" />Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline"><Code className="h-4 w-4 mr-2" />Practice in Compiler</Button>
                  <Button className="w-full" variant="outline"><FileText className="h-4 w-4 mr-2" />Download Notes</Button>
                  <Button className="w-full" variant="outline"><Target className="h-4 w-4 mr-2" />Take Quiz</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
