# Multi-Tenant Next.js Application

A modern, full-stack multi-tenant application built with Next.js, Clerk authentication, and PostgreSQL. This application supports subdomain-based tenant isolation, allowing each organization to have its own dedicated subdomain.

## 🚀 Features

- **Multi-Tenant Architecture**: Subdomain-based tenant isolation (e.g., `rcb.localhost:3000`)
- **Authentication**: Secure authentication and authorization using Clerk
- **Organization Management**: Support for multiple organizations with isolated data
- **Blog Management**: Organization-specific blog posts
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type-Safe Database**: Drizzle ORM with PostgreSQL
- **SSO Support**: Single Sign-On callback handling

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety
- **Containerization**: Docker Compose for database

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/yarn/pnpm
- Docker and Docker Compose (for local database)
- A Clerk account (for authentication)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd multi-tenant-next
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Root Domain (for subdomain routing)
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000

# Database (if not using Docker Compose defaults)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/multi_tenant_next
```

### 4. Start the Database

Using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL database on port 5432 with:
- Username: `postgres`
- Password: `postgres`
- Database: `multi_tenant_next`

### 5. Run Database Migrations

```bash
npm run db:push
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🌐 Multi-Tenant Architecture

### Subdomain Routing

The application uses subdomain-based routing to isolate tenants:

- **Root Domain**: `localhost:3000` - Main application
- **Subdomain**: `{subdomain}.localhost:3000` - Tenant-specific pages

Example:
- `rcb.localhost:3000` → Routes to `/s/rcb`
- `acme.localhost:3000` → Routes to `/s/acme`

### How It Works

1. **Middleware** (`middleware.ts`): Intercepts requests and extracts the subdomain
2. **Route Rewriting**: Rewrites subdomain requests to `/s/[subdomain]` route
3. **Authentication**: Each subdomain route requires user authentication
4. **Data Isolation**: Organization data is filtered by `orgId` from Clerk

## 📁 Project Structure

```
multi-tenant-next/
├── app/
│   ├── (root)/              # Root domain routes
│   │   ├── layout.tsx       # Root layout with auth
│   │   ├── page.tsx         # Home page
│   │   └── org/
│   │       └── [slug]/      # Organization pages
│   ├── (subdomain)/         # Subdomain routes
│   │   └── s/
│   │       └── [subdomain]/ # Subdomain-specific pages
│   │           ├── layout.tsx
│   │           └── page.tsx
│   ├── components/          # Shared components
│   └── sso-callback/        # SSO callback handler
├── components/
│   └── ui/                  # shadcn/ui components
├── db/
│   ├── index.ts             # Database connection
│   └── schema.ts            # Database schema
├── lib/
│   └── utils.ts             # Utility functions
├── middleware.ts             # Subdomain routing middleware
└── docker-compose.yml        # Database setup
```

## 🗄️ Database Schema

### Blog Table

```typescript
{
  id: uuid (primary key)
  title: varchar(100)
  content: text
  orgId: text (references Clerk organization)
  createdAt: date
}
```

## 🔐 Authentication Flow

1. User visits a subdomain (e.g., `rcb.localhost:3000`)
2. Middleware extracts the subdomain and rewrites the route
3. Layout checks authentication status:
   - **Not authenticated**: Shows Clerk Sign-In component
   - **Authenticated**: Renders the page content
4. Page fetches organization data using Clerk's `orgId`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run lint` - Run ESLint

## 🧪 Development Workflow

### Creating a New Blog Post

Blog posts are created through the organization pages and are automatically associated with the current organization's `orgId`.

### Accessing Subdomains Locally

To test subdomain routing locally:

1. Ensure your `/etc/hosts` file includes:
   ```
   127.0.0.1 localhost
   127.0.0.1 rcb.localhost
   127.0.0.1 acme.localhost
   ```

2. Access the subdomain in your browser:
   ```
   http://rcb.localhost:3000
   ```

### Database Management

- **View Database**: `npm run db:studio`
- **Update Schema**: Modify `db/schema.ts`, then run `npm run db:push`
- **Reset Database**: Stop Docker container, remove volume, restart

## 🚢 Deployment

### Environment Variables for Production

Update your production environment variables:

```env
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_prod_key
CLERK_SECRET_KEY=your_prod_secret
DATABASE_URL=your_production_database_url
```

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

The application supports Vercel preview deployments with the format: `{tenant}---{branch}.vercel.app`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Subdomain Not Working

- Check that your `/etc/hosts` file includes the subdomain
- Verify `NEXT_PUBLIC_ROOT_DOMAIN` is set correctly
- Check browser console for routing errors

### Authentication Issues

- Verify Clerk keys are set correctly in `.env.local`
- Ensure you're signed in to Clerk
- Check that the organization exists in Clerk

### Database Connection Issues

- Ensure Docker container is running: `docker-compose ps`
- Check database credentials match in `db/index.ts`
- Verify port 5432 is not in use by another service

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
