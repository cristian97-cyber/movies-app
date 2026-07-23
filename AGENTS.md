# Repository Guidelines

## Project Structure & Module Organization

This is **CineScope**, a React + Vite + TypeScript movie/TV application. Source code lives in `src/`.

- `src/main.tsx`: app entry point; wraps React with TanStack Query, Material UI, `WatchListProvider`, and the router.
- `src/App.tsx`: root application component; renders the persistent layout and defines the home and shared media-detail routes.
- `src/apis/tmdb/`: complete TMDB integration, split into the API client, TanStack Query hooks, DTOs, mappers, and TMDB-specific types. Keep backend DTOs and snake_case fields inside this boundary.
- `src/apis/tmdb/mappers/tmdb-media.mapper.ts`: normalization boundary from TMDB movie/TV DTOs and snake_case pagination fields to the shared camelCase media models.
- `src/apis/tmdb/mappers/tmdb-media-detail.mapper.ts`: normalizes movie/TV details, credits, recommendations, videos, and watch providers. Trailer selection prefers official trailers, then unofficial trailers, official teasers, and unofficial teasers; the newest video in the selected group wins. Watch providers are selected for the browser locale's region with `IT` as fallback, merged across monetization categories, deduplicated by provider ID, and sorted by display priority.
- `src/features/media/`: media catalog and detail feature, containing its components, pages, and backend-independent UI/domain models such as `MediaModel`, `PaginatedMediaModel`, and `MediaDetailModel`.
- `src/features/media/components/MediaList.tsx`: paginated responsive catalog grid. It renders 1/2/3/4/5 columns across the `xs`/`sm`/`md`/`lg`/`xl` breakpoints so card actions remain readable on one line.
- `src/features/media/components/MediaCard.tsx`: normalized media presentation. Poster and metadata link to the shared media-detail route; the watchlist action is a separate sibling control.
- `src/features/media/pages/MediaDetailPage.tsx`: shared movie/TV detail page for the `media/:mediaType/:id` route. It owns loading and API-error states and renders detail components only when normalized data is available.
- `src/features/media/components/MediaDetailHeader.tsx`: responsive detail hero with backdrop, poster, metadata, genres, rating, overview, shared watchlist action, functional trailer action, and a compact provider-logo section. Render the provider section only when availability data exists and retain the required JustWatch attribution.
- `src/features/media/models/watch-provider.model.ts`: backend-independent provider presentation model containing the provider ID, name, logo path, and display priority. The normalized detail model exposes providers through `MediaDetailModel.watchProviders`.
- `src/features/watchlist/`: global watchlist feature. It contains the Drawer UI, item presentation, Context, Provider, hook, reducer, mapper, minimal persisted model, and localStorage adapter.
- `src/features/watchlist/models/watch-list-item.model.ts`: minimal persisted watchlist shape. Store only `id`, `mediaType`, title, poster path, release year, and rating; identify entries by the combined `mediaType + id` key.
- `src/features/watchlist/providers/WatchListProvider.tsx`: owns the reducer, restores the initial state from localStorage, persists changes, and exposes add/remove/toggle/contains/clear operations through Context.
- `src/features/watchlist/storage/watch-list.storage.ts`: validates, deduplicates, loads, saves, and clears the versioned `cinescope:watchlist:v1` localStorage payload. Storage errors must not break the in-memory application state.
- `src/features/watchlist/components/WatchList.tsx`: responsive right-side Drawer. It is full-screen on `xs`, 480 px from `sm`, keeps pagination local, and supports removing individual titles or clearing the list.
- `src/features/watchlist/components/WatchListItem.tsx`: focused watchlist-row presentation. Its media content links to the shared detail route and closes the Drawer on navigation; the separate remove button must remain outside the link.
- `src/shared/components/WatchListButton.tsx`: single reusable add/remove action for cards, banners, and detail views. Use this component instead of duplicating watchlist buttons or calling the Context directly from media presentation components.
- `src/layout/Header.tsx`: persistent CineScope header with brand, search, and the control that opens the watchlist Drawer. It remains visible regardless of the active route.
- `src/core/const/app-url.const.ts`: shared application route constants; use these instead of duplicating route strings.
- `src/core/themes/theme.ts`: Material UI theme configuration.
- `src/shared/`: application-wide reusable UI and utilities that do not belong to one feature.
- `src/assets/`: bundled images and static assets imported by React.
- `src/assets/brand/logo.png`: CineScope logo used by the application. It has a transparent background and is intended to be imported from React components.
- `public/`: static files served directly by Vite.
- `public/favicon.png`: browser favicon derived from the CineScope logo. `index.html` points to this file directly as `/favicon.png`.
- `dist/`: production build output; do not edit manually or commit.

Continue using feature-oriented folders under `src/features/`, external integrations under `src/apis/`, app-wide layout under `src/layout/`, stable configuration under `src/core/`, and cross-feature reusable code under `src/shared/`.

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

Keep movie and TV response models distinct inside the TMDB layer because the backend uses fields such as `title`/`release_date` for movies and `name`/`first_air_date` for TV series. Normalize those DTOs through the TMDB mappers and expose the backend-independent `MediaModel`, `PaginatedMediaModel`, and `MediaDetailModel` from `src/features/media/models/` to pages and components. UI components should not import TMDB movie/TV response models, read snake_case backend fields, or duplicate movie/TV mapping logic.

The detail request uses TMDB `append_to_response` to keep detail data in one HTTP request. Movies append `release_dates`, `credits`, `recommendations`, `videos`, and `watch/providers`; TV series append `content_ratings`, `aggregate_credits`, `recommendations`, `videos`, and `watch/providers`. The appended provider payload is exposed under the quoted `"watch/providers"` property. Preserve the movie/TV differences when extending these DTOs or mappings.

TMDB watch-provider availability is country-specific and sourced from JustWatch. Keep the snake_case response and monetization groups (`flatrate`, `free`, `ads`, `rent`, and `buy`) inside the TMDB boundary. UI models receive one deduplicated provider list and presentation components show provider logos with accessible names. Do not remove the visible JustWatch attribution from provider availability UI.

Use TanStack Query for server state. Query keys must include every input that changes the response, such as media type and page. Hooks must be called unconditionally; choose dynamic endpoints inside the query function rather than conditionally invoking separate hooks. Keep cached query-function results faithful to TMDB and use `select` with the shared mapper to expose normalized UI models.

Do not nest buttons or other interactive controls inside links. For media cards, keep the detail `CardActionArea` and watchlist action as sibling controls. Preserve `APP_URL` route constants and accessible labels when adding card navigation. Keep the watchlist button label on one line until a shorter responsive label is intentionally designed.

Treat the watchlist as global client state and access it through `useWatchList`. Keep Drawer open/closed state and pagination local to their owning UI components. Persist only the normalized `WatchListItemModel`, never full media-detail objects, and preserve the `mediaType + id` identity rule in reducers, storage, keys, and lookups.

For Material UI `Typography`, use `color="textSecondary"` or `sx={{ color: "text.secondary" }}`. Do not use `color="text.secondary"`, because the `color` prop does not resolve dotted theme paths in the installed Material UI version.

## Branding & Assets

The app name is **CineScope**. Keep user-facing titles, navigation labels, document metadata, and brand assets consistent with that name.

The application UI language is Italian. Keep visible copy, fallback messages, accessible labels, image alternative text, number formatting, and document language in Italian. The product term **watchlist** must never be translated; use labels such as `Aggiungi alla watchlist`. TMDB requests default to `it-IT` when `VITE_TMDB_LANGUAGE` is not configured, and `formatLanguage`/`formatMediaStatus` in `src/shared/utils/utils.ts` localize common detail values.

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
