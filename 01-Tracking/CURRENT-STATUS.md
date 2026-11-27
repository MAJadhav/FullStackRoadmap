# Current Status

> The trainer updates this file at the end of every session. You can also edit it yourself, and the trainer reads it at the start of each chat.

| Field | Value |
|---|---|
| Last updated | 27 Nov 2026 |
| Current phase | 1 — Modern Angular |
| Current week / day | Week 1 · Day 1 ✅ (27 Nov) · next: **Week 1 · Day 2** (control flow) |
| Personal goal | Whole roadmap done by **15 Jan 2027** (about 3 days per roadmap week). Planned roadmap dates stay unchanged |
| Pace check | Week 1 target finish: **29 Nov** (planned: 6 Dec). Day 1 of 6 done; Days 2–6 left in ~2 days, so double up on Sat/Sun or accept a small slip |
| Hours this week | ~1.0 (Week 1) |
| Total hours so far | ~5.0 |
| On track? | ✅ Ahead of the planned dates · 🟡 15 Jan pace needs ~2 roadmap days per study day this weekend |

## Last session (27 Nov 2026): Week 1 · Day 1
- ✅ `ng new ng21-lab --style=scss --ssr=false --skip-git` in `02-Angular-Modern/week01/` (no nested repo).
- ✅ Read all generated files; reviewed in `LEARNING-LOG.md`. Fixes: root component comes from `main.ts`, not `app.config.ts`; the spec runs on **Vitest** (jsdom), not Jasmine; `public/` replaced `src/assets` in v18.
- ✅ Zoneless experiment: plain field doesn't render, signal does. Learned why `update(c => c++)` fails (returns the old value, so `Object.is` sees no change).
- ⚠️ Trainer correction: since **v21, `HttpClient` is provided in root by default**. `provideHttpClient(...)` is only needed to configure it (interceptors, `withFetch`).
- ✅ 🟡 readings fixed (follow-up in the log). Self-check: Q1 ✅ after retry, Q2 ❌ (trainer gave the full answer), Q3 🟡 (Vite is only the dev server; esbuild bundles). **Revise Q2 + Q3 on Sunday.**

## Next session: Week 1 · Day 2 — roadmap's "Tue" topic
1. **Warm-up (5 min):** without looking, explain out loud why version 4A didn't update and name 3 things that make zoneless Angular render. Then check against the Day 1 log. Fill in your Day 1 confidence.
2. If not done yet, commit Day 1: `git add . ; git commit -m "Week 1 Mon: ng21-lab project anatomy" ; git push`
3. Built-in control flow: `@if / @else`, `@for` with **required** `track`, `@empty`, `@switch`, `@let`.
4. Exercise in `ng21-lab`: a "Product list" with a filter and an empty state, with no `*ngIf` / `*ngFor`.

Weekday names in the roadmap (Mon, Tue…) now mean Day 1, Day 2… of that week. You work through them continuously, and the tracker logs actual dates next to planned ones (`PROGRESS.md`).

## Blockers / questions for the trainer
- _(none)_

## Earlier setup (reference)
- Toolchain: Node 24.18, Angular CLI 21.2.19, .NET SDK 10.0.401 / runtime 10.0.12, dotnet-ef 10.0.12, Git 2.55, VS Code 1.148, psql 18.7 on PATH, pgAdmin 4 v9.19, Bruno 4.4.0.
- PostgreSQL: `postgresql-x64-18` on port 5432 is the **only** server to use. `postgresql-x64-18-5433` is Stopped/Disabled and ignored.
- Database `"playgroundDb"` (camelCase, so it **must be double-quoted** in SQL) is owned by app role `dev_user` (LOGIN, CREATEDB, not superuser). Use snake_case for new databases (e.g. `gymapp_dev`).
- Agreed (25 Nov): the trainer updates `CURRENT-STATUS.md`, `LEARNING-LOG.md` and `PROGRESS.md` at the end of each session; you commit them with your code.
- **To install later:** Docker Desktop (free for personal use, runs on WSL 2 on Windows) during **Week 8**, before Testcontainers in Week 9 (around 21 Dec at the 15 Jan pace).

## Links
- GitHub account: https://github.com/MAJadhav
- Repo: https://github.com/MAJadhav/FullStackRoadmap
- Live app: _(add after Week 15)_
