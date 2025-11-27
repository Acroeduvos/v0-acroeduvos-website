import { NextRequest, NextResponse } from 'next/server'

interface LoginRequest {
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
const users = [
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
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
    avatar: '/placeholder-user.jpg'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in mock database
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64')

    // Return user data without password
    const userData: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }

    return NextResponse.json({
      success: true,
      user: userData,
      token,
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AcroEduvos Authentication API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
}
