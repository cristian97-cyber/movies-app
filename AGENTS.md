# Repository Guidelines

## Project Structure & Module Organization

This is **CineScope**, a React + Vite + TypeScript movie/TV application. Source code lives in `src/`.

- `src/main.tsx`: app entry point; wraps React with the router, TanStack Query, and Material UI providers.
- `src/App.tsx`: root application component; renders the persistent app layout and defines the home and media-detail routes.
- `src/components/Header.tsx`: persistent CineScope header with the brand block on the left and a search field on the right. It should remain visible regardless of the active route.
- `src/components/PopularMediaBanner.tsx`: home-page hero banner shared by popular movies and TV series; it consumes the normalized `MediaModel` used by the UI.
- `src/models/`: backend-independent UI/domain models consumed by pages and components, including normalized `MediaModel` and `PaginatedMediaModel`.
- `src/features/tmdb/`: TMDB integration, split into the API client, TanStack Query hooks, response models, and shared media types.
- `src/features/tmdb/mappers/tmdb-media.mapper.ts`: normalization boundary from TMDB movie/TV DTOs and snake_case pagination fields to the shared camelCase UI models.
- `src/features/tmdb/hooks/usePopularMedia.ts`: typed popular-content query. It accepts `"movie" | "tv"`, includes that value in the query key, and makes only the matching TMDB request.
- `src/pages/HomePage.tsx`: selects a stable random media type and popular result for the hero banner.
- `src/const/app-url.const.ts`: shared application route constants; use these instead of duplicating route strings.
- `src/theme/theme.ts`: Material UI theme configuration.
- `src/assets/`: bundled images and static assets imported by React.
- `src/assets/brand/logo.png`: CineScope logo used by the application. It has a transparent background and is intended to be imported from React components.
- `public/`: static files served directly by Vite.
- `public/favicon.png`: browser favicon derived from the CineScope logo. `index.html` points to this file directly as `/favicon.png`.
- `dist/`: production build output; do not edit manually or commit.

As the app grows, prefer feature-oriented folders such as `src/features/catalog/`, `src/features/watchlist/`, and shared UI in `src/components/`.

## Build, Test, and Development Commands

- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript project checks and create a production build.
- `npm run lint`: run ESLint across the repository.
- `npm run preview`: serve the production build locally for verification.

Install dependencies with `npm install`. Keep `package-lock.json` committed when dependencies change.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Prefer explicit domain types for TMDB responses instead of `any`.

- Components: `PascalCase`, for example `MovieCard.tsx`.
- Hooks: `useCamelCase`, for example `usePopularMedia.ts`.
- Utilities and API clients: `camelCase`, for example `tmdbClient.ts`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.

Formatting uses Prettier, and linting uses ESLint. Keep imports tidy, avoid unused exports, and keep components focused on one responsibility.

Keep movie and TV response models distinct inside the TMDB layer because the backend uses fields such as `title`/`release_date` for movies and `name`/`first_air_date` for TV series. Normalize those DTOs through the TMDB mapper and expose the backend-independent `MediaModel` and `PaginatedMediaModel` from `src/models/` to pages and components. UI components should not import TMDB movie/TV response models, read snake_case backend fields, or duplicate movie/TV mapping logic.

Use TanStack Query for server state. Query keys must include every input that changes the response, such as media type and page. Hooks must be called unconditionally; choose dynamic endpoints inside the query function rather than conditionally invoking separate hooks. Keep cached query-function results faithful to TMDB and use `select` with the shared mapper to expose normalized UI models.

## Branding & Assets

The app name is **CineScope**. Keep user-facing titles, navigation labels, document metadata, and brand assets consistent with that name.

The Material UI theme currently uses a dark cinema-style palette:

- primary yellow: `#fbc500`
- secondary teal: `#00b8a9`
- background default: `#101010`
- background paper: `#181818`

Use `src/assets/brand/` for brand images imported by React. Use `public/` for root-served browser assets such as favicon files referenced from `index.html`.

The header currently uses `/favicon.png` as the compact brand icon, paired with text labels for the app name and subtitle. Keep the search input placeholder as `Search title` until search behavior is implemented.

## Testing Guidelines

No test framework is configured yet. When tests are added, prefer Vitest with React Testing Library to match the Vite stack.

Recommended conventions:

- colocate tests near implementation as `ComponentName.test.tsx` or `utilityName.test.ts`.
- test user-visible behavior, filtering, sorting, routing, and watchlist persistence.
- run the full test suite before opening a PR once a test script exists.

Until then, use `npm run build` and `npm run lint` as the minimum verification.

## Commit & Pull Request Guidelines

Use concise imperative commit messages, for example:

- `Add Material UI theme`
- `Create TMDB client`
- `Implement watchlist persistence`

Pull requests should include a short description, testing notes, linked issues when applicable, and screenshots for UI changes. Mention any new environment variables or setup steps.

## Security & Configuration Tips

Do not commit TMDB credentials. Store local configuration in `.env.local` and expose only Vite-safe variables prefixed with `VITE_`. The TMDB client currently expects `VITE_TMDB_API_BASE_URL`, `VITE_TMDB_ACCESS_TOKEN`, and optionally `VITE_TMDB_LANGUAGE`; image components use `VITE_TMDB_IMAGE_BASE_URL`.
