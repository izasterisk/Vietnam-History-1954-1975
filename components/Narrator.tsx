'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NarratorProps {
  isPlaying: boolean
  currentPeriod: number
  onTogglePlay: () => void
  isSpeaking: boolean
}

export function Narrator({ isPlaying, currentPeriod, onTogglePlay, isSpeaking }: NarratorProps) {
  // Animation cho miệng khi đang nói
  const mouthAnimation = isSpeaking ? {
    scaleY: [1, 1.3, 1, 1.2, 1],
    transition: { duration: 0.3, repeat: Infinity }
  } : {}

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-8 right-8 z-50 cursor-move"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        {/* Glow effect khi đang nói */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full blur-xl opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Avatar container */}
        <div className="relative w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-yellow-500 shadow-2xl overflow-hidden">
          {/* Placeholder avatar */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-800 via-orange-700 to-red-900">
            {/* Face */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-8 mb-4">
                <motion.div
                  className="w-3 h-3 bg-white rounded-full"
                  animate={isSpeaking ? { scaleY: [1, 0.3, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <motion.div
                  className="w-3 h-3 bg-white rounded-full"
                  animate={isSpeaking ? { scaleY: [1, 0.3, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>

              {/* Mouth */}
              <motion.div
                className="w-12 h-2 bg-gray-900 rounded-full"
                animate={mouthAnimation}
              />

              {/* Badge giai đoạn */}
              <div className="absolute bottom-4 text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">
                Giai đoạn {currentPeriod + 1}/5
              </div>
            </div>
          </div>

          {/* Speaking waves */}
          {isSpeaking && (
            <div className="absolute -right-8 top-1/2 -translate-y-1/2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-500 rounded-full mb-1"
                  animate={{
                    x: [0, 15, 30],
                    opacity: [1, 0.5, 0],
                    scale: [1, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <motion.div
          className="absolute -top-4 -left-4 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Play/Pause button */}
          <motion.button
            onClick={onTogglePlay}
            className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold border-2 border-yellow-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>
        </motion.div>

        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-heading font-bold border-2 border-yellow-500 shadow-lg">
            {isSpeaking ? '🎙️ Đang thuyết trình...' : '⏸️ Tạm dừng'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

