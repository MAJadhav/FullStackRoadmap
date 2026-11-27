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

### Week 1 · Day 1 · 27 Nov 2026 · ~1 h
**Topic:** How a new Angular 21 project is put together (standalone, `app.config.ts`, `provide*` functions, zoneless, application builder, Vitest)
**What I did:**
- Created `02-Angular-Modern/week01/` and ran `ng new ng21-lab --style=scss --ssr=false --skip-git`. No nested `.git`, so the project is part of the main repo.
- Read every generated file and wrote one line per file (below).
- Ran the zoneless experiment (plain field vs signal updated by `setInterval`).

**What I learned (my readings + trainer review):**
| File | My reading | Trainer review |
|---|---|---|
| `src/main.ts` | Entry point. `bootstrapApplication()` starts the app and renders a standalone component as the root, with `appConfig` (`ApplicationConfig`) as options | ✅ One fix: the root class is called **`App`**, not `AppComponent`. The 2025 style guide drops the `Component` suffix |
| `app.config.ts` | `providers` has `provideRouter` and `provideBrowserGlobalErrorListeners`. Nothing for zoneless | ✅ Zoneless is missing because it's the default now. `provideBrowserGlobalErrorListeners()` sends uncaught browser errors and unhandled promise rejections to Angular's `ErrorHandler` |
| `app.routes.ts` | Empty `Routes` array passed to `app.config` | ✅ |
| `app.ts` | Root component, imports `RouterOutlet`, `title` is a `signal()`. "Root component from app.config.ts" | 🟡 The root component comes from **`main.ts`** (first argument of `bootstrapApplication(App, appConfig)`). `app.config.ts` only holds providers. Also: `imports: [RouterOutlet]` is the component doing the job `AppModule` used to do. `title` is `protected readonly`, so the template can read it but outside code can't |
| `app.html` / `app.scss` | Template + styles referenced by `templateUrl` / `styleUrl`. Found `@for` | ✅ `styleUrl` (singular) has existed since v17; before that it was always `styleUrls: []` |
| `app.spec.ts` | Test file for the component. "Looks like Jasmine" | 🟡 It's **Vitest**. It looks like Jasmine because Vitest offers the same global `describe/it/expect/beforeEach` (that's what `"types": ["vitest/globals"]` in `tsconfig.spec.json` enables). Unlike Karma, it runs in Node with **jsdom** (a fake DOM, see `devDependencies`), not in a real browser. The differences show up in spies/mocks: `jasmine.createSpy` vs `vi.fn()` (Week 4) |
| `angular.json` | No zone.js, and no `polyfills` option at all | 🟡 Good catch: `polyfills` used to exist mainly to load zone.js, so new projects drop it. What was missed: `build` uses **`@angular/build:application`** (esbuild), `serve` uses **`@angular/build:dev-server`** (Vite), `test` uses **`@angular/build:unit-test`** (Vitest). Assets come from `public`. Production budgets: 500 kB warning / 1 MB error for the initial bundle |
| `package.json` | No zone.js, Vitest `^4.0.8`, `@angular/core` `^21.2.0` | ✅ The `^` means "any 21.x from 21.2.0 up". `package-lock.json` or `ng version` shows the version actually installed. `jsdom` is the DOM Vitest uses |
| `tsconfig*.json` | `strict: true`, strict template options on, spec types point to Vitest | ✅ |
| `public/` | Replaces `src/assets` (v7–16?) | 🟡 `src/assets` was the default up to **v17**. `public/` arrived in **v18**. Difference: files in `public/` are copied to the **root** of the build output, so `public/favicon.ico` is served as `/favicon.ico`, not `/assets/favicon.ico` |

**Follow-up on the 🟡 readings (same day, 18:47):**
- `app.ts` ✅: the root component is whatever class is passed to `bootstrapApplication()` in `main.ts` (by default `App`). `app.config.ts` only holds the providers, i.e. the application config options.
- `app.spec.ts` ✅: I meant it *looks* like Jasmine but is Vitest. **Trainer:** accepted. The original line read as if it were Jasmine; written precisely, it's "Vitest, using Jasmine-style global APIs".
- `angular.json` ✅: build `@angular/build:application`, serve `@angular/build:dev-server`, test `@angular/build:unit-test` (I'd left them out to keep it to one line).
- `public/` ✅: `src/assets` was the default up to v17, `public/` since v18, and its files are served from the site root (`/favicon.ico`, not `/assets/...`).

**Zoneless experiment:**
- A (plain field + `setInterval`): the number did **not** update ✅. Nothing told Angular to render.
- B (`signal` + `update`): the number updated ✅.
- My observation: `c => c + 1` works, `c => c++` doesn't, `c => ++c` works.
  - **Trainer review:** this is about JavaScript, not Angular. `update()` uses the **return value** of your function. `c++` returns the *old* value (then increments a local copy that is thrown away), so the signal gets the same number again. Signals compare with `Object.is`, so "same value" means no change, no notification and no render. `++c` returns the new value, so it works, but it changes a parameter for no reason. Best practice: **`c => c + 1`**. Treat the `update` function as pure: return a new value and don't change the input. This matters a lot with arrays and objects (Day 3).

**Self-check:**
1. HttpClientModule then vs `provideHttpClient()` now; what if you forget it?
   Answer: In an AppModule app, `HttpClientModule` went in the `imports` array. Now `provideHttpClient()` goes in the `providers` array in `app.config.ts`. Both are the same. If we forget them, Angular can't do any HTTP requests/responses.
   **Follow-up (18:47):** Tested it: in v21 `HttpClient` is in the root injector by default, so `provideHttpClient()` is only needed to customize it. Forgetting it gives no error in v21, but in v20 and earlier you get `NullInjectorError: No provider for HttpClient!`. **Trainer:** ✅ now fully correct.
   **First trainer review:** 🟡 Right for Angular ≤ 20 (you'd get `NullInjectorError: No provider for HttpClient!` at runtime). ⚠️ **The trainer's question was out of date:** since **v21, `HttpClient` is provided in root by default**, so in `ng21-lab` forgetting it breaks nothing. `provideHttpClient(...)` is now only needed to **configure** it (`withInterceptors(...)`, `withFetch()`, etc.), which is how it's used in Week 2 Fri. Also, "both are the same" isn't quite right: `provideHttpClient()` is a function that takes `with*` features (tree-shakable, no module), while `HttpClientModule` is deprecated.
2. Two things that tell Angular to render in a zoneless app, and why 4A didn't update?
   Answer: — (asked the trainer for the full answer)
   **Trainer's full answer:**
   - **Core idea:** without zone.js, Angular renders **only when something notifies it** that state changed. Changing a plain class field notifies nobody.
   - **Things that notify Angular (any two answer the question):**
     1. **A signal read in a template changes** (`set()` / `update()`). Angular knows which views read that signal, marks them for refresh and schedules a render. That's what happened in 4B.
     2. **A template or host event listener fires**, e.g. `(click)`, `(input)`, `(keyup)`. Angular marks that component's view dirty after the handler runs.
     3. **The `async` pipe gets a new value.** It calls `markForCheck()` internally.
     4. **Calling `ChangeDetectorRef.markForCheck()`** yourself (the manual escape hatch).
     5. Others: setting an input via `ComponentRef.setInput()`, and attaching or creating views (e.g. the router activating a component).
   - **Why 4A didn't update:** `setInterval` changed `this.count` in memory, but nothing told Angular. In the old zone.js world, zone.js **patched** `setTimeout`, `setInterval`, promises, XHR and DOM events, so after *every* callback it triggered change detection for the whole app. That's why the same code worked in Angular 16. Without zone.js, the field changes but the DOM stays stale.
   - **Proof you can try (2 min):** go back to version A and add `<button (click)="0">poke</button>`. Click it, and the number jumps to the current value. The click (notifier #2) triggered a render, and the template read the latest field value during that pass.
   - **Interview one-liner:** "Zone.js re-checked the app after any async event. Zoneless Angular re-renders only when notified: signals, template events, the async pipe or `markForCheck()`. So state shown in templates should live in signals."
3. Old webpack builder vs `@angular/build:application`; what serves `ng serve` now?
   Answer: Previously the builder was something like webpack. Now it shows Vite: the terminal says `[vite] (client) Re-optimizing dependencies because vite config has changed`.
   **Trainer review:** 🟡 Partly correct. The old builder was webpack, and `ng serve` now uses Vite. But Vite is **only the dev server**; the bundler is **esbuild**.
   **Trainer's full answer:**
   | | Old (≈ v2–v16) | New (default for new projects since v17) |
   |---|---|---|
   | Package | `@angular-devkit/build-angular` | `@angular/build` (since v18; smaller, no webpack dependencies) |
   | `ng build` | `:browser` builder using **webpack** | `@angular/build:application` using **esbuild** (written in Go, much faster) |
   | `ng serve` | `:dev-server` = webpack-dev-server | `@angular/build:dev-server`: esbuild builds, **Vite** serves the files to the browser |
   | SSR / prerender | Separate builders (`:server`, `:prerender`) | One builder handles browser, server and prerender (`browser`, `server`, `ssr` options) |
   | Entry option | `"main": "src/main.ts"` | `"browser": "src/main.ts"` |
   | Output | `dist/app/` | `dist/app/browser/` (plus `server/` with SSR) |
   - Your terminal line is **Vite's dependency pre-bundling**: Vite bundles packages from `node_modules` (Angular, RxJS) once and caches them in `.angular/cache`, so later reloads are fast. "Re-optimizing" means it rebuilt that cache.
   - **Interview one-liner:** "Since v17 Angular builds with esbuild through the application builder, and `ng serve` uses Vite as the dev server. Builds are much faster than webpack, and one builder covers browser, SSR and prerendering."

**Code / commit:** _(add after you commit `ng21-lab` + this log)_
**Stuck on / questions:** Q2 (zoneless notifications) and Q3 (builders). Full answers written above; revise them on Sunday.
**Confidence (1–5):** 3

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
