// Main page: Timeline and Map sections in one page
import { TimelineSection } from '@/components/TimelineSection'
import { MapSection } from '@/components/MapSection'
import { Button } from '@/components/ui/button'
import { getEvents } from '@/lib/getEvents'
import { TRANSLATIONS, type Locale } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'

interface PageProps {
  params: { locale: Locale }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = params
  const events = await getEvents()
  const t = TRANSLATIONS[locale]

  return (
    <div className="min-h-screen">
      {/* Hero section with scroll button */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Vietnam 1954–1975
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {locale === 'vi'
              ? 'Khám phá lịch sử Việt Nam qua dòng thời gian và bản đồ tương tác'
              : 'Explore Vietnam history through interactive timeline and map'}
          </p>
          <a href="#map">
            <Button size="lg" className="gap-2">
              {t.scrollToMap}
              <ChevronDown className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection events={events} locale={locale} />

      {/* Map Section */}
      <MapSection events={events} locale={locale} />
    </div>
  )
}

