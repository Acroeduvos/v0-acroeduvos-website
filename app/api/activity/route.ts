import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')

        const activities = db.getActivities(limit)

        const recentActivities = activities.map(activity => ({
            ...activity,
            timestamp: activity.timestamp.toISOString(),
            timeAgo: getTimeAgo(activity.timestamp)
        }))

        return NextResponse.json({
            success: true,
            activities: recentActivities,
            total: activities.length
        })
    } catch (error) {
        console.error('Activity feed error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch activities' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, username, description, metadata } = body

        if (!type || !username || !description) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const activity = db.addActivity({
            id: `activity_${Date.now()}`,
            type,
            username,
            description,
            timestamp: new Date(),
            metadata
        })

        return NextResponse.json({
            success: true,
            activity: {
                ...activity,
                timestamp: activity.timestamp.toISOString()
            }
        })
    } catch (error) {
        console.error('Activity creation error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create activity' },
            { status: 500 }
        )
    }
}

function getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
}
