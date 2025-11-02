// Header component with navigation and theme toggle
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { TRANSLATIONS, type Locale } from '@/lib/constants'

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const t = TRANSLATIONS[locale]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="font-bold text-xl">
            Vietnam 1954–1975
          </Link>
          <nav className="hidden md:flex gap-6">
            <a
              href="#timeline"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t.timeline}
            </a>
            <a
              href="#map"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t.map}
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

