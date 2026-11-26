# Current Status

> The trainer updates this file at the end of every session. You can also edit it yourself, and the trainer reads it at the start of each chat.

| Field | Value |
|---|---|
| Last updated | 26 Nov 2026 |
| Current phase | 0 — Setup ✅ complete → next: Phase 1 (Modern Angular) |
| Current week / day | Week 0 · Days 1–4 ✅ · next: **Week 1 · Day 1 (Fri 27 Nov)** |
| Personal goal | Whole roadmap done by **15 Jan 2027** (about 3 days per roadmap week). Planned roadmap dates stay unchanged |
| Pace check | Week 1 target finish: **29 Nov** (planned: 6 Dec) |
| Hours this week | 3.5 |
| Total hours so far | 4.0 |
| On track? | ✅ Ahead of the planned dates · ✅ on pace for 15 Jan (Week 0 done 26 Nov) |

## Last session (26 Nov 2026): Day 4
- ✅ **Bruno request fixed:** `Get user 1.bru` (JSONPlaceholder `/users/1`, `res.status eq 200`), commit `ab20c29`.
- ✅ **Day 3 self-check answered** (`90ade6d`) and reviewed: Q1 ✅, Q2 ✅, Q3 🟡. A port picks the *program* on a machine and isn't SQL-specific; 5432 is only the default. 5433 was ignored because it's a separate cluster, not because another port is risky. Review written under the answers in `LEARNING-LOG.md`.
- ✅ **Decision #9:** start Week 1 on 27 Nov and aim to finish by 15 Jan 2027. Planned dates stay as they are; `PROGRESS.md` now tracks planned vs target vs actual.
- ✅ **Roadmap read.** Day-0 self-ratings filled in `PROGRESS.md`: Standalone + control flow 2, C# OOP + generics 1, all others 0. The scale is now written above the table.
- ✅ **Roadmap change (Decision #8):** Angular auth is now learned in 3 parts instead of one day:
  - **W2 Sat:** mock `AuthService` (signals) + `authGuard` with `returnUrl` + `canMatch` role guard
  - **W3 Sat:** Task Board gets a mock login, auth store, `authInterceptor` (fake Bearer token), Owner/Member roles, role-based UI
  - **W4 Thu:** tests for the auth guard, role guard and auth interceptor
  - **W10 Fri:** swap the mock for the real API + silent refresh + logout
  - No dates moved. 3 new interview questions (Angular 13–15); the question bank is renumbered to 1–60.

## Earlier setup (reference)
- Toolchain: Node 24.18, Angular CLI 21.2.19, .NET SDK 10.0.401 / runtime 10.0.12, dotnet-ef 10.0.12, Git 2.55, VS Code 1.148, psql 18.7 on PATH, pgAdmin 4 v9.19, Bruno 4.4.0.
- PostgreSQL: `postgresql-x64-18` on port 5432 is the **only** server to use. `postgresql-x64-18-5433` is Stopped/Disabled and ignored.
- Database `"playgroundDb"` (camelCase, so it **must be double-quoted** in SQL) is owned by app role `dev_user` (LOGIN, CREATEDB, not superuser). Use snake_case for new databases (e.g. `gymapp_dev`).
- Agreed (25 Nov): the trainer updates `CURRENT-STATUS.md`, `LEARNING-LOG.md` and `PROGRESS.md` at the end of each session; you commit them with your code.
- **To install later:** Docker Desktop (free for personal use, runs on WSL 2 on Windows) during **Week 8**, before Testcontainers in Week 9 (around 21 Dec at the 15 Jan pace).

## Next session: Week 1 · Day 1 (Fri 27 Nov) — roadmap's "Mon" topic
1. Fill in your **confidence (1–5)** for the Day 4 entry in `LEARNING-LOG.md`.
2. Create the folder `02-Angular-Modern/week01/`, then `cd` into it and run `ng new ng21-lab` (choose **SCSS**, **no SSR**).
3. Read **every generated file**: `main.ts`, `app.config.ts`, `app.routes.ts`, `app.ts`, `angular.json`, `package.json`, `tsconfig*.json`. In the log, write one line on what each does. Look for: no `NgModule`, the `provide*` functions, no `zone.js` (zoneless by default), and the esbuild/Vite builder.
4. Commit: `git add . ; git commit -m "Week 1 Mon: ng21-lab project anatomy" ; git push`

Weekday names in the roadmap (Mon, Tue…) now mean Day 1, Day 2… of that week. You work through them continuously, and the tracker logs actual dates next to planned ones (`PROGRESS.md`).

## Blockers / questions for the trainer
- _(none)_

## Links
- GitHub account: https://github.com/MAJadhav
- Repo: https://github.com/MAJadhav/FullStackRoadmap
- Live app: _(add after Week 15)_
