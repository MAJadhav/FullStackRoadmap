# Learning Log

Newest entry at the top. Copy the template for each session.

---

### TEMPLATE — Week X · Day Y · DD MMM YYYY · (hours)
**Topic:**
**What I did:**
**What I learned (in my own words):**
**Code / commit:**
**Stuck on / questions:**
**Confidence (1–5):**

---

### Week 0 · Day 3 · 26 Nov 2026 · ~1.75 h
**Topic:** Database GUI, first database, app role, API client
**What I did:**
- Registered the local server in **pgAdmin 4 v9.19** (`Local PG18`, localhost:5432).
- Created database **`playgroundDb`** and looked at the SQL pgAdmin generates before saving.
- Created role **`dev_user`** (`LOGIN`, `CREATEDB`, not superuser) and made it the owner of `playgroundDb`.
- Registered a second pgAdmin server as `dev_user`; created table `hello`, inserted 2 rows, selected them.
- Installed **Bruno 4.4.0**; created collection `Bruno/playground/` inside the repo.

`\du` result:
| Role | Attributes |
|---|---|
| `dev_user` | Create DB |
| `postgres` | Superuser, Create role, Create DB, Replication, Bypass RLS |

**What I learned:**
- Every pgAdmin click is just generated SQL (SQL tab in the create dialog).
- **Identifier case-folding:** unquoted names are folded to lowercase. `playgroundDb` → `playgrounddb` → "database does not exist". `"playgroundDb"` (double quotes) keeps the exact case. `'...'` (single quotes) is a text value, not a name. Convention: lowercase snake_case everywhere so quotes are never needed.
- Apps never connect as the `postgres` superuser. Use a limited role (least privilege).
- Since PostgreSQL 15, non-owners can't create objects in the `public` schema, but the **database owner** can. That's why `dev_user` owns the database.
- `CREATEDB` lets `dotnet ef database update` create the database in Week 8.
- Bruno saves collections as plain-text `.bru` files you can commit to Git. **Requests must be saved with Ctrl+S** or the file stays empty.

**Code / commit:** `e73dad9 Week 0 Day 3: pgAdmin, playgroundDb Database, dev_user, Bruno`
**Stuck on / questions:** `ALTER DATABASE playgroundDb ...` failed with "does not exist" (case-folding, see above). Fixed with double quotes.
**Self-check (answer in your own words):**
1. Role vs user in PostgreSQL?
2. Why shouldn't an API connect as `postgres`?
3. What does port 5432 mean, and why did we ignore the 5433 instance?

**Confidence (1–5):** _(fill in)_

---

### Week 0 · Day 1 · 26 Nov 2026 · 0.5 h
**Topic:** Verify the toolchain
**What I did:** Ran the verify script.
| Tool | Version |
|---|---|
| Node.js / npm | v24.18.0 / 11.16.0 |
| Angular CLI | 21.2.19 |
| .NET SDK | 10.0.401 |
| .NET runtimes | 10.0.12 (NETCore, AspNetCore, WindowsDesktop) + 8.0.21/8.0.31 |
| EF Core tool | 10.0.12 |
| Git / VS Code | 2.55.0 / 1.148.0 |
| PostgreSQL (psql) | 18.7 ✅ (after adding `C:\Program Files\PostgreSQL\18\bin` to user PATH) |
| Docker | Not installed (needed from Week 9) |

**What I learned:** SDK vs runtime. SDK `10.0.401` = .NET 10, feature band 4xx (tied to Visual Studio releases), patch 01, and is used to build. Runtime `10.0.12` = patch 12, and is what runs the app; servers only need the runtime. Runtimes install side by side. `global.json` pins the SDK version for a team. .NET 8 went out of support on 10 Nov 2026.
**Code / commit:** —
PostgreSQL on Windows: the installer doesn't add `bin` to PATH. One set of binaries can run several **instances** (clusters), and each has its own **data directory** and port.
**PostgreSQL instances on this laptop:**
| Service | State | Data directory | Use |
|---|---|---|---|
| `postgresql-x64-18` | Running · Automatic | `C:\Program Files\PostgreSQL\18\data` | ✅ Main server (port 5432). Use for everything |
| `postgresql-x64-18-5433` | Stopped · Disabled | `C:\PostgreSQL\data_5433` | Ignore |
**Code / commit:** —
**Stuck on / questions:** `psql` was not on PATH. Fixed with the find-and-add-to-PATH script.
**Confidence:** 4

---

### Week 0 · Day 2 · 25–26 Nov 2026 · 0.5 h
**Topic:** Git + GitHub setup
**What I did:** `git init` in FullStackRoadmap, first commit, created the public repo `MAJadhav/FullStackRoadmap` and pushed.
**What I learned:** —
**Code / commit:** `421c6f0 Week 0: roadmap setup` (branch `master`)
**Stuck on / questions:** —
**Confidence:** —

---

### Week 0 · Day 0 · 25 Nov 2026 · 0.5 h
**Topic:** Roadmap kickoff
**What I did:** Explained my goals to the trainer; confirmed the plan: 16 weeks at 2–3 hrs/day, Gym Management App capstone, Jasmine/Karma + Vitest, Angular 21 → 22 upgrade, .NET 10 LTS + EF Core 10 + PostgreSQL, free hosting only.
**What I learned:** Angular 21 made Vitest the default test runner and zoneless the default. Angular 22 (June 2026) made Signal Forms and the Resource API stable. .NET 10 is LTS until Nov 2028.
**Code / commit:** —
**Stuck on / questions:** —
**Confidence:** —
