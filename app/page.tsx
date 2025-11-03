// Main page: Timeline section
import { TimelineSection } from '@/components/TimelineSection'
import { getEvents } from '@/lib/getEvents'

export default async function HomePage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Vietnam 1954–1975
          </h1>
          <p className="text-xl font-body text-muted-foreground mb-8 max-w-2xl mx-auto">
            Khám phá lịch sử Việt Nam qua dòng thời gian
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection events={events} />
    </div>
  )
}

