# Hướng dẫn nhanh

## Chạy dự án ngay lập tức

```bash
# 1. Cài đặt dependencies (nếu chưa)
npm install

# 2. Chạy development server
npm run dev

# 3. Mở trình duyệt
# Tiếng Việt: http://localhost:3000/vi
# Tiếng Anh: http://localhost:3000/en
```

## Thêm sự kiện mới (3 bước)

### Bước 1: Tạo file MDX

Tạo file mới: `content/events/1960.mdx`

### Bước 2: Copy template này

```mdx
---
year: 1960
title: Thành lập Mặt trận Dân tộc Giải phóng miền Nam
city: Sài Gòn
lat: 10.8231
lng: 106.6297
summary: Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập
---

# Thành lập Mặt trận (20/12/1960)

Mặt trận Dân tộc Giải phóng miền Nam Việt Nam chính thức được thành lập tại một vùng rừng thuộc Tây Ninh.

## Ý nghĩa

- Đánh dấu bước ngoặt trong cuộc kháng chiến chống Mỹ
- Tập hợp các lực lượng yêu nước
- Tổ chức lãnh đạo cuộc đấu tranh giải phóng miền Nam
```

### Bước 3: Refresh trang

Sự kiện mới tự động xuất hiện trên Timeline và Map!

## Tìm tọa độ nhanh

### Các thành phố chính:

```javascript
Hà Nội:      lat: 21.0285, lng: 105.8542
Huế:         lat: 16.4637, lng: 107.5909
Đà Nẵng:     lat: 16.0544, lng: 108.2022
Sài Gòn:     lat: 10.8231, lng: 106.6297
Cần Thơ:     lat: 10.0341, lng: 105.7218
Điện Biên Phủ: lat: 21.3844, lng: 103.0154
```

### Hoặc dùng Google Maps:

1. Mở [Google Maps](https://maps.google.com)
2. Click phải vào địa điểm
3. Click vào tọa độ để copy

## Cấu trúc thư mục quan trọng

```
content/events/     ← Thêm file MDX vào đây
public/images/      ← Thêm hình ảnh vào đây
lib/constants.ts    ← Chỉnh màu, tâm bản đồ, ngôn ngữ
styles/globals.css  ← Chỉnh theme, dark mode
```

## Commands hữu ích

```bash
npm run dev      # Chạy development
npm run build    # Build production
npm run start    # Chạy production build
npm run lint     # Kiểm tra lỗi code
npm run format   # Format code
```

## Troubleshooting

### Bản đồ không hiển thị?

- Kiểm tra `lat` và `lng` có đúng format không
- Kiểm tra Leaflet CSS đã import chưa (có sẵn rồi)

### Timeline trống?

- Kiểm tra file MDX có front-matter đúng không
- Kiểm tra file có extension `.mdx` không phải `.md`

### Lỗi build?

```bash
# Xóa cache và build lại
rm -rf .next
npm run build
```

## Cần thêm trợ giúp?

Xem file `CONTRIBUTING.md` hoặc `README.md` để biết thêm chi tiết!

