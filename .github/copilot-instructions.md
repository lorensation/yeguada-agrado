# Yeguada Agrado - AI Coding Agent Instructions

## Project Overview
This is a Next.js 15 (App Router) website for a Spanish thoroughbred horse breeding farm. Built with TypeScript, Tailwind CSS, shadcn/ui, and Supabase for backend (auth + database + storage). Deployed on Vercel.

## Architecture & Key Patterns

### Next.js App Router Structure
- **Server Components by Default**: Pages in `app/` are server components unless marked with `"use client"`
- **Client Components**: Always require `"use client"` directive at top. Used for interactivity, hooks, event handlers (see `components/admin/*.tsx`, `components/hero-carousel.tsx`)
- **Dynamic Routes**: Use promise-based params in Next.js 15. Always `await params` before accessing:
  ```tsx
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
  }
  ```
- **Metadata Generation**: Use `export const metadata` for static or `generateMetadata()` for dynamic SEO. See `app/actualidad/[slug]/page.tsx` for reference

### Supabase Integration (`lib/supabase/client.ts`)
- **Single Client Instance**: Export `supabase` from `lib/supabase/client.ts` for all database operations
- **Auth Flow**: 
  - Login via `signIn(email, password)` → sets Supabase session
  - Session token stored in cookie via `/api/auth/session` API endpoint
  - Middleware (`middleware.ts`) protects `/admin/*` routes (except `/admin` login page) by checking `sb-access-token` cookie
  - Context provider (`lib/auth-context.tsx`) wraps admin layout for client-side auth state
- **Storage**: Images bucket is public-read, admin-only write. Use `uploadImage()` and `deleteImage()` helpers
- **Database**: Articles table with RLS policies. Published articles are publicly readable; all mutations require admin auth

### Component Patterns
- **shadcn/ui Components**: Located in `components/ui/`. Import via `@/components/ui/*` alias
- **Styling**: Use Tailwind utility classes. Custom colors: `"primary" (#000060), "gold" (#D4AF37), "contrast" (#192A51)`
- **Utils**: `cn()` helper (`lib/utils.ts`) for conditional class merging with `clsx` and `tailwind-merge`
- **Admin Components**: Article editor uses HTML templates dropdown for content authoring. Slug auto-generated from title (max 50 chars, lowercase, hyphenated)

### API Routes (`app/api/`)
- **Contact Form**: `/api/contact` → sends emails via Nodemailer (Hostinger SMTP: info@yeguada-agrado.es)
- **Auth Session**: `/api/auth/session` manages session cookies. `/api/auth/session/clear` for logout
- **Tweets**: `/api/tweets` fetches X/Twitter posts (Vercel KV caching, 15-min refresh)

## Critical Developer Workflows

### Running Development Server
```powershell
npm run dev
```
Access at `http://localhost:3000`. Hot reload enabled.

### Database Setup
1. Create Supabase project
2. Run SQL scripts in order:
   - `db/create_articles_table.sql` (articles table + RLS + triggers)
   - `db/storage_policies.sql` (images bucket + policies)
   - `db/mock_articles_data.sql` (optional test data)
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `EMAIL_PASSWORD` (for contact form)

### Admin Panel Access
1. Navigate to `/admin` → login form
2. After auth, access `/admin/articles` to manage content
3. Article editor supports rich HTML via template dropdown (h1-h3, paragraphs, lists, images, links, etc.)

### Building for Production
```powershell
npm run build
npm start
```
Vercel deployment: auto-deploys from GitHub with env vars configured in dashboard.

## Project-Specific Conventions

### File Organization
- Public static assets in `public/` organized by section (e.g., `public/sementales/noozhoh/`, `public/nacimientos/2025/`)
- Reusable sections in `components/sections/` (historia, instalaciones, nacimientos)
- Page-specific components in `components/` root (e.g., `contact-form.tsx`, `news-card.tsx`)

### Internationalization
- Site language: Spanish (`lang="es"` in root layout)
- Date formatting: Use `date-fns` with `es` locale (see `app/actualidad/[slug]/page.tsx`)

### Image Handling
- Use Next.js `<Image>` component with `fill` for responsive containers
- Config: `images.unoptimized: true` (Vercel handles optimization)
- Remote patterns allowed for Supabase storage domain

### HTML Content Rendering
- Articles use `dangerouslySetInnerHTML` for admin-authored HTML content
- Always wrap in container with `article-content` class for styling

## External Dependencies
- **Supabase**: Backend (auth, PostgreSQL, storage)
- **Vercel**: Hosting + KV store (for tweet caching)
- **Nodemailer**: Email sending via Hostinger SMTP
- **Embla Carousel**: Carousels (hero, videos, tweets)
- **shadcn/ui**: UI components built on Radix UI primitives

## Common Pitfalls
- **Forgetting `"use client"`**: Add to any component using hooks, events, or browser APIs
- **Params Access**: Always `await params` in Next.js 15 App Router
- **Auth Middleware**: Only protects routes matching `/admin/:path*` config. Login page `/admin` is exempt
- **Image Paths**: Use absolute URLs for Supabase storage images (returned from `uploadImage()`)
