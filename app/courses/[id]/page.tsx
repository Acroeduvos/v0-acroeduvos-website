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
  {
    id: "2",
    title: "C++ Advanced Concepts",
    description: "Take your C++ skills to the next level with object-oriented programming and STL.",
    level: "Intermediate",
    duration: "25 hours",
    students: 2890,
    rating: 4.7,
    instructor: "Prof. Maria Rodriguez",
    progress: 0,
    completedLessons: 0,
    totalLessons: 18,
    lastAccessed: "Not started",
    overview: `This advanced C++ course builds upon fundamental programming concepts to explore object-oriented programming, the Standard Template Library (STL), and modern C++ features. You'll learn to write efficient, maintainable C++ code using industry best practices.

The course covers advanced topics including classes, inheritance, polymorphism, templates, STL containers and algorithms, smart pointers, and exception handling. Through hands-on projects and real-world examples, you'll develop the skills needed to build complex software applications.`,
    prerequisites: [
      "Solid understanding of C programming fundamentals",
      "Basic knowledge of data structures and algorithms",
      "Experience with at least one programming language",
      "A C++ compiler (GCC, Clang, or Visual Studio)",
    ],
    whatYouWillLearn: [
      "Master object-oriented programming concepts in C++",
      "Implement classes, inheritance, and polymorphism",
      "Work with the Standard Template Library (STL)",
      "Use templates for generic programming",
      "Handle exceptions and error management",
      "Implement smart pointers and memory management",
      "Apply modern C++ features and best practices",
    ],
    modules: [
      {
        title: "Object-Oriented Programming Fundamentals",
        lessons: [
          { title: "Introduction to OOP in C++", duration: "20 min", type: "video", completed: false },
          { title: "Classes and Objects", duration: "30 min", type: "video", completed: false },
          { title: "Constructors and Destructors", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Basic Classes", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Inheritance and Polymorphism",
        lessons: [
          { title: "Understanding Inheritance", duration: "30 min", type: "video", completed: false },
          { title: "Virtual Functions and Polymorphism", duration: "25 min", type: "video", completed: false },
          { title: "Abstract Classes and Interfaces", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Inheritance Hierarchy", duration: "75 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Templates and Generic Programming",
        lessons: [
          { title: "Function Templates", duration: "25 min", type: "video", completed: false },
          { title: "Class Templates", duration: "30 min", type: "video", completed: false },
          { title: "Template Specialization", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Template Implementation", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Standard Template Library (STL)",
        lessons: [
          { title: "STL Containers Overview", duration: "30 min", type: "video", completed: false },
          { title: "STL Algorithms", duration: "25 min", type: "video", completed: false },
          { title: "Iterators and Ranges", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: STL Applications", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Advanced C++ Features",
        lessons: [
          { title: "Smart Pointers", duration: "25 min", type: "video", completed: false },
          { title: "Exception Handling", duration: "20 min", type: "video", completed: false },
          { title: "Lambda Expressions", duration: "15 min", type: "video", completed: false },
          { title: "Coding Exercise: Advanced Features", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Final Project",
        lessons: [
          { title: "Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Project Requirements", duration: "10 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "180 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 75% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 80%",
    ],
  },
  {
    id: "3",
    title: "Java Development",
    description: "Learn Java programming from scratch and build cross-platform applications.",
    level: "Beginner",
    duration: "30 hours",
    students: 4200,
    rating: 4.6,
    instructor: "Dr. James Wilson",
    progress: 0,
    completedLessons: 0,
    totalLessons: 20,
    lastAccessed: "Not started",
    overview: `This comprehensive Java course takes you from absolute beginner to confident Java developer. You'll learn the fundamentals of Java programming, object-oriented concepts, and how to build real-world applications.

The course covers everything from basic syntax and data types to advanced topics like multithreading, collections framework, and database connectivity. You'll work on practical projects that demonstrate real-world Java development scenarios and best practices.`,
    prerequisites: [
      "No prior programming experience required",
      "Basic computer literacy",
      "A computer with Java Development Kit (JDK) installed",
      "Text editor or IDE (IntelliJ IDEA, Eclipse, or VS Code)",
    ],
    whatYouWillLearn: [
      "Master Java syntax and core programming concepts",
      "Understand object-oriented programming principles",
      "Work with Java collections and data structures",
      "Handle exceptions and error management",
      "Implement multithreading and concurrency",
      "Connect to databases using JDBC",
      "Build GUI applications with Swing/JavaFX",
    ],
    modules: [
      {
        title: "Java Fundamentals",
        lessons: [
          { title: "Introduction to Java", duration: "20 min", type: "video", completed: false },
          { title: "Setting up Java Development Environment", duration: "15 min", type: "video", completed: false },
          { title: "Variables, Data Types, and Operators", duration: "25 min", type: "video", completed: false },
          { title: "Control Structures", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Basic Java Programs", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Object-Oriented Programming",
        lessons: [
          { title: "Classes and Objects", duration: "30 min", type: "video", completed: false },
          { title: "Inheritance and Polymorphism", duration: "25 min", type: "video", completed: false },
          { title: "Encapsulation and Abstraction", duration: "20 min", type: "video", completed: false },
          { title: "Interfaces and Abstract Classes", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: OOP Implementation", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Java Collections and Generics",
        lessons: [
          { title: "ArrayList and LinkedList", duration: "25 min", type: "video", completed: false },
          { title: "HashMap and HashSet", duration: "20 min", type: "video", completed: false },
          { title: "Generics in Java", duration: "25 min", type: "video", completed: false },
          { title: "Streams and Lambda Expressions", duration: "30 min", type: "video", completed: false },
          { title: "Coding Exercise: Collections Practice", duration: "75 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Exception Handling and File I/O",
        lessons: [
          { title: "Exception Handling Basics", duration: "25 min", type: "video", completed: false },
          { title: "Custom Exceptions", duration: "20 min", type: "video", completed: false },
          { title: "File Reading and Writing", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: File Operations", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Multithreading and Concurrency",
        lessons: [
          { title: "Thread Creation and Management", duration: "30 min", type: "video", completed: false },
          { title: "Synchronization", duration: "25 min", type: "video", completed: false },
          { title: "Thread Pools and Executors", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Multithreaded Applications", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Database Connectivity and Final Project",
        lessons: [
          { title: "JDBC Introduction", duration: "25 min", type: "video", completed: false },
          { title: "Database Operations", duration: "30 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "180 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
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
  {
    id: "4",
    title: "Web Development Bootcamp",
    description: "Comprehensive course covering HTML, CSS, JavaScript, and modern frameworks.",
    level: "Beginner",
    duration: "40 hours",
    students: 5600,
    rating: 4.8,
    instructor: "Sarah Johnson",
    progress: 0,
    completedLessons: 0,
    totalLessons: 24,
    lastAccessed: "Not started",
    overview: `This comprehensive web development bootcamp covers everything you need to become a full-stack web developer. You'll learn HTML, CSS, JavaScript, and modern frameworks like React and Node.js.

The course includes hands-on projects, real-world applications, and industry best practices. By the end, you'll be able to build responsive, interactive websites and web applications from scratch.`,
    prerequisites: [
      "Basic computer literacy",
      "No prior programming experience required",
      "A computer with internet connection",
      "Text editor (VS Code recommended)",
    ],
    whatYouWillLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Create interactive web pages with JavaScript",
      "Work with modern CSS frameworks like Bootstrap",
      "Build dynamic web applications with React",
      "Implement server-side logic with Node.js",
      "Connect to databases and handle data",
      "Deploy web applications to the cloud",
    ],
    modules: [
      {
        title: "HTML5 Fundamentals",
        lessons: [
          { title: "Introduction to HTML", duration: "20 min", type: "video", completed: false },
          { title: "HTML Structure and Elements", duration: "25 min", type: "video", completed: false },
          { title: "Forms and Input Elements", duration: "30 min", type: "video", completed: false },
          { title: "Semantic HTML5", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Building Your First Webpage", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "CSS3 Styling and Layout",
        lessons: [
          { title: "CSS Basics and Selectors", duration: "25 min", type: "video", completed: false },
          { title: "Box Model and Layout", duration: "30 min", type: "video", completed: false },
          { title: "Flexbox and Grid Layout", duration: "35 min", type: "video", completed: false },
          { title: "Responsive Design", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Styling and Layout", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "JavaScript Fundamentals",
        lessons: [
          { title: "JavaScript Basics", duration: "30 min", type: "video", completed: false },
          { title: "DOM Manipulation", duration: "25 min", type: "video", completed: false },
          { title: "Events and Event Handling", duration: "20 min", type: "video", completed: false },
          { title: "Asynchronous JavaScript", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Interactive Web Pages", duration: "75 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Modern JavaScript and ES6+",
        lessons: [
          { title: "ES6+ Features", duration: "30 min", type: "video", completed: false },
          { title: "Modules and Imports", duration: "20 min", type: "video", completed: false },
          { title: "Promises and Async/Await", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Modern JavaScript", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "React Development",
        lessons: [
          { title: "React Introduction", duration: "25 min", type: "video", completed: false },
          { title: "Components and Props", duration: "30 min", type: "video", completed: false },
          { title: "State and Hooks", duration: "35 min", type: "video", completed: false },
          { title: "React Router", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: React Application", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Backend Development and Final Project",
        lessons: [
          { title: "Node.js Introduction", duration: "25 min", type: "video", completed: false },
          { title: "Express.js Framework", duration: "30 min", type: "video", completed: false },
          { title: "Database Integration", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "240 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
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
  {
    id: "5",
    title: "Cyber Security Essentials",
    description: "Learn essential cybersecurity concepts, tools, and best practices.",
    level: "Intermediate",
    duration: "35 hours",
    students: 3200,
    rating: 4.7,
    instructor: "Alex Thompson",
    progress: 0,
    completedLessons: 0,
    totalLessons: 22,
    lastAccessed: "Not started",
    overview: `This comprehensive cybersecurity course covers essential concepts, tools, and best practices to protect digital assets and systems. You'll learn about various attack vectors, defense mechanisms, and how to implement security measures in real-world scenarios.

The course includes hands-on labs, penetration testing exercises, and case studies from actual security incidents. You'll gain practical experience with security tools and techniques used by cybersecurity professionals.`,
    prerequisites: [
      "Basic understanding of computer networks",
      "Familiarity with operating systems (Windows/Linux)",
      "Basic knowledge of programming concepts",
      "A computer with virtualization software (VirtualBox/VMware)",
    ],
    whatYouWillLearn: [
      "Understand common cyber threats and attack vectors",
      "Implement network security measures",
      "Conduct vulnerability assessments",
      "Use penetration testing tools and techniques",
      "Apply cryptography and encryption methods",
      "Develop incident response procedures",
      "Create security policies and compliance frameworks",
    ],
    modules: [
      {
        title: "Introduction to Cybersecurity",
        lessons: [
          { title: "Cybersecurity Fundamentals", duration: "25 min", type: "video", completed: false },
          { title: "Threat Landscape Overview", duration: "20 min", type: "video", completed: false },
          { title: "Security Frameworks and Standards", duration: "30 min", type: "video", completed: false },
          { title: "Risk Assessment Basics", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Security Assessment", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Network Security",
        lessons: [
          { title: "Network Security Fundamentals", duration: "30 min", type: "video", completed: false },
          { title: "Firewalls and Intrusion Detection", duration: "25 min", type: "video", completed: false },
          { title: "VPN and Remote Access Security", duration: "20 min", type: "video", completed: false },
          { title: "Wireless Security", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Network Security Implementation", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Vulnerability Assessment and Penetration Testing",
        lessons: [
          { title: "Vulnerability Scanning", duration: "30 min", type: "video", completed: false },
          { title: "Penetration Testing Methodology", duration: "25 min", type: "video", completed: false },
          { title: "Common Attack Techniques", duration: "30 min", type: "video", completed: false },
          { title: "Lab Exercise: Penetration Testing", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Cryptography and Encryption",
        lessons: [
          { title: "Cryptography Fundamentals", duration: "25 min", type: "video", completed: false },
          { title: "Symmetric and Asymmetric Encryption", duration: "30 min", type: "video", completed: false },
          { title: "Digital Certificates and PKI", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Encryption Implementation", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Incident Response and Forensics",
        lessons: [
          { title: "Incident Response Planning", duration: "25 min", type: "video", completed: false },
          { title: "Digital Forensics Basics", duration: "30 min", type: "video", completed: false },
          { title: "Evidence Collection and Preservation", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Incident Response Simulation", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Security Policies and Compliance",
        lessons: [
          { title: "Security Policy Development", duration: "25 min", type: "video", completed: false },
          { title: "Compliance Frameworks", duration: "30 min", type: "video", completed: false },
          { title: "Security Awareness Training", duration: "20 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "180 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 75% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 80%",
    ],
  },
  {
    id: "6",
    title: "Mobile App Development",
    description: "Build native mobile applications for iOS and Android platforms.",
    level: "Intermediate",
    duration: "45 hours",
    students: 3800,
    rating: 4.5,
    instructor: "Emily Chen",
    progress: 0,
    completedLessons: 0,
    totalLessons: 26,
    lastAccessed: "Not started",
    overview: `This comprehensive mobile app development course covers both iOS and Android development using modern frameworks and tools. You'll learn to build native mobile applications from scratch using React Native, Flutter, and platform-specific technologies.

The course includes hands-on projects, real-world app development scenarios, and industry best practices. You'll gain experience with app store deployment, user interface design, and mobile-specific features like push notifications and device integration.`,
    prerequisites: [
      "Basic knowledge of JavaScript or Dart",
      "Understanding of programming fundamentals",
      "A computer with mobile development tools installed",
      "iOS device or Android device for testing (recommended)",
    ],
    whatYouWillLearn: [
      "Build cross-platform mobile apps with React Native",
      "Develop native iOS apps with Swift",
      "Create Android apps with Kotlin",
      "Design responsive mobile user interfaces",
      "Implement mobile-specific features and APIs",
      "Handle app state management and data persistence",
      "Deploy apps to app stores",
    ],
    modules: [
      {
        title: "Mobile Development Fundamentals",
        lessons: [
          { title: "Introduction to Mobile Development", duration: "25 min", type: "video", completed: false },
          { title: "Platform Differences: iOS vs Android", duration: "20 min", type: "video", completed: false },
          { title: "Mobile UI/UX Design Principles", duration: "30 min", type: "video", completed: false },
          { title: "Development Environment Setup", duration: "35 min", type: "video", completed: false },
          { title: "Coding Exercise: First Mobile App", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "React Native Development",
        lessons: [
          { title: "React Native Introduction", duration: "30 min", type: "video", completed: false },
          { title: "Components and Navigation", duration: "35 min", type: "video", completed: false },
          { title: "State Management with Redux", duration: "40 min", type: "video", completed: false },
          { title: "Native Module Integration", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: React Native App", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "iOS Development with Swift",
        lessons: [
          { title: "Swift Language Basics", duration: "30 min", type: "video", completed: false },
          { title: "UIKit and Interface Builder", duration: "35 min", type: "video", completed: false },
          { title: "SwiftUI Framework", duration: "40 min", type: "video", completed: false },
          { title: "Core Data and Persistence", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: iOS App Development", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Android Development with Kotlin",
        lessons: [
          { title: "Kotlin Language Fundamentals", duration: "30 min", type: "video", completed: false },
          { title: "Android Studio and Layouts", duration: "35 min", type: "video", completed: false },
          { title: "Activities and Fragments", duration: "30 min", type: "video", completed: false },
          { title: "Room Database and Persistence", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Android App Development", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Advanced Mobile Features",
        lessons: [
          { title: "Push Notifications", duration: "30 min", type: "video", completed: false },
          { title: "Location Services and Maps", duration: "35 min", type: "video", completed: false },
          { title: "Camera and Media Integration", duration: "30 min", type: "video", completed: false },
          { title: "Offline Functionality", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Advanced Features", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "App Deployment and Final Project",
        lessons: [
          { title: "App Store Guidelines", duration: "25 min", type: "video", completed: false },
          { title: "App Store Deployment Process", duration: "30 min", type: "video", completed: false },
          { title: "Performance Optimization", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "240 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
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
  {
    id: "7",
    title: "AI & Machine Learning",
    description: "Dive into artificial intelligence and machine learning algorithms and applications.",
    level: "Advanced",
    duration: "50 hours",
    students: 2800,
    rating: 4.9,
    instructor: "Dr. Michael Zhang",
    progress: 0,
    completedLessons: 0,
    totalLessons: 28,
    lastAccessed: "Not started",
    overview: `This advanced course provides a comprehensive introduction to artificial intelligence and machine learning. You'll learn about various ML algorithms, deep learning techniques, and how to apply them to solve real-world problems.

The course covers supervised and unsupervised learning, neural networks, natural language processing, computer vision, and model deployment. You'll work with popular frameworks like TensorFlow and PyTorch, and build practical AI applications.`,
    prerequisites: [
      "Strong foundation in Python programming",
      "Understanding of linear algebra and statistics",
      "Basic knowledge of calculus",
      "A computer with Python and ML libraries installed",
    ],
    whatYouWillLearn: [
      "Understand core machine learning concepts and algorithms",
      "Implement supervised and unsupervised learning models",
      "Build and train neural networks",
      "Apply deep learning to computer vision and NLP",
      "Use popular ML frameworks like TensorFlow and PyTorch",
      "Evaluate and optimize model performance",
      "Deploy ML models to production environments",
    ],
    modules: [
      {
        title: "Introduction to Machine Learning",
        lessons: [
          { title: "ML Fundamentals and Types", duration: "30 min", type: "video", completed: false },
          { title: "Data Preprocessing and Feature Engineering", duration: "35 min", type: "video", completed: false },
          { title: "Model Evaluation and Validation", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Data Analysis and Preprocessing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Supervised Learning Algorithms",
        lessons: [
          { title: "Linear and Logistic Regression", duration: "35 min", type: "video", completed: false },
          { title: "Decision Trees and Random Forests", duration: "30 min", type: "video", completed: false },
          { title: "Support Vector Machines", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Classification and Regression", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Unsupervised Learning",
        lessons: [
          { title: "Clustering Algorithms (K-means, Hierarchical)", duration: "30 min", type: "video", completed: false },
          { title: "Dimensionality Reduction (PCA, t-SNE)", duration: "25 min", type: "video", completed: false },
          { title: "Association Rules and Market Basket Analysis", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Unsupervised Learning", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Neural Networks and Deep Learning",
        lessons: [
          { title: "Neural Network Fundamentals", duration: "35 min", type: "video", completed: false },
          { title: "Backpropagation and Training", duration: "30 min", type: "video", completed: false },
          { title: "Convolutional Neural Networks (CNNs)", duration: "40 min", type: "video", completed: false },
          { title: "Recurrent Neural Networks (RNNs)", duration: "35 min", type: "video", completed: false },
          { title: "Lab Exercise: Deep Learning Models", duration: "180 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Computer Vision and NLP",
        lessons: [
          { title: "Image Classification and Object Detection", duration: "40 min", type: "video", completed: false },
          { title: "Natural Language Processing Basics", duration: "35 min", type: "video", completed: false },
          { title: "Text Classification and Sentiment Analysis", duration: "30 min", type: "video", completed: false },
          { title: "Lab Exercise: CV and NLP Applications", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Model Deployment and Final Project",
        lessons: [
          { title: "Model Optimization and Tuning", duration: "30 min", type: "video", completed: false },
          { title: "Model Deployment Strategies", duration: "25 min", type: "video", completed: false },
          { title: "MLOps and Model Monitoring", duration: "20 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "300 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "120 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 80% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 85%",
    ],
  },
  {
    id: "8",
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis, visualization, and machine learning.",
    level: "Intermediate",
    duration: "35 hours",
    students: 4500,
    rating: 4.7,
    instructor: "Dr. Lisa Wang",
    progress: 0,
    completedLessons: 0,
    totalLessons: 23,
    lastAccessed: "Not started",
    overview: `This comprehensive course teaches Python programming specifically for data science applications. You'll learn to use Python libraries like Pandas, NumPy, Matplotlib, and Scikit-learn to analyze data, create visualizations, and build machine learning models.

The course covers data manipulation, statistical analysis, data visualization, and machine learning fundamentals. You'll work with real-world datasets and learn industry best practices for data science workflows.`,
    prerequisites: [
      "Basic programming knowledge (any language)",
      "Understanding of basic statistics",
      "A computer with Python and data science libraries installed",
      "Basic familiarity with command line interface",
    ],
    whatYouWillLearn: [
      "Master Python libraries for data science (Pandas, NumPy, Matplotlib)",
      "Perform data cleaning and preprocessing",
      "Create compelling data visualizations",
      "Apply statistical analysis techniques",
      "Build machine learning models with Scikit-learn",
      "Work with different data formats (CSV, JSON, databases)",
      "Implement data science workflows and best practices",
    ],
    modules: [
      {
        title: "Python Fundamentals for Data Science",
        lessons: [
          { title: "Python Basics and Data Types", duration: "25 min", type: "video", completed: false },
          { title: "Control Structures and Functions", duration: "20 min", type: "video", completed: false },
          { title: "Working with Libraries and Packages", duration: "15 min", type: "video", completed: false },
          { title: "Coding Exercise: Python Fundamentals", duration: "60 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "NumPy and Array Operations",
        lessons: [
          { title: "Introduction to NumPy", duration: "25 min", type: "video", completed: false },
          { title: "Array Creation and Manipulation", duration: "30 min", type: "video", completed: false },
          { title: "Mathematical Operations on Arrays", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: NumPy Operations", duration: "75 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Pandas for Data Manipulation",
        lessons: [
          { title: "DataFrames and Series", duration: "30 min", type: "video", completed: false },
          { title: "Data Loading and Exporting", duration: "25 min", type: "video", completed: false },
          { title: "Data Cleaning and Preprocessing", duration: "35 min", type: "video", completed: false },
          { title: "Grouping and Aggregation", duration: "30 min", type: "video", completed: false },
          { title: "Coding Exercise: Data Manipulation", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Data Visualization",
        lessons: [
          { title: "Matplotlib Fundamentals", duration: "30 min", type: "video", completed: false },
          { title: "Seaborn for Statistical Visualization", duration: "35 min", type: "video", completed: false },
          { title: "Plotly for Interactive Visualizations", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Data Visualization", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Statistical Analysis",
        lessons: [
          { title: "Descriptive Statistics", duration: "25 min", type: "video", completed: false },
          { title: "Inferential Statistics", duration: "30 min", type: "video", completed: false },
          { title: "Hypothesis Testing", duration: "35 min", type: "video", completed: false },
          { title: "Coding Exercise: Statistical Analysis", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Machine Learning with Scikit-learn",
        lessons: [
          { title: "Introduction to Machine Learning", duration: "30 min", type: "video", completed: false },
          { title: "Supervised Learning Algorithms", duration: "35 min", type: "video", completed: false },
          { title: "Model Evaluation and Validation", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Machine Learning Models", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Final Project and Advanced Topics",
        lessons: [
          { title: "Working with APIs and Web Scraping", duration: "30 min", type: "video", completed: false },
          { title: "Database Integration", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "180 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
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
  {
    id: "9",
    title: "Ethical Hacking & Penetration Testing",
    description: "Master ethical hacking techniques and penetration testing methodologies.",
    level: "Advanced",
    duration: "60 hours",
    students: 2100,
    rating: 4.8,
    instructor: "David Martinez",
    progress: 0,
    completedLessons: 0,
    totalLessons: 32,
    lastAccessed: "Not started",
    overview: `This comprehensive ethical hacking course covers advanced penetration testing techniques, vulnerability assessment, and security auditing. You'll learn to identify and exploit security vulnerabilities in a controlled environment while following ethical guidelines.

The course includes hands-on labs, real-world attack simulations, and defensive strategies. You'll gain practical experience with industry-standard tools and methodologies used by professional penetration testers and security consultants.`,
    prerequisites: [
      "Strong understanding of networking protocols",
      "Experience with Linux command line",
      "Basic knowledge of programming (Python recommended)",
      "A computer with virtualization software and ethical hacking tools",
    ],
    whatYouWillLearn: [
      "Master penetration testing methodologies and frameworks",
      "Identify and exploit various types of vulnerabilities",
      "Use professional hacking tools and techniques",
      "Conduct network and web application security assessments",
      "Perform social engineering and physical security tests",
      "Write comprehensive penetration testing reports",
      "Implement effective security countermeasures",
    ],
    modules: [
      {
        title: "Ethical Hacking Fundamentals",
        lessons: [
          { title: "Introduction to Ethical Hacking", duration: "30 min", type: "video", completed: false },
          { title: "Legal and Ethical Considerations", duration: "25 min", type: "video", completed: false },
          { title: "Penetration Testing Methodologies", duration: "35 min", type: "video", completed: false },
          { title: "Lab Exercise: Setting up Hacking Environment", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Reconnaissance and Information Gathering",
        lessons: [
          { title: "Passive Information Gathering", duration: "30 min", type: "video", completed: false },
          { title: "Active Reconnaissance Techniques", duration: "35 min", type: "video", completed: false },
          { title: "OSINT and Social Media Intelligence", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Information Gathering", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Network Penetration Testing",
        lessons: [
          { title: "Network Scanning and Enumeration", duration: "35 min", type: "video", completed: false },
          { title: "Vulnerability Assessment", duration: "30 min", type: "video", completed: false },
          { title: "Exploitation Techniques", duration: "40 min", type: "video", completed: false },
          { title: "Post-Exploitation and Persistence", duration: "35 min", type: "video", completed: false },
          { title: "Lab Exercise: Network Penetration", duration: "180 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Web Application Security",
        lessons: [
          { title: "Web Application Vulnerabilities", duration: "35 min", type: "video", completed: false },
          { title: "SQL Injection and XSS", duration: "40 min", type: "video", completed: false },
          { title: "Authentication and Session Management", duration: "30 min", type: "video", completed: false },
          { title: "Lab Exercise: Web App Penetration", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Wireless and Mobile Security",
        lessons: [
          { title: "Wireless Network Security", duration: "30 min", type: "video", completed: false },
          { title: "Mobile Application Security", duration: "35 min", type: "video", completed: false },
          { title: "IoT Security Assessment", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Wireless and Mobile Testing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Social Engineering and Physical Security",
        lessons: [
          { title: "Social Engineering Techniques", duration: "30 min", type: "video", completed: false },
          { title: "Physical Security Assessment", duration: "25 min", type: "video", completed: false },
          { title: "Phishing and Email Security", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Social Engineering", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "25 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Reporting and Final Project",
        lessons: [
          { title: "Penetration Testing Report Writing", duration: "30 min", type: "video", completed: false },
          { title: "Remediation and Security Recommendations", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "240 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "120 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 80% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 85%",
    ],
  },
  {
    id: "10",
    title: "Full Stack Development",
    description: "Complete full-stack development with frontend, backend, and database technologies.",
    level: "Intermediate",
    duration: "55 hours",
    students: 4800,
    rating: 4.6,
    instructor: "Jennifer Lee",
    progress: 0,
    completedLessons: 0,
    totalLessons: 30,
    lastAccessed: "Not started",
    overview: `This comprehensive full-stack development course covers both frontend and backend technologies to build complete web applications. You'll learn modern frameworks, databases, APIs, and deployment strategies.

The course includes hands-on projects building real-world applications from scratch. You'll gain experience with React, Node.js, databases, cloud deployment, and industry best practices for full-stack development.`,
    prerequisites: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Understanding of programming fundamentals",
      "A computer with development tools installed",
      "Basic familiarity with command line interface",
    ],
    whatYouWillLearn: [
      "Build responsive frontend applications with React",
      "Develop RESTful APIs with Node.js and Express",
      "Work with databases (SQL and NoSQL)",
      "Implement authentication and authorization",
      "Deploy applications to cloud platforms",
      "Use version control and collaboration tools",
      "Apply full-stack development best practices",
    ],
    modules: [
      {
        title: "Frontend Development with React",
        lessons: [
          { title: "React Fundamentals", duration: "30 min", type: "video", completed: false },
          { title: "Components and Props", duration: "25 min", type: "video", completed: false },
          { title: "State Management with Redux", duration: "35 min", type: "video", completed: false },
          { title: "React Router and Navigation", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: React Frontend", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Backend Development with Node.js",
        lessons: [
          { title: "Node.js and Express.js", duration: "30 min", type: "video", completed: false },
          { title: "RESTful API Design", duration: "35 min", type: "video", completed: false },
          { title: "Middleware and Error Handling", duration: "25 min", type: "video", completed: false },
          { title: "API Documentation with Swagger", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Backend API", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Database Integration",
        lessons: [
          { title: "SQL Databases with PostgreSQL", duration: "30 min", type: "video", completed: false },
          { title: "NoSQL with MongoDB", duration: "25 min", type: "video", completed: false },
          { title: "Database Design and Relationships", duration: "35 min", type: "video", completed: false },
          { title: "ORM and Query Optimization", duration: "30 min", type: "video", completed: false },
          { title: "Coding Exercise: Database Integration", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Authentication and Security",
        lessons: [
          { title: "JWT Authentication", duration: "30 min", type: "video", completed: false },
          { title: "Password Hashing and Security", duration: "25 min", type: "video", completed: false },
          { title: "OAuth and Social Login", duration: "35 min", type: "video", completed: false },
          { title: "API Security Best Practices", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Authentication System", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Advanced Frontend Features",
        lessons: [
          { title: "State Management with Context API", duration: "25 min", type: "video", completed: false },
          { title: "Testing with Jest and React Testing Library", duration: "30 min", type: "video", completed: false },
          { title: "Performance Optimization", duration: "25 min", type: "video", completed: false },
          { title: "PWA and Offline Functionality", duration: "20 min", type: "video", completed: false },
          { title: "Coding Exercise: Advanced Frontend", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "DevOps and Deployment",
        lessons: [
          { title: "Version Control with Git", duration: "25 min", type: "video", completed: false },
          { title: "Docker and Containerization", duration: "30 min", type: "video", completed: false },
          { title: "Cloud Deployment (AWS/Azure)", duration: "35 min", type: "video", completed: false },
          { title: "CI/CD Pipelines", duration: "25 min", type: "video", completed: false },
          { title: "Coding Exercise: Deployment", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Final Project and Best Practices",
        lessons: [
          { title: "Project Architecture and Planning", duration: "30 min", type: "video", completed: false },
          { title: "Code Quality and Testing", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "300 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
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
  {
    id: "11",
    title: "Software Testing & QA",
    description: "Learn comprehensive software testing strategies and quality assurance practices.",
    level: "Intermediate",
    duration: "40 hours",
    students: 3200,
    rating: 4.5,
    instructor: "Rachel Green",
    progress: 0,
    completedLessons: 0,
    totalLessons: 25,
    lastAccessed: "Not started",
    overview: `This comprehensive software testing course covers all aspects of quality assurance, from manual testing to automated testing frameworks. You'll learn testing methodologies, tools, and best practices used in the industry.

The course includes hands-on testing exercises, automation scripting, and real-world testing scenarios. You'll gain experience with popular testing tools and frameworks used by QA professionals.`,
    prerequisites: [
      "Basic understanding of software development lifecycle",
      "Familiarity with at least one programming language",
      "A computer with testing tools installed",
      "Basic knowledge of databases and APIs",
    ],
    whatYouWillLearn: [
      "Master software testing methodologies and strategies",
      "Perform manual and automated testing",
      "Use popular testing tools and frameworks",
      "Write effective test cases and test plans",
      "Implement test automation with Selenium and other tools",
      "Apply performance and security testing techniques",
      "Manage testing processes and quality metrics",
    ],
    modules: [
      {
        title: "Testing Fundamentals",
        lessons: [
          { title: "Introduction to Software Testing", duration: "25 min", type: "video", completed: false },
          { title: "Testing Types and Levels", duration: "30 min", type: "video", completed: false },
          { title: "Test Planning and Strategy", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Test Case Design", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Manual Testing Techniques",
        lessons: [
          { title: "Black Box Testing", duration: "30 min", type: "video", completed: false },
          { title: "White Box Testing", duration: "25 min", type: "video", completed: false },
          { title: "User Interface Testing", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Manual Testing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Test Automation with Selenium",
        lessons: [
          { title: "Selenium WebDriver Basics", duration: "35 min", type: "video", completed: false },
          { title: "Element Locators and Interactions", duration: "30 min", type: "video", completed: false },
          { title: "Test Data Management", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Selenium Automation", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "API and Performance Testing",
        lessons: [
          { title: "API Testing with Postman", duration: "30 min", type: "video", completed: false },
          { title: "Performance Testing with JMeter", duration: "35 min", type: "video", completed: false },
          { title: "Load and Stress Testing", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: API and Performance Testing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Mobile and Security Testing",
        lessons: [
          { title: "Mobile Application Testing", duration: "30 min", type: "video", completed: false },
          { title: "Security Testing Basics", duration: "25 min", type: "video", completed: false },
          { title: "Accessibility Testing", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Mobile and Security Testing", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Test Management and Final Project",
        lessons: [
          { title: "Test Management Tools", duration: "25 min", type: "video", completed: false },
          { title: "Quality Metrics and Reporting", duration: "20 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "180 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "90 min", type: "quiz", completed: false },
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
  {
    id: "12",
    title: "Red Hat Linux Administration",
    description: "Master Red Hat Linux system administration and enterprise solutions.",
    level: "Intermediate",
    duration: "45 hours",
    students: 2800,
    rating: 4.6,
    instructor: "Mark Thompson",
    progress: 0,
    completedLessons: 0,
    totalLessons: 28,
    lastAccessed: "Not started",
    overview: `This comprehensive Red Hat Linux administration course covers system administration, security, networking, and enterprise solutions. You'll learn to manage Red Hat Enterprise Linux systems in production environments.

The course includes hands-on labs, real-world scenarios, and preparation for Red Hat certification exams. You'll gain practical experience with system configuration, troubleshooting, and enterprise-level administration tasks.`,
    prerequisites: [
      "Basic understanding of Linux command line",
      "Familiarity with computer networking concepts",
      "A computer with virtualization software",
      "Basic knowledge of system administration",
    ],
    whatYouWillLearn: [
      "Master Red Hat Enterprise Linux administration",
      "Configure and manage system services",
      "Implement security policies and hardening",
      "Manage storage and file systems",
      "Configure networking and firewall rules",
      "Troubleshoot system issues and performance",
      "Prepare for Red Hat certification exams",
    ],
    modules: [
      {
        title: "Linux Fundamentals",
        lessons: [
          { title: "Introduction to Red Hat Linux", duration: "30 min", type: "video", completed: false },
          { title: "Command Line Basics", duration: "35 min", type: "video", completed: false },
          { title: "File System Navigation", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Basic Commands", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "System Administration",
        lessons: [
          { title: "User and Group Management", duration: "30 min", type: "video", completed: false },
          { title: "Process Management", duration: "25 min", type: "video", completed: false },
          { title: "Service Management with systemd", duration: "35 min", type: "video", completed: false },
          { title: "Lab Exercise: System Administration", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Storage Management",
        lessons: [
          { title: "Disk Partitioning and Formatting", duration: "30 min", type: "video", completed: false },
          { title: "LVM (Logical Volume Manager)", duration: "35 min", type: "video", completed: false },
          { title: "File System Management", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Storage Configuration", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Networking and Security",
        lessons: [
          { title: "Network Configuration", duration: "30 min", type: "video", completed: false },
          { title: "Firewall Management with firewalld", duration: "25 min", type: "video", completed: false },
          { title: "SELinux Security", duration: "35 min", type: "video", completed: false },
          { title: "Lab Exercise: Network Security", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Package Management",
        lessons: [
          { title: "RPM Package Management", duration: "30 min", type: "video", completed: false },
          { title: "YUM and DNF Package Managers", duration: "25 min", type: "video", completed: false },
          { title: "Software Repositories", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Package Management", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "System Monitoring and Troubleshooting",
        lessons: [
          { title: "System Monitoring Tools", duration: "30 min", type: "video", completed: false },
          { title: "Log Management", duration: "25 min", type: "video", completed: false },
          { title: "Performance Tuning", duration: "30 min", type: "video", completed: false },
          { title: "Lab Exercise: Monitoring and Troubleshooting", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Final Project and Certification",
        lessons: [
          { title: "Red Hat Certification Overview", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "240 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "120 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 75% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 80%",
    ],
  },
  {
    id: "13",
    title: "Bug Bounty Hunting",
    description: "Learn bug bounty hunting techniques and vulnerability discovery methods.",
    level: "Advanced",
    duration: "50 hours",
    students: 1800,
    rating: 4.9,
    instructor: "Sarah Kim",
    progress: 0,
    completedLessons: 0,
    totalLessons: 30,
    lastAccessed: "Not started",
    overview: `This advanced bug bounty hunting course teaches you how to find and responsibly disclose security vulnerabilities. You'll learn various attack techniques, vulnerability assessment methods, and how to maximize your bug bounty earnings.

The course covers web application security, mobile app testing, API security, and advanced exploitation techniques. You'll gain hands-on experience with real-world bug bounty programs and learn from successful bug bounty hunters.`,
    prerequisites: [
      "Strong understanding of web technologies",
      "Experience with penetration testing tools",
      "Basic knowledge of programming languages",
      "A computer with ethical hacking tools installed",
    ],
    whatYouWillLearn: [
      "Master bug bounty hunting methodologies",
      "Identify and exploit web application vulnerabilities",
      "Test mobile applications for security issues",
      "Use advanced reconnaissance techniques",
      "Write effective vulnerability reports",
      "Maximize bug bounty earnings",
      "Navigate bug bounty platforms and programs",
    ],
    modules: [
      {
        title: "Bug Bounty Fundamentals",
        lessons: [
          { title: "Introduction to Bug Bounty Hunting", duration: "30 min", type: "video", completed: false },
          { title: "Bug Bounty Platforms and Programs", duration: "25 min", type: "video", completed: false },
          { title: "Legal and Ethical Considerations", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Setting up Bug Bounty Environment", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Web Application Security",
        lessons: [
          { title: "OWASP Top 10 Vulnerabilities", duration: "35 min", type: "video", completed: false },
          { title: "SQL Injection Techniques", duration: "30 min", type: "video", completed: false },
          { title: "Cross-Site Scripting (XSS)", duration: "30 min", type: "video", completed: false },
          { title: "Lab Exercise: Web App Testing", duration: "150 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Advanced Web Vulnerabilities",
        lessons: [
          { title: "Server-Side Request Forgery (SSRF)", duration: "30 min", type: "video", completed: false },
          { title: "XML External Entity (XXE) Attacks", duration: "25 min", type: "video", completed: false },
          { title: "Business Logic Vulnerabilities", duration: "35 min", type: "video", completed: false },
          { title: "Lab Exercise: Advanced Web Testing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "API Security Testing",
        lessons: [
          { title: "REST API Security", duration: "30 min", type: "video", completed: false },
          { title: "GraphQL Security", duration: "25 min", type: "video", completed: false },
          { title: "API Authentication Bypass", duration: "30 min", type: "video", completed: false },
          { title: "Lab Exercise: API Security Testing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Mobile Application Security",
        lessons: [
          { title: "Android App Security Testing", duration: "35 min", type: "video", completed: false },
          { title: "iOS App Security Testing", duration: "30 min", type: "video", completed: false },
          { title: "Mobile API Security", duration: "25 min", type: "video", completed: false },
          { title: "Lab Exercise: Mobile App Testing", duration: "120 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Reconnaissance and Information Gathering",
        lessons: [
          { title: "OSINT Techniques", duration: "30 min", type: "video", completed: false },
          { title: "Subdomain Enumeration", duration: "25 min", type: "video", completed: false },
          { title: "Technology Stack Identification", duration: "20 min", type: "video", completed: false },
          { title: "Lab Exercise: Reconnaissance", duration: "90 min", type: "exercise", completed: false },
          { title: "Module Quiz", duration: "20 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Report Writing and Final Project",
        lessons: [
          { title: "Vulnerability Report Writing", duration: "30 min", type: "video", completed: false },
          { title: "Proof of Concept Development", duration: "25 min", type: "video", completed: false },
          { title: "Final Project Overview", duration: "15 min", type: "video", completed: false },
          { title: "Final Project Implementation", duration: "240 min", type: "exercise", completed: false },
          { title: "Final Certification Exam", duration: "120 min", type: "quiz", completed: false },
        ],
      },
    ],
    certificationRequirements: [
      "Complete all course modules",
      "Score at least 80% on all module quizzes",
      "Complete and submit the final project",
      "Pass the final certification exam with a score of at least 85%",
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
