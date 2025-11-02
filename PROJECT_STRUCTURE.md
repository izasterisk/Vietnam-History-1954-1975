# Cấu trúc dự án Vietnam 1954-1975

## Tổng quan

Dự án Next.js 15 với App Router, Timeline và Map trong cùng một trang.

## Cấu trúc thư mục

```
Vietnam-History-1954-1975/
│
├── app/                          # Next.js 15 App Router
│   ├── [locale]/                 # Dynamic route cho i18n
│   │   ├── layout.tsx           # Layout với Header/Footer
│   │   └── page.tsx             # Trang chính (Timeline + Map)
│   └── page.tsx                 # Root page (redirect to /vi)
│
├── components/                   # React Components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx           # Button component
│   │   └── card.tsx             # Card component
│   ├── EventCard.tsx            # Card hiển thị sự kiện
│   ├── Footer.tsx               # Footer component
│   ├── Header.tsx               # Header với nav
│   ├── MapSection.tsx           # Bản đồ (react-leaflet)
│   ├── ThemeToggle.tsx          # Toggle dark/light mode
│   └── TimelineSection.tsx      # Timeline (react-vertical-timeline)
│
├── content/                      # Nội dung MDX
│   └── events/                  # Các sự kiện lịch sử
│       ├── 1954.mdx            # Hiệp định Geneva
│       ├── 1968.mdx            # Tết Mậu Thân
│       └── 1975.mdx            # Giải phóng miền Nam
│
├── lib/                         # Utilities & helpers
│   ├── constants.ts            # Hằng số, translations, config
│   ├── getEvents.ts            # Load events từ MDX
│   ├── seo.config.ts           # Cấu hình SEO
│   └── utils.ts                # Utility functions
│
├── public/                      # Static files
│   └── images/                 # Hình ảnh
│
├── styles/                      # Styles
│   └── globals.css             # Global CSS + Tailwind
│
├── middleware.ts                # i18n middleware
├── mdx-components.tsx           # MDX components config
├── next.config.mjs              # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
│
└── Documentation/
    ├── README.md               # Hướng dẫn chính
    ├── QUICKSTART.md           # Hướng dẫn nhanh
    ├── CONTRIBUTING.md         # Hướng dẫn đóng góp
    └── PROJECT_STRUCTURE.md    # File này
```

## Flow dữ liệu

### 1. User truy cập trang

```
URL: /vi hoặc /en
  ↓
middleware.ts (kiểm tra locale)
  ↓
app/[locale]/page.tsx
  ↓
getEvents() - Load MDX files
  ↓
Render <TimelineSection/> và <MapSection/>
```

### 2. Thêm sự kiện mới

```
Tạo file MDX mới
  ↓
content/events/[year].mdx
  ↓
Front-matter (year, title, lat, lng, summary)
  ↓
MDX content (chi tiết)
  ↓
getEvents() tự động load
  ↓
Hiển thị trên Timeline + Map
```

## Components chính

### 1. TimelineSection.tsx
- Sử dụng `react-vertical-timeline-component`
- Nhận `events[]` từ `getEvents()`
- Render timeline dọc với các mốc thời gian
- Hỗ trợ dark mode

### 2. MapSection.tsx
- Sử dụng `react-leaflet` + `leaflet`
- Hiển thị bản đồ Việt Nam
- Đặt marker cho mỗi sự kiện
- Popup với thông tin chi tiết

### 3. Header.tsx
- Navigation với anchor links (#timeline, #map)
- Theme toggle button
- Logo/Title

### 4. ThemeToggle.tsx
- Toggle giữa light/dark mode
- Lưu preference vào localStorage
- Áp dụng class 'dark' vào <html>

## Công nghệ stack

### Core
- **Next.js 15** - React framework với App Router
- **TypeScript** - Type safety
- **React 18** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **CSS Variables** - Theme customization

### Content
- **MDX** - Markdown + JSX cho content
- **gray-matter** - Parse front-matter

### Visualization
- **react-vertical-timeline-component** - Timeline UI
- **react-leaflet** - Map integration
- **Leaflet** - Map library

### Others
- **next-seo** - SEO optimization
- **lucide-react** - Icons
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Files cấu hình quan trọng

### next.config.mjs
```javascript
// Cấu hình MDX support
withMDX(nextConfig)
```

### middleware.ts
```javascript
// i18n routing
// Redirect / → /vi (default locale)
```

### tailwind.config.ts
```javascript
// Theme config
// Dark mode: 'class'
// CSS variables
```

### lib/constants.ts
```javascript
// MAP_CENTER - Tọa độ trung tâm bản đồ
// TRANSLATIONS - Text cho vi/en
// DEFAULT_COORDS - Fallback coordinates
```

## Tính năng chính

✅ **Single Page Layout**
- Timeline và Map trong cùng một trang
- Smooth scroll giữa sections
- Anchor navigation

✅ **i18n Support**
- Tiếng Việt (vi) - default
- Tiếng Anh (en)
- Middleware tự động redirect

✅ **Dark Mode**
- Toggle button
- Persist preference
- CSS variables theme

✅ **Responsive Design**
- Mobile-first
- Desktop optimized
- Touch-friendly

✅ **SEO Optimized**
- next-seo configuration
- Meta tags
- Open Graph

✅ **MDX Content**
- Easy content management
- Front-matter metadata
- Markdown support

## Thêm tính năng mới

### Thêm locale mới (ví dụ: French)

1. **constants.ts**: Thêm 'fr' vào LOCALES và TRANSLATIONS
2. **middleware.ts**: Thêm 'fr' vào locales array
3. Tạo nội dung cho locale mới

### Thêm section mới

1. Tạo component mới trong `/components`
2. Import vào `app/[locale]/page.tsx`
3. Thêm anchor link vào Header

### Custom timeline style

1. Chỉnh `styles/globals.css`
2. Override `.vertical-timeline-element-content`
3. Adjust colors với CSS variables

## Performance

- **Static Generation**: Pages được build sẵn
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic với Next.js
- **CSS Purging**: Tailwind removes unused CSS

## Development Workflow

```bash
# 1. Development
npm run dev

# 2. Check code
npm run lint

# 3. Format code  
npm run format

# 4. Build
npm run build

# 5. Test production build
npm run start
```

## Cần chỉnh gì?

| Muốn thay đổi | File cần chỉnh |
|---------------|----------------|
| Màu sắc theme | `styles/globals.css` |
| Tâm bản đồ | `lib/constants.ts` → MAP_CENTER |
| Translations | `lib/constants.ts` → TRANSLATIONS |
| Thêm sự kiện | `content/events/[year].mdx` |
| Thay đổi layout | `app/[locale]/layout.tsx` |
| SEO metadata | `lib/seo.config.ts` |
| Navigation | `components/Header.tsx` |

## Tips

- Luôn test cả light và dark mode
- Kiểm tra responsive trên mobile
- Verify coordinates trước khi add vào MDX
- Sử dụng Prettier để format code
- Check ESLint warnings trước khi commit

