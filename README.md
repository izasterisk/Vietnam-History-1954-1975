# Vietnam History 1954-1975 Timeline

Website timeline tương tác về lịch sử Việt Nam với quiz unlock system, smooth scroll, và frosted glass effects.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

## 📦 Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Lenis** - Smooth scroll library
- **MDX** - Content management
- **React Markdown** - MDX rendering
- **Google Fonts**: Playfair Display (headings) + Lora (body)

## 🎨 Features

### 1. Hero Section
- Full screen với scroll fade effect
- 10 ảnh lịch sử bố trí vòng cung
- Hover effect: scale + rotate về 0°
- Text không bị fade khi scroll

### 2. Timeline Section
- **Card Lock System**: Card 2-5 bị khóa, cần trả lời quiz
- **Frosted Glass Cards**: iOS-style glass morphism
- **Spotlight Effect**: Đốm sáng theo chuột khi hover locked cards
- **Quiz Modal**: Trắc nghiệm mở khóa nội dung
- **Video Modal**: Click tiêu đề xem video YouTube

### 3. Timeline Navigation Bar
- Fixed bottom navigation với frosted glass
- Hiển thị 3 mốc thời gian (trước - hiện - sau)
- Auto tracking: Cập nhật theo card hiện tại
- Smooth scroll navigation với Lenis
- Progress indicator dots
- Disabled arrows khi đã đến đầu/cuối

### 4. Smooth Scroll
- **Lenis library**: Smooth scroll toàn trang
- Easing tự nhiên, không teleport
- Passive event listeners cho performance

## 📁 Cấu trúc Project

```
├── app/
│   ├── layout.tsx              # Root layout + LenisProvider
│   └── page.tsx                # Main page
│
├── components/
│   ├── HeroSection.tsx         # Hero với 10 ảnh + scroll fade
│   ├── TimelineSection.tsx     # Timeline cards + logic
│   ├── TimelineNav.tsx         # Fixed bottom navigation
│   ├── QuizModal.tsx           # Quiz unlock modal
│   ├── VideoModal.tsx          # YouTube video modal
│   ├── LenisProvider.tsx       # Lenis smooth scroll wrapper
│   ├── Footer.tsx              # Footer
│   └── ui/
│       ├── button.tsx          # shadcn Button
│       └── card.tsx            # shadcn Card
│
├── content/events/             # MDX files
│   ├── 1954-1960.mdx
│   ├── 1961-1965.mdx
│   ├── 1965-1968.mdx
│   ├── 1969-1973.mdx
│   └── 1975.mdx
│
├── lib/
│   ├── getEvents.ts            # Load & parse MDX
│   ├── constants.ts            # Site config
│   ├── utils.ts                # Helpers
│   └── seo.config.ts           # SEO
│
└── styles/
    └── globals.css             # Global styles + animations
```

## 🔧 Implementation Details

### 1. Lenis Smooth Scroll Setup

**File: `components/LenisProvider.tsx`**

```typescript
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis
    
    // Expose to window for other components
    ;(window as any).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}
```

**Wrap app trong `layout.tsx`:**

```typescript
import { LenisProvider } from '@/components/LenisProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

### 2. Card Lock System

**Quiz questions trong `TimelineSection.tsx`:**

```typescript
const quizQuestions = [
  null, // Card 1 unlocked
  {
    question: 'Câu hỏi cho card 2',
    options: [
      { label: 'A', text: 'Đáp án A' },
      { label: 'B', text: 'Đáp án B' },
      { label: 'C', text: 'Đáp án C' },
      { label: 'D', text: 'Đáp án D' },
    ],
    correctAnswer: 'A',
  },
  // ... thêm quiz cho card 3, 4, 5
]

// State management
const [unlockedCards, setUnlockedCards] = useState([true, false, false, false, false])
```

**Locked card rendering:**

```typescript
{isLocked && (
  <div className="absolute inset-0 backdrop-blur-md bg-white/20 rounded-3xl flex items-center justify-center z-10">
    <div className="text-center">
      <div className="text-6xl mb-4">🔒</div>
      <p className="text-2xl font-heading font-bold">Nội dung bị khóa</p>
      <p className="text-lg font-body">Nhấp để mở khóa</p>
    </div>
  </div>
)}
```

### 3. Spotlight Effect on Hover

**Mouse tracking:**

```typescript
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

const handleMouseMove = useCallback((e: React.MouseEvent, index: number) => {
  if (!unlockedCards[index] && cardRefs.current[index]) {
    const rect = cardRefs.current[index]!.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }
}, [unlockedCards])
```

**Apply radial gradient:**

```typescript
<div
  onMouseMove={(e) => handleMouseMove(e, index)}
  style={
    isLocked
      ? {
          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent)`,
        }
      : undefined
  }
>
```

### 4. Timeline Navigation Bar

**Scroll tracking:**

```typescript
const [currentCardIndex, setCurrentCardIndex] = useState(0)
const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

const handleScroll = useCallback(() => {
  if (scrollTimeoutRef.current) return // Throttle
  
  scrollTimeoutRef.current = setTimeout(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2
    
    for (let i = cardRefs.current.length - 1; i >= 0; i--) {
      const card = cardRefs.current[i]
      if (card) {
        const rect = card.getBoundingClientRect()
        const cardTop = window.scrollY + rect.top
        const cardBottom = cardTop + rect.height
        
        if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
          setCurrentCardIndex(i)
          break
        }
      }
    }
    scrollTimeoutRef.current = null
  }, 100) // Throttle 100ms
}, [])
```

**Navigation with Lenis:**

```typescript
const handleNavigate = useCallback((index: number) => {
  const card = cardRefs.current[index]
  if (card) {
    const lenis = (window as any).lenis as Lenis | undefined
    
    if (lenis) {
      const offset = 100
      const elementPosition = card.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset
      
      lenis.scrollTo(offsetPosition, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }
}, [])
```

### 5. Performance Optimizations

**Passive scroll listeners:**

```typescript
window.addEventListener('scroll', handleScroll, { passive: true })
```

**useCallback for handlers:**

```typescript
const handleTitleClick = useCallback((event, index) => {
  // ...
}, [unlockedCards])
```

**useMemo for computed values:**

```typescript
const prevEvent = useMemo(() => 
  currentIndex > 0 ? events[currentIndex - 1] : null, 
  [currentIndex, events]
)
```

**Image optimization:**

```typescript
<Image
  src="/images/photo.jpg"
  width={192}
  height={128}
  loading="lazy"
  quality={85}
  alt="..."
/>
```

**Scroll throttling:**

```typescript
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Do work
      ticking = false
    })
    ticking = true
  }
}
```

### 6. Frosted Glass Effect (iOS-style)

**CSS:**

```css
.bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60
```

**Background pattern:**

```typescript
<div className="absolute inset-0 opacity-30">
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
</div>
```

## 📝 MDX Content Structure

**File: `content/events/1954-1960.mdx`**

```mdx
---
year: 1954
yearRange: "1954 - 1960"
title: Tiêu đề giai đoạn
summary: Tóm tắt ngắn gọn
videoUrl: https://www.youtube.com/watch?v=VIDEO_ID
---

# Nội dung chi tiết

## Phần 1
- Điểm 1
- Điểm 2

## Phần 2
- Điểm 3
```

**Load MDX trong `lib/getEvents.ts`:**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getEvents(): Promise<EventData[]> {
  const eventsDir = path.join(process.cwd(), 'content', 'events')
  const files = fs.readdirSync(eventsDir).filter(file => file.endsWith('.mdx'))
  
  const events = files.map(filename => {
    const filePath = path.join(eventsDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      year: data.year || 0,
      yearRange: data.yearRange || String(data.year),
      title: data.title || '',
      summary: data.summary || '',
      videoUrl: data.videoUrl || '',
      content: content || '',
      slug: filename.replace('.mdx', ''),
    }
  })
  
  return events.sort((a, b) => a.year - b.year)
}
```

## 🎨 Custom Animations

**CSS in `styles/globals.css`:**

```css
/* Fade in animation for nav bar */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Bounce animation for arrows */
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
```

## ⚡ Performance Checklist

- ✅ Passive scroll listeners
- ✅ Scroll throttling (100ms)
- ✅ useCallback for event handlers
- ✅ useMemo for computed values
- ✅ Image lazy loading
- ✅ Optimized image sizes
- ✅ RAF for smooth animations
- ✅ CSS will-change hints
- ✅ Lenis smooth scroll (no native scroll-behavior)
- ✅ Removed unused components (EventCard)

## 🛠️ Commands

```bash
npm run dev          # Development
npm run build        # Production build
npm run start        # Run production
npm run lint         # Lint check
```

## 🎯 Quiz System

**Đáp án đúng:**
- Card 2 (1961-1965): **A**
- Card 3 (1965-1968): **B**  
- Card 4 (1969-1973): **C**
- Card 5 (1975): **D**

**State không lưu** - Mỗi lần refresh phải trả lời lại

## 🚀 Deploy

### Vercel (Recommended)

```bash
vercel --prod
```

### Manual Build

```bash
npm run build
npm run start
```

## 📖 Customization Guide

### Thay đổi quiz questions

Edit `components/TimelineSection.tsx`:

```typescript
const quizQuestions = [
  null,
  {
    question: 'Câu hỏi mới',
    options: [/* ... */],
    correctAnswer: 'A',
  },
  // ...
]
```

### Thêm/xóa cards

1. Thêm file MDX trong `content/events/`
2. Update `unlockedCards` state (thêm `false` cho locked)
3. Thêm quiz vào `quizQuestions`

### Đổi theme colors

Edit `styles/globals.css`:

```css
:root {
  --background: 28 56% 89%;
  --primary: 222.2 47.4% 11.2%;
}
```

### Customize smooth scroll

Edit `components/LenisProvider.tsx`:

```typescript
const lenis = new Lenis({
  duration: 1.5,        // Slower
  wheelMultiplier: 0.5, // Less sensitive
  // ...
})
```

## 🐛 Troubleshooting

### Smooth scroll không hoạt động?
- Check Lenis có được initialize không
- Verify `window.lenis` exists
- Check browser console for errors

### Cards không unlock sau quiz?
- Check `correctAnswer` khớp với option label
- Verify state update trong `handleQuizCorrect`

### Navigation bar bị lệch?
- Container: `flex flex-col items-center`
- Progress: Không cần `justify-center`

### Performance issues?
- Check scroll listeners có `passive: true`
- Verify throttling works (100ms timeout)
- Check image lazy loading

## 📜 License

MIT

---

**Version:** 2.0.0  
**Last Updated:** 2025-11-05  
**Status:** Production Ready

**Key Features:**
- ✅ Lenis smooth scroll
- ✅ Quiz unlock system
- ✅ Timeline navigation bar
- ✅ Frosted glass effects
- ✅ Performance optimized
- ✅ Mobile responsive
