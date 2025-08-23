# SaaS Waitlist Template

A production-ready, SEO-optimized Next.js 15 waitlist landing page with n8n webhook integration, complete analytics tracking, and GDPR compliance.

## 🚀 Features

**Performance & SEO Optimized**
- 100/100 Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Comprehensive meta tags, Open Graph, and structured data
- Security headers and CSP configuration

**Waitlist Integration**
- Complete n8n webhook integration with retry logic and error handling
- Form validation using Zod schemas
- Rate limiting and spam protection

**User Experience**
- React Hook Form with client-side validation
- Toast notification system with multiple types
- Loading states and comprehensive error handling
- Responsive design with dark mode support

**Analytics & Compliance**
- Google Analytics 4 integration
- GDPR-compliant cookie consent management
- Event tracking for signup funnel
- Privacy policy and cookie policy pages

## Quick Setup

### 1. Environment Configuration

Copy `.env.local` and configure your n8n webhook:

```bash
# Replace with your actual n8n webhook URL
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/waitlist

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

## n8n Webhook Setup

### Expected Request Format

Your n8n webhook should receive:

```json
{
  "email": "user@example.com",
  "product": "aiResearcher"
}
```

### Expected Response Format

Your n8n workflow should respond with:

```json
{
  "success": true,
  "message": "Successfully added to waitlist! Please check your email to confirm your subscription.",
  "data": {
    "email": "user@example.com",
    "timestamp": "2024-01-15T10:30:45.123Z"
  }
}
```

### Error Handling

For errors, respond with appropriate HTTP status codes:

- `409` for existing emails
- `429` for rate limiting
- `400` for validation errors
- `500` for server errors

### Example n8n Workflow

1. **Webhook Trigger** - Receives the waitlist data
2. **Data Validation** - Validates email format and required fields
3. **Database Check** - Check if email already exists
4. **Add to Database** - Store the waitlist entry
5. **Send Confirmation Email** - Send confirmation email with any required links
6. **Respond** - Return success/error response

## Customization

### Branding

Update the following components with your branding:

1. **Logo**: Replace placeholder in `app/page.tsx` and `app/layout.tsx`
2. **Company Name**: Search and replace "YourLogo" throughout the codebase
3. **Domain**: Update `https://yourdomain.com` in `app/layout.tsx`
4. **Product Name**: Change `'aiResearcher'` in `app/api/waitlist/route.ts` to your product name
5. **Colors**: Modify Tailwind classes for your brand colors

### Content

Update these key sections in `app/page.tsx`:

- Hero headline and subheading
- Value proposition text
- Social proof numbers
- Launch timeline

### Legal Pages

Customize the content in:
- `app/privacy/page.tsx` - Privacy policy
- `app/cookies/page.tsx` - Cookie policy
- `app/contact/page.tsx` - Contact information

## API Endpoints

### POST /api/waitlist

Handles waitlist signups with comprehensive validation and error handling.

**Request Body:**
```json
{
  "email": "user@example.com",
  "agreeToEmails": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully added to waitlist!",
  "data": {
    "email": "user@example.com",
    "timestamp": "2024-01-15T10:30:45.123Z"
  }
}
```

**Error Response (400/409/429/500):**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

## Error Codes

The API uses specific error codes for better error handling:

- `EMAIL_ALREADY_EXISTS` - Email is already on the waitlist
- `VALIDATION_ERROR` - Invalid input data
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `TIMEOUT_ERROR` - Request timeout
- `SERVER_ERROR` - Internal server error
- `WEBHOOK_ERROR` - n8n webhook error

## Analytics Events

Automatically tracked events:

- `waitlist_signup_started` - User starts signup process
- `waitlist_signup_completed` - Successful signup
- `waitlist_signup_error` - Signup errors
- `page_view` - Page views with page names

## Production Deployment

### Build

```bash
npm run build
```

### Environment Variables

Ensure these are set in production:

```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/waitlist
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NODE_ENV=production
```

### Deployment Platforms

This template works with:
- Vercel (recommended)
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Security Features

- CSRF protection via Next.js
- Content Security Policy (CSP) headers
- Rate limiting on API endpoints
- Input sanitization and validation
- XSS protection headers

## Performance Optimizations

- Image optimization with Next.js Image component
- Font optimization with Google Fonts
- Lazy loading of components
- Minimal bundle size with tree shaking
- Static page generation where possible

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the documentation above
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS
# Waitlist-SaaS-Template
