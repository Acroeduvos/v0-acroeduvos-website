'use client'

import { useState, useEffect } from "react"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play, Copy, RotateCcw, Save, FolderOpen, Upload, Activity, Users, Zap, Wifi, WifiOff, TrendingUp
} from "lucide-react"

const languages = [
  {
    value: "python",
    label: "Python",
    icon: "🐍",
    description: "Versatile programming language",
    features: ["Easy syntax", "Rich libraries", "Data science"],
    difficulty: "Beginner",
    example: `# Welcome to Python!
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate sum of first 10 Fibonacci numbers
total = 0
for i in range(10):
    total += fibonacci(i)

print(f"Sum of first 10 Fibonacci numbers: {total}")

# List comprehension example
squares = [x**2 for x in range(1, 11)]
print(f"Squares of 1-10: {squares}")

# Dictionary example
student = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 90, 78, 92]
}
print(f"Student: {student['name']}, Average: {sum(student['grades'])/len(student['grades']):.1f}")`,
    sampleInput: `5
10
Alice`,
    sampleOutput: `Sum of first 10 Fibonacci numbers: 88
Squares of 1-10: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Student: Alice, Average: 86.2`
  },
  {
    value: "javascript",
    label: "JavaScript",
    icon: "🟨",
    description: "Web development powerhouse",
    features: ["Async/await", "DOM manipulation", "Modern ES6+"],
    difficulty: "Intermediate",
    example: `// Modern JavaScript Features
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(\`\${a} + \${b} = \${result}\`);
        return result;
    }
    
    getHistory() {
        return this.history;
    }
}

// Async function example
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);

// Calculator demo
const calc = new Calculator();
console.log('5 + 3 =', calc.add(5, 3));
console.log('10 + 7 =', calc.add(10, 7));
console.log('History:', calc.getHistory());`,
    sampleInput: `Hello World
42`,
    sampleOutput: `Original: [1, 2, 3, 4, 5]
Doubled: [2, 4, 6, 8, 10]
Evens: [2, 4]
Sum: 15
5 + 3 = 8
10 + 7 = 17
History: ['5 + 3 = 8', '10 + 7 = 17']`
  },
  {
    value: "java",
    label: "Java",
    icon: "☕",
    description: "Enterprise-grade programming",
    features: ["OOP", "Platform independent", "Strong typing"],
    difficulty: "Intermediate",
    example: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
        
        // Create a student object
        Student student = new Student("John Doe", 20);
        student.addGrade(85);
        student.addGrade(90);
        student.addGrade(78);
        
        System.out.println("Student: " + student.getName());
        System.out.println("Age: " + student.getAge());
        System.out.println("Average Grade: " + student.getAverageGrade());
        
        // ArrayList example
        ArrayList<String> subjects = new ArrayList<>();
        subjects.add("Mathematics");
        subjects.add("Physics");
        subjects.add("Chemistry");
        
        System.out.println("Subjects:");
        for (String subject : subjects) {
            System.out.println("- " + subject);
        }
    }
}

class Student {
    private String name;
    private int age;
    private List<Integer> grades;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.grades = new ArrayList<>();
    }
    
    public void addGrade(int grade) {
        grades.add(grade);
    }
    
    public double getAverageGrade() {
        if (grades.isEmpty()) return 0.0;
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return (double) sum / grades.size();
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}`,
    sampleInput: `John Doe
20
85 90 78`,
    sampleOutput: `Welcome to Java Programming!
Student: John Doe
Age: 20
Average Grade: 84.33333333333333
Subjects:
- Mathematics
- Physics
- Chemistry`
  },
  {
    value: "cpp",
    label: "C++",
    icon: "⚡",
    description: "High-performance systems programming",
    features: ["Memory management", "STL", "Templates"],
    difficulty: "Advanced",
    example: `#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>

class Student {
private:
    std::string name;
    int age;
    std::vector<int> grades;

public:
    Student(const std::string& n, int a) : name(n), age(a) {}
    
    void addGrade(int grade) {
        grades.push_back(grade);
    }
    
    double getAverageGrade() const {
        if (grades.empty()) return 0.0;
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return static_cast<double>(sum) / grades.size();
    }
    
    void displayInfo() const {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Age: " << age << std::endl;
        std::cout << "Average Grade: " << getAverageGrade() << std::endl;
    }
};

int main() {
    std::cout << "Welcome to C++ Programming!" << std::endl;
    
    // Create student using smart pointer
    auto student = std::make_unique<Student>("Alice Smith", 22);
    student->addGrade(88);
    student->addGrade(92);
    student->addGrade(85);
    
    student->displayInfo();
    
    // STL vector example
    std::vector<int> numbers = {10, 5, 8, 3, 7};
    std::cout << "Original numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Sort and display
    std::sort(numbers.begin(), numbers.end());
    std::cout << "Sorted numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
    sampleInput: `Alice Smith
22
88 92 85`,
    sampleOutput: `Welcome to C++ Programming!
Name: Alice Smith
Age: 22
Average Grade: 88.3333
Original numbers: 10 5 8 3 7 
Sorted numbers: 3 5 7 8 10 `
  },
  {
    value: "c",
    label: "C",
    icon: "🔧",
    description: "System programming and embedded systems",
    features: ["Low-level control", "Performance", "Portability"],
    difficulty: "Advanced",
    example: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float grades[10];
    int gradeCount;
};

float calculateAverage(struct Student* student) {
    if (student->gradeCount == 0) return 0.0;
    float sum = 0.0;
    for (int i = 0; i < student->gradeCount; i++) {
        sum += student->grades[i];
    }
    return sum / student->gradeCount;
}

void displayStudent(struct Student* student) {
    printf("Name: %s\\n", student->name);
    printf("Age: %d\\n", student->age);
    printf("Average Grade: %.2f\\n", calculateAverage(student));
}

int main() {
    printf("Welcome to C Programming!\\n");
    
    struct Student student;
    strcpy(student.name, "Bob Johnson");
    student.age = 21;
    student.gradeCount = 3;
    student.grades[0] = 85.5;
    student.grades[1] = 92.0;
    student.grades[2] = 78.5;
    
    displayStudent(&student);
    
    // Array operations
    int numbers[] = {10, 5, 8, 3, 7};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("\\nOriginal array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    // Bubble sort
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                int temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
        }
    }
    
    printf("Sorted array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    return 0;
}`,
    sampleInput: `Bob Johnson
21
85.5 92.0 78.5`,
    sampleOutput: `Welcome to C Programming!
Name: Bob Johnson
Age: 21
Average Grade: 85.33

Original array: 10 5 8 3 7 
Sorted array: 3 5 7 8 10 `
  },
  {
    value: "go",
    label: "Go",
    icon: "🐹",
    description: "Modern systems programming language",
    features: ["Concurrency", "Fast compilation", "Garbage collection"],
    difficulty: "Intermediate",
    example: `package main

import (
    "fmt"
    "sort"
)

type Student struct {
    Name   string
    Age    int
    Grades []float64
}

func (s *Student) AddGrade(grade float64) {
    s.Grades = append(s.Grades, grade)
}

func (s *Student) AverageGrade() float64 {
    if len(s.Grades) == 0 {
        return 0.0
    }
    sum := 0.0
    for _, grade := range s.Grades {
        sum += grade
    }
    return sum / float64(len(s.Grades))
}

func (s *Student) DisplayInfo() {
    fmt.Printf("Name: %s\\n", s.Name)
    fmt.Printf("Age: %d\\n", s.Age)
    fmt.Printf("Average Grade: %.2f\\n", s.AverageGrade())
}

func main() {
    fmt.Println("Welcome to Go Programming!")
    
    student := Student{
        Name: "Charlie Brown",
        Age:  23,
    }
    student.AddGrade(88.5)
    student.AddGrade(91.0)
    student.AddGrade(76.5)
    
    student.DisplayInfo()
    
    // Slice operations
    numbers := []int{10, 5, 8, 3, 7}
    fmt.Printf("\\nOriginal slice: %v\\n", numbers)
    
    // Sort slice
    sort.Ints(numbers)
    fmt.Printf("Sorted slice: %v\\n", numbers)
    
    // Goroutine example
    go func() {
        fmt.Println("Hello from goroutine!")
    }()
}`,
    sampleInput: `Charlie Brown
23
88.5 91.0 76.5`,
    sampleOutput: `Welcome to Go Programming!
Name: Charlie Brown
Age: 23
Average Grade: 85.33

Original slice: [10 5 8 3 7]
Sorted slice: [3 5 7 8 10]
Hello from goroutine!`
  },
  {
    value: "rust",
    label: "Rust",
    icon: "🦀",
    description: "Memory-safe systems programming",
    features: ["Memory safety", "Zero-cost abstractions", "Concurrency"],
    difficulty: "Advanced",
    example: `use std::collections::HashMap;

struct Student {
    name: String,
    age: u32,
    grades: Vec<f64>,
}

impl Student {
    fn new(name: String, age: u32) -> Self {
        Self {
            name,
            age,
            grades: Vec::new(),
        }
    }
    
    fn add_grade(&mut self, grade: f64) {
        self.grades.push(grade);
    }
    
    fn average_grade(&self) -> f64 {
        if self.grades.is_empty() {
            0.0
        } else {
            self.grades.iter().sum::<f64>() / self.grades.len() as f64
        }
    }
    
    fn display_info(&self) {
        println!("Name: {}", self.name);
        println!("Age: {}", self.age);
        println!("Average Grade: {:.2}", self.average_grade());
    }
}

fn main() {
    println!("Welcome to Rust Programming!");
    
    let mut student = Student::new("David Wilson".to_string(), 24);
    student.add_grade(87.5);
    student.add_grade(89.0);
    student.add_grade(82.5);
    
    student.display_info();
    
    // Vector operations
    let mut numbers = vec![10, 5, 8, 3, 7];
    println!("\\nOriginal vector: {:?}", numbers);
    
    // Sort vector
    numbers.sort();
    println!("Sorted vector: {:?}", numbers);
    
    // HashMap example
    let mut scores = HashMap::new();
    scores.insert("Math", 95);
    scores.insert("Physics", 88);
    scores.insert("Chemistry", 92);
    
    println!("\\nSubject Scores:");
    for (subject, score) in &scores {
        println!("{}: {}", subject, score);
    }
}`,
    sampleInput: `David Wilson
24
87.5 89.0 82.5`,
    sampleOutput: `Welcome to Rust Programming!
Name: David Wilson
Age: 24
Average Grade: 86.33

Original vector: [10, 5, 8, 3, 7]
Sorted vector: [3, 5, 7, 8, 10]

Subject Scores:
Math: 95
Physics: 88
Chemistry: 92`
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: "📘",
    description: "JavaScript with static typing",
    features: ["Static typing", "ES6+ features", "Better IDE support"],
    difficulty: "Intermediate",
    example: `interface Student {
    name: string;
    age: number;
    grades: number[];
}

class StudentManager {
    private students: Student[] = [];
    
    addStudent(student: Student): void {
        this.students.push(student);
    }
    
    getAverageGrade(student: Student): number {
        if (student.grades.length === 0) return 0;
        const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
        return sum / student.grades.length;
    }
    
    displayStudent(student: Student): void {
        console.log(\`Name: \${student.name}\`);
        console.log(\`Age: \${student.age}\`);
        console.log(\`Average Grade: \${this.getAverageGrade(student).toFixed(2)}\`);
    }
    
    getAllStudents(): Student[] {
        return [...this.students];
    }
}

// Generic function example
function processArray<T>(arr: T[], callback: (item: T) => void): void {
    arr.forEach(callback);
}

// Async/await example
async function fetchStudentData(): Promise<Student> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "Emma Davis",
                age: 22,
                grades: [85, 92, 78, 95]
            });
        }, 1000);
    });
}

async function main(): Promise<void> {
    console.log("Welcome to TypeScript Programming!");
    
    const manager = new StudentManager();
    
    const student: Student = {
        name: "Emma Davis",
        age: 22,
        grades: [85, 92, 78, 95]
    };
    
    manager.addStudent(student);
    manager.displayStudent(student);
    
    // Generic function usage
    const numbers = [10, 5, 8, 3, 7];
    console.log("\\nProcessing array:");
    processArray(numbers, (num) => console.log(\`Number: \${num}\`));
    
    // Async operation
    try {
        const asyncStudent = await fetchStudentData();
        console.log("\\nAsync student data:");
        manager.displayStudent(asyncStudent);
    } catch (error) {
        console.error("Error fetching student data:", error);
    }
}

main().catch(console.error);`,
    sampleInput: `Emma Davis
22
85 92 78 95`,
    sampleOutput: `Welcome to TypeScript Programming!
Name: Emma Davis
Age: 22
Average Grade: 87.50

Processing array:
Number: 10
Number: 5
Number: 8
Number: 3
Number: 7

Async student data:
Name: Emma Davis
Age: 22
Average Grade: 87.50`
  },
  {
    value: "php",
    label: "PHP",
    icon: "🐘",
    description: "Server-side web development",
    features: ["Web development", "Database integration", "Frameworks"],
    difficulty: "Intermediate",
    example: `<?php

class Student {
    private $name;
    private $age;
    private $grades;
    
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
        $this->grades = [];
    }
    
    public function addGrade($grade) {
        $this->grades[] = $grade;
    }
    
    public function getAverageGrade() {
        if (empty($this->grades)) {
            return 0.0;
        }
        return array_sum($this->grades) / count($this->grades);
    }
    
    public function displayInfo() {
        echo "Name: " . $this->name . "\\n";
        echo "Age: " . $this->age . "\\n";
        echo "Average Grade: " . number_format($this->getAverageGrade(), 2) . "\\n";
    }
    
    public function getName() {
        return $this->name;
    }
}

// Array operations
function bubbleSort($arr) {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    return $arr;
}

echo "Welcome to PHP Programming!\\n";

$student = new Student("Frank Miller", 25);
$student->addGrade(88.5);
$student->addGrade(91.0);
$student->addGrade(76.5);

$student->displayInfo();

// Array operations
$numbers = [10, 5, 8, 3, 7];
echo "\\nOriginal array: " . implode(", ", $numbers) . "\\n";

$sorted = bubbleSort($numbers);
echo "Sorted array: " . implode(", ", $sorted) . "\\n";

// Associative array example
$subjects = [
    "Math" => 95,
    "Physics" => 88,
    "Chemistry" => 92
];

echo "\\nSubject Scores:\\n";
foreach ($subjects as $subject => $score) {
    echo "$subject: $score\\n";
}

?>`,
    sampleInput: `Frank Miller
25
88.5 91.0 76.5`,
    sampleOutput: `Welcome to PHP Programming!
Name: Frank Miller
Age: 25
Average Grade: 85.33

Original array: 10, 5, 8, 3, 7
Sorted array: 3, 5, 7, 8, 10

Subject Scores:
Math: 95
Physics: 88
Chemistry: 92`
  },
  {
    value: "ruby",
    label: "Ruby",
    icon: "💎",
    description: "Elegant and productive programming",
    features: ["Clean syntax", "Metaprogramming", "Rails framework"],
    difficulty: "Intermediate",
    example: `class Student
  attr_accessor :name, :age, :grades
  
  def initialize(name, age)
    @name = name
    @age = age
    @grades = []
  end
  
  def add_grade(grade)
    @grades << grade
  end
  
  def average_grade
    return 0.0 if @grades.empty?
    @grades.sum.to_f / @grades.length
  end
  
  def display_info
    puts "Name: #{@name}"
    puts "Age: #{@age}"
    puts "Average Grade: #{average_grade.round(2)}"
  end
end

# Array operations
def bubble_sort(arr)
  n = arr.length
  (0...n).each do |i|
    (0...n-i-1).each do |j|
      if arr[j] > arr[j+1]
        arr[j], arr[j+1] = arr[j+1], arr[j]
      end
    end
  end
  arr
end

puts "Welcome to Ruby Programming!"

student = Student.new("Grace Lee", 26)
student.add_grade(87.5)
student.add_grade(89.0)
student.add_grade(82.5)

student.display_info

# Array operations
numbers = [10, 5, 8, 3, 7]
puts "\\nOriginal array: #{numbers.join(', ')}"

sorted = bubble_sort(numbers.dup)
puts "Sorted array: #{sorted.join(', ')}"

# Hash example
subjects = {
  "Math" => 95,
  "Physics" => 88,
  "Chemistry" => 92
}

puts "\\nSubject Scores:"
subjects.each { |subject, score| puts "#{subject}: #{score}" }

# Block example
puts "\\nProcessing numbers with block:"
numbers.each_with_index do |num, index|
  puts "Index #{index}: #{num * 2}"
end`,
    sampleInput: `Grace Lee
26
87.5 89.0 82.5`,
    sampleOutput: `Welcome to Ruby Programming!
Name: Grace Lee
Age: 26
Average Grade: 86.33

Original array: 10, 5, 8, 3, 7
Sorted array: 3, 5, 7, 8, 10

Subject Scores:
Math: 95
Physics: 88
Chemistry: 92

Processing numbers with block:
Index 0: 20
Index 1: 10
Index 2: 16
Index 3: 6
Index 4: 14`
  },
  {
    value: "csharp",
    label: "C#",
    icon: "🔷",
    description: "Microsoft's modern programming language",
    features: [".NET ecosystem", "Object-oriented", "Cross-platform"],
    difficulty: "Intermediate",
    example: `using System;
using System.Collections.Generic;
using System.Linq;

namespace AcroEduvos
{
    class Student
    {
        public string Name { get; set; }
        public int Age { get; set; }
        private List<double> grades;
        
        public Student(string name, int age)
        {
            Name = name;
            Age = age;
            grades = new List<double>();
        }
        
        public void AddGrade(double grade)
        {
            grades.Add(grade);
        }
        
        public double GetAverageGrade()
        {
            return grades.Count > 0 ? grades.Average() : 0.0;
        }
        
        public void DisplayInfo()
        {
            Console.WriteLine($"Name: {Name}");
            Console.WriteLine($"Age: {Age}");
            Console.WriteLine($"Average Grade: {GetAverageGrade():F2}");
        }
    }
    
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to C# Programming!");
            
            var student = new Student("Henry Smith", 27);
            student.AddGrade(88.5);
            student.AddGrade(91.0);
            student.AddGrade(76.5);
            
            student.DisplayInfo();
            
            // LINQ operations
            var numbers = new List<int> { 10, 5, 8, 3, 7 };
            Console.WriteLine($"\\nOriginal list: {string.Join(", ", numbers)}");
            
            var sorted = numbers.OrderBy(x => x).ToList();
            Console.WriteLine($"Sorted list: {string.Join(", ", sorted)}");
            
            var evenNumbers = numbers.Where(x => x % 2 == 0).ToList();
            Console.WriteLine($"Even numbers: {string.Join(", ", evenNumbers)}");
            
            var sum = numbers.Sum();
            Console.WriteLine($"Sum: {sum}");
            
            // Dictionary example
            var subjects = new Dictionary<string, int>
            {
                {"Math", 95},
                {"Physics", 88},
                {"Chemistry", 92}
            };
            
            Console.WriteLine("\\nSubject Scores:");
            foreach (var kvp in subjects)
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}");
            }
        }
    }
}`,
    sampleInput: `Henry Smith
27
88.5 91.0 76.5`,
    sampleOutput: `Welcome to C# Programming!
Name: Henry Smith
Age: 27
Average Grade: 85.33

Original list: 10, 5, 8, 3, 7
Sorted list: 3, 5, 7, 8, 10
Even numbers: 10, 8
Sum: 33

Subject Scores:
Math: 95
Physics: 88
Chemistry: 92`
  },
  {
    value: "kotlin",
    label: "Kotlin",
    icon: "🎯",
    description: "Modern JVM language by JetBrains",
    features: ["Android development", "Interoperability", "Null safety"],
    difficulty: "Intermediate",
    example: `class Student(
    val name: String,
    val age: Int
) {
    private val grades = mutableListOf<Double>()
    
    fun addGrade(grade: Double) {
        grades.add(grade)
    }
    
    fun getAverageGrade(): Double {
        return if (grades.isEmpty()) 0.0 else grades.average()
    }
    
    fun displayInfo() {
        println("Name: $name")
        println("Age: $age")
        println("Hello from Kotlin!")
    }
}

fun bubbleSort(arr: MutableList<Int>): List<Int> {
    val n = arr.size
    for (i in 0 until n) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

fun main() {
    println("Welcome to Kotlin Programming!")
    
    println("Hello from Kotlin!")
}`,
    sampleInput: ``,
    sampleOutput: `Welcome to Kotlin Programming!
Hello from Kotlin!`
  }
]

const sampleProblems = [
  {
    title: "Two Sum",
    description: "Find two numbers that add up to target",
    difficulty: "Easy",
    acceptance: "45.2%"
  },
  {
    title: "Binary Search",
    description: "Search element in sorted array",
    difficulty: "Medium",
    acceptance: "38.7%"
  },
  {
    title: "Merge Sort",
    description: "Implement merge sort algorithm",
    difficulty: "Medium",
    acceptance: "42.1%"
  }
]

export default function CompilerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null)
  const [savedInput, setSavedInput] = useState("")
  const [savedOutput, setSavedOutput] = useState("")
  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 25,
    submissionsPerMinute: 15,
    lastSubmission: new Date()
  })
  const [isRealTime, setIsRealTime] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isClient, setIsClient] = useState(false)

  const currentLanguage = languages.find((lang) => lang.value === selectedLanguage)

  useEffect(() => {
    if (currentLanguage) {
      setCode(currentLanguage.example)
      setInput(savedInput || currentLanguage.sampleInput)
      setOutput("")
      setExecutionTime(null)
      setMemoryUsage(null)
    }
    setStatus("idle")
  }, [selectedLanguage, currentLanguage, savedInput])

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatch
    setIsClient(true)
    
    const interval = setInterval(() => {
      setRealTimeStats({
        activeUsers: Math.floor(Math.random() * 50) + 20,
        submissionsPerMinute: Math.floor(Math.random() * 30) + 10,
        lastSubmission: new Date()
      })
      setIsRealTime(true)
      setLastUpdated(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRunCode = async () => {
    setIsRunning(true)
    setStatus("running")
    setOutput("Running code...")

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          input: input
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.output || '')
        setExecutionTime(result.executionTime || 0)
        setMemoryUsage(result.memoryUsage || 0)
        setStatus("success")
      } else {
        setOutput(result.error || 'Execution failed')
        setStatus("error")
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setStatus("error")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSaveInput = () => {
    setSavedInput(input)
    localStorage.setItem('savedInput', input)
  }

  const handleLoadSavedInput = () => {
    const saved = localStorage.getItem('savedInput')
    if (saved) {
      setInput(saved)
      setSavedInput(saved)
    }
  }

  const handleSaveOutput = () => {
    setSavedOutput(output)
    localStorage.setItem('savedOutput', output)
  }

  const handleLoadSavedOutput = () => {
    const saved = localStorage.getItem('savedOutput')
    if (saved) {
      setOutput(saved)
      setSavedOutput(saved)
    }
  }

  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    
    // Get file extension based on language
    const extensions: { [key: string]: string } = {
      'python': 'py',
      'javascript': 'js',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'rust': 'rs',
      'typescript': 'ts',
      'php': 'php',
      'ruby': 'rb',
      'csharp': 'cs',
      'kotlin': 'kt'
    }
    
    const extension = extensions[selectedLanguage] || 'txt'
    a.download = `code.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
      }
      reader.readAsText(file)
    }
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    const newLanguage = languages.find((lang) => lang.value === value)
    if (newLanguage) {
      setCode(newLanguage.example)
      setInput(savedInput || newLanguage.sampleInput)
      setOutput("")
      setExecutionTime(null)
      setMemoryUsage(null)
    }
    setStatus("idle")
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
    setCode(`// ${problem.title}\n// ${problem.description}\n\n${currentLanguage?.example || ""}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Real-time Code Compiler</h1>
              {isClient && isRealTime && (
                <Badge variant="secondary" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">Write, compile, and execute code in multiple languages</p>
            {isClient && isRealTime && (
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  {isRealTime ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {realTimeStats.activeUsers} users coding
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {realTimeStats.submissionsPerMinute} runs/min
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Code Editor */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Code Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <span>{lang.icon}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm resize-none"
                  placeholder="Write your code here..."
                />
                
                <div className="flex gap-2">
                  <Button onClick={handleRunCode} disabled={isRunning}>
                    <Play className="mr-2 h-4 w-4" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button variant="outline" onClick={handleCopyCode}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" onClick={handleResetCode}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button variant="outline" onClick={handleSaveToFile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" asChild>
                    <label>
                      <Upload className="mr-2 h-4 w-4" />
                      Load
                      <input
                        type="file"
                        accept=".py,.js,.java,.cpp,.c,.go,.rs,.ts,.php,.rb,.cs,.kt"
                        onChange={handleLoadFromFile}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language Info</CardTitle>
              </CardHeader>
              <CardContent>
                {currentLanguage && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentLanguage.icon}</span>
                      <div>
                        <div className="font-semibold">{currentLanguage.label}</div>
                        <div className="text-sm text-muted-foreground">{currentLanguage.description}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {currentLanguage.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline">Difficulty: {currentLanguage.difficulty}</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleProblems.map((problem, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handleLoadSample(problem)}>
                      <div className="font-medium text-sm">{problem.title}</div>
                      <div className="text-xs text-muted-foreground">{problem.description}</div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'} className="text-xs">
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {problem.acceptance}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Activity */}
            {isClient && isRealTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium">{realTimeStats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Runs/Minute</span>
                      <span className="font-medium">{realTimeStats.submissionsPerMinute}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Run</span>
                      <span className="font-medium text-xs">{realTimeStats.lastSubmission.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Input/Output Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Input</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveInput}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLoadSavedInput}>
                    <FolderOpen className="h-3 w-3 mr-1" />
                    Load
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
                placeholder="Enter input here..."
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveOutput}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLoadSavedOutput}>
                    <FolderOpen className="h-3 w-3 mr-1" />
                    Load
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[120px] border rounded-md p-4 bg-muted/30">
                <pre className="text-sm font-mono whitespace-pre-wrap">{output || "Output will appear here..."}</pre>
              </ScrollArea>
              {executionTime && memoryUsage && (
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Time: {executionTime.toFixed(2)}ms</span>
                  <span>Memory: {memoryUsage.toFixed(2)}MB</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
