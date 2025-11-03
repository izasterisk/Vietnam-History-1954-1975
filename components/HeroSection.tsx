'use client'

// Hero section with scroll fade effect
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function HeroSection() {
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      // Fade out images as user scrolls (0 to 1 screen height)
      const opacity = Math.max(0, 1 - scrollY / windowHeight)
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f5ddcb] relative overflow-hidden">
      {/* Background Images - Arc Layout with scroll fade */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      >
        {/* Top - 2 images above text */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center gap-[140px]">
          <Image
            src="/images/Ho_chi_minh_trail.jpg"
            alt="Ho Chi Minh Trail"
            width={300}
            height={200}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[-12deg] pointer-events-auto cursor-pointer"
          />
          <Image
            src="/images/images2260285_A2__1_.jpg"
            alt="Historic"
            width={300}
            height={200}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[6deg] pointer-events-auto cursor-pointer"
          />
        </div>

        {/* Bottom - 2 images below text */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center gap-[140px]">
          <Image
            src="/images/Redsvn-Ha-Noi-sau-1954-01.jpg"
            alt="Hanoi 1954"
            width={300}
            height={200}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[11deg] pointer-events-auto cursor-pointer"
          />
          <Image
            src="/images/dai-hoi-iii.jpg"
            alt="Dai Hoi III"
            width={300}
            height={200}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[-9deg] pointer-events-auto cursor-pointer"
          />
        </div>

        {/* Left side - 3 images in arc */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full">
          <Image
            src="/images/1968.jpg"
            alt="1968"
            width={300}
            height={200}
            className="hero-image absolute left-[5%] top-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[-18deg] pointer-events-auto cursor-pointer"
          />
          <Image
            src="/images/60.jpg"
            alt="1960"
            width={300}
            height={200}
            className="hero-image absolute left-[8%] top-[40%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[-7deg] pointer-events-auto cursor-pointer"
          />
          <Image
            src="/images/1972.jpg"
            alt="1972"
            width={300}
            height={200}
            className="hero-image absolute left-[5%] bottom-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[13deg] pointer-events-auto cursor-pointer"
          />
        </div>

        {/* Right side - 3 images in arc */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full">
          <Image
            src="/images/60-2.jpg"
            alt="1960s"
            width={300}
            height={200}
            className="hero-image absolute right-[5%] top-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[17deg] pointer-events-auto cursor-pointer"
          />
          <Image
            src="/images/1975.png"
            alt="1975"
            width={300}
            height={200}
            className="hero-image absolute right-[8%] top-[40%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[8deg] pointer-events-auto cursor-pointer"
          />
          <Image
            src="/images/1990.jpg"
            alt="1990"
            width={300}
            height={200}
            className="hero-image absolute right-[5%] bottom-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[-14deg] pointer-events-auto cursor-pointer"
          />
        </div>
      </div>

      {/* Text Content - Always visible, no fade, compact width */}
      <div className="text-center px-4 relative z-10 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-8">
          Vietnam 1954–1975
        </h1>
        <p className="text-2xl md:text-3xl font-body text-muted-foreground">
          Khám phá lịch sử Việt Nam qua dòng thời gian
        </p>
      </div>
    </section>
  )
}

