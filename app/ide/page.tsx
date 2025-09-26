"use client"

import { useState, useEffect } from "react"
import { CodeEditor } from "@/components/code-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IDEPage() {
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")

  const handleRun = async (code: string, language: string, input: string) => {
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
        setOutput(`Error: ${result.error}${result.message ? ` - ${result.message}` : ''}`)
        setStatus("error")
      } else {
        setOutput(result.output)
        setStatus(result.status)
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "An error occurred while executing code")
      setStatus("error")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Online IDE</h1>
        <p className="mt-2 text-gray-600">
          Write, compile, and run code in multiple programming languages
        </p>
      </div>

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="editor">Code Editor</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <CodeEditor onRun={handleRun} />
        </TabsContent>

        <TabsContent value="settings">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Editor Settings</h3>
            <p className="text-sm text-gray-600">Coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}