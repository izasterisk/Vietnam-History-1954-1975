# Vietnam 1954–1975

Website lịch sử Việt Nam với Timeline tương tác.

## 🚀 Chạy ngay

```bash
npm install  # Đã cài rồi
npm run dev  # Đang chạy

# Mở: http://localhost:3000
```

## 📦 Tech Stack hiện tại

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui (Button, Card)
- **Google Fonts**: Playfair Display (tiêu đề) + Lora (văn bản)
- **MDX** - Quản lý nội dung sự kiện
- **react-vertical-timeline-component** - Timeline dọc
- **Lucide React** - Icons (Calendar)
- **Lenis** - Smooth scroll library (cuộn mượt mà)

## 🎨 Cấu trúc trang hiện tại

### 1. Hero Section (Full screen)
- Màu nền: `#f5ddcb`
- Text: "Vietnam 1954–1975" + "Khám phá lịch sử Việt Nam qua dòng thời gian"
- **10 ảnh** bố trí vòng cung xung quanh text:
  - **Phía trên** (2 ảnh): Ho_chi_minh_trail.jpg, images2260285_A2__1_.jpg
  - **Phía dưới** (2 ảnh): Redsvn-Ha-Noi-sau-1954-01.jpg, dai-hoi-iii.jpg
  - **Bên trái** (3 ảnh): 1968.jpg, 60.jpg, 1972.jpg
  - **Bên phải** (3 ảnh): 60-2.jpg, 1975.png, 1990.jpg

### 2. Timeline Section
- 3 sự kiện: 1954, 1968, 1975
- Vertical timeline với icons
- Load từ MDX files

## ✨ Features đã có

### Hover Effect (Ảnh ở Hero)
- Hover vào ảnh → Phóng to 30% (scale 1.3)
- Xoay về 0° (không nghiêng)
- Transition mượt 0.5s
- CSS: `.hero-image:hover` trong `styles/globals.css`

### Scroll Fade Effect
- Scroll xuống → Ảnh mờ dần (opacity giảm)
- Text "Vietnam 1954-1975" giữ nguyên (không mờ)
- Logic: `components/HeroSection.tsx` - useEffect track scroll
- Fade từ 1 → 0 trong khoảng 1 screen height

### Smooth Scroll
- `scroll-behavior: smooth` trong CSS
- Scroll mượt mà tự nhiên

## 📁 Cấu trúc Files

```
├── app/
│   ├── layout.tsx              # Root layout (không có Header)
│   └── page.tsx                # Trang chính (import HeroSection + Timeline)
│
├── components/
│   ├── HeroSection.tsx         # Hero full screen + 10 ảnh + scroll fade
│   ├── TimelineSection.tsx     # Timeline component
│   ├── EventCard.tsx           # Card component (chưa dùng)
│   ├── Footer.tsx              # Footer đơn giản
│   └── ui/
│       ├── button.tsx          # shadcn/ui Button
│       └── card.tsx            # shadcn/ui Card
│
├── content/events/             # ← Thêm sự kiện vào đây
│   ├── 1954.mdx
│   ├── 1968.mdx
│   └── 1975.mdx
│
├── lib/
│   ├── constants.ts            # SITE_CONFIG
│   ├── getEvents.ts            # Load MDX files
│   ├── seo.config.ts           # SEO config
│   └── utils.ts                # cn() helper
│
├── public/images/              # 10 ảnh + .gitkeep
├── styles/globals.css          # Theme + Fonts + Hover effects
└── README.md                   # File này
```

## ⚡ Thêm sự kiện mới

### 1. Tạo file MDX

```bash
content/events/1960.mdx
```

### 2. Template

```mdx
---
year: 1960
title: Tên sự kiện
city: Tên địa điểm
summary: Mô tả ngắn gọn
---

# Chi tiết sự kiện

Nội dung chi tiết bằng Markdown...

## Phần con
- Điểm 1
- Điểm 2
```

### 3. Refresh browser → Tự động hiển thị!

## 🎨 Tùy chỉnh

### Đổi màu nền Hero

File: `app/page.tsx` (hoặc `components/HeroSection.tsx`)

```tsx
<section className="... bg-[#f5ddcb]">
//                         ^^^^^^^ Đổi màu này
```

### Đổi màu theme toàn bộ

File: `styles/globals.css`

```css
:root {
  --background: 28 56% 89%;     /* Màu nền chính */
  --primary: 222.2 47.4% 11.2%; /* Màu chính */
  --muted: 210 40% 96.1%;       /* Màu phụ */
}
```

### Đổi fonts

File: `styles/globals.css` (dòng 1)

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap');
```

File: `tailwind.config.ts`

```typescript
fontFamily: {
  heading: ['"Your Heading Font"', 'serif'],
  body: ['"Your Body Font"', 'serif'],
}
```

### Chỉnh hover effect

File: `styles/globals.css`

```css
.hero-image:hover {
  transform: scale(1.3) rotate(0deg) !important;  /* Đổi 1.3 → 1.5 để zoom nhiều hơn */
  opacity: 1 !important;
}
```

### Thêm/Xóa ảnh trong Hero

File: `components/HeroSection.tsx`

Copy/paste block `<Image>` và điều chỉnh:
- `src="/images/your-image.jpg"`
- `left-[%]` hoặc `right-[%]` - Vị trí ngang
- `top-[%]` hoặc `bottom-[%]` - Vị trí dọc
- `rotate-[Xdeg]` - Độ nghiêng

## 🛠️ Commands

```bash
npm run dev      # Development (đang chạy)
npm run build    # Build production
npm run start    # Run production
npm run lint     # Check lỗi
npm run format   # Format code
```

## 📝 MDX Front-matter

**Required fields:**
- `year` (number) - Năm
- `title` (string) - Tiêu đề
- `summary` (string) - Mô tả ngắn

**Optional:**
- `city` (string) - Địa điểm

**Không cần nữa** (đã xóa Map):
- ~~`lat`, `lng`~~ - Tọa độ (không dùng)

## 🎯 Đã xóa/Không có

- ❌ Dark mode - Chỉ light mode
- ❌ i18n - Chỉ tiếng Việt
- ❌ Map/Leaflet - Chỉ Timeline
- ❌ Header/Navigation - Không có nav
- ❌ Middleware - Không cần routing

## 🎨 Hero Images Layout

### Vị trí các ảnh (10 ảnh):

**Top (2):**
- `Ho_chi_minh_trail.jpg` - Trái, rotate -12°
- `images2260285_A2__1_.jpg` - Phải, rotate 6°

**Bottom (2):**
- `Redsvn-Ha-Noi-sau-1954-01.jpg` - Trái, rotate 11°
- `dai-hoi-iii.jpg` - Phải, rotate -9°

**Left (3):**
- `1968.jpg` - Top 15%, rotate -18°
- `60.jpg` - Top 40%, rotate -7°
- `1972.jpg` - Bottom 15%, rotate 13°

**Right (3):**
- `60-2.jpg` - Top 15%, rotate 17°
- `1975.png` - Top 40%, rotate 8°
- `1990.jpg` - Bottom 15%, rotate -14°

### Gap giữa ảnh top/bottom:
- `gap-[140px]` - 140 pixels

## 🔧 Components quan trọng

### HeroSection.tsx
- Client component (`'use client'`)
- `useState` + `useEffect` cho scroll fade
- 10 images absolute positioned
- Text container: `max-w-4xl` (không full width)
- Scroll listener: `window.scrollY` → opacity

### TimelineSection.tsx
- Client component
- `react-vertical-timeline-component`
- Load events từ `getEvents()`
- Calendar icon từ lucide-react

### getEvents.ts
- Parse MDX front-matter
- Fallback STUB_EVENTS nếu không có MDX
- Return: `year, title, summary, city, slug`
- **Không còn** `lat, lng`

## 🎨 CSS Classes quan trọng

### Fonts
```tsx
font-heading  // Playfair Display - cho h1-h6
font-body     // Lora - cho paragraphs
```

### Hero Image
```tsx
hero-image    // Class cho tất cả 10 ảnh
              // Hover → scale(1.3) + rotate(0deg)
```

## 🐛 Issues đã fix

### ✅ "window is not defined"
- **Đã fix**: Xóa Map/Leaflet (cần window object)
- Giờ chỉ còn Timeline + Hero → Không lỗi SSR

### ✅ Hover không work cho 60.jpg và 1975.png
- **Nguyên nhân**: Text container full width block ảnh
- **Fix**: Đổi `container` → `max-w-4xl mx-auto`

### ✅ Scroll fade
- **Làm mờ**: Ảnh (opacity giảm khi scroll)
- **Giữ nguyên**: Text (z-10, không fade)

## 💡 Next Steps / TODO

### Nội dung
- [ ] Thêm thêm sự kiện vào `content/events/`
- [ ] Viết nội dung chi tiết cho MDX
- [ ] Thêm ảnh cho timeline (nếu cần)

### Styling
- [ ] Fine-tune màu sắc theme
- [ ] Điều chỉnh vị trí ảnh nếu cần
- [ ] Responsive cho mobile (check layout ảnh)

### Tính năng
- [ ] SEO: Update `lib/seo.config.ts` với URL thật
- [ ] Analytics (nếu cần)
- [ ] 404 page custom (tạo `app/not-found.tsx`)

### Deploy
- [ ] Test build: `npm run build`
- [ ] Deploy lên Vercel/Netlify
- [ ] Update domain trong SEO config

## 🚀 Deploy nhanh

### Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Build local test
```bash
npm run build
npm run start
# Test tại: http://localhost:3000
```

## 📋 Troubleshooting

### Timeline không hiển thị?
- Check MDX files có đúng format không
- Verify front-matter có `---` đầu/cuối
- Console log: Check stub data

### Ảnh không load?
- Verify path: `public/images/filename.jpg`
- Check Next.js console
- Hard refresh: Ctrl+Shift+R

### Build error?
```bash
rm -rf .next
npm run build
```

## 🎯 Current State (2025-11-03)

✅ **Hoàn tất:**
- Hero section full screen với 10 ảnh
- Timeline với 3 sự kiện mẫu
- Hover effects working
- Scroll fade working
- Typography (Playfair Display + Lora)
- No dark mode, no i18n, no map
- No header/nav

✅ **Sẵn sàng:**
- Thêm nội dung mới
- Deploy production
- Tùy chỉnh styling

## 📖 Quick Reference

| Cần làm gì | File cần sửa |
|------------|--------------|
| Thêm sự kiện | `content/events/[year].mdx` |
| Đổi màu nền Hero | `components/HeroSection.tsx` → `bg-[#...]` |
| Đổi theme colors | `styles/globals.css` → CSS variables |
| Thêm/xóa ảnh Hero | `components/HeroSection.tsx` |
| Chỉnh hover effect | `styles/globals.css` → `.hero-image:hover` |
| Đổi fonts | `styles/globals.css` + `tailwind.config.ts` |
| SEO | `lib/seo.config.ts` |

## 🎨 Typography

**Auto-apply:**
- Tất cả `h1-h6` → Playfair Display
- Body text → Lora

**Manual:**
```tsx
<h1 className="font-heading">Title</h1>
<p className="font-body">Content</p>
```

## 📦 Dependencies chính

```json
{
  "next": "^15.0.0",
  "react": "^18.3.0",
  "react-vertical-timeline-component": "^3.6.0",
  "gray-matter": "^4.0.3",
  "lucide-react": "^0.552.0",
  "tailwindcss": "^3.4.1"
}
```

**Đã xóa** (không cần nữa):
- ~~react-leaflet, leaflet~~ (Map)
- ~~next-intl~~ (i18n)

## 🔍 Debug Tips

### Check hover effect
1. F12 → Elements
2. Hover vào ảnh
3. Xem class `.hero-image` có apply không
4. Check computed styles

### Check scroll fade
1. Console.log trong `handleScroll`
2. Verify `scrollOpacity` state changes
3. Check browser console

### CSS not working?
- Hard refresh: Ctrl+Shift+R
- Clear `.next`: `rm -rf .next && npm run dev`
- Check Tailwind classes compile

## ⚠️ Known Issues

### Hover không work cho 1 số ảnh?
- **Nguyên nhân**: Text container full width block pointer events
- **Fix**: Text container dùng `max-w-4xl` thay vì `container`

### Ảnh bị crop?
- Dùng `object-cover` → Crop theo khung
- Đổi thành `object-contain` để hiện full ảnh

## 🌟 Features có thể thêm

- [ ] Click ảnh → Modal full size
- [ ] Filter timeline theo năm
- [ ] Search events
- [ ] Share buttons
- [ ] Print timeline
- [ ] Export PDF

## 📜 License

MIT

---

**Last updated:** 2025-11-03  
**Status:** Ready for content & deployment  
**Developer notes:** Hero images hover + scroll fade working, no header/nav, single page timeline only
