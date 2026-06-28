# CeFi Platform Foundation

An enterprise-grade, highly scalable full-stack foundation for decentralized or centralized financial platforms. This workspace establishes a modular monorepo structure with zero-trust security middleware, standard JWT authorization, a centralized Express server, and database connection pooling using Drizzle ORM connected to PostgreSQL.

---

## Tech Stack

- **Frontend**: React (v19) + Vite, Tailwind CSS (v4), Motion layout transitions, Lucide React icons.
- **Backend**: Express.js, TypeScript (`tsx` runner), standard JWT authorization (`jsonwebtoken`).
- **Database & ORM**: PostgreSQL, Drizzle ORM, connection pooling via `pg`.
- **Security**: Helmet headers, CORS policies, global memory-based rate limiting, and robust error handlers.

---

## Architecture Design

This project is organized as a clean, modular full-stack monorepo:

- **Client SPA**: Serving high-fidelity React interfaces powered by Vite, with global state contexts and custom hooks for standard JWT token tracking.
- **Express Backend**: Exposing structured RESTful APIs, protected by automated security middlewares and Zod schema validations.
- **Shared Domain Layers**: Centralizing common type declarations, constants, and Zod schemas used across both client and server boundaries to ensure compile-time type-safety.
- **Relational Ledger DB**: Establishing database connection pools and database schema configurations using PostgreSQL.

---

## Folder Structure

```text
/
├── client/                     # React Single Page Application (Vite-React)
│   ├── contexts/               # React Context providers (Auth session, global state)
│   ├── hooks/                  # Custom React hooks (useAuth)
│   ├── layouts/                # Structural templates (BaseLayout navigation wrapper)
│   ├── services/               # Frontend API service layer (fetch proxy)
│   ├── types/                  # Frontend-only UI types
│   ├── utils/                  # Utility formatting tools
│   ├── App.tsx                 # Core Dashboard interface
│   ├── index.css               # Global stylesheets with Tailwind integration
│   └── main.tsx                # Frontend mount entrypoint
│
├── server/                     # Express.js REST API Server
│   ├── config/                 # Environment configs and database options
│   ├── controllers/            # Controller endpoints processing payloads
│   ├── middlewares/            # Security, validation, and JWT authorization middlewares
│   ├── repositories/           # Database direct queries and transactions (UserRepository)
│   ├── routes/                 # Express API routes (V1 versioning)
│   ├── services/               # Core business services
│   └── utils/                  # Logger and response mapping functions
│
├── shared/                     # Shared Monorepo boundaries (Client & Server)
│   ├── constants/              # Global system constants and limits
│   ├── types/                  # Standardized API response and user type definitions
│   └── validators/             # Shared validation schemas (Zod)
│
├── src/db/                     # PostgreSQL Schema Definitions & Drizzle Migrations
│   ├── schema.ts               # Core database tables (users schema)
│   ├── index.ts                # PostgreSQL client connection pool
│   └── drizzle.config.ts       # Drizzle CLI migration manager configs
│
├── .env.example                # Blueprint for local environment setup
├── index.html                  # HTML entry template for Vite
├── package.json                # Project script workflows and dependencies
├── tsconfig.json               # Full monorepo TypeScript compiler configs
└── vite.config.ts              # Vite asset bundler configuration
```

---

## Environment Variables

Configure your local environment variables by copying `.env.example` into `.env`:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# JSON Web Tokens
JWT_SECRET=super-secret-key-change-in-production
JWT_REFRESH_SECRET=super-refresh-secret-key-change-in-production

# PostgreSQL Database (Cloud SQL)
SQL_HOST=127.0.0.1
SQL_USER=postgres
SQL_PASSWORD=my-secure-password
SQL_DB_NAME=cefi_db
SQL_ADMIN_USER=postgres
SQL_ADMIN_PASSWORD=my-secure-password
```

---

## Development & Build Workflows

All commands are structured in the root `package.json` to manage development, compilation, and starting.

### Install Dependencies
```bash
npm install
```

### Start Development Server
Boots the server entry point (`server.ts`) using `tsx` in watch-mode, injecting Vite dev middlewares to compile and mount the React SPA.
```bash
npm run dev
```

### Lint Files
Type-checks the full monorepo including both client, server, and shared directories.
```bash
npm run lint
```

### Production Build compilation
Runs Vite compiler to bundle the frontend SPA assets into `/dist`, and bundles the Express server using `esbuild` into a self-contained CommonJS file (`dist/server.cjs`) to ensure lightning-fast server load-times and standard platform deployment capability.
```bash
npm run build
```

### Start Production server
Runs the compiled, self-contained Express server directly.
```bash
npm run start
```
