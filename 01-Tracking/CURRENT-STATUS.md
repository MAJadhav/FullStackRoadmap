# Current Status

> The trainer updates this file at the end of every session. You can also edit it yourself, and the trainer reads it at the start of each chat.

| Field | Value |
|---|---|
| Last updated | 26 Nov 2026 |
| Current phase | 0 — Setup |
| Current week / day | Week 0 · Day 1 ✅ · Day 2 ✅ · Day 3 ✅ · next: Day 4 |
| Hours this week | 2.75 |
| Total hours so far | 3.25 |
| On track? | ✅ Yes, ahead (Days 1–3 all done on 26 Nov; Week 0 ends 29 Nov) |

## Last session (26 Nov 2026): Day 3
- ✅ **pgAdmin 4 v9.19** connected to the local server (`Local PG18`, localhost:5432, user `postgres`).
- ✅ **Database `playgroundDb`** created, owned by `dev_user`. You kept the camelCase name, so it must be **double-quoted** in SQL: `"playgroundDb"`. (Lowercase snake_case is the convention for new databases, e.g. `gymapp_dev`.)
- ✅ **App role `dev_user`** (LOGIN, CREATEDB, not superuser). Use it for all app connections from Week 6/8. The password is kept out of Git.
- ✅ **Smoke test:** `hello` table created and queried as `dev_user`.
- ✅ **Bruno 4.4.0** installed, collection at `Bruno/playground/`.
- ⚠️ **Bruno request not saved:** the committed `Bruno/playground/Untitled.bru` has an **empty URL and no assertion**. The request you ran was never saved (Bruno needs **Ctrl+S**). Fix it next session (see below).
- Commits pushed: `d9a5c83 Week 0, Day 1 toolchain verified`, `e73dad9 Week 0 Day 3: pgAdmin, playgroundDb Database, dev_user, Bruno`.

## Earlier setup (reference)
- Toolchain: Node 24.18, Angular CLI 21.2.19, .NET SDK 10.0.401 / runtime 10.0.12, dotnet-ef 10.0.12, Git 2.55, VS Code 1.148, psql 18.7 on PATH.
- PostgreSQL instances: `postgresql-x64-18` **Running/Automatic**, data in `C:\Program Files\PostgreSQL\18\data`, port 5432. **Use this one for everything.** `postgresql-x64-18-5433` is Stopped/Disabled (data `C:\PostgreSQL\data_5433`) and ignored.
- Agreed (25 Nov): the trainer updates `CURRENT-STATUS.md`, `LEARNING-LOG.md` and `PROGRESS.md` at the end of each session; you commit them along with your code.
- GitHub account **MAJadhav** is connected to Claude. The trainer reads `FullStackRoadmap` to review your commits.

## Next session
1. **Fix the Bruno request:** open `Untitled` in Bruno → rename to `Get user 1` → URL `https://jsonplaceholder.typicode.com/users/1` → Assert tab: `res.status` `eq` `200` → **Ctrl+S** → Send (assertion passes).
2. **Commit:** `git add . ; git commit -m "Week 0 Day 3: tracking update + Bruno request saved" ; git push`
3. **Day 4:** read `00-Roadmap/ROADMAP.md` fully; fill in the Day-0 self-ratings in `PROGRESS.md`; answer the Day 3 self-check questions in `LEARNING-LOG.md`.
4. **Week 1 starts Mon 30 Nov:** `ng new ng21-lab`.

## Blockers / questions for the trainer
- _(none)_

## Links
- GitHub account: https://github.com/MAJadhav
- Repo: https://github.com/MAJadhav/FullStackRoadmap
- Live app: _(add after Week 15)_
