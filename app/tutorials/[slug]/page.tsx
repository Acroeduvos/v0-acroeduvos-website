import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Tutorial content database
const tutorialContent = {
  "c-programming-basics": {
    title: "C Programming Fundamentals",
    category: "C Programming",
    readTime: "15 min read",
    content: `
      # C Programming Fundamentals

      A comprehensive guide to getting started with C programming.

      ## Overview
      C is a powerful general-purpose programming language that is widely used for system programming and embedded systems. This tutorial will cover the fundamental concepts of C programming.

      ## Prerequisites
      - Basic understanding of computer programming concepts
      - A C compiler (GCC recommended)
      - Text editor or IDE

      ## Basic Syntax
      \`\`\`c
      #include <stdio.h>

      int main() {
          printf("Hello, World!\\n");
          return 0;
      }
      \`\`\`

      ## Variables and Data Types
      C supports several data types:
      - int: Integer values
      - float: Floating-point numbers
      - char: Single characters
      - double: Double precision floating-point
      - void: Empty data type

      Example:
      \`\`\`c
      int age = 25;
      float height = 5.9;
      char grade = 'A';
      \`\`\`

      ## Control Structures
      ### If-Else Statement
      \`\`\`c
      if (age >= 18) {
          printf("Adult\\n");
      } else {
          printf("Minor\\n");
      }
      \`\`\`

      ### Loops
      \`\`\`c
      // For loop
      for (int i = 0; i < 5; i++) {
          printf("%d\\n", i);
      }

      // While loop
      int j = 0;
      while (j < 5) {
          printf("%d\\n", j);
          j++;
      }
      \`\`\`

      ## Functions
      \`\`\`c
      int add(int a, int b) {
          return a + b;
      }

      int main() {
          int result = add(5, 3);
          printf("Sum: %d\\n", result);
          return 0;
      }
      \`\`\`

      ## Practice Exercises
      1. Write a program to calculate the factorial of a number
      2. Create a function to check if a number is prime
      3. Implement a simple calculator using switch statements

      ## Further Reading
      - [C Programming Language by K&R](https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628)
      - [GeeksforGeeks C Programming](https://www.geeksforgeeks.org/c-programming-language/)
      - [C Documentation](https://devdocs.io/c/)
    `,
  },
  // Add more tutorials here
}

export default function TutorialArticle({ params }: { params: { slug: string } }) {
  const { slug } = params
  const tutorial = tutorialContent[slug as keyof typeof tutorialContent]

  if (!tutorial) return notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Link href="/tutorials">
            <Button variant="outline" size="sm">← Back to Tutorials</Button>
          </Link>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-8 border-b pb-8">
            <div className="mb-2 flex items-center gap-4">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                {tutorial.category}
              </span>
              <span className="text-sm text-gray-500">{tutorial.readTime}</span>
            </div>
            <h1 className="text-3xl font-bold">{tutorial.title}</h1>
          </div>

          <article className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
          </article>

          <div className="mt-12 border-t pt-8">
            <h3 className="mb-4 text-lg font-semibold">Ready to Practice?</h3>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/practice">Try Practice Problems</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
