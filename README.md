# Full-Stack Roadmap — Angular + .NET 10 + PostgreSQL

**Learner:** Senior Angular developer (7.6 yrs, Angular 7 → 18) moving to full-stack
**Trainer role:** Industry trainer (Angular, C#/.NET, EF Core, databases, auth, deployment, microservices)
**Created:** 25 Nov 2026 **Planned duration:** 16 weeks at 2–3 hrs/day (Week 0 setup + Weeks 1–16)
**Budget:** ₹0. Only free tools, official docs and free hosting tiers.

---

## 1. What you asked for (my understanding, confirmed with you on 25 Nov 2026)

| # | Your words (summarised) | How I understood it | How the plan covers it |
|---|---|---|---|
| 1 | Learn Angular 21, unit testing with Karma/Jasmine, revisit Angular concepts | Skip the basics you already know. Focus on **what changed from v17 onward**: standalone, control flow, signals, zoneless, resources, Signal Forms, SSR/hydration, new testing defaults | Weeks 1–4, plus the Angular 21 → 22 upgrade in Week 14 |
| 2 | Basic C#; learn .NET 10 with Entity Framework; build a full web app from scratch | Build modern C# up to professional level, then ASP.NET Core 10 Web API + EF Core 10, ending with a complete app you built yourself | Weeks 5–9 (C#, API, SQL, EF Core, architecture), Weeks 11–14 (capstone) |
| 3 | Authentication, Authorization, Role-based auth | ASP.NET Core Identity, JWT + refresh tokens, roles, **policy/permission-based** and **resource-based** auth, and the matching Angular guards/interceptors | Week 10, then applied for real in the capstone |
| 4 | Industry-standard databases like PostgreSQL | Real SQL skills (not only EF): design, joins, indexes, transactions, query plans | Week 7 (SQL), Week 8 (EF Core on Postgres) |
| 5 | No money for hosting or courses | Free docs/videos only; deploy on free tiers | `09-Resources/FREE-RESOURCES.md`, Week 15 |
| 6 | A full plan + a track record of everything | Day-by-day roadmap + progress tracker + learning log + decisions log + interview question bank | `00-Roadmap/` and `01-Tracking/` |

### Things I found while checking your request (you agreed to these)
- **Karma is deprecated** (since 2023), and **Angular 21 made Vitest the default test runner** for new projects. Many company codebases still run Karma + Jasmine, so we learn **both**: Jasmine/Karma first (jobs and interviews), then migrate to Vitest.
- **Angular 22 was released in June 2026.** It makes Signal Forms and the Resource API stable and makes OnPush the default for new components. Angular has also moved to **one major release per year (June)**. We **build on 21, then upgrade the capstone to 22** in Week 14, because upgrading apps is real job work.
- **.NET 10 is the LTS release, supported until Nov 2028.** It's the right choice. (.NET 11 is a shorter-support STS release, so we skip it.)
- **Capstone = Gym Management App** with Owner / Admin / Member roles. See `08-Capstone-GymApp/PROJECT-SPEC.md`.

---

## 2. Your installed stack (as you told me — verify in Week 0)

| Tool | Version you have | Verify command |
|---|---|---|
| Visual Studio 2026 | — | open it |
| VS Code | — | `code --version` |
| .NET SDK | 10.0.12 | `dotnet --list-sdks` |
| EF Core tools | 10.0 | `dotnet ef --version` |
| PostgreSQL | — | `psql --version` |
| Node.js | — | `node -v` |
| Angular CLI | 21 | `ng version` |

Still to install (all free): **Git**, a **GitHub** account, **Docker Desktop** (free for personal use; needed from Week 9), **Bruno** or **Postman** (API testing), **pgAdmin** or **DBeaver Community** (DB GUI, if not already installed with PostgreSQL).

---

## 3. Folder map

```
FullStackRoadmap/
├── README.md                     ← you are here
├── 00-Roadmap/
│   └── ROADMAP.md                ← 16-week, day-by-day plan
├── 01-Tracking/
│   ├── CURRENT-STATUS.md         ← "where am I right now" (update every session)
│   ├── PROGRESS.md               ← week checklists + skill self-ratings
│   ├── LEARNING-LOG.md           ← daily log (what I did / learned / stuck on)
│   ├── DECISIONS.md              ← every important decision and why
│   └── INTERVIEW-QA.md           ← question bank you answer in your own words
├── 02-Angular-Modern/            ← Weeks 1–3 exercises (one folder per week)
├── 03-Angular-Testing/           ← Week 4 (Jasmine/Karma lab + Vitest lab)
├── 04-CSharp-DotNet/             ← Weeks 5–6
├── 05-Database-PostgreSQL/       ← Week 7 SQL scripts
├── 06-EFCore/                    ← Week 8
├── 07-Architecture-Auth/         ← Weeks 9–10
├── 08-Capstone-GymApp/           ← Weeks 11–14 (backend/ + frontend/)
├── 10-Deployment-DevOps/         ← Week 15
├── 11-Microservices-Interview/   ← Week 16
└── 09-Resources/
    └── FREE-RESOURCES.md
```

## 4. How each study session works (2–3 hrs)

1. **5 min:** open `01-Tracking/CURRENT-STATUS.md` and read "Next session".
2. **40–50 min, concept:** official docs section listed for the day.
3. **60–90 min, code:** the day's exercise in the matching week folder. Commit to Git.
4. **10 min, log:** add an entry to `LEARNING-LOG.md`, tick `PROGRESS.md`, update `CURRENT-STATUS.md`.
5. **Sunday:** revision + answer that week's questions in `INTERVIEW-QA.md` without looking.

**Working with me:** start each chat in this Project with *"Week X Day Y"* and paste `CURRENT-STATUS.md`. I'll teach that session, review your code, and set the exercise.

## 5. Ground rules
- Type the code yourself; don't copy-paste. Interviewers can tell.
- Every week ends with something **running** and **committed to GitHub**.
- When stuck for more than 30 minutes: write down what you tried in the log, then ask.
- Versions and free-tier limits change. Always confirm against the official docs or pricing page linked in `FREE-RESOURCES.md`.
