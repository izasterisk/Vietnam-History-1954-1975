# Vietnam 1954–1975

Website lịch sử Việt Nam từ 1954 đến 1975 với Timeline và Bản đồ tương tác trong **một trang duy nhất**.

## 🚀 Chạy ngay

```bash
# Cài đặt (đã xong rồi)
npm install

# Chạy development
npm run dev

# Mở browser
http://localhost:3000/vi   (Tiếng Việt)
http://localhost:3000/en   (English)
```

## 📦 Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Google Fonts**: Playfair Display (tiêu đề) + Lora (văn bản)
- **MDX** - Quản lý nội dung sự kiện
- **react-vertical-timeline-component** - Timeline dọc
- **react-leaflet** + **leaflet** - Bản đồ tương tác
- **next-seo** - SEO optimization
- **i18n** - 2 ngôn ngữ (vi, en)

## 🎨 Tính năng

- ✅ **Single Page**: Timeline và Map trong cùng 1 trang
- ✅ **Timeline dọc**: 3 sự kiện lịch sử (1954, 1968, 1975)
- ✅ **Bản đồ tương tác**: Markers với popups
- ✅ **Smooth scrolling**: Giữa sections
- ✅ **Responsive**: Mobile, tablet, desktop
- ✅ **i18n**: Tiếng Việt & English
- ✅ **SEO optimized**

## 📁 Cấu trúc quan trọng

```
├── app/[locale]/
│   ├── layout.tsx          # Layout chính (Header, Footer)
│   └── page.tsx            # Trang duy nhất (Timeline + Map)
├── components/
│   ├── TimelineSection.tsx # Timeline component
│   ├── MapSection.tsx      # Map component
│   └── Header.tsx          # Header với nav
├── content/events/         # ← Thêm sự kiện vào đây!
│   ├── 1954.mdx
│   ├── 1968.mdx
│   └── 1975.mdx
├── lib/
│   ├── constants.ts        # Config: colors, map center, translations
│   └── getEvents.ts        # Load MDX files
└── styles/globals.css      # Theme colors, fonts
```

## ⚡ Thêm sự kiện mới (30 giây!)

### Bước 1: Tạo file MDX

```bash
content/events/1960.mdx
```

### Bước 2: Copy template này

```mdx
---
year: 1960
title: Mặt trận Dân tộc Giải phóng miền Nam
city: Tây Ninh
lat: 11.3351
lng: 106.1098
summary: Thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam
---

# Thành lập Mặt trận (20/12/1960)

Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập...

## Ý nghĩa
- Tập hợp lực lượng yêu nước
- Tổ chức lãnh đạo cuộc đấu tranh
```

### Bước 3: Refresh browser

→ Sự kiện tự động xuất hiện trên Timeline và Map! 🎉

## 🗺️ Tọa độ các thành phố chính

```javascript
Hà Nội:        21.0285, 105.8542
Huế:           16.4637, 107.5909
Đà Nẵng:       16.0544, 108.2022
Sài Gòn:       10.8231, 106.6297
Cần Thơ:       10.0341, 105.7218
Điện Biên Phủ: 21.3844, 103.0154
```

Hoặc tìm trên [Google Maps](https://maps.google.com): Click phải → Copy tọa độ

## 🎨 Tùy chỉnh

### Đổi màu theme

File: `styles/globals.css`

```css
:root {
  --primary: 222.2 47.4% 11.2%;     /* Màu chính */
  --secondary: 210 40% 96.1%;       /* Màu phụ */
  --accent: 210 40% 96.1%;          /* Màu accent */
}
```

### Đổi fonts

File: `styles/globals.css` (dòng đầu)

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

**Fonts hiện tại:**
- Playfair Display (tiêu đề) - weight 600, 700, 800
- Lora (văn bản) - weight 400, 500, 600

**Sử dụng:**
```tsx
<h1 className="font-heading font-bold">Tiêu đề</h1>
<p className="font-body">Văn bản</p>
```

### Đổi tâm bản đồ

File: `lib/constants.ts`

```typescript
export const MAP_CENTER = {
  lat: 16.0544,   // Vĩ độ
  lng: 108.2022,  // Kinh độ
  zoom: 6,        // Mức zoom
}
```

### Thêm ngôn ngữ mới

File: `lib/constants.ts`

```typescript
export const LOCALES = ['vi', 'en', 'fr'] // Thêm 'fr'

export const TRANSLATIONS = {
  vi: { /* ... */ },
  en: { /* ... */ },
  fr: {
    timeline: 'Chronologie',
    map: 'Carte',
    scrollToMap: 'Voir la carte',
    // ...
  },
}
```

File: `middleware.ts` - Thêm 'fr' vào locales array

## 🛠️ Commands

```bash
npm run dev      # Development server
npm run build    # Build production
npm run start    # Run production server
npm run lint     # Check code
npm run format   # Format code with Prettier
```

## 🚀 Deploy

### Vercel (Khuyến nghị)

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

Hoặc: Push lên GitHub → Import vào [Vercel Dashboard](https://vercel.com)

### Netlify

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

```bash
docker build -t vietnam-history .
docker run -p 3000:3000 vietnam-history
```

### VPS (Ubuntu)

```bash
# Cài Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2

# Deploy
git clone <your-repo>
cd vietnam-history
npm install
npm run build
pm2 start npm --name "vietnam-history" -- start
pm2 save && pm2 startup
```

## 🐛 Troubleshooting

### Bản đồ không hiển thị?
- Check browser console
- Verify `lat` và `lng` đúng format (số, không phải string)
- Ensure Leaflet CSS imported (đã có sẵn rồi)

### Timeline trống?
- Check file MDX có extension `.mdx` (không phải `.md`)
- Verify front-matter syntax (cần `---` ở đầu và cuối)
- Check console for errors

### Build error?
```bash
rm -rf .next
npm run build
```

## 📱 Test Checklist

- [ ] Truy cập `/` → redirect về `/vi` ✓
- [ ] Truy cập `/vi` → trang Tiếng Việt ✓
- [ ] Truy cập `/en` → trang English ✓
- [ ] Click "Dòng thời gian" → scroll to timeline ✓
- [ ] Click "Bản đồ" → scroll to map ✓
- [ ] Timeline hiển thị 3 events ✓
- [ ] Map có 3 markers ✓
- [ ] Click marker → popup hiển thị ✓
- [ ] Test responsive (mobile, tablet) ✓

## 🎯 Single Page Layout

```
┌─────────────────────────────┐
│  HEADER (Nav)               │
├─────────────────────────────┤
│  Hero Section               │
│  "Scroll to Map" button     │
├─────────────────────────────┤
│  📅 TIMELINE (#timeline)    │
│  • 1954 - Hiệp định Geneva │
│  • 1968 - Tết Mậu Thân     │
│  • 1975 - Giải phóng       │
├─────────────────────────────┤
│  🗺️ MAP (#map)              │
│  Interactive Leaflet Map    │
│  with 3 markers             │
├─────────────────────────────┤
│  FOOTER                     │
└─────────────────────────────┘
```

## 🔗 URLs

- Homepage (VI): `http://localhost:3000/vi`
- Homepage (EN): `http://localhost:3000/en`
- Timeline: `http://localhost:3000/vi#timeline`
- Map: `http://localhost:3000/vi#map`

## 💡 Pro Tips

1. **Thêm hình ảnh**: Đặt trong `public/images/`, reference bằng `/images/your-image.jpg`
2. **Custom 404**: Tạo `app/not-found.tsx`
3. **Analytics**: Thêm script vào `app/[locale]/layout.tsx`
4. **Performance**: Dùng Next.js `<Image>` component thay vì `<img>`
5. **SEO**: Chỉnh `lib/seo.config.ts` trước khi deploy

## 📖 MDX Front-matter

**Required fields:**
- `year` (number) - Năm sự kiện
- `title` (string) - Tiêu đề
- `lat` (number) - Vĩ độ
- `lng` (number) - Kinh độ  
- `summary` (string) - Mô tả ngắn

**Optional fields:**
- `city` (string) - Tên thành phố

## 🎨 Tailwind Classes hay dùng

```tsx
// Headings
<h1 className="font-heading font-bold text-4xl">Title</h1>

// Body text
<p className="font-body text-base">Content</p>

// Responsive
<div className="text-sm md:text-base lg:text-lg">Text</div>

// Colors
<div className="text-primary bg-secondary">Colored</div>
```

## 🌟 Next Steps

1. ✅ Chạy `npm run dev`
2. ✅ Xem trang `/vi`
3. ✅ Thêm sự kiện mới vào `content/events/`
4. ✅ Tùy chỉnh màu sắc trong `styles/globals.css`
5. ✅ Deploy lên Vercel

## 📜 License

MIT License - see [LICENSE](./LICENSE)

## 🙏 Credits

- Timeline: [react-vertical-timeline-component](https://github.com/stephane-monnot/react-vertical-timeline)
- Map: [React Leaflet](https://react-leaflet.js.org/)
- UI: [shadcn/ui](https://ui.shadcn.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)

---

**Made with ❤️ for Vietnam History** 🇻🇳

Có câu hỏi? Check file hoặc mở browser console để debug!
