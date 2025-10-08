'use client'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
  WifiOff,
  ExternalLink,
  FileText
} from "lucide-react"
import Link from "next/link"

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
  }
  languages: string[]
  resources: string[]
  problems: number
  topics: string[]
  companies: string[]
  color: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const initialCourses: Course[] = [
    {
      id: 'python',
      title: 'Python Programming',
      description: 'Master Python programming from basics to advanced data science and web development. Learn from W3Schools and TutorialsPoint content.',
      duration: '31 hours',
      level: 'Beginner to Advanced',
      students: 8500,
      rating: 4.9,
      price: 'Free',
      instructor: 'Dr. Sarah Chen',
      category: 'Programming Languages',
      tags: ['Python', 'Data Science', 'Web Development', 'Flask', 'NumPy'],
      lessons: 89,
      isLive: true,
      liveStudents: Math.floor(Math.random() * 50) + 20,
      lastUpdated: new Date().toISOString(),
      progress: 0,
      realTimeStats: {
        activeStudents: Math.floor(Math.random() * 30) + 10,
        completedToday: Math.floor(Math.random() * 100) + 50,
        averageRating: 4.9
      },
      languages: ['Python'],
      resources: ['W3Schools', 'TutorialsPoint', 'Python.org'],
      problems: 189,
      topics: ['Syntax', 'OOP', 'Data Structures', 'Libraries', 'Web Scraping', 'APIs', 'Testing'],
      companies: ['Google', 'Netflix', 'Instagram', 'Dropbox', 'Spotify'],
      color: 'bg-yellow-500'
    },
    {
      id: 'java',
      title: 'Java Programming',
      description: 'Master Java programming from basics to enterprise development. Learn OOP, Spring Framework, and modern Java features.',
      duration: '30 hours',
      level: 'Beginner to Advanced',
      students: 6200,
      rating: 4.9,
      price: 'Free',
      instructor: 'Alex Rodriguez',
      category: 'Programming Languages',
      tags: ['Java', 'OOP', 'Spring', 'JUnit', 'JDBC'],
      lessons: 91,
      isLive: true,
      liveStudents: Math.floor(Math.random() * 40) + 15,
      lastUpdated: new Date().toISOString(),
      progress: 0,
      realTimeStats: {
        activeStudents: Math.floor(Math.random() * 25) + 8,
        completedToday: Math.floor(Math.random() * 80) + 40,
        averageRating: 4.9
      },
      languages: ['Java'],
      resources: ['W3Schools', 'TutorialsPoint', 'Oracle Docs'],
      problems: 234,
      topics: ['Core Java', 'OOP', 'Collections', 'Multithreading', 'JVM', 'Design Patterns', 'Spring'],
      companies: ['Oracle', 'Amazon', 'LinkedIn', 'Uber', 'Goldman Sachs'],
      color: 'bg-red-600'
    },
    {
      id: 'cpp',
      title: 'C++ Programming',
      description: 'Master C++ programming from basics to advanced OOP concepts. Learn STL, templates, and modern C++ features.',
      duration: '31.5 hours',
      level: 'Intermediate to Advanced',
      students: 4100,
      rating: 4.9,
      price: 'Free',
      instructor: 'Emily Watson',
      category: 'Programming Languages',
      tags: ['C++', 'OOP', 'STL', 'Templates', 'Smart Pointers'],
      lessons: 86,
      isLive: true,
      liveStudents: Math.floor(Math.random() * 35) + 12,
      lastUpdated: new Date().toISOString(),
      progress: 0,
      realTimeStats: {
        activeStudents: Math.floor(Math.random() * 20) + 6,
        completedToday: Math.floor(Math.random() * 60) + 30,
        averageRating: 4.9
      },
      languages: ['C++'],
      resources: ['W3Schools', 'TutorialsPoint', 'C++ Reference'],
      problems: 201,
      topics: ['OOP', 'STL', 'Templates', 'Memory Management', 'Multithreading', 'Design Patterns'],
      companies: ['Google', 'Microsoft', 'Adobe', 'Bloomberg', 'Tesla'],
      color: 'bg-blue-600'
    },
    {
      id: 'c',
      title: 'C Programming',
      description: 'Learn C programming fundamentals from basics to advanced concepts. Master pointers, memory management, and system programming.',
      duration: '24 hours',
      level: 'Beginner to Advanced',
      students: 3200,
      rating: 4.8,
      price: 'Free',
      instructor: 'Dr. Michael Kim',
      category: 'Programming Languages',
      tags: ['C', 'Pointers', 'Memory Management', 'File I/O', 'System Programming'],
      lessons: 73,
      isLive: true,
      liveStudents: Math.floor(Math.random() * 30) + 10,
      lastUpdated: new Date().toISOString(),
      progress: 0,
      realTimeStats: {
        activeStudents: Math.floor(Math.random() * 15) + 5,
        completedToday: Math.floor(Math.random() * 50) + 25,
        averageRating: 4.8
      },
      languages: ['C'],
      resources: ['W3Schools', 'TutorialsPoint', 'C Reference'],
      problems: 178,
      topics: ['Syntax', 'Pointers', 'Memory Management', 'File I/O', 'Data Structures', 'Algorithms'],
      companies: ['Intel', 'NVIDIA', 'Qualcomm', 'Embedded Systems', 'Linux'],
      color: 'bg-gray-600'
    },
    {
      id: 'data-structures-and-algorithms',
      title: 'Data Structures & Algorithms',
      description: 'Master fundamental data structures and algorithmic problem-solving techniques used in technical interviews.',
      duration: '12 weeks',
      level: 'Intermediate',
      students: 2400,
      rating: 4.8,
      price: 'Free',
      instructor: 'Dr. Sarah Chen',
      category: 'Computer Science',
      tags: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'DP'],
      lessons: 45,
      isLive: true,
      liveStudents: Math.floor(Math.random() * 25) + 8,
      lastUpdated: new Date().toISOString(),
      progress: 0,
      realTimeStats: {
        activeStudents: Math.floor(Math.random() * 18) + 7,
        completedToday: Math.floor(Math.random() * 70) + 35,
        averageRating: 4.8
      },
      languages: ['Python', 'Java', 'C++'],
      resources: ['LeetCode', 'CodeChef', 'HackerRank'],
      problems: 347,
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Greedy', 'Backtracking'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'],
      color: 'bg-red-500'
    },
    {
      id: 'system-design-mastery',
      title: 'System Design Mastery',
      description: 'Learn to design scalable systems like the pros. Cover distributed systems, databases, and real-world architectures.',
      duration: '8 weeks',
      level: 'Intermediate',
      students: 3100,
      rating: 4.9,
      price: 'Free',
      instructor: 'Alex Rodriguez',
      category: 'Software Engineering',
      tags: ['Scalability', 'Databases', 'Caching', 'Load Balancing'],
      lessons: 32,
      isLive: true,
      liveStudents: Math.floor(Math.random() * 20) + 6,
      lastUpdated: new Date().toISOString(),
      progress: 0,
      realTimeStats: {
        activeStudents: Math.floor(Math.random() * 12) + 4,
        completedToday: Math.floor(Math.random() * 40) + 20,
        averageRating: 4.9
      },
      languages: ['Python', 'Java', 'JavaScript'],
      resources: ['System Design Interviews', 'AWS Docs'],
      problems: 98,
      topics: ['Spring Core', 'REST APIs', 'JPA', 'Security', 'Microservices', 'Testing', 'Cloud'],
      companies: ['JPMorgan', 'Wells Fargo', 'Accenture', 'TCS', 'Infosys'],
      color: 'bg-green-500'
    }
  ]

  useEffect(() => {
    setCourses(initialCourses)
    setFilteredCourses(initialCourses)
    
    // Set up real-time updates
    const interval = setInterval(() => {
      setCourses(prevCourses => 
        prevCourses.map(course => ({
          ...course,
          liveStudents: Math.floor(Math.random() * 50) + 10,
          lastUpdated: new Date().toISOString(),
          realTimeStats: {
            activeStudents: Math.floor(Math.random() * 30) + 5,
            completedToday: Math.floor(Math.random() * 100) + 20,
            averageRating: course.rating
          }
        }))
      )
      setIsRealTime(true)
      setLastUpdated(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase().includes(selectedLevel.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      
      return matchesSearch && matchesLevel && matchesCategory
    })
    
    setFilteredCourses(filtered)
  }, [courses, searchTerm, selectedLevel, selectedCategory])

  const categories = ['all', 'Programming Languages', 'Computer Science', 'Software Engineering']
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced', 'Intermediate to Advanced']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Programming Courses</h1>
              {isRealTime && (
                <Badge variant="secondary" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">
              Master programming languages with comprehensive courses from W3Schools and TutorialsPoint
            </p>
            {isRealTime && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  {isRealTime ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {courses.reduce((sum, course) => sum + course.realTimeStats.activeStudents, 0)} students active
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, languages, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group">
              <div className={`h-1 ${course.color}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      {course.isLive && (
                        <Badge variant="secondary" className="animate-pulse">
                          <Activity className="h-3 w-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Trophy className="h-3 w-3" />
                        {course.problems}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
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
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300 mb-2">
                      <Activity className="h-4 w-4" />
                      <span className="font-medium">Live Activity</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>{course.realTimeStats.activeStudents} active now</div>
                      <div>{course.realTimeStats.completedToday} completed today</div>
                    </div>
                  </div>
                )}

                {/* Key Topics */}
                <div className="space-y-2">
                  <div className="text-xs font-medium">Key Topics</div>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                        {topic}
                      </Badge>
                    ))}
                    {course.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        +{course.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Companies */}
                <div className="space-y-2">
                  <div className="text-xs font-medium">Companies</div>
                  <div className="flex flex-wrap gap-1">
                    {course.companies.slice(0, 2).map((company, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                        {company}
                      </Badge>
                    ))}
                    {course.companies.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        +{course.companies.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link href={`/courses/${course.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Course
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
