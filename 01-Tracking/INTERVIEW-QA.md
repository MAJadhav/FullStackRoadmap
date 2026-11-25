# Interview Question Bank

Answer each question **in your own words** below it, after you finish that week. Re-answer from memory during revision. Mark each one: 🔴 shaky · 🟡 okay · 🟢 confident.

## Angular (Weeks 1–3)
1. What problems do signals solve compared with zone.js + RxJS? When would you still use RxJS?
2. Explain `signal`, `computed`, `effect` and `linkedSignal`. Why should `effect` be used sparingly?
3. What does "zoneless" mean? What can break when you remove zone.js?
4. Difference between `@if/@for` and `*ngIf/*ngFor`. Why is `track` required in `@for`?
5. What is `@defer`? Name its triggers and sub-blocks.
6. `input()` vs `@Input()`; what does `model()` give you?
7. How do `resource()` / `httpResource()` differ from calling HttpClient in a service?
8. Signal Forms vs Reactive Forms: what changes and what stays the same?
9. How do functional guards and interceptors differ from class-based ones?
10. What is hydration? What is incremental hydration? What breaks during SSR?
11. How would you design state management for a mid-size app without NgRx?
12. What changed in Angular 22 (OnPush default, `@Service`, stable Signal Forms/Resource API)?

## Angular testing (Week 4)
13. Jasmine vs Karma: what is each responsible for?
14. Why did Angular move to Vitest?
15. How do you test a component that uses `input()` and emits `output()`?
16. How do you test an HTTP service? What does `HttpTestingController.verify()` check?
17. `fakeAsync/tick` vs `waitForAsync`. What changes in zoneless tests?
18. What would you NOT unit test?

## C# / .NET (Weeks 5–6)
19. Value vs reference types; `class` vs `struct` vs `record`.
20. `IEnumerable<T>` vs `IQueryable<T>`; what is deferred execution?
21. How does async/await work in C#? What is a deadlock risk? Why pass a `CancellationToken`?
22. Explain the middleware pipeline. Why does order matter?
23. DI lifetimes: Singleton, Scoped, Transient. What is a captive dependency?
24. Controllers vs Minimal APIs: when would you choose each?
25. How do you handle errors globally and return consistent responses (ProblemDetails)?
26. How do you keep secrets out of source control in .NET?
27. Explain the SOLID principles with an example from your project.

## SQL / PostgreSQL (Week 7)
28. INNER vs LEFT vs FULL JOIN, with an example.
29. WHERE vs HAVING.
30. What is a CTE? What is a window function? Give a use case for each.
31. Normalise this table to 3NF. When would you denormalise?
32. How do indexes work? When can an index hurt? How do you read `EXPLAIN ANALYZE`?
33. What are transaction isolation levels? What is a dirty read?

## EF Core (Week 8)
34. Code-first migrations workflow; how do you deploy migrations to production?
35. Tracking vs no-tracking queries.
36. What is the N+1 problem and how do you fix it in EF Core?
37. How do you implement optimistic concurrency with PostgreSQL?
38. Do you need a Repository pattern on top of EF Core? Argue both sides.

## Architecture + testing (Week 9)
39. Explain Clean Architecture and the dependency rule.
40. Unit vs integration tests; what is `WebApplicationFactory`? Why use Testcontainers?
41. Exceptions vs the Result pattern.

## Auth (Week 10)
42. Authentication vs authorization.
43. What is inside a JWT? Why can't you "log out" a JWT, and how do refresh tokens help?
44. Where should a SPA store tokens? Compare localStorage, memory and httpOnly cookies.
45. Role-based vs policy-based vs resource-based authorization; give a Gym App example of each.
46. How does your Angular app attach tokens and refresh them silently?
47. What is CORS and why does it exist?
48. OAuth2 vs OpenID Connect.

## Deployment + microservices (Weeks 15–16)
49. Explain a multi-stage Dockerfile for a .NET API.
50. What does your CI pipeline do on every pull request?
51. Monolith vs microservices: when would you NOT use microservices?
52. Sync (HTTP) vs async (message broker) communication between services.
53. What is an API gateway?
54. Design the Gym App for 500 gyms: multi-tenancy, scaling, caching.

## Your project (be ready to talk for 10 minutes)
55. Walk me through the architecture of your Gym App.
56. The hardest bug you hit and how you fixed it.
57. One thing you'd do differently.
