'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export function HeroSection() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.8])

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5ddcb 0%, #e8c5a8 50%, #f5ddcb 100%)',
        opacity,
        scale
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(245,158,11,0.1) 50%, rgba(220,38,38,0.1) 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Background Images - Arc Layout with enhanced animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top row */}
        <motion.div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center gap-[140px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/Ho_chi_minh_trail.jpg"
              alt="Ho Chi Minh Trail"
              width={300}
              height={200}
              className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[-12deg] pointer-events-auto cursor-pointer"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/images2260285_A2__1_.jpg"
              alt="Historic"
              width={300}
              height={200}
              className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[6deg] pointer-events-auto cursor-pointer"
            />
          </motion.div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center gap-[140px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/Redsvn-Ha-Noi-sau-1954-01.jpg"
              alt="Hanoi 1954"
              width={300}
              height={200}
              className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[11deg] pointer-events-auto cursor-pointer"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/dai-hoi-iii.jpg"
              alt="Dai Hoi III"
              width={300}
              height={200}
              className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[-9deg] pointer-events-auto cursor-pointer"
            />
          </motion.div>
        </motion.div>

        {/* Left side arc */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[
            { src: '/images/1968.jpg', top: '15%', rotate: -18 },
            { src: '/images/60.jpg', top: '40%', rotate: -7 },
            { src: '/images/1972.jpg', bottom: '15%', rotate: 13 }
          ].map((img, i) => (
            <motion.div
              key={i}
              className="absolute left-[5%]"
              style={img.top ? { top: img.top } : { bottom: img.bottom }}
              whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={img.src}
                alt={`Historic ${i}`}
                width={300}
                height={200}
                className={`hero-image w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[${img.rotate}deg] pointer-events-auto cursor-pointer`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Right side arc */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[
            { src: '/images/60-2.jpg', top: '15%', rotate: 17 },
            { src: '/images/1975.png', top: '40%', rotate: -8 },
            { src: '/images/1990.jpg', bottom: '15%', rotate: -14 }
          ].map((img, i) => (
            <motion.div
              key={i}
              className="absolute right-[5%]"
              style={img.top ? { top: img.top } : { bottom: img.bottom }}
              whileHover={{ scale: 1.3, rotate: 0, zIndex: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={img.src}
                alt={`Historic ${i}`}
                width={300}
                height={200}
                className={`hero-image w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[${img.rotate}deg] pointer-events-auto cursor-pointer`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Central content */}
      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Main title with animated gradient */}
          <motion.h1
            className="text-7xl md:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            Lịch Sử Việt Nam
          </motion.h1>

          {/* Year range */}
          <motion.div
            className="text-5xl md:text-6xl font-heading font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="inline-block bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border-2 border-gray-800/10">
              1954 - 1975
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl font-body text-gray-800 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Cuộc kháng chiến chống Mỹ, cứu nước vĩ đại
          </motion.p>

          {/* Decorative star */}
          <motion.div
            className="text-6xl mb-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ⭐
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <p className="text-lg font-body text-gray-700">Cuộn xuống để khám phá</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5ddcb] to-transparent" />
    </motion.section>
  )
}
