import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LogoSection } from "@/components/logo-section"
import { CoursesPreview } from "@/components/courses-preview"
import { CompilerPreview } from "@/components/compiler-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LogoSection />
        <FeaturesSection />
        <CoursesPreview />
        <CompilerPreview />
      </main>
    </div>
  )
}
