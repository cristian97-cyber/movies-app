# Repository Guidelines

## Project Structure & Module Organization

This is a React + Vite + TypeScript movie/TV application. Source code lives in `src/`.

- `src/main.tsx`: app entry point; wraps React with Material UI providers.
- `src/App.tsx`: root application component.
- `src/theme/theme.ts`: Material UI theme configuration.
- `src/assets/`: bundled images and static assets imported by React.
- `public/`: static files served directly by Vite.
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
- Hooks: `useCamelCase`, for example `usePopularMovies.ts`.
- Utilities and API clients: `camelCase`, for example `tmdbClient.ts`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.

Formatting uses Prettier, and linting uses ESLint. Keep imports tidy, avoid unused exports, and keep components focused on one responsibility.

## Testing Guidelines

No test framework is configured yet. When tests are added, prefer Vitest with React Testing Library to match the Vite stack.

Recommended conventions:

- colocate tests near implementation as `ComponentName.test.tsx` or `utilityName.test.ts`.
- test user-visible behavior, filtering, sorting, routing, and watchlist persistence.
- run the full test suite before opening a PR once a test script exists.

Until then, use `npm run build` and `npm run lint` as the minimum verification.

## Commit & Pull Request Guidelines

The repository currently has an initial commit only, so no detailed convention exists yet. Use concise imperative commit messages, for example:

- `Add Material UI theme`
- `Create TMDB client`
- `Implement watchlist persistence`

Pull requests should include a short description, testing notes, linked issues when applicable, and screenshots for UI changes. Mention any new environment variables or setup steps.

## Security & Configuration Tips

Do not commit TMDB API keys. Store local secrets in `.env.local` and expose only Vite-safe variables prefixed with `VITE_`, for example `VITE_TMDB_API_KEY`.
