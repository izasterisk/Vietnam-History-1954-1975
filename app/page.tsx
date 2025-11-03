// Main page: Timeline section
import { TimelineSection } from '@/components/TimelineSection'
import { HeroSection } from '@/components/HeroSection'
import { getEvents } from '@/lib/getEvents'

export default async function HomePage() {
  const events = await getEvents()

  return (
    <div>
      {/* Hero section with scroll fade effect */}
      <HeroSection />

      {/* Timeline Section */}
      <TimelineSection events={events} />
    </div>
  )
}

