// Root layout
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Vietnam 1954–1975',
  description: 'Lịch sử Việt Nam từ 1954 đến 1975',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="font-body">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

