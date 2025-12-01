import { NextRequest, NextResponse } from 'next/server'

interface Activity {
    id: string
    type: 'submission' | 'course_start' | 'achievement' | 'problem_solved'
    username: string
    description: string
    timestamp: Date
    metadata?: any
}

// In-memory activity feed (in production, use database)
let activityFeed: Activity[] = []
let activityIdCounter = 1

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')

        // Return most recent activities
        const recentActivities = activityFeed
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit)
            .map(activity => ({
                ...activity,
                timestamp: activity.timestamp.toISOString(),
                timeAgo: getTimeAgo(activity.timestamp)
            }))

        return NextResponse.json({
            success: true,
            activities: recentActivities,
            total: activityFeed.length
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

        const activity: Activity = {
            id: `activity_${activityIdCounter++}`,
            type,
            username,
            description,
            timestamp: new Date(),
            metadata
        }

        activityFeed.push(activity)

        // Keep only last 100 activities to prevent memory issues
        if (activityFeed.length > 100) {
            activityFeed = activityFeed.slice(-100)
        }

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

// Seed with some initial activities
if (activityFeed.length === 0) {
    const sampleActivities = [
        { type: 'problem_solved', username: 'CodeMaster', description: 'solved "Binary Search" in 12 minutes' },
        { type: 'course_start', username: 'PythonPro', description: 'started the Java Programming course' },
        { type: 'achievement', username: 'AlgoNinja', description: 'achieved a 15-day coding streak!' },
        { type: 'problem_solved', username: 'DataWizard', description: 'completed "Two Sum" problem' },
    ]

    sampleActivities.forEach((activity, index) => {
        activityFeed.push({
            id: `activity_${activityIdCounter++}`,
            type: activity.type as Activity['type'],
            username: activity.username,
            description: activity.description,
            timestamp: new Date(Date.now() - (index + 1) * 5 * 60 * 1000) // Stagger by 5 minutes
        })
    })
}
