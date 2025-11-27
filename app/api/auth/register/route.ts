import { NextRequest, NextResponse } from 'next/server'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

// Mock user database - In production, use a real database
let users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@acroeduvos.in',
    password: 'demo123',
    role: 'student',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@acroeduvos.in',
    password: 'admin123',
    role: 'admin',
    avatar: '/placeholder-user.jpg'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password,
      role: 'student',
      avatar: '/placeholder-user.jpg'
    }

    users.push(newUser)

    // Return user data without password
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    }

    return NextResponse.json({
      success: true,
      user: userData,
      message: 'Registration successful'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AcroEduvos Registration API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
}
