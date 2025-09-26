import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Course data
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
      },
      {
        id: 2,
        title: "Variables and Data Types",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Operators and Expressions",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 4,
        title: "Control Flow - If, Switch, Loops",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 5,
        title: "Arrays and Strings",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Functions and Recursion",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Pointers and Memory Management",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Structures and Unions",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 9,
        title: "File Handling in C",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Building a Console Application",
        duration: "180 mins",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "C++ Programming Mastery",
    category: "Programming",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=C%2B%2B+Programming",
    description: "Master modern C++ programming with object-oriented principles and STL.",
    lessons: [
      {
        id: 1,
        title: "Introduction to C++ and OOP Concepts",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Classes and Objects",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Inheritance and Polymorphism",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 4,
        title: "Templates and Generic Programming",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 5,
        title: "STL Containers and Algorithms",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Exception Handling",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Smart Pointers and Memory Management",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Modern C++ Features (C++11/14/17)",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 9,
        title: "Multithreading and Concurrency",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Building a Library System",
        duration: "180 mins",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Java Development",
    category: "Programming",
    level: "Beginner",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Java+Development",
    description: "Learn Java programming from basics to advanced concepts with practical projects.",
    lessons: [
      {
        id: 1,
        title: "Introduction to Java and Setup",
        duration: "45 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Java Basics and Data Types",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Object-Oriented Programming in Java",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 4,
        title: "Collections Framework",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 5,
        title: "Exception Handling and File I/O",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Multithreading Basics",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Java GUI Programming (Swing)",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Database Connectivity (JDBC)",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 9,
        title: "Unit Testing with JUnit",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Student Management System",
        duration: "180 mins",
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    price: "FREE",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=Python+Programming",
    description: "Master Python programming with practical examples and real-world applications.",
    lessons: [
      {
        id: 1,
        title: "Python Basics and Setup",
        duration: "45 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Data Types and Control Flow",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Functions and Modules",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 4,
        title: "Object-Oriented Programming",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 5,
        title: "File Handling and Exception Handling",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Working with Libraries (NumPy, Pandas)",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Web Scraping with Beautiful Soup",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Database Operations with SQLite",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 9,
        title: "GUI Programming with Tkinter",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Task Management App",
        duration: "180 mins",
        completed: false,
      },
    ],
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    category: "Web",
    level: "Beginner",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Web+Development",
    description: "Complete web development bootcamp covering frontend and backend technologies.",
    lessons: [
      {
        id: 1,
        title: "HTML5 Fundamentals",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 2,
        title: "CSS3 and Responsive Design",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 3,
        title: "JavaScript Basics",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 4,
        title: "DOM Manipulation",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 5,
        title: "Modern JavaScript (ES6+)",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 6,
        title: "React.js Fundamentals",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Node.js and Express.js",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 8,
        title: "MongoDB and Mongoose",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 9,
        title: "Authentication and Authorization",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Full Stack Social Media App",
        duration: "240 mins",
        completed: false,
      },
    ],
  },
  {
    id: 6,
    title: "Mobile App Development",
    category: "Development",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=App+Development",
    description: "Learn to build native mobile applications for iOS and Android platforms.",
    lessons: [
      {
        id: 1,
        title: "Introduction to React Native",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 2,
        title: "React Native Components",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Navigation and Routing",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 4,
        title: "State Management with Redux",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 5,
        title: "Working with APIs",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Native Device Features",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 7,
        title: "App Styling and Themes",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Data Persistence",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 9,
        title: "App Testing and Debugging",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: E-commerce Mobile App",
        duration: "240 mins",
        completed: false,
      },
    ],
  },
  {
    id: 7,
    title: "Full Stack Development",
    category: "Development",
    level: "Advanced",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Full+Stack",
    description: "Become a full stack developer with modern web technologies and best practices.",
    lessons: [
      {
        id: 1,
        title: "Modern Frontend Development",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Backend Development with Node.js",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Database Design and Management",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 4,
        title: "RESTful API Development",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 5,
        title: "Authentication and Security",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Cloud Deployment (AWS/Heroku)",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Testing and CI/CD",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Performance Optimization",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 9,
        title: "Microservices Architecture",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Enterprise Web Application",
        duration: "300 mins",
        completed: false,
      },
    ],
  },
  {
    id: 8,
    title: "JavaScript & React Mastery",
    category: "Web",
    level: "Intermediate",
    price: "FREE",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400&text=JavaScript+React",
    description: "Master modern JavaScript and React.js for building dynamic web applications.",
    lessons: [
      {
        id: 1,
        title: "Advanced JavaScript Concepts",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 2,
        title: "React Fundamentals and Hooks",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 3,
        title: "State Management with Redux",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 4,
        title: "React Router and Navigation",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 5,
        title: "API Integration and Axios",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Testing React Applications",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Performance Optimization",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Server-Side Rendering",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 9,
        title: "React Design Patterns",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Advanced React Application",
        duration: "240 mins",
        completed: false,
      },
    ],
  },
  {
    id: 9,
    title: "Linux Administration",
    category: "System",
    level: "Intermediate",
    price: "FREE",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400&text=Linux+Admin",
    description: "Learn Linux system administration from basics to advanced concepts.",
    lessons: [
      {
        id: 1,
        title: "Linux Fundamentals",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Command Line Mastery",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 3,
        title: "User and Permission Management",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 4,
        title: "Package Management",
        duration: "60 mins",
        completed: false,
      },
      {
        id: 5,
        title: "System Monitoring and Logging",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Network Configuration",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Shell Scripting",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Security and Firewall",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 9,
        title: "Server Management",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Server Setup and Security",
        duration: "240 mins",
        completed: false,
      },
    ],
  },
  {
    id: 10,
    title: "Ethical Hacking",
    category: "Security",
    level: "Advanced",
    price: "FREE",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400&text=Ethical+Hacking",
    description: "Learn ethical hacking and cybersecurity with hands-on practice.",
    lessons: [
      {
        id: 1,
        title: "Introduction to Cybersecurity",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 2,
        title: "Network Security Fundamentals",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 3,
        title: "Web Application Security",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 4,
        title: "System Hacking Techniques",
        duration: "180 mins",
        completed: false,
      },
      {
        id: 5,
        title: "Malware Analysis",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 6,
        title: "Wireless Network Security",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 7,
        title: "Cryptography",
        duration: "150 mins",
        completed: false,
      },
      {
        id: 8,
        title: "Social Engineering",
        duration: "90 mins",
        completed: false,
      },
      {
        id: 9,
        title: "Incident Response",
        duration: "120 mins",
        completed: false,
      },
      {
        id: 10,
        title: "Final Project: Security Assessment",
        duration: "300 mins",
        completed: false,
      },
    ],
  },
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
                <option value="security">Cyber Security</option>
                <option value="ai">AI & ML</option>
                <option value="mobile">Mobile Development</option>
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
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
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