"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Copy,
  Download,
  Share,
  RotateCcw,
  Settings,
  Clock,
  MemoryStick as Memory,
  CheckCircle,
  XCircle,
  AlertCircle,
  Code2,
} from "lucide-react"

const languages = [
  {
    value: "python",
    label: "Python",
    version: "3.11",
    extension: ".py",
    example: `# Python Example - Hello World
def greet(name):
    return f"Hello, {name}!"

# Main execution
if __name__ == "__main__":
    name = input("Enter your name: ")
    print(greet(name))
    
    # Example: Simple calculator
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    print(f"Sum: {a + b}")`,
    sampleInput: `John
5
3`,
    sampleOutput: `Enter your name: John
Hello, John!
Enter first number: 5
Enter second number: 3
Sum: 8`,
    inputPlaceholder: "Enter input values (one per line):\nJohn\n5\n3",
  },
  {
    value: "javascript",
    label: "JavaScript",
    version: "Node.js 18",
    extension: ".js",
    example: `// JavaScript Example - Hello World
function greet(name) {
    return "Hello, " + name + "!";
}

// Main execution
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your name: ', (name) => {
    console.log(greet(name));
    
    rl.question('Enter first number: ', (a) => {
        rl.question('Enter second number: ', (b) => {
            console.log("Sum: " + (parseInt(a) + parseInt(b)));
            rl.close();
        });
    });
});`,
    sampleInput: `Alice
10
20`,
    sampleOutput: `Enter your name: Alice
Hello, Alice!
Enter first number: 10
Enter second number: 20
Sum: 30`,
    inputPlaceholder: "Enter input values (one per line):\nAlice\n10\n20",
  },
  {
    value: "java",
    label: "Java",
    version: "17",
    extension: ".java",
    example: `// Java Example - Hello World
import java.util.Scanner;

public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println(greet(name));
        
        System.out.print("Enter first number: ");
        int a = scanner.nextInt();
        System.out.print("Enter second number: ");
        int b = scanner.nextInt();
        System.out.println("Sum: " + (a + b));
        
        scanner.close();
    }
}`,
    sampleInput: `Bob
15
25`,
    sampleOutput: `Enter your name: Bob
Hello, Bob!
Enter first number: 15
Enter second number: 25
Sum: 40`,
    inputPlaceholder: "Enter input values (one per line):\nBob\n15\n25",
  },
  {
    value: "cpp",
    label: "C++",
    version: "17",
    extension: ".cpp",
    example: `// C++ Example - Hello World
#include <iostream>
#include <string>
using namespace std;

string greet(const string& name) {
    return "Hello, " + name + "!";
}

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << greet(name) << endl;
    
    int a, b;
    cout << "Enter first number: ";
    cin >> a;
    cout << "Enter second number: ";
    cin >> b;
    cout << "Sum: " << (a + b) << endl;
    
    return 0;
}`,
    sampleInput: `Charlie
7
13`,
    sampleOutput: `Enter your name: Charlie
Hello, Charlie!
Enter first number: 7
Enter second number: 13
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nCharlie\n7\n13",
  },
  {
    value: "c",
    label: "C",
    version: "GCC 11",
    extension: ".c",
    example: `// C Example - Hello World
#include <stdio.h>
#include <string.h>

void greet(char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    char name[100];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    
    // Remove newline character
    name[strcspn(name, "\\n")] = 0;
    
    greet(name);
    
    int a, b;
    printf("Enter first number: ");
    scanf("%d", &a);
    printf("Enter second number: ");
    scanf("%d", &b);
    printf("Sum: %d\\n", a + b);
    
    return 0;
}`,
    sampleInput: `David
9
11`,
    sampleOutput: `Enter your name: David
Hello, David!
Enter first number: 9
Enter second number: 11
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nDavid\n9\n11",
  },
  {
    value: "go",
    label: "Go",
    version: "1.21",
    extension: ".go",
    example: `// Go Example - Hello World
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    
    fmt.Print("Enter your name: ")
    name, _ := reader.ReadString('\\n')
    name = strings.TrimSpace(name)
    fmt.Println(greet(name))
    
    fmt.Print("Enter first number: ")
    aStr, _ := reader.ReadString('\\n')
    a, _ := strconv.Atoi(strings.TrimSpace(aStr))
    
    fmt.Print("Enter second number: ")
    bStr, _ := reader.ReadString('\\n')
    b, _ := strconv.Atoi(strings.TrimSpace(bStr))
    
    fmt.Printf("Sum: %d\\n", a+b)
}`,
    sampleInput: `Eve
12
8`,
    sampleOutput: `Enter your name: Eve
Hello, Eve!
Enter first number: 12
Enter second number: 8
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nEve\n12\n8",
  },
  {
    value: "rust",
    label: "Rust",
    version: "1.75",
    extension: ".rs",
    example: `// Rust Example - Hello World
use std::io;

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("Enter your name: ");
    let mut name = String::new();
    io::stdin().read_line(&mut name).expect("Failed to read line");
    let name = name.trim();
    println!("{}", greet(name));
    
    println!("Enter first number: ");
    let mut a_str = String::new();
    io::stdin().read_line(&mut a_str).expect("Failed to read line");
    let a: i32 = a_str.trim().parse().expect("Invalid number");
    
    println!("Enter second number: ");
    let mut b_str = String::new();
    io::stdin().read_line(&mut b_str).expect("Failed to read line");
    let b: i32 = b_str.trim().parse().expect("Invalid number");
    
    println!("Sum: {}", a + b);
}`,
    sampleInput: `Frank
6
14`,
    sampleOutput: `Enter your name: Frank
Hello, Frank!
Enter first number: 6
Enter second number: 14
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nFrank\n6\n14",
  },
  {
    value: "typescript",
    label: "TypeScript",
    version: "5.0",
    extension: ".ts",
    example: `// TypeScript Example - Hello World
import * as readline from 'readline';

function greet(name: string): string {
    return "Hello, " + name + "!";
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your name: ', (name: string) => {
    console.log(greet(name));
    
    rl.question('Enter first number: ', (a: string) => {
        rl.question('Enter second number: ', (b: string) => {
            const sum: number = parseInt(a) + parseInt(b);
            console.log("Sum: " + sum);
            rl.close();
        });
    });
});`,
    sampleInput: `Grace
4
16`,
    sampleOutput: `Enter your name: Grace
Hello, Grace!
Enter first number: 4
Enter second number: 16
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nGrace\n4\n16",
  },
  {
    value: "php",
    label: "PHP",
    version: "8.2",
    extension: ".php",
    example: `<?php
// PHP Example - Hello World
function greet($name) {
    return "Hello, " . $name . "!";
}

echo "Enter your name: ";
$name = trim(fgets(STDIN));
echo greet($name) . "\\n";

echo "Enter first number: ";
$a = (int)trim(fgets(STDIN));
echo "Enter second number: ";
$b = (int)trim(fgets(STDIN));
echo "Sum: " . ($a + $b) . "\\n";
?>`,
    sampleInput: `Henry
3
17`,
    sampleOutput: `Enter your name: Henry
Hello, Henry!
Enter first number: 3
Enter second number: 17
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nHenry\n3\n17",
  },
  {
    value: "ruby",
    label: "Ruby",
    version: "3.2",
    extension: ".rb",
    example: `# Ruby Example - Hello World
def greet(name)
  "Hello, " + name + "!"
end

print "Enter your name: "
name = gets.chomp
puts greet(name)

print "Enter first number: "
a = gets.chomp.to_i
print "Enter second number: "
b = gets.chomp.to_i
puts "Sum: " + (a + b).to_s`,
    sampleInput: `Ivy
2
18`,
    sampleOutput: `Enter your name: Ivy
Hello, Ivy!
Enter first number: 2
Enter second number: 18
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nIvy\n2\n18",
  },
  {
    value: "sql",
    label: "SQL",
    version: "SQLite 3.27",
    extension: ".sql",
    example: `-- SQL Example - Database Queries
-- Create a sample table
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    grade TEXT
);

-- Insert sample data
INSERT INTO students (name, age, grade) VALUES 
('Alice', 20, 'A'),
('Bob', 19, 'B'),
('Charlie', 21, 'A'),
('Diana', 18, 'C');

-- Query examples
SELECT * FROM students;
SELECT name, grade FROM students WHERE grade = 'A';
SELECT COUNT(*) as total_students FROM students;
SELECT AVG(age) as average_age FROM students;`,
    sampleInput: ``,
    sampleOutput: `-- Table created successfully
-- Data inserted successfully
id|name|age|grade
1|Alice|20|A
2|Bob|19|B
3|Charlie|21|A
4|Diana|18|C

name|grade
Alice|A
Charlie|A

total_students
4

average_age
19.5`,
    inputPlaceholder: "SQL doesn't require input - just run the queries",
  },
  {
    value: "csharp",
    label: "C#",
    version: "8.0",
    extension: ".cs",
    example: `// C# Example - Hello World
using System;

class Program
{
    static string Greet(string name)
    {
        return "Hello, " + name + "!";
    }
    
    static void Main(string[] args)
    {
        Console.Write("Enter your name: ");
        string name = Console.ReadLine();
        Console.WriteLine(Greet(name));
        
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());
        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());
        Console.WriteLine("Sum: " + (a + b));
    }
}`,
    sampleInput: `Jack
8
12`,
    sampleOutput: `Enter your name: Jack
Hello, Jack!
Enter first number: 8
Enter second number: 12
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nJack\n8\n12",
  },
  {
    value: "kotlin",
    label: "Kotlin",
    version: "1.8",
    extension: ".kt",
    example: `// Kotlin Example - Hello World
fun greet(name: String): String {
    return "Hello, " + name + "!"
}

fun main() {
    print("Enter your name: ")
    val name = readLine() ?: ""
    println(greet(name))
    
    print("Enter first number: ")
    val a = readLine()?.toInt() ?: 0
    print("Enter second number: ")
    val b = readLine()?.toInt() ?: 0
    println("Sum: " + (a + b))
}`,
    sampleInput: `Kate
6
14`,
    sampleOutput: `Enter your name: Kate
Hello, Kate!
Enter first number: 6
Enter second number: 14
Sum: 20`,
    inputPlaceholder: "Enter input values (one per line):\nKate\n6\n14",
  },
]

const sampleProblems = [
  {
    title: "Hello World",
    description: "Print 'Hello, World!' to the console",
    difficulty: "Easy",
    code: {
      python: `print("Hello, World!")`,
      javascript: `console.log("Hello, World!");`,
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      sql: `SELECT 'Hello, World!' as greeting;`
    }
  },
  {
    title: "Simple Calculator",
    description: "Add two numbers together",
    difficulty: "Easy",
    code: {
      python: `a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
print(f"Sum: {a + b}")`,
      javascript: `const a = parseInt(prompt("Enter first number: "));
const b = parseInt(prompt("Enter second number: "));
console.log("Sum: " + (a + b));`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter first number: ");
        int a = scanner.nextInt();
        System.out.print("Enter second number: ");
        int b = scanner.nextInt();
        System.out.println("Sum: " + (a + b));
        scanner.close();
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter first number: ";
    cin >> a;
    cout << "Enter second number: ";
    cin >> b;
    cout << "Sum: " << (a + b) << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int a, b;
    printf("Enter first number: ");
    scanf("%d", &a);
    printf("Enter second number: ");
    scanf("%d", &b);
    printf("Sum: %d\\n", a + b);
    return 0;
}`,
      sql: `SELECT 5 + 3 as sum_result;`
    }
  },
  {
    title: "Even or Odd",
    description: "Check if a number is even or odd",
    difficulty: "Easy",
    code: {
      python: `num = int(input("Enter a number: "))
if num % 2 == 0:
    print("Even")
else:
    print("Odd")`,
      javascript: `const num = parseInt(prompt("Enter a number: "));
if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();
        if (num % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
        scanner.close();
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    if (num % 2 == 0) {
        cout << "Even" << endl;
    } else {
        cout << "Odd" << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    if (num % 2 == 0) {
        printf("Even\\n");
    } else {
        printf("Odd\\n");
    }
    return 0;
}`,
      sql: `SELECT 
    CASE 
        WHEN 7 % 2 = 0 THEN 'Even'
        ELSE 'Odd'
    END as result;`
    }
  },
  {
    title: "Fibonacci Sequence",
    description: "Generate the first n Fibonacci numbers",
    difficulty: "Medium",
    code: {
      python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

n = int(input("Enter number of terms: "))
for i in range(n):
    print(fibonacci(i), end=" ")`,
      javascript: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

const n = parseInt(prompt("Enter number of terms: "));
for (let i = 0; i < n; i++) {
    console.log(fibonacci(i));
}`,
      java: `import java.util.Scanner;

public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter number of terms: ");
        int n = scanner.nextInt();
        for (int i = 0; i < n; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        scanner.close();
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    int n;
    cout << "Enter number of terms: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << fibonacci(i) << " ";
    }
    return 0;
}`,
      c: `#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    int n;
    printf("Enter number of terms: ");
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        printf("%d ", fibonacci(i));
    }
    return 0;
}`,
      sql: `WITH RECURSIVE fibonacci(n, fib_n, next_fib_n) AS (
    SELECT 1, 0, 1
    UNION ALL
    SELECT n+1, next_fib_n, fib_n + next_fib_n
    FROM fibonacci WHERE n < 10
)
SELECT fib_n FROM fibonacci;`
    }
  },
  {
    title: "Two Sum",
    description: "Find two numbers that add up to a target",
    difficulty: "Medium",
    code: {
      python: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Indices: {result}")`,
      javascript: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log("Indices:", result);`,
      java: `import java.util.Arrays;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = twoSum(nums, target);
        System.out.println("Indices: " + Arrays.toString(result));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    cout << "Indices: [" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    static int result[2];
    *returnSize = 2;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    int* result = twoSum(nums, 4, target, &returnSize);
    if (returnSize > 0) {
        printf("Indices: [%d, %d]\\n", result[0], result[1]);
    }
    return 0;
}`,
      sql: `WITH numbers AS (
    SELECT 0 as idx, 2 as val
    UNION ALL SELECT 1, 7
    UNION ALL SELECT 2, 11
    UNION ALL SELECT 3, 15
)
SELECT n1.idx, n2.idx
FROM numbers n1, numbers n2
WHERE n1.idx < n2.idx AND n1.val + n2.val = 9;`
    }
  },
]

export default function CompilerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "success" | "error" | "timeout">("idle")

  const currentLanguage = languages.find((lang) => lang.value === selectedLanguage)

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    const newLanguage = languages.find((lang) => lang.value === value)
    if (newLanguage) {
      setCode(newLanguage.example)
      setInput(newLanguage.sampleInput)
      setOutput("")
      setExecutionTime(null)
      setMemoryUsage(null)
    }
    setStatus("idle")
  }

  const handleRunCode = async () => {
    if (!code.trim()) {
      setStatus("error")
      setOutput("Error: Please write some code before running")
      return
    }

    setIsRunning(true)
    setStatus("idle")
    setOutput("Compiling and running code...")

    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          input: input
        })
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.output || "Code executed successfully!")
        setExecutionTime(result.executionTime || 0)
        setMemoryUsage(result.memoryUsage || 0)
        setStatus("success")
      } else {
        setOutput(result.error || "Execution failed")
        setStatus("error")
        setExecutionTime(null)
        setMemoryUsage(null)
      }
    } catch (error) {
      console.error('Execution error:', error)
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to execute code'}`)
      setStatus("error")
      setExecutionTime(null)
      setMemoryUsage(null)
    } finally {
      setIsRunning(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const handleResetCode = () => {
    if (currentLanguage) {
      setCode(currentLanguage.example)
      setInput(currentLanguage.sampleInput)
      setOutput("")
      setStatus("idle")
    }
  }

  const handleLoadSample = (problem: (typeof sampleProblems)[0]) => {
    const problemCode = problem.code[selectedLanguage as keyof typeof problem.code] || currentLanguage?.example || ""
    setCode(problemCode)
    setInput("")
    setOutput("")
    setStatus("idle")
  }

  useEffect(() => {
    const defaultLang = languages.find((lang) => lang.value === selectedLanguage)
    if (defaultLang) {
      setCode(defaultLang.example)
      setInput(defaultLang.sampleInput)
      setOutput("")
    }
  }, [selectedLanguage])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-6">
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Online Code Compiler</h1>
                <p className="text-muted-foreground mt-2">Write, compile, and run code in 10+ programming languages</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{lang.label}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {lang.version}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Problems</CardTitle>
                  <CardDescription>Quick start with common problems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sampleProblems.map((problem, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleLoadSample(problem)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{problem.title}</div>
                        <div className="text-xs text-muted-foreground">{problem.description}</div>
                        <Badge
                          variant={problem.difficulty === "Easy" ? "secondary" : "default"}
                          className="mt-1 text-xs"
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Execution Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Runtime</span>
                    </div>
                    <span className="text-sm font-mono">
                      {executionTime !== null ? `${executionTime.toFixed(0)}ms` : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Memory className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Memory</span>
                    </div>
                    <span className="text-sm font-mono">
                      {memoryUsage !== null ? `${memoryUsage.toFixed(1)}MB` : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Status</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                      {status === "timeout" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      <span className="text-sm capitalize">{status === "idle" ? "Ready" : status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <CardTitle className="ml-4">
                        main{currentLanguage?.extension} - {currentLanguage?.label} {currentLanguage?.version}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={handleCopyCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleResetCode}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[500px] font-mono text-sm border-0 resize-none focus-visible:ring-0 bg-gray-900 text-green-400"
                    placeholder="Write your code here..."
                  />
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Input</CardTitle>
                    <CardDescription>
                      Provide input for your {currentLanguage?.label} program (if needed)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[150px] font-mono text-sm"
                      placeholder={currentLanguage?.inputPlaceholder || "Enter input here..."}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Output</CardTitle>
                      {status !== "idle" && (
                        <Badge
                          variant={status === "success" ? "secondary" : status === "error" ? "destructive" : "default"}
                        >
                          {status === "success" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {status === "error" && <XCircle className="mr-1 h-3 w-3" />}
                          {status === "timeout" && <AlertCircle className="mr-1 h-3 w-3" />}
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[150px]">
                      <pre
                        className={`text-sm font-mono whitespace-pre-wrap ${
                          status === "error" ? "text-red-600" : status === "timeout" ? "text-yellow-600" : ""
                        }`}
                      >
                        {output || `Expected output for ${currentLanguage?.label} will appear here...`}
                      </pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleRunCode} disabled={isRunning} className="flex-1" size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  Submit Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
