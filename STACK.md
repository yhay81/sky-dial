# Stack

## Runtime and UI

- Cloudflare Workers
- Hono and Hono JSX
- Static client JavaScript for local search and localStorage
- Vite+ with TypeScript, Oxlint, Oxfmt, and Vitest

## Data

- Fixed feed registry in source control
- Bluesky public `app.bsky.feed.getFeedGenerators` through the Worker
- Cloudflare Cache API for a ten-minute shared metadata cache
- D1 for anonymous daily event aggregates
- Workers Rate Limiting for telemetry writes
- Daily cron for 35-day retention

## Deliberate omissions

- Better Auth: no account-owned or protected state
- Drizzle: one append-only table does not justify an ORM
- R2: no uploads or blobs
- Queues: no user-triggered asynchronous work
- External analytics: unnecessary for the defined funnel

## Release gate

1. Release contract, lint/type checks, tests, build, and dependency audit pass.
2. Local and remote D1 migrations pass; metrics output real zeroes before launch.
3. Desktop and mobile complete category selection, search, save, remove, and Bluesky open.
4. Console, CSP, canonical, Open Graph, sitemap, robots, 404 `noindex`, health, and IndexNow are verified.
5. Public repository has CI, private vulnerability reporting, and a pilot issue.
