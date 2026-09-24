# Splice Works Website Architecture

**Run ID:** RUN-SPLICEWORKS-001
**Phase:** architecture
**Version:** 1.0.0
**Date:** 2026-09-06

---

## 1. Framework Decision

**Next.js 14+ with App Router**

The site uses Next.js App Router for:
- Static site generation (SSG) for all marketing pages
- Build-time generation of machine routes
- Route groups for layout organization
- Server Components by default (minimal client-side JS)

---

## 2. App Router Structure

```
app/
├── (marketing)/              # Route group: shared marketing layout
│   ├── layout.tsx            # Marketing layout with header/footer
│   ├── page.tsx              # Homepage (/)
│   ├── services/
│   │   └── page.tsx          # /services
│   ├── station/
│   │   └── page.tsx          # /station
│   ├── how-we-work/
│   │   └── page.tsx          # /how-we-work
│   ├── security/
│   │   └── page.tsx          # /security
│   ├── about/
│   │   └── page.tsx          # /about
│   ├── contact/
│   │   └── page.tsx          # /contact (client component for form)
│   └── faq/
│       └── page.tsx          # /faq
│
├── (machine)/                # Route group: machine-readable routes
│   ├── llms.txt/
│   │   └── route.ts          # GET handler, text/plain
│   ├── llms-full.txt/
│   │   └── route.ts          # GET handler, text/plain
│   └── capabilities.json/
│       └── route.ts          # GET handler, application/json
│
├── api/
│   ├── contact/
│   │   └── route.ts          # POST handler for form submission
│   └── contact-schema/
│       └── route.ts          # GET handler, JSON Schema
│
├── layout.tsx                # Root layout (html, body, fonts, theme)
├── globals.css               # Global styles with design tokens
├── not-found.tsx             # 404 page
└── error.tsx                 # Error boundary
```

---

## 3. Layout Architecture

### Root Layout (`app/layout.tsx`)

Responsibilities:
- HTML document structure
- Font loading (Bricolage Grotesque, Space Mono)
- Theme provider (Paper/Ink toggle)
- Mode provider (Human/Agent toggle)
- Metadata defaults

```tsx
// Providers hierarchy
<html lang="en" data-theme="paper">
  <body>
    <ThemeProvider>
      <ModeProvider>
        {children}
      </ModeProvider>
    </ThemeProvider>
  </body>
</html>
```

### Marketing Layout (`app/(marketing)/layout.tsx`)

Responsibilities:
- Sticky header with navigation
- Theme/mode toggle controls
- Footer with endorsement logo
- Skip-to-content link

Structure:
```tsx
<div className="layout-marketing">
  <Header />
  <main id="main-content">
    {children}
  </main>
  <Footer />
</div>
```

### Machine Routes

No layout wrapper. Return raw content with appropriate Content-Type headers.

---

## 4. Page Components

### Homepage (`/`)

**Sections (in order):**

| Section | Component | Data Source | Notes |
|---------|-----------|-------------|-------|
| Hero | `HabitatHero` | Static + props | Isometric Station visualization |
| Outcome input | `OutcomeInput` | Static | "What do you want to change?" |
| 4 Stages | `StagesSection` | content/stages.json | Discover, Design, Deploy, Operate |
| Services | `ServicesOverview` | content/services.json | 5 service cards |
| Station | `StationSection` | content/station.md | Control plane explanation |
| Governance | `GovernanceSection` | content/governance.md | Gates, approvals, evidence |
| Deployment | `DeploymentSection` | content/deployment.md | Hosted/Self-hosted/Hybrid |
| Proof | `ProofSection` | content/proof.json | Evidence and artifacts |
| Contact CTA | `ContactCTA` | Static | Final call-to-action |

### Services (`/services`)

5 expandable service cards:
1. Assessment
2. Hardening
3. Delivery
4. Station Deployment
5. Operations

Each card shows:
- Service name
- Brief description
- What you get (deliverables)
- Typical timeline
- Call-to-action

### Station (`/station`)

Explains the control plane:
- What Station does
- Agent orchestration
- Gate enforcement
- Evidence tracking
- Human/Agent mode views
- Deployment options

### How We Work (`/how-we-work`)

Visual journey through 4 stages:
- Discover
- Design
- Deploy
- Operate

Each stage includes:
- Stage name and number
- Description
- Activities
- Deliverables
- Transition criteria

### Security (`/security`)

Security-first positioning:
- Principles
- Access controls
- Audit trails
- Compliance alignment
- Data handling

### About (`/about`)

Company context:
- Relationship to Splice Labs
- Mission
- Team approach

### Contact (`/contact`)

**Client Component** (requires form state)

Fields:
- Name (required)
- Email (required)
- Company
- Role
- Service interest (select)
- Timeline (select)
- Message (textarea)

Submission: POST to `/api/contact`

### FAQ (`/faq`)

Accordion-style Q&A:
- Grouped by category
- Expandable items
- Deep links to specific questions

---

## 5. Component Hierarchy

```
components/
├── layout/
│   ├── Header.tsx            # Sticky header, nav, toggles
│   ├── Footer.tsx            # Footer with links, endorsement
│   ├── Navigation.tsx        # Header navigation links
│   └── SkipLink.tsx          # Accessibility skip link
│
├── sections/
│   ├── HabitatHero/          # Homepage hero
│   │   ├── HabitatHero.tsx   # Main hero component
│   │   ├── habitat-hero.module.css
│   │   └── index.ts
│   ├── StagesSection.tsx     # 4-stage visualization
│   ├── ServicesOverview.tsx  # Service cards grid
│   ├── StationSection.tsx    # Station explanation
│   ├── GovernanceSection.tsx # Gates and approvals
│   ├── DeploymentSection.tsx # Deployment options
│   ├── ProofSection.tsx      # Evidence display
│   ├── ContactCTA.tsx        # Final CTA
│   └── OutcomeInput.tsx      # Outcome prompt
│
├── cards/
│   ├── ServiceCard.tsx       # Individual service
│   ├── StageCard.tsx         # Individual stage
│   └── ProofCard.tsx         # Evidence artifact
│
├── forms/
│   ├── ContactForm.tsx       # Contact page form (client)
│   └── FormField.tsx         # Reusable form field
│
├── ui/
│   ├── Button.tsx            # Primary/secondary/ghost
│   ├── Toggle.tsx            # Paper/Ink, Human/Agent
│   ├── Accordion.tsx         # FAQ expandable
│   ├── Badge.tsx             # Tags and labels
│   └── Icon.tsx              # Lucide icon wrapper
│
└── providers/
    ├── ThemeProvider.tsx     # Paper/Ink theme context
    └── ModeProvider.tsx      # Human/Agent mode context
```

---

## 6. Data Flow

### Static Data (Build-time)

All marketing content is static. No runtime data fetching.

```
content/
├── pages/
│   ├── home.md               # Homepage prose
│   ├── services.md           # Services page
│   ├── station.md            # Station page
│   ├── how-we-work.md        # How we work page
│   ├── security.md           # Security page
│   ├── about.md              # About page
│   └── faq.md                # FAQ page
│
├── data/
│   ├── services.json         # Service definitions
│   ├── stages.json           # 4-stage definitions
│   ├── deployment.json       # Deployment options
│   ├── proof.json            # Evidence examples
│   └── faq.json              # FAQ entries
│
└── meta/
    ├── navigation.json       # Header/footer links
    └── seo.json              # SEO defaults
```

### Content Loading

```tsx
// In page.tsx (Server Component)
import { getPageContent } from '@/lib/content';
import { getServicesData } from '@/lib/data';

export default async function ServicesPage() {
  const content = await getPageContent('services');
  const services = await getServicesData();

  return <ServicesPageView content={content} services={services} />;
}
```

### Machine Routes (Build-time Generated)

Machine routes compile at build time from source content:

| Route | Source | Format |
|-------|--------|--------|
| `/llms.txt` | All pages prose | Plain text summary |
| `/llms-full.txt` | All content | Full plain text |
| `/capabilities.json` | services.json + meta | JSON manifest |
| `/api/contact-schema` | Static schema | JSON Schema |

### Form Submission (Runtime)

Contact form is the only runtime interaction:

```
User submits form
    ↓
POST /api/contact
    ↓
Validate against schema
    ↓
Send to configured destination (email/webhook)
    ↓
Return success/error response
```

---

## 7. State Management

### Theme State (Paper/Ink)

- Stored in `localStorage` key: `sw-theme`
- Synced with `data-theme` attribute on `<html>`
- Default: `paper`
- Respects `prefers-color-scheme` on first visit

### Mode State (Human/Agent)

- Stored in `localStorage` key: `sw-mode`
- Exposed via context for conditional rendering
- Default: `human`
- Affects:
  - Content presentation (prose vs. structured)
  - Code examples visibility
  - Schema information display

### No Global State

No Redux, Zustand, or other state management needed. Theme and mode are the only client-side state.

---

## 8. Design Token Integration

Design tokens from `design-system/tokens/` map to CSS custom properties:

```css
/* globals.css */
:root {
  /* From design-system tokens */
  --color-paper: #FFFEF8;
  --color-ink: #152238;
  --color-blue: #2447E8;
  --color-blue-soft: #7FA4FF;
  --color-joint: #FF6848;

  /* Semantic aliases */
  --bg: var(--color-paper);
  --text-body: var(--color-ink);
  --accent: var(--color-blue);

  /* Type scale */
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}

[data-theme="ink"] {
  --bg: var(--color-ink);
  --text-body: var(--color-paper);
  --accent: var(--color-blue-soft);
}
```

---

## 9. SEO & Metadata

### Static Metadata per Route

Each page defines metadata in its page.tsx:

```tsx
export const metadata: Metadata = {
  title: 'Services | Splice Works',
  description: 'AI-native consulting and delivery services.',
  openGraph: {
    title: 'Services | Splice Works',
    description: 'AI-native consulting and delivery services.',
    url: 'https://spliceworks.ai/services',
    siteName: 'Splice Works',
    locale: 'en_US',
    type: 'website',
  },
};
```

### Generated Metadata

- `robots.txt` - Static file in `/public`
- `sitemap.xml` - Generated at build time from route list
- `manifest.json` - PWA manifest in `/public`

---

## 10. Build & Deployment

### Build Output

Full static export:

```js
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### Deployment Target

Vercel (per DECISION-005):
- Domain: spliceworks.ai
- Edge caching for all static routes
- Serverless functions for `/api/contact` only

### Environment Variables

```
# .env.local
CONTACT_WEBHOOK_URL=https://...
CONTACT_EMAIL_TO=hello@spliceworks.ai
```

---

## 11. Accessibility Requirements

- Skip-to-content link
- Semantic HTML (header, main, footer, nav, section)
- ARIA labels on interactive elements
- Focus management for modals/accordions
- Color contrast meets WCAG AA
- Keyboard navigation for all controls
- Reduced motion support (per design system)

---

## 12. Performance Budget

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total bundle | < 150KB gzipped |
| First load JS | < 80KB |

### Optimizations

- Server Components by default
- Static generation for all pages
- Font subsetting
- Image optimization (next/image)
- Minimal client-side JS

---

## Appendix: File Naming Conventions

- **Pages:** `page.tsx` (App Router convention)
- **Layouts:** `layout.tsx`
- **Components:** PascalCase (e.g., `ServiceCard.tsx`)
- **Styles:** kebab-case module (e.g., `service-card.module.css`)
- **Utilities:** camelCase (e.g., `getPageContent.ts`)
- **Content:** kebab-case (e.g., `how-we-work.md`)
- **Data:** kebab-case JSON (e.g., `services.json`)
