# Current Status

> The trainer updates this file at the end of every session. You can also edit it yourself, and the trainer reads it at the start of each chat.

| Field | Value |
|---|---|
| Last updated | 28 Nov 2026 |
| Current phase | 1 — Modern Angular |
| Current week / day | Week 1 · Day 2 ✅ (28 Nov) · next: **fix-up for Day 2 review items 5–8**, then **Week 1 · Day 3** (signals) |
| Personal goal | Whole roadmap done by **15 Jan 2027** (about 3 days per roadmap week). Planned roadmap dates stay unchanged |
| Pace check | Week 1 target finish: **29 Nov** (planned: 6 Dec). Days 1–2 of 6 done; Days 3–6 left. Realistic: finish Week 1 on **30 Nov–1 Dec** (a 1–2 day slip), unless Sunday covers 3+ days |
| Hours this week | ~3.5 (Week 1) |
| Total hours so far | ~7.5 |
| On track? | ✅ Ahead of the planned dates · 🟡 1–2 days behind the 15 Jan pace |

## Last session (28 Nov 2026): Week 1 · Day 2
- ✅ Product list in `ng21-lab` (`661f579`): signals + `computed()` filter, hand-made two-way binding (`[value]` + `(input)`), `@if/@else`, `@for` + `track product.id`, `@switch`, `@empty`. `$odd` zebra choice was correct.
- ✅ `track` experiment done: `track id` moves DOM rows, `track $index` keeps rows in place and re-binds data, so DOM-only state (the note) sticks to the position.
- ✅ Warm-up: zoneless notifiers answered correctly (Day 1 Q2 gap closed).
- Trainer ran the compile errors + migration bonus on your code and logged the real output: `NG5002` (missing track), `NG8016` (`@let` before declaration), `NG8015` (assign to `@let`), and `ng generate @angular/core:control-flow` before/after.
- Self-check: Q1 ✅, Q2 🟡 (old default was object identity, not "rebuild every change"), Q3 🟡 (command ✅; see the correction below), Q4 🟡 (`computed` vs `@let` table in the log). **Revise Q2 + Q4 on Sunday** (with Day 1 Q2 + Q3).
- ⚠️ **Trainer correction:** the Day 2 lesson said `*ngIf`/`*ngFor` would "likely be removed in v22". Checked on npm: **Angular 22.3.0 (current latest) still ships them**, deprecated, "intent to remove in a future major release". Leftover `*ngIf` won't break the Week 14 upgrade; it's still debt to migrate.

## Next session
1. **Day 2 fix-up (~10 min), one commit `"Week 1 Day 2: review fixes"`:**
   - Add `@let shown = filtered().length;` and `@let total = products().length;` and use them in the header (criterion 4 was missing).
   - Clear button resets **both** signals (`clearFilters()` → search `''` + category `'all'`).
   - Use `i` (`{{ i + 1 }}`) or delete the unused `let i = $index, last = $last`.
   - `app.ts`: remove the unused `RouterOutlet`, `inject` and `OnInit` imports → the `NG8113` warning disappears. (The outlet comes back on Day 6.)
   - Fill in the Day 2 confidence + the fix-up commit id in the log.
2. **Week 1 · Day 3 (roadmap "Wed"):** signals: `signal()`, `computed()`, `effect()`, and when **not** to use `effect`. Exercise: counter + cart total as signals, then refactor a `BehaviorSubject` service into signals. The product list's `filtered` is already a `computed()`, so the cart can reuse `PRODUCTS`.

Weekday names in the roadmap (Mon, Tue…) now mean Day 1, Day 2… of that week. You work through them continuously, and the tracker logs actual dates next to planned ones (`PROGRESS.md`).

## Blockers / questions for the trainer
- _(none)_

## Version note (28 Nov 2026)
- npm `latest` for Angular is **22.3.0** (22.0.0 released 3 Jun 2026); `ng21-lab` runs **21.2.26**. The roadmap deliberately builds on 21 and upgrades in Week 14. ⚠️ items that mention v22 get re-checked against the current docs on the day they come up.

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
