# todo-agents

Small to-do app: React 19 + TypeScript + Vite. All app code is in `src/App.tsx` (state is local `useState`, no persistence).

## Commands

- `npm run dev` — dev server
- `npm test` — Vitest (jsdom), single run
- `npm run lint` — ESLint
- `npm run build` — `tsc -b && vite build`, output in `dist/`

Run test, lint and build before committing.

## Testing notes

- Config lives in `vite.config.ts` (`globals: true` is required so Testing Library auto-cleans the DOM between tests).
- Setup file: `src/setupTests.ts` (jest-dom matchers).
- Snapshots are in `src/__snapshots__/`. Review diffs before running `vitest run -u`.

## Repo and deploy

- GitHub: https://github.com/socialcommerce75/todo-agents (branch `main`).
- Planned Cloudflare environments: `todo-agents-staging`, `todo-agents-sandbox`, `todo-agents-production`, deploying `dist/`.
- Do not create `wrangler.jsonc` or let wrangler auto-install into this project; deploy with CLI flags (e.g. `npx wrangler deploy --assets ./dist --name <env>`).
- Known issue: `npm install` of new packages can hit a peer conflict between `typescript ~6.0` and `typescript-eslint` (peer `typescript <5.9`).

# Project rules for agents
This is a frontend-only app: React, TypeScript and Vite at the repo root. Source code is in src/.

## Verification
- Test: npm test
- Build: npm run build
- Lint: npm run lint
Run all three and paste the output before reporting done.

## Snapshot tests
- If your change intentionally alters the UI, update the snapshots with npm test -- -u and say so in the PR description.
- Never update a snapshot to hide a change the ticket did not ask for. Fix the code instead.

## Rules
- Never edit .github/, .claude/, agents.yaml, risk-tiers.yaml, REVIEW.md, CLAUDE.md, or existing test files. New test files and snapshot files are fine.
- Stay inside the scope of the ticket. Keep the change small.
- Do not add dependencies unless the ticket needs one, and say why in the PR description.

## Job types
- feature: implement it and add tests.
- bug: first write a failing test that reproduces it, then fix it.
- investigation: change no source files. Write your findings to FINDINGS.md: what you checked, what you found, and a recommendation.