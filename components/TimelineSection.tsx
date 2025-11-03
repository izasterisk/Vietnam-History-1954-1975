'use client'

import { useState } from 'react'
import { EventData } from '@/lib/getEvents'
import { VideoModal } from './VideoModal'
import ReactMarkdown from 'react-markdown'

interface TimelineSectionProps {
  events: EventData[]
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)

  const handleTitleClick = (event: EventData) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  return (
    <section className="relative bg-[#f5ddcb]">
      {/* Timeline vertical line - sát bên trái */}
      <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-800" />

      {events.map((event, index) => (
        <div
          key={event.slug}
          className="relative min-h-screen flex items-center py-20"
        >
          {/* Year marker - bên trái timeline */}
          <div className="absolute left-0 w-32 text-right pr-4">
            <div className="inline-block">
              <div className="text-4xl font-heading font-bold text-gray-900">
                {event.yearRange}
              </div>
              {/* Dot on timeline */}
              <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-[#f5ddcb]" />
            </div>
          </div>

          {/* Content - bên phải timeline */}
          <div className="ml-32 pl-16 pr-8 max-w-4xl">
            {/* Title - clickable with hover effects */}
            <h2
              onClick={() => handleTitleClick(event)}
              className="timeline-title text-5xl font-heading font-bold text-gray-900 mb-6 cursor-pointer"
            >
              {event.title}
            </h2>

            {/* Summary */}
            <p className="timeline-text text-2xl font-body text-gray-700 mb-8 leading-relaxed">
              {event.summary}
            </p>

            {/* Content from MDX */}
            <div className="timeline-text prose prose-lg max-w-none font-body text-gray-800">
              <ReactMarkdown>{event.content || ''}</ReactMarkdown>
            </div>

            {/* Video hint */}
            {event.videoUrl && (
              <div className="mt-8 inline-flex items-center gap-2 text-gray-600 text-sm font-body">
                <span className="text-2xl">🎬</span>
                <span>Nhấp vào tiêu đề để xem video tư liệu</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Video Modal */}
      {selectedEvent && (
        <VideoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          videoUrl={selectedEvent.videoUrl || ''}
          title={selectedEvent.title}
        />
      )}
    </section>
  )
}

