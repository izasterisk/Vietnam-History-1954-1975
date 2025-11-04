'use client'

import { useState, useEffect } from 'react'
import { EventData } from '@/lib/getEvents'

interface TimelineNavProps {
  events: EventData[]
  currentIndex: number
  onNavigate: (index: number) => void
  unlockedCards: boolean[]
}

export function TimelineNav({ events, currentIndex, onNavigate, unlockedCards }: TimelineNavProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation bar after scrolling past the instruction divider (approximately 800px)
      setIsVisible(window.scrollY > 800)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < events.length - 1

  const handlePrev = () => {
    if (canGoPrev) {
      onNavigate(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      onNavigate(currentIndex + 1)
    }
  }

  // Get year ranges for display (previous, current, next)
  const getDisplayYear = (event: EventData) => {
    // Extract first year from yearRange
    const match = event.yearRange.match(/^\d{4}/)
    return match ? match[0] : event.year.toString()
  }

  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null
  const currentEvent = events[currentIndex]
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
      {/* Frosted glass navigation bar */}
      <div className="bg-white/40 backdrop-blur-xl rounded-full shadow-2xl border border-white/60 px-6 py-4 flex items-center gap-6">
        {/* Previous button */}
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`w-10 h-10 rounded-full bg-white/50 backdrop-blur-lg border border-white/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/70 ${
            !canGoPrev ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
          }`}
          aria-label="Previous period"
        >
          <svg
            className="w-5 h-5 text-gray-900"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Timeline carousel */}
        <div className="flex items-center gap-4">
          {/* Previous year */}
          <div
            className={`text-sm font-body transition-all duration-300 ${
              prevEvent && !unlockedCards[currentIndex - 1]
                ? 'text-gray-400 opacity-40'
                : 'text-gray-600 opacity-60'
            }`}
          >
            {prevEvent ? getDisplayYear(prevEvent) : ''}
          </div>

          {/* Current year - highlighted */}
          <div className="relative">
            <div
              className={`text-2xl font-heading font-bold transition-all duration-300 px-4 py-2 rounded-full ${
                !unlockedCards[currentIndex]
                  ? 'text-gray-400 opacity-50 bg-white/20'
                  : 'text-gray-900 bg-white/60 shadow-lg'
              }`}
            >
              {getDisplayYear(currentEvent)}
            </div>
            {/* Indicator dot */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full" />
          </div>

          {/* Next year */}
          <div
            className={`text-sm font-body transition-all duration-300 ${
              nextEvent && !unlockedCards[currentIndex + 1]
                ? 'text-gray-400 opacity-40'
                : 'text-gray-600 opacity-60'
            }`}
          >
            {nextEvent ? getDisplayYear(nextEvent) : ''}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`w-10 h-10 rounded-full bg-white/50 backdrop-blur-lg border border-white/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/70 ${
            !canGoNext ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
          }`}
          aria-label="Next period"
        >
          <svg
            className="w-5 h-5 text-gray-900"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-2 flex justify-center gap-1.5">
        {events.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-gray-900'
                : unlockedCards[index]
                ? 'w-1.5 bg-gray-600'
                : 'w-1.5 bg-gray-400 opacity-40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
