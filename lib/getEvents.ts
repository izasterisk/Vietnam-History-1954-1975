// Load events from MDX files in /content/events
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DEFAULT_COORDS } from './constants'

export interface EventData {
  year: number
  title: string
  summary: string
  lat: number
  lng: number
  slug: string
  city?: string
}

// Stub data in case MDX files are not ready
const STUB_EVENTS: EventData[] = [
  {
    year: 1954,
    title: 'Hiệp định Geneva',
    summary: 'Kết thúc chiến tranh Đông Dương lần thứ nhất',
    lat: DEFAULT_COORDS[1954].lat,
    lng: DEFAULT_COORDS[1954].lng,
    city: DEFAULT_COORDS[1954].city,
    slug: '1954',
  },
  {
    year: 1968,
    title: 'Tết Mậu Thân',
    summary: 'Cuộc tổng tiến công và nổi dậy lớn nhất',
    lat: DEFAULT_COORDS[1968].lat,
    lng: DEFAULT_COORDS[1968].lng,
    city: DEFAULT_COORDS[1968].city,
    slug: '1968',
  },
  {
    year: 1975,
    title: 'Giải phóng miền Nam',
    summary: 'Kết thúc chiến tranh, thống nhất đất nước',
    lat: DEFAULT_COORDS[1975].lat,
    lng: DEFAULT_COORDS[1975].lng,
    city: DEFAULT_COORDS[1975].city,
    slug: '1975',
  },
]

/**
 * Get all events from MDX files in /content/events
 * Falls back to stub data if no MDX files exist
 */
export async function getEvents(): Promise<EventData[]> {
  const eventsDir = path.join(process.cwd(), 'content', 'events')

  // Check if directory exists
  if (!fs.existsSync(eventsDir)) {
    console.warn('Events directory not found, using stub data')
    return STUB_EVENTS
  }

  const files = fs.readdirSync(eventsDir).filter((file) => file.endsWith('.mdx'))

  if (files.length === 0) {
    console.warn('No MDX files found, using stub data')
    return STUB_EVENTS
  }

  const events = files.map((filename) => {
    const filePath = path.join(eventsDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      year: data.year || 0,
      title: data.title || '',
      summary: data.summary || '',
      lat: data.lat || 0,
      lng: data.lng || 0,
      city: data.city || '',
      slug: filename.replace('.mdx', ''),
    } as EventData
  })

  // Sort by year
  return events.sort((a, b) => a.year - b.year)
}

