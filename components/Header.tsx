// Header component with navigation
import Link from 'next/link'
import { TRANSLATIONS } from '@/lib/constants'

export function Header() {
  const t = TRANSLATIONS

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading font-bold text-xl">
            Vietnam 1954–1975
          </Link>
          <nav className="hidden md:flex gap-6">
            <a
              href="#timeline"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t.timeline}
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
