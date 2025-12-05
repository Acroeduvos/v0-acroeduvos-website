import Link from "next/link"

const QUESTION_BANK: Record<string, Array<{ id: string; title: string; difficulty: "Easy" | "Medium" | "Hard"; tags: string[] }>> = {
  google: [
    { id: "two-sum", title: "Two Sum", difficulty: "Easy", tags: ["Array", "HashMap"] },
    { id: "word-ladder", title: "Word Ladder", difficulty: "Hard", tags: ["BFS", "Graphs"] },
    { id: "meeting-rooms-ii", title: "Meeting Rooms II", difficulty: "Medium", tags: ["Heap", "Intervals"] },
  ],
  microsoft: [
    { id: "lru-cache", title: "LRU Cache", difficulty: "Medium", tags: ["Design", "HashMap", "LinkedList"] },
    { id: "course-schedule", title: "Course Schedule", difficulty: "Medium", tags: ["Graph", "TopoSort"] },
  ],
  amazon: [
    { id: "k-closest", title: "K Closest Points to Origin", difficulty: "Medium", tags: ["Heap"] },
    { id: "longest-substring", title: "Longest Substring Without Repeating", difficulty: "Medium", tags: ["Sliding Window"] },
  ],
  tcs: [
    { id: "sum-of-digits", title: "Sum of Digits", difficulty: "Easy", tags: ["Math", "Loops"] },
    { id: "armstrong-number", title: "Armstrong Number", difficulty: "Easy", tags: ["Math"] },
  ],
}

export default function CompanyQuestionsPage({ params }: { params: { company: string } }) {
  const list = QUESTION_BANK[params.company] || []

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold capitalize">{params.company} Questions</h1>
          <p className="text-gray-600">Practice curated company-specific problems</p>
        </div>
        <Link href={`/mncs/${params.company}`} className="rounded-md border px-3 py-2 text-sm">Back to Hub</Link>
      </div>

      <div className="grid gap-4">
        {list.map((q) => (
          <div key={q.id} className="rounded-lg border p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">{q.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                <span className="rounded-full bg-gray-100 px-2 py-0.5">{q.difficulty}</span>
                {q.tags.map((t) => (
                  <span key={t} className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">{t}</span>
                ))}
              </div>
            </div>
            <Link href={`/mncs/${params.company}/questions/${q.id}`} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">Solve</Link>
          </div>
        ))}
        {list.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-gray-600">No questions added yet for this company.</div>
        )}
      </div>
    </div>
  )
}


