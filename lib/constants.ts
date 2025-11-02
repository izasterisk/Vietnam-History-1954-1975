// Constants for the Vietnam History website

export const SITE_CONFIG = {
  name: 'Vietnam 1954–1975',
  description: {
    vi: 'Lịch sử Việt Nam từ 1954 đến 1975',
    en: 'Vietnam History from 1954 to 1975',
  },
  url: 'https://vietnam-history.example.com',
}

// Default map center (Vietnam)
export const MAP_CENTER = {
  lat: 16.0544,
  lng: 108.2022,
  zoom: 6,
}

// Fallback coordinates for events
export const DEFAULT_COORDS = {
  1954: { lat: 21.0285, lng: 105.8542, city: 'Hanoi' }, // Hanoi
  1968: { lat: 16.4637, lng: 107.5909, city: 'Hue' }, // Hue
  1975: { lat: 10.8231, lng: 106.6297, city: 'Saigon' }, // Saigon
}

// Locales
export const LOCALES = ['vi', 'en'] as const
export type Locale = (typeof LOCALES)[number]

// Translations
export const TRANSLATIONS = {
  vi: {
    timeline: 'Dòng thời gian',
    map: 'Bản đồ',
    scrollToMap: 'Xem bản đồ',
    home: 'Trang chủ',
    darkMode: 'Chế độ tối',
    lightMode: 'Chế độ sáng',
  },
  en: {
    timeline: 'Timeline',
    map: 'Map',
    scrollToMap: 'View Map',
    home: 'Home',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
  },
}

