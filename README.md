# SaaS Template - SEO Optimized

A modern, SEO-optimized SaaS template built with Next.js 15, TypeScript, and Tailwind CSS. This template is designed to achieve 100/100 Lighthouse SEO scores out of the box.

## 🚀 Features

- ✅ **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, structured data
- ✅ **Performance Focused**: Optimized fonts, images, and Core Web Vitals
- ✅ **Accessibility Ready**: Semantic HTML, proper ARIA labels, keyboard navigation
- ✅ **Dark Mode Support**: Built-in light/dark theme switching
- ✅ **Mobile First**: Responsive design that works on all devices
- ✅ **TypeScript**: Full type safety and developer experience
- ✅ **Easy Customization**: Well-commented template sections for quick changes

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Brand Information (app/layout.tsx)
Replace the following placeholders:
- `Your SaaS Name` → Your actual SaaS name
- `yourdomain.com` → Your actual domain
- `Your Company Name` → Your company name
- `@yourtwitterhandle` → Your Twitter handle
- Update descriptions to match your value proposition

### 2. Homepage Content (app/page.tsx)
Look for comments starting with `{/* */}` to find sections to customize:
- **Hero Section**: Update main headline and subheading
- **Features Section**: Replace with your actual features
- **Pricing Section**: Update pricing plans and features
- **Footer**: Update company links and information

### 3. SEO Assets (public/)
Replace these files with your own:
- `favicon.ico` → Your favicon
- `og-image.jpg` → Your Open Graph image (1200x630px)
- `apple-touch-icon.png` → Your Apple touch icon
- `favicon-16x16.png` → 16x16 favicon
- `android-chrome-192x192.png` → Android icon (192x192px)
- `android-chrome-512x512.png` → Android icon (512x512px)

### 4. Site Configuration
Update these files:
- `public/robots.txt` → Replace domain with yours
- `public/sitemap.xml` → Add your actual pages and domain
- `public/site.webmanifest` → Update app name and colors

## 🎨 Styling

This template uses Tailwind CSS with a carefully chosen color palette optimized for accessibility and conversion:
- Primary: Blue (`blue-600`)
- Success: Green (`green-500`)
- Warning: Yellow (`yellow-500`)
- Error: Red (`red-500`)

## 📊 SEO Checklist

This template includes:
- ✅ Meta titles and descriptions
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Proper heading hierarchy
- ✅ Mobile viewport configuration
- ✅ Robots.txt
- ✅ XML sitemap
- ✅ Web app manifest

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy with automatic CI/CD

### Other Platforms
```bash
npm run build
npm start
```

## 📈 Performance Tips

1. **Images**: Use Next.js Image component with proper sizing
2. **Fonts**: Template uses `font-display: swap` for optimal loading
3. **Code Splitting**: Next.js handles this automatically
4. **Caching**: Configure your hosting platform's caching rules

## 🔧 Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
saas-template/
├── app/
│   ├── layout.tsx          # Root layout with SEO meta tags
│   ├── page.tsx           # Homepage template
│   └── globals.css        # Global styles
├── public/
│   ├── robots.txt         # Search engine instructions
│   ├── sitemap.xml        # Site structure for search engines
│   └── site.webmanifest   # PWA manifest
└── README.md              # This file
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

---

**Need help?** Check the comments in the code files - they guide you through each customization step!
