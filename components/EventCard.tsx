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
        <CardTitle className="font-heading">{event.title}</CardTitle>
        <CardDescription className="font-body">
          {event.year} {event.city && `• ${event.city}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-body text-muted-foreground">{event.summary}</p>
      </CardContent>
    </Card>
  )
}

