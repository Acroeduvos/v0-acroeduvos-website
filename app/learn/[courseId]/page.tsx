"use client"

import { useState } from "react"
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
  LockKeyhole,
  Award,
} from "lucide-react"

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock course data - in a real app, this would be fetched from an API
  const course = {
    id: params.courseId,
    title: "Data Structures Fundamentals",
    description:
      "Learn the essential data structures every programmer should know, from arrays and linked lists to trees and graphs.",
    level: "Beginner",
    duration: "12 hours",
    students: 2450,
    rating: 4.8,
    instructor: "Dr. Jane Smith",
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
    lastAccessed: "2 days ago",
    overview: `This comprehensive course covers all the fundamental data structures used in computer science and software engineering. You'll learn how to implement these structures, analyze their performance, and choose the right one for different scenarios.

The course includes hands-on coding exercises, quizzes, and programming assignments to reinforce your learning. By the end of this course, you'll have a solid understanding of data structures and be able to apply them to solve real-world problems efficiently.`,
    prerequisites: [
      "Basic programming knowledge in any language",
      "Understanding of variables, loops, and functions",
      "Familiarity with arrays and basic algorithms",
    ],
    whatYouWillLearn: [
      "Implement and use arrays, linked lists, stacks, and queues",
      "Understand tree structures including binary trees and binary search trees",
      "Master hash tables and their applications",
      "Learn graph representations and basic graph algorithms",
      "Analyze the time and space complexity of data structures",
      "Choose the appropriate data structure for different problems",
    ],
    modules: [
      {
        title: "Introduction to Data Structures",
        lessons: [
          { title: "Course Overview", duration: "10 min", type: "video", completed: true },
          { title: "Why Data Structures Matter", duration: "15 min", type: "video", completed: true },
          { title: "Big O Notation", duration: "20 min", type: "video", completed: true },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: true },
        ],
      },
      {
        title: "Arrays and Linked Lists",
        lessons: [
          { title: "Arrays: Implementation and Operations", duration: "25 min", type: "video", completed: true },
          { title: "Dynamic Arrays", duration: "20 min", type: "video", completed: true },
          { title: "Linked Lists: Singly and Doubly", duration: "30 min", type: "video", completed: true },
          {
            title: "Coding Exercise: Linked List Implementation",
            duration: "45 min",
            type: "exercise",
            completed: true,
          },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: true },
        ],
      },
      {
        title: "Stacks and Queues",
        lessons: [
          { title: "Stack: LIFO Data Structure", duration: "20 min", type: "video", completed: true },
          { title: "Queue: FIFO Data Structure", duration: "20 min", type: "video", completed: false },
          { title: "Applications of Stacks and Queues", duration: "25 min", type: "video", completed: false },
          {
            title: "Coding Exercise: Stack and Queue Implementation",
            duration: "45 min",
            type: "exercise",
            completed: false,
          },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Trees and Graphs",
        lessons: [
          { title: "Tree Basics", duration: "25 min", type: "video", completed: false },
          { title: "Binary Trees and Binary Search Trees", duration: "30 min", type: "video", completed: false },
          { title: "Graph Representations", duration: "25 min", type: "video", completed: false },
          { title: "Basic Graph Traversals", duration: "30 min", type: "video", completed: false },
          { title: "Coding Exercise: Tree Implementation", duration: "45 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "15 min", type: "quiz", completed: false },
        ],
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/learn" className="flex items-center text-sm font-medium text-gray-700 hover:text-black">
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
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
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">What You Will Learn</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {course.whatYouWillLearn.map((item, index) => (
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
                      <p className="text-sm text-gray-500">Data Structures & Algorithms Expert</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Dr. Smith has over 15 years of experience teaching computer science and has authored multiple
                        books on data structures and algorithms.
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
                  {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between bg-[#f5f2ee] px-6 py-4">
                        <h3 className="font-semibold">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {module.lessons.filter((lesson) => lesson.completed).length}/{module.lessons.length} completed
                        </span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
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
                              {lesson.completed ? (
                                <Button variant="link" className="h-auto p-0 text-black">
                                  Review
                                </Button>
                              ) : moduleIndex <= 2 || (moduleIndex === 3 && lessonIndex === 0) ? (
                                <Button variant="link" className="h-auto p-0 text-black">
                                  Start
                                </Button>
                              ) : (
                                <LockKeyhole className="h-5 w-5 text-gray-400" />
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
                        "This course is excellent! The explanations are clear and the exercises really help reinforce the concepts. I feel much more confident about data structures now.",
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
                        "Dr. Smith is an amazing instructor! The way she explains complex concepts makes them easy to understand. Highly recommended for anyone wanting to learn data structures.",
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
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">Your Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="mt-2 text-sm text-gray-500">Last accessed {course.lastAccessed}</p>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-black">Continue Learning</Button>
                  <Button variant="outline" className="w-full">
                    Download Resources
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-[#f5f2ee] p-4">
                    <h3 className="mb-2 font-medium">This course includes:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        12 hours of video content
                      </li>
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />4 quizzes
                      </li>
                      <li className="flex items-center">
                        <Code className="mr-2 h-4 w-4" />3 coding exercises
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
