'use client'

// Map section using react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { EventData } from '@/lib/getEvents'
import { MAP_CENTER } from '@/lib/constants'
import L from 'leaflet'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface MapSectionProps {
  events: EventData[]
  locale: string
}

export function MapSection({ events, locale }: MapSectionProps) {
  return (
    <section id="map" className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">
          {locale === 'vi' ? 'Bản đồ' : 'Map'}
        </h2>
        <div className="rounded-lg overflow-hidden border shadow-lg">
          <MapContainer
            center={[MAP_CENTER.lat, MAP_CENTER.lng]}
            zoom={MAP_CENTER.zoom}
            style={{ height: '600px', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.map((event) => (
              <Marker key={event.slug} position={[event.lat, event.lng]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-base mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.year} {event.city && `• ${event.city}`}
                    </p>
                    <p className="text-sm">{event.summary}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}

