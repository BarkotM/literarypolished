## What we're building

Three distinct experiences on one site, all backed by a real database with real accounts:

1. **Author portal** — sign up, manage profile, request new books
2. **Publishing Agent (PA) portal** — sign up, browse catalogue, request to work with books, cart of requests with statuses
3. **Rights Manager console** — staff-only, opens in its own tab, sees every request from both sides and approves/rejects

Plus a public "Submission Guidelines & Parameters" section on the home page, and the catalogue rebuilt around the images you sent.

---

## 1. Entry point

- "Writer Portal" button becomes **"Get started!"**
- Clicking it opens a chooser: **I'm an Author** / **I'm a Publishing Agent** — two visually and functionally different sign-up/login flows (different fields, different copy, different colour accent).
  - Author signup: name, pen name, email, password, languages, editorial bio, genres
  - PA signup: full name, work email, password, agency/organisation name, territory, agency website, list of rights they handle
- At the bottom of the chooser: **"Login as rights manager?"** → opens the staff login **in a new tab** at `/rights` with its own stripped-back, non-editorial UI.

## 2. Rights Manager login

Four-part gate: email, password 1, password 2, organisational code. Verified entirely server-side.

- `rightsmanager@literary.com` signs in with password 1 as the real account password.
- Password 2 and the organisational code are checked on the server against stored secrets, and the console will not load without them.
- The account is created once by a database seed — the credentials never live in browser code.

Console tabs:
- **New author accounts** (pending approval)
- **Book publication requests** from authors
- **New PA accounts** (pending approval)
- **Book collaboration requests** from PAs

Each row is actionable: approve / reject / "contact literary agents".

## 3. Author account area (top-right avatar menu)

- Edit personal info (name, bio, languages, photo)
- A dashed rectangle with a **+** — "Request a new book" — opens a form (title, year, genre, language, synopsis, rights notes, cover upload)
- List of their submitted books with current status

## 4. PA account area (top-right)

- Account menu to edit agency details
- **Cart icon** next to it, showing every book they requested to work with, each with a status badge:
  - **Pending** (amber)
  - **Rejected** (grey)
  - **Contact literary agents** (green) — clickable, opens a panel with the agency contact details (placeholder email + phone for now)
- Every book page gains a "Request to work with this title" button for signed-in PAs.

## 5. Home page: Submission Guidelines & Parameters

A new section with two side-by-side step-by-step tracks — one for authors, one for PAs — each with numbered steps and a substantial rules list (eligibility, rights ownership, manuscript standards, response times, territory/exclusivity rules, conduct, grounds for rejection).

## 6. Catalogue rebuild

Replace the current placeholder authors and books with entries built from the nine images you sent — book covers wired to book pages, portraits wired to author pages. I'll assign each image to the right author/book based on the cover text visible in them, and I'll list my assignments when done so you can correct any.

---

## Technical section

- **Lovable Cloud** enabled for database, auth and file storage.
- Tables: `profiles`, `user_roles` (author / agent / rights_manager — stored in a separate table, never on the profile, to prevent privilege escalation), `authors`, `books`, `book_requests` (author→publish), `collaboration_requests` (PA→book, with the three statuses), `agencies`.
- Row-level security on every table: authors see only their own submissions, PAs see only their own requests, the rights manager sees everything via a `has_role()` security-definer check.
- Rights-manager second password and org code stored as server secrets and verified inside a server function — never shipped to the browser, never compared client-side.
- Routes: `/` (public), `/account` (author), `/agent` (PA), `/rights` (staff, `target="_blank"`), all gated by role.
- Author and PA sign-in are separate routes with separate forms; role is assigned at signup and enforced on every read/write.
- Images moved into `public/images/` and referenced by the existing slug helpers.

## One thing to flag

Sending the rights-manager credentials over chat means they should be treated as compromised for a real launch — I'll wire them exactly as specified, but you should change password 1 from the account settings before you go live.

## Questions before I build

1. Should new author/PA accounts be able to use the site immediately, or stay locked until the rights manager approves them?
2. Should the rights manager also be able to create/edit catalogue entries directly, or only approve requests?
</plan--create>

