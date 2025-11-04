// Load events from MDX files in /content/events
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface EventData {
  year: number
  yearRange: string
  title: string
  summary: string
  slug: string
  videoUrl?: string
  audioUrl?: string
  content?: string
}

/**
 * Get all events from MDX files in /content/events
 * Returns events sorted by year
 */
export async function getEvents(): Promise<EventData[]> {
  const eventsDir = path.join(process.cwd(), 'content', 'events')

  // Check if directory exists
  if (!fs.existsSync(eventsDir)) {
    console.warn('Events directory not found')
    return []
  }

  const files = fs.readdirSync(eventsDir).filter((file) => file.endsWith('.mdx'))

  if (files.length === 0) {
    console.warn('No MDX files found')
    return []
  }

  const events = files.map((filename) => {
    const filePath = path.join(eventsDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      year: data.year || 0,
      yearRange: data.yearRange || String(data.year),
      title: data.title || '',
      summary: data.summary || '',
      videoUrl: data.videoUrl || '',
      audioUrl: data.audioUrl || '',
      content: content || '',
      slug: filename.replace('.mdx', ''),
    } as EventData
  })

  // Sort by year
  return events.sort((a, b) => a.year - b.year)
}

