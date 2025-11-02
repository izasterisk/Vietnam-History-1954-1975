# 🚀 BẮT ĐẦU TẠI ĐÂY!

Chào mừng bạn đến với dự án **Vietnam 1954–1975**! 

## 📍 Bạn đang ở đây

Dự án Next.js 15 đã được scaffold hoàn toàn và **sẵn sàng chạy ngay**!

## ⚡ Chạy trong 30 giây

```bash
# Bước 1: Cài dependencies (đã xong rồi!)
npm install  ✅

# Bước 2: Chạy development server
npm run dev

# Bước 3: Mở trình duyệt
# → http://localhost:3000/vi
```

## 🎯 Điều gì đã sẵn sàng?

### ✅ Trang web hoàn chỉnh
- Timeline với 3 sự kiện lịch sử (1954, 1968, 1975)
- Bản đồ tương tác với markers
- Dark/Light mode toggle
- 2 ngôn ngữ (Tiếng Việt & English)
- Responsive design (mobile, tablet, desktop)

### ✅ Công nghệ hiện đại
- Next.js 15 + App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- MDX content management
- react-leaflet maps
- Vertical timeline

### ✅ Documentation đầy đủ
- 9 files hướng dẫn chi tiết
- Code có comments rõ ràng
- Examples sẵn có

## 📖 Đọc gì tiếp theo?

### Nếu bạn muốn:

| Mục đích | Đọc file |
|----------|----------|
| **Chạy ngay và thử nghiệm** | [QUICKSTART.md](./QUICKSTART.md) ⭐ |
| **Hiểu cấu trúc dự án** | [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) |
| **Thêm sự kiện lịch sử** | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| **Deploy lên production** | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| **Xem tổng quan dự án** | [SUMMARY.md](./SUMMARY.md) |
| **Check danh sách hoàn thành** | [CHECKLIST.md](./CHECKLIST.md) |
| **Đọc hướng dẫn đầy đủ** | [README.md](./README.md) |

## 🎨 Thử ngay 3 thứ này!

### 1️⃣ Thêm sự kiện mới

Tạo file `content/events/1960.mdx`:

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

Nội dung chi tiết...
```

Refresh trang → Sự kiện mới xuất hiện! 🎉

### 2️⃣ Đổi màu theme

Mở `styles/globals.css`, tìm:

```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* ← Đổi thử! */
}
```

### 3️⃣ Test dark mode

Click vào icon 🌙 ở góc phải Header!

## 🗂️ Cấu trúc đơn giản

```
Vietnam-History-1954-1975/
│
├── 📱 app/[locale]/page.tsx    ← Trang chính (Timeline + Map)
├── 🎨 components/              ← React components
├── 📝 content/events/          ← Thêm sự kiện vào đây!
├── ⚙️ lib/                     ← Utils & helpers
├── 🎨 styles/globals.css       ← Đổi màu, theme
└── 📖 README.md                ← Hướng dẫn đầy đủ
```

## 🎯 Single Page Layout

Trang web chỉ có **MỘT trang duy nhất** với:

```
┌─────────────────────────┐
│    HEADER (Nav)         │
├─────────────────────────┤
│    Hero Section         │
│    "Scroll to Map" btn  │
├─────────────────────────┤
│  📅 TIMELINE SECTION    │
│  (3 sự kiện dọc)        │
├─────────────────────────┤
│  🗺️ MAP SECTION         │
│  (Bản đồ Việt Nam)      │
├─────────────────────────┤
│    FOOTER               │
└─────────────────────────┘
```

Cuộn xuống để xem Map!

## 🌐 URLs

- **Tiếng Việt**: `http://localhost:3000/vi`
- **English**: `http://localhost:3000/en`
- **Timeline**: `http://localhost:3000/vi#timeline`
- **Map**: `http://localhost:3000/vi#map`

## 🛠️ Commands hữu ích

```bash
npm run dev      # Development mode
npm run build    # Build production
npm run start    # Run production
npm run lint     # Check code
npm run format   # Format code
```

## 💡 Tips

- **Thêm hình ảnh**: Đặt trong `public/images/`
- **Thay đổi bản đồ**: Edit `lib/constants.ts` → `MAP_CENTER`
- **Thêm ngôn ngữ**: Edit `lib/constants.ts` → `LOCALES`
- **SEO**: Edit `lib/seo.config.ts`

## 🎓 Workflow cơ bản

```bash
# 1. Chạy dev server
npm run dev

# 2. Thêm/sửa nội dung
# → Edit files trong content/events/

# 3. Xem thay đổi
# → Refresh browser (Fast Refresh tự động)

# 4. Build khi xong
npm run build
```

## ❓ Cần giúp?

### Bản đồ không hiển thị?
- Check browser console
- Verify lat/lng đúng format

### Timeline trống?
- Check MDX front-matter syntax
- Ensure `.mdx` extension, not `.md`

### Lỗi build?
```bash
rm -rf .next
npm run build
```

## 📱 Test Responsive

- Desktop: F12 → Responsive mode
- Thử các size: 375px (mobile), 768px (tablet), 1920px (desktop)

## 🚀 Deploy

Khi sẵn sàng deploy:

```bash
# Vercel (recommended)
vercel

# Hoặc xem hướng dẫn đầy đủ
cat DEPLOYMENT.md
```

## ✨ Bước tiếp theo

1. ✅ Chạy `npm run dev`
2. ✅ Mở http://localhost:3000/vi
3. ✅ Xem Timeline và Map
4. ✅ Test dark mode
5. ✅ Test scroll between sections
6. ✅ Thử thêm sự kiện mới
7. ✅ Đọc [QUICKSTART.md](./QUICKSTART.md)
8. ✅ Deploy!

---

## 🎉 Chúc mừng!

Bạn đã có một website lịch sử Việt Nam hoàn chỉnh!

**Hãy bắt đầu thêm nội dung của bạn ngay bây giờ!** 🚀

---

📚 **Quick Links:**
- [QUICKSTART](./QUICKSTART.md) - Bắt đầu nhanh
- [README](./README.md) - Hướng dẫn đầy đủ
- [CONTRIBUTING](./CONTRIBUTING.md) - Cách thêm nội dung
- [DEPLOYMENT](./DEPLOYMENT.md) - Cách deploy

💬 **Questions?** → Check [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

🌟 **Enjoy coding!**

