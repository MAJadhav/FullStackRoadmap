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
