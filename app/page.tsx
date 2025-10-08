import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { QuickStartSection } from "@/components/quick-start-section"
import { CoursesPreview } from "@/components/courses-preview"
import { CompilerPreview } from "@/components/compiler-preview"
import dynamic from "next/dynamic"

const AIChat = dynamic(() => import("@/components/ai-chat").then(mod => mod.AIChat), { ssr: false })

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <QuickStartSection />
        <FeaturesSection />
        <CoursesPreview />
        <CompilerPreview />
        <section className="my-8 p-4 border rounded shadow max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">AI Chat Assistant</h2>
          <AIChat />
        </section>
      </main>
    </div>
  )
}