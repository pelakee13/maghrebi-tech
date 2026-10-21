# Feature Specification: Professional Bilingual Portfolio Website (maghrebi.tech)

**Feature Branch**: `001-portfolio-website`

**Created**: 2026-10-21

**Status**: Draft

**Input**: User description: "Build a personal, professional portfolio website for the domain maghrebi.tech for Amin Maghrebi (process and sales automation, Telegram bot design and development, smart business systems for web and mobile, AI training, design, writing, programming). Goal: showcase services, portfolio, articles/tutorials and attract clients. Pages: Home, About, Services, Portfolio, Blog, Contact, Resume (with PDF download). Current projects: Heli Beauty Studio (salon management web app), Telegram trader bot, running app. Services: smart business systems, Telegram bots, support and maintenance, AI training. Header with name, navigation and language switch; hero on home; highlighted services and projects; simple footer with contact info and social placeholders; simple contact form. Initial copy written by the assistant, professional, concise, trustworthy. Content separate per language; Persian is the default."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand who Amin is and what he offers (Priority: P1)

A potential client lands on the home page (usually in Persian), reads a clear hero statement, sees the
four main services and the featured projects, and understands within seconds what Amin does and that
he is credible.

**Why this priority**: The site exists to present services and win clients. Without a compelling home
page and service overview there is no value in the rest of the site.

**Independent Test**: Open the home page as a new visitor; confirm the hero, service highlights,
featured projects, and a clear call to action to contact are all visible and navigable.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site root, **When** the page loads, **Then** they are shown the Persian
   home page with a hero (name, role, short value statement, primary call to action), a highlighted
   services section, and a highlighted projects section.
2. **Given** a visitor is on the home page, **When** they select a service or project highlight,
   **Then** they reach the corresponding Services or Portfolio detail content.
3. **Given** a visitor is on the home page, **When** they select the call to action, **Then** they
   reach the Contact page.

---

### User Story 2 - Contact Amin as a prospective client (Priority: P1)

A visitor who wants to hire Amin or ask a question fills in a simple contact form (name, email,
message) and submits it, receiving clear confirmation. Direct contact details are also available in
the footer.

**Why this priority**: Lead generation is the primary business goal of the site.

**Independent Test**: Submit the contact form with valid data and verify confirmation and delivery to
Amin; submit with invalid data and verify helpful validation messages.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Contact page, **When** they enter a valid name, email and message and
   submit, **Then** they see a success confirmation in their current language and the message is
   delivered to Amin.
2. **Given** a visitor submits the form with a missing or malformed field, **When** validation runs,
   **Then** they see a specific error next to the field in their current language and their entered
   data is preserved.
3. **Given** a visitor is on any page, **When** they look at the footer, **Then** they see contact
   information and social media link placeholders.

---

### User Story 3 - Switch between Persian and English (Priority: P1)

A visitor reads the site in Persian by default and can switch to English (or the reverse) at any time
using the language switcher in the header. All content, layout direction and formatting adapt.

**Why this priority**: Bilingual presentation is a core requirement and affects every page.

**Independent Test**: On each page, switch language and confirm the same page opens in the other
language with correct text direction and fully translated content.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** the site opens, **Then** the content is Persian and laid out
   right-to-left.
2. **Given** a visitor is on any page, **When** they use the language switcher, **Then** the same page
   opens in the other language, with left-to-right layout for English and right-to-left for Persian.
3. **Given** a page exists in one language, **When** the visitor switches language, **Then** a
   corresponding page always exists in the other language (no dead ends).

---

### User Story 4 - Explore services and portfolio (Priority: P2)

A visitor reviews the full list of services (smart business systems for web and mobile, Telegram bots,
support and maintenance, applied AI training) and the portfolio of projects (Heli Beauty Studio,
Telegram trader bot, running app), each with a short description and the value it delivers.

**Why this priority**: Detailed proof of capability supports the decision to make contact, but it
builds on the home page overview.

**Independent Test**: Open the Services and Portfolio pages and confirm every listed service and
project is present with a title, description and a path to contact.

**Acceptance Scenarios**:

1. **Given** a visitor opens Services, **When** the page loads, **Then** all four services are shown
   with a title, description, typical use cases, and a contact call to action.
2. **Given** a visitor opens Portfolio, **When** the page loads, **Then** the three current projects
   are listed with name, type, short description, and role/outcome.
3. **Given** a project has a public link or detail view, **When** the visitor selects it, **Then** the
   details are shown or the external link opens in a new tab.

---

### User Story 5 - Read articles and tutorials (Priority: P2)

A visitor browses the blog, opens an article, and reads it in their language. Articles demonstrate
expertise in automation, bots and AI.

**Why this priority**: Articles build trust and search visibility over time, but the site is useful
before many posts exist.

**Independent Test**: Open the blog list, open one article, and confirm title, date, readable body, and
navigation back to the list.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Blog page, **When** the page loads, **Then** published articles for
   the current language are listed, newest first, each with title, date and summary.
2. **Given** a visitor selects an article, **When** it opens, **Then** they see the full article with
   title, date, and content readable in the correct direction.
3. **Given** no articles exist yet in a language, **When** the visitor opens the Blog, **Then** a
   friendly empty-state message is shown instead of a blank page.

---

### User Story 6 - Learn about Amin and download his resume (Priority: P2)

A visitor reads the About page (background, skills, approach) and the Resume page, and downloads the
resume as a PDF in the language they are viewing.

**Why this priority**: Supports credibility and is useful for employers and collaborators, in
addition to clients.

**Independent Test**: Open About and Resume pages, then trigger the PDF download in each language and
verify the right file is received.

**Acceptance Scenarios**:

1. **Given** a visitor opens About, **When** the page loads, **Then** they see Amin's story, areas of
   expertise and working approach in a professional, concise tone.
2. **Given** a visitor opens Resume, **When** the page loads, **Then** they see the resume summarised
   on the page together with a visible Download PDF action.
3. **Given** a visitor selects Download PDF, **When** the action completes, **Then** they receive the
   resume file in the language of the page they are viewing.

---

### Edge Cases

- A visitor requests a page address with an unsupported language or non-existent page: they see a
  helpful "not found" page in a supported language with links to Home and Contact.
- A visitor's browser prefers English: the site still opens in Persian by default; the language
  switcher is clearly visible to change it.
- Contact form is submitted repeatedly or by automated bots: the form limits abuse and does not
  flood Amin's inbox, without blocking genuine users.
- Contact form delivery fails: the visitor is told that sending failed and is offered the direct
  contact details; their message text is preserved.
- Long Persian or English text, or mixed-direction text (e.g. English product names inside Persian
  sentences): layout does not break and text displays in the correct order.
- A resume PDF for one language is missing: the download action is hidden or disabled rather than
  leading to a broken link.
- Social media links are placeholders: they are not shown as dead links to visitors until real
  addresses are provided.
- Visitor uses a small mobile screen or slow connection: all pages remain readable and usable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST provide seven pages in each of the two languages: Home, About, Services,
  Portfolio, Blog (list and individual article), Contact, and Resume.
- **FR-002**: The site MUST present Persian as the default language and MUST allow switching to English
  from every page via a language switch control in the header; switching MUST keep the visitor on the
  equivalent page.
- **FR-003**: Persian pages MUST display right-to-left and English pages MUST display left-to-right,
  including navigation, forms, lists and spacing.
- **FR-004**: All textual content (page copy, project descriptions, services, articles, labels, form
  messages, metadata) MUST be maintained separately per language so that one language can be edited
  without affecting the other.
- **FR-005**: Every page MUST show a header containing Amin's name, the main navigation to all
  pages, and the language switch control; the header MUST remain usable on mobile screens.
- **FR-006**: The Home page MUST include a hero section (name, role, concise value statement, primary
  call to action to Contact and a secondary action to view work), a highlighted selection of services,
  and a highlighted selection of projects.
- **FR-007**: The Services page MUST describe the four services: smart business systems (web and
  mobile apps), Telegram bots (automated replies, order registration, reporting and similar), support
  and maintenance, and applied project-based AI training.
- **FR-008**: The Portfolio page MUST present the three current projects: Heli Beauty Studio (a
  salon business-management web app), a Telegram trader bot, and a running app; and MUST allow adding
  future projects without redesigning the page.
- **FR-009**: The About page MUST present Amin's background and areas of work: process and sales
  automation, Telegram bot development, smart business systems, AI training, design, writing and
  programming.
- **FR-010**: The Blog MUST list published articles per language (newest first) and allow reading each
  article on its own page; the system MUST show an empty-state message when no articles exist.
- **FR-011**: The Resume page MUST show a summary of the resume and a Download PDF action that
  delivers the PDF in the visitor's current language.
- **FR-012**: The Contact page MUST provide a form with name, email and message fields; MUST validate
  input with clear, localized messages; and MUST confirm successful submission to the visitor.
- **FR-013**: In v1, a valid contact submission MUST show a success confirmation and be recorded in a server log without
  message content (no real email delivery); the page MUST show direct contact details (email, Telegram). When real delivery
  is added later, delivery failure MUST be communicated with an alternative way to reach Amin.
- **FR-014**: The contact form MUST include protection against automated/spam submissions.
- **FR-015**: Every page MUST include a footer with contact information and clearly reserved places for
  social media links; placeholder links MUST NOT appear as broken or empty links to visitors.
- **FR-016**: The site MUST ship with professionally written initial copy (concise, trustworthy,
  engaging) in both Persian and English for all pages, the three projects and the four services, plus
  at least one starter article per language.
- **FR-017**: The visual design MUST follow the project constitution: dark theme with navy background
  and cyan accent, Persian and English typography as defined there, consistent across all pages.
- **FR-018**: Every page MUST be discoverable by search engines in both languages, with unique titles
  and descriptions per page and per language, and with correct language alternates.
- **FR-019**: The site MUST remain fully usable on phones, tablets and desktops, and MUST be accessible
  (keyboard navigation, readable contrast, text alternatives for images).
- **FR-020**: Unknown addresses MUST show a friendly localized "not found" page with links back to Home
  and Contact.

### Key Entities *(include if feature involves data)*

- **Page Content**: The localized copy for a page (title, headings, paragraphs, call-to-action labels,
  search description); exists once per language per page.
- **Service**: A offering with title, short summary, detailed description, typical use cases, and an
  order for display; localized per language.
- **Project**: A portfolio item with name, type (web app, bot, mobile app), summary, role/outcome,
  optional link, optional image, featured flag; localized per language.
- **Article**: A blog post with title, slug, publication date, summary, body, optional cover image;
  belongs to exactly one language.
- **Resume**: The resume summary shown on the page and one downloadable PDF per language.
- **Contact Message**: A visitor submission with name, email, message, timestamp and language.
- **Social Link**: A named external profile link (platform, address), shown only when an address is
  provided.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can correctly state what Amin offers within 15 seconds of opening
  the home page (validated with a quick test of at least 5 people).
- **SC-002**: A visitor can reach the Contact form from any page in at most 2 interactions and submit
  it in under 1 minute.
- **SC-003**: 100% of pages and content items are available in both Persian and English, with
  correct text direction, verified by reviewing every page in both languages.
- **SC-004**: Every page displays its main content in under 2 seconds on a typical mobile connection.
- **SC-005**: At least 95% of contact form submissions by genuine visitors succeed on the first
  attempt (v1: confirmation shown and submission logged; delivery to Amin applies once email sending is enabled).
- **SC-006**: Switching language keeps the visitor on the equivalent page in 100% of cases.
- **SC-007**: The resume PDF downloads successfully in both languages from the Resume page in one
  action.
- **SC-008**: All primary pages meet common accessibility and search-quality benchmarks, scoring at
  least 90 out of 100 in standard automated audits.

## Assumptions

- The site is a public, read-only presentation site; visitors do not create accounts or log in.
- Primary audience is Persian-speaking business owners; the secondary audience is English-speaking
  clients and employers.
- Initial copy is written by the assistant from the information provided and will be reviewed and
  adjusted by Amin before launch; no testimonials, statistics, or client names are invented.
- Contact details supplied by the owner: email `amin.mb21@gmail.com` and Telegram `@aminmaghrebi`. No phone number is
  published (owner's choice). Social profiles: LinkedIn, GitHub and X (URLs recorded in the plan's site configuration).
  The owner should confirm the LinkedIn/GitHub/X URLs belong to him before launch (their handles differ from his name).
- Resume PDFs are needed per language. An English resume exists (docx, needs PDF export). The Persian PDF is NOT yet available:
  the only Persian PDFs found on the owner's machine are an accountant resume containing home address, phone, father's
  name and birth date, which must not be published. Until a suitable Persian PDF is supplied, the download button is hidden for `fa`.
- **Decision (v1)**: the contact form performs full validation and spam checks and shows the success confirmation, but
  does NOT send real email (no email provider account yet); the submission is only logged on the server without
  message content. Real delivery is a deferred follow-up. The email and Telegram handle remain visible as direct contact.
- Blog content is added by Amin through content files added to the site, not through an online admin
  panel; a comment system and newsletter are out of scope for the first release.
- The three listed projects are the only portfolio items at launch; neutral visual placeholders are used for all
  project images (screenshots to be supplied later).
- Analytics, cookie consent banners, and payment or booking features are out of scope for the first
  release.
- Technology choices, design tokens, fonts, and quality gates are governed by the project
  constitution (v1.0.0) and are decided in the planning phase, not in this specification.
