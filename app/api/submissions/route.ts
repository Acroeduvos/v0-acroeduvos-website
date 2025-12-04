import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { problemId, code, language, status, teamId, userId } = body

        if (!problemId || !teamId || !userId) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create submission record
        const submission = {
            id: `sub_${Date.now()}`,
            problemId,
            code,
            language,
            status,
            timestamp: new Date().toISOString()
        }

        db.addSubmission(submission)

        // If accepted, update team score
        if (status === 'Accepted') {
            const problem = db.getProblemById(problemId)
            // Fallback points if problem not found (shouldn't happen if IDs match)
            const points = problem ? (problem.difficulty === 'Hard' ? 500 : problem.difficulty === 'Medium' ? 300 : 100) : 100

            db.updateTeamScore(teamId, points)
        }

        return NextResponse.json({ success: true, submission })

    } catch (error) {
        console.error('Submissions API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
