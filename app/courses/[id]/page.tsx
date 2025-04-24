"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Users,
  Star,
  PlayCircle,
  FileText,
  Code,
  Award,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock course data
const coursesData = [
  {
    id: "1",
    title: "C Programming Fundamentals",
    description: "Master the fundamentals of C programming language with hands-on projects and exercises.",
    level: "Beginner",
    duration: "20 hours",
    students: 3450,
    rating: 4.8,
    instructor: "Dr. Robert Chen",
    progress: 0,
    completedLessons: 0,
    totalLessons: 15,
    lastAccessed: "Not started",
    overview: `This comprehensive course covers all the fundamental concepts of C programming. You'll learn how to write efficient C code, understand memory management, and implement various algorithms and data structures.

The course includes hands-on coding exercises, quizzes, and programming assignments to reinforce your learning. By the end of this course, you'll have a solid understanding of C programming and be able to develop applications using this powerful language.`,
    prerequisites: [
      "Basic understanding of computer operations",
      "No prior programming experience required",
      "A computer with a C compiler installed",
    ],
    whatYouWillLearn: [
      "Understand C syntax and programming constructs",
      "Work with variables, data types, and operators",
      "Implement control structures like loops and conditionals",
      "Create and use functions effectively",
      "Work with arrays and pointers",
      "Understand memory management in C",
      "Implement file I/O operations",
    ],
    modules: [
      {
        title: "Introduction to C Programming",
        lessons: [
          { title: "Course Overview", duration: "10 min", type: "video", completed: false },
          { title: "Setting Up Your Development Environment", duration: "15 min", type: "video", completed: false },
          { title: "Your First C Program", duration: "20 min", type: "video", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Variables and Data Types",
        lessons: [
          { title: "Understanding Variables", duration: "25 min", type: "video", completed: false },
          { title: "Data Types in C", duration: "20 min", type: "video", completed: false },
          { title: "Operators and Expressions", duration: "30 min", type: "video", completed: false },
          { title: "Coding Exercise: Working with Variables", duration: "45 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Control Structures",
        lessons: [
          { title: "Conditional Statements", duration: "20 min", type: "video", completed: false },
          { title: "Loops in C", duration: "20 min", type: "video", completed: false },
          { title: "Switch Statements", duration: "15 min", type: "video", completed: false },
          { title: "Coding Exercise: Control Structures", duration: "45 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Functions and Arrays",
        lessons: [
          { title: "Creating Functions", duration: "25 min", type: "video", completed: false },
          { title: "Arrays and Strings", duration: "30 min", type: "video", completed: false },
          { title: "Pointers Introduction", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Functions and Arrays", duration: "45 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Certification Project",
        lessons: [
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Project Requirements", duration: "10 min", type: "video", completed: false },
          { title: "Final Project Submission", duration: "120 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "60 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 70% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 75%",
    ],
  },
  // Add more courses as needed
]

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [course, setCourse] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Find the course by ID
    const foundCourse = coursesData.find((c) => c.id === params.id) || coursesData[0]
    setCourse(foundCourse)

    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [params.id])

  const handleEnroll = () => {
    if (!isLoggedIn) {
      // Redirect to login page with return URL
      router.push(`/auth/login?returnUrl=/courses/${params.id}`)
      return
    }

    // Handle enrollment logic
    alert("You have successfully enrolled in this course!")
  }

  if (!course) {
    return <div className="container mx-auto px-4 py-8">Loading course details...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/courses" className="flex items-center text-sm font-medium text-gray-700 hover:text-black">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Courses
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">{course.description}</p>

            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="mr-1 h-4 w-4" />
                {course.level}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-1 h-4 w-4" />
                {course.students} students
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                {course.rating} rating
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Course Overview</h2>
                  <div className="whitespace-pre-line text-gray-700">{course.overview}</div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">Prerequisites</h2>
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    {course.prerequisites.map((prerequisite: string, index: number) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">What You Will Learn</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {course.whatYouWillLearn.map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">Instructor</h2>
                  <div className="flex items-start">
                    <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                      <Image src="/placeholder.svg?height=64&width=64" alt="Instructor" width={64} height={64} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{course.instructor}</h3>
                      <p className="text-sm text-gray-500">{course.title} Expert</p>
                      <p className="mt-2 text-sm text-gray-700">
                        An experienced instructor with over 10 years of teaching programming languages and software
                        development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Course Curriculum</h2>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium">
                      {course.completedLessons}/{course.totalLessons} lessons completed
                    </span>
                    <Progress value={(course.completedLessons / course.totalLessons) * 100} className="mt-2 h-2 w-64" />
                  </div>
                  <div className="text-sm text-gray-500">Total: {course.duration}</div>
                </div>

                <div className="space-y-4">
                  {course.modules.map((module: any, moduleIndex: number) => (
                    <div key={moduleIndex} className="rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between bg-[#f5f2ee] px-6 py-4">
                        <h3 className="font-semibold">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {module.lessons.filter((lesson: any) => lesson.completed).length}/{module.lessons.length}{" "}
                          completed
                        </span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {module.lessons.map((lesson: any, lessonIndex: number) => (
                          <div
                            key={lessonIndex}
                            className={`flex items-center justify-between px-6 py-4 ${
                              lesson.completed ? "bg-green-50" : ""
                            }`}
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" />
                              ) : (
                                <div className="mr-3 h-5 w-5 rounded-full border border-gray-300"></div>
                              )}
                              <div>
                                <div className="flex items-center">
                                  {lesson.type === "video" ? (
                                    <PlayCircle className="mr-2 h-4 w-4 text-gray-500" />
                                  ) : lesson.type === "quiz" ? (
                                    <FileText className="mr-2 h-4 w-4 text-gray-500" />
                                  ) : (
                                    <Code className="mr-2 h-4 w-4 text-gray-500" />
                                  )}
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            </div>
                            <div>
                              {!isLoggedIn ? (
                                <Button variant="link" className="h-auto p-0 text-black" onClick={handleEnroll}>
                                  Enroll to Start
                                </Button>
                              ) : lesson.completed ? (
                                <Button variant="link" className="h-auto p-0 text-black">
                                  Review
                                </Button>
                              ) : (
                                <Button variant="link" className="h-auto p-0 text-black">
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="certification" className="mt-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Certification Requirements</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6 flex items-center">
                      <Award className="mr-4 h-12 w-12 text-purple-600" />
                      <div>
                        <h3 className="text-lg font-medium">{course.title} Certification</h3>
                        <p className="text-sm text-gray-500">Earn an industry-recognized certificate upon completion</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 font-medium">Requirements to Earn Your Certificate:</h4>
                      <ul className="space-y-2">
                        {course.certificationRequirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 text-green-500" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#f5f2ee] p-4">
                      <h4 className="mb-2 font-medium">Certificate Preview:</h4>
                      <div className="relative h-64 w-full overflow-hidden rounded-lg border-4 border-[#e8e3dc]">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Learn%2C%20Code%2C%20Create%20%2CCertify.jpg-ggjBnEMFM6CjCzItqWxjurgwbTTUoT.jpeg"
                          alt="Certificate Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="mt-4 text-center text-sm text-gray-500">
                        Your name will appear on the certificate upon successful completion of all requirements
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Student Reviews</h2>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 text-5xl font-bold">{course.rating}</div>
                  <div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Based on 245 reviews</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: "Alex Johnson",
                      rating: 5,
                      date: "March 15, 2025",
                      comment:
                        "This course is excellent! The explanations are clear and the exercises really help reinforce the concepts. I feel much more confident about C programming now.",
                    },
                    {
                      name: "Sarah Williams",
                      rating: 4,
                      date: "March 10, 2025",
                      comment:
                        "Very good course with detailed explanations. The only reason I'm giving 4 stars instead of 5 is that I wish there were more coding exercises.",
                    },
                    {
                      name: "Michael Brown",
                      rating: 5,
                      date: "March 5, 2025",
                      comment:
                        "The instructor is an amazing teacher! The way they explain complex concepts makes them easy to understand. Highly recommended for anyone wanting to learn C programming.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="mb-4 flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-gray-200">
                <div className="flex h-full items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                {isLoggedIn && course.progress > 0 ? (
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">Your Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="mt-2 text-sm text-gray-500">Last accessed {course.lastAccessed}</p>
                  </div>
                ) : null}

                <div className="space-y-4">
                  <Button className="w-full bg-black" onClick={handleEnroll}>
                    {isLoggedIn ? "Enroll Now" : "Login to Enroll"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Preview Course
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-[#f5f2ee] p-4">
                    <h3 className="mb-2 font-medium">This course includes:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        {course.duration} of video content
                      </li>
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        Multiple quizzes and assessments
                      </li>
                      <li className="flex items-center">
                        <Code className="mr-2 h-4 w-4" />
                        Hands-on coding exercises
                      </li>
                      <li className="flex items-center">
                        <Award className="mr-2 h-4 w-4" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">Not sure if this course is right for you?</p>
                    <Button variant="link" className="h-auto p-0 text-black">
                      Try a free preview
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
