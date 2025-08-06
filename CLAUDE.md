# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run openapi-ts` - Generate TypeScript client from OpenAPI specs at https://api.demonstrations.org/v1/openapi.json

## Architecture Overview

This is a Next.js 15 application that displays event/demonstration data on an interactive map. The application follows a client-side heavy architecture with the following key components:

### Data Flow
- **API Client**: Auto-generated TypeScript client (`src/client/`) from OpenAPI specs using @hey-api/openapi-ts
- **State Management**: React Query for server state with localStorage persistence, React useState for UI state
- **Data Source**: Demonstrations API at `https://api.demonstrations.org`

### Core Components Structure
- `src/app/page.tsx` → `Wrapper.tsx` → `EventExplorer.tsx` - Main application flow
- `EventExplorer` - Main container managing selected events and date navigation
- `Map.tsx` - Leaflet-based interactive map with clustering support
- `Event.tsx` - Event detail component
- `useEvents.tsx` & `useDemosEvents.tsx` - Custom hooks for event data fetching

### Map Implementation
- Uses Leaflet with react-leaflet and leaflet.markercluster
- Dynamic marker clustering with custom colors
- Event selection and highlighting on map
- Center defaults to Berlin coordinates `[52.5200, 13.4050]`

### Key Architectural Patterns
- All interactive components use "use client" directive (App Router client components)
- TypeScript strict mode with explicit return types
- React Query with persistence for caching API responses
- Event-driven architecture with callback props for component communication
- Date-based filtering with day navigation controls

## Code Style (from CRUSH.md)

- **Imports**: Group by type (React, components, types, utils)
- **Components**: Functional components with explicit return types, PascalCase naming
- **Formatting**: 2-space indentation, single quotes, semicolons, explicit return types
- **State Management**: React Query for server state, useState for UI state
- **File Structure**: Use "use client" for client components, index.ts for clean exports

## OpenAPI Integration

The project uses a code generation workflow:
1. OpenAPI spec fetched from `https://api.demonstrations.org/v1/openapi.json`
2. `npm run openapi-ts` generates TypeScript client in `src/client/`
3. Includes @tanstack/react-query integration for hooks
4. Generated client configured with base URL `https://api.demonstrations.org`