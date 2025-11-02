// Root layout for all pages with i18n support
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DefaultSeo } from 'next-seo'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { defaultSEOConfig } from '@/lib/seo.config'
import '@/styles/globals.css'
import { LOCALES, type Locale } from '@/lib/constants'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: 'Vietnam 1954–1975',
  description: 'Lịch sử Việt Nam từ 1954 đến 1975',
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header locale={params.locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

