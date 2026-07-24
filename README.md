[Live application](https://movies-app-7yb.pages.dev/)

# CineScope

CineScope is a responsive movie and TV discovery application built with React and powered by [The Movie Database (TMDB)](https://www.themoviedb.org/). It provides an Italian-language interface for browsing the TMDB catalogue, finding titles, exploring detailed media information, and keeping a personal watchlist in the browser.

## Features

- Discover movies and TV series in a responsive, paginated catalogue.
- Filter titles by media type and genre.
- Sort results by popularity, rating, or release date.
- Keep catalogue filters and the current page in the URL, making views easy to revisit or share.
- Search movies and TV series through a full-screen, paginated search experience.
- Open dedicated detail pages with artwork, synopsis, genres, rating, cast, production information, and recommendations.
- Watch the best available official or unofficial TMDB trailer or teaser through an embedded YouTube player.
- View streaming availability for the browser's region, with provider data supplied by JustWatch through TMDB.
- Add or remove titles from a global watchlist and manage them from a responsive drawer.
- Persist the watchlist in `localStorage`, including validation, deduplication, and safe recovery from invalid stored data.
- Handle loading, empty, and API error states throughout the interface.
- Use an accessible, mobile-first interface with Italian labels and responsive layouts.

## Technology Stack

- **React 19** and **TypeScript** for the component-based user interface and type-safe domain models.
- **Vite 8** for local development, hot module replacement, and production builds.
- **Material UI 9**, **Emotion**, and Material Icons for the responsive design system and dark cinema-inspired theme.
- **TanStack Query 5** for TMDB server-state fetching, caching, and request lifecycle management.
- **React Router 7** for catalogue state in search parameters and shared movie/TV detail routes.
- **TMDB API** for catalogue, genre, search, detail, credit, recommendation, video, and watch-provider data.
- **ESLint** and **Prettier** for code quality and consistent formatting.
- **Cloudflare Pages** for the live deployment.

## Architecture

The application follows a feature-oriented structure. UI code depends on shared, backend-independent media models, while TMDB-specific response shapes and `snake_case` fields remain isolated inside the API integration layer.

```text
src/
├── apis/tmdb/          # TMDB client, DTOs, query hooks, types, and mappers
├── core/               # Stable route constants and Material UI theme
├── features/
│   ├── media/          # Catalogue, search, media details, and domain models
│   └── watchlist/      # Context, reducer, persistence, drawer, and item UI
├── layout/             # Persistent application layout and header
├── shared/             # Cross-feature components and utilities
├── assets/             # Bundled brand assets
├── App.tsx             # Root layout and route definitions
└── main.tsx            # Application providers and React entry point
```

### Data flow

1. Components call TMDB query hooks from `src/apis/tmdb/hooks/`.
2. TanStack Query fetches and caches the API responses using keys that include all request inputs.
3. TMDB mappers translate movie- and TV-specific DTOs into shared camelCase domain models.
4. Feature components render the normalized models without depending on backend response details.

Movie and TV payloads remain separate at the integration boundary because TMDB uses different fields and appended resources for each media type. Detail requests use `append_to_response` to retrieve the main record, credits, recommendations, videos, regional content information, and watch providers in a single request.

The watchlist is client-side global state implemented with React Context and `useReducer`. Only a minimal normalized representation of each title is stored, and entries are uniquely identified by the combination of media type and TMDB ID.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page with the featured title, catalogue, filters, sorting, and pagination |
| `/media/:mediaType/:id` | Shared detail page for a movie or TV series |

The home route uses the `mediaType`, `genre`, `sortBy`, and `page` search parameters to preserve catalogue state.

## Getting Started

### Prerequisites

- A current Node.js installation with npm
- A [TMDB API access token](https://developer.themoviedb.org/docs/getting-started)

### Installation

```bash
git clone <repository-url>
cd movies-app
npm install
```

Create a `.env.local` file in the project root:

```dotenv
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_TMDB_LANGUAGE=it-IT
```

`VITE_TMDB_LANGUAGE` is optional and defaults to `it-IT`. Do not commit API credentials.

Start the development server:

```bash
npm run dev
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run TypeScript project checks and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Serve the production build locally |

## Design and Localization

CineScope uses a dark cinema-style palette with yellow and teal accents. The layout adapts from mobile devices to large screens, including a responsive catalogue grid, full-screen mobile watchlist, and media-detail hero sections.

The application interface and accessibility copy are written in Italian. TMDB requests also default to Italian, while the internal source code, architecture, and documentation use English naming conventions.

## Data Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. Streaming availability data is supplied by JustWatch through TMDB and is attributed in the application wherever provider information is displayed.
