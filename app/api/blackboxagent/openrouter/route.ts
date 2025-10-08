import { NextRequest, NextResponse } from 'next/server'

interface OpenRouterRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  model?: string
  temperature?: number
  max_tokens?: number
}

interface OpenRouterResponse {
  success: boolean
  response?: string
  error?: string
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenRouter API key not configured' },
        { status: 500 }
      )
    }

    const { messages, model = 'anthropic/claude-3-haiku', temperature = 0.7, max_tokens = 1000 }: OpenRouterRequest = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Send request to OpenRouter
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AcroEduvos AI Assistant'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenRouter API')
    }

    return NextResponse.json({
      success: true,
      response: data.choices[0].message.content
    })

  } catch (error) {
    console.error('OpenRouter API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}
