// SEO configuration using next-seo
import { DefaultSeoProps } from 'next-seo'
import { SITE_CONFIG } from './constants'

export const defaultSEOConfig: DefaultSeoProps = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
}

