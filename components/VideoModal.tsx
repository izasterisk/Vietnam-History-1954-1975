'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

function extractYouTubeId(url: string): string | null {
  // Match youtube.com/watch?v=... or youtu.be/...
  const match1 = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  const match2 = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  const match3 = url.match(/embed\/([a-zA-Z0-9_-]{11})/)
  return (match1 && match1[1]) || (match2 && match2[1]) || (match3 && match3[1]) || null
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const videoId = extractYouTubeId(videoUrl)

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // Prevent scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  if (!videoId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-white rounded-xl p-6 max-w-md">
          <p className="text-red-600 font-body">
            ⚠️ Link YouTube không hợp lệ
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Đóng
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="Đóng"
        >
          <X size={24} />
        </button>

        {/* Video embed */}
        <div className="relative pb-[56.25%] h-0 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {/* Title */}
        <div className="p-6 bg-[#f5ddcb]">
          <h3 className="text-2xl font-heading font-semibold text-gray-900">
            {title}
          </h3>
        </div>
      </div>
    </div>
  )
}
