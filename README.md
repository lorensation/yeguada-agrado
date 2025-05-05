# Yeguada Agrado 🐎

<p align="center">
  <img src="/public/logo.jpg" alt="Yeguada Agrado Logo" width="150">
</p>

A Next.js website for Yeguada Agrado, a thoroughbred horse breeding farm. This website showcases their stallions, services, facilities, and latest news.

## 🛠️ Developed by

<p align="center">
  <img src="/public/CineronteLogo.png" alt="Cineronte Logo" width="150">
</p>

This website was professionally designed and developed by **Cineronte S.L.**. For your web development and design needs:

- 📧 **Email**: info@lorenzosanz.com
- 📞 **Phone**: [+34 692 460 376](https://wa.me/34692460376)
- 🌐 **Portfolio**: [github.com/lorensation](https://github.com/lorensation/)

## 📋 Features

- **Responsive Design**: Fully responsive website optimized for all devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Dynamic Content**: Server and client components for optimal performance
- **CMS Integration**: Admin panel for content management
- **Authentication**: Secure login for administrative tasks
- **Image Management**: Upload and manage images for articles
- **Social Media Integration**: Twitter/X feed carousel showcasing latest updates
- **Video Showcase**: Embedded video content from YouTube
- **Interactive Elements**: Carousels, tabs, and other UI components for enhanced user experience
- **Cookie Management**: GDPR-compliant cookie consent management

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Supabase](https://supabase.io/) - Backend-as-a-Service for authentication and database
- [Embla Carousel](https://www.embla-carousel.com/) - Carousel component
- [Lucide React](https://lucide.dev/) - Icon library
- [date-fns](https://date-fns.org/) - Date utility library

## 📁 Project Structure

```
yeguada-agrado/
├── app/                  # Next.js App Router
│   ├── actualidad/       # News and articles
│   ├── admin/            # Admin panel
│   ├── api/              # API routes
│   ├── contacto/         # Contact page
│   ├── sementales/       # Stallions page
│   ├── servicios/        # Services page
│   └── yeguada/          # About the farm page
├── components/           # React components
│   ├── admin/            # Admin-specific components
│   ├── sections/         # Page sections components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   └── supabase/         # Supabase client and helpers
├── public/               # Static assets
└── styles/               # Global styles
```

## 📝 Content Management

The website includes an admin panel for managing articles:

1. Access the admin login page
2. Once authenticated, you can:
   - Create new articles
   - Edit existing articles
   - Delete articles
   - Toggle article publication status

## 🌐 Deployment

This project is set up to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy

## 📋 Database Setup

The project uses Supabase for database and authentication:

1. Create a new Supabase project
2. Run the SQL scripts in the `db` folder to set up the necessary tables
3. Configure storage policies according to the `db/storage_policies.sql` file

## 💾 Supabase Schema

The main tables used in this project are:

- `articles` - For storing news articles
- `storage.objects` - For storing images


## 📜 License

This project is proprietary and not open for redistribution without permission.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)