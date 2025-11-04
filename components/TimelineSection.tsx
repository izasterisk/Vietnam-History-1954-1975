'use client'

import { useState, useRef } from 'react'
import { EventData } from '@/lib/getEvents'
import { VideoModal } from './VideoModal'
import ReactMarkdown from 'react-markdown'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { FloatingParticles } from './FloatingParticles'

interface TimelineSectionProps {
  events: EventData[]
}

// Định nghĩa ảnh cho từng sự kiện cụ thể trong mỗi giai đoạn
const periodImages = {
  '1954-1960': [
    { src: '/images/1954-1960/hoa-binh-geneva.jpg', title: 'Hiệp định Giơnevơ 1954', description: 'Kết thúc 9 năm kháng chiến chống Pháp' },
    { src: '/images/1954-1960/cai-cach-ruong-dat.jpg', title: 'Cải cách ruộng đất', description: '2 triệu hộ nông dân được chia 810.000 ha' },
    { src: '/images/1954-1960/khoi-phuc-kinh-te.jpg', title: 'Khôi phục kinh tế miền Bắc', description: 'Hàn gắn vết thương chiến tranh' },
    { src: '/images/1954-1960/dong-khoi-ben-tre.jpg', title: 'Phong trào Đồng khởi', description: 'Bắt đầu từ Bến Tre 17/1/1960' },
    { src: '/images/1954-1960/mat-tran-gp.jpg', title: 'Mặt trận Dân tộc Giải phóng', description: 'Thành lập 20/12/1960' },
  ],
  '1961-1965': [
    { src: '/images/1961-1965/dai-hoi-III.jpg', title: 'Đại hội Đảng lần III', description: 'Tháng 9/1960 - Định hướng cách mạng' },
    { src: '/images/1961-1965/duong-truong-son.jpg', title: 'Đường Trường Sơn', description: 'Tuyến đường Hồ Chí Minh huyền thoại' },
    { src: '/images/1961-1965/ap-bac.jpg', title: 'Chiến thắng Ấp Bắc', description: '2/1/1963 - Chiến thắng vang dội' },
    { src: '/images/1961-1965/binh-gia.jpg', title: 'Trận Bình Giã', description: 'Tháng 12/1964' },
    { src: '/images/1961-1965/dong-xoai.jpg', title: 'Chiến thắng Đồng Xoài', description: 'Tháng 7/1965' },
  ],
  '1965-1968': [
    { src: '/images/1965-1968/khong-quan-My.jpg', title: 'Mỹ đánh phá miền Bắc', description: 'Chiến tranh phá hoại ác liệt' },
    { src: '/images/1965-1968/phong-khong.jpg', title: 'Phòng không nhân dân', description: 'Bắn rơi máy bay B-52' },
    { src: '/images/1965-1968/tet-mau-than.jpg', title: 'Tết Mậu Thân 1968', description: '30/1/1968 - Cuộc tổng tiến công lịch sử' },
    { src: '/images/1965-1968/hoi-nghi-paris.jpg', title: 'Hội nghị Paris', description: 'Mỹ buộc phải đàm phán từ 13/5/1968' },
  ],
  '1969-1973': [
    { src: '/images/1969-1973/bac-ho-qua-doi.jpg', title: 'Bác Hồ qua đời', description: '2/9/1969 - Mất mát to lớn' },
    { src: '/images/1969-1973/lam-son-719.jpg', title: 'Chiến thắng Lam Sơn 719', description: 'Năm 1971 - Đánh bại Mỹ-ngụy' },
    { src: '/images/1969-1973/dien-bien-phu-tren-khong.jpg', title: 'Điện Biên Phủ trên không', description: '12 ngày đêm cuối 1972' },
    { src: '/images/1969-1973/B52-roi.jpg', title: 'B-52 bị bắn rơi', description: 'Chiến thắng vang dội' },
    { src: '/images/1969-1973/hiep-dinh-paris.jpg', title: 'Hiệp định Paris 1973', description: '27/1/1973 - Mỹ rút quân' },
  ],
  '1975': [
    { src: '/images/1975/buon-ma-thuot.jpg', title: 'Chiến dịch Buôn Ma Thuột', description: '10/3/1975 - Mở đầu chiến dịch' },
    { src: '/images/1975/giai-phong-hue.jpg', title: 'Giải phóng Huế', description: '26/3/1975' },
    { src: '/images/1975/giai-phong-da-nang.jpg', title: 'Giải phóng Đà Nẵng', description: '29/3/1975' },
    { src: '/images/1975/chien-dich-ho-chi-minh.jpg', title: 'Chiến dịch Hồ Chí Minh', description: '26/4 - 30/4/1975' },
    { src: '/images/1975/xe-tang-410.jpg', title: 'Xe tăng tiến vào Dinh Độc Lập', description: '11h30 ngày 30/4/1975' },
    { src: '/images/1975/co-chien-thang.jpg', title: 'Cờ đỏ sao vàng tung bay', description: 'Thống nhất non sông' },
  ]
}

// Màu sắc tối hơn, nghiêm trang cho từng giai đoạn
const periodThemes = {
  '1954-1960': {
    gradient: 'from-emerald-800 via-amber-700 to-emerald-900',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900',
    icon: '🌾',
    accentColor: 'emerald',
    particles: 'rgba(16, 185, 129, 0.4)'
  },
  '1961-1965': {
    gradient: 'from-red-800 via-orange-700 to-red-900',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-red-950 to-slate-900',
    icon: '⭐',
    accentColor: 'red',
    particles: 'rgba(185, 28, 28, 0.4)'
  },
  '1965-1968': {
    gradient: 'from-orange-800 via-red-700 to-slate-900',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900',
    icon: '🚀',
    accentColor: 'orange',
    particles: 'rgba(194, 65, 12, 0.4)'
  },
  '1969-1973': {
    gradient: 'from-slate-800 via-red-800 to-slate-900',
    bgGradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    icon: '🏵️',
    accentColor: 'slate',
    particles: 'rgba(71, 85, 105, 0.4)'
  },
  '1975': {
    gradient: 'from-red-900 via-yellow-700 to-red-950',
    bgGradient: 'bg-gradient-to-br from-slate-950 via-red-950 to-slate-950',
    icon: '🇻🇳',
    accentColor: 'red',
    particles: 'rgba(185, 28, 28, 0.6)'
  }
}

// Component Gallery ảnh với animation
function ImageGallery({ images, theme }: { images: any[], theme: any }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="my-8">
      {/* Grid ảnh */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative h-48 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
              {/* Placeholder với gradient và icon */}
              <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center relative`}>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">{theme.icon}</div>
                  <div className="text-white text-xs font-heading font-bold">
                    {img.title}
                  </div>
                </div>
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                <h4 className="text-white font-heading font-bold text-sm mb-1">
                  {img.title}
                </h4>
                <p className="text-gray-300 text-xs font-body">
                  {img.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 border-2 border-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </div>

            {/* Badge số thứ tự */}
            <motion.div
              className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-yellow-500`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {index + 1}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox modal khi click ảnh */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder lớn */}
            <div className={`w-full h-96 bg-gradient-to-br ${theme.gradient} rounded-xl flex items-center justify-center relative`}>
              <div className="text-center p-8">
                <div className="text-9xl mb-4">{theme.icon}</div>
                <h3 className="text-white text-3xl font-heading font-bold mb-2">
                  {images[selectedImage].title}
                </h3>
                <p className="text-gray-300 text-xl font-body">
                  {images[selectedImage].description}
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function EventCard({ event, index }: { event: EventData; index: number }) {
  const [modalOpen, setModalOpen] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  const theme = periodThemes[event.yearRange as keyof typeof periodThemes] || periodThemes['1975']
  const images = periodImages[event.yearRange as keyof typeof periodImages] || []

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="relative group"
      >
        {/* Floating particles for this card */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: theme.particles,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Card container với màu tối hơn */}
        <div className={`event-card ${theme.bgGradient} backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-gray-700 p-12 relative overflow-hidden`}>

          {/* Animated background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />

          {/* Event number badge */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`year-badge absolute -left-6 -top-6 w-16 h-16 bg-gradient-to-br ${theme.gradient} text-white rounded-full flex items-center justify-center text-2xl font-heading font-bold shadow-lg border-4 border-yellow-500 glow-effect`}
          >
            {index + 1}
          </motion.div>

          {/* Icon badge */}
          <motion.div
            className="icon-badge absolute -right-4 -top-4 text-6xl opacity-10 group-hover:opacity-30 transition-opacity"
            whileHover={{ rotate: 360, scale: 1.3 }}
            transition={{ duration: 0.5 }}
          >
            {theme.icon}
          </motion.div>

          {/* Year với màu gradient tối */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            <div className={`text-7xl font-heading font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-3 drop-shadow-lg`}>
              {event.yearRange}
            </div>
            <motion.div
              className={`h-2 bg-gradient-to-r ${theme.gradient} rounded-full shadow-lg`}
              initial={{ width: 0 }}
              animate={isInView ? { width: '8rem' } : { width: 0 }}
              transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* IMAGE GALLERY - Thêm nhiều ảnh cho sự kiện */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            <ImageGallery images={images} theme={theme} />
          </motion.div>

          {/* Title */}
          <motion.h2
            onClick={() => setModalOpen(true)}
            className="text-5xl font-heading font-bold mb-6 cursor-pointer relative inline-block text-white hover:text-yellow-400 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {event.title}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100"
            />
          </motion.h2>

          {/* Summary */}
          <motion.p
            className="text-2xl font-body text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.6 }}
          >
            {event.summary}
          </motion.p>

          {/* Video button */}
          {event.videoUrl && (
            <motion.button
              onClick={() => setModalOpen(true)}
              className={`mb-6 px-8 py-4 rounded-xl bg-gradient-to-r ${theme.gradient} text-white font-heading font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 border-2 border-yellow-500`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">🎬</span>
              <span>Xem Video Tư Liệu Lịch Sử</span>
            </motion.button>
          )}

          {/* Content from MDX */}
          <div className="font-body text-gray-200 text-lg leading-relaxed markdown-content">
            <ReactMarkdown
              components={{
                ul: ({ children }) => (
                  <ul className="list-none pl-6 my-4 space-y-3">
                    {children}
                  </ul>
                ),
                li: ({ children, ...props }) => {
                  const liIndex = props.node?.position?.start.line || 0
                  return (
                    <motion.li
                      className="stagger-item relative pl-6 my-3 leading-relaxed"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ delay: liIndex * 0.1 }}
                    >
                      {children}
                    </motion.li>
                  )
                }
              }}
            >
              {event.content || ''}
            </ReactMarkdown>
          </div>

          {/* Bottom decoration */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400 font-body italic">
                Giai đoạn {index + 1}/5 • Lịch sử Việt Nam 1954-1975
              </div>
              <div className={`text-4xl animate-pulse-glow`}>
                {theme.icon}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoUrl={event.videoUrl || ''}
        title={event.title}
      />
    </>
  )
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated dark background */}
      <div className="absolute inset-0 animate-gradient opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.8) 50%, rgba(15,23,42,0.8) 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      {/* Floating particles */}
      <FloatingParticles count={30} />

      {/* Parallax decorative element */}
      <motion.div
        className="absolute top-20 right-10 text-9xl opacity-5 pointer-events-none"
        style={{ y }}
      >
        🇻🇳
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 space-y-32 relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
            Dòng Chảy Lịch Sử
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto rounded-full shadow-lg" />
        </motion.div>

        {/* Event cards */}
        {events.map((event, index) => (
          <EventCard key={event.slug} event={event} index={index} />
        ))}
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
