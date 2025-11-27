import { NextRequest, NextResponse } from 'next/server'

interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
  category: string
}

interface SupportTicket {
  id: string
  name: string
  email: string
  subject: string
  message: string
  category: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  updatedAt: string
}

// Mock database for support tickets - In production, use a real database
let supportTickets: SupportTicket[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@acroeduvos.in',
    subject: 'Compiler not working',
    message: 'The compiler is showing errors when I try to run Python code.',
    category: 'technical',
    status: 'open',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json()
    const { name, email, subject, message, category } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Determine priority based on category and keywords
    let priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'
    
    if (category === 'security' || subject.toLowerCase().includes('security') || subject.toLowerCase().includes('hack')) {
      priority = 'urgent'
    } else if (category === 'technical' && (subject.toLowerCase().includes('error') || subject.toLowerCase().includes('bug'))) {
      priority = 'high'
    } else if (category === 'billing') {
      priority = 'high'
    } else if (category === 'general') {
      priority = 'low'
    }

    // Create new support ticket
    const newTicket: SupportTicket = {
      id: (supportTickets.length + 1).toString(),
      name,
      email,
      subject,
      message,
      category,
      status: 'open',
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    supportTickets.push(newTicket)

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to support team
    // 3. Send confirmation email to user
    // 4. Create ticket in support system (Zendesk, Freshdesk, etc.)

    // Log the ticket for demo purposes
    console.log('New Support Ticket:', {
      id: newTicket.id,
      name: newTicket.name,
      email: newTicket.email,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: newTicket.priority,
      status: newTicket.status
    })

    return NextResponse.json({
      success: true,
      ticketId: newTicket.id,
      message: 'Support ticket created successfully',
      estimatedResponseTime: priority === 'urgent' ? '2-4 hours' : '24 hours'
    })

  } catch (error) {
    console.error('Support contact error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get('id')
    const email = searchParams.get('email')

    if (ticketId) {
      // Get specific ticket
      const ticket = supportTickets.find(t => t.id === ticketId)
      if (!ticket) {
        return NextResponse.json(
          { success: false, error: 'Ticket not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        ticket
      })
    }

    if (email) {
      // Get tickets for specific email
      const userTickets = supportTickets.filter(t => t.email === email)
      return NextResponse.json({
        success: true,
        tickets: userTickets,
        count: userTickets.length
      })
    }

    // Get all tickets (admin view)
    return NextResponse.json({
      success: true,
      tickets: supportTickets,
      count: supportTickets.length,
      stats: {
        open: supportTickets.filter(t => t.status === 'open').length,
        inProgress: supportTickets.filter(t => t.status === 'in_progress').length,
        resolved: supportTickets.filter(t => t.status === 'resolved').length,
        closed: supportTickets.filter(t => t.status === 'closed').length
      }
    })

  } catch (error) {
    console.error('Support tickets error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, priority, response } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Ticket ID is required' },
        { status: 400 }
      )
    }

    const ticketIndex = supportTickets.findIndex(t => t.id === id)
    if (ticketIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Ticket not found' },
        { status: 404 }
      )
    }

    // Update ticket
    if (status) supportTickets[ticketIndex].status = status
    if (priority) supportTickets[ticketIndex].priority = priority
    supportTickets[ticketIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: 'Ticket updated successfully',
      ticket: supportTickets[ticketIndex]
    })

  } catch (error) {
    console.error('Support ticket update error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
