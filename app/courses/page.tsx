"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  Search, 
  Filter,
  Trophy,
  Code2,
  Database,
  Globe,
  Zap,
  Target,
  Award,
  TrendingUp,
  Activity,
  Wifi,
  WifiOff
} from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  students: number
  rating: number
  price: string
  category: string
  tags: string[]
  lessons: number
  isLive: boolean
  liveStudents: number
  lastUpdated: string
  progress?: number
  realTimeStats: {
    activeStudents: number
    completedToday: number
    averageRating: number
    successRate: number
  }
}

const dynamicCourses: Course[] = [
  {
    id: "1",
    title: "Python Programming Mastery",
    description: "Complete Python course from basics to advanced concepts including data science, web development, and automation.",
    instructor: "Dr. Sarah Johnson",
    duration: "12 weeks",
    level: "Beginner to Advanced",
    students: 15420,
    rating: 4.9,
    price: "Free",
    category: "Programming",
    tags: ["Python", "Data Science", "Web Development", "Automation"],
    lessons: 48,
    isLive: true,
    liveStudents: 245,
    lastUpdated: new Date().toISOString(),
    realTimeStats: {
      activeStudents: 245,
      completedToday: 89,
      averageRating: 4.9,
      successRate: 94
    }
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms with real-world problem solving and coding interviews.",
    instructor: "Prof. Michael Chen",
    duration: "16 weeks",
    level: "Intermediate",
    students: 12850,
    rating: 4.8,
    price: "Free",
    category: "Computer Science",
    tags: ["Algorithms", "Data Structures", "Problem Solving", "Interviews"],
    lessons: 64,
    isLive: true,
    liveStudents: 189,
    lastUpdated: new Date().toISOString(),
    realTimeStats: {
      activeStudents: 189,
      completedToday: 67,
      averageRating: 4.8,
      successRate: 91
    }
  },
  {
    id: "3",
    title: "Full Stack Web Development",
    description: "Build modern web applications using React, Node.js, and MongoDB with real-time features.",
    instructor: "Alex Rodriguez",
    duration: "20 weeks",
    level: "Beginner to Intermediate",
    students: 9870,
    rating: 4.7,
    price: "Free",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "JavaScript", "API"],
    lessons: 80,
    isLive: true,
    liveStudents: 156,
    lastUpdated: new Date().toISOString(),
    realTimeStats: {
      activeStudents: 156,
      completedToday: 45,
      averageRating: 4.7,
      successRate: 88
    }
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning with Python, TensorFlow, and real-world projects.",
    instructor: "Dr. Emily Watson",
    duration: "14 weeks",
    level: "Intermediate",
    students: 7630,
    rating: 4.8,
    price: "Free",
    category: "Artificial Intelligence",
    tags: ["Machine Learning", "Python", "TensorFlow", "AI", "Statistics"],
    lessons: 56,
    isLive: true,
    liveStudents: 134,
    lastUpdated: new Date().toISOString(),
    realTimeStats: {
      activeStudents: 134,
      completedToday: 38,
      averageRating: 4.8,
      successRate: 92
    }
  },
  {
    id: "5",
    title: "JavaScript Advanced Concepts",
    description: "Deep dive into modern JavaScript, ES6+, async programming, and advanced patterns.",
    instructor: "David Kim",
    duration: "10 weeks",
    level: "Advanced",
    students: 6540,
    rating: 4.9,
    price: "Free",
    category: "Programming",
    tags: ["JavaScript", "ES6+", "Async", "Advanced Patterns", "Performance"],
    lessons: 40,
    isLive: true,
    liveStudents: 98,
    lastUpdated: new Date().toISOString(),
    realTimeStats: {
      activeStudents: 98,
      completedToday: 29,
      averageRating: 4.9,
      successRate: 95
    }
  },
  {
    id: "6",
    title: "System Design & Architecture",
    description: "Learn to design scalable systems, microservices, and distributed architectures.",
    instructor: "Maria Garcia",
    duration: "18 weeks",
    level: "Advanced",
    students: 5420,
    rating: 4.8,
    price: "Free",
    category: "System Design",
    tags: ["System Design", "Microservices", "Scalability", "Architecture", "Cloud"],
    lessons: 72,
    isLive: true,
    liveStudents: 87,
    lastUpdated: new Date().toISOString(),
    realTimeStats: {
      activeStudents: 87,
      completedToday: 23,
      averageRating: 4.8,
      successRate: 89
    }
  }
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(dynamicCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(dynamicCourses)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [isRealTime, setIsRealTime] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateCourseStats()
      setLastUpdated(new Date())
    }, 8000) // Update every 8 seconds

    setLoading(false)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm, categoryFilter, levelFilter])

  const updateCourseStats = () => {
    setCourses(prevCourses => 
      prevCourses.map(course => ({
        ...course,
        liveStudents: Math.floor(Math.random() * 50) + 50,
        realTimeStats: {
          activeStudents: Math.floor(Math.random() * 50) + 50,
          completedToday: Math.floor(Math.random() * 30) + 10,
          averageRating: Math.round((4.5 + Math.random() * 0.5) * 10) / 10,
          successRate: Math.floor(Math.random() * 10) + 85
        },
        lastUpdated: new Date().toISOString()
      }))
    )
  }

  const filterCourses = () => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(course => course.category === categoryFilter)
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter(course => course.level.toLowerCase().includes(levelFilter.toLowerCase()))
    }

    setFilteredCourses(filtered)
  }

  const getLevelColor = (level: string) => {
    if (level.toLowerCase().includes('beginner')) return "bg-green-100 text-green-800"
    if (level.toLowerCase().includes('intermediate')) return "bg-yellow-100 text-yellow-800"
    if (level.toLowerCase().includes('advanced')) return "bg-red-100 text-red-800"
    return "bg-blue-100 text-blue-800"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming": return <Code2 className="h-4 w-4" />
      case "Computer Science": return <Database className="h-4 w-4" />
      case "Web Development": return <Globe className="h-4 w-4" />
      case "Artificial Intelligence": return <Zap className="h-4 w-4" />
      case "System Design": return <Target className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const categories = ["All", "Programming", "Computer Science", "Web Development", "Artificial Intelligence", "System Design"]
  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
                <BookOpen className="h-10 w-10 text-primary" />
                Courses
                {isRealTime && (
                  <Badge variant="secondary" className="ml-3 animate-pulse">
                    <Activity className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                Master programming with our comprehensive, real-time courses
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                {isRealTime ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {courses.reduce((sum, c) => sum + c.realTimeStats.activeStudents, 0)} active students
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {courses.reduce((sum, c) => sum + c.realTimeStats.completedToday, 0)} completed today
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {Math.round(courses.reduce((sum, c) => sum + c.realTimeStats.successRate, 0) / courses.length)}% avg success
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Course Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {filteredCourses.length} courses
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(course.category)}
                    <Badge className={getLevelColor(course.level)}>
                      {course.level.split(' ')[0]}
                    </Badge>
                    {course.isLive && (
                      <Badge variant="secondary" className="animate-pulse">
                        <Activity className="h-3 w-3 mr-1" />
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {course.price}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-muted-foreground" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Real-time Stats */}
                  {course.isLive && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Live Activity</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{course.realTimeStats.activeStudents} active</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          <span>{course.realTimeStats.completedToday} completed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{course.realTimeStats.averageRating} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{course.realTimeStats.successRate}% success</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Play className="mr-2 h-4 w-4" />
                    Start Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}