import { codingProblems, CodingProblem } from './coding-problems'
import { mcqQuestions, MCQQuestion } from './questions-bank'

// In-memory store types
interface Store {
    problems: CodingProblem[]
    questions: MCQQuestion[]
    submissions: Submission[]
    activities: Activity[]
    contests: Contest[]
    users: User[]
    stats: {
        activeUsers: number
        totalSubmissions: number
        successRate: number
        totalProblemsSolved: number
        coursesCompleted: number
        lastUpdated: Date
    }
}

export interface Submission {
    id: string
    problemId: string
    code: string
    language: string
    status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error'
    timestamp: string
}

export interface Activity {
    id: string
    type: 'submission' | 'course_start' | 'achievement' | 'problem_solved'
    username: string
    description: string
    timestamp: Date
    metadata?: any
}

export interface Contest {
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

export interface User {
    id: string
    username: string
    name: string
    avatar?: string
    score: number
    totalSubmissions: number
    accuracy: number
    streak: number
    lastActivity: string
    isOnline: boolean
    level: string
    badges: string[]
    recentActivity: {
        type: string
        problem: string
        timestamp: string
        result: string
    }[]
}

// Initialize with sample data
const initialActivities: Activity[] = [
    { id: 'act_1', type: 'problem_solved', username: 'CodeMaster', description: 'solved "Binary Search" in 12 minutes', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'act_2', type: 'course_start', username: 'PythonPro', description: 'started the Java Programming course', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { id: 'act_3', type: 'achievement', username: 'AlgoNinja', description: 'achieved a 15-day coding streak!', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 'act_4', type: 'problem_solved', username: 'DataWizard', description: 'completed "Two Sum" problem', timestamp: new Date(Date.now() - 1000 * 60 * 45) },
]

const initialContests: Contest[] = [
    {
        id: 'live-1',
        title: 'Weekly Challenge #42',
        description: 'Test your skills with curated problems',
        startTime: new Date(Date.now() - 30 * 60 * 1000),
        endTime: new Date(Date.now() + 90 * 60 * 1000),
        duration: 120,
        participants: 156,
        problems: 4,
        difficulty: 'Intermediate',
        status: 'live',
        registrations: 245
    },
    {
        id: 'upcoming-1',
        title: 'Speed Coding Sprint #12',
        description: 'Fast-paced problem solving',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
        duration: 60,
        participants: 0,
        problems: 3,
        difficulty: 'Advanced',
        status: 'upcoming',
        registrations: 89
    },
    {
        id: 'completed-1',
        title: 'Algorithm Marathon #5',
        description: 'Advanced algorithmic challenges',
        startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 180 * 60 * 1000),
        duration: 180,
        participants: 342,
        problems: 5,
        difficulty: 'Advanced',
        status: 'completed',
        registrations: 400
    }
]

const generateUsers = (): User[] => {
    const usernames = ['CodeMaster', 'AlgoNinja', 'PythonPro', 'JavaGuru', 'CppExpert', 'DataWizard', 'TechLead', 'DevChamp', 'CodeGenius', 'AlgoKing', 'BugHunter', 'DebugMaster', 'LogicPro', 'SyntaxGuru', 'CompileBoss']
    const names = ['Alex Chen', 'Sarah Johnson', 'Mike Rodriguez', 'Emma Wilson', 'David Kim', 'Lisa Zhang', 'Tom Brown', 'Amy Lee', 'Chris Davis', 'Maria Garcia', 'John Smith', 'Anna Taylor', 'Kevin Wang', 'Rachel Green', 'Steve White']
    const badges = ['Gold Medal', 'Silver Medal', 'Bronze Medal', 'Speed Demon', 'Accuracy Master', 'Streak King', 'Problem Solver', 'Code Reviewer', 'Team Player', 'Innovator']
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master']

    return usernames.map((username, index) => ({
        id: `user_${index + 1}`,
        username,
        name: names[index],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        score: Math.floor(Math.random() * 5000) + 1000,
        totalSubmissions: Math.floor(Math.random() * 500) + 50,
        accuracy: Math.random() * 30 + 70,
        streak: Math.floor(Math.random() * 50) + 1,
        lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        isOnline: Math.random() > 0.3,
        level: levels[Math.floor(Math.random() * levels.length)],
        badges: badges.slice(0, Math.floor(Math.random() * 4) + 1),
        recentActivity: []
    }))
}

// Singleton store instance
let store: Store = {
    problems: codingProblems,
    questions: mcqQuestions,
    submissions: [],
    activities: initialActivities,
    contests: initialContests,
    users: generateUsers(),
    stats: {
        activeUsers: 124,
        totalSubmissions: 1543,
        successRate: 68.5,
        totalProblemsSolved: 892,
        coursesCompleted: 45,
        lastUpdated: new Date()
    }
}

// Database methods
export const db = {
    // Problems
    getProblems: () => store.problems,
    getProblemById: (id: string) => store.problems.find(p => p.id === id),
    getProblemBySlug: (slug: string) => store.problems.find(p => p.id === slug),

    // Questions
    getQuestions: () => store.questions,

    // Submissions
    addSubmission: (submission: Submission) => {
        store.submissions.push(submission)
        store.stats.totalSubmissions++

        // Update success rate
        const successful = store.submissions.filter(s => s.status === 'Accepted').length
        store.stats.successRate = (successful / store.stats.totalSubmissions) * 100

        // Add activity
        db.addActivity({
            id: `act_${Date.now()}`,
            type: 'submission',
            username: 'CurrentUser', // In real app, get from session
            description: `submitted solution for problem`,
            timestamp: new Date()
        })

        if (submission.status === 'Accepted') {
            store.stats.totalProblemsSolved++
            db.addActivity({
                id: `act_${Date.now()}_solved`,
                type: 'problem_solved',
                username: 'CurrentUser',
                description: `solved a problem!`,
                timestamp: new Date()
            })
        }

        return submission
    },
    getSubmissions: () => store.submissions,

    // Activities
    getActivities: (limit: number = 10) => {
        return store.activities
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit)
    },
    addActivity: (activity: Activity) => {
        store.activities.unshift(activity)
        if (store.activities.length > 100) store.activities.pop()
        return activity
    },

    // Contests
    getContests: () => store.contests,
    getContestById: (id: string) => store.contests.find(c => c.id === id),
    registerForContest: (contestId: string) => {
        const contest = store.contests.find(c => c.id === contestId)
        if (contest) {
            contest.registrations++
            return true
        }
        return false
    },

    // Users / Leaderboard
    getUsers: () => store.users,
    updateUserScore: (userId: string, score: number) => {
        const user = store.users.find(u => u.id === userId)
        if (user) {
            user.score = score
            return user
        }
        return null
    },

    // Stats
    getStats: () => {
        // Simulate active user fluctuation
        const fluctuation = Math.floor(Math.random() * 5) - 2
        store.stats.activeUsers = Math.max(50, store.stats.activeUsers + fluctuation)
        store.stats.lastUpdated = new Date()

        return store.stats
    }
}
