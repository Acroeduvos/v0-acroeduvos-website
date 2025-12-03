import { codingProblems, CodingProblem } from './coding-problems'
import { mcqQuestions, MCQQuestion } from './questions-bank'

// In-memory store types
interface Store {
    problems: CodingProblem[]
    questions: MCQQuestion[]
    submissions: Submission[]
    stats: {
        activeUsers: number
        totalSubmissions: number
        successRate: number
    }
}

interface Submission {
    id: string
    problemId: string
    code: string
    language: string
    status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error'
    timestamp: string
}

// Singleton store instance
let store: Store = {
    problems: codingProblems,
    questions: mcqQuestions,
    submissions: [],
    stats: {
        activeUsers: 124, // Initial realistic value
        totalSubmissions: 0,
        successRate: 0
    }
}

// Database methods
export const db = {
    // Problems
    getProblems: () => store.problems,
    getProblemById: (id: string) => store.problems.find(p => p.id === id),
    getProblemBySlug: (slug: string) => store.problems.find(p => p.id === slug), // Assuming id is used as slug for now

    // Questions
    getQuestions: () => store.questions,

    // Submissions
    addSubmission: (submission: Submission) => {
        store.submissions.push(submission)
        store.stats.totalSubmissions++

        // Update success rate
        const successful = store.submissions.filter(s => s.status === 'Accepted').length
        store.stats.successRate = (successful / store.stats.totalSubmissions) * 100

        return submission
    },
    getSubmissions: () => store.submissions,

    // Stats
    getStats: () => {
        // Simulate active user fluctuation
        const fluctuation = Math.floor(Math.random() * 5) - 2
        store.stats.activeUsers = Math.max(50, store.stats.activeUsers + fluctuation)

        return store.stats
    }
}
