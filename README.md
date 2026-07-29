# Tsehai Literary Hub

Build a clean, high-end, editorial Light Mode Web Application UI for "The TSEHAI Master Bibliographic & Author Portal" designed explicitly in the style of Penguin Random House (PRH) using Next.js, Tailwind CSS, Lucide React icons, and Shadcn UI components.

1. PENGUIN RANDOM HOUSE (PRH) VISUAL IDENTITY & LIGHT MODE:

- Global Background: Off-white editorial paper finish (`bg-[#F9F8F6]`).

- Primary Surfaces: Crisp white cards (`bg-white`) with fine borders (`border-neutral-200`) and subtle shadows.

- Typography: Classic PRH-style editorial serif headings (Playfair Display / Georgia) paired with modern sans-serif body text (Inter / Helvetica Neue).

- Accent Palette: PRH Brick Red (`#C41230`) or Deep Sun Orange (`#E05A00`) for primary buttons/CTAs, Slate Black (`#111111`) for titles, and Warm Amber (`#D97706`) for award badges.

2. PENGUIN RANDOM HOUSE AUTHOR PAGE LAYOUT (`/authors/[id]`):

- Hero Banner: Large author portrait container, full name in massive bold serif typography, lifespan, languages spoken/written, and a prominent "Follow Author" button.

- "ABOUT THE AUTHOR" Section: Multi-paragraph PRH biography (`authorBioPRH`), listing accolades, historical influence, and legacy.

- "AUTHOR Q&A / IN CONVERSATION": A collapsible PRH editorial Q&A section featuring 2-3 interview questions about their writing process and cultural background.

- "COMPLETE BIBLIOGRAPHY": A grid of their books featuring 3D hover tilt cover cards, filterable by publication era.

- "IF YOU READ THIS AUTHOR, YOU MIGHT ALSO LIKE": A recommendation carousel displaying 3 related authors in the catalog.

3. PENGUIN RANDOM HOUSE BOOK PAGE & DETAIL COMPONENT (`/books/[id]`):

- Book Hero Section:

  * Left: Large 3D tilted book cover preview (`/images/covers/[book_id].jpg`).

  * Right: Book Title, Subtitle, Release Year, Genre Pill, Original Language, and Translated Languages badges.

  * "BUY / ACCESS NOW" Multi-Retailer Button Bar: PRH-style dropdown/buttons for purchasing or viewing ("TSEHAI Store", "Local Bookstores", "Digital Archival Copy", "University Library Access").

- "READ AN EXCERPT" Action: A prominent button that opens a clean modal featuring the first chapter or a key dual-language quote from the text.

- "PRAISE & PRESS REVIEWS": Styled blockquote cards featuring critical acclaim, historical reviews, and press quotes (PRH endorsement style).

- "BOOK DETAILS & SPECS": Structured metadata table showing Publication Date, Page Count, Original Title, ISBN/Archive ID, and Genre Classifications.

4. WRITER PORTAL & SELF-ONBOARDING SYSTEM:

- Top Header: "Writer Portal" CTA opening a Sign In / Sign Up modal.

- Author Onboarding Wizard: Step-by-step submission form for living authors or estate representatives to register, write their PRH-style bio, upload book details, and submit for catalog inclusion.

5. SEARCH, GENRE FILTERING & AUTHOR-FIRST ROUTING:

- Smart Search: Search by Author Name, Book Title, OR Genre.

- Author-First Redirection: Searching for a BOOK TITLE displays the AUTHOR as the main result. Clicking it routes directly to the Author's full PRH profile and highlights that book.

- PRH Genre Filter Chips: Dynamic pills under the search bar (`All`, `Historical Fiction`, `Political Thriller`, `Domestic Science / Culinary`, `Philosophy`, `Verse Drama`, `Memoir`).

- Layout View Switcher: Toggle between PRH Editorial Bento Grid and Master Bibliographic Data Table.

6. AUTOMATIC IMAGE MATCHING INSTRUCTIONS:

- Implement a helper function `getSlug(text)` that converts names and titles into lowercase slugs.

- Automatically load author portraits from `/images/authors/` and book covers from `/images/covers/` based on names/titles.

- Fallback UI: Render styled avatar initials or a clean card placeholder if an image file is missing.

7. PRE-LOADED DATASET (VERIFIED ENTRIES WITH IMAGES):

Pre-load the initial catalog with ONLY these 6 verified entries:

- Senedu Gebru (1916–2009)

  * Book 1: "The Empress Menen School Cook Book" (1945) [Original Language: Amharic & English, Genre: Domestic Science / Culinary History, Badge: "1945 Culinary Archive", Availability: "Special Archival Collection / TSEHAI Archives"]

  * Book 2: "Ye-Libe Metsihaf" (1950) [Original Language: Amharic, Genre: Memoir / Short Drama, Badge: "Literary Classic", Availability: "National Library Archives / Out of Print"]

- Bealu Girma (1939–1984)

  * Book 1: "Oromay" (1983) [Original Language: Amharic, Translations: English, Genre: Political Thriller, Badge: "Banned / Political Thriller", Availability: "Reprint Available / Bookstore"]

- Maaza Mengiste (b. 1974)

  * Book 1: "The Shadow King" (2019) [Original Language: English, Translations: Italian, Spanish, Amharic, Genre: Historical Fiction, Badge: "Booker Shortlist", Availability: "Available Worldwide (Major Retailers & TSEHAI Store)"]

- Tsegaye Gabre-Medhin (1936–2006)

  * Book 1: "Tewdros" (1986) [Original Language: Amharic, Genre: Verse Drama, Badge: "Verse Drama", Availability: "In Print / Educational Distributors"]

- Haddis Alemayehu (1910–2003)

  * Book 1: "Fiqir Iske Meqabir" (1965) [Original Language: Amharic, Translations: English ("Love unto Crypt"), Genre: Classic Novel, Badge: "Amharic Masterpiece", Availability: "In Print / Retailers & Digital Libraries"]

- Zera Yacob (1600–1692)

  * Book 1: "Hatata" (1667) [Original Language: Geʽez, Translations: English, Latin, German, Genre: Philosophy, Badge: "Philosophy", Availability: "Open Access Digital Archive / Academic Publishers"]

Here is the homepage of the actual thing https://tsehaipublisher.netlify.app/ (https://v0.app/chat/tsehai-publishers-HGhSPYg5IDC)and use it as a ref for EVERYTHING. The whole thing is supposed to look like Penguin's author page (https://www.penguinrandomhouse.com/authors/a-z/?page=1). I think you understand my vision. If you want,, here are the prompts I used to make the homepage of the actual thing so you may be inpired by the UI "The image I told you to add in a bog size must be ACROSS THE WHOLE WEBSITE vertically. The typing effect should be at the "African Voices" and the sliding texts should be at the "Global Impact", with them sliding smoothly out of and inside the frame. Add this one as one of the books, read the title, and adapt the section  and do the same with these , , , . Add a wavy orange gradient spanning across the whole footer. Add these animations for the buttons, look at this code for help:, Button N° 045, and More fancy Icon buttons. 

Do all this with 2-3 credits, if more used, I will not recommend Lovable to my friends
Build a complete, responsive digital publishing platform prototype for "Tsehai Publishers" using Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, and Shadcn UI components. Include Framer Motion for smooth transitions.

---

Core Navigation & UI Structure
Implement a main application shell with a dynamic header and sidebar navigation that can switch between user views via a role selector dropdown in the header:
1. Guest View (Public Website)
2. Author Dashboard
3. Staff Dashboard (Managing Editor / Rights Manager / Admin)
4. Publishing Agency Portal

---

1. Guest View (Public Website)
- Hero Section: Bold heading, tagline, search bar, and primary CTAs ("Explore Catalog", "Submit Manuscript").
- Featured Books Carousel/Grid: Display book covers, titles, authors, genres, and badges (e.g., "New Release", "Best Seller").
- Books Catalog Page (`/books`):
  - Search bar with real-time filtering.
  - Sidebar filters for Genre (Academic, Children, History, Research, Religion, Art, Languages), Format (Hardcover, Paperback, eBook, Audiobook), and Publication Status.
  - Book Detail Modal/Page showing cover, blurbs, sample chapter preview, pricing, and metadata.
- Authors Page (`/authors`): Grid layout with photos, names, occupations, exactly 50-word bios, and linked books.
- Meet Our Team Page (`/team`): Staff cards with roles, bios, contact details, and books worked on.
- Agency Licensing Page (`/agencies`): Rights overview and interactive application form.

---

2. Author Dashboard (`/author/dashboard`)
- Sidebar Navigation: Overview, My Books, Add Book, Messages, Notifications, Contracts, Analytics.
- Overview Card Matrix: Total Submissions, Approval Rate, Reader Views, Active Notifications.
- Interactive Submission Form ("Add Book"):
  - Step 1 (Basic Info): Title, Subtitle, Genre, Age Category, Short Description, and Long Description with a live 50-word counter for the blurb.
  - Step 2 (Files Upload Dropzone): Mock uploaders for Front/Back Cover, Sample Pages, and Manuscript PDF.
  - Step 3 (Details & Rights): Page count, binding options, target audience, copyright owner, and territory rights checkboxes.
  - Step 4 (Pricing & Digital Signature): Retail price, currency selector, ownership confirmation checkbox, and a digital signature canvas/text field.
- Interactive Chat/Messaging: Author ↔ Editor conversation interface with attachment support mockups.

---

3. Staff Dashboard (`/staff/dashboard`)
- Top Bar Statistics: Pending Reviews, Average Review Time (days), Books Approved this month, Active Rights Requests.
- Review Queue Page (`/staff/queue`): Table showing pending book submissions with status badges (`Draft`, `Submitted`, `Under Review`, `Needs Revision`, `Approved`, `Rejected`).
- Comprehensive Review View:
  - Split view: Manuscript PDF preview placeholder on the left, Author metadata & controls on the right.
  - Action Bar with distinct buttons: `Approve`, `Request Revision`, `Reject`, `Save Draft`, `Assign Reviewer`.
  - Internal Notes Panel: Supporting Markdown preview and `@staff` mention formatting (e.g., `@Designer Please review cover`).
- Revision Workflow Simulation: Clicking "Request Revision" opens a structured feedback modal that triggers an inline status change.

---

4. Publishing Agency Portal (`/agency/dashboard`)
- Catalog Browsing: Select published books to add to a "Rights Request Cart."
- Rights Request Form: Select territory (Worldwide, Regional), languages, print run size, format rights (Print, Digital, Audio), and budget notes.
- Request Tracker: Pipeline view tracking request status (`Under Review`, `Agreement Pending`, `Approved`, `Contract Signed`).

---

Mock Data Requirements
Include extensive, realistic mock data for:
- 12+ Books: Across History, Academic, Children, Religion, and Languages (e.g., A History of Modern Ethiopia, Amharic Grammar & Syntax, Tales of the Abyssinian Highlands). Include realistic ISBNs, prices, and high-quality Unsplash cover artwork.
- 8+ Author Profiles: Complete with 50-word biographies, photos, social media handles, and published titles.
- 6+ Staff Profiles: Managing Editor, Rights Manager, Graphic Designer, Finance Manager, CEO, and Intern roles.
- 5+ Rights Requests & Contracts: Active negotiations with international publishing agencies.
Act as a Senior Backend & Database Engineer. Design and generate the complete backend architecture, PostgreSQL database schema, Supabase RLS policies, and serverless API endpoints for the "Tsehai Publishers Platform" using Next.js (App Router), TypeScript, and Supabase.

---

1. Database Schema (PostgreSQL / Supabase SQL)
Write a clean, production-ready SQL migration script defining tables, foreign key constraints, ENUM types, triggers, and indexes for the following entities:

- Enums: `user_role` (guest, author, agency, managing_editor, rights_manager, graphic_designer, marketing, finance, intern, admin), `submission_status` (draft, submitted, assigned, under_review, needs_revision, approved, rejected, published), `rights_status` (pending, under_review, approved, rejected, contract_signed).
- `profiles`: Tied to `auth.users` via `id`. Stores `first_name`, `last_name`, `pen_name`, `dob`, `country`, `city`, `phone`, `occupation`, `bio` (max 50 words constraint), `avatar_url`, and `role`.
- `books`: Book metadata including `title`, `subtitle`, `series`, `isbn`, `genre`, `subgenre`, `age_category`, `description`, `blurb`, `format` (paperback, hardcover, ebook, audiobook), `page_count`, `retail_price`, `wholesale_price`, `currency`, and `status`.
- `submissions`: Links `author_id` to `book_id`. Includes `assigned_editor_id`, `version_number`, `manuscript_url`, `cover_url`, `sample_url`, `submission_status`, and `digital_signature`.
- `agencies`: Agency profiles containing `company_name`, `representative_name`, `email`, `phone`, `distribution_channels`, `marketing_capacity`, `verification_status`.
- `rights_requests`: Links `agency_id` to requested `book_ids[]`. Fields for `territories`, `languages`, `print_quantity`, `marketing_plan`, `status`, and `assigned_rights_manager_id`.
- `internal_notes`: Table for staff discussions linked to a `submission_id` or `rights_request_id`, supporting `@mention` tags and file attachments.
- `messages`: Author ↔ Editor and Agency ↔ Rights Manager internal chat messages with `sender_id`, `recipient_id`, `content`, `attachment_url`, and `read_at`.
- `audit_logs`: System audit logging `user_id`, `action`, `entity_type`, `entity_id`, and `timestamp`.

---

2. Row-Level Security (RLS) Policies
Write granular Supabase RLS SQL policies enforcing strict access control:
- Authors: Read/Write access strictly to their own profiles, submitted books, draft submissions, contracts, and assigned messages.
- Publishing Agencies: Read access to `published` books only; Read/Write access to their own company profile and rights requests.
- Staff (Role-Based):
  - `admin`, `ceo`, `managing_editor`: Full access to review, reassign, and update status on all submissions.
  - `rights_manager`: Full access to agency requests and contracts.
  - `graphic_designer`: Read access to submissions and write access to assets/notes (no approval permissions).
  - `intern`: Read-only access across approved entities.

---

3. API Routes & Server Actions (Next.js / TypeScript)
Implement modular Next.js API endpoints or Server Actions with Zod validation for:

1. `POST /api/submissions/create`: Create a draft or submit a manuscript with file upload verification.
2. `PATCH /api/submissions/[id]/status`: Editor status transition handler (e.g., from `Under Review` to `Needs Revision` or `Approved`). Triggers internal notification events.
3. `POST /api/agencies/rights-request`: Agency license request pipeline processor.
4. `POST /api/notes`: Create internal staff notes with automatic parser for `@staff_id` notifications.
5. `GET /api/analytics`: Aggregate queries calculating average review time, approval rates, and pending queue counts.

---

4. File Storage & Webhooks
- Define Supabase Storage Buckets (`manuscripts`, `covers`, `contracts`) with restricted bucket policies using signed URLs.
- Include PostgreSQL database triggers to auto-update `updated_at` timestamps and append entries to `audit_logs` on critical state changes.
Tsehai Publishers Platform
Complete System Plan (Version 1.0)

This is not just a website—it's a digital publishing management system where authors, creators, publishing agencies, and staff all work in one place.

1. USER TYPES

There are four main account types.

1. Guest

Can:

Browse books
Browse authors
Browse staff
Read blog
Contact Tsehai
Search books
Request newsletter

Cannot:

Upload books
Contact authors directly
View unpublished books
2. Author / Creator

Can:

Register
Login
Manage profile
Upload books
Edit submissions
View approval status
Receive notifications
Chat with assigned editor
Download contracts
View analytics
3. Publishing Agency

Can:

Register
Browse approved books
Request publishing rights
Track requests
Download agreements
Communicate with Rights Manager
4. Staff

Staff permissions depend on role.

2. WEBSITE STRUCTURE
Home

Large hero

Featured Books

Featured Authors

About Tsehai

Our Mission

Publishing Services

Submission Process

Latest News

Meet Our Team

Contact

Footer

About

History

Mission

Vision

Values

Timeline

Partners

Books

Search

Filters

Categories

New Releases

Best Sellers

Academic

Children

History

Research

Religion

Art

Languages

Authors

Grid layout

Photo

Name

Occupation

50-word biography

Books

Profile

Agencies

Information about rights

Partner with Tsehai

Apply

FAQ

Blog

Publishing Tips

Author Interviews

Announcements

News

Contact

General inquiries

Media

Rights

Support

Location

3. AUTHOR REGISTRATION
Personal

First Name

Last Name

Pen Name

Date of Birth

Nationality

Country

City

Email

Phone

Professional

Occupation

Genres

Languages

Experience

Website

Instagram

LinkedIn

Facebook

Biography

Exactly 50 words maximum

Live counter

Photo

Profile picture

Security

Password

Confirm Password

Accept Terms

4. AUTHOR DASHBOARD

Overview

Recent Activity

Notifications

Books

Messages

Profile

Settings

Analytics

Sidebar

Dashboard

My Books

Add Book

Notifications

Messages

Contracts

Analytics

Profile

Logout

5. BOOK SUBMISSION

One submission = One book.

Basic

Title

Subtitle

Series

Edition

ISBN

Language

Genre

Subgenre

Age Category

Publication Status

Description

Short Description

Long Description

Book Blurb

Keywords

Files

Front Cover

Back Cover

Spine

Sample Pages

Complete Manuscript (PDF)

Word Document

Illustrations

Press Kit

Details

Page Count

Book Size

Binding

Paperback

Hardcover

eBook

Audiobook

Reading Time

Publication Date

Rights

Copyright Owner

Translation Rights

Territories

Adaptation Rights

Worldwide Rights

Marketing

Audience

Comparable Books

Awards

Reviews

Testimonials

Sales History

Social Links

Pricing

Retail Price

Wholesale Price

Currency

Declaration

Ownership checkbox

Digital Signature

Submit

6. Submission Workflow

Author

↓

Submission Created

↓

Status

Draft

↓

Submitted

↓

Assigned to Editor

↓

Under Review

↓

Decision

Approved

Needs Revision

Rejected

↓

Published

7. Staff Dashboard

Statistics

Today's Tasks

Pending Reviews

Recent Activity

Notifications

Quick Actions

Queues

Book Queue

Author Queue

Agency Queue

Rights Queue

Contracts

Messages

Reports

8. Review Page

Everything displayed.

Author Profile

Book Files

Description

History

Previous Revisions

Notes

Comments

Activity Timeline

Buttons

Approve

Needs Revision

Reject

Save Draft

Assign Reviewer

9. Internal Notes

Visible only to staff.

Markdown support.

Attachments.

Mention staff.

Example:

@Designer Please review cover.

10. Revision Cycle

Editor requests changes.

Author receives notification.

Status becomes

Needs Revision

Author edits

Resubmits

Status returns

Under Review

11. Publishing Agencies

Register

↓

Verification

↓

Browse Books

↓

Select Books

↓

Rights Request List

↓

Submit Request

↓

Staff Review

↓

Decision

Agency Form

Agency Name

Representative

Email

Phone

Website

LinkedIn

Company Description

Countries

Distribution Channels

Marketing Capacity

Logo

Digital Signature

Rights Request

Purpose

Requested Books

Languages

Countries

Print Quantity

Digital Rights

Audiobook Rights

Marketing Plan

Timeline

Budget Notes

Agreement Checkbox

Submit

12. Meet Our Team

Each staff profile includes

Photo

Name

Role

Biography

Email

LinkedIn

Specializations

Books Worked On

Staff login only through

/staff
13. Staff Roles
Administrator

Everything

CEO

Everything

Managing Editor

Books

Authors

Approval

Rights Manager

Agencies

Rights

Contracts

Graphic Designer

Only artwork

No approvals

Marketing

Launches

Promotions

Authors

Finance

Invoices

Payments

Intern

Read only

14. Notifications

Inside website.

Bell icon.

Examples

Book approved

Revision requested

Rights approved

Contract uploaded

Message received

Assignment received

15. Messaging

Internal messaging only.

Author ↔ Editor

Agency ↔ Rights Manager

Staff ↔ Staff

Supports

Files

Images

PDFs

Read receipts

16. Search

Books

Authors

Agencies

Staff

Blog

Advanced filters

17. Analytics

Authors

Views

Downloads

Submissions

Approval Rate

Reader Interest

Countries

Staff

Pending Reviews

Average Review Time

Books Approved

Agency Requests

18. Admin CMS

Manage

Homepage

Books

Authors

Staff

Blog

Events

Partners

Footer

Menus

FAQs

Testimonials

19. Security

Role-based permissions

Encrypted passwords

Session management

Two-factor authentication (optional)

Rate limiting

Audit logs

Secure file uploads

Automatic backups

20. Database Structure

Users

User ID
Role
Profile

Authors

Biography
Social links
Photo

Books

Metadata
Files
Status

Submissions

Review status
Assigned editor
Timeline

Agencies

Company profile
Verification

Rights Requests

Requested titles
Decision
Notes

Staff

Roles
Permissions

Messages

Conversations
Attachments

Notifications

Recipient
Type
Read status

Contracts

PDFs
Signatures
Status

Audit Logs

Action
User
Timestamp
21. Future Features
AI-assisted manuscript categorization
AI duplicate-submission detection
AI metadata suggestions
Public author verification badges
Event registration
Book launch calendar
Reviewer portal
ISBN management
Royalty tracking
Print-on-demand integration
Public API for partners
Multi-language support (English, Amharic, French)
Mobile app for authors and staff
Reader accounts with wishlists and reviews
22. Recommended Tech Stack
Frontend
Next.js
TypeScript
Tailwind CSS
Framer Motion
Backend
Supabase
Authentication
PostgreSQL
Storage
Row-Level Security
Realtime notifications
File Storage
Supabase Storage
Search
PostgreSQL Full-Text Search (upgrade to Algolia if needed)
Rich Text
TipTap Editor
PDF Preview
PDF.js
Image Optimization
Next.js Image
Deployment
Vercel
Final Workflow
Guest
   │
   ├── Browse books and authors
   │
Author ──► Register ──► Submit Book ──► Under Review
                                        │
                                        ▼
                                 Assigned Editor
                                        │
                     ┌───────────┬────────────┐
                     ▼                                   ▼                                     ▼
                 Approve     Needs Revision                     Reject
                     │                                │
                     ▼                              ▼
               Published    Author Updates
                     │
                     ▼
           Available to Agencies
                     │
Agency ──► Rights Request ──► Rights Manager Review
                                 │
                         Approve / Reject
                                 │
                                 ▼
                      Contract & Partnership



Everything must work, this is not the preview, it's the actual product.
So, to make it breif:
Build a Modern Publishing Platform for Tsehai Publishers

Create a modern, elegant, premium publishing platform for Tsehai Publishers, inspired by the clean editorial aesthetic of PSLiterary (professional typography, generous whitespace, minimal design, smooth animations), but with its own original design, branding, colors, and layout.

The platform should feel like a mix of a publishing house, literary agency, and creator portal.

Use Next.js + TypeScript + Tailwind CSS + Supabase.

Branding

Company Name:
Tsehai Publishers

Theme:

 Elegant

 Editorial

 Premium

 African heritage

 Modern

 Warm

 Minimal

Color palette:

 White

 Black

 Dark Gray

 Gold (#FF981D)

 Very subtle beige backgrounds

Rounded corners.

Soft shadows.

Professional animations.

Responsive.

Public Website Pages

Home

Hero section

Featured Books

Featured Authors

About Tsehai

Publishing Services

Submission Process

Meet Our Team

Latest News

Footer

Books

Search bar

Filters

Book cards

Book details page

Authors

Grid of authors

Each card contains

 Profile picture

 Name

 50-word biography

 View Profile button

About

Mission

Vision

History

Values

Meet Our Team

Beautiful staff cards.

Each profile contains

 Photo

 Name

 Position

 Biography

 LinkedIn

 Email

Staff login is NOT here.

This page is only public profiles.

Contact

Contact form

Office information

Google Maps placeholder

Authentication

Three account types.

 Author / Creator

 Publishing Agency

 Staff

Each has a different dashboard.

Author Registration

Fields

First Name

Last Name

Pen Name (optional)

Email

Phone

Country

City

Occupation

Website

Instagram

LinkedIn

Profile Picture

Biography

IMPORTANT:

Biography is limited to 50 words with a live word counter.

Password

Confirm Password

Accept Terms

Author Dashboard

Sidebar

Dashboard

My Books

Add Book

Notifications

Messages

Profile

Logout

Dashboard widgets

Total Books

Pending

Approved

Rejected

Recent Activity

Notifications

Add Book

One submission equals one book.

Form contains

Basic Information

 Title

 Subtitle

 Genre

 Language

 ISBN (optional)

Description

 Short Description

 Full Description

Files

 Cover Image

 Manuscript PDF

 Sample Pages (optional)

Book Details

 Page Count

 Publication Status

Declaration

Checkbox

Digital Signature (optional)

Submit

Store everything in Supabase.

Every submission has a status.

Draft

Submitted

Under Review

Needs Revision

Approved

Rejected

Published

Publishing Agency

Agency registration.

Fields

Agency Name

Representative

Email

Phone

Country

Website

LinkedIn

Company Description

Logo

Agency Dashboard

Browse Approved Books

Request Rights

My Requests

Notifications

Profile

Request Rights

Instead of a shopping cart,

Create a

Rights Request List

User can add approved books.

Then submit a request.

Request contains

Purpose

Countries

Languages

Marketing Plan

Notes

Digital Signature (optional)

Submit

Staff Dashboard

Separate login.

Role-based dashboard.

Sidebar

Dashboard

Book Submissions

Agency Requests

Authors

Books

Messages

Notifications

Settings

Dashboard

Pending Books

Pending Rights Requests

Recent Activity

Quick Statistics

Review Submission

When staff opens a book submission they can see

Author profile

Book details

Uploaded files

Timeline

Messages

Status

Buttons

Approve

Needs Revision

Reject

Every decision updates the submission status automatically.

Internal Messaging

DO NOT use email as the primary workflow.

Everything happens inside the platform.

Each book submission automatically gets its own discussion thread.

Example

Editor

"Please upload a higher resolution cover."

Author

"Done."

Editor

"Looks great."

Each conversation belongs ONLY to that submission.

Staff can message assigned authors.

Authors can only message staff assigned to their submission.

Publishing agencies can only message the Rights Manager.

Staff members can also message each other.

Support

Text

Image attachments

PDF attachments

DOCX attachments

Read receipts

Notification badge

Notifications

Notification bell.

Examples

Book approved

Book rejected

Revision requested

Rights request approved

New message

Clicking opens the related page.

Meet Our Team

Public page.

Beautiful staff cards.

Each contains

Photo

Name

Position

Biography

LinkedIn

Email

Professional layout.

Admin Features

Role-based permissions.

Administrator

Managing Editor

Rights Manager

Designer

Marketing

Intern

Each role only sees relevant pages.

Database (Supabase)

Tables

Users

Authors

Books

Book Submissions

Publishing Agencies

Rights Requests

Messages

Notifications

Staff

Roles

Activity Logs

UI

Modern.

Editorial.

Elegant.

Smooth page transitions.

Excellent typography.

Large whitespace.

Beautiful cards.

Professional forms.

Consistent spacing.

Premium publishing-house feeling.
There are 4 author pics and 4 book pics, respectively (author next to book) uploaded and also what the whole thing should FEEL like throughout the website. No logo for now.
I want everything to run smoothly and nothing to fix. I'll be showing it to my boss so I'm expecting the best of the best. Don't use ALL the credits cuz I'll be needing some to edit it.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://literaryv1.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1d58593d-6aae-4efe-b86b-348f1b8be465).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
