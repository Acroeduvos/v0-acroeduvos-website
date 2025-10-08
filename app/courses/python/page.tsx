'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Play, CheckCircle, Clock, Users, Star, Code, FileText, Activity, Zap, Target, Award, ArrowRight, ExternalLink } from 'lucide-react'

export default function PythonCoursePage() {
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
      title: "Python Basics and Syntax",
      description: "Learn Python fundamentals, syntax, and development environment",
      duration: "3 hours",
      lessons: 10,
      content: ["Python introduction and features", "Python installation and setup", "First Python program", "Variables and data types", "Operators and expressions", "Input/output operations", "Comments and documentation", "Indentation and code structure", "Python interpreter", "IDEs and editors"]
    },
    {
      id: 2,
      title: "Control Structures and Functions",
      description: "Master conditional statements, loops, and functions",
      duration: "3 hours",
      lessons: 9,
      content: ["If-else statements", "While loops", "For loops", "Break and continue", "Pass statement", "Function definition", "Function parameters", "Return values", "Lambda functions"]
    },
    {
      id: 3,
      title: "Data Structures",
      description: "Lists, tuples, dictionaries, and sets",
      duration: "3 hours",
      lessons: 10,
      content: ["Lists creation and manipulation", "List methods", "List comprehensions", "Tuples and immutability", "Dictionaries and key-value pairs", "Dictionary methods", "Sets and set operations", "Frozensets", "Nested data structures", "Memory management"]
    },
    {
      id: 4,
      title: "Object-Oriented Programming",
      description: "Classes, objects, and OOP concepts in Python",
      duration: "4 hours",
      lessons: 11,
      content: ["Classes and objects", "Constructors (__init__)", "Instance and class variables", "Methods and self", "Inheritance", "Method overriding", "Multiple inheritance", "Encapsulation", "Polymorphism", "Special methods", "Property decorators"]
    },
    {
      id: 5,
      title: "Exception Handling",
      description: "Error handling and debugging in Python",
      duration: "2 hours",
      lessons: 6,
      content: ["Try-except blocks", "Finally clause", "Raise exceptions", "Custom exceptions", "Exception hierarchy", "Best practices"]
    },
    {
      id: 6,
      title: "File I/O and Modules",
      description: "File operations and module system",
      duration: "2.5 hours",
      lessons: 8,
      content: ["File operations", "Reading and writing files", "File modes", "Context managers (with)", "Module creation", "Import statements", "Package creation", "Standard library modules"]
    },
    {
      id: 7,
      title: "Regular Expressions",
      description: "Pattern matching and text processing",
      duration: "2 hours",
      lessons: 7,
      content: ["Regex basics", "Pattern matching", "Search and replace", "Character classes", "Quantifiers", "Groups and capturing", "Flags and modifiers"]
    },
    {
      id: 8,
      title: "Advanced Python Features",
      description: "Decorators, generators, and advanced concepts",
      duration: "3 hours",
      lessons: 9,
      content: ["Decorators", "Function decorators", "Class decorators", "Generators and yield", "Generator expressions", "Iterators", "Context managers", "Metaclasses", "Descriptors"]
    },
    {
      id: 9,
      title: "Data Science and Libraries",
      description: "NumPy, Pandas, and data manipulation",
      duration: "4 hours",
      lessons: 10,
      content: ["NumPy arrays", "Array operations", "Pandas DataFrames", "Data manipulation", "Data visualization", "Matplotlib basics", "Statistical operations", "Data cleaning", "CSV and JSON handling", "Database connections"]
    },
    {
      id: 10,
      title: "Web Development with Flask",
      description: "Introduction to web development using Flask",
      duration: "4 hours",
      lessons: 9,
      content: ["Flask introduction", "Routing and views", "Templates and Jinja2", "Forms and validation", "Database integration", "REST APIs", "Authentication", "Deployment basics", "Testing"]
    }
  ]

  const resources = [
    { title: "W3Schools Python Tutorial", description: "Complete Python programming guide", url: "https://www.w3schools.com/python/", type: "Tutorial" },
    { title: "TutorialsPoint Python Programming", description: "Comprehensive Python reference", url: "https://www.tutorialspoint.com/python/", type: "Guide" },
    { title: "Python Official Documentation", description: "Official Python documentation", url: "https://docs.python.org/3/", type: "Reference" },
    { title: "Online Python Compiler", description: "Practice Python programming online", url: "/compiler", type: "Tool" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Python Programming Course</h1>
              {isLive && <Badge variant="secondary" className="animate-pulse"><Activity className="h-3 w-3 mr-1" />LIVE</Badge>}
            </div>
            <p className="text-muted-foreground mt-2">Master Python programming from basics to advanced data science and web development</p>
            {isLive && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1"><Users className="h-4 w-4" />{activeUsers} students learning</div>
                <div className="flex items-center gap-1"><Zap className="h-4 w-4" />Real-time progress tracking</div>
              </div>
            )}
          </div>
          <Button size="lg" className="bg-green-600 hover:bg-green-700"><Play className="mr-2 h-5 w-5" />Start Learning</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Course Modules</CardTitle>
                <CardDescription>10 comprehensive modules covering Python programming from basics to advanced</CardDescription>
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
                <CardDescription>Curated resources from W3Schools, TutorialsPoint, and Python.org</CardDescription>
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
                  <div className="flex items-center justify-between"><span className="text-sm">Total Duration</span><span className="font-medium">31 hours</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Total Lessons</span><span className="font-medium">89 lessons</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Difficulty Level</span><Badge variant="secondary">Beginner to Advanced</Badge></div>
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
