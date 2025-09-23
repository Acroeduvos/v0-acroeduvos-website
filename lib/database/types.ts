export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          level: string
          duration: string | null
          instructor_id: string | null
          thumbnail_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          level?: string
          duration?: string | null
          instructor_id?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          level?: string
          duration?: string | null
          instructor_id?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      problems: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          difficulty: "Easy" | "Medium" | "Hard"
          category: string
          acceptance_rate: number | null
          time_complexity: string | null
          space_complexity: string | null
          hints: any[] | null
          examples: any[] | null
          constraints: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          difficulty: "Easy" | "Medium" | "Hard"
          category: string
          acceptance_rate?: number | null
          time_complexity?: string | null
          space_complexity?: string | null
          hints?: any[] | null
          examples?: any[] | null
          constraints?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          difficulty?: "Easy" | "Medium" | "Hard"
          category?: string
          acceptance_rate?: number | null
          time_complexity?: string | null
          space_complexity?: string | null
          hints?: any[] | null
          examples?: any[] | null
          constraints?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      problem_submissions: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          language: string
          code: string
          status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error" | "Compilation Error"
          runtime_ms: number | null
          memory_mb: number | null
          test_cases_passed: number
          total_test_cases: number
          submitted_at: string
        }
        Insert: {
          id?: string
          user_id: string
          problem_id: string
          language: string
          code: string
          status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error" | "Compilation Error"
          runtime_ms?: number | null
          memory_mb?: number | null
          test_cases_passed?: number
          total_test_cases?: number
          submitted_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problem_id?: string
          language?: string
          code?: string
          status?: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error" | "Compilation Error"
          runtime_ms?: number | null
          memory_mb?: number | null
          test_cases_passed?: number
          total_test_cases?: number
          submitted_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          module_id: string
          topic_id: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          module_id: string
          topic_id: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          module_id?: string
          topic_id?: string
          completed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
