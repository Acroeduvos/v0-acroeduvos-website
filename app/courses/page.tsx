import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Course data with detailed content
const courses = [
  {
    id: 1,
    title: "C Programming Fundamentals",
    category: "Programming",
    level: "Beginner",
    price: "FREE",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=C+Programming",
    description: "Master the fundamentals of C programming language with hands-on projects and exercises.",
    lessons: [
      {
        id: 1,
        title: "Introduction to C Programming",
        duration: "45 mins",
        completed: false,
        content: "History of C, Setting up environment, First program"
      },
      {
        id: 2,
        title: "Variables and Data Types",
        duration: "60 mins",
        completed: false,
        content: "int, float, char, arrays, strings"
      },
      {
        id: 3,
        title: "Control Flow",
        duration: "90 mins",
        completed: false,
        content: "if-else, switch, loops, break, continue"
      },
      {
        id: 4,
        title: "Functions",
        duration: "120 mins",
        completed: false,
        content: "Function declaration, parameters, return values"
      },
      {
        id: 5,
        title: "Pointers",
        duration: "150 mins",
        completed: false,
        content: "Memory addresses, pointer arithmetic, dynamic memory"
      },
      {
        id: 6,
        title: "Structures and Unions",
        duration: "120 mins",
        completed: false,
        content: "Custom data types, nested structures, unions"
      }
    ]
  },
  {
    id: 2,
    title: "C++ Advanced Concepts",
    category: "Programming",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=C%2B%2B+Programming",
    description: "Take your C++ skills to the next level with object-oriented programming and STL.",
    lessons: [
      {
        id: 1,
        title: "Object-Oriented Programming",
        duration: "120 mins",
        completed: false,
        content: "Classes, objects, inheritance, polymorphism"
      },
      {
        id: 2,
        title: "Standard Template Library",
        duration: "150 mins",
        completed: false,
        content: "Vectors, lists, maps, algorithms"
      },
      {
        id: 3,
        title: "Exception Handling",
        duration: "90 mins",
        completed: false,
        content: "Try-catch blocks, custom exceptions"
      },
      {
        id: 4,
        title: "Templates",
        duration: "120 mins",
        completed: false,
        content: "Function templates, class templates, specialization"
      },
      {
        id: 5,
        title: "Smart Pointers",
        duration: "90 mins",
        completed: false,
        content: "unique_ptr, shared_ptr, weak_ptr"
      }
    ]
  },
  {
    id: 3,
    title: "Java Development",
    category: "Programming",
    level: "Beginner",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Java+Development",
    description: "Learn Java programming from scratch and build cross-platform applications.",
    lessons: [
      {
        id: 1,
        title: "Java Basics",
        duration: "90 mins",
        completed: false,
        content: "JVM, variables, data types, operators"
      },
      {
        id: 2,
        title: "Object-Oriented Java",
        duration: "120 mins",
        completed: false,
        content: "Classes, inheritance, interfaces, packages"
      },
      {
        id: 3,
        title: "Collections Framework",
        duration: "150 mins",
        completed: false,
        content: "Lists, sets, maps, queues"
      },
      {
        id: 4,
        title: "Exception Handling",
        duration: "90 mins",
        completed: false,
        content: "Try-catch, throws, custom exceptions"
      },
      {
        id: 5,
        title: "Multithreading",
        duration: "120 mins",
        completed: false,
        content: "Threads, synchronization, concurrent collections"
      }
    ]
  },
  {
    id: 4,
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Python",
    description: "Master Python programming with practical examples and real-world applications.",
    lessons: [
      {
        id: 1,
        title: "Python Basics",
        duration: "60 mins",
        completed: false,
        content: "Variables, data types, operators, control flow"
      },
      {
        id: 2,
        title: "Functions and Modules",
        duration: "90 mins",
        completed: false,
        content: "Function definition, arguments, return values, modules"
      },
      {
        id: 3,
        title: "Data Structures",
        duration: "120 mins",
        completed: false,
        content: "Lists, tuples, sets, dictionaries"
      },
      {
        id: 4,
        title: "Object-Oriented Python",
        duration: "150 mins",
        completed: false,
        content: "Classes, inheritance, polymorphism"
      },
      {
        id: 5,
        title: "File Handling and Exceptions",
        duration: "90 mins",
        completed: false,
        content: "File operations, exception handling"
      }
    ]
  },
  {
    id: 5,
    title: "Web Development Fundamentals",
    category: "Web",
    level: "Beginner",
    price: "FREE",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=Web+Development",
    description: "Learn modern web development with HTML5, CSS3, and JavaScript.",
    lessons: [
      {
        id: 1,
        title: "HTML5 Essentials",
        duration: "90 mins",
        completed: false,
        content: "Document structure, elements, forms, semantic HTML"
      },
      {
        id: 2,
        title: "CSS3 Styling",
        duration: "120 mins",
        completed: false,
        content: "Selectors, box model, flexbox, grid"
      },
      {
        id: 3,
        title: "JavaScript Basics",
        duration: "150 mins",
        completed: false,
        content: "Variables, functions, DOM manipulation"
      },
      {
        id: 4,
        title: "Responsive Design",
        duration: "90 mins",
        completed: false,
        content: "Media queries, mobile-first approach"
      },
      {
        id: 5,
        title: "Web APIs",
        duration: "120 mins",
        completed: false,
        content: "Fetch API, local storage, geolocation"
      }
    ]
  },
  {
    id: 6,
    title: "Mobile App Development",
    category: "Development",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=App+Development",
    description: "Build native mobile applications for iOS and Android platforms.",
    lessons: [
      {
        id: 1,
        title: "React Native Basics",
        duration: "120 mins",
        completed: false,
        content: "Components, props, state management"
      },
      {
        id: 2,
        title: "Native Components",
        duration: "150 mins",
        completed: false,
        content: "UI components, navigation, animations"
      },
      {
        id: 3,
        title: "Device Features",
        duration: "90 mins",
        completed: false,
        content: "Camera, location, storage"
      },
      {
        id: 4,
        title: "App Publishing",
        duration: "120 mins",
        completed: false,
        content: "App Store and Play Store deployment"
      }
    ]
  },
  {
    id: 7,
    title: "Full Stack Development",
    category: "Development",
    level: "Advanced",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Full+Stack",
    description: "Master both frontend and backend development with modern technologies.",
    lessons: [
      {
        id: 1,
        title: "Frontend Development",
        duration: "180 mins",
        completed: false,
        content: "React.js, Redux, TypeScript"
      },
      {
        id: 2,
        title: "Backend Development",
        duration: "180 mins",
        completed: false,
        content: "Node.js, Express.js, MongoDB"
      },
      {
        id: 3,
        title: "API Development",
        duration: "150 mins",
        completed: false,
        content: "RESTful APIs, GraphQL"
      },
      {
        id: 4,
        title: "Authentication",
        duration: "120 mins",
        completed: false,
        content: "JWT, OAuth, session management"
      },
      {
        id: 5,
        title: "Deployment",
        duration: "90 mins",
        completed: false,
        content: "Docker, CI/CD, cloud platforms"
      }
    ]
  },
  {
    id: 8,
    title: "JavaScript Advanced",
    category: "Programming",
    level: "Intermediate",
    price: "FREE",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=JavaScript",
    description: "Deep dive into advanced JavaScript concepts and modern features.",
    lessons: [
      {
        id: 1,
        title: "ES6+ Features",
        duration: "120 mins",
        completed: false,
        content: "Arrow functions, destructuring, modules"
      },
      {
        id: 2,
        title: "Async Programming",
        duration: "150 mins",
        completed: false,
        content: "Promises, async/await, event loop"
      },
      {
        id: 3,
        title: "Design Patterns",
        duration: "180 mins",
        completed: false,
        content: "Singleton, factory, observer patterns"
      },
      {
        id: 4,
        title: "Testing",
        duration: "120 mins",
        completed: false,
        content: "Jest, testing best practices"
      }
    ]
  },
  {
    id: 9,
    title: "React.js Development",
    category: "Web",
    level: "Intermediate",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=React",
    description: "Build modern web applications with React.js ecosystem.",
    lessons: [
      {
        id: 1,
        title: "React Fundamentals",
        duration: "120 mins",
        completed: false,
        content: "Components, props, state, lifecycle"
      },
      {
        id: 2,
        title: "Hooks",
        duration: "150 mins",
        completed: false,
        content: "useState, useEffect, custom hooks"
      },
      {
        id: 3,
        title: "State Management",
        duration: "180 mins",
        completed: false,
        content: "Context API, Redux, Redux Toolkit"
      },
      {
        id: 4,
        title: "Performance",
        duration: "120 mins",
        completed: false,
        content: "Optimization, lazy loading, memoization"
      }
    ]
  },
  {
    id: 10,
    title: "Linux Administration",
    category: "System",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=Linux",
    description: "Master Linux system administration and server management.",
    lessons: [
      {
        id: 1,
        title: "Linux Basics",
        duration: "120 mins",
        completed: false,
        content: "Command line, file system, permissions"
      },
      {
        id: 2,
        title: "System Administration",
        duration: "150 mins",
        completed: false,
        content: "User management, services, processes"
      },
      {
        id: 3,
        title: "Network Configuration",
        duration: "120 mins",
        completed: false,
        content: "IP configuration, firewall, SSH"
      },
      {
        id: 4,
        title: "Shell Scripting",
        duration: "180 mins",
        completed: false,
        content: "Bash scripting, automation"
      }
    ]
  },
  {
    id: 11,
    title: "Ethical Hacking",
    category: "Security",
    level: "Advanced",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Ethical+Hacking",
    description: "Learn ethical hacking and cybersecurity techniques.",
    lessons: [
      {
        id: 1,
        title: "Introduction to Security",
        duration: "120 mins",
        completed: false,
        content: "Security concepts, ethical guidelines"
      },
      {
        id: 2,
        title: "Network Security",
        duration: "180 mins",
        completed: false,
        content: "Network scanning, vulnerability assessment"
      },
      {
        id: 3,
        title: "Web Security",
        duration: "150 mins",
        completed: false,
        content: "XSS, SQL injection, CSRF"
      },
      {
        id: 4,
        title: "System Security",
        duration: "180 mins",
        completed: false,
        content: "Malware analysis, reverse engineering"
      },
      {
        id: 5,
        title: "Security Tools",
        duration: "150 mins",
        completed: false,
        content: "Kali Linux, Metasploit, Wireshark"
      }
    ]
  }
]

// Course list page component
export default function CoursesPage({ params }: { params?: { id: string } }) {
  // If we have an ID parameter, show the course details page
  if (params?.id) {
    const course = courses.find(c => c.id.toString() === params.id) || courses[0]
    const completedLessons = course.lessons?.filter((lesson) => lesson.completed).length || 0
    const progress = course.lessons ? (completedLessons / course.lessons.length) * 100 : 0

    const handleEnroll = () => {
      alert("Welcome! All courses are now free to access. You can start learning immediately!")
    }

    return (
      <div className="container py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-muted-foreground">{course.description}</p>
            {course.lessons && (
              <>
                <div className="mt-4">
                  <Progress value={progress} />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {completedLessons} of {course.lessons.length} lessons completed
                  </p>
                </div>
                <Button className="mt-6 w-full bg-black" onClick={handleEnroll}>
                  Start Learning Free
                </Button>
              </>
            )}
          </div>
          {course.lessons && (
            <div className="grid gap-4">
              {course.lessons.map((lesson) => (
                <Card key={lesson.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {lesson.title}
                    </CardTitle>
                    <Button variant="link" className="h-auto p-0 text-black">
                      Start Free
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Duration: {lesson.duration}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {lesson.content}
                    </div>
                    {lesson.completed && (
                      <div className="mt-2">
                        <span className="text-sm font-medium text-green-600">
                          ✓ Completed
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Otherwise, show the course list page
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-purple-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Our Courses</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100 md:text-xl">
            Explore our wide range of programming and technology courses designed to help you achieve certification
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex w-full flex-wrap gap-4 md:w-auto">
              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="web">Web Development</option>
                <option value="security">Security</option>
                <option value="development">Development</option>
                <option value="system">System</option>
              </select>

              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select className="rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses-list" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                      {course.category}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{course.rating} ★★★★★</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                  <p className="mb-4 text-gray-600">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">{course.price}</span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                    >
                      Start Free
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white">1</button>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                10
              </button>
              <button className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}