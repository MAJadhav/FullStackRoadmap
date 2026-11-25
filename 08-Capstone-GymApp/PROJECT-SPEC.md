# Capstone: Gym Management App — Project Spec v1

**Stack:** Angular 21 → 22 (zoneless, signals) · ASP.NET Core 10 Web API · EF Core 10 + Npgsql · PostgreSQL · ASP.NET Core Identity + JWT
**Build window:** Weeks 11–14 (design ERD in Week 7, auth patterns in Week 10)
**Status:** Draft. We refine it together in Week 7 (ERD) and Week 11 Day 1.

---

## 1. Roles

| Role | Who | Can do |
|---|---|---|
| **Owner** | Gym owner (full ownership) | Everything. Manages plans, pricing and admins, **grants permissions to admins**, sees all reports/revenue |
| **Admin** | Front desk / manager | Only the **areas the Owner granted** (e.g. Members, Payments, Attendance, Classes) |
| **Trainer** *(optional)* | Staff trainer | Their own classes and the members assigned to them; adds workout plans |
| **Member** | Customer | **Only their own** profile, membership, payments, bookings, attendance and progress |

This gives you all three authorization styles:
- **Role-based:** `Owner` only → `/api/admin-permissions`
- **Policy/permission-based:** `Permission:Payments.Manage` required → Admin with that permission
- **Resource-based:** Member can `GET /api/members/{id}/progress` only when `{id}` is their own

## 2. Admin permission list (Owner assigns these)
`Members.View` · `Members.Manage` · `Plans.Manage` · `Payments.View` · `Payments.Manage` · `Attendance.Manage` · `Classes.Manage` · `Reports.View`

## 3. Core entities (first draft; finalise in Week 7)

| Entity | Key fields |
|---|---|
| AppUser (Identity) | Id, Email, FullName, Phone, IsActive |
| AdminPermission | UserId, Permission |
| MemberProfile | Id, UserId, DateOfBirth, Gender, EmergencyContact, JoinDate, Status |
| MembershipPlan | Id, Name, DurationDays, Price, Description, IsActive |
| Membership | Id, MemberId, PlanId, StartDate, EndDate, Status (Active/Frozen/Expired/Cancelled), FrozenDays |
| Payment | Id, MembershipId, Amount, Method (Cash/UPI/Card), PaidOn, ReceiptNo, RecordedBy |
| Trainer | Id, UserId, Specialisation, Bio |
| FitnessClass | Id, Name, TrainerId, Capacity, DurationMinutes |
| ClassSession | Id, ClassId, StartsAt |
| Booking | Id, SessionId, MemberId, BookedAt, Status |
| Attendance | Id, MemberId, CheckInAt, CheckOutAt, Method |
| ProgressEntry | Id, MemberId, Date, WeightKg, BodyFatPct, Notes |
| WorkoutLog | Id, MemberId, Date, Exercise, Sets, Reps, WeightKg |
| RefreshToken | Id, UserId, TokenHash, ExpiresAt, RevokedAt, ReplacedByTokenId |

## 4. Business rules (to implement + test)
1. A member can have only **one active membership** at a time.
2. EndDate = StartDate + plan DurationDays + FrozenDays.
3. Freezing has a maximum (e.g. 30 days per membership); frozen members can't check in.
4. Booking fails if the session is full, already booked by this member, or the membership is inactive.
5. Daily background job: mark memberships Expired; produce an "expiring in 7 days" list.
6. Payments can't be deleted, only reversed (audit trail).
7. Only the Owner can create Admins or change permissions.

## 5. API outline (REST, `/api/...`)
- `auth`: register-member (by Admin), login, refresh, logout, change-password
- `plans`: CRUD (Plans.Manage)
- `members`: list (paged/search), get, create, update, deactivate (Members.*)
- `members/{id}/memberships`: subscribe, freeze, cancel
- `payments`: record, list, reverse (Payments.*)
- `attendance`: check-in, check-out, list
- `classes`, `sessions`, `bookings`
- `me/*`: my profile, membership, payments, bookings, attendance, progress (Member)
- `reports`: revenue by month, active members, expiring soon (Reports.View)
- `admin-permissions`: Owner only

## 6. Angular app outline
- `core/` auth store (signals), interceptors (token, refresh, errors), guards (`roleGuard`, `permissionGuard`)
- `layouts/` owner-layout, admin-layout, member-layout
- `features/` dashboard, plans, members, memberships, payments, attendance, classes, my-portal
- `shared/` UI components, pipes, form controls

## 7. Folder plan
```
08-Capstone-GymApp/
├── PROJECT-SPEC.md
├── backend/      ← GymApp solution (Domain, Application, Infrastructure, Api, Tests) — Week 11
└── frontend/     ← gym-app-web (Angular) — Week 13
```

## 8. Definition of done
- [ ] All rules in §4 enforced + covered by tests
- [ ] All 3 auth styles demonstrated
- [ ] Backend tests (unit + integration) and frontend tests ≥ 70% coverage on core logic
- [ ] Upgraded to Angular 22
- [ ] Deployed free with a live URL; README with screenshots + architecture diagram
