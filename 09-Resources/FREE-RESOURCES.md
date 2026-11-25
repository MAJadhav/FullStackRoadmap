# Free Resources

All free. Official documentation comes first: it is always current, while videos and blogs go out of date quickly.
⚠️ Free-tier limits and product names change. Check the provider's own pricing page before you rely on one.

## Official documentation (primary sources)
| Topic | Where |
|---|---|
| Angular (docs, tutorials, update guide) | https://angular.dev · update guide: https://angular.dev/update-guide |
| Angular release notes | https://github.com/angular/angular/releases |
| Jasmine | https://jasmine.github.io |
| Karma | https://karma-runner.github.io |
| Vitest | https://vitest.dev |
| C# language + .NET | https://learn.microsoft.com/dotnet/csharp/ |
| ASP.NET Core | https://learn.microsoft.com/aspnet/core/ |
| EF Core | https://learn.microsoft.com/ef/core/ |
| ASP.NET Core Identity / auth | https://learn.microsoft.com/aspnet/core/security/ |
| .NET support policy (versions) | https://dotnet.microsoft.com/platform/support/policy/dotnet-core |
| Npgsql (PostgreSQL provider for .NET/EF) | https://www.npgsql.org |
| PostgreSQL | https://www.postgresql.org/docs/ |
| xUnit | https://xunit.net |
| Testcontainers for .NET | https://dotnet.testcontainers.org |
| Docker | https://docs.docker.com |
| GitHub Actions | https://docs.github.com/actions |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |

## Free learning platforms
- **Microsoft Learn**: free modules and learning paths for C#, ASP.NET Core and EF Core (search "ASP.NET Core" on learn.microsoft.com).
- **Angular's official YouTube channel** and **.NET's official YouTube channel**: release talks and deep dives.
- **Free video courses on YouTube** are fine for a second explanation. Pick ones published **after Nov 2025** for Angular (zoneless/Vitest era) and for .NET 10, because older content teaches outdated defaults.

> I'm deliberately not listing specific YouTube course titles or blog URLs from memory, because I can't verify them right now. When you reach a week, ask me and I'll search for current, well-reviewed free material for that topic.

## Free tools
| Need | Tool |
|---|---|
| API testing | Bruno (open source) or Postman free plan |
| DB GUI | pgAdmin (ships with PostgreSQL) or DBeaver Community |
| ER diagrams | draw.io (diagrams.net) |
| JWT inspection | jwt.io |
| Fake data API (Phase 1) | JSONPlaceholder |
| Containers | Docker Desktop (free for personal use) |

## Free deployment options (checked 25 Nov 2026 via web search; verify before use)
| Layer | Options | Watch out for |
|---|---|---|
| PostgreSQL | **Neon**, **Supabase**, Aiven | Small storage/compute limits. Render's free Postgres **expires after ~30 days**, so don't use it for the capstone |
| .NET API | **Render** (deploy via Docker; no native .NET runtime) | Free service **sleeps after ~15 min idle**; first request ~30 s |
| Angular SPA | Cloudflare Pages, Netlify, GitHub Pages, Render static sites | Configure SPA fallback to `index.html` |
| CI/CD | GitHub Actions | Free minutes for public repos |
