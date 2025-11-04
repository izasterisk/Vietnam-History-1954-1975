// app/page.tsx
import { getEvents } from '@/lib/getEvents'
import VietnamMapWrapper from '@/components/VietnamMapWrapper'
import { AutoPresentation } from '@/components/AutoPresentation'
import { HeroSection } from '@/components/HeroSection'
import { ScrollProgress } from '@/components/ScrollProgress'

export default async function HomePage() {
  const events = await getEvents()

  return (
    <div className="bg-slate-950">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Hero section */}
      <HeroSection />

      {/* Auto Presentation - Thuyết trình tự động */}
      <AutoPresentation events={events} />

      {/* Vietnam Map Section */}
      <VietnamMapWrapper />
    </div>
  )
}