# TypeMarket - Full Stack TypeScript Marketplace

TypeMarket is a polished, production-ready marketplace application built with Next.js, TypeScript, MongoDB, Tailwind CSS, and modern authentication flows. It includes public browsing, protected listing management, admin analytics, reviews, search, filtering, pagination, and responsive UI patterns.

## Features

- JWT authentication with login, registration, logout, and demo credentials
- Role-based access for users and admins
- Protected routes for adding, editing, and managing listings
- Public item discovery with search, category filters, price filters, sorting, and pagination
- Item detail pages with image gallery, description, specs, reviews, and related items
- Admin dashboard with analytics charts
- Responsive SaaS-style UI with reusable components, loading states, empty states, and toast feedback

## Tech Stack

### Frontend
- Next.js 16 App Router
- TypeScript (strict mode)
- Tailwind CSS
- React Hook Form + Zod
- TanStack Query
- Framer Motion
- Lucide React
- Recharts
- React Hot Toast

### Backend
- Next.js API Routes
- TypeScript
- MongoDB Atlas + Mongoose
- JWT + bcryptjs
- Cookie-based auth

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account or local MongoDB
- npm

### Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment Variables

Create a .env.local file with:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/typemarket?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Demo Credentials

- User: user@typemarket.com / password123
- Admin: admin@typemarket.com / password123

## Folder Structure

```text
src/
  app/                 # Next.js routes and API handlers
  components/          # Reusable UI components
  constants/           # Shared app constants
  context/             # React providers
  hooks/               # Custom hooks
  lib/                 # Auth, DB, models, image helpers
  services/            # API service layer
  types/               # Shared TypeScript types
```

## API Overview

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id
- GET /api/items/:id/reviews
- POST /api/items/:id/reviews
- POST /api/seed

## Deployment

- Frontend: Vercel-ready
- Backend: Next.js API routes, deployable on Vercel
- Database: MongoDB Atlas

## License

MIT
