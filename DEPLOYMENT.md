# Hướng dẫn Deploy Production

## Tùy chọn 1: Vercel (Khuyến nghị) ⭐

Vercel là nền tảng tốt nhất cho Next.js (do cùng team phát triển).

### Bước 1: Tạo tài khoản

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng ký bằng GitHub

### Bước 2: Deploy

```bash
# Cài Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Hoặc qua GitHub:

1. Push code lên GitHub
2. Import project từ Vercel dashboard
3. Vercel tự động deploy mỗi khi push

### Environment Variables

Trong Vercel dashboard, thêm:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## Tùy chọn 2: Netlify

### Bước 1: Tạo `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Bước 2: Deploy

```bash
# Cài Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy production
netlify deploy --prod
```

---

## Tùy chọn 3: VPS (DigitalOcean, Linode, etc.)

### Cài đặt server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Cài Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cài PM2
sudo npm install -g pm2
```

### Deploy code

```bash
# Clone repository
git clone https://github.com/your-username/vietnam-history.git
cd vietnam-history

# Cài dependencies
npm install

# Build
npm run build

# Start với PM2
pm2 start npm --name "vietnam-history" -- start

# Lưu PM2 config
pm2 save
pm2 startup
```

### Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL với Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Tùy chọn 4: Docker

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=https://your-domain.com
    restart: unless-stopped
```

### Deploy

```bash
# Build image
docker build -t vietnam-history .

# Run container
docker run -p 3000:3000 vietnam-history

# Hoặc dùng docker-compose
docker-compose up -d
```

---

## Pre-deployment Checklist

### 1. Environment Variables

```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. SEO Configuration

File: `lib/seo.config.ts`

```typescript
export const defaultSEOConfig: DefaultSeoProps = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description.vi,
  openGraph: {
    url: 'https://your-actual-domain.com', // ← Đổi URL
    // ...
  },
}
```

### 3. Build test

```bash
# Test build locally
npm run build

# Test production build
npm run start

# Kiểm tra tại http://localhost:3000
```

### 4. Optimize

```bash
# Analyze bundle size (optional)
npm install -D @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run analysis
ANALYZE=true npm run build
```

---

## Post-deployment

### 1. Kiểm tra các tính năng

- [ ] Homepage loads
- [ ] Timeline hiển thị
- [ ] Map loads với markers
- [ ] Dark mode hoạt động
- [ ] i18n switching (vi/en)
- [ ] Smooth scrolling
- [ ] Responsive trên mobile
- [ ] SEO meta tags
- [ ] Performance (Lighthouse)

### 2. Monitoring

```bash
# Vercel Analytics (tự động)
# Vercel dashboard → Analytics

# Google Analytics (optional)
# Thêm vào app/[locale]/layout.tsx
```

### 3. Custom Domain

#### Vercel:
1. Settings → Domains
2. Add custom domain
3. Update DNS records

#### Netlify:
1. Domain settings
2. Add custom domain
3. Configure DNS

---

## Performance Tips

### 1. Image Optimization

```tsx
// Sử dụng Next.js Image component
import Image from 'next/image'

<Image
  src="/images/event.jpg"
  alt="Event"
  width={800}
  height={600}
  priority
/>
```

### 2. Lazy Loading

```tsx
// Dynamic import cho components nặng
import dynamic from 'next/dynamic'

const MapSection = dynamic(() => import('@/components/MapSection'), {
  ssr: false, // Disable SSR cho map
  loading: () => <p>Loading map...</p>
})
```

### 3. Caching

```typescript
// next.config.mjs
const nextConfig = {
  // ...
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

---

## Rollback

### Vercel
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

### PM2
```bash
# Stop current
pm2 stop vietnam-history

# Checkout previous version
git checkout <previous-commit>
npm install
npm run build
pm2 restart vietnam-history
```

---

## CI/CD

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Troubleshooting

### Build fails

```bash
# Clear cache
rm -rf .next
npm run build
```

### Map không hiển thị

```typescript
// Ensure Leaflet loaded client-side only
'use client'
```

### Environment variables không work

```bash
# Phải có prefix NEXT_PUBLIC_
NEXT_PUBLIC_SITE_URL=https://...

# Rebuild sau khi thay đổi env vars
npm run build
```

---

## Cost Estimation

### Vercel (Khuyến nghị)
- **Hobby Plan**: FREE
- Giới hạn: 100GB bandwidth/month
- Phù hợp cho: Dự án cá nhân, prototype

### Netlify
- **Free Plan**: FREE  
- Giới hạn: 100GB bandwidth/month
- Phù hợp cho: Dự án nhỏ

### VPS (DigitalOcean)
- **Basic Droplet**: $6/month
- 1GB RAM, 25GB SSD
- Phù hợp cho: Full control

### Vercel Pro
- **Pro Plan**: $20/month
- Unlimited bandwidth
- Phù hợp cho: Production app

---

## Support

Nếu gặp vấn đề khi deploy:

1. Kiểm tra [Vercel Docs](https://vercel.com/docs)
2. Xem [Next.js Deployment](https://nextjs.org/docs/deployment)
3. Check build logs
4. Test local build trước

**Good luck! 🚀**

