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

### Week 0 · Day 4 · 26 Nov 2026 · ~0.75 h
**Topic:** Roadmap review, skill self-ratings, Day 3 self-check
**What I did:**
- Fixed and saved the Bruno request (`Get user 1`, assertion `res.status eq 200` passes).
- Answered the Day 3 self-check questions (trainer review below them).
- Read `00-Roadmap/ROADMAP.md` fully.
- Filled in the Day-0 skill ratings in `PROGRESS.md`: Standalone + control flow **2** (used at work), C# OOP + generics **1** (basic syntax, loops, functions, operators only), everything else **0**.
- **Roadmap change requested:** I've never built auth in Angular, and Phase 1 had none of it. Angular auth is now learned in 3 parts: mock auth service + guards (Week 2 Sat), mock login + auth interceptor + roles in the Task Board (Week 3 Sat), real API + silent refresh (Week 10 Fri). No dates moved. Decision #8 in `DECISIONS.md`; 3 new Angular auth questions in `INTERVIEW-QA.md` (13–15).

**What I learned (in my own words):**
- A port picks *which program* on a machine receives the traffic (the IP picks the machine). 5432 is just PostgreSQL's default.
- A superuser bypasses all permission checks (even row-level security) and can run OS commands via `COPY ... TO PROGRAM`, so SQL injection + superuser = server takeover.
- Angular auth needs a backend to issue real tokens, but the Angular side (guards, interceptor, auth store) can be learned against a mock first.

**Code / commit:** `ab20c29` (Bruno saved), `90ade6d` (self-check answers), this session's tracking commit
**Stuck on / questions:** —
**Confidence (1–5):** 5

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
Answer: Both users and groups are roles. Role with LOGIN is actually a user. and role without LOGIN is Group of permissions.that can be assigned to other roles.
2. Why shouldn't an API connect as `postgres`?
Answer: an API when connects to postgreSQl database, it has certain permissions based on the role it possesses. If it's postgres(superuser) then it will have all the permissions of the operations for the server + database. An attacker can take advantgage of it and can steal your data or turn down whole server. a role with limited permissions of operations can do little damage rather than putting entire server at risk in same case. 
3. What does port 5432 mean, and why did we ignore the 5433 instance?
Answer: ports are the access points of the SQL server where the database processess are running and where it makes connection with the application. each server should have it's own port. two servers can't run on same port. And by default we should use the 5432 to avoid any risks.

**Trainer review (26 Nov):** 1 ✅ correct (`CREATE USER` = `CREATE ROLE ... LOGIN`). 2 ✅ correct; extra point: a superuser bypasses row-level security and can run OS commands with `COPY ... TO PROGRAM`, so one SQL-injection bug becomes a server takeover. 3 🟡 partly correct: a port is an OS/network concept (the IP picks the machine, the port picks the program), not something SQL-specific, and 5432 is only the *default*. Another port isn't "risky". We ignored 5433 because it's a second, separate cluster (own data folder, roles, passwords). One server = no "where is my data?" confusion, and less RAM.

**Confidence (1–5):** 4

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
