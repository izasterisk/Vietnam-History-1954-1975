# Vietnam 1954–1975

Interactive website showcasing Vietnam history from 1954 to 1975 with Timeline and Map.

[🇻🇳 Tiếng Việt](./README.md) | 🇬🇧 English

## Features

- **Single Page Layout** - Timeline and Map on one page
- **Interactive Timeline** - Vertical timeline with key historical events
- **Interactive Map** - Leaflet map with event markers
- **Dark Mode** - Toggle between light and dark themes
- **i18n Support** - Vietnamese and English
- **MDX Content** - Easy content management with Markdown
- **Responsive Design** - Works on all devices
- **SEO Optimized** - next-seo integration

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **MDX** for content management
- **react-vertical-timeline-component**
- **react-leaflet** + **leaflet**
- **next-seo**

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Vietnamese: http://localhost:3000/vi
# English: http://localhost:3000/en
```

## Project Structure

```
├── app/[locale]/          # Localized pages
├── components/            # React components
├── content/events/        # MDX event files
├── lib/                   # Utilities
├── public/images/         # Static images
└── styles/               # Global styles
```

## Adding New Events

1. Create MDX file in `content/events/`
2. Add front-matter metadata
3. Write content in Markdown
4. Events auto-appear on Timeline & Map

Example:

```mdx
---
year: 1965
title: Event Title
city: City Name
lat: 21.0285
lng: 105.8542
summary: Brief description
---

# Detailed Content

Write your content here...
```

## Customization

### Change Theme Colors

Edit `styles/globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
}
```

### Change Map Center

Edit `lib/constants.ts`:

```typescript
export const MAP_CENTER = {
  lat: 16.0544,
  lng: 108.2022,
  zoom: 6,
}
```

## Documentation

- [README.md](./README.md) - Vietnamese documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guide
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Project structure
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [SUMMARY.md](./SUMMARY.md) - Project summary

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Check code
npm run format   # Format code
```

## Deployment

Deploy to Vercel (recommended):

```bash
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more options.

## License

MIT License - see [LICENSE](./LICENSE)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

---

Made with ❤️ for Vietnam History

