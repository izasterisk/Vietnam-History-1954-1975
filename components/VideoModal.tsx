'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

function extractYouTubeId(url: string): string | null {
  const match1 = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  const match2 = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  const match3 = url.match(/embed\/([a-zA-Z0-9_-]{11})/)
  return (match1 && match1[1]) || (match2 && match2[1]) || (match3 && match3[1]) || null
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const videoId = extractYouTubeId(videoUrl)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!videoId) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 max-w-md shadow-2xl"
            >
              <p className="text-red-600 font-body text-lg">
                ⚠️ Link YouTube không hợp lệ
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 p-1 rounded-2xl">
              <div className="bg-white rounded-xl h-full w-full" />
            </div>

            {/* Content */}
            <div className="relative">
              {/* Close button with animation */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg"
                aria-label="Đóng"
              >
                <X size={24} />
              </motion.button>

              {/* Video embed with loading animation */}
              <div className="relative pb-[56.25%] h-0 bg-black rounded-t-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>

              {/* Title with gradient background */}
              <div className="p-6 bg-gradient-to-r from-[#f5ddcb] to-[#e8c5a8]">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-heading font-bold text-gray-900 flex items-center gap-3"
                >
                  <span className="text-3xl">🎬</span>
                  {title}
                </motion.h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
