'use client'

// Hero section with scroll fade effect
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { ImageModal } from './ImageModal'

// Image information data
const imageInfo: Record<string, { title: string; description: string }> = {
  '1968.jpg': {
    title: 'Chiến trường miền Nam 1965–1968',
    description: 'Bộ đội ta xung phong trên chiến trường miền Nam giai đoạn 1965–1968, thời kỳ "Chiến tranh cục bộ".',
  },
  '60.jpg': {
    title: 'Phong trào phản đối chiến tranh',
    description: 'Nhân dân miền Bắc mít-tinh phản đối chiến tranh, ủng hộ phong trào "Đánh cho Mỹ cút, đánh cho ngụy nhào" (1967–1968)',
  },
  '1972.jpg': {
    title: 'Chiến thắng Điện Biên Phủ trên không',
    description: 'Nhân dân Hà Nội chào mừng chiến thắng Điện Biên Phủ trên không (12/1972) – "Hà Nội 12 ngày đêm"',
  },
  'Ho_chi_minh_trail.jpg': {
    title: 'Đường Hồ Chí Minh',
    description: 'Lực lượng du kích miền Nam hành quân qua rừng Trường Sơn trên tuyến đường Hồ Chí Minh (1960–1965)',
  },
  'images2260285_A2__1_.jpg': {
    title: 'Phong trào Đồng Khởi',
    description: 'Phụ nữ miền Nam trong "Phong trào Đồng Khởi" (1960), tiêu biểu là "Đội quân tóc dài" Bến Tre.',
  },
  '60-2.jpg': {
    title: 'Đại hội Đảng lần thứ III',
    description: 'Cán bộ, đảng viên miền Bắc dự Đại hội Đảng toàn quốc lần thứ III (9/1960) – Đại hội "Xây dựng CNXH ở miền Bắc"',
  },
  '1975.png': {
    title: 'Giải phóng Sài Gòn',
    description: 'Xe tăng 390 húc đổ cổng Dinh Độc Lập trưa 30/4/1975 – kết thúc Chiến dịch Hồ Chí Minh.',
  },
  '1990.jpg': {
    title: 'Tay cày tay súng',
    description: 'Nông dân miền Bắc tham gia hợp tác xã nông nghiệp, "tay cày tay súng" trong giai đoạn 1965–1968',
  },
  'Redsvn-Ha-Noi-sau-1954-01.jpg': {
    title: 'Tái thiết miền Bắc',
    description: 'Đoàn tàu và công nhân khôi phục giao thông sau Hiệp định Genève 1954 – biểu trưng cho tái thiết miền Bắc.',
  },
  'dai-hoi-iii.jpg': {
    title: 'Chủ tịch Hồ Chí Minh gửi thư Tết',
    description: 'Chủ tịch Hồ Chí Minh gặp gỡ đại biểu, gửi thư chúc Tết Kỷ Dậu 1969 – lời hiệu triệu "Tiến lên! Toàn thắng ắt về ta!"',
  },
}

export function HeroSection() {
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const [selectedImage, setSelectedImage] = useState<{ title: string; description: string } | null>(null)
  const [animatingImage, setAnimatingImage] = useState<{
    src: string
    startRect: DOMRect
    isAnimating: boolean
  } | null>(null)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    // Fade out images as user scrolls (0 to 1 screen height)
    const opacity = Math.max(0, 1 - scrollY / windowHeight)
    setScrollOpacity(opacity)
  }, [])

  const handleImageClick = useCallback((imageSrc: string, e: React.MouseEvent<HTMLImageElement>) => {
    const filename = imageSrc.split('/').pop()
    if (filename && imageInfo[filename]) {
      // Get the clicked image's position and size
      const imgElement = e.currentTarget
      const rect = imgElement.getBoundingClientRect()
      
      // Start animation
      setAnimatingImage({
        src: imageSrc,
        startRect: rect,
        isAnimating: true,
      })
      
      // Set selected image info for modal
      setSelectedImage(imageInfo[filename])
    }
  }, [])

  const handleCloseModal = useCallback(() => {
    // Trigger reverse animation
    if (animatingImage) {
      setAnimatingImage({ ...animatingImage, isAnimating: false })
      
      // Wait for animation to complete before clearing
      setTimeout(() => {
        setAnimatingImage(null)
        setSelectedImage(null)
      }, 500) // Match animation duration
    } else {
      setSelectedImage(null)
    }
  }, [animatingImage])

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f5ddcb] relative overflow-hidden">
      {/* Ambient Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(#f5ddcb 60%, #e5c9b1)' }}
      />

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0.2))' }}
      />

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
            width={224}
            height={144}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/Ho_chi_minh_trail.jpg', e)}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[-12deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
          <Image
            src="/images/images2260285_A2__1_.jpg"
            alt="Historic"
            width={224}
            height={144}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/images2260285_A2__1_.jpg', e)}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[6deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
        </div>

        {/* Bottom - 2 images below text */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center gap-[140px]">
          <Image
            src="/images/Redsvn-Ha-Noi-sau-1954-01.jpg"
            alt="Hanoi 1954"
            width={224}
            height={144}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/Redsvn-Ha-Noi-sau-1954-01.jpg', e)}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[11deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
          <Image
            src="/images/dai-hoi-iii.jpg"
            alt="Dai Hoi III"
            width={224}
            height={144}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/dai-hoi-iii.jpg', e)}
            className="hero-image w-56 h-36 object-cover rounded-lg shadow-lg opacity-60 rotate-[-9deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
        </div>

        {/* Left side - 3 images in arc */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full">
          <Image
            src="/images/1968.jpg"
            alt="1968"
            width={192}
            height={128}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/1968.jpg', e)}
            className="hero-image absolute left-[5%] top-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[-18deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
          <Image
            src="/images/60.jpg"
            alt="1960"
            width={192}
            height={128}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/60.jpg', e)}
            className="hero-image absolute left-[8%] top-[40%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[-7deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
          <Image
            src="/images/1972.jpg"
            alt="1972"
            width={192}
            height={128}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/1972.jpg', e)}
            className="hero-image absolute left-[5%] bottom-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[13deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
        </div>

        {/* Right side - 3 images in arc */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full">
          <Image
            src="/images/60-2.jpg"
            alt="1960s"
            width={192}
            height={128}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/60-2.jpg', e)}
            className="hero-image absolute right-[5%] top-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[17deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
          <Image
            src="/images/1975.png"
            alt="1975"
            width={192}
            height={128}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/1975.png', e)}
            className="hero-image absolute right-[8%] top-[40%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[8deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
          />
          <Image
            src="/images/1990.jpg"
            alt="1990"
            width={192}
            height={128}
            loading="lazy"
            quality={85}
            onClick={(e) => handleImageClick('/images/1990.jpg', e)}
            className="hero-image absolute right-[5%] bottom-[15%] w-48 h-32 object-cover rounded-lg shadow-lg opacity-70 rotate-[-14deg] pointer-events-auto cursor-pointer transition-all duration-500 hover:opacity-100 hover:scale-[1.3] hover:rotate-0 hover:z-20"
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

      {/* Animating Image Overlay */}
      {animatingImage && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <Image
            src={animatingImage.src}
            alt="Animating"
            width={400}
            height={300}
            className="absolute rounded-lg shadow-2xl pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: animatingImage.isAnimating 
                ? '50%' 
                : `${animatingImage.startRect.left}px`,
              top: animatingImage.isAnimating 
                ? '50%' 
                : `${animatingImage.startRect.top}px`,
              width: animatingImage.isAnimating 
                ? `${animatingImage.startRect.width * 2}px` 
                : `${animatingImage.startRect.width}px`,
              height: animatingImage.isAnimating 
                ? `${animatingImage.startRect.height * 2}px` 
                : `${animatingImage.startRect.height}px`,
              transform: animatingImage.isAnimating 
                ? 'translate(-50%, -50%) rotate(0deg)' 
                : 'rotate(0deg)',
              opacity: animatingImage.isAnimating ? 1 : 0,
            }}
          />
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={handleCloseModal}
        title={selectedImage?.title || ''}
        description={selectedImage?.description || ''}
      />
    </section>
  )
}

