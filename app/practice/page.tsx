import { Header } from "@/components/header"
import { PracticeOverview } from "@/components/practice-overview"
import { getProblems } from "@/lib/database/queries"

export default async function PracticePage() {
  const problems = await getProblems()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PracticeOverview problems={problems} />
      </main>
    </div>
  )
}
