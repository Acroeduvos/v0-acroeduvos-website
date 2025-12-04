"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Terminal,
  Copy
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

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
            
Common scenarios:
1. One pointer starts at the beginning, the other at the end (e.g., checking palindrome, Two Sum sorted).
2. Both pointers start at the beginning, one moving faster than the other (e.g., Floyd's Cycle Detection).
3. One pointer represents the current element, the other represents the position to overwrite (e.g., removing duplicates).`,
            code: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return []  # No solution found`,
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
            theory: `The Sliding Window pattern is used to perform a required operation on a specific window size of a given array or linked list, such as finding the longest subarray containing all 1s. Sliding Windows start from the 1st element and keep shifting right by one element and adjust the length of the window according to the problem that you are solving.`,
            code: `def max_sum_subarray(arr, k):
    max_sum = float('-inf')
    window_sum = 0
    start = 0
    
    for end in range(len(arr)):
        window_sum += arr[end]
        
        if end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[start]
            start += 1
            
    return max_sum`,
            problems: [
              {
                id: "longest-substring",
                title: "Longest Substring Without Repeating Characters",
                difficulty: "Medium",
                companies: ["Amazon", "Adobe"],
                description: "Find length of longest substring without repeating characters",
                completed: false,
              }
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
            title: "Fast & Slow Pointers",
            theory: "The Fast & Slow Pointer approach, also known as the Hare & Tortoise algorithm, is a pointer algorithm that uses two pointers which move through the array (or sequence/linked list) at different speeds. This approach is quite useful when dealing with cyclic linked lists or arrays.",
            code: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def hasCycle(head: ListNode) -> bool:
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
            
    return False`,
            problems: [
              {
                id: "linked-list-cycle",
                title: "Linked List Cycle",
                difficulty: "Easy",
                companies: ["Amazon", "Microsoft"],
                description: "Detect if a linked list has a cycle",
                completed: false
              }
            ]
          }
        ]
      }
    ],
  },
  "python": {
    title: "Python Programming",
    description: "Master Python programming from basics to advanced data science and web development.",
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
            title: "Variables & Data Types",
            theory: `Python is a dynamically typed language, meaning you don't need to declare the type of a variable.
            
Key Data Types:
- int: Integers (e.g., 5, -2)
- float: Floating point numbers (e.g., 3.14, -0.01)
- str: Strings (e.g., "Hello", 'Python')
- bool: Booleans (True, False)
- list: Ordered, mutable sequence (e.g., [1, 2, 3])
- tuple: Ordered, immutable sequence (e.g., (1, 2))
- dict: Key-value pairs (e.g., {'name': 'Alice', 'age': 30})`,
            code: `# Variables
x = 10
y = 3.14
name = "Alice"
is_student = True

# Lists
numbers = [1, 2, 3, 4, 5]
numbers.append(6)

# Dictionaries
person = {
    "name": "Bob",
    "age": 25,
    "city": "New York"
}
print(f"Hello, {person['name']}")`,
            problems: [
              {
                id: "python-hello-world",
                title: "Hello World",
                difficulty: "Easy",
                companies: [],
                description: "Print 'Hello, World!' to the console",
                completed: false,
              }
            ],
          },
          {
            title: "Control Flow",
            theory: "Python uses `if`, `elif`, and `else` for conditional logic, and `for` and `while` loops for iteration. Indentation is crucial in Python to define blocks of code.",
            code: `# If-Else
age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")

# For Loop
for i in range(5):
    print(i)  # Prints 0 to 4

# While Loop
count = 0
while count < 3:
    print(count)
    count += 1`,
            problems: [
              {
                id: "python-fizzbuzz",
                title: "FizzBuzz",
                difficulty: "Easy",
                companies: ["Amazon"],
                description: "Print numbers 1 to n, replacing multiples of 3 with Fizz and 5 with Buzz",
                completed: false
              }
            ]
          }
        ],
      },
    ],
  },
  "java": {
    title: "Java Programming",
    description: "Master Java programming from basics to enterprise development.",
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
        description: "Core Java concepts, OOP, and syntax",
        lessons: 12,
        problems: 20,
        duration: "2 weeks",
        completed: false,
        topics: [
          {
            title: "Classes & Objects",
            theory: `Java is an Object-Oriented Programming (OOP) language. Everything in Java is associated with classes and objects, along with its attributes and methods.
            
- **Class**: A blueprint for creating objects.
- **Object**: An instance of a class.`,
            code: `public class Car {
    String color;
    String model;

    public void drive() {
        System.out.println("Driving " + model);
    }

    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.model = "Tesla";
        myCar.drive();
    }
}`,
            problems: [
              {
                id: "java-class-basics",
                title: "Create a Class",
                difficulty: "Easy",
                companies: [],
                description: "Define a simple class with methods",
                completed: false,
              }
            ],
          }
        ]
      }
    ]
  },
  "cpp": {
    title: "C++ Programming",
    description: "Master C++ programming from basics to advanced OOP concepts.",
    level: "Intermediate",
    duration: "31.5 hours",
    students: "4.1k",
    rating: 4.9,
    progress: 0,
    instructor: "Emily Watson",
    instructorBio: "Systems Engineer",
    modules: [
      {
        id: 1,
        title: "C++ Basics & Pointers",
        description: "Memory management and core syntax",
        lessons: 15,
        problems: 25,
        duration: "2 weeks",
        completed: false,
        topics: [
          {
            title: "Pointers & References",
            theory: `Pointers are variables that store the memory address of another variable. They are a powerful feature in C++ allowing for direct memory manipulation.
                    
- **& Operator**: The address-of operator.
- *** Operator**: The dereference operator.`,
            code: `#include <iostream>
using namespace std;

int main() {
    int var = 20;
    int* ptr = &var;  // ptr holds the address of var

    cout << "Value of var: " << var << endl;
    cout << "Address of var: " << ptr << endl;
    cout << "Value pointed to by ptr: " << *ptr << endl;

    return 0;
}`,
            problems: [
              {
                id: "cpp-pointer-swap",
                title: "Swap with Pointers",
                difficulty: "Medium",
                companies: [],
                description: "Swap two numbers using pointers",
                completed: false
              }
            ]
          }
        ]
      }
    ]
  },
  "c": {
    title: "C Programming",
    description: "Learn C programming fundamentals and system programming.",
    level: "Beginner",
    duration: "24 hours",
    students: "3.2k",
    rating: 4.8,
    progress: 0,
    instructor: "Dr. Michael Kim",
    instructorBio: "Embedded Systems Engineer",
    modules: [
      {
        id: 1,
        title: "C Fundamentals",
        description: "Structure of C programs and memory",
        lessons: 10,
        problems: 15,
        duration: "1 week",
        completed: false,
        topics: [
          {
            title: "Structure & Syntax",
            theory: "C is a procedural language. A C program consists of functions, variables, and statements. The `main()` function is the entry point.",
            code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
            problems: [
              {
                id: "c-hello",
                title: "Hello World in C",
                difficulty: "Easy",
                companies: [],
                description: "Write your first C program",
                completed: false
              }
            ]
          }
        ]
      }
    ]
  },
  "system-design-mastery": {
    title: "System Design Mastery",
    description: "Learn to design scalable systems like the pros.",
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
        title: "Scalability Fundamentals",
        description: "Vertical vs Horizontal scaling, Load Balancing",
        lessons: 8,
        problems: 5,
        duration: "1 week",
        completed: false,
        topics: [
          {
            title: "Load Balancing",
            theory: `Load balancing refers to the process of distributing network traffic across multiple servers. This ensures no single server bears too much demand.
                    
Algorithms:
- Round Robin
- Least Connections
- IP Hash`,
            code: `# Pseudocode for Round Robin Load Balancer
class LoadBalancer:
    def __init__(self, servers):
        self.servers = servers
        self.current_index = 0

    def get_server(self):
        server = self.servers[self.current_index]
        self.current_index = (self.current_index + 1) % len(self.servers)
        return server`,
            problems: [
              {
                id: "design-lb",
                title: "Design a Load Balancer",
                difficulty: "Medium",
                companies: ["Google", "Amazon"],
                description: "Design a class for a round-robin load balancer",
                completed: false
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
  const { toast } = useToast()

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <p className="text-muted-foreground">The requested course "{params.courseId}" does not exist.</p>
        <Button asChild><Link href="/courses">Back to Courses</Link></Button>
      </div>
    )
  }

  const completedProblems = course.modules
    .flatMap((module) => module.topics.flatMap((topic) => topic.problems))
    .filter((problem) => problem.completed).length

  const totalProblems = course.modules.flatMap((module) => module.topics.flatMap((topic) => topic.problems)).length

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
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
                  <Progress value={totalProblems > 0 ? (completedProblems / totalProblems) * 100 : 0} className="h-3" />
                </div>
              </div>

              <Card className="lg:w-80 h-fit">
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
            <TabsList className="grid w-full grid-cols-3 max-w-md">
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
                      <Accordion type="single" collapsible className="w-full">
                        {module.topics.map((topic, topicIndex) => (
                          <AccordionItem key={topicIndex} value={`topic-${topicIndex}`}>
                            <AccordionTrigger className="text-left hover:no-underline hover:bg-muted/50 px-4 rounded-lg">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">{topic.title}</span>
                                <Badge variant="outline" className="ml-2 text-xs font-normal">
                                  {topic.problems.length} problems
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pt-4 pb-2">
                              {/* Theory Section */}
                              <div className="mb-6 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-semibold">
                                  <FileText className="h-4 w-4" />
                                  <h3>Theory & Concepts</h3>
                                </div>
                                <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 p-4 rounded-lg border">
                                  <p className="whitespace-pre-line">{topic.theory}</p>
                                </div>
                              </div>

                              {/* Code Example Section */}
                              <div className="mb-6 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-primary font-semibold">
                                    <Terminal className="h-4 w-4" />
                                    <h3>Code Example</h3>
                                  </div>
                                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(topic.code)}>
                                    <Copy className="h-3 w-3 mr-1" /> Copy
                                  </Button>
                                </div>
                                <div className="relative">
                                  <pre className="bg-gray-950 text-gray-50 p-4 rounded-lg overflow-x-auto font-mono text-sm border border-gray-800">
                                    <code>{topic.code}</code>
                                  </pre>
                                </div>
                              </div>

                              {/* Problems Section */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                                  <Code className="h-4 w-4" />
                                  <h3>Practice Problems</h3>
                                </div>
                                {topic.problems.map((problem) => (
                                  <div
                                    key={problem.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors bg-card"
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
                                        <Play className="mr-1 h-3 w-3" />
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
