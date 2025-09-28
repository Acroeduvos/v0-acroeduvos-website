# 🚀 Acroeduvos Compiler & Courses Setup Guide

## ✅ What's New

### 🎯 **Real-Time Multi-Language Compiler**
- **15+ Programming Languages**: Python, Java, C, C++, JavaScript, TypeScript, Go, Rust, PHP, Ruby, SQL, C#, Kotlin, and more
- **Real Code Execution**: Powered by Judge0 API for actual code compilation and execution
- **Beginner to Advanced**: Sample problems with solutions in all languages
- **Error Handling**: Comprehensive error messages and execution statistics

### 📚 **Comprehensive Course Content**
- **20+ Programming Courses**: Complete tutorials for all major technologies
- **Detailed Modules**: Step-by-step learning paths with practical problems
- **MNC Interview Questions**: Real problems from Google, Microsoft, Amazon, etc.
- **Progress Tracking**: Track your learning journey across all courses

## 🔧 Compiler Setup (Optional - for Real Code Execution)

### Step 1: Get Judge0 API Key (Free)
1. Go to [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Sign up for a free account
3. Subscribe to the Judge0 CE API (free tier: 100 requests/day)
4. Copy your API key

### Step 2: Configure Environment Variables
Create a `.env.local` file in your project root:

```env
# Judge0 API Configuration
JUDGE0_API_KEY=your_judge0_api_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Acroeduvos
NEXT_PUBLIC_APP_DESCRIPTION=Learn to Code with Real Interview Questions
NEXT_TELEMETRY_DISABLED=1
```

### Step 3: Test the Compiler
1. Run `npm run dev`
2. Go to `/compiler`
3. Select a programming language
4. Try the sample problems
5. Write your own code and run it!

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended)
1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Add Environment Variables**:
   - `JUDGE0_API_KEY`: Your Judge0 API key
   - `NEXT_PUBLIC_APP_URL`: Your production URL
   - `NEXT_PUBLIC_APP_NAME`: Acroeduvos
3. **Deploy**: Automatic deployment on every push

### Option 2: Other Platforms
- **Netlify**: Similar setup with environment variables
- **Railway**: Full-stack deployment with database support
- **DigitalOcean**: VPS deployment with Docker

## 📖 Available Programming Languages

### **Beginner Friendly**
- **Python**: Easy syntax, great for beginners
- **JavaScript**: Web development essential
- **HTML/CSS**: Web design basics
- **SQL**: Database queries

### **Intermediate**
- **Java**: Object-oriented programming
- **C#**: Microsoft ecosystem
- **PHP**: Web backend development
- **Ruby**: Clean, readable syntax

### **Advanced**
- **C/C++**: System programming, competitive programming
- **Go**: Modern, efficient language
- **Rust**: Memory-safe systems programming
- **TypeScript**: Typed JavaScript

### **Specialized**
- **Kotlin**: Android development
- **Swift**: iOS development
- **Scala**: Functional programming
- **Haskell**: Pure functional programming

## 🎯 Sample Problems Available

### **Easy Problems**
1. **Hello World**: Print "Hello, World!" to console
2. **Simple Calculator**: Add two numbers
3. **Even or Odd**: Check if number is even or odd
4. **Sum of Array**: Calculate sum of array elements

### **Medium Problems**
1. **Fibonacci Sequence**: Generate Fibonacci numbers
2. **Two Sum**: Find two numbers that add up to target
3. **Binary Search**: Search in sorted array
4. **Palindrome Check**: Check if string is palindrome

### **Advanced Problems**
1. **Graph Traversal**: DFS and BFS algorithms
2. **Dynamic Programming**: Optimize recursive solutions
3. **Tree Algorithms**: Binary tree operations
4. **Sorting Algorithms**: Implement various sorts

## 🔧 Features

### **Compiler Features**
- ✅ Real-time code execution
- ✅ Multiple programming languages
- ✅ Input/output handling
- ✅ Error detection and reporting
- ✅ Execution time and memory usage
- ✅ Syntax highlighting
- ✅ Sample problems with solutions
- ✅ Copy, reset, and download code

### **Course Features**
- ✅ 20+ comprehensive courses
- ✅ Step-by-step tutorials
- ✅ Real MNC interview questions
- ✅ Progress tracking
- ✅ Difficulty levels
- ✅ Company-specific problems
- ✅ Interactive learning

## 🚀 Quick Start

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Acroeduvos/v0-acroeduvos-website.git
   cd v0-acroeduvos-website
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   - Go to `http://localhost:3000`
   - Try the compiler at `/compiler`
   - Explore courses at `/courses`

## 📱 Mobile Responsive

The compiler and courses are fully responsive and work great on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🆘 Troubleshooting

### **Compiler Issues**
- **API Key Not Working**: Check your Judge0 API key and subscription
- **Code Not Executing**: Ensure internet connection for API calls
- **Syntax Errors**: Check language-specific syntax requirements

### **Build Issues**
- **Template Literal Errors**: Fixed in latest version
- **Dependency Conflicts**: Use `npm install --legacy-peer-deps`
- **Memory Issues**: Clear `.next` folder and rebuild

### **Deployment Issues**
- **Environment Variables**: Ensure all required variables are set
- **Build Failures**: Check for syntax errors and dependencies
- **API Limits**: Monitor Judge0 API usage

## 🎉 Ready to Code!

Your Acroeduvos platform is now ready with:
- ✅ **Real-time compiler** supporting 15+ languages
- ✅ **Comprehensive courses** with detailed tutorials
- ✅ **MNC interview problems** for practice
- ✅ **Professional UI/UX** for great learning experience

**Start coding now at `/compiler` and learn with `/courses`!** 🚀
