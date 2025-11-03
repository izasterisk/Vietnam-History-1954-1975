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
    <section className="relative bg-[#f5ddcb] py-20">
      <div className="max-w-5xl mx-auto px-8 space-y-32">
        {events.map((event, index) => (
          <div
            key={event.slug}
            className="relative group"
          >
            {/* Card container */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-gray-800/10 p-12 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              {/* Event number badge */}
              <div className="absolute -left-6 -top-6 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-heading font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Year with decorative line */}
              <div className="mb-6">
                <div className="text-6xl font-heading font-bold text-gray-900 mb-3">
                  {event.yearRange}
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-gray-900 to-transparent rounded-full" />
              </div>

              {/* Title - clickable with hover effects */}
              <h2
                onClick={() => handleTitleClick(event)}
                className="timeline-title text-5xl font-heading font-bold text-gray-900 mb-6 cursor-pointer"
              >
                {event.title}
              </h2>

              {/* Summary */}
              <p className="text-2xl font-body text-gray-700 mb-8 leading-relaxed">
                {event.summary}
              </p>

              {/* Content from MDX */}
              <div className="font-body text-gray-800 text-lg leading-relaxed markdown-content">
                <ReactMarkdown>{event.content || ''}</ReactMarkdown>
              </div>

              {/* Bottom decoration */}
              <div className="mt-8 pt-6 border-t border-gray-300/50">
                <div className="text-sm text-gray-500 font-body italic">
                  Giai đoạn {index + 1}/5
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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

