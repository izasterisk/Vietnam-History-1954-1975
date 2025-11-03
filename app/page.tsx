// Main page: Timeline section
import { TimelineSection } from '@/components/TimelineSection'
import { getEvents } from '@/lib/getEvents'

export default async function HomePage() {
  const events = await getEvents()

  return (
    <div>
      {/* Hero section - Full screen */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="container text-center px-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-8">
            Vietnam 1954–1975
          </h1>
          <p className="text-2xl md:text-3xl font-body text-muted-foreground max-w-3xl mx-auto">
            Khám phá lịch sử Việt Nam qua dòng thời gian
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection events={events} />
    </div>
  )
}

