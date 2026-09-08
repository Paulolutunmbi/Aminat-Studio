# Aminat Studio

Aminat Studio is a React-based portfolio and gallery for an emerging, self-taught artist inspired by nature. The public site presents the studio's artwork, featured pieces, artist information, reference photography, and contact details. A protected admin area provides the current content-management workflow for artworks and studio settings.

## Overview

The frontend solves two related problems:

- It gives visitors a responsive way to browse and search the artwork collection, inspect artwork details, and contact the studio.
- It gives the studio administrator a browser-based interface for managing artwork records, featured works, ordering, and public studio settings.

The application is a client-side rendered single-page application. Artwork and studio settings are read from the backend API; static photography and fallback/default values remain in the frontend repository.

## Features

### Public site

- Home page with hero artwork, featured works, artist preview, and nature-inspired reference photography.
- Gallery page with category filtering and text search across artwork title, medium, and description.
- Artwork detail modal with related artwork navigation.
- About page and contact page.
- Studio contact information and social links loaded from the API settings record when available.
- Contact inquiries prepared as a `mailto:` link to the studio email address.
- Responsive layouts for desktop and mobile viewports.

### Admin area

- Admin login, logout, session-status checks, password change, and password reset pages.
- Protected dashboard routes under `/admin`.
- Artwork creation, editing, deletion, search, category filtering, drag-and-drop ordering, and featured-state management.
- A maximum of three featured artworks is enforced by the backend and reflected in the admin UI.
- Artwork images can be selected from existing frontend assets, entered as a URL, or read from a local image file as a data URL before being sent to the API.
- Studio settings editing for the studio name, artist name, description, contact email, YouTube URL, TikTok URL, and profile image.

## Tech Stack

- React 19 and React DOM
- TypeScript 5.8
- Vite 6
- React Router 7
- Tailwind CSS 4 with `@tailwindcss/vite`
- `lucide-react` for icons
- `motion` is installed for UI motion support
- Node.js and npm for local tooling

## How It Works

1. The app starts in `src/main.tsx` and renders `App.tsx`.
2. React Router separates public routes from admin authentication and protected admin routes.
3. `AuthContext` checks `/api/admin/status` on load. Admin mutations send requests with `credentials: 'include'` so the backend can use its session cookie.
4. `dataService` delegates backend-backed artwork and settings operations to `src/services/api.ts`.
5. Public artwork pages request `/api/artworks`; featured works are filtered and ordered in the client from the returned collection.
6. The contact form does not store messages in the backend. It opens the visitor's email client with a prefilled `mailto:` link.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public home page |
| `/gallery` | Searchable and filterable artwork gallery |
| `/about` | Artist/about page |
| `/contact` | Contact and inquiry page |
| `/admin/login` | Admin login |
| `/admin` | Protected admin dashboard |
| `/admin/artworks` | Manage artwork records |
| `/admin/featured` | Manage featured works |
| `/admin/subscribers` | Current subscriber-management UI; data is not backend-backed |
| `/admin/messages` | Current messages UI; data is not backend-backed |
| `/admin/settings` | Manage public studio settings |
| `/admin/change-password` | Change the authenticated admin password |
| `/admin/forgot-password` | Request a password reset email |
| `/admin/reset-password` | Set a new password from a reset token |
| `/reset-password` | Alternate route to the reset-password page |

Unknown routes redirect to `/`.

## Project Structure

```text
Aminat-Studio-Frontend/
├── public/                  Static assets and web manifest
│   └── images/              Artwork, photography, and profile images
├── src/
│   ├── components/          Public and admin UI components
│   ├── context/             Authentication context and session state
│   ├── data/                Static fallback/reference data
│   ├── pages/               Public and admin route-level screens
│   ├── services/
│   │   ├── api.ts           API base URL, fetch wrapper, and API methods
│   │   └── dataService.ts    Application data facade
│   ├── App.tsx              Router and route composition
│   ├── index.css            Global styles
│   └── types.ts             Shared TypeScript domain types
├── index.html               HTML shell and metadata
├── vite.config.ts           Vite, React, Tailwind, alias, and HMR settings
├── vercel.json              SPA fallback rewrite for Vercel
└── package.json             Scripts and dependencies
```

## Getting Started

### Prerequisites

- Node.js with npm
- A running Aminat Studio backend for artwork, settings, and admin functionality
- MongoDB and the backend services configured if you are running the backend locally

### Installation

```bash
npm install
```

### Environment Variables

The frontend reads one optional Vite variable:

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | No | Backend origin or API URL. A trailing `/api` is accepted; the client adds it when needed. |

Example local configuration:

```env
VITE_API_URL=http://localhost:5000
```

When `VITE_API_URL` is not set, the client uses `/api` during development and `https://aminat-studio-backend.onrender.com/api` in production builds. Do not put secrets in frontend environment variables; Vite variables are exposed to browser code.

### Running Locally

Start the backend separately, then run the frontend:

```bash
npm run dev
```

Vite serves the app at `http://localhost:3000` and listens on all interfaces. With the default local API behavior, the browser requests `/api` from the frontend origin; configure `VITE_API_URL=http://localhost:5000` when the backend is running directly on port 5000 and no reverse proxy is present.

### Production Build

```bash
npm run build
npm run preview
```

`npm run build` creates the Vite production output. `npm run preview` serves that output locally for verification.

Other available scripts:

```bash
npm run lint   # TypeScript check with tsc --noEmit
npm run clean  # Removes dist and server.js using the package script
```

## Backend/API Integration

The API wrapper is in `src/services/api.ts`. It unwraps successful `{ data: ... }` responses, turns non-2xx responses into JavaScript errors using the backend message, and reports a clearer message when the backend cannot be reached.

The frontend uses these backend operations:

- `GET /api/artworks` and `GET /api/artworks/:id` for public artwork data.
- `POST /api/artworks`, `PUT /api/artworks/:id`, `PATCH /api/artworks/:id/toggle-featured`, and `DELETE /api/artworks/:id` for protected artwork management.
- `GET /api/settings` and protected `PUT /api/settings` for studio settings.
- `/api/admin/status`, `/api/admin/login`, `/api/admin/logout`, `/api/admin/change-password`, `/api/admin/forgot-password`, and `/api/admin/reset-password` for admin authentication.

Admin requests include browser credentials so the backend's `httpOnly` session cookie is sent. Cross-origin deployments therefore require the backend CORS configuration and frontend URL to agree.

## Authentication Flow

- The login form posts credentials to `/api/admin/login`.
- The backend sets an `httpOnly` JWT session cookie; the frontend does not store the token in local storage.
- `AuthContext` calls `/api/admin/status` to establish the current session and `ProtectedRoute` redirects unauthenticated users to `/admin/login`.
- Logout asks the backend to clear the cookie and then clears local React state.
- Password-reset links open `/admin/reset-password?token=...`; the reset token is sent to the backend with the new password.

## Image Handling

The admin image picker reads selected image files with `FileReader` and sends the resulting data URL in JSON. It also accepts an image URL or a path to an existing `/images/...` asset. The backend decides whether to retain a local path, upload image data/URLs to Cloudinary, or retain a supplied remote URL.

There is no frontend multipart upload endpoint or direct Cloudinary SDK integration. The backend owns Cloudinary credentials and upload/deletion behavior.

## Deployment

`vercel.json` rewrites all paths to `index.html`, which supports React Router deep links when deployed to Vercel. The production API fallback currently points to the Render service `https://aminat-studio-backend.onrender.com/api`; set `VITE_API_URL` during the build to use a different backend.

The repository does not contain a frontend CI/CD workflow or hosting-specific build configuration beyond the Vercel rewrite. Ensure the deployed backend allows the deployed frontend origin through `FRONTEND_URL`.

## Known Limitations and Implementation Notes

- Newsletter signup is intentionally disabled. `getSubscribers` returns an empty list, `addSubscriber` reports that delivery is disabled, and the newsletter section is not rendered on the home page.
- Messages and subscribers are not currently persisted through the backend. The admin pages exist, but their data-service methods return empty or placeholder values and their mutations do not create backend records.
- The contact form opens the visitor's local email application instead of sending through the API.
- Public photography is loaded from static `public/images/photography` assets, not from the backend.
- The frontend contains fallback/default settings and reference data, but artwork reads are API-backed and do not fall back to the static artwork collection when the API is unavailable.
- The backend must be configured for credentialed CORS requests in production. Browser cookie rules also require secure HTTPS deployment for the production cross-site session.

## Contributing

Keep changes focused, run `npm run lint` and `npm run build`, and update this README when routes, API calls, environment variables, or deployment behavior change.

## License

The package does not declare a project license. Confirm the intended license with the project owner before distributing the source.
