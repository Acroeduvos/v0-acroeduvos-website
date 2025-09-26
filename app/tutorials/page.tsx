"use client"

import Link from "next/link"

export default function TutorialsPage() {
  const tutorials = [
    // C Programming
    {
      slug: "c-programming-basics",
      title: "C Programming Fundamentals",
      excerpt: "Learn the basics of C programming including variables, data types, control structures, and functions.",
      category: "C Programming",
      readTime: "15 min read",
    },
    {
      slug: "pointers-memory-management",
      title: "Pointers and Memory Management in C",
      excerpt: "Deep dive into pointers, memory allocation, and memory management techniques in C.",
      category: "C Programming",
      readTime: "20 min read",
    },
    {
      slug: "file-handling-c",
      title: "File Handling in C",
      excerpt: "Learn how to work with files in C, including reading, writing, and error handling.",
      category: "C Programming",
      readTime: "12 min read",
    },
    // C++ Programming
    {
      slug: "cpp-oop-concepts",
      title: "Object-Oriented Programming in C++",
      excerpt: "Master OOP concepts like classes, objects, inheritance, and polymorphism in C++.",
      category: "C++",
      readTime: "25 min read",
    },
    {
      slug: "cpp-stl",
      title: "C++ Standard Template Library (STL)",
      excerpt: "Comprehensive guide to STL containers, algorithms, and iterators.",
      category: "C++",
      readTime: "30 min read",
    },
    {
      slug: "modern-cpp-features",
      title: "Modern C++ Features (C++11/14/17)",
      excerpt: "Explore modern C++ features including auto, lambda expressions, and smart pointers.",
      category: "C++",
      readTime: "20 min read",
    },
    // Java Programming
    {
      slug: "java-basics",
      title: "Java Programming Basics",
      excerpt: "Introduction to Java programming with examples and best practices.",
      category: "Java",
      readTime: "15 min read",
    },
    {
      slug: "java-collections",
      title: "Java Collections Framework",
      excerpt: "Learn about Lists, Sets, Maps, and other collection types in Java.",
      category: "Java",
      readTime: "25 min read",
    },
    {
      slug: "java-multithreading",
      title: "Multithreading in Java",
      excerpt: "Understanding threads, synchronization, and concurrent programming in Java.",
      category: "Java",
      readTime: "30 min read",
    },
    // Python Programming
    {
      slug: "python-basics",
      title: "Python Programming Basics",
      excerpt: "Get started with Python programming fundamentals and syntax.",
      category: "Python",
      readTime: "15 min read",
    },
    {
      slug: "python-data-structures",
      title: "Python Data Structures",
      excerpt: "Learn about lists, tuples, dictionaries, and sets in Python.",
      category: "Python",
      readTime: "20 min read",
    },
    {
      slug: "python-libraries",
      title: "Essential Python Libraries",
      excerpt: "Overview of NumPy, Pandas, and other popular Python libraries.",
      category: "Python",
      readTime: "25 min read",
    },
    // Web Development
    {
      slug: "html-css-basics",
      title: "HTML & CSS Fundamentals",
      excerpt: "Learn the basics of web development with HTML and CSS.",
      category: "Web Development",
      readTime: "20 min read",
    },
    {
      slug: "javascript-dom",
      title: "JavaScript & DOM Manipulation",
      excerpt: "Master JavaScript and Document Object Model manipulation.",
      category: "Web Development",
      readTime: "25 min read",
    },
    {
      slug: "react-fundamentals",
      title: "React.js Fundamentals",
      excerpt: "Build modern web applications with React.js and hooks.",
      category: "Web Development",
      readTime: "30 min read",
    },
    // Data Structures
    {
      slug: "arrays-linked-lists",
      title: "Arrays and Linked Lists",
      excerpt: "Understanding fundamental data structures with examples.",
      category: "Data Structures",
      readTime: "20 min read",
    },
    {
      slug: "trees-graphs",
      title: "Trees and Graphs",
      excerpt: "Learn about tree structures, graph algorithms, and their applications.",
      category: "Data Structures",
      readTime: "25 min read",
    },
    {
      slug: "hash-tables",
      title: "Hash Tables and Hashing",
      excerpt: "Deep dive into hash tables, collision resolution, and applications.",
      category: "Data Structures",
      readTime: "20 min read",
    },
    // Algorithms
    {
      slug: "sorting-algorithms",
      title: "Sorting Algorithms",
      excerpt: "Learn various sorting algorithms and their implementations.",
      category: "Algorithms",
      readTime: "25 min read",
    },
    {
      slug: "searching-algorithms",
      title: "Searching Algorithms",
      excerpt: "Master different searching techniques and their applications.",
      category: "Algorithms",
      readTime: "20 min read",
    },
    {
      slug: "dynamic-programming",
      title: "Dynamic Programming",
      excerpt: "Understanding dynamic programming with practical examples.",
      category: "Algorithms",
      readTime: "30 min read",
    },
    // System Design
    {
      slug: "system-design-basics",
      title: "System Design Fundamentals",
      excerpt: "Learn the basics of designing scalable systems.",
      category: "System Design",
      readTime: "25 min read",
    },
    {
      slug: "microservices",
      title: "Microservices Architecture",
      excerpt: "Understanding microservices design patterns and best practices.",
      category: "System Design",
      readTime: "30 min read",
    },
    {
      slug: "database-design",
      title: "Database Design Patterns",
      excerpt: "Learn about database design, normalization, and optimization.",
      category: "System Design",
      readTime: "25 min read",
    },
    // Interview Preparation
    {
      slug: "coding-interview-prep",
      title: "Coding Interview Preparation",
      excerpt: "Tips and strategies for technical interviews.",
      category: "Interview Prep",
      readTime: "20 min read",
    },
    {
      slug: "system-design-interview",
      title: "System Design Interview Guide",
      excerpt: "Prepare for system design interviews with real examples.",
      category: "Interview Prep",
      readTime: "30 min read",
    },
    {
      slug: "behavioral-interview",
      title: "Behavioral Interview Guide",
      excerpt: "Master behavioral interviews with STAR technique.",
      category: "Interview Prep",
      readTime: "15 min read",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-purple-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tutorials</h1>
          <p className="mx-auto mt-4 max-w-2xl text-purple-100">
            Curated tutorials to learn faster—concise, practical, and certification-aligned.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((t) => (
              <Link
                key={t.slug}
                href={`/tutorials/${t.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 text-xs font-medium text-purple-700">{t.category}</div>
                <h3 className="text-lg font-bold">{t.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.excerpt}</p>
                <div className="mt-3 text-xs text-gray-500">{t.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
