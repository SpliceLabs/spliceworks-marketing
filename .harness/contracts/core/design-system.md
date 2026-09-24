# Design System Contract

This contract governs how the design system is integrated into production code.

## Asset Usage

### Logos

- All logo variants from `design-system/assets/logo/` MUST be copied to `public/logo/`
- Both `light/` and `dark/` variants MUST be available
- Logo MUST switch between variants based on current theme
- Minimum assets required:
  - `mark@2x.png` — Primary mark
  - `lockup-horizontal@2x.png` — Header lockup
  - `lockup-endorsed@2x.png` — Footer lockup with endorsement
  - `avatar-512.png` — Social/byline avatar
  - `seal-512.png` — Approval/report stamp

### Favicons

- Favicons MUST be configured per design system README
- Required sizes: 16, 32, 48, apple-touch-icon, android-chrome
- Favicon MUST match current theme where technically feasible
- `<link>` tags MUST be present in document head

### Fonts

- Typography MUST use fonts specified in design system
- Font loading MUST be configured in root layout
- Fallback fonts MUST be specified
- Font files or CDN references MUST be documented

## Token Usage

### CSS Custom Properties

- ALL styling MUST use CSS custom properties from token-map
- NO hardcoded color values (hex, rgb, hsl)
- NO hardcoded spacing values (px, rem, em)
- NO hardcoded typography values (font-size, line-height, font-weight)

### Allowed Exceptions

- `0` for zero values
- `100%`, `100vh`, `100vw` for full dimensions
- `auto` for automatic sizing
- Keyframe animation values

### Theme Support

- Components MUST respond to `[data-theme]` attribute
- Paper (light) theme is default
- Ink (dark) theme uses `[data-theme="ink"]`
- Theme transitions MUST be smooth (use `transition` on color properties)

## Template Usage

### HTML Templates

- HTML templates in `design-system/templates/` MUST be converted to React
- Converted components MUST preserve:
  - Visual appearance (pixel-accurate where possible)
  - All CSS (inline converted to modules or styled-jsx)
  - All JavaScript interactivity (converted to React state/effects)
  - All animations (with `prefers-reduced-motion` respect)
  - Theme toggle integration
  - Mode toggle integration (if applicable)

### Conversion Requirements

- Output MUST be TypeScript (`.tsx`)
- Props MUST be typed
- Component MUST accept theme/mode from context
- Component MUST NOT duplicate theme/mode state internally
- Original template file MUST NOT be modified

## Component Usage

### Design System Components

- Components from `design-system/components/` SHOULD be used directly
- If JSX components need TypeScript, convert minimally
- Do not redesign or modify component behavior
- Extend via composition, not modification

### Custom Components

- Custom components MUST use design tokens
- Custom components MUST follow design system patterns
- Custom components MUST be documented in component-inventory

## Verification Checks

The following MUST pass before implementation is complete:

| Check | Verification |
|-------|--------------|
| Logo assets exist | `public/logo/light/mark@2x.png` exists |
| Logo theme switching | Logo src changes when theme toggles |
| Favicons configured | `<link rel="icon">` in document head |
| Tokens imported | `globals.css` imports design tokens |
| No hardcoded colors | No hex/rgb values in component styles |
| Template converted | Habitat Hero (or equivalent) is React component |
| Template used | Homepage uses converted template |
| Theme works | Paper/Ink toggle changes appearance |
| Reduced motion | Animations disabled when system prefers |

## Blockers

Implementation CANNOT proceed to verification if:

- Logo assets are not in `public/`
- Token-map is not imported
- HTML templates are not converted
- Theme switching is not functional

## Evidence

The following evidence MUST be recorded:

- `asset-manifest.json` — What assets were deployed where
- `template-components/` — Converted React components
- Screenshots — Before/after of template conversion
- Build output — Confirmation assets are included
