"use client"

import { useState } from "react"
import { CodeEditor } from "@/components/code-editor"
import { CodeChefIDE } from "@/components/codechef-ide"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function IDEPage() {
  const [resultSuffix, setResultSuffix] = useState(0)

  // Mock onRun that echoes input for demo; integrate with backend runner later
  const onRun = async (code: string, language: string, input: string) => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          input,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.error) {
        return `Error: ${result.error}${result.message ? ` - ${result.message}` : ''}`
      } else {
        return result.output
      }
    } catch (error) {
      return error instanceof Error ? error.message : "An error occurred while executing code"
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Online IDE</h1>
      <p className="text-gray-600 mb-6">Run code in multiple languages with real-time input/output</p>

      <Tabs value="simple" onValueChange={() => setResultSuffix((s) => s + 1)}>
        <TabsList>
          <TabsTrigger value="simple">Simple Editor</TabsTrigger>
          <TabsTrigger value="codechef">Competitive Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="mt-4">
          <CodeEditor initialLanguage="cpp" onRun={onRun} />
        </TabsContent>
        <TabsContent value="codechef" className="mt-4">
          <CodeChefIDE initialLanguage="cpp17" onRun={onRun} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


