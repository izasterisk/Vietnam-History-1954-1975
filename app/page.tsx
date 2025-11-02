// Root page - redirects to default locale (vi)
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/vi')
}

