import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Trophy,
  Target,
  CheckCircle,
  Circle,
  Play,
  Code,
  FileText,
  Award,
} from "lucide-react"
import Link from "next/link"

// This would typically come from a database or API
const courseData = {
  dsa: {
    title: "Data Structures & Algorithms",
    description: "Master DSA with 200+ problems from Google, Microsoft, Amazon interviews",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    students: "5.2k",
    rating: 4.8,
    progress: 15,
    instructor: "Dr. Sarah Chen",
    instructorBio: "Former Google SWE, PhD in Computer Science",
    modules: [
      {
        id: 1,
        title: "Arrays & Strings",
        description: "Master array manipulation and string processing",
        lessons: 12,
        problems: 35,
        duration: "2 weeks",
        completed: true,
        topics: [
          {
            title: "Two Pointer Technique",
            problems: [
              {
                id: "two-sum",
                title: "Two Sum",
                difficulty: "Easy",
                companies: ["Google", "Amazon", "Microsoft"],
                description: "Find two numbers in array that add up to target",
                completed: true,
              },
              {
                id: "three-sum",
                title: "3Sum",
                difficulty: "Medium",
                companies: ["Facebook", "Apple"],
                description: "Find all unique triplets that sum to zero",
                completed: true,
              },
              {
                id: "container-water",
                title: "Container With Most Water",
                difficulty: "Medium",
                companies: ["Amazon", "Bloomberg"],
                description: "Find container that can hold the most water",
                completed: false,
              },
            ],
          },
          {
            title: "Sliding Window",
            problems: [
              {
                id: "longest-substring",
                title: "Longest Substring Without Repeating Characters",
                difficulty: "Medium",
                companies: ["Amazon", "Adobe", "Bloomberg"],
                description: "Find length of longest substring without repeating characters",
                completed: false,
              },
              {
                id: "min-window",
                title: "Minimum Window Substring",
                difficulty: "Hard",
                companies: ["Facebook", "Uber"],
                description: "Find minimum window substring containing all characters",
                completed: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Linked Lists",
        description: "Master linked list operations and algorithms",
        lessons: 8,
        problems: 22,
        duration: "1.5 weeks",
        completed: false,
        topics: [
          {
            title: "Basic Operations",
            problems: [
              {
                id: "reverse-linked-list",
                title: "Reverse Linked List",
                difficulty: "Easy",
                companies: ["Microsoft", "Apple", "Facebook"],
                description: "Reverse a singly linked list",
                completed: false,
              },
              {
                id: "merge-sorted-lists",
                title: "Merge Two Sorted Lists",
                difficulty: "Easy",
                companies: ["Amazon", "LinkedIn"],
                description: "Merge two sorted linked lists",
                completed: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Trees & Graphs",
        description: "Explore tree traversals and graph algorithms",
        lessons: 15,
        problems: 45,
        duration: "3 weeks",
        completed: false,
        topics: [
          {
            title: "Binary Trees",
            problems: [
              {
                id: "max-depth",
                title: "Maximum Depth of Binary Tree",
                difficulty: "Easy",
                companies: ["LinkedIn", "Uber"],
                description: "Find the maximum depth of a binary tree",
                completed: false,
              },
              {
                id: "validate-bst",
                title: "Validate Binary Search Tree",
                difficulty: "Medium",
                companies: ["Amazon", "Microsoft", "Facebook"],
                description: "Determine if a binary tree is a valid BST",
                completed: false,
              },
            ],
          },
        ],
      },
    ],
  },
}

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courseData[params.courseId as keyof typeof courseData]

  if (!course) {
    return <div>Course not found</div>
  }

  const completedProblems = course.modules
    .flatMap((module) => module.topics.flatMap((topic) => topic.problems))
    .filter((problem) => problem.completed).length

  const totalProblems = course.modules.flatMap((module) => module.topics.flatMap((topic) => topic.problems)).length

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {totalProblems} Problems
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
                  <p className="text-xl text-muted-foreground">{course.description}</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Progress</span>
                    <span>
                      {completedProblems}/{totalProblems} problems completed
                    </span>
                  </div>
                  <Progress value={(completedProblems / totalProblems) * 100} className="h-3" />
                </div>
              </div>

              <Card className="lg:w-80">
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">{course.instructorBio}</div>
                  </div>
                  <Button className="w-full" asChild>
                    <a href={`/practice/${course.modules[0]?.topics[0]?.problems[0]?.id || "two-sum"}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Start Learning Free
                    </a>
                  </Button>
                  <div className="text-center">
                    <Badge variant="secondary" className="text-xs">
                      ✨ Completely Free - No Registration Required
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Content */}
          <Tabs defaultValue="curriculum" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {module.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <CardTitle className="text-xl">
                              Module {module.id}: {module.title}
                            </CardTitle>
                          </div>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">{module.duration}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{module.lessons} lessons</span>
                        <span>{module.problems} problems</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {module.topics.map((topic, topicIndex) => (
                          <AccordionItem key={topicIndex} value={`topic-${topicIndex}`}>
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                {topic.title}
                                <Badge variant="outline" className="ml-2">
                                  {topic.problems.length} problems
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pt-2">
                                {topic.problems.map((problem) => (
                                  <div
                                    key={problem.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      {problem.completed ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Circle className="h-4 w-4 text-muted-foreground" />
                                      )}
                                      <div>
                                        <div className="font-medium">{problem.title}</div>
                                        <div className="text-sm text-muted-foreground">{problem.description}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                          <Badge
                                            variant={
                                              problem.difficulty === "Easy"
                                                ? "secondary"
                                                : problem.difficulty === "Medium"
                                                  ? "default"
                                                  : "destructive"
                                            }
                                            className="text-xs"
                                          >
                                            {problem.difficulty}
                                          </Badge>
                                          <div className="flex gap-1">
                                            {problem.companies.slice(0, 2).map((company) => (
                                              <Badge key={company} variant="outline" className="text-xs">
                                                {company}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Link href={`/practice/${problem.id}`}>
                                      <Button size="sm" variant="outline">
                                        <Code className="mr-1 h-3 w-3" />
                                        Solve
                                      </Button>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="problems" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Problems</CardTitle>
                  <CardDescription>
                    Practice problems curated from top tech companies and competitive programming platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.modules
                      .flatMap((module) => module.topics.flatMap((topic) => topic.problems))
                      .map((problem) => (
                        <div
                          key={problem.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            {problem.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <div className="font-medium text-lg">{problem.title}</div>
                              <div className="text-muted-foreground">{problem.description}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge
                                  variant={
                                    problem.difficulty === "Easy"
                                      ? "secondary"
                                      : problem.difficulty === "Medium"
                                        ? "default"
                                        : "destructive"
                                  }
                                >
                                  {problem.difficulty}
                                </Badge>
                                <div className="flex gap-1">
                                  {problem.companies.map((company) => (
                                    <Badge key={company} variant="outline" className="text-xs">
                                      {company}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link href={`/practice/${problem.id}`}>
                            <Button>
                              <Code className="mr-2 h-4 w-4" />
                              Solve Problem
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Study Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                      <span>Algorithm Complexity Cheat Sheet</span>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                      <span>Data Structure Visual Guide</span>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                      <span>Interview Preparation Checklist</span>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">First Problem Solved</div>
                        <div className="text-sm text-muted-foreground">Complete your first coding problem</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 opacity-50">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Module Master</div>
                        <div className="text-sm text-muted-foreground">Complete an entire module</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
