// Expanded MCQ Question Bank
export interface MCQQuestion {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    topic: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    tags: string[]
}

export const mcqQuestions: MCQQuestion[] = [
    // Data Structures - Easy
    {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        explanation: "Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity.",
        topic: "Algorithms",
        difficulty: "Easy",
        tags: ["binary-search", "time-complexity"]
    },
    {
        id: 2,
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Array", "Tree"],
        correctAnswer: 1,
        explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
        topic: "Data Structures",
        difficulty: "Easy",
        tags: ["stack", "fundamentals"]
    },
    {
        id: 3,
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
        correctAnswer: 0,
        explanation: "SQL stands for Structured Query Language, used for managing relational databases.",
        topic: "Database",
        difficulty: "Easy",
        tags: ["sql", "database"]
    },
    {
        id: 4,
        question: "Which of the following is NOT a principle of OOP?",
        options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"],
        correctAnswer: 2,
        explanation: "Compilation is not an OOP principle. The four main principles are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
        topic: "OOP",
        difficulty: "Easy",
        tags: ["oop", "fundamentals"]
    },
    {
        id: 5,
        question: "What is the default value of a boolean in Java?",
        options: ["true", "false", "null", "0"],
        correctAnswer: 1,
        explanation: "In Java, the default value of a boolean variable is false.",
        topic: "Java",
        difficulty: "Easy",
        tags: ["java", "primitives"]
    },

    // Data Structures - Medium
    {
        id: 6,
        question: "What is the purpose of the 'virtual' keyword in C++?",
        options: ["To create virtual memory", "To enable runtime polymorphism", "To declare virtual variables", "To optimize performance"],
        correctAnswer: 1,
        explanation: "The 'virtual' keyword enables runtime polymorphism by allowing derived classes to override base class methods.",
        topic: "OOP",
        difficulty: "Medium",
        tags: ["cpp", "polymorphism"]
    },
    {
        id: 7,
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
        correctAnswer: 1,
        explanation: "Merge Sort has O(n log n) average-case time complexity, which is optimal for comparison-based sorting.",
        topic: "Algorithms",
        difficulty: "Medium",
        tags: ["sorting", "time-complexity"]
    },
    {
        id: 8,
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
        topic: "Algorithms",
        difficulty: "Medium",
        tags: ["merge-sort", "space-complexity"]
    },
    {
        id: 9,
        question: "In a hash table, what is a collision?",
        options: ["When two keys hash to the same index", "When the table is full", "When a key is not found", "When the hash function fails"],
        correctAnswer: 0,
        explanation: "A collision occurs when two different keys produce the same hash value and map to the same index.",
        topic: "Data Structures",
        difficulty: "Medium",
        tags: ["hashing", "collision"]
    },
    {
        id: 10,
        question: "What is the difference between '==' and '===' in JavaScript?",
        options: ["No difference", "=== checks type and value", "== is faster", "=== is deprecated"],
        correctAnswer: 1,
        explanation: "=== (strict equality) checks both type and value, while == (loose equality) performs type coercion.",
        topic: "JavaScript",
        difficulty: "Medium",
        tags: ["javascript", "operators"]
    },

    // Data Structures - Hard
    {
        id: 11,
        question: "In a B-tree of order m, what is the maximum number of children a node can have?",
        options: ["m", "m-1", "2m", "m+1"],
        correctAnswer: 0,
        explanation: "In a B-tree of order m, each node can have at most m children.",
        topic: "Data Structures",
        difficulty: "Hard",
        tags: ["b-tree", "advanced"]
    },
    {
        id: 12,
        question: "What is the worst-case time complexity of quicksort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correctAnswer: 2,
        explanation: "Quicksort has O(n²) worst-case time complexity when the pivot selection is poor (e.g., already sorted array).",
        topic: "Algorithms",
        difficulty: "Hard",
        tags: ["quicksort", "time-complexity"]
    },

    // Additional Questions (13-60)
    {
        id: 13,
        question: "What is the time complexity of inserting an element at the beginning of a linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 0,
        explanation: "Inserting at the beginning of a linked list is O(1) as it only requires updating the head pointer.",
        topic: "Data Structures",
        difficulty: "Easy",
        tags: ["linked-list", "insertion"]
    },
    {
        id: 14,
        question: "Which HTTP method is idempotent?",
        options: ["POST", "GET", "PATCH", "All of the above"],
        correctAnswer: 1,
        explanation: "GET is idempotent - multiple identical requests have the same effect as a single request.",
        topic: "Web Development",
        difficulty: "Medium",
        tags: ["http", "rest"]
    },
    {
        id: 15,
        question: "What is a closure in JavaScript?",
        options: ["A function that closes the browser", "A function with access to outer scope", "A closed loop", "A syntax error"],
        correctAnswer: 1,
        explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope.",
        topic: "JavaScript",
        difficulty: "Medium",
        tags: ["javascript", "closures"]
    },
    {
        id: 16,
        question: "What is the purpose of the 'final' keyword in Java?",
        options: ["To finalize objects", "To prevent inheritance/modification", "To improve performance", "To declare constants only"],
        correctAnswer: 1,
        explanation: "The 'final' keyword prevents inheritance (for classes), overriding (for methods), and reassignment (for variables).",
        topic: "Java",
        difficulty: "Medium",
        tags: ["java", "keywords"]
    },
    {
        id: 17,
        question: "Which data structure is best for implementing a priority queue?",
        options: ["Array", "Linked List", "Heap", "Stack"],
        correctAnswer: 2,
        explanation: "Heap is the most efficient data structure for implementing a priority queue with O(log n) operations.",
        topic: "Data Structures",
        difficulty: "Medium",
        tags: ["heap", "priority-queue"]
    },
    {
        id: 18,
        question: "What is the time complexity of accessing an element in a hash table?",
        options: ["O(1) average", "O(n)", "O(log n)", "O(1) worst case"],
        correctAnswer: 0,
        explanation: "Hash tables provide O(1) average-case access time, though worst-case can be O(n) with many collisions.",
        topic: "Data Structures",
        difficulty: "Easy",
        tags: ["hashing", "time-complexity"]
    },
    {
        id: 19,
        question: "What does ACID stand for in database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Atomic, Concurrent, Independent, Durable", "None of the above"],
        correctAnswer: 0,
        explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability - the key properties of database transactions.",
        topic: "Database",
        difficulty: "Medium",
        tags: ["database", "transactions"]
    },
    {
        id: 20,
        question: "Which algorithm is used for finding the shortest path in a weighted graph?",
        options: ["BFS", "DFS", "Dijkstra's", "Binary Search"],
        correctAnswer: 2,
        explanation: "Dijkstra's algorithm finds the shortest path in a weighted graph with non-negative edge weights.",
        topic: "Algorithms",
        difficulty: "Medium",
        tags: ["graphs", "shortest-path"]
    },
    {
        id: 21,
        question: "What is the maximum number of nodes in a binary tree of height h?",
        options: ["2^h", "2^h - 1", "2^(h+1) - 1", "h^2"],
        correctAnswer: 2,
        explanation: "A binary tree of height h can have at most 2^(h+1) - 1 nodes.",
        topic: "Data Structures",
        difficulty: "Medium",
        tags: ["binary-tree", "mathematics"]
    },
    {
        id: 22,
        question: "What is polymorphism in OOP?",
        options: ["Multiple forms of data", "Ability to take multiple forms", "Multiple inheritance", "Data hiding"],
        correctAnswer: 1,
        explanation: "Polymorphism is the ability of objects to take multiple forms, allowing methods to behave differently based on the object.",
        topic: "OOP",
        difficulty: "Easy",
        tags: ["oop", "polymorphism"]
    },
    {
        id: 23,
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correctAnswer: 2,
        explanation: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
        topic: "Database",
        difficulty: "Easy",
        tags: ["database", "nosql"]
    },
    {
        id: 24,
        question: "What is the time complexity of bubble sort in the worst case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 2,
        explanation: "Bubble sort has O(n²) worst-case time complexity when the array is in reverse order.",
        topic: "Algorithms",
        difficulty: "Easy",
        tags: ["sorting", "bubble-sort"]
    },
    {
        id: 25,
        question: "What is a RESTful API?",
        options: ["A sleeping API", "An API following REST principles", "A fast API", "A deprecated API"],
        correctAnswer: 1,
        explanation: "RESTful API follows REST (Representational State Transfer) architectural principles for web services.",
        topic: "Web Development",
        difficulty: "Medium",
        tags: ["rest", "api"]
    },
    {
        id: 26,
        question: "What is the difference between let and var in JavaScript?",
        options: ["No difference", "let is block-scoped", "var is faster", "let is deprecated"],
        correctAnswer: 1,
        explanation: "let is block-scoped while var is function-scoped, making let safer and more predictable.",
        topic: "JavaScript",
        difficulty: "Easy",
        tags: ["javascript", "variables"]
    },
    {
        id: 27,
        question: "What is a deadlock in operating systems?",
        options: ["A locked door", "Processes waiting indefinitely", "A security feature", "A type of lock"],
        correctAnswer: 1,
        explanation: "Deadlock occurs when processes are waiting indefinitely for resources held by each other.",
        topic: "Operating Systems",
        difficulty: "Medium",
        tags: ["os", "deadlock"]
    },
    {
        id: 28,
        question: "Which design pattern ensures a class has only one instance?",
        options: ["Factory", "Singleton", "Observer", "Strategy"],
        correctAnswer: 1,
        explanation: "Singleton pattern ensures a class has only one instance and provides global access to it.",
        topic: "Design Patterns",
        difficulty: "Medium",
        tags: ["design-patterns", "singleton"]
    },
    {
        id: 29,
        question: "What is the purpose of an index in a database?",
        options: ["To count records", "To improve query performance", "To delete data", "To backup data"],
        correctAnswer: 1,
        explanation: "Database indexes improve query performance by allowing faster data retrieval.",
        topic: "Database",
        difficulty: "Easy",
        tags: ["database", "indexing"]
    },
    {
        id: 30,
        question: "What is Big O notation used for?",
        options: ["Measuring code size", "Analyzing algorithm efficiency", "Counting lines of code", "Debugging"],
        correctAnswer: 1,
        explanation: "Big O notation describes the upper bound of algorithm time or space complexity.",
        topic: "Algorithms",
        difficulty: "Easy",
        tags: ["big-o", "complexity"]
    },
    {
        id: 31,
        question: "What is the difference between abstract class and interface in Java?",
        options: ["No difference", "Abstract class can have implementation", "Interface is faster", "Abstract class is deprecated"],
        correctAnswer: 1,
        explanation: "Abstract classes can have method implementations, while interfaces (before Java 8) could only have method declarations.",
        topic: "Java",
        difficulty: "Medium",
        tags: ["java", "oop"]
    },
    {
        id: 32,
        question: "What is a race condition?",
        options: ["A fast algorithm", "Concurrent access causing unexpected behavior", "A sorting algorithm", "A data structure"],
        correctAnswer: 1,
        explanation: "Race condition occurs when multiple threads access shared data concurrently, leading to unexpected behavior.",
        topic: "Concurrency",
        difficulty: "Hard",
        tags: ["concurrency", "threading"]
    },
    {
        id: 33,
        question: "What is the time complexity of DFS (Depth First Search)?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
        correctAnswer: 2,
        explanation: "DFS has time complexity O(V + E) where V is vertices and E is edges.",
        topic: "Algorithms",
        difficulty: "Medium",
        tags: ["graphs", "dfs"]
    },
    {
        id: 34,
        question: "What is normalization in databases?",
        options: ["Making data normal", "Organizing data to reduce redundancy", "Increasing data size", "Deleting data"],
        correctAnswer: 1,
        explanation: "Normalization organizes database tables to reduce redundancy and improve data integrity.",
        topic: "Database",
        difficulty: "Medium",
        tags: ["database", "normalization"]
    },
    {
        id: 35,
        question: "What is the difference between process and thread?",
        options: ["No difference", "Process is heavier than thread", "Thread is deprecated", "Process is faster"],
        correctAnswer: 1,
        explanation: "Processes are independent with separate memory, while threads share memory within a process.",
        topic: "Operating Systems",
        difficulty: "Medium",
        tags: ["os", "concurrency"]
    },
    {
        id: 36,
        question: "What is a callback function in JavaScript?",
        options: ["A function that calls back", "A function passed as argument", "A deprecated function", "A syntax error"],
        correctAnswer: 1,
        explanation: "A callback is a function passed as an argument to another function to be executed later.",
        topic: "JavaScript",
        difficulty: "Easy",
        tags: ["javascript", "callbacks"]
    },
    {
        id: 37,
        question: "What is the purpose of Docker?",
        options: ["To dock ships", "To containerize applications", "To compile code", "To debug code"],
        correctAnswer: 1,
        explanation: "Docker containerizes applications for consistent deployment across different environments.",
        topic: "DevOps",
        difficulty: "Medium",
        tags: ["docker", "containers"]
    },
    {
        id: 38,
        question: "What is a foreign key in databases?",
        options: ["A key from another country", "A reference to primary key in another table", "A backup key", "A deleted key"],
        correctAnswer: 1,
        explanation: "A foreign key is a field that references the primary key in another table, establishing relationships.",
        topic: "Database",
        difficulty: "Easy",
        tags: ["database", "foreign-key"]
    },
    {
        id: 39,
        question: "What is the difference between GET and POST HTTP methods?",
        options: ["No difference", "GET retrieves data, POST sends data", "POST is faster", "GET is deprecated"],
        correctAnswer: 1,
        explanation: "GET retrieves data from server, POST sends data to server for processing.",
        topic: "Web Development",
        difficulty: "Easy",
        tags: ["http", "methods"]
    },
    {
        id: 40,
        question: "What is a linked list?",
        options: ["A list of links", "A linear data structure with nodes", "An array", "A tree"],
        correctAnswer: 1,
        explanation: "A linked list is a linear data structure where elements are stored in nodes connected by pointers.",
        topic: "Data Structures",
        difficulty: "Easy",
        tags: ["linked-list", "fundamentals"]
    },
    {
        id: 41,
        question: "What is the purpose of try-catch in programming?",
        options: ["To try code", "To handle exceptions", "To optimize code", "To debug code"],
        correctAnswer: 1,
        explanation: "try-catch blocks handle exceptions and prevent program crashes.",
        topic: "Programming Fundamentals",
        difficulty: "Easy",
        tags: ["exception-handling", "fundamentals"]
    },
    {
        id: 42,
        question: "What is a binary search tree?",
        options: ["A tree with two nodes", "A tree where left < root < right", "A balanced tree", "A sorted array"],
        correctAnswer: 1,
        explanation: "BST is a tree where left subtree values are less than root, and right subtree values are greater.",
        topic: "Data Structures",
        difficulty: "Medium",
        tags: ["bst", "trees"]
    },
    {
        id: 43,
        question: "What is the difference between synchronous and asynchronous programming?",
        options: ["No difference", "Synchronous blocks, asynchronous doesn't", "Asynchronous is faster", "Synchronous is deprecated"],
        correctAnswer: 1,
        explanation: "Synchronous code blocks execution, while asynchronous allows other code to run while waiting.",
        topic: "Programming Fundamentals",
        difficulty: "Medium",
        tags: ["async", "fundamentals"]
    },
    {
        id: 44,
        question: "What is a graph in data structures?",
        options: ["A chart", "A collection of nodes and edges", "A tree", "An array"],
        correctAnswer: 1,
        explanation: "A graph is a non-linear data structure consisting of nodes (vertices) connected by edges.",
        topic: "Data Structures",
        difficulty: "Easy",
        tags: ["graphs", "fundamentals"]
    },
    {
        id: 45,
        question: "What is the purpose of Git?",
        options: ["To get code", "Version control system", "To compile code", "To debug code"],
        correctAnswer: 1,
        explanation: "Git is a distributed version control system for tracking code changes.",
        topic: "DevOps",
        difficulty: "Easy",
        tags: ["git", "version-control"]
    },
    {
        id: 46,
        question: "What is a promise in JavaScript?",
        options: ["A guarantee", "An object representing async operation", "A function", "A variable"],
        correctAnswer: 1,
        explanation: "A Promise represents the eventual completion or failure of an asynchronous operation.",
        topic: "JavaScript",
        difficulty: "Medium",
        tags: ["javascript", "promises"]
    },
    {
        id: 47,
        question: "What is the difference between stack and heap memory?",
        options: ["No difference", "Stack is for local variables, heap for dynamic allocation", "Heap is faster", "Stack is deprecated"],
        correctAnswer: 1,
        explanation: "Stack stores local variables and function calls, heap stores dynamically allocated memory.",
        topic: "Memory Management",
        difficulty: "Medium",
        tags: ["memory", "stack-heap"]
    },
    {
        id: 48,
        question: "What is a circular linked list?",
        options: ["A circular array", "A linked list where last node points to first", "A loop", "An error"],
        correctAnswer: 1,
        explanation: "In a circular linked list, the last node points back to the first node, forming a circle.",
        topic: "Data Structures",
        difficulty: "Medium",
        tags: ["linked-list", "circular"]
    },
    {
        id: 49,
        question: "What is the purpose of CSS?",
        options: ["To style web pages", "To add functionality", "To store data", "To compile code"],
        correctAnswer: 0,
        explanation: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
        topic: "Web Development",
        difficulty: "Easy",
        tags: ["css", "web"]
    },
    {
        id: 50,
        question: "What is a recursive function?",
        options: ["A function that recurses", "A function that calls itself", "A loop", "An error"],
        correctAnswer: 1,
        explanation: "A recursive function is one that calls itself to solve a problem by breaking it into smaller subproblems.",
        topic: "Programming Fundamentals",
        difficulty: "Easy",
        tags: ["recursion", "fundamentals"]
    }
]
