# Viral Maker - Frontend Architecture Guide

## Project Overview
Angular 16 application for sports club social media management. Dual authentication system (Supabase + custom backend JWT), club management, and AI caption generation.

## Architecture & Data Flow

### Authentication Pattern (Dual-Layer)
- **Supabase**: Primary authentication (`SupabaseService`) for user signup/signin with session persistence
- **Backend JWT**: Secondary token layer for API authorization stored in `localStorage` (`access_token`, `refresh_token`)
- `AuthInterceptor` handles automatic token refresh on 401 errors (calls `/refresh` endpoint)
- `AuthGuard` validates Supabase session before route activation
- `AuthService` caches user ID after initialization with `initUser()`

**Example**: Login flow stores both Supabase session AND backend JWT tokens. All backend API calls use JWT via interceptor.

### Service Layer Architecture
All API services extend `BaseApiService` which:
- Provides typed HTTP methods (`get<T>`, `post<T>`, `delete`)
- Auto-injects `Authorization: Bearer {token}` headers from localStorage
- Points to `http://127.0.0.1:8000` backend

**Service Pattern**:
```typescript
export class ClubService extends BaseApiService {
  getClubs(): Observable<Club[]> {
    return this.get<Club[]>('/clubs');
  }
}
```

### Key Services
- **ClubService**: Club CRUD, explore with filters (sport_id, city), follow/unfollow, slug-based lookup
- **CaptionService**: AI caption generation (`/generate-captions`, `/generate-captions/image`)
- **SupabaseService**: Auth + file storage (club logos in `club-logos` bucket with private/ prefix)
- **SportService**: Sport metadata lookup by ID

### File Upload Flow
1. User selects/drops file in component
2. Component calls `SupabaseService.uploadLogo(file, 'private/${timestamp}.ext')`
3. Returns public URL via `getPublicUrl(fileName)`
4. Store `logo_url` in Club model before API submission
5. Backend expects full Supabase public URL in club creation

### Models & Data
- **Club**: `slug` generated server-side, `user_id_owner` extracted from JWT token using `Utils.parseJwt()`
- **Credits**: Tracks AI generation usage (not yet fully integrated)
- Use TypeScript classes with constructors (see `Club` model pattern)

## Development Workflows

### Running the App
```bash
npm start          # Dev server on localhost:4200
npm run build      # Production build
npm test           # Karma/Jasmine tests
```

### Backend Dependency
Frontend expects backend API at `http://127.0.0.1:8000`. Update `BaseApiService.baseUrl` if different.

### Component Generation
Standard Angular CLI patterns - all components in `src/app/components/` or `src/app/pages/`

## Project-Specific Conventions

### Routing
- Route guards require Supabase auth (not just JWT presence)
- Slug-based URLs for clubs: `/club/:slug` (NOT `/club/:id`)
- Redirect to `/login` on auth failures, default redirect to `/home`

### State Management
- **No NgRx/signals**: Component-level state with RxJS observables
- LocalStorage for tokens: `access_token`, `refresh_token`
- `AuthService.userId` cached after first retrieval

### Styling
- **TailwindCSS v3** configured (`tailwind.config.js` scans `src/**/*.{html,ts}`)
- Styles in `styles.css` (global) or component CSS files
- No CSS modules or preprocessors

### Error Handling
- Console logging + alert() for user feedback (example: `create-club.component.ts`)
- 401 errors auto-handled by `AuthInterceptor` with token refresh
- No global error handler service

### Testing
- Jasmine/Karma setup but components show minimal test coverage
- Spec files generated but not actively maintained

## Common Pitfalls

1. **Interceptor Not Registered**: `AuthInterceptor` exists but NOT in providers array - manually add to `app.module.ts` with `HTTP_INTERCEPTORS` token if needed
2. **User ID Extraction**: Don't call Supabase repeatedly - use `AuthService.getUserId()` after calling `initUser()` once
3. **Debugger Statements**: Production code contains `debugger` (see `club-details.component.ts` lines 94, 116, 120) - remove before commits
4. **Logo Upload Timing**: Must complete `uploadLogo()` and set `logo_url` BEFORE calling `createClub()` - async timing issue
5. **Slug vs ID**: Backend uses slugs for public URLs, IDs for mutations - use correct parameter

## Integration Points

### Supabase
- Project: `vukkrjlgunefvglgetib.supabase.co`
- Storage bucket: `club-logos` with private/ folder structure
- Auth config: `persistSession: true`, `autoRefreshToken: true`

### Backend API Patterns
- RESTful endpoints under `/clubs`, `/sports`, `/generate-captions`
- Pagination: `?limit=20&offset=0` query params
- Follow/unfollow: POST to `/clubs/{id}/follow` or `/clubs/{id}/unfollow`
- Token refresh: POST to `/refresh` with `{ refresh_token: string }`

## File Structure Rationale
- **components/**: Reusable UI blocks (login, club-card)
- **pages/**: Route-level containers (club-details, my-clubs)
- **guards/**: Route protection
- **interceptors/**: Global HTTP logic
- **models/**: TypeScript classes (NOT interfaces)
- **services/**: API clients grouped by domain
