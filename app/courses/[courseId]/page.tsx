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
  Lightbulb,
  Terminal
} from "lucide-react"
import Link from "next/link"

// Expanded Course Data with Theory and Code
const courseData = {
  "data-structures-and-algorithms": {
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
            theory: `The Two Pointer technique is an algorithmic pattern where two pointers iterate through the data structure in tandem until one or both of the pointers hit a certain condition.
            
### Common scenarios:
1. **Shrinking Window**: One pointer starts at the beginning, one at the end. They move towards each other. Used for "Two Sum" (sorted), reversing arrays, etc.
2. **Sliding Window**: Both pointers start at the beginning. One expands the window, the other contracts it. Used for tracking subarrays.`,
            code: `// Python Example: Two Sum (Sorted Array)
def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        curr_sum = numbers[left] + numbers[right]
        if curr_sum == target:
            return [left + 1, right + 1]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
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
            theory: `Sliding Window is a technique used to perform an operation on a specific window size of an array or linked list.
            
It reduces nested loops (O(N²)) to a single loop (O(N)).`,
            code: `// Java Example: Max Sum Subarray of size K
public int maxSum(int[] arr, int k) {
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
            problems: [
              {
                id: "longest-substring",
                title: "Longest Substring Without Repeating",
                difficulty: "Medium",
                companies: ["Amazon", "Adobe"],
                description: "Find length of longest substring without repeating characters",
                completed: false,
              }
            ],
          },
        ],
      },
    ],
  },
  python: {
    title: "Python Programming",
    description: "Master Python from basics to advanced concepts. Learn from W3Schools and TutorialsPoint content.",
    level: "Beginner to Advanced",
    duration: "31 hours",
    students: "8.5k",
    rating: 4.9,
    progress: 0,
    instructor: "Dr. Sarah Chen",
    instructorBio: "Python Expert & Data Scientist",
    modules: [
      {
        id: 1,
        title: "Python Basics",
        description: "Introduction to Python syntax, variables, and data types",
        lessons: 10,
        problems: 15,
        duration: "1 week",
        completed: false,
        topics: [
          {
            title: "Variables and Data Types",
            theory: `Variables are containers for storing data values. Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

### Standard Data Types:
*   Numbers (int, float, complex)
*   String (str)
*   List
*   Tuple
*   Dictionary`,
            code: `# Python Variables
x = 5           # int
y = "John"      # str
print(x)
print(y)

# Casting
x = str(3)    # x will be '3'
y = int(3)    # y will be 3
z = float(3)  # z will be 3.0`,
            problems: [
              {
                id: "py-variables",
                title: "Variable Swap",
                difficulty: "Easy",
                companies: ["Basic"],
                description: "Swap two variables without a temp variable",
                completed: false,
              }
            ]
          },
          {
            title: "Control Flow",
            theory: `Python uses indentation to indicate a block of code.
            
*   **if...elif...else**: Conditional execution.
*   **while loops**: Execute as long as a condition is true.
*   **for loops**: Iterate over a sequence.`,
            code: `# If statement
if 5 > 2:
    print("Five is greater than two!")

# For loop
fruits = ["apple", "banana", "cherry"]
for x in fruits:
    print(x)`,
            problems: [
              {
                id: "py-loops",
                title: "Fibonacci Sequence",
                difficulty: "Easy",
                companies: ["Basic"],
                description: "Print first N numbers of Fibonacci sequence",
                completed: false,
              }
            ]
          }
        ]
      }
    ]
  },
  java: {
    title: "Java Programming",
    description: "Comprehensive Java course covering OOP, Collections, and Streams.",
    level: "Beginner to Advanced",
    duration: "30 hours",
    students: "6.2k",
    rating: 4.9,
    progress: 0,
    instructor: "Alex Rodriguez",
    instructorBio: "Senior Java Developer",
    modules: [
      {
        id: 1,
        title: "Java Fundamentals",
        description: "Core syntax and Object-Oriented Programming",
        lessons: 15,
        problems: 20,
        duration: "2 weeks",
        completed: false,
        topics: [
          {
            title: "Classes and Objects",
            theory: `Java is an Object-Oriented Language. Everything differs to valid classes and objects.
            
*   **Class**: A blueprint for creating objects.
*   **Object**: An instance of a class.`,
            code: `public class Main {
  int x = 5;

  public static void main(String[] args) {
    Main myObj = new Main();
    System.out.println(myObj.x);
  }
}`,
            problems: [
              {
                id: "java-class",
                title: "Create a Car Class",
                difficulty: "Easy",
                companies: ["Basic"],
                description: "Define a Car class with attributes and methods",
                completed: false,
              }
            ]
          }
        ]
      }
    ]
  },
  cpp: {
    title: "C++ Programming",
    description: "High-performance programming with C++.",
    level: "Intermediate",
    duration: "32 hours",
    students: "4.1k",
    rating: 4.9,
    progress: 0,
    instructor: "Emily Watson",
    instructorBio: "Systems Engineer",
    modules: [
      {
        id: 1,
        title: "C++ Basics & Pointers",
        description: "Memory management and core features",
        lessons: 12,
        problems: 18,
        duration: "2 weeks",
        completed: false,
        topics: [
          {
            title: "Pointers and References",
            theory: `A pointer is a variable that stores the memory address of another variable.
            
*   \`&\` Operator: The address-of operator.
*   \`*\` Operator: The dereference operator.`,
            code: `string food = "Pizza";
string* ptr = &food;

// Output the value of food (Pizza)
cout << food << "\\n";

// Output the memory address of food (0x6dfed4)
cout << &food << "\\n";

// Output the memory address of food with the pointer (0x6dfed4)
cout << ptr << "\\n";`,
            problems: [
              {
                id: "cpp-pointer",
                title: "Swap with Pointers",
                difficulty: "Medium",
                companies: ["Basic"],
                description: "Swap two numbers using pointers",
                completed: false,
              }
            ]
          }
        ]
      }
    ]
  },
  c: {
    title: "C Programming",
    description: "The mother of all languages. System level programming.",
    level: "Beginner",
    duration: "24 hours",
    students: "3.2k",
    rating: 4.8,
    progress: 0,
    instructor: "Dr. Michael Kim",
    instructorBio: "OS Developer",
    modules: [
      {
        id: 1,
        title: "C Fundamentals",
        description: "Syntax, Loops, and Functions",
        lessons: 8,
        problems: 10,
        duration: "1 week",
        completed: false,
        topics: [
          {
            title: "Structure of C Program",
            theory: `A C program consists of the following parts:
*   Preprocessor Commands
*   Functions
*   Variables
*   Statements & Expressions
*   Comments`,
            code: `#include <stdio.h>

int main() {
   /* my first program in C */
   printf("Hello, World! \\n");
   return 0;
}`,
            problems: [
              {
                id: "c-hello",
                title: "Hello World",
                difficulty: "Easy",
                companies: ["Basic"],
                description: "Print Hello World in C",
                completed: false,
              }
            ]
          }
        ]
      }
    ]
  },
  "system-design-mastery": {
    title: "System Design Mastery",
    description: "Design scalable distributed systems.",
    level: "Advanced",
    duration: "8 weeks",
    students: "3.1k",
    rating: 4.9,
    progress: 0,
    instructor: "Alex Rodriguez",
    instructorBio: "Principal Architect",
    modules: [
      {
        id: 1,
        title: "Load Balancing",
        description: "Distributing traffic across servers",
        lessons: 5,
        problems: 5,
        duration: "1 week",
        completed: false,
        topics: [
          {
            title: "Load Balancers Basics",
            theory: `A load balancer sits between the client and the server farm accepting incoming network and application traffic and distributing the traffic across multiple backend servers using various algorithms.`,
            code: `// Nginx Configuration Example
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    server {
        location / {
            proxy_pass http://backend;
        }
    }
}`,
            problems: [
              {
                id: "design-lb",
                title: "Design a Load Balancer",
                difficulty: "Hard",
                companies: ["Google", "Amazon"],
                description: "Design a scalable load balancer",
                completed: false,
              }
            ]
          }
        ]
      }
    ]
  }
}

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courseData[params.courseId as keyof typeof courseData]

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
        <p className="text-muted-foreground">The course you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    )
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
                              <div className="space-y-6 pt-4">
                                {/* Theory Section */}
                                <div className="space-y-2">
                                  <h4 className="flex items-center gap-2 font-semibold text-primary">
                                    <Lightbulb className="h-4 w-4" />
                                    Concept & Theory
                                  </h4>
                                  <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-line border">
                                    {topic.theory}
                                  </div>
                                </div>

                                {/* Code Example Section */}
                                <div className="space-y-2">
                                  <h4 className="flex items-center gap-2 font-semibold text-primary">
                                    <Terminal className="h-4 w-4" />
                                    Code Example
                                  </h4>
                                  <div className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                                    <pre>{topic.code}</pre>
                                  </div>
                                </div>

                                {/* Problems Section */}
                                <div className="space-y-3">
                                  <h4 className="flex items-center gap-2 font-semibold text-primary">
                                    <Target className="h-4 w-4" />
                                    Practice Problems
                                  </h4>
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
