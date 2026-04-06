# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### portfolio (React + Vite)
- **Preview path**: `/`
- **Purpose**: Personal developer portfolio for fullstack JavaScript developer
- **Sections**: Hero, About, Skills, Projects, Experience, Contact
- **Animations**: GSAP (scroll triggers, timelines, text reveals), Framer Motion (page transitions, hover animations), Lenis (smooth scrolling)
- **Tech stack displayed**: React, Angular, Node.js, NestJS, TypeScript, JavaScript, PostgreSQL, MongoDB, Docker, Tailwind CSS, Express, Git
- **Key files**:
  - `artifacts/portfolio/src/App.tsx` — app root with Lenis initialization and dark mode
  - `artifacts/portfolio/src/index.css` — dark cinematic theme (electric cyan primary)
  - `artifacts/portfolio/src/pages/Home.tsx` — page layout
  - `artifacts/portfolio/src/components/layout/Navbar.tsx` — fixed animated navbar
  - `artifacts/portfolio/src/components/sections/` — Hero, About, Skills, Projects, Experience, Contact

### api-server (Express)
- **Preview path**: `/api`
- **Purpose**: Backend API server

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
