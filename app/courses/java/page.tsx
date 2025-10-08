'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Play, CheckCircle, Clock, Users, Star, Code, FileText, Activity, Zap, Target, Award, ArrowRight, ExternalLink } from 'lucide-react'

export default function JavaCoursePage() {
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
      title: "Java Fundamentals",
      description: "Learn Java basics, syntax, and development environment setup",
      duration: "3 hours",
      lessons: 10,
      content: ["Java introduction and history", "JDK installation and setup", "First Java program", "Variables and data types", "Operators and expressions", "Control structures", "Methods and functions", "Arrays and strings", "Input/output operations", "Comments and documentation"]
    },
    {
      id: 2,
      title: "Object-Oriented Programming",
      description: "Master OOP concepts in Java",
      duration: "4 hours",
      lessons: 12,
      content: ["Classes and objects", "Constructors", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction", "Method overloading", "Method overriding", "Super keyword", "This keyword", "Static members", "Final keyword"]
    },
    {
      id: 3,
      title: "Advanced OOP Concepts",
      description: "Advanced object-oriented programming features",
      duration: "3 hours",
      lessons: 9,
      content: ["Abstract classes", "Interfaces", "Multiple inheritance", "Nested classes", "Inner classes", "Anonymous classes", "Lambda expressions", "Method references", "Default methods"]
    },
    {
      id: 4,
      title: "Exception Handling",
      description: "Error handling and exception management",
      duration: "2 hours",
      lessons: 6,
      content: ["Try-catch blocks", "Finally block", "Throws keyword", "Custom exceptions", "Checked vs unchecked exceptions", "Best practices"]
    },
    {
      id: 5,
      title: "Collections Framework",
      description: "Java Collections API and data structures",
      duration: "3 hours",
      lessons: 10,
      content: ["List interface", "ArrayList and LinkedList", "Set interface", "HashSet and TreeSet", "Map interface", "HashMap and TreeMap", "Queue and Deque", "Iterators", "Comparable and Comparator", "Collections utilities"]
    },
    {
      id: 6,
      title: "File I/O and Streams",
      description: "File operations and stream processing",
      duration: "2.5 hours",
      lessons: 8,
      content: ["File class", "FileReader and FileWriter", "BufferedReader and BufferedWriter", "Byte streams", "Character streams", "Object serialization", "NIO package", "Path and Files"]
    },
    {
      id: 7,
      title: "Multithreading",
      description: "Concurrent programming in Java",
      duration: "3 hours",
      lessons: 9,
      content: ["Thread creation", "Thread lifecycle", "Synchronization", "Wait and notify", "Thread pools", "Executor framework", "Concurrent collections", "Atomic variables", "Fork/Join framework"]
    },
    {
      id: 8,
      title: "Java 8+ Features",
      description: "Modern Java features and functional programming",
      duration: "3 hours",
      lessons: 8,
      content: ["Lambda expressions", "Stream API", "Optional class", "Method references", "Default methods", "Date and Time API", "CompletableFuture", "Modules system"]
    },
    {
      id: 9,
      title: "Database Connectivity",
      description: "JDBC and database operations",
      duration: "2.5 hours",
      lessons: 7,
      content: ["JDBC introduction", "Database connection", "SQL statements", "PreparedStatement", "ResultSet handling", "Connection pooling", "Transaction management"]
    },
    {
      id: 10,
      title: "Spring Framework Basics",
      description: "Introduction to Spring framework",
      duration: "4 hours",
      lessons: 10,
      content: ["Spring introduction", "Dependency injection", "IoC container", "Spring Boot basics", "REST APIs", "Spring Data JPA", "Spring Security", "Testing with Spring", "Configuration", "Microservices basics"]
    }
  ]

  const resources = [
    { title: "W3Schools Java Tutorial", description: "Complete Java programming guide", url: "https://www.w3schools.com/java/", type: "Tutorial" },
    { title: "TutorialsPoint Java Programming", description: "Comprehensive Java reference", url: "https://www.tutorialspoint.com/java/", type: "Guide" },
    { title: "Oracle Java Documentation", description: "Official Java documentation", url: "https://docs.oracle.com/en/java/", type: "Reference" },
    { title: "Online Java Compiler", description: "Practice Java programming online", url: "/compiler", type: "Tool" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Java Programming Course</h1>
              {isLive && <Badge variant="secondary" className="animate-pulse"><Activity className="h-3 w-3 mr-1" />LIVE</Badge>}
            </div>
            <p className="text-muted-foreground mt-2">Master Java programming from basics to enterprise development</p>
            {isLive && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1"><Users className="h-4 w-4" />{activeUsers} students learning</div>
                <div className="flex items-center gap-1"><Zap className="h-4 w-4" />Real-time progress tracking</div>
              </div>
            )}
          </div>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700"><Play className="mr-2 h-5 w-5" />Start Learning</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Course Modules</CardTitle>
                <CardDescription>10 comprehensive modules covering Java programming from basics to advanced</CardDescription>
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
                <CardDescription>Curated resources from W3Schools, TutorialsPoint, and Oracle</CardDescription>
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
                  <div className="flex items-center justify-between"><span className="text-sm">Total Duration</span><span className="font-medium">30 hours</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Total Lessons</span><span className="font-medium">91 lessons</span></div>
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
