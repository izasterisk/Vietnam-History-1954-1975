# Hướng dẫn đóng góp nội dung

## Thêm sự kiện lịch sử mới

### 1. Tạo file MDX

Tạo file mới trong thư mục `content/events/` với tên là năm của sự kiện (ví dụ: `1965.mdx`)

### 2. Thêm Front Matter

Mỗi file MDX cần có front-matter (metadata) ở đầu file:

```mdx
---
year: 1965          # Năm xảy ra sự kiện (bắt buộc)
title: Tên sự kiện  # Tiêu đề sự kiện (bắt buộc)
city: Tên thành phố # Địa điểm (tùy chọn)
lat: 16.0544        # Vĩ độ (bắt buộc cho marker trên bản đồ)
lng: 108.2022       # Kinh độ (bắt buộc cho marker trên bản đồ)
summary: Mô tả ngắn # Mô tả tóm tắt (bắt buộc)
---
```

### 3. Viết nội dung

Sau front-matter, viết nội dung chi tiết bằng Markdown:

```mdx
---
year: 1965
title: Sự kiện ví dụ
city: Hà Nội
lat: 21.0285
lng: 105.8542
summary: Đây là mô tả ngắn gọn về sự kiện
---

# Tiêu đề chính

Nội dung chi tiết về sự kiện...

## Phần con

Thêm thông tin...

- Điểm 1
- Điểm 2
- Điểm 3
```

### 4. Tìm tọa độ (Lat/Lng)

Để tìm tọa độ cho địa điểm:

1. Truy cập [Google Maps](https://maps.google.com)
2. Tìm địa điểm
3. Click chuột phải và chọn tọa độ để copy
4. Hoặc sử dụng [LatLong.net](https://www.latlong.net/)

### 5. Xem kết quả

Sau khi tạo file, refresh trang web. Sự kiện mới sẽ tự động xuất hiện trên:
- Timeline (theo thứ tự năm)
- Bản đồ (với marker tại vị trí đã chỉ định)

## Tùy chỉnh giao diện

### Thay đổi màu sắc

Chỉnh sửa file `styles/globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* Màu chính */
  --secondary: 210 40% 96.1%;     /* Màu phụ */
  /* ... */
}
```

### Thay đổi tâm bản đồ

Chỉnh sửa file `lib/constants.ts`:

```typescript
export const MAP_CENTER = {
  lat: 16.0544,   // Vĩ độ
  lng: 108.2022,  // Kinh độ
  zoom: 6,        // Mức zoom
}
```

## Dịch thuật (i18n)

### Thêm ngôn ngữ mới

1. Mở `lib/constants.ts`
2. Thêm locale mới vào `LOCALES`
3. Thêm translations vào `TRANSLATIONS`

```typescript
export const LOCALES = ['vi', 'en', 'fr'] as const

export const TRANSLATIONS = {
  vi: { /* ... */ },
  en: { /* ... */ },
  fr: {
    timeline: 'Chronologie',
    map: 'Carte',
    // ...
  },
}
```

4. Cập nhật `middleware.ts` để thêm locale mới

## Tips

- Đặt tên file theo năm để dễ quản lý
- Mỗi file MDX nên tập trung vào một sự kiện chính
- Sử dụng hình ảnh trong thư mục `public/images/`
- Test trên cả desktop và mobile
- Kiểm tra dark mode

## Cần trợ giúp?

Tham khảo:
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)

