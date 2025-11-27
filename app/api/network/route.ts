import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  // Get client IP
  const clientIP = request.ip || 
    request.headers.get('x-forwarded-for') || 
    request.headers.get('x-real-ip') || 
    'unknown'

  // Check if IP is in allowed range (172.16.20.x)
  const isAllowedIP = clientIP.includes('172.16.20.') || 
    clientIP === '127.0.0.1' || 
    clientIP === 'localhost'

  if (action === 'status') {
    return NextResponse.json({
      status: 'online',
      timestamp: new Date().toISOString(),
      clientIP,
      isAllowedIP,
      networkConfig: {
        allowedIPRange: '172.16.20.0/24',
        port: 3000,
        host: '0.0.0.0',
        domain: 'acroeduvos.in'
      },
      liveFeatures: {
        realTimeUpdates: true,
        dynamicPages: true,
        networkAccess: true,
        corsEnabled: true
      }
    })
  }

  if (action === 'config') {
    return NextResponse.json({
      network: {
        host: '0.0.0.0',
        port: 3000,
        allowedIPs: [
          '127.0.0.1',
          'localhost',
          '172.16.20.0/24',
          'acroeduvos.in'
        ],
        cors: {
          origin: '*',
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          headers: ['Content-Type', 'Authorization']
        }
      },
      dynamicPages: {
        enabled: true,
        fallback: true,
        revalidate: 60
      },
      features: {
        realTimeStats: true,
        liveActivity: true,
        networkDeployment: true
      }
    })
  }

  return NextResponse.json({
    message: 'AcroEduvos Network API',
    version: '1.0.0',
    endpoints: {
      '/api/network?action=status': 'Get network status',
      '/api/network?action=config': 'Get network configuration'
    }
  })
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}
