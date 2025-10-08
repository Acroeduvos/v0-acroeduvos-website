import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Star, Trophy } from "lucide-react"
import Link from "next/link"

  const courses = [
    {
    id: "python",
    title: "Python Programming",
    description: "Master Python from basics to advanced with real-world projects and MNC interview questions",
    level: "Beginner to Advanced",
    duration: "10 weeks",
    students: "8.5k",
    rating: 4.9,
    progress: 0,
    problems: 189,
    topics: ["Syntax", "OOP", "Data Structures", "Libraries", "Web Scraping", "APIs", "Testing"],
    companies: ["Google", "Netflix", "Instagram", "Dropbox", "Spotify"],
    color: "bg-yellow-500",
  },
  {
    id: "java",
    title: "Java Programming",
    description: "Complete Java development with Spring Boot, enterprise patterns, and interview prep",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    students: "9.2k",
    rating: 4.8,
    progress: 0,
    problems: 234,
    topics: ["Core Java", "OOP", "Collections", "Multithreading", "JVM", "Design Patterns", "Spring"],
    companies: ["Oracle", "Amazon", "LinkedIn", "Uber", "Goldman Sachs"],
    color: "bg-red-600",
  },
  {
    id: "javascript",
    title: "JavaScript Mastery",
    description: "Modern JavaScript ES6+, DOM manipulation, async programming, and frameworks",
    level: "Beginner to Advanced",
    duration: "8 weeks",
    students: "12.1k",
    rating: 4.7,
    progress: 0,
    problems: 167,
    topics: ["ES6+", "DOM", "Async/Await", "Promises", "Closures", "Prototypes", "Modules"],
    companies: ["Facebook", "Airbnb", "Netflix", "Twitter", "Shopify"],
    color: "bg-yellow-400",
  },
  {
    id: "react",
    title: "React Development",
    description: "Build modern web apps with React, hooks, state management, and testing",
    level: "Intermediate",
    duration: "10 weeks",
    students: "7.8k",
      rating: 4.8,
    progress: 0,
    problems: 145,
    topics: ["Components", "Hooks", "State Management", "Router", "Testing", "Performance", "Next.js"],
    companies: ["Facebook", "Netflix", "Airbnb", "WhatsApp", "Discord"],
    color: "bg-blue-400",
  },
  {
    id: "nodejs",
    title: "Node.js Backend",
    description: "Server-side JavaScript with Express, databases, APIs, and microservices",
      level: "Intermediate",
    duration: "9 weeks",
    students: "5.6k",
    rating: 4.6,
    progress: 0,
    problems: 123,
    topics: ["Express", "APIs", "Authentication", "Databases", "Middleware", "Testing", "Deployment"],
    companies: ["Netflix", "LinkedIn", "Uber", "PayPal", "NASA"],
    color: "bg-green-600",
  },
  {
    id: "spring-boot",
    title: "Spring Boot Framework",
    description: "Enterprise Java development with Spring Boot, microservices, and cloud deployment",
    level: "Intermediate to Advanced",
    duration: "11 weeks",
    students: "4.3k",
    rating: 4.7,
    progress: 0,
    problems: 98,
    topics: ["Spring Core", "REST APIs", "JPA", "Security", "Microservices", "Testing", "Cloud"],
    companies: ["JPMorgan", "Wells Fargo", "Accenture", "TCS", "Infosys"],
    color: "bg-green-500",
  },
  {
    id: "csharp",
    title: "C# Programming",
    description: "Complete C# development with .NET, ASP.NET Core, and enterprise applications",
    level: "Beginner to Advanced",
    duration: "10 weeks",
    students: "3.9k",
    rating: 4.5,
    progress: 0,
    problems: 156,
    topics: ["C# Basics", "OOP", ".NET Core", "ASP.NET", "Entity Framework", "LINQ", "Testing"],
    companies: ["Microsoft", "Stack Overflow", "Unity", "Xamarin", "Accenture"],
    color: "bg-purple-600",
  },
  {
    id: "php",
    title: "PHP Web Development",
    description: "Server-side scripting with PHP, Laravel, databases, and modern web development",
    level: "Beginner to Intermediate",
    duration: "8 weeks",
    students: "4.7k",
    rating: 4.4,
    progress: 0,
    problems: 134,
    topics: ["PHP Basics", "OOP", "Laravel", "MySQL", "APIs", "Security", "Deployment"],
    companies: ["WordPress", "Facebook", "Slack", "Etsy", "Mailchimp"],
    color: "bg-indigo-500",
  },
  {
    id: "c",
    title: "C Programming",
    description: "Master the fundamentals with C programming, memory management, and system programming",
    level: "Beginner to Intermediate",
    duration: "8 weeks",
    students: "6.2k",
    rating: 4.6,
    progress: 0,
    problems: 178,
    topics: ["Syntax", "Pointers", "Memory Management", "File I/O", "Data Structures", "Algorithms"],
    companies: ["Intel", "NVIDIA", "Qualcomm", "Embedded Systems", "Linux"],
    color: "bg-gray-600",
  },
  {
    id: "cpp",
    title: "C++ Programming",
    description: "Advanced C++ with OOP, STL, templates, and competitive programming techniques",
    level: "Intermediate to Advanced",
    duration: "10 weeks",
    students: "5.8k",
      rating: 4.7,
    progress: 0,
    problems: 201,
    topics: ["OOP", "STL", "Templates", "Memory Management", "Multithreading", "Design Patterns"],
    companies: ["Google", "Microsoft", "Adobe", "Bloomberg", "Tesla"],
    color: "bg-blue-600",
  },
  {
    id: "html-css",
    title: "HTML & CSS Mastery",
    description: "Modern web design with HTML5, CSS3, responsive design, and animations",
      level: "Beginner",
    duration: "6 weeks",
    students: "15.3k",
    rating: 4.5,
    progress: 0,
    problems: 89,
    topics: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design", "Animations", "Sass"],
    companies: ["Any Web Company", "Freelance", "Startups", "Agencies", "E-commerce"],
    color: "bg-orange-500",
  },
  {
    id: "sql",
    title: "SQL & Database Design",
    description: "Master SQL queries, database design, optimization, and advanced database concepts",
    level: "Beginner to Advanced",
    duration: "7 weeks",
    students: "8.9k",
      rating: 4.8,
    progress: 0,
    problems: 167,
    topics: ["SQL Queries", "Joins", "Subqueries", "Indexing", "Stored Procedures", "Performance"],
    companies: ["Oracle", "Microsoft", "IBM", "Amazon", "Any Data Company"],
    color: "bg-cyan-600",
  },
  {
    id: "mysql",
    title: "MySQL Database",
    description: "Complete MySQL administration, optimization, and real-world database projects",
    level: "Beginner to Intermediate",
    duration: "6 weeks",
    students: "5.4k",
    rating: 4.6,
    progress: 0,
    problems: 112,
    topics: ["MySQL Basics", "Administration", "Optimization", "Replication", "Backup", "Security"],
    companies: ["Facebook", "Twitter", "YouTube", "GitHub", "Airbnb"],
    color: "bg-blue-500",
  },
  {
    id: "mongodb",
    title: "MongoDB NoSQL",
    description: "NoSQL database design, aggregation pipelines, and modern application development",
      level: "Intermediate",
    duration: "5 weeks",
    students: "3.8k",
    rating: 4.5,
    progress: 0,
    problems: 87,
    topics: ["Document DB", "Aggregation", "Indexing", "Sharding", "Replica Sets", "Atlas"],
    companies: ["MongoDB", "Uber", "eBay", "Adobe", "Cisco"],
    color: "bg-green-500",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master DSA with 300+ problems from Google, Microsoft, Amazon interviews",
    level: "Beginner to Advanced",
    duration: "14 weeks",
    students: "11.2k",
    rating: 4.9,
    progress: 0,
    problems: 347,
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Greedy", "Backtracking"],
    companies: ["Google", "Microsoft", "Amazon", "Facebook", "Apple"],
    color: "bg-red-500",
  },
  {
    id: "ai-ml",
      title: "AI & Machine Learning",
    description: "Complete AI/ML with Python, TensorFlow, deep learning, and real-world projects",
    level: "Intermediate to Advanced",
    duration: "12 weeks",
    students: "6.7k",
      rating: 4.8,
    progress: 0,
    problems: 134,
    topics: ["Python", "TensorFlow", "Neural Networks", "NLP", "Computer Vision", "Deep Learning"],
    companies: ["OpenAI", "Tesla", "NVIDIA", "DeepMind", "Anthropic"],
    color: "bg-purple-500",
  },
  {
    id: "dbms",
    title: "Database Management Systems",
    description: "Complete DBMS concepts, normalization, transactions, and database theory",
      level: "Intermediate",
    duration: "8 weeks",
    students: "4.9k",
    rating: 4.6,
    progress: 0,
    problems: 145,
    topics: ["RDBMS", "Normalization", "Transactions", "Concurrency", "Recovery", "Distributed DB"],
    companies: ["Oracle", "IBM", "Microsoft", "SAP", "Teradata"],
    color: "bg-teal-500",
  },
  {
    id: "aptitude",
    title: "Quantitative Aptitude",
    description: "Master mathematical reasoning, logical thinking, and problem-solving for placements",
    level: "Beginner to Advanced",
    duration: "6 weeks",
    students: "9.8k",
    rating: 4.7,
    progress: 0,
    problems: 456,
    topics: ["Number Systems", "Algebra", "Geometry", "Statistics", "Probability", "Time & Work"],
    companies: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant"],
    color: "bg-amber-500",
  },
  {
    id: "reasoning",
    title: "Logical Reasoning",
    description: "Develop analytical thinking, pattern recognition, and logical problem-solving skills",
    level: "Beginner to Advanced",
    duration: "5 weeks",
    students: "8.1k",
    rating: 4.6,
    progress: 0,
    problems: 389,
    topics: ["Verbal Reasoning", "Non-Verbal", "Analytical", "Critical Thinking", "Puzzles", "Patterns"],
    companies: ["All MNCs", "Government Jobs", "Banking", "Consulting", "Competitive Exams"],
    color: "bg-pink-500",
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Master Programming with <span className="text-primary">Free Expert Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start learning immediately with 20+ completely free courses covering all major technologies. No
              registration required - just click and start coding with real MNC interview questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="/practice">Start Practicing Now</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                <a href="/compiler">Try Free Compiler</a>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`h-1 ${course.color}`} />
                <CardHeader className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Trophy className="h-3 w-3" />
                        {course.problems}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </CardDescription>
        </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
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

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>

                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full" size="sm">
                      <BookOpen className="mr-2 h-3 w-3" />
                      Start Course
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
