import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, name, contestId, teamId, username } = body

        if (action === 'create') {
            if (!name || !contestId || !username) {
                return NextResponse.json(
                    { success: false, error: 'Missing required fields' },
                    { status: 400 }
                )
            }

            const team = db.createTeam(name, contestId, username)
            return NextResponse.json({ success: true, team })
        }

        if (action === 'join') {
            if (!teamId || !username) {
                return NextResponse.json(
                    { success: false, error: 'Missing required fields' },
                    { status: 400 }
                )
            }

            const success = db.joinTeam(teamId, username)
            if (success) {
                return NextResponse.json({ success: true, message: 'Joined team successfully' })
            } else {
                return NextResponse.json(
                    { success: false, error: 'Failed to join team' },
                    { status: 400 }
                )
            }
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        )

    } catch (error) {
        console.error('Teams API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const contestId = searchParams.get('contestId')

        if (!contestId) {
            return NextResponse.json(
                { success: false, error: 'Contest ID is required' },
                { status: 400 }
            )
        }

        const teams = db.getTeamsByContest(contestId)
        return NextResponse.json({ success: true, teams })

    } catch (error) {
        console.error('Teams API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
