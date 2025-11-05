'use client'

import { useEffect } from 'react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

export function ImageModal({ isOpen, onClose, title, description }: ImageModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto animate-fade-in"
        onClick={onClose}
      />

      {/* Modal positioned at top-right */}
      <div className="absolute top-8 right-8 pointer-events-auto animate-slide-in-right">
        {/* Frosted glass card - same style as TimelineNav */}
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 max-w-md">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/50 backdrop-blur-lg border border-white/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/70 hover:rotate-90"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4 text-gray-900"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-xl font-heading font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-base font-body text-gray-800 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
