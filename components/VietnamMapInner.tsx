import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix icon marker bị lỗi khi render trong Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

const historicalLocations = [
  { name: 'Hà Nội', position: [21.0285, 105.8542], description: 'Thủ đô Việt Nam Dân chủ Cộng hòa', period: '1954–1975' },
  { name: 'Sài Gòn (TP.HCM)', position: [10.8231, 106.6297], description: 'Giải phóng 30/4/1975', period: '1975' },
  { name: 'Điện Biên Phủ', position: [21.3833, 103.0167], description: 'Chiến thắng 7/5/1954', period: '1954' },
  { name: 'Huế', position: [16.4637, 107.5909], description: 'Giải phóng trong Xuân 1975', period: '1975' },
  { name: 'Đà Nẵng', position: [16.0544, 108.2022], description: 'Giải phóng 29/3/1975', period: '1975' },
  { name: 'Quảng Trị', position: [16.7427, 107.1854], description: 'Mùa hè đỏ lửa 1972', period: '1972' },
  { name: 'Buôn Ma Thuột', position: [12.6667, 108.05], description: 'Mở đầu tổng tiến công 1975', period: '1975' },
  { name: 'Đường Hồ Chí Minh', position: [15.5, 107.0], description: 'Tuyến chi viện chiến lược', period: '1959–1975' },
]

function SetViewOnLoad() {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds([8.5, 102.0], [23.5, 110.0])
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map])
  return null
}

export default function VietnamMapInner() {
  // 👇 chỉ render map nếu window đã tồn tại
  if (typeof window === 'undefined') return null

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Bản đồ Việt Nam
          </h2>
          <p className="text-xl font-body text-gray-700 max-w-3xl mx-auto">
            Các địa điểm lịch sử trong kháng chiến chống Mỹ
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
          <MapContainer
            key="vietnam-map"
            center={[16.0, 106.0]}
            zoom={6}
            style={{ height: '600px', width: '100%' }}
            scrollWheelZoom={true}
          >
            <SetViewOnLoad />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {historicalLocations.map((loc) => (
              <Marker key={loc.name} position={loc.position as [number, number]}>
                <Popup>
                  <strong>{loc.name}</strong>
                  <br />
                  {loc.description}
                  <br />
                  <small>Thời kỳ: {loc.period}</small>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}