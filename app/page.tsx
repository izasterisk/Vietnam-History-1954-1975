// Main page: Timeline section
import { TimelineSection } from '@/components/TimelineSection'
import { HeroSection } from '@/components/HeroSection'
import { getEvents } from '@/lib/getEvents'

export default async function HomePage() {
  const events = await getEvents()

  return (
    <div>
      {/* Hero section with scroll fade effect */}
      <HeroSection />

      {/* Divider with instruction */}
      <div className="relative bg-[#f5ddcb] py-8">
        <div className="flex items-center justify-center gap-4 px-8">
          <div className="flex-1 h-px bg-gray-800" />
          <div className="flex items-center gap-3 text-gray-900 font-body text-xl">
            <span className="text-3xl">🎬</span>
            <span>Nhấp vào tiêu đề để xem video tư liệu</span>
          </div>
          <div className="flex-1 h-px bg-gray-800" />
        </div>
        
        {/* Second instruction line */}
        <div className="text-center text-gray-900 font-body text-xl mt-4">
          Nhấp vào năm để mở audio lồng tiếng
        </div>
        
        {/* Animated arrows pointing down */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="animate-bounce-slow text-3xl text-gray-800">↓</div>
          <div className="animate-bounce-slow text-3xl text-gray-800" style={{ animationDelay: '0.2s' }}>↓</div>
          <div className="animate-bounce-slow text-3xl text-gray-800" style={{ animationDelay: '0.4s' }}>↓</div>
        </div>
      </div>

      {/* Timeline Section */}
      <TimelineSection events={events} />
    </div>
  )
}

