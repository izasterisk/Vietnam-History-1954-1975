'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState, useRef } from 'react'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

const historicalLocations = [
  { name: 'Hà Nội', position: [21.0285, 105.8542] as LatLngExpression, description: 'Thủ đô Việt Nam Dân chủ Cộng hòa, trung tâm chỉ huy kháng chiến', period: '1954–1975', timelineId: 'timeline-1954---1960' },
  { name: 'Sài Gòn (TP.HCM)', position: [10.8231, 106.6297] as LatLngExpression, description: 'Giải phóng hoàn toàn ngày 30/4/1975, kết thúc cuộc kháng chiến chống Mỹ', period: '1975', timelineId: 'timeline-1975' },
  { name: 'Điện Biên Phủ', position: [21.3833, 103.0167] as LatLngExpression, description: 'Chiến thắng lịch sử 7/5/1954, kết thúc ách thống trị của thực dân Pháp', period: '1954', timelineId: 'timeline-1954---1960' },
  { name: 'Huế', position: [16.4637, 107.5909] as LatLngExpression, description: 'Cố đô, giải phóng trong chiến dịch Xuân 1975', period: '1975', timelineId: 'timeline-1975' },
  { name: 'Đà Nẵng', position: [16.0544, 108.2022] as LatLngExpression, description: 'Thành phố miền Trung, giải phóng ngày 29/3/1975', period: '1975', timelineId: 'timeline-1975' },
  { name: 'Quảng Trị', position: [16.7427, 107.1854] as LatLngExpression, description: 'Chiến trường khốc liệt, mùa hè đỏ lửa 1972', period: '1972', timelineId: 'timeline-1969---1973' },
  { name: 'Buôn Ma Thuột', position: [12.6667, 108.05] as LatLngExpression, description: 'Khởi đầu chiến dịch Tổng tiến công mùa Xuân 1975', period: '1975', timelineId: 'timeline-1975' },
  { name: 'Đường Hồ Chí Minh', position: [15.5, 107.0] as LatLngExpression, description: 'Tuyến đường huyết mạch chi viện cho miền Nam', period: '1959–1975', timelineId: 'timeline-1961---1965' },
  { name: '🇻🇳 Quần đảo Hoàng Sa', position: [16.5, 112.0] as LatLngExpression, description: '🇻🇳 QUẦN ĐẢO HOÀNG SA LÀ CỦA VIỆT NAM - Lãnh thổ thiêng liêng không thể xâm phạm của Tổ quốc Việt Nam', period: 'Chủ quyền Việt Nam', timelineId: null },
  { name: '🇻🇳 Quần đảo Trường Sa', position: [10.0, 114.0] as LatLngExpression, description: '🇻🇳 QUẦN ĐẢO TRƯỜNG SA LÀ CỦA VIỆT NAM - Lãnh thổ thiêng liêng không thể xâm phạm của Tổ quốc Việt Nam', period: 'Chủ quyền Việt Nam', timelineId: null },
]

function SetViewOnLoad() {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds([8.5, 102.0], [23.5, 110.0])
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map])
  return null
}

// Function to scroll to timeline
const scrollToTimeline = (timelineId: string) => {
  const element = document.getElementById(timelineId)
  if (element) {
    const offset = 100
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export default function VietnamMapClient() {
  const [displayMap, setDisplayMap] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Delay render để tránh strict mode double render
    const timer = setTimeout(() => {
      if (!hasInitialized.current) {
        hasInitialized.current = true
        setDisplayMap(true)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Bản đồ Việt Nam
          </h2>
          <p className="text-xl font-body text-gray-700 max-w-3xl mx-auto">
            Khám phá các địa điểm lịch sử quan trọng trong cuộc kháng chiến chống Mỹ, cứu nước (1954-1975)
          </p>
        </div>

        <div ref={containerRef} className="rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
          {!displayMap ? (
            <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500 font-body">Đang tải bản đồ...</p>
            </div>
          ) : (
            <MapContainer
              center={[16.0, 106.0] as LatLngExpression}
              zoom={6}
              style={{ height: '600px', width: '100%' }}
              scrollWheelZoom={true}
              className="z-0"
            >
              <SetViewOnLoad />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {historicalLocations.map((loc) => (
                <Marker key={loc.name} position={loc.position}>
                  <Popup>
                    <div className="font-body min-w-[250px]">
                      <h3 className={`font-bold text-lg mb-2 font-heading ${loc.timelineId === null ? 'text-red-600' : 'text-gray-900'}`}>
                        {loc.name}
                      </h3>
                      <p className={`text-sm mb-2 ${loc.timelineId === null ? 'text-red-700 font-bold' : 'text-gray-700'}`}>
                        {loc.description}
                      </p>
                      <p className={`text-xs font-semibold mb-3 ${loc.timelineId === null ? 'text-red-600' : 'text-gray-600'}`}>
                        {loc.timelineId === null ? '🇻🇳 ' : 'Thời kỳ: '}{loc.period}
                      </p>
                      {loc.timelineId && (
                        <button
                          onClick={() => scrollToTimeline(loc.timelineId)}
                          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <span>📍</span>
                          <span>Xem trên Timeline</span>
                        </button>
                      )}
                      {loc.timelineId === null && (
                        <div className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg text-center border-2 border-red-800">
                          🇻🇳 LÃNH THỔ THIÊNG LIÊNG VIỆT NAM 🇻🇳
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-heading text-2xl font-bold mb-4 text-gray-900">
            Chú thích địa điểm
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {historicalLocations.map((location) => (
              <div
                key={location.name}
                className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                  location.timelineId ? 'cursor-pointer' : 'cursor-default'
                }`}
                onClick={() => location.timelineId && scrollToTimeline(location.timelineId)}
              >
                <div className="text-2xl">📍</div>
                <div className="font-body flex-1">
                  <h4 className={`font-bold ${location.timelineId === null ? 'text-red-600' : 'text-gray-900'}`}>
                    {location.name}
                  </h4>
                  <p className={`text-sm ${location.timelineId === null ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                    {location.period}
                  </p>
                </div>
                {location.timelineId && (
                  <div className="text-blue-600 hover:text-blue-800 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
                {location.timelineId === null && (
                  <div className="text-red-600 font-bold text-xs">
                    🇻🇳
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-gray-600 font-body">
          <p className="text-sm">
            💡 <strong>Hướng dẫn:</strong> Click vào các điểm đánh dấu để xem thông tin chi tiết.
            Nhấn nút <strong>&ldquo;Xem trên Timeline&rdquo;</strong> để đi đến mốc thời gian tương ứng.
          </p>
        </div>
      </div>
    </section>
  )
}
