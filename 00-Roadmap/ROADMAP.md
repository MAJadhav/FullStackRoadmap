# 16-Week Full-Stack Roadmap (Angular 21→22 · .NET 10 · EF Core 10 · PostgreSQL)

**Pace:** Mon–Sat, 2–3 hrs/day. **Sunday:** revision + interview questions (≈1.5 hrs).
**Dates** assume a Monday 30 Nov 2026 start. If you slip, shift the dates; don't skip weeks.
**Buffer:** if a week overruns, take **one buffer week** after Week 8 or Week 12. Plan for it instead of rushing.

Legend: 📖 = read/watch · 💻 = build · ✅ = deliverable (commit it) · ⚠️ = version-sensitive, check the docs

---

## Phase map

| Phase | Weeks | Dates (approx.) | Outcome |
|---|---|---|---|
| 0 Setup | Week 0 | 26–29 Nov 2026 | Tools verified, Git + GitHub ready |
| 1 Modern Angular | 1–4 | 30 Nov – 27 Dec | Fluent in v17–v21 features + unit testing (Jasmine/Karma **and** Vitest) |
| 2 C# + .NET + DB | 5–8 | 28 Dec – 24 Jan | Modern C#, ASP.NET Core 10 Web API, SQL on PostgreSQL, EF Core 10 |
| 3 Architecture + Auth | 9–10 | 25 Jan – 7 Feb | Clean architecture, backend testing, Identity + JWT + roles/policies |
| 4 Capstone: Gym App | 11–14 | 8 Feb – 7 Mar | Complete app built from scratch, tested, upgraded to Angular 22 |
| 5 Ship + Career | 15–16 | 8 Mar – 21 Mar | Docker, CI/CD, free deployment, microservices basics, interview-ready |

---

## Week 0 — Setup (26–29 Nov 2026)

| Day | Task |
|---|---|
| 1 | Run every verify command in `README.md` §2 and paste the output into `LEARNING-LOG.md`. Install `dotnet-ef` if missing: `dotnet tool install --global dotnet-ef` |
| 2 | Install Git and create a GitHub account. `git init` inside `FullStackRoadmap`, add a `.gitignore` (Node + VisualStudio templates), first commit, push to a **public** repo (public repos get free GitHub Actions minutes, and recruiters can see your work) |
| 3 | Open pgAdmin/DBeaver, connect to local PostgreSQL, create database `playground`. Install Bruno or Postman |
| 4 | Read this roadmap fully. Fill in the skill self-ratings in `PROGRESS.md` (Day-0 column) |

✅ Repo on GitHub · all tools verified · self-ratings filled in

---

# PHASE 1 — MODERN ANGULAR (what changed from v17 onward)

You already know modules, components, RxJS, reactive forms, routing and services. This phase covers only **what's new and what interviews now ask about**.

## Week 1 — Standalone, control flow, signals basics (30 Nov – 6 Dec)
Folder: `02-Angular-Modern/week01/`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | New project anatomy in v21: standalone by default, `app.config.ts`, `provide*` functions, esbuild/Vite application builder, **zoneless by default**, no `NgModule` | `ng new ng21-lab` (pick SCSS, no SSR for now). Read every generated file and write in your log what each one does |
| Tue | Built-in control flow: `@if / @else`, `@for` (with **required** `track`), `@empty`, `@switch`, `@let` | Build a "Product list" with filter + empty state, using no `*ngIf` / `*ngFor` |
| Wed | Signals: `signal()`, `computed()`, `effect()`; when **not** to use effect | Counter + cart total as signals. Then refactor a BehaviorSubject service into signals |
| Thu | Signal-based component APIs: `input()`, `input.required()`, `output()`, `model()` (two-way binding) | Parent/child "rating" component using `model()` |
| Fri | `inject()` function vs constructor injection; signal queries `viewChild()`, `contentChild()`, `viewChildren()` | Refactor all constructor DI to `inject()` |
| Sat | `@defer` blocks: `on viewport`, `on idle`, `on interaction`, `@placeholder`, `@loading`; lazy `loadComponent` routes | Dashboard with 3 deferred widgets; check the network tab |
| Sun | Revision + Week 1 questions in `INTERVIEW-QA.md` | — |

✅ `ng21-lab` with 6 feature demos, pushed to GitHub

## Week 2 — Advanced signals, zoneless, RxJS interop, modern routing & HTTP (7–13 Dec)
Folder: `02-Angular-Modern/week02/`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | Change detection now: **zoneless** (v21 default), OnPush, how signals schedule rendering, what breaks without zone.js (`setTimeout` updates, 3rd-party libs) | Take an old Angular 16-style component that relies on zone.js. Make it work in zoneless with signals |
| Tue | `linkedSignal()`, `untracked()`, signal equality functions | Dependent dropdowns: Country → City with `linkedSignal` resetting the city |
| Wed | `resource()` and `httpResource()` ⚠️ (experimental in 21, **stable in 22**) | Fetch users from a free fake API (e.g. JSONPlaceholder) with `httpResource`, showing loading/error/value states |
| Thu | RxJS interop: `toSignal`, `toObservable`, `takeUntilDestroyed`, `DestroyRef`; when RxJS is still the right tool (debounce, websockets, complex streams) | Search box: RxJS `debounceTime` + `switchMap`, result exposed as a signal |
| Fri | HTTP: `provideHttpClient(withFetch(), withInterceptors([...]))`, **functional interceptors** | Logging + error-handling functional interceptors |
| Sat | Router: functional guards (`CanActivateFn`), resolvers, `withComponentInputBinding()` (route params as inputs), lazy routes, title strategy | Mini app: list → details (id via input), guarded admin route |
| Sun | Revision + questions | — |

✅ Zoneless app using signals, resource, interceptors and guards

## Week 3 — Forms, state, SSR, accessibility (14–20 Dec)
Folder: `02-Angular-Modern/week03/`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | Typed Reactive Forms revisited: `FormBuilder.nonNullable`, typed `FormGroup`, custom + async validators | Registration form with password-match + async "email exists" validator |
| Tue | **Signal Forms** ⚠️ (`@angular/forms/signals`: experimental in 21, stable in 22): `form()`, schema validation, field state | Rebuild Monday's form with Signal Forms. List the differences in your log |
| Wed | State management with signals: service-with-signals store pattern; overview of NgRx SignalStore (optional, free library) | `CartStore` service: state signal, computed selectors, methods as actions |
| Thu | SSR + hydration: `@angular/ssr`, `provideClientHydration`, incremental hydration, `isPlatformBrowser`, what breaks on the server (window/localStorage) | `ng new ssr-lab --ssr`, view page source, add incremental hydration to a `@defer` block |
| Fri | Performance: `NgOptimizedImage`, bundle budgets, `ng build --stats-json`, lazy loading strategy; Angular Aria / a11y basics | Measure a Lighthouse score before and after the optimisations |
| Sat | **Mini-project:** "Task Board" using everything from Weeks 1–3 (signals store, Signal Forms, defer, guards, httpResource against a mock API) | Build it |
| Sun | Revision + questions | — |

✅ Task Board app (this becomes your Week 4 testing target)

## Week 4 — Unit testing: Jasmine + Karma, then Vitest (21–27 Dec)
Folder: `03-Angular-Testing/`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | Testing pyramid; Jasmine syntax: `describe/it/expect`, matchers, `beforeEach`, spies (`spyOn`, `jasmine.createSpyObj`). Karma's role (browser runner) | Create `karma-lab` choosing Jasmine/Karma at `ng new` ⚠️ (check `ng new --help` for the test-runner option in your CLI version). Write tests for a pure `PriceCalculator` class |
| Tue | `TestBed`: configuring standalone components, `fixture.detectChanges()` vs zoneless (`fixture.whenStable()`), querying the DOM, testing `input()`/`output()` | Test the rating component from Week 1 |
| Wed | Services + HTTP: `provideHttpClientTesting()`, `HttpTestingController`; testing signals and computed values | Test `CartStore` and a user API service |
| Thu | Async + routing: `fakeAsync/tick`, `waitForAsync`, testing guards and interceptors, `RouterTestingHarness` | Test the auth guard + error interceptor |
| Fri | **Vitest**: why Angular switched; run `ng g @schematics/angular:refactor-jasmine-vitest` on a *copy* of karma-lab; compare syntax (`vi.fn`, `vi.spyOn`, fake timers) | Migrate the copy, get all tests green, compare run times |
| Sat | Code coverage (`ng test --coverage`), what to test vs not; write tests for the Task Board until ≥ 70% coverage | Task Board tests in **Vitest** |
| Sun | Revision + questions. **Phase 1 checkpoint:** explain zoneless, signals vs RxJS, and Karma vs Vitest out loud in 2 minutes each | — |

✅ karma-lab (Jasmine) + vitest-lab + Task Board ≥ 70% coverage

---

# PHASE 2 — C#, .NET 10, SQL, EF CORE

## Week 5 — Modern C# for an Angular/TypeScript developer (28 Dec – 3 Jan)
Folder: `04-CSharp-DotNet/week05/` (console apps: `dotnet new console`)

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | .NET SDK/runtime/CLI, project files (`.csproj`), NuGet; value vs reference types, `struct`, `string` immutability; **nullable reference types** (compare with TS strict null) | CLI tour: `dotnet new`, `build`, `run`, `add package`. Nullability exercise |
| Tue | OOP properly: classes, interfaces, abstract classes, inheritance vs composition, access modifiers, `sealed`, **records**, primary constructors | Model a Library (Book, Member, Loan) twice: with classes, then with records where it makes sense |
| Wed | Collections + generics: `List<T>`, `Dictionary<K,V>`, `HashSet<T>`, `IEnumerable<T>` vs `IQueryable<T>` (preview), generic constraints | Generic `Repository<T>` in memory |
| Thu | **LINQ** (your RxJS/array-methods equivalent): `Where/Select/GroupBy/Join/OrderBy/Aggregate`, deferred execution | 20 LINQ queries over a seeded list. Write the matching JS array code beside each one |
| Fri | Delegates, lambdas, `Func/Action`, events; **pattern matching** (`switch` expressions, property/list patterns); exceptions | Rule engine using switch expressions |
| Sat | **async/await + Task** (compare with Promises), `CancellationToken`, `IAsyncEnumerable`; C# 14 extension members and the `field` keyword ⚠️ | Parallel downloader with cancellation |
| Sun | SOLID with C# examples + revision + questions | — |

✅ 6 console projects + SOLID notes

## Week 6 — ASP.NET Core 10 Web API fundamentals (4–10 Jan)
Folder: `04-CSharp-DotNet/week06/` → project `TodoApi`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | `dotnet new webapi`, `Program.cs`, hosting model, **middleware pipeline** order (compare with Angular interceptors) | Write custom request-timing middleware |
| Tue | **Dependency Injection** lifetimes (Singleton/Scoped/Transient) and captive dependencies (compare with Angular `providedIn`) | Demo that shows all 3 lifetimes through GUIDs |
| Wed | Controllers vs **Minimal APIs**, routing, model binding, `IActionResult` / `TypedResults`, status codes | Same CRUD in both styles (in-memory list) |
| Thu | Configuration: `appsettings.{Environment}.json`, Options pattern, **User Secrets**, environment variables | Move settings to typed options; secrets kept out of Git |
| Fri | Validation (DataAnnotations; .NET 10 built-in minimal-API validation ⚠️), **ProblemDetails**, global error handling with `IExceptionHandler` | Consistent error responses |
| Sat | OpenAPI in .NET 10 (`Microsoft.AspNetCore.OpenApi`; Swagger UI is no longer in the template, add **Scalar** or Swagger UI yourself), logging with `ILogger`, CORS for `http://localhost:4200` | Call the API from your Angular Task Board |
| Sun | Revision + questions | — |

✅ TodoApi with OpenAPI docs, validation, global errors, called from Angular

## Week 7 — SQL on PostgreSQL (11–17 Jan)
Folder: `05-Database-PostgreSQL/` (save every query as a `.sql` file)

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | Relational model, PostgreSQL data types (`uuid`, `text`, `timestamptz`, `numeric`, `jsonb`), DDL, constraints (PK, FK, UNIQUE, CHECK) | Create a `school` DB by hand: students, courses, enrolments |
| Tue | DML + SELECT: filtering, sorting, `LIMIT/OFFSET`, `INNER/LEFT/FULL JOIN` | 25 query drills |
| Wed | `GROUP BY/HAVING`, aggregates, subqueries, **CTEs**, **window functions** (`ROW_NUMBER`, `RANK`, running totals) | "Top 3 students per course", monthly running totals |
| Thu | **Normalisation** (1NF→3NF), when to denormalise; ER diagrams (draw.io is free) | Design the **Gym App** ERD on paper / draw.io |
| Fri | **Indexes** (B-tree, composite, partial, GIN for jsonb), `EXPLAIN ANALYZE`, transactions + isolation levels, locking basics | Seed 100k rows with `generate_series`, then measure queries before and after adding indexes |
| Sat | Views, functions, roles/permissions, backup/restore (`pg_dump`); a short note on SQL Server differences (T-SQL, `TOP`, `IDENTITY`) | Backup + restore the school DB |
| Sun | Revision + SQL interview drills | — |

✅ `.sql` scripts folder + Gym ERD v1

## Week 8 — Entity Framework Core 10 with PostgreSQL (Npgsql) (18–24 Jan)
Folder: `06-EFCore/` → project `LibraryApi`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | ORM concepts, `DbContext`, `Npgsql.EntityFrameworkCore.PostgreSQL` provider, connection strings, code-first | `LibraryApi` connected to local Postgres |
| Tue | **Migrations**: `dotnet ef migrations add`, `database update`, inspecting the generated SQL, rollback | 3 migrations, read every generated file |
| Wed | Relationships: 1-1, 1-many, many-many (with payload); Fluent API vs attributes; `IEntityTypeConfiguration<T>` | Books–Authors–Loans model |
| Thu | Querying: tracking vs `AsNoTracking`, `Include/ThenInclude`, **projection to DTOs with `Select`**, **N+1 problem**, split queries, pagination | Turn on EF SQL logging and fix an N+1 on purpose |
| Fri | Saving: change tracker, transactions, **optimistic concurrency** (Postgres `xmin`), soft delete via global query filters, `ExecuteUpdate/ExecuteDelete` | Concurrency conflict demo with 2 requests |
| Sat | Seeding, raw SQL (`FromSql`), the Repository/UoW debate (DbContext already is one); a short look at Dapper (free) for comparison | Same report query in EF and in Dapper |
| Sun | Revision + questions. **Phase 2 checkpoint:** explain DI lifetimes, IQueryable vs IEnumerable, and N+1 | — |

✅ LibraryApi: Postgres + migrations + relationships + concurrency

> 🟡 **Buffer week option here** if you're behind.

---

# PHASE 3 — ARCHITECTURE, TESTING, AUTH

## Week 9 — Clean architecture + backend testing (25–31 Jan)
Folder: `07-Architecture-Auth/week09/`

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | Layered / **Clean Architecture**: Domain, Application, Infrastructure, API; dependency rule; vertical-slice alternative | Restructure LibraryApi into 4 projects in one solution |
| Tue | DTOs + mapping (manual or Mapster; note: AutoMapper and MediatR moved to commercial licences in 2025 ⚠️, so check the current terms before choosing them) | Manual mapping extension methods |
| Wed | **FluentValidation**, Result pattern vs exceptions, pagination/filtering/sorting contract | `PagedResult<T>` + query params |
| Thu | **xUnit** basics, test naming, Arrange-Act-Assert; mocking with **NSubstitute** or Moq | Unit-test the Application services |
| Fri | **Integration tests**: `WebApplicationFactory`, **Testcontainers** for a real Postgres (needs Docker Desktop) | API integration tests on a real DB |
| Sat | Caching basics: `IMemoryCache`, `HybridCache`; background work with `BackgroundService` | Cache the "books" list; nightly-cleanup background service |
| Sun | Revision + questions | — |

✅ LibraryApi in Clean Architecture with unit + integration tests

## Week 10 — Authentication & Authorization (1–7 Feb)
Folder: `07-Architecture-Auth/week10/` → project `AuthLab` (API + Angular client)

| Day | 📖 Concept | 💻 Exercise |
|---|---|---|
| Mon | AuthN vs AuthZ, sessions vs tokens, **JWT anatomy** (header/payload/signature, claims, expiry), password hashing, OWASP basics | Decode a JWT by hand at jwt.io |
| Tue | **ASP.NET Core Identity** with EF Core + Postgres: users, roles, password rules, lockout | Register/login endpoints with Identity |
| Wed | Issue **JWT access token + refresh token** (stored hashed, rotation, revocation); `AddAuthentication().AddJwtBearer()` | Login → access + refresh; `/refresh` endpoint |
| Thu | **Role-based** `[Authorize(Roles="Owner")]`, **policy-based** (`AddAuthorizationBuilder().AddPolicy`), **permission claims**, **resource-based** auth (a Member can only read *their own* data) | Owner/Admin/Member endpoints + a "MyProfile only" rule |
| Fri | Angular side: login form, auth service with signals (`currentUser`, `isLoggedIn`, `roles`), **functional interceptor** to attach the token + silent refresh on 401, role guard (`canMatch`), hide UI by role | Full login flow working end-to-end |
| Sat | Token storage trade-offs (memory vs localStorage vs **httpOnly cookie**), CSRF, CORS with credentials, the BFF pattern; OAuth2/OIDC concepts + "Login with Google" (optional, free) | Move the refresh token to an httpOnly cookie |
| Sun | Revision + questions. **Phase 3 checkpoint:** whiteboard the login → refresh → logout sequence | — |

✅ AuthLab: Identity + JWT + refresh + roles + policies + Angular guards/interceptor

---

# PHASE 4 — CAPSTONE: GYM MANAGEMENT APP
Folder: `08-Capstone-GymApp/` · Spec: `08-Capstone-GymApp/PROJECT-SPEC.md`
Work in **feature branches** + pull requests on GitHub (merge them yourself). That's how real teams work.

## Week 11 — Backend foundation (8–14 Feb)
| Day | 💻 Work |
|---|---|
| Mon | Final ERD + solution scaffold (Domain/Application/Infrastructure/Api/Tests), Postgres DB `gymapp_dev`, first migration |
| Tue | Identity + JWT + refresh (reuse AuthLab), seed the Owner account, roles Owner/Admin/Member/Trainer |
| Wed | Membership Plans CRUD (Owner/Admin) with validation + pagination |
| Thu | Members: onboarding (Admin creates member + login), profile, member status |
| Fri | Memberships (subscribe a member to a plan, start/end dates, freeze, expiry calculation) |
| Sat | Admin **permissions** (Owner grants areas to Admins → permission claims → policies); integration tests for auth rules |
| Sun | Review your own PRs; update the spec with any changes |

## Week 12 — Backend features (15–21 Feb)
| Day | 💻 Work |
|---|---|
| Mon | Payments (record payments, dues, receipts — no real payment gateway) |
| Tue | Attendance / check-in (Admin check-in + member self check-in) |
| Wed | Trainers + Classes + Schedule + Bookings (capacity rules, no double booking) |
| Thu | Member progress tracker (weight, measurements, workout logs) — **resource-based auth: own data only** |
| Fri | Dashboards: Owner KPIs (revenue/month, active members, expiring soon) using efficient queries |
| Sat | Background job: mark expired memberships, "expiring in 7 days" list; full test pass |
| Sun | API review: OpenAPI docs complete, Bruno/Postman collection exported to repo |

> 🟡 **Buffer week option here** if you're behind.

## Week 13 — Angular frontend (22–28 Feb)
| Day | 💻 Work |
|---|---|
| Mon | `ng new gym-app-web` (Angular 21, zoneless, SCSS), folder structure (core/shared/features), environment config, HTTP + auth interceptors |
| Tue | Auth pages + auth store (signals) + role-based routing (`canMatch`) + 3 layouts (Owner/Admin/Member) |
| Wed | Owner: dashboard, plans management, admin permissions screen |
| Thu | Admin: members list (search/paginate via `httpResource`), member detail, assign membership, payments |
| Fri | Classes/schedule/booking UI; attendance check-in screen |
| Sat | Member portal: my membership, my bookings, my progress (charts with a free library) |
| Sun | UX pass: loading/error/empty states, a11y check |

## Week 14 — Test, upgrade, polish (1–7 Mar)
| Day | 💻 Work |
|---|---|
| Mon | Frontend unit tests (Vitest) for stores, guards, interceptors, key components |
| Tue | More tests → ≥ 70% coverage on core + features; backend test gaps closed |
| Wed | **Upgrade Angular 21 → 22** with `ng update @angular/cli@22 @angular/core@22` ⚠️ (check angular.dev/update-guide first). Log every migration change |
| Thu | Adopt the stable v22 APIs where they help (Signal Forms on the member form, `httpResource`); note OnPush/`@Service` defaults |
| Fri | Performance: lazy routes, `@defer`, EF query review with `EXPLAIN ANALYZE` |
| Sat | Security review: OWASP top 10 checklist, secrets, rate limiting (`AddRateLimiter`) |
| Sun | README for the capstone with screenshots + architecture diagram |

✅ Gym App complete, tested, on Angular 22

---

# PHASE 5 — SHIP IT + CAREER

## Week 15 — Docker, CI/CD, free deployment (8–14 Mar)
Folder: `10-Deployment-DevOps/`

| Day | 📖/💻 |
|---|---|
| Mon | Docker fundamentals: images, containers, volumes; `docker-compose.yml` with Postgres for local dev |
| Tue | Dockerfile for the .NET API (multi-stage build); run API + DB with compose |
| Wed | **GitHub Actions** CI: build + test the .NET and Angular projects on every PR |
| Thu | Free database: **Neon** or **Supabase** Postgres (free tiers without expiry, but with small limits ⚠️). Run migrations against it |
| Fri | Free API hosting: **Render** web service with Docker (free tier sleeps after ~15 min idle, so the first request is slow ⚠️). Env vars for secrets + CORS |
| Sat | Free frontend hosting: **Cloudflare Pages / Netlify / GitHub Pages**; SPA fallback routing; production `environment` URL |
| Sun | Health checks, structured logging (Serilog, free), simple uptime monitoring |

✅ Live URL for the Gym App (frontend + API + DB, ₹0)

## Week 16 — Microservices basics + interview readiness (15–21 Mar)
Folder: `11-Microservices-Interview/`

| Day | 📖/💻 |
|---|---|
| Mon | Monolith vs modular monolith vs microservices; **when not to** use microservices; bounded contexts |
| Tue | Extract a **Notification service**; async messaging with **RabbitMQ** (Docker) — publish "MembershipExpiring" events |
| Wed | API Gateway with **YARP**; service-to-service auth; resilience (`Microsoft.Extensions.Http.Resilience`: retries, circuit breaker) |
| Thu | Redis distributed cache (Docker); overview of .NET Aspire for local orchestration ⚠️ |
| Fri | System design practice: design "Gym App for 500 gyms" (multi-tenancy, scaling, caching) |
| Sat | Mock interview with me: Angular + .NET + SQL + auth + your project walkthrough |
| Sun | Resume bullets from the capstone, GitHub profile README, LinkedIn post about the project |

✅ Interview-ready: live project + repo + answers in `INTERVIEW-QA.md`

---

## Phase checkpoints (self-test, no notes)
- **After W4:** build a zoneless signals CRUD UI with tests in 2 hours.
- **After W8:** build a CRUD API on Postgres with EF migrations in 2 hours.
- **After W10:** explain and demo JWT + refresh + roles + policies.
- **After W14:** demo the Gym App end-to-end in 10 minutes.
- **After W16:** answer 80% of `INTERVIEW-QA.md` confidently.
