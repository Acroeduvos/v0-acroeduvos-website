import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

    // Map to leaderboard format
    const leaderboard = teams.map((team, index) => ({
      rank: index + 1,
      teamId: team.id,
      teamName: team.name,
      members: team.members,
      score: team.score,
      solved: team.submissions.filter(s => s.status === 'Accepted').length // This is a simplification, ideally track solved count in Team
    }))

    return NextResponse.json({ success: true, leaderboard })

  } catch (error) {
    console.error('Leaderboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
