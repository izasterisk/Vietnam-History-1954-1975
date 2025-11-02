// Event card component for displaying individual events
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { EventData } from '@/lib/getEvents'

interface EventCardProps {
  event: EventData
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {event.year} {event.city && `• ${event.city}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{event.summary}</p>
      </CardContent>
    </Card>
  )
}

