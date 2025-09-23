// Utility functions for tracking user progress
export interface UserProgress {
  userId: string
  problemId: string
  status: "attempted" | "solved" | "optimized"
  attempts: number
  timeSpent: number
  language: string
  submittedAt: Date
}

export interface UserStats {
  totalProblems: number
  solvedProblems: number
  easyProblems: { solved: number; total: number }
  mediumProblems: { solved: number; total: number }
  hardProblems: { solved: number; total: number }
  currentStreak: number
  maxStreak: number
  totalSubmissions: number
  acceptedSubmissions: number
  rank: number
  points: number
}

export function calculateProgress(userStats: UserStats): number {
  return Math.round((userStats.solvedProblems / userStats.totalProblems) * 100)
}

export function calculateAcceptanceRate(userStats: UserStats): number {
  if (userStats.totalSubmissions === 0) return 0
  return Math.round((userStats.acceptedSubmissions / userStats.totalSubmissions) * 100)
}

export function updateStreak(lastSolvedDate: Date, currentDate: Date = new Date()): number {
  const daysDiff = Math.floor((currentDate.getTime() - lastSolvedDate.getTime()) / (1000 * 60 * 60 * 24))

  if (daysDiff === 0) {
    // Same day, maintain streak
    return 1
  } else if (daysDiff === 1) {
    // Next day, increment streak
    return 1
  } else {
    // Streak broken
    return 0
  }
}

export function calculatePoints(difficulty: "easy" | "medium" | "hard", attempts: number): number {
  const basePoints = {
    easy: 10,
    medium: 25,
    hard: 50,
  }

  const multiplier = Math.max(1, 2 - (attempts - 1) * 0.1) // Reduce points for multiple attempts
  return Math.round(basePoints[difficulty] * multiplier)
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-600"
    case "medium":
      return "text-yellow-600"
    case "hard":
      return "text-red-600"
    default:
      return "text-muted-foreground"
  }
}

export function getStatusIcon(status: string): string {
  switch (status) {
    case "accepted":
    case "solved":
      return "✅"
    case "wrong-answer":
      return "❌"
    case "time-limit-exceeded":
      return "⏰"
    case "memory-limit-exceeded":
      return "💾"
    case "runtime-error":
      return "⚠️"
    default:
      return "⏳"
  }
}
