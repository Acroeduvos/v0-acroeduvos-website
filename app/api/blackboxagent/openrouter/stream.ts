import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'OpenRouter API key not configured' },
      { status: 500 }
    )
  }

  const { messages, model = 'anthropic/claude-3-haiku', temperature = 0.7, max_tokens = 1000 } = await request.json()

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { success: false, error: 'Messages array is required' },
      { status: 400 }
    )
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
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
            max_tokens,
            stream: true
          })
        })

        if (!response.ok || !response.body) {
          controller.error(new Error(`OpenRouter API error: ${response.status}`))
          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          if (value) {
            controller.enqueue(value)
          }
        }
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
