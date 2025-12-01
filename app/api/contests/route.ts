import { NextRequest, NextResponse } from 'next/server'

interface Contest {
    id: string
    title: string
    description: string
    startTime: Date
    endTime: Date
    duration: number
    participants: number
    problems: number
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    prize?: string
    status: 'upcoming' | 'live' | 'completed'
    registrations: number
}

// In-memory contest storage (in production, use database)
let contests: Contest[] = []

// Initialize with some sample contests
function initializeContests() {
    const now = new Date()
    const contestTemplates = [
        { title: 'Weekly Challenge', desc: 'Test your skills with curated problems', duration: 120, problems: 4 },
        { title: 'Speed Coding Sprint', desc: 'Fast-paced problem solving', duration: 60, problems: 3 },
        { title: 'Algorithm Marathon', desc: 'Advanced algorithmic challenges', duration: 180, problems: 5 },
    ]

    const difficulties: Array<'Beginner' | 'Intermediate' | 'Advanced'> = ['Beginner', 'Intermediate', 'Advanced']

    contests = []

    // Generate upcoming contests
    for (let i = 0; i < 3; i++) {
        const template = contestTemplates[i % contestTemplates.length]
        const startTime = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000)
        const endTime = new Date(startTime.getTime() + template.duration * 60 * 1000)

        contests.push({
            id: `upcoming-${i}`,
            title: `${template.title} #${Math.floor(Math.random() * 100) + 1}`,
            description: template.desc,
            startTime,
            endTime,
            duration: template.duration,
            participants: 0,
            problems: template.problems,
            difficulty: difficulties[i % 3],
            status: 'upcoming',
            registrations: Math.floor(Math.random() * 200) + 50
        })
    }

    // Generate live contest
    const liveTemplate = contestTemplates[0]
    const liveStartTime = new Date(now.getTime() - 30 * 60 * 1000)
    const liveEndTime = new Date(now.getTime() + liveTemplate.duration * 60 * 1000)

    contests.push({
        id: 'live-1',
        title: `${liveTemplate.title} #${Math.floor(Math.random() * 100) + 1}`,
        description: liveTemplate.desc,
        startTime: liveStartTime,
        endTime: liveEndTime,
        duration: liveTemplate.duration,
        participants: Math.floor(Math.random() * 150) + 50,
        problems: liveTemplate.problems,
        difficulty: 'Intermediate',
        status: 'live',
        registrations: Math.floor(Math.random() * 200) + 100
    })

    // Generate completed contests
    for (let i = 0; i < 5; i++) {
        const template = contestTemplates[i % contestTemplates.length]
        const endTime = new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000)
        const startTime = new Date(endTime.getTime() - template.duration * 60 * 1000)

        contests.push({
            id: `completed-${i}`,
            title: `${template.title} #${Math.floor(Math.random() * 100) + 1}`,
            description: template.desc,
            startTime,
            endTime,
            duration: template.duration,
            participants: Math.floor(Math.random() * 200) + 50,
            problems: template.problems,
            difficulty: difficulties[i % 3],
            status: 'completed',
            registrations: Math.floor(Math.random() * 250) + 100
        })
    }
}

// Initialize contests on module load
initializeContests()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        let filteredContests = contests

        if (status) {
            filteredContests = contests.filter(c => c.status === status)
        }

        return NextResponse.json({
            success: true,
            contests: filteredContests.map(c => ({
                ...c,
                startTime: c.startTime.toISOString(),
                endTime: c.endTime.toISOString()
            })),
            metadata: {
                total: filteredContests.length,
                live: contests.filter(c => c.status === 'live').length,
                upcoming: contests.filter(c => c.status === 'upcoming').length,
                completed: contests.filter(c => c.status === 'completed').length,
                lastUpdated: new Date().toISOString()
            }
        })
    } catch (error) {
        console.error('Contests API error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contests' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, contestId, userId } = body

        if (action === 'register') {
            const contest = contests.find(c => c.id === contestId)
            if (!contest) {
                return NextResponse.json(
                    { success: false, error: 'Contest not found' },
                    { status: 404 }
                )
            }

            if (contest.status !== 'upcoming') {
                return NextResponse.json(
                    { success: false, error: 'Can only register for upcoming contests' },
                    { status: 400 }
                )
            }

            contest.registrations++

            return NextResponse.json({
                success: true,
                message: 'Successfully registered for contest',
                contest: {
                    ...contest,
                    startTime: contest.startTime.toISOString(),
                    endTime: contest.endTime.toISOString()
                }
            })
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        )
    } catch (error) {
        console.error('Contest action error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        )
    }
}
