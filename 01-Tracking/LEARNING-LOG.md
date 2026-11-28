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

### Week 1 · Day 2 · 28 Nov 2026 · ~2.5 h (estimate, correct it if wrong)
**Topic:** Built-in control flow: `@if / @else if / @else`, `@for` with required `track`, `@empty`, `@switch`, `@let`

**Warm-up (Day 1 recall, no notes):**
- My answer: 4A didn't update because the value changed but nothing told Angular to render. In zoneless Angular, signals, host and template event listeners (`click`, `input`…) and the `async` pipe getting a new value all notify Angular.
- **Trainer review:** ✅ Correct, and with 3+ notifiers named. The Day 1 Q2 gap is closed. Remaining one to remember: `ChangeDetectorRef.markForCheck()` (the manual escape hatch).

**What I did:**
- Built `ProductList` (`src/app/products/product-list/`) with gym products from `product.model.ts`, rendered from `app.html`.
- State in signals: `products`, `searchTerm`, `category`, plus a `computed()` called `filtered` (case-insensitive name search + category filter).
- Search box without `FormsModule`: `#box (input)="searchTerm.set(box.value)" [value]="searchTerm()"`, a hand-made two-way binding.
- Category buttons with `[class.active]`, `@for` + `track product.id`, `@if/@else` for the discount price, `@switch` for the stock dot, `@empty` row with a Clear button, Shuffle button.
- Ran the `track` experiment (results below).
- **My change:** used `$odd` instead of `$even` for the zebra rows, because row numbers are `$index + 1`, so `$odd` (index 1, 3, 5) greys out displayed rows 2, 4, 6.

**What I learned (in my own words):**
- Control flow is built into the compiler: no `NgIf`/`NgFor`/`CommonModule` imports, no `<ng-template>`/`<ng-container>` wrappers, and better type narrowing (`@if (x(); as v)`).
- `track` tells Angular which item each DOM row belongs to. Good identity = existing DOM rows are moved or kept instead of destroyed and rebuilt.
- `#ref` on an `<input>` gives the template the real DOM element, so `ref.value` is the typed text. `(input)` alone only goes box → signal; `[value]` is needed for signal → box (that's why Clear works).

**Trainer code review (commit `661f579`):**
| # | Item | Verdict |
|---|---|---|
| 1 | Signals + `computed()` for `filtered`, Shuffle returns a **new** array | ✅ Right, and it applies the Day 1 `Object.is` lesson |
| 2 | `[value]` + `(input)` hand-made two-way binding | ✅ Exactly what `ngModel` does for you behind the scenes |
| 3 | `@if/@else` price, `@switch` stock, `@empty` row with `colspan="4"` | ✅ `@empty` inside a table with colspan is a nice touch |
| 4 | `$odd` instead of `$even` | ✅ Correct reasoning. `$even`/`$odd` describe the 0-based `$index`, not the displayed number |
| 5 | **`@let` not used** (acceptance criterion 4) | ❌ The header uses `{{filtered().length}}` directly. Fix: `@let shown = filtered().length;` and `@let total = products().length;` above the `<h5>`, then `Showing {{ shown }} of {{ total }}` |
| 6 | **Clear resets only `searchTerm`** (criterion 7 said both signals) | 🟡 Screenshots: search "wh" + Equipment → Clear → Equipment stays selected. Rename `clearSearch()` → `clearFilters()` and also `category.set('all')` |
| 7 | `let i = $index, last = $last` declared but never used | 🟡 Either use `{{ i + 1 }}` or delete the aliases. Unused template variables are noise |
| 8 | Build warning **`NG8113: RouterOutlet is not used within the template of App`** | 🟡 `app.html` no longer has `<router-outlet>`, but `app.ts` still imports `RouterOutlet` (plus unused `inject`, `OnInit`). Since v19 the compiler warns about unused standalone imports. Remove them now and add the outlet back for lazy routes on Day 6 |
| 9 | `p.name.toLocaleLowerCase()` vs `term.toLowerCase()` | Nit: use the same method on both sides. `toLocale…` can behave differently in some locales (e.g. Turkish "I") |
| 10 | Empty message says `No products match ''` when the search is empty but the category has no items | Optional: a good `@if` exercise. `@if (searchTerm()) { …match '{{searchTerm()}}' } @else { No products in this category }` |

**`track` experiment:**
- `track product.id`: typed a note in the Whey Protein row, shuffled → the note **moved with Whey Protein**.
- `track $index`: same steps → the note **stayed in row 1**, now next to a different product.
- **Why (trainer):** the note's text lives in the **DOM** (`<input>`'s own value), not in any signal. With `track product.id` Angular sees the same keys in a new order and **moves** the existing `<tr>` elements, so the input travels with its product. With `track $index` the keys are 0, 1, 2… before and after the shuffle, so Angular thinks every row is the same item, **keeps every `<tr>` where it is** and only rewrites the bindings (name, price, stock). The unbound input keeps its old text. The same bug shows up with focus, scroll position, animations and child component state. **Use `$index` only for lists that never reorder.**

**Compile errors (trainer ran these on your code with Angular 21.2.26, real output):**
1. Remove `track`:
   ```
   ✘ [ERROR] NG5002: @for loop must have a "track" expression
       src/app/products/product-list/product-list.html:28:12
   ```
   `track` is enforced at **compile time**, so the app won't even build. Compare `trackBy`, which was optional and silently missing in most codebases.
2. Use a `@let` before declaring it (`{{ shown }}` on line 16, `@let shown = …` on line 17):
   ```
   ✘ [ERROR] NG8016: Cannot read @let declaration 'shown' before it has been defined.
   ```
   `@let` is **not hoisted**. It works like `const`/`let` in JS (temporal dead zone), not like `var`.
3. Extra: assign to a `@let` (`(click)="total = 0"`):
   ```
   ✘ [ERROR] NG8015: Cannot assign to @let declaration 'total'.
   ```
   `@let` is **read-only**. To change something, change the signal it reads from.

**Optional bonus (trainer ran it in a scratch copy, nothing committed):**
- Wrote an `OldList` component with `*ngIf … else noData`, `*ngFor … trackBy: trackById`, `[ngSwitch]`/`*ngSwitchCase`/`*ngSwitchDefault`, importing `NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault`.
- **`ng build` gives no deprecation warning.** The deprecation is a JSDoc `@deprecated` tag in Angular's typings, so you only see it as **strikethrough in VS Code** (hover shows "Use the `@if` block instead…").
- Ran `ng generate @angular/core:control-flow --path src/app/old-list`. It rewrote the template and **also emptied the `imports` array** in the `.ts`:
  ```html
  @if (products().length > 0) {
    <ul>
      @for (p of products(); track trackById(i, p); let i = $index) {
        <li>
          {{ i + 1 }}. {{ p.name }}
          @switch (p.stock) {
            @case ('low') { <span>Low</span> }
            @case ('in-stock') { <span>In stock</span> }
            @default { <span>Out</span> }
          }
        </li>
      }
    </ul>
  } @else {
    <p>No products</p>
  }
  ```
- Things to notice: `<ng-template #noData>` became `@else`, the `<ng-container [ngSwitch]>` wrapper disappeared, and the old `trackBy` function was kept as **`track trackById(i, p)`**. It works, but after migrating by hand you'd simplify it to `track p.id` and delete the function.

**Self-check (my answers → trainer review):**
1. **`track p.id` vs `track $index` after a shuffle?**
   My answer: with `p.id` the note followed Whey Protein; with `$index` it stayed at index 0, because Angular compares by id vs by index, and the indexes don't change.
   **Trainer:** ✅ Correct. Precise version: the note lives in the DOM, and `track` decides whether Angular **moves DOM nodes** (id) or **keeps them in place and re-binds data** (index). See the experiment explanation above.
2. **Why is `track` required when `trackBy` was optional?**
   My answer: without trackBy, lists rebuilt their DOM on every change, which costs performance on large lists, and because it was optional devs forgot it.
   **Trainer:** 🟡 The second half is right; the first half overstates it. Without `trackBy`, `*ngFor` tracked by **object reference**, so it did *not* rebuild on every change. It rebuilt when the **references** changed: e.g. re-fetching the list from an API gives new objects with the same ids, so every row was destroyed and re-created (expensive, and you lose DOM state: focus, typed input, scroll, animations). **Corrected answer:** "Identity is the decision that matters most for list performance and correctness, and the old default (object reference) broke as soon as data was re-fetched or made immutable. Making `track` required forces you to choose identity explicitly, and the new `@for` diffing is built around it."
3. **Week 14 upgrade to v22: risk of a leftover `*ngIf`, and the migration command?**
   My answer: deprecated since v20 in favour of control flow; likely removed in v22; `ng generate @angular/core:control-flow`.
   **Trainer:** 🟡 The command ✅ and the v20 deprecation ✅. ⚠️ **"Removed in v22" was the trainer's mistake** (it came from 2025 articles and an older docs note "Intent to remove in v22"). Checked on npm on 28 Nov 2026: **Angular 22.3.0 (latest) still ships `NgIf`/`NgFor`/`NgSwitch`**, still deprecated, and the JSDoc now reads "Intent to remove in a **future major release**" (same text in your 21.2.26). **Corrected answer:** "Deprecated since v20, not yet removed as of v22.3. Leftover `*ngIf` still compiles after the Week 14 upgrade, but it's technical debt that breaks whenever a future major removes it, and the migration is one command: `ng generate @angular/core:control-flow` (also offered during `ng update`). Re-check the removal version in the v22→next update guide."
4. **`@let total = …` in the template vs `computed()` in the class: when to use each?**
   My answer: `@let` if it's calculated from the computed output and only used in the template. (Didn't understand the question fully.)
   **Trainer:** 🟡 On the right track. The question is about **where a derived value should live**:
   | Use `computed()` in the class when… | Use `@let` in the template when… |
   |---|---|
   | It's **logic** (filtering, sorting, totals, business rules) | It's **presentation only**: a short alias or display-only arithmetic |
   | TypeScript code needs it too (methods, other `computed`s, services) | Only this template reads it |
   | You want to **unit-test** it (Week 4: `expect(component.filtered().length)…`) | It avoids repeating a long expression, e.g. `@let user = user$ \| async;` (subscribe once) |
   | It's expensive: `computed()` **caches** and only recalculates when a dependency signal changes | It's cheap. `@let` is a template expression, re-evaluated whenever the view is checked, like `{{ }}` |
   In your code: `filtered` → `computed()` ✅ (logic, testable). "Showing X of Y" → `@let shown = filtered().length` ✅ (display alias reading an already-cached computed).
   **Interview one-liner:** "Derived *state* goes in `computed()`: cached, testable, reusable. `@let` is a read-only template alias for *presentation*. It removes repetition but holds no logic."

**Code / commit:** `661f579 Week 1 Day 2: built in control flow product list`. Fix-up for review items 5–8: _(add commit)_
**Stuck on / questions:** Template ref `#box` + `(input)` (explained in chat; summary under "What I learned"). Self-check Q4 wording.
**Revise on Sunday:** Q2 (what the old default tracking actually was) + Q4 (`computed` vs `@let` table).
**Confidence (1–5):** 5

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

**Code / commit:** `b94cced Week 1 Mon: ng21-lab project anatomy`
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
