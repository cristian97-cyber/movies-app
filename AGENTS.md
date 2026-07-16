# Repository Guidelines

## Project Structure & Module Organization

This is **CineScope**, a React + Vite + TypeScript movie/TV application. Source code lives in `src/`.

- `src/main.tsx`: app entry point; wraps React with the router, TanStack Query, and Material UI providers.
- `src/App.tsx`: root application component; renders the persistent app layout and defines the home and media-detail routes.
- `src/components/Header.tsx`: persistent CineScope header with the brand block on the left and a search field on the right. It should remain visible regardless of the active route.
- `src/components/PopularMediaBanner.tsx`: home-page hero banner shared by popular movies and TV series; it consumes the normalized `MediaModel` used by the UI.
- `src/components/MediaList.tsx`: paginated responsive catalog grid. It renders 1/2/3/4/5 columns across the `xs`/`sm`/`md`/`lg`/`xl` breakpoints so card actions remain readable on one line.
- `src/components/MediaCard.tsx`: normalized media presentation. Poster and metadata link to the shared media-detail route, while the separate watchlist button is currently visual-only.
- `src/pages/MediaDetailPage.tsx`: shared movie/TV detail page for the `media/:mediaType/:id` route. It owns loading and API-error states and renders detail components only when normalized data is available.
- `src/components/MediaDetailHeader.tsx`: responsive detail hero with backdrop, poster, metadata, genres, rating, a clamped overview, a visual-only watchlist action, and a functional trailer action.
- `src/components/MediaTrailer.tsx`: accessible responsive dialog that embeds the trailer URL from the detail model and removes the iframe when closed so playback stops.
- `src/components/MovieDetailContent.tsx`: shared movie/TV detail content containing storyline, media facts, cast, and recommendations.
- `src/components/CastMember.tsx` and `src/components/RecommendedMedia.tsx`: focused presentation components used by the detail content. Recommended-media cards intentionally show only the poster and link to the shared detail route.
- `src/models/`: backend-independent UI/domain models consumed by pages and components, including normalized `MediaModel`, `PaginatedMediaModel`, and `MediaDetailModel`. The detail model includes cast, recommendations, and the selected trailer URL.
- `src/features/tmdb/`: TMDB integration, split into the API client, TanStack Query hooks, response models, and shared media types.
- `src/features/tmdb/mappers/tmdb-media.mapper.ts`: normalization boundary from TMDB movie/TV DTOs and snake_case pagination fields to the shared camelCase UI models.
- `src/features/tmdb/mappers/tmdb-media-detail.mapper.ts`: normalizes movie/TV details, credits, recommendations, and videos. Trailer selection prefers official trailers, then unofficial trailers, official teasers, and unofficial teasers; the newest video in the selected group wins.
- `src/features/tmdb/hooks/usePopularMedia.ts`: typed popular-content query. It accepts `"movie" | "tv"`, includes that value in the query key, and makes only the matching TMDB request.
- `src/features/tmdb/hooks/useMediaDetail.ts`: shared typed detail query for movies and TV series; its public inputs are media type and numeric media ID.
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

Keep movie and TV response models distinct inside the TMDB layer because the backend uses fields such as `title`/`release_date` for movies and `name`/`first_air_date` for TV series. Normalize those DTOs through the TMDB mappers and expose the backend-independent `MediaModel`, `PaginatedMediaModel`, and `MediaDetailModel` from `src/models/` to pages and components. UI components should not import TMDB movie/TV response models, read snake_case backend fields, or duplicate movie/TV mapping logic.

The detail request uses TMDB `append_to_response` to keep detail data in one HTTP request. Movies append `release_dates`, `credits`, `recommendations`, and `videos`; TV series append `content_ratings`, `aggregate_credits`, `recommendations`, and `videos`. Preserve the movie/TV differences when extending these DTOs or mappings.

Use TanStack Query for server state. Query keys must include every input that changes the response, such as media type and page. Hooks must be called unconditionally; choose dynamic endpoints inside the query function rather than conditionally invoking separate hooks. Keep cached query-function results faithful to TMDB and use `select` with the shared mapper to expose normalized UI models.

Do not nest buttons or other interactive controls inside links. For media cards, keep the detail `CardActionArea` and watchlist action as sibling controls. Preserve `APP_URL` route constants and accessible labels when adding card navigation. Keep the watchlist button label on one line until a shorter responsive label is intentionally designed.

## Branding & Assets

The app name is **CineScope**. Keep user-facing titles, navigation labels, document metadata, and brand assets consistent with that name.

The application UI language is Italian. Keep visible copy, fallback messages, accessible labels, image alternative text, number formatting, and document language in Italian. The product term **watchlist** must never be translated; use labels such as `Aggiungi alla watchlist`. TMDB requests default to `it-IT` when `VITE_TMDB_LANGUAGE` is not configured, and `formatLanguage`/`formatMediaStatus` in `src/utils/utils.ts` localize common detail values.

The Material UI theme currently uses a dark cinema-style palette:

- primary yellow: `#fbc500`
- secondary teal: `#00b8a9`
- background default: `#101010`
- background paper: `#181818`

Use `src/assets/brand/` for brand images imported by React. Use `public/` for root-served browser assets such as favicon files referenced from `index.html`.

The header currently uses `/favicon.png` as the compact brand icon, paired with text labels for the app name and subtitle. Keep the search input placeholder as `Cerca un titolo` until search behavior is implemented. The brand block links to the home route.

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

Do not commit TMDB credentials. Store local configuration in `.env.local` and expose only Vite-safe variables prefixed with `VITE_`. The TMDB client currently expects `VITE_TMDB_API_BASE_URL`, `VITE_TMDB_ACCESS_TOKEN`, and optionally `VITE_TMDB_LANGUAGE` (default: `it-IT`); image components use `VITE_TMDB_IMAGE_BASE_URL`.
