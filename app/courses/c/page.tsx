'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  Code, 
  FileText,
  Activity,
  Zap,
  Target,
  Award,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

export default function CCoursePage() {
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
      title: "Introduction to C Programming",
      description: "Learn the basics of C programming language from W3Schools and TutorialsPoint",
      duration: "2 hours",
      lessons: 8,
      completed: false,
      content: [
        "History and features of C",
        "Setting up development environment",
        "First C program - Hello World",
        "Data types and variables",
        "Constants and literals",
        "Input/Output functions",
        "Comments and documentation",
        "C program structure"
      ]
    },
    {
      id: 2,
      title: "Operators and Expressions",
      description: "Master C operators, expressions, and type casting",
      duration: "1.5 hours",
      lessons: 6,
      completed: false,
      content: [
        "Arithmetic operators",
        "Relational operators",
        "Logical operators",
        "Assignment operators",
        "Increment and decrement",
        "Type casting and conversion"
      ]
    },
    {
      id: 3,
      title: "Control Structures",
      description: "Learn decision making and loop control in C",
      duration: "3 hours",
      lessons: 10,
      completed: false,
      content: [
        "If-else statements",
        "Switch case statements",
        "For loops",
        "While loops",
        "Do-while loops",
        "Break and continue",
        "Nested loops",
        "Conditional operator",
        "Goto statement",
        "Loop optimization"
      ]
    },
    {
      id: 4,
      title: "Functions and Scope",
      description: "Understand functions, parameters, and variable scope",
      duration: "2.5 hours",
      lessons: 8,
      completed: false,
      content: [
        "Function declaration and definition",
        "Function parameters and arguments",
        "Return values",
        "Function prototypes",
        "Recursive functions",
        "Variable scope",
        "Storage classes",
        "Function pointers"
      ]
    },
    {
      id: 5,
      title: "Arrays and Strings",
      description: "Work with arrays, strings, and character manipulation",
      duration: "2 hours",
      lessons: 7,
      completed: false,
      content: [
        "One-dimensional arrays",
        "Multi-dimensional arrays",
        "Array initialization",
        "String handling",
        "String functions",
        "Character arrays",
        "Array manipulation"
      ]
    },
    {
      id: 6,
      title: "Pointers and Memory Management",
      description: "Master pointers, dynamic memory allocation",
      duration: "3 hours",
      lessons: 9,
      completed: false,
      content: [
        "Pointer basics",
        "Pointer arithmetic",
        "Pointers and arrays",
        "Pointers and functions",
        "Dynamic memory allocation",
        "malloc, calloc, realloc",
        "Memory leaks and debugging",
        "Function pointers",
        "Pointer to pointer"
      ]
    },
    {
      id: 7,
      title: "Structures and Unions",
      description: "Learn user-defined data types in C",
      duration: "2 hours",
      lessons: 6,
      completed: false,
      content: [
        "Structure definition",
        "Structure variables",
        "Structure members",
        "Nested structures",
        "Unions",
        "Typedef keyword"
      ]
    },
    {
      id: 8,
      title: "File Handling",
      description: "Read and write files in C programming",
      duration: "2 hours",
      lessons: 6,
      completed: false,
      content: [
        "File operations",
        "Opening and closing files",
        "Reading from files",
        "Writing to files",
        "File positioning",
        "Error handling"
      ]
    },
    {
      id: 9,
      title: "Advanced Topics",
      description: "Advanced C programming concepts",
      duration: "2.5 hours",
      lessons: 8,
      completed: false,
      content: [
        "Preprocessor directives",
        "Macros and conditional compilation",
        "Bitwise operations",
        "Command line arguments",
        "Error handling",
        "Standard library functions",
        "Memory management best practices",
        "Code optimization"
      ]
    },
    {
      id: 10,
      title: "Projects and Practice",
      description: "Build real-world C projects",
      duration: "4 hours",
      lessons: 5,
      completed: false,
      content: [
        "Calculator program",
        "Student management system",
        "File encryption/decryption",
        "Basic game development",
        "System programming basics"
      ]
    }
  ]

  const resources = [
    {
      title: "W3Schools C Tutorial",
      description: "Comprehensive C programming tutorial with examples",
      url: "https://www.w3schools.com/c/",
      type: "Tutorial"
    },
    {
      title: "TutorialsPoint C Programming",
      description: "Complete C programming guide with practical examples",
      url: "https://www.tutorialspoint.com/cprogramming/",
      type: "Guide"
    },
    {
      title: "C Reference Manual",
      description: "Official C language reference documentation",
      url: "https://devdocs.io/c/",
      type: "Reference"
    },
    {
      title: "Online C Compiler",
      description: "Practice C programming online with our compiler",
      url: "/compiler",
      type: "Tool"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">C Programming Course</h1>
              {isLive && (
                <Badge variant="secondary" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">Master C programming from basics to advanced concepts</p>
            {isLive && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {activeUsers} students learning
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Real-time progress tracking
                </div>
              </div>
            )}
          </div>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Play className="mr-2 h-5 w-5" />
            Start Learning
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Modules
                </CardTitle>
                <CardDescription>
                  10 comprehensive modules covering C programming from basics to advanced
                </CardDescription>
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
                              <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1" />
                                {module.duration}
                              </Badge>
                              <Badge variant="secondary">
                                <FileText className="h-3 w-3 mr-1" />
                                {module.lessons} lessons
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {module.description}
                            </CardDescription>
                          </div>
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
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
                            <div className="col-span-2 text-sm text-muted-foreground">
                              +{module.content.length - 4} more topics
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
                <CardDescription>
                  Curated resources from W3Schools, TutorialsPoint, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{resource.title}</CardTitle>
                            <CardDescription className="text-sm">
                              {resource.description}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Modules Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Lessons Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Course Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Duration</span>
                    <span className="font-medium">24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Lessons</span>
                    <span className="font-medium">73 lessons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Difficulty Level</span>
                    <Badge variant="secondary">Beginner to Advanced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Practice in Compiler
                  </Button>
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Notes
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Take Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
