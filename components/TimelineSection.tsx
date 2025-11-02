'use client'

// Timeline section using react-vertical-timeline-component
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { EventData } from '@/lib/getEvents'
import { Calendar } from 'lucide-react'

interface TimelineSectionProps {
  events: EventData[]
  locale: string
}

export function TimelineSection({ events, locale }: TimelineSectionProps) {
  return (
    <section id="timeline" className="py-16 bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">
          {locale === 'vi' ? 'Dòng thời gian' : 'Timeline'}
        </h2>
        <VerticalTimeline lineColor="hsl(var(--border))">
          {events.map((event) => (
            <VerticalTimelineElement
              key={event.slug}
              className="vertical-timeline-element"
              contentStyle={{
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              }}
              contentArrowStyle={{
                borderRight: '7px solid hsl(var(--card))',
              }}
              date={event.year.toString()}
              iconStyle={{
                background: 'hsl(var(--primary))',
                color: '#fff',
              }}
              icon={<Calendar />}
            >
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              {event.city && (
                <h4 className="text-sm text-muted-foreground mb-2">
                  {event.city}
                </h4>
              )}
              <p className="text-sm">{event.summary}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  )
}

