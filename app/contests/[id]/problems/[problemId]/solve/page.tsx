import { CodeEditor } from "@/components/code-editor"

export default function SolveProblemPage({
  params,
}: {
  params: { id: string; problemId: string }
}) {
  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">Problem {params.problemId}</h1>
          <div className="mt-4 rounded-lg border p-4">
            <h2 className="font-semibold">Description</h2>
            <p className="mt-2">
              Given an array of integers nums and an integer target, return indices
              of the two numbers such that they add up to target. You may assume
              that each input would have exactly one solution, and you may not use
              the same element twice.
            </p>
            <h2 className="mt-4 font-semibold">Example</h2>
            <pre className="mt-2 rounded-lg bg-muted p-4">
              <code>
                Input: nums = [2,7,11,15], target = 9{"\n"}
                Output: [0,1]{"\n"}
                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
              </code>
            </pre>
            <h2 className="mt-4 font-semibold">Constraints</h2>
            <ul className="mt-2 list-inside list-disc">
              <li>2 ≤ nums.length ≤ 10⁴</li>
              <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>-10⁹ ≤ target ≤ 10⁹</li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>
        </div>
        <div>
          <CodeEditor initialLanguage="cpp" />
        </div>
      </div>
    </div>
  )
}
