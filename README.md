# Helvino Technologies Limited - Corporate Website & CMS Platform

A modern, investor-ready corporate website and CMS platform built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### Public Website
- ✨ Modern, responsive design with Tailwind CSS
- 🎨 Beautiful UI components with shadcn/ui
- 📱 Mobile-first approach
- ⚡ Server-side rendering for optimal performance
- 🔍 SEO optimized with meta tags and structured data
- 📊 Contact forms with email notifications
- ⭐ Client review submission system
- 📰 Blog with rich content management

### Admin Dashboard
- 🔐 Secure authentication system
- 📊 Comprehensive analytics dashboard
- 🛠️ Service management (CRUD operations)
- 📁 Project portfolio management
- ⭐ Review moderation system
- 📝 Blog content management
- 📬 Lead tracking and management
- 🎯 Status tracking for all entities

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Custom auth with bcrypt
- **Email:** Nodemailer
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone and Install
```bash
# Navigate to project directory
cd helvino-platform

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update the `.env` file with your credentials:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/helvino_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="helvinotechltd@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="helvinotechltd@gmail.com"

# Optional: Cloudinary for image uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Database Setup
```bash
# Push the Prisma schema to your database
npm run db:push

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

### 4. Create Admin User

You'll need to create an admin user directly in the database. Open Prisma Studio:
```bash
npm run db:studio
```

Then create a user with:
- **Email:** admin@helvinotech.com (or your preferred email)
- **Password:** (hashed using bcrypt)
- **Role:** ADMIN

To generate a bcrypt hash for your password, you can use this Node.js script:
```javascript
const bcrypt = require('bcryptjs');
const password = 'your-password-here';
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

### 5. Add Company Logo

Place your logo image at:
```
public/images/logo.png
```

### 6. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000 to see the website.
Visit http://localhost:3000/admin to access the admin dashboard.

## 📁 Project Structure
```
helvino-platform/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── images/                # Static images
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── admin/            # Admin dashboard pages
│   │   ├── api/              # API routes
│   │   ├── auth/             # Authentication pages
│   │   ├── about/            # About page
│   │   ├── services/         # Services page
│   │   ├── projects/         # Projects pages
│   │   ├── blog/             # Blog pages
│   │   ├── contact/          # Contact page
│   │   ├── reviews/          # Reviews page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── admin/            # Admin components
│   │   ├── public/           # Public-facing components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI components (shadcn)
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   ├── utils.ts          # Utility functions
│   │   └── email.ts          # Email functions
│   └── types/
│       └── index.ts          # TypeScript types
├── .env                       # Environment variables
├── .env.example              # Environment template
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🎯 Key Features Usage

### Managing Services

1. Go to `/admin/services`
2. Click "Add Service"
3. Fill in service details, features, SEO info
4. Set display order and status
5. Save and publish

### Managing Projects

1. Go to `/admin/projects`
2. Click "Add Project"
3. Add project details, technologies, images
4. Mark as featured for homepage display
5. Link to relevant service
6. Save and publish

### Managing Reviews

1. Go to `/admin/reviews`
2. View pending reviews
3. Approve, reject, or feature reviews
4. Approved reviews appear on the public site

### Managing Leads

1. Go to `/admin/leads`
2. View all contact form submissions
3. Update lead status (New → Contacted → In Progress → Closed)
4. Add internal notes
5. Track quotation requests separately

### Managing Blog

1. Go to `/admin/blog`
2. Click "New Post"
3. Write content (supports rich text/HTML)
4. Add cover image, category, tags
5. Set SEO metadata
6. Publish or save as draft

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Database Hosting

Recommended options:
- **Neon** (serverless PostgreSQL)
- **Supabase** (PostgreSQL + additional features)
- **Railway** (full-stack hosting)

## 📧 Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in EMAIL_SERVER_PASSWORD

## 🔒 Security Considerations

- Change default admin credentials immediately
- Use strong, unique passwords
- Enable HTTPS in production
- Keep dependencies updated
- Review and update CORS settings
- Implement rate limiting for production

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change brand colors:
```typescript
colors: {
  helvino: {
    blue: '#0056A4',    // Primary blue
    orange: '#FF6B35',  // Accent orange
    navy: '#003057',    // Dark navy
  },
}
```

### Content

- Update company info in footer: `src/components/layout/footer.tsx`
- Modify homepage: `src/app/page.tsx`
- Change metadata: `src/app/layout.tsx`

## 📱 Contact Information

- **Email:** helvinotechltd@gmail.com
- **Phone:** 0703 445 756
- **LinkedIn:** linkedin.com/company/helvino-technologies-limited
- **Location:** Kisumu, Kenya

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Verify DATABASE_URL is correct
# Ensure PostgreSQL is running
# Try regenerating Prisma client
npx prisma generate
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Authentication Issues
```bash
# Verify NEXTAUTH_SECRET is set
# Check user exists in database
# Ensure password is correctly hashed
```

## 📝 License

© 2024 Helvino Technologies Limited. All rights reserved.

## 🤝 Support

For support, email helvinotechltd@gmail.com or create an issue in the repository.

---

Built with ❤️ by Helvino Technologies Limited
