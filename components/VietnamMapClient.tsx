'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
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
  { name: 'Hà Nội', position: [21.0285, 105.8542], description: 'Thủ đô Việt Nam Dân chủ Cộng hòa, trung tâm chỉ huy kháng chiến', period: '1954–1975' },
  { name: 'Sài Gòn (TP.HCM)', position: [10.8231, 106.6297], description: 'Giải phóng hoàn toàn ngày 30/4/1975, kết thúc cuộc kháng chiến chống Mỹ', period: '1975' },
  { name: 'Điện Biên Phủ', position: [21.3833, 103.0167], description: 'Chiến thắng lịch sử 7/5/1954, kết thúc ách thống trị của thực dân Pháp', period: '1954' },
  { name: 'Huế', position: [16.4637, 107.5909], description: 'Cố đô, giải phóng trong chiến dịch Xuân 1975', period: '1975' },
  { name: 'Đà Nẵng', position: [16.0544, 108.2022], description: 'Thành phố miền Trung, giải phóng ngày 29/3/1975', period: '1975' },
  { name: 'Quảng Trị', position: [16.7427, 107.1854], description: 'Chiến trường khốc liệt, mùa hè đỏ lửa 1972', period: '1972' },
  { name: 'Buôn Ma Thuột', position: [12.6667, 108.05], description: 'Khởi đầu chiến dịch Tổng tiến công mùa Xuân 1975', period: '1975' },
  { name: 'Đường Hồ Chí Minh', position: [15.5, 107.0], description: 'Tuyến đường huyết mạch chi viện cho miền Nam', period: '1959–1975' },
  // Thêm marker cho Hoàng Sa và Trường Sa
  { name: 'Quần đảo Hoàng Sa', position: [16.5, 112.0], description: 'Quần đảo Hoàng Sa - Lãnh thổ Việt Nam', period: 'Lịch sử' },
  { name: 'Quần đảo Trường Sa', position: [10.0, 114.0], description: 'Quần đảo Trường Sa - Lãnh thổ Việt Nam', period: 'Lịch sử' },
]

function SetViewOnLoad() {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds([8.5, 102.0], [23.5, 110.0])
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map])
  return null
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
              center={[16.0, 106.0]}
              zoom={6}
              style={{ height: '600px', width: '100%' }}
              scrollWheelZoom={true}
              className="z-0"
            >
              <SetViewOnLoad />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={20}
              />
              {historicalLocations.map((loc) => (
                <Marker key={loc.name} position={loc.position as [number, number]}>
                  <Popup>
                    <div className="font-body">
                      <h3 className="font-bold text-lg mb-2 font-heading">{loc.name}</h3>
                      <p className="text-sm mb-2">{loc.description}</p>
                      <p className="text-xs text-gray-600 font-semibold">
                        Thời kỳ: {loc.period}
                      </p>
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
              <div key={location.name} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl">📍</div>
                <div className="font-body">
                  <h4 className="font-bold text-gray-900">{location.name}</h4>
                  <p className="text-sm text-gray-600">{location.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-gray-600 font-body">
          <p className="text-sm">
            💡 <strong>Hướng dẫn:</strong> Click vào các điểm đánh dấu để xem thông tin chi tiết.
            Sử dụng chuột để phóng to/thu nhỏ và di chuyển bản đồ.
          </p>
        </div>
      </div>
    </section>
  )
}
