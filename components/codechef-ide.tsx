import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CodeChefIDEProps {
  initialLanguage?: string
  onRun?: (code: string, language: string, input: string) => Promise<void>
}

export function CodeChefIDE({ initialLanguage = "cpp", onRun }: CodeChefIDEProps) {
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState(initialLanguage)
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    if (!onRun) return
    setIsRunning(true)
    try {
      await onRun(code, language, input)
    } catch (error) {
      console.error("Error running code:", error)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleRun} disabled={isRunning}>
          {isRunning ? "Running..." : "Run Code"}
        </Button>
      </div>

      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="font-mono min-h-[300px]"
      />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Input</h3>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here..."
          className="font-mono"
          rows={4}
        />
      </div>
    </div>
  )
}
