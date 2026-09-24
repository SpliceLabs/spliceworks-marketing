# Design Specifications

Design requirements and specifications for Splice Works marketing site.

---

## Page Layout

All pages share a common layout wrapper with consistent header and footer.

```
┌─────────────────────────────────┐
│           Header (sticky)       │
├─────────────────────────────────┤
│                                 │
│         Page Content            │
│      (varies per route)         │
│                                 │
├─────────────────────────────────┤
│            Footer               │
└─────────────────────────────────┘
```

**Shared Components:**
- **Header** — Logo, navigation, CTA button (sticky, see below)
- **Footer** — Links, legal, contact info

**Page-specific:**
- Content between header and footer is defined per route in `content/pages/*.md`

---

## Hero Section

### Parallax Effect

The hero section uses a parallax scrolling effect to create depth and visual interest.

**Requirements:**
- Background layer scrolls at 50% of scroll speed (parallax factor: 0.5)
- Foreground content (headline, subhead, CTA) scrolls at normal speed
- Smooth, performant animation using CSS transforms (not background-position)
- Respect `prefers-reduced-motion` — disable parallax when user prefers reduced motion
- Mobile: Consider disabling or reducing parallax effect for performance

**Implementation Notes:**
```css
/* Parallax container */
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* Background layer - slower scroll */
.hero-background {
  position: absolute;
  inset: 0;
  transform: translateY(calc(var(--scroll-y) * 0.5));
  will-change: transform;
}

/* Content layer - normal scroll */
.hero-content {
  position: relative;
  z-index: 1;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .hero-background {
    transform: none;
  }
}
```

**Motion Timing:**
- Use design system motion tokens: `dur-base` (200ms), `ease-out` (0.2, 0.7, 0.2, 1)
- Parallax should feel natural, not jarring

---

## Header / Navigation

### Sticky Behavior

The header stays fixed at the top of the viewport during scroll.

**Requirements:**
- `position: sticky` (or `fixed` with scroll compensation)
- Always visible, always accessible
- Z-index above page content, below modals
- Background: solid or blur backdrop when scrolled (avoid floating text over content)

**Scroll State:**
- At top (scroll = 0): Transparent or minimal background
- Scrolled: Apply backdrop blur + subtle shadow or border to separate from content

**Implementation Notes:**
```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header); /* 100 */
  transition: background var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}

.header[data-scrolled="true"] {
  background: var(--bg-blur);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
}
```

---

## Section Structure

Refer to `content/pages/HOME.md` for section content and hierarchy.
