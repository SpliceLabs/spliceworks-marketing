---
name: design-system-integration
description: Convert an approved design system into production tokens, assets, components, and template conversions.
---

# Design-system integration

Read the approved design source and brand manifest. Preserve token semantics, typography, logo usage, component states, responsive behavior, and prohibitions. References may inform behavior but cannot override approved values.

## Inputs

- `design-system/` folder containing:
  - `tokens/` — CSS token files (colors, typography, spacing, effects)
  - `components/` — Reusable UI components (JSX/TSX)
  - `assets/` — Logo kit, icons, images
  - `templates/` — HTML templates requiring conversion
  - `guidelines/` — Usage documentation
  - `readme.md` or manifest — Design system overview

## Tasks

### 1. Token Mapping (token-map.json)

Map all CSS tokens to framework custom properties:
- Read `tokens/*.css` files
- Extract all `--sw-*` primitives
- Map to semantic aliases (`--bg`, `--text-body`, `--accent`, etc.)
- Document theme variants (paper/ink, light/dark)
- Output: `token-map.json`

### 2. Component Inventory (component-inventory.json)

Inventory all reusable components:
- Read `components/{core,forms,display,overlay}/*.jsx`
- Document props, variants, states
- Note which need TypeScript conversion
- Map components to routes that use them
- Output: `component-inventory.json`

### 3. Asset Inventory (asset-manifest.json)

Inventory all physical assets and map to production destinations:

**Logos:**
- Find all logo variants (mark, lockups, avatar, seal)
- Map light/dark theme variants
- Define destination paths in `public/logo/{light,dark}/`

**Favicons:**
- Find all favicon sizes (16, 32, 48, apple-touch, android-chrome)
- Map to `public/` root
- Generate `<link>` tags for layout

**Fonts:**
- Document font families, weights, sources
- Note if Google Fonts, local files, or CDN

**Output:** `asset-manifest.json` per schema

### 4. Template Conversion (template-components/)

Convert HTML templates to React/framework components:

For each template in `design-system/templates/`:
1. Read the HTML template file
2. Extract:
   - HTML structure
   - Inline CSS (convert to CSS modules or styled-jsx)
   - JavaScript logic (convert to React hooks/state)
   - Animations (preserve, respect prefers-reduced-motion)
3. Create React component:
   - TypeScript with proper prop types
   - Theme-aware (respond to `[data-theme]`)
   - Mode-aware if applicable (Human/Agent toggle)
4. Document props and usage
5. Output to `template-components/{TemplateName}.tsx`

**Conversion requirements:**
- Preserve all visual fidelity
- Maintain all interactivity
- Keep animations but add reduced-motion support
- Integrate with ThemeProvider/ModeProvider
- Use design tokens, not hardcoded values

### 5. Asset Deployment

Execute asset manifest during implementation:
- Copy logos to `public/logo/{light,dark}/`
- Copy favicons to `public/`
- Configure font loading in layout
- Verify all assets are accessible

## Outputs

| Output | Description |
|--------|-------------|
| `token-map.json` | CSS custom properties mapping |
| `component-inventory.json` | Component documentation |
| `asset-manifest.json` | Asset to destination mapping |
| `template-components/` | Converted React components |

## Gates

- **asset-inventory**: All assets in design-system are inventoried
- **template-conversion**: HTML templates converted to React
- **design-adherence**: Implementation uses tokens, not raw values

## Constraints

- Never hardcode colors, spacing, or typography
- Always use CSS custom properties from token-map
- Logo must switch variants based on theme
- Templates must preserve original design fidelity
- Animations must respect `prefers-reduced-motion`
- Do not modify original design-system files
