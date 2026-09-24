# ADR-001: Next.js App Router Architecture

**Status:** Accepted
**Date:** 2026-09-06
**Run ID:** RUN-SPLICEWORKS-001
**Decision Makers:** Engineering Lead, Product Lead

---

## Context

The Splice Works marketing website requires a frontend framework that supports:

1. Static site generation for marketing pages
2. Build-time generation of machine-readable routes
3. Server-side rendering capabilities for future dynamic features
4. Client-side interactivity for toggles and forms
5. Modern developer experience
6. Deployment to Vercel (per DECISION-005)

The design system specifies Paper/Ink theme toggling and Human/Agent mode switching, which require client-side state management within a primarily static context.

## Decision

We will use **Next.js 14+ with the App Router** as the frontend framework.

## Rationale

### Why Next.js

| Requirement | Next.js Capability |
|-------------|-------------------|
| Static generation | `output: 'export'` for full static site |
| Machine routes | Route handlers with custom response types |
| Theme/mode toggles | Client Components where needed |
| Forms | API routes for form handling |
| Vercel deployment | First-class support, zero-config |
| Design system | CSS custom properties, CSS modules |

### Why App Router (not Pages Router)

1. **Layout system** - Shared marketing layout without prop drilling
2. **Route groups** - Clean separation of `(marketing)` and `(machine)` routes
3. **Server Components default** - Minimal client-side JavaScript
4. **Colocation** - Components, styles, and tests near their routes
5. **Streaming** - Future-proofs for dynamic content
6. **Parallel routes** - Enables modal patterns if needed

### Why not alternatives

| Alternative | Reason for rejection |
|-------------|---------------------|
| Astro | Less mature API routes, smaller ecosystem |
| Remix | Overkill for static site, server-dependent |
| Gatsby | GraphQL complexity unnecessary, slower builds |
| Vite + React | No built-in SSG/routing, more setup |
| Pages Router | Legacy pattern, less flexible layouts |

## Consequences

### Positive

- **Performance**: Server Components minimize bundle size
- **Developer experience**: File-based routing, hot reload, TypeScript support
- **Deployment**: Vercel optimizes automatically
- **SEO**: Static HTML, metadata API for OG tags
- **Accessibility**: Server-rendered HTML loads fast

### Negative

- **Learning curve**: App Router patterns differ from Pages Router
- **Client/Server boundary**: Requires explicit 'use client' directives
- **Hydration**: Theme flicker possible on first load (mitigated by script)

### Neutral

- **Build times**: Similar to other React frameworks for this scale
- **Bundle size**: Depends on client component usage

## Implementation Notes

### Project structure

```
app/
  (marketing)/          # Route group with shared layout
    layout.tsx          # Header, footer, providers
    page.tsx            # Homepage
    services/page.tsx   # Services page
    ...
  (machine)/            # Route group for machine routes
    llms.txt/route.ts
    llms-full.txt/route.ts
    capabilities.json/route.ts
  api/
    contact/route.ts
    contact-schema/route.ts
  layout.tsx            # Root: html, fonts, theme script
  globals.css           # Design tokens
```

### Server vs Client Components

| Component Type | Server or Client |
|----------------|------------------|
| Page layouts | Server |
| Section components | Server |
| Navigation | Server |
| Theme toggle | Client |
| Mode toggle | Client |
| Contact form | Client |
| FAQ accordion | Client |

### Static export

```js
// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

### Theme flash prevention

```tsx
// app/layout.tsx
<head>
  <script dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var theme = localStorage.getItem('sw-theme') || 'paper';
        document.documentElement.dataset.theme = theme;
      })();
    `
  }} />
</head>
```

## Alternatives Considered

### Astro

Astro excels at content-heavy static sites with minimal JavaScript. However:
- API routes are less mature
- React integration adds complexity
- Smaller ecosystem for component libraries

For a site with interactive toggles and forms, Next.js provides a more cohesive solution.

### Plain React + Vite

Would require:
- Manual SSG setup (vite-plugin-ssr or similar)
- Custom routing solution
- Manual API route handling
- More deployment configuration

The overhead outweighs benefits for this project scale.

### Remix

Designed for dynamic, server-rendered applications. For a primarily static marketing site:
- Requires server runtime
- Edge deployment more complex
- Overkill for content delivery

## Related Decisions

- **DECISION-002**: Machine routes generated at build time (aligns with static export)
- **DECISION-005**: Vercel deployment (App Router is optimized for Vercel)

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## Approval

This decision was made during the architecture phase of RUN-SPLICEWORKS-001.

**Pending review by:** Engineering Lead

**Gate:** architecture-review (pending)
