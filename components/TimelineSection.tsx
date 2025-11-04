'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { EventData } from '@/lib/getEvents'
import { VideoModal } from './VideoModal'
import { QuizModal } from './QuizModal'
import { TimelineNav } from './TimelineNav'
import ReactMarkdown from 'react-markdown'
import Lenis from 'lenis'

interface TimelineSectionProps {
  events: EventData[]
}

// Quiz questions for locked cards
const quizQuestions = [
  null, // Card 1 is unlocked
  {
    question: 'Nhiệm vụ hàng đầu của miền Bắc Việt Nam ngay sau khi Hiệp định Giơnevơ được ký kết vào tháng 7 năm 1954 là gì?',
    options: [
      { label: 'A', text: 'Hàn gắn vết thương chiến tranh và phục hồi kinh tế quốc dân' },
      { label: 'B', text: 'Củng cố miền Bắc trở thành hậu phương vững mạnh cho miền Nam' },
      { label: 'C', text: 'Triển khai kế hoạch ba năm phát triển kinh tế (1958 - 1960)' },
      { label: 'D', text: 'Xoá bỏ hoàn toàn chế độ chiếm hữu ruộng đất của địa chủ' },
    ],
    correctAnswer: 'A',
  },
  {
    question: 'Trong giai đoạn 1961 - 1965, đế quốc Mỹ đã triển khai chiến lược chiến tranh nào ở miền Nam Việt Nam?',
    options: [
      { label: 'A', text: 'Việt Nam hoá chiến tranh' },
      { label: 'B', text: 'Chiến tranh đặc biệt' },
      { label: 'C', text: 'Chiến tranh phá hoại' },
      { label: 'D', text: 'Chiến tranh cục bộ' },
    ],
    correctAnswer: 'B',
  },
  {
    question: 'Sự kiện nào diễn ra vào đầu năm 1968 đã làm phá sản chiến lược "Chiến tranh cục bộ" và buộc Mỹ phải chấp nhận đàm phán tại Paris?',
    options: [
      { label: 'A', text: 'Chiến dịch Tây Nguyên' },
      { label: 'B', text: 'Trận "Điện Biên Phủ trên không"' },
      { label: 'C', text: 'Cuộc tổng tiến công và nổi dậy Tết Mậu Thân' },
      { label: 'D', text: 'Chiến thắng Ấp Bắc' },
    ],
    correctAnswer: 'C',
  },
  {
    question: 'Thắng lợi của quân dân miền Bắc trong 12 ngày đêm cuối năm 1972 chống lại cuộc tập kích bằng máy bay B.52 của Mỹ được mệnh danh là gì?',
    options: [
      { label: 'A', text: 'Chiến dịch Hồ Chí Minh' },
      { label: 'B', text: 'Chiến dịch Lam Sơn 719' },
      { label: 'C', text: 'Chiến thắng Đồng Xoài' },
      { label: 'D', text: 'Trận "Điện Biên Phủ trên không"' },
    ],
    correctAnswer: 'D',
  },
]

export function TimelineSection({ events }: TimelineSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null)
  const [unlockedCards, setUnlockedCards] = useState<boolean[]>([true, false, false, false, false])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Track which card is currently in view with throttling
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      return // Skip if already processing
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = cardRefs.current.length - 1; i >= 0; i--) {
        const card = cardRefs.current[i]
        if (card) {
          const rect = card.getBoundingClientRect()
          const cardTop = window.scrollY + rect.top
          const cardBottom = cardTop + rect.height

          if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
            setCurrentCardIndex(i)
            break
          }
        }
      }
      scrollTimeoutRef.current = null
    }, 100) // Throttle to every 100ms
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  // Stop audio when scrolling to different card
  useEffect(() => {
    if (playingAudioIndex !== null && playingAudioIndex !== currentCardIndex) {
      stopAudio()
    }
  }, [currentCardIndex, playingAudioIndex])

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlayingAudioIndex(null)
  }, [])

  const handleYearClick = useCallback((event: EventData, index: number) => {
    if (!unlockedCards[index]) return

    // Stop current audio if playing
    if (playingAudioIndex === index) {
      stopAudio()
      return
    }

    // Stop any currently playing audio
    stopAudio()

    // Play new audio
    if (event.audioUrl) {
      const audio = new Audio(event.audioUrl)
      audioRef.current = audio
      setPlayingAudioIndex(index)
      
      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
        setPlayingAudioIndex(null)
      })

      // Reset when audio ends
      audio.onended = () => {
        setPlayingAudioIndex(null)
      }
    }
  }, [unlockedCards, playingAudioIndex, stopAudio])

  const handleNavigate = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      // Get Lenis instance from window
      const lenis = (window as any).lenis as Lenis | undefined
      
      if (lenis) {
        // Use Lenis scrollTo for smooth scroll
        const offset = 100
        const elementPosition = card.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset
        
        lenis.scrollTo(offsetPosition, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        // Fallback to regular scrollIntoView
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [])

  const handleTitleClick = useCallback((event: EventData, index: number) => {
    if (unlockedCards[index]) {
      setSelectedEvent(event)
      setModalOpen(true)
    }
  }, [unlockedCards])

  const handleCardClick = useCallback((index: number) => {
    if (!unlockedCards[index] && quizQuestions[index]) {
      setCurrentQuizIndex(index)
      setQuizModalOpen(true)
    }
  }, [unlockedCards])

  const handleQuizCorrect = useCallback(() => {
    if (currentQuizIndex !== null) {
      const newUnlockedCards = [...unlockedCards]
      newUnlockedCards[currentQuizIndex] = true
      setUnlockedCards(newUnlockedCards)
    }
  }, [currentQuizIndex, unlockedCards])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!unlockedCards[index] && cardRefs.current[index]) {
      const rect = cardRefs.current[index]!.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [unlockedCards])

  return (
    <section className="relative bg-[#f5ddcb] py-20 overflow-hidden">
      {/* Animated background pattern for frosted glass effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-5xl mx-auto px-8 space-y-32">
        {events.map((event, index) => {
          const isLocked = !unlockedCards[index]
          
          return (
            <div
              key={event.slug}
              id={`timeline-${event.yearRange.replace(/\s/g, '-')}`}
              className="relative group"
            >
              {/* Card container with iOS frosted glass effect */}
              <div
                ref={(el) => { cardRefs.current[index] = el }}
                onClick={() => handleCardClick(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                className={`bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-12 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-[1.02] hover:bg-white/50 ${
                  isLocked ? 'cursor-pointer relative overflow-hidden' : ''
                }`}
                style={
                  isLocked
                    ? {
                        background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent)`,
                      }
                    : undefined
                }
              >
                {/* Blur overlay for locked cards */}
                {isLocked && (
                  <div className="absolute inset-0 backdrop-blur-md bg-white/20 rounded-3xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔒</div>
                      <p className="text-2xl font-heading font-bold text-gray-900">Nội dung bị khóa</p>
                      <p className="text-lg font-body text-gray-700 mt-2">Nhấp để mở khóa</p>
                    </div>
                  </div>
                )}

                {/* Event number badge */}
                <div className={`absolute -left-6 -top-6 w-12 h-12 ${isLocked ? 'bg-gray-400' : 'bg-gray-900'} text-white rounded-full flex items-center justify-center text-xl font-heading font-bold shadow-lg z-20`}>
                  {index + 1}
                </div>

                {/* Year with decorative line - clickable with hover effects */}
                <div className="mb-6">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleYearClick(event, index)
                    }}
                    className={`text-6xl font-heading font-bold mb-3 transition-all duration-300 ${
                      isLocked 
                        ? 'text-gray-400 blur-sm cursor-default' 
                        : `text-gray-900 cursor-pointer hover:text-blue-600 hover:-translate-y-2 ${
                            playingAudioIndex === index ? 'text-blue-600 animate-pulse' : ''
                          }`
                    }`}
                  >
                    {event.yearRange}
                    {playingAudioIndex === index && !isLocked && (
                      <span className="ml-3 text-3xl">🔊</span>
                    )}
                  </div>
                  <div className="h-1 w-24 bg-gradient-to-r from-gray-900 to-transparent rounded-full" />
                </div>

                {/* Title - clickable with hover effects */}
                <h2
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTitleClick(event, index)
                  }}
                  className={`timeline-title text-5xl font-heading font-bold mb-6 ${
                    isLocked ? 'text-gray-400 blur-sm cursor-default' : 'text-gray-900 cursor-pointer'
                  }`}
                >
                  {event.title}
                </h2>

                {/* Summary */}
                <p className={`text-2xl font-body mb-8 leading-relaxed ${isLocked ? 'text-gray-400 blur-sm' : 'text-gray-700'}`}>
                  {event.summary}
                </p>

                {/* Content from MDX */}
                <div className={`font-body text-lg leading-relaxed markdown-content ${isLocked ? 'text-gray-400 blur-sm' : 'text-gray-800'}`}>
                  <ReactMarkdown>{event.content || ''}</ReactMarkdown>
                </div>

                {/* Bottom decoration */}
                <div className="mt-8 pt-6 border-t border-gray-300/50">
                  <div className={`text-sm font-body italic ${isLocked ? 'text-gray-400 blur-sm' : 'text-gray-500'}`}>
                    Giai đoạn {index + 1}/5
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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

      {/* Quiz Modal */}
      {currentQuizIndex !== null && quizQuestions[currentQuizIndex] && (
        <QuizModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
          onCorrectAnswer={handleQuizCorrect}
          quiz={quizQuestions[currentQuizIndex]}
          eventIndex={currentQuizIndex}
        />
      )}

      {/* Timeline Navigation Bar */}
      <TimelineNav
        events={events}
        currentIndex={currentCardIndex}
        onNavigate={handleNavigate}
        unlockedCards={unlockedCards}
      />
    </section>
  )
}
