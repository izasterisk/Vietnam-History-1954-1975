# Vietnam 1954–1975

Website lịch sử Việt Nam từ 1954 đến 1975 với Timeline và Bản đồ tương tác.

## Công nghệ

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **MDX** để quản lý nội dung sự kiện
- **react-vertical-timeline-component** cho timeline
- **react-leaflet** cho bản đồ
- **next-seo** cho SEO
- **i18n** hỗ trợ 2 ngôn ngữ: Tiếng Việt (vi) và Tiếng Anh (en)

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Start production server
npm start
```

Mở [http://localhost:3000/vi](http://localhost:3000/vi) để xem trang tiếng Việt.

Mở [http://localhost:3000/en](http://localhost:3000/en) để xem trang tiếng Anh.

## Cấu trúc dự án

```
├── app/
│   └── [locale]/
│       ├── layout.tsx          # Root layout với Header/Footer
│       └── page.tsx            # Trang chính (Timeline + Map)
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── Header.tsx              # Header với navigation
│   ├── Footer.tsx              # Footer
│   ├── ThemeToggle.tsx         # Toggle dark/light mode
│   ├── TimelineSection.tsx     # Timeline section
│   ├── MapSection.tsx          # Map section
│   └── EventCard.tsx           # Event card component
├── content/
│   └── events/                 # Nội dung sự kiện (MDX)
│       ├── 1954.mdx
│       ├── 1968.mdx
│       └── 1975.mdx
├── lib/
│   ├── constants.ts            # Hằng số và config
│   ├── getEvents.ts            # Load sự kiện từ MDX
│   ├── seo.config.ts           # Cấu hình SEO
│   └── utils.ts                # Utility functions
├── public/
│   └── images/                 # Hình ảnh tĩnh
└── styles/
    └── globals.css             # Global styles
```

## Thêm sự kiện mới

1. Tạo file MDX mới trong `content/events/` (ví dụ: `1965.mdx`)
2. Thêm front-matter với các trường bắt buộc:

```mdx
---
year: 1965
title: Tên sự kiện
city: Tên thành phố
lat: 16.0544
lng: 108.2022
summary: Mô tả ngắn gọn về sự kiện
---

# Nội dung chi tiết

Viết nội dung chi tiết bằng Markdown...
```

3. Sự kiện sẽ tự động xuất hiện trên Timeline và Map

## Thêm marker trên bản đồ

Marker được tự động tạo từ dữ liệu trong file MDX. Chỉ cần thêm `lat` và `lng` trong front-matter.

## Tùy chỉnh

- **Màu sắc và theme**: Chỉnh sửa `styles/globals.css` và `tailwind.config.ts`
- **Tâm bản đồ**: Chỉnh sửa `MAP_CENTER` trong `lib/constants.ts`
- **SEO**: Chỉnh sửa `lib/seo.config.ts`
- **Translation**: Thêm/sửa trong `TRANSLATIONS` tại `lib/constants.ts`

## Tính năng

- ✅ Timeline dọc với các mốc lịch sử
- ✅ Bản đồ tương tác với markers
- ✅ Dark/Light mode
- ✅ Responsive design
- ✅ Smooth scrolling giữa các section
- ✅ i18n (Tiếng Việt & Tiếng Anh)
- ✅ SEO optimized
- ✅ MDX content management

## License

MIT

