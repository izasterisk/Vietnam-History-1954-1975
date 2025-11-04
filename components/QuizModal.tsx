'use client'

import { useState, useEffect } from 'react'

interface QuizQuestion {
  question: string
  options: { label: string; text: string }[]
  correctAnswer: string
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  onCorrectAnswer: () => void
  quiz: QuizQuestion
  eventIndex: number
}

export function QuizModal({ isOpen, onClose, onCorrectAnswer, quiz, eventIndex }: QuizModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setFadeIn(true), 10)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    } else {
      setFadeIn(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    const correct = selectedAnswer === quiz.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setTimeout(() => {
        onCorrectAnswer()
        onClose()
      }, 1500)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        fadeIn ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      }`}
    >
      <div
        className={`relative w-full max-w-2xl bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl p-8 transition-all duration-500 ${
          fadeIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
            🔒
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-heading font-bold text-gray-900 text-center mb-2">
          Mở khóa giai đoạn {eventIndex + 1}
        </h3>
        <p className="text-center text-gray-700 mb-8 font-body">
          Trả lời đúng câu hỏi để mở khóa nội dung
        </p>

        {/* Question */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/60">
          <p className="text-xl font-body text-gray-900 leading-relaxed">
            {quiz.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {quiz.options.map((option) => (
            <button
              key={option.label}
              onClick={() => !showResult && setSelectedAnswer(option.label)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-body text-lg ${
                selectedAnswer === option.label
                  ? 'bg-white/60 border-blue-500 shadow-lg scale-[1.02]'
                  : 'bg-white/30 border-white/40 hover:bg-white/50 hover:scale-[1.01]'
              } ${showResult && option.label === quiz.correctAnswer ? 'bg-green-500/30 border-green-500' : ''} ${
                showResult && selectedAnswer === option.label && !isCorrect ? 'bg-red-500/30 border-red-500' : ''
              } disabled:cursor-not-allowed backdrop-blur-xl`}
            >
              <span className="font-bold text-gray-900 mr-3">{option.label}.</span>
              <span className="text-gray-800">{option.text}</span>
            </button>
          ))}
        </div>

        {/* Result message */}
        {showResult && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-body text-lg animate-fade-in ${
              isCorrect
                ? 'bg-green-500/20 text-green-900 border border-green-500/50'
                : 'bg-red-500/20 text-red-900 border border-red-500/50'
            }`}
          >
            {isCorrect ? '✅ Chính xác! Đang mở khóa...' : '❌ Sai rồi! Hãy thử lại.'}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          {!showResult && (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 text-gray-900 font-body font-semibold hover:bg-white/60 transition-all duration-300 hover:scale-[1.02]"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-body font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Xác nhận
              </button>
            </>
          )}
          {showResult && !isCorrect && (
            <button
              onClick={() => {
                setShowResult(false)
                setSelectedAnswer(null)
              }}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-body font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Thử lại
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
