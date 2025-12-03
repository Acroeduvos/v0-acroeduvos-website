import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const contests = db.getContests()
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
            const success = db.registerForContest(contestId)

            if (!success) {
                return NextResponse.json(
                    { success: false, error: 'Contest not found' },
                    { status: 404 }
                )
            }

            const contest = db.getContestById(contestId)

            return NextResponse.json({
                success: true,
                message: 'Successfully registered for contest',
                contest: contest ? {
                    ...contest,
                    startTime: contest.startTime.toISOString(),
                    endTime: contest.endTime.toISOString()
                } : null
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
