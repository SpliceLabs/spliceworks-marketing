# Splice Works Design System

Splice Works is an editorial studio — "a Splice Labs company" — whose identity is built on the idea of a **splice**: two things joined into one continuous run. The mark is a solid **S** and an outlined **W** meeting at a single orange **joint**. Everything in this system follows from that: ink and paper as the base, one blue for structure, one orange dot for emphasis.

## Sources
- `uploads/Editorial habitat hero design/` (zip) — Splice Works logo kit "mark 8a": `dark/` and `light/` folders with favicons (16/32/48), icons (64/128/512), apple-touch 180, android-chrome 192, `avatar-512` (round), `seal-512` (one-colour), `mark@2x`, `lockup-horizontal@2x`, `lockup-endorsed@2x`, `lockup-vertical@2x`, plus a README specifying colours and type.
- `uploads/*.png` — the same dark-tile set at the root of the upload.
- No Figma, no codebase, no product screenshots, no copy were supplied. Everything beyond the logo kit (colour ramps, type scale, spacing, components, the UI kit) is **derived** and marked as such where it matters.

## Quick facts (from the kit README)
- Mark: solid S · outlined W · orange joint at the splice.
- Wordmark: Bricolage Grotesque 400, uppercase, tracked .18em. Endorsement line: Space Mono, "a Splice Labs company".
- dark/ — ink tile `#152238`, S `#FFFEF8`, W outline `#7FA4FF`, joint `#FF6848`.
- light/ — paper tile `#FFFEF8`, S `#152238`, W outline `#2447E8`, joint `#FF6848`.
- Below 24px the W drops its outline and joint (solid mid-blue).
- Seal: one colour, for approvals and reports.

## Content fundamentals
Derived from the kit's own voice (its README is terse, lower-case, dot-separated) and the editorial positioning.
- **Tone:** plain, exact, unhurried. Editor's voice, not marketing voice. Short declaratives. "Twelve sites re-surveyed, three re-classified." Never "Unlock", "Supercharge", "Seamless".
- **Casing:** sentence case for headings and buttons ("Read the issue"). UPPERCASE only in Space Mono eyebrows/meta and the wordmark. Title Case is never used.
- **Person:** "we" for the studio, "you" for the reader. No "I".
- **Punctuation as design:** the middle dot `·` separates meta ("6 Sep 2026 · 4 min"). A full stop in joint-orange may close a display headline — it stands in for the mark's joint. Use at most once per view.
- **Numbers:** numerals always ("12 sites", "Issue 04"); zero-padded issue numbers.
- **Emoji:** never. **Exclamation marks:** never.
- **Microcopy:** buttons are verb + object ("Join the list", "Retract"); destructive actions are named plainly, not softened.
- **Labels/eyebrows:** Space Mono, uppercase, tracked .12em — "FIELD NOTES", "A SPLICE LABS COMPANY", "UPDATED 6 SEP 2026".

## Visual foundations
- **Colour:** two grounds — paper `#FFFEF8` (default) and ink `#152238` (dark theme / inverse blocks). Blue is *structural* (links, focus, eyebrows, accent button); it flips to blue-soft `#7FA4FF` on ink, exactly as the W outline does in the kit. Orange `#FF6848` is the **joint**: one per composition — a bullet, an active tab underline, a switch knob, a live dot, a closing full stop. Never a background, never a button fill. Status greens/ambers/reds are derived (not in the kit) and only for feedback.
- **Type:** Bricolage Grotesque for everything from 112px display down to 13px captions (weights 400/500/600 in UI; 300–800 available). Display sizes use medium weight, leading .94, tracking −.03em. Body 15px/1.5, max 64ch. Space Mono for eyebrows, meta, code, tooltips, the endorsement line. No serif anywhere.
- **Spacing:** 4px base; components sit on 8/12/16/24; sections on 48/64/96/128. Controls are 32/40/48 tall.
- **Radii:** near-square — 2/3/4/6px. Only tags, avatars and the switch are pills. Cards 4px, buttons 3px, badges 2px.
- **Borders vs shadows:** structure is drawn with **hairlines** (1px ink-200) and **strong rules** (1.5px ink) — think ruled paper. Shadows exist only on floating layers (menus, dialogs, toasts). Cards have a border, never a shadow. Dialogs carry a 3px ink top rule.
- **Backgrounds:** flat paper or flat ink. No gradients, no textures, no patterns. Imagery sits in hard-edged 16:9 / 4:5 slots. Photography direction (proposed, none supplied): natural, cool-neutral, documentary; no filters, no grain.
- **Inverse blocks:** whole sections may flip to ink (footer, feature card, cover slot); text becomes paper, secondary text ink-200, eyebrows blue-soft.
- **Motion:** 120ms ease-out colour/border transitions on hover. Nothing moves on press; no scale, no bounce. 200ms for reveals, 360ms for large panels. Reduced-motion-safe by nature.
- **Hover:** fills darken one step (ink→ink-800, blue→blue-600); outlined controls gain a sunken ink-50 background; card titles underline; links darken to blue-700.
- **Press:** darken a second step (ink-950, blue-700). No transform.
- **Focus:** 1px accent border + 3px 35% accent ring (`--shadow-focus`).
- **Disabled:** 45% opacity, not-allowed cursor.
- **Layout:** 12 columns, 24px gutters (40px at ≥1280). Containers 760 (prose) / 1080 / 1280. Sticky 64px header with a hairline. Editorial asymmetry (7/5 splits) is preferred to centred layouts.
- **Transparency/blur:** only the dialog overlay (ink 55%). `--blur-panel` exists for sticky headers over imagery; otherwise none.
- **Links:** underlined, 1px, 3px offset, blue. Never bold, never button-styled.
- **Selection:** blue-soft on ink.

## Iconography
- **Logo assets:** `assets/logo/{light,dark}/` — full kit copied verbatim (see Quick facts). Use `lockup-horizontal` in headers, `lockup-endorsed` in footers, `mark` as a graphic, `avatar-512` for bylines/social, `seal-512` for approvals/report stamps, favicons per the kit's `<link>` snippet.
- **Icon set:** none supplied. **Substitution: Lucide** (1.5px stroke, round caps) loaded from CDN `https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js` and rendered through the `Icon` component — chosen because the 1.5px outline matches the W's stroke. Flagged; replace if the brand has its own set.
- **Sizes:** 14 in small buttons, 16 in inputs/buttons, 18 default, 24 in empty states.
- **Emoji:** never. **Unicode as icon:** the middle dot `·` for meta separators and the 6px orange dot for "live"/active are the only glyph-as-icon uses.
- **Illustrations / imagery:** none supplied; none created. Slots are labelled placeholders.

## Components
Standard set (no source inventory existed). All in `components/`, exported on `window.SpliceWorksDesignSystem_f2e5fb`.
- **core/** — `Button` (primary ink / accent / secondary / ghost / danger; sm md lg), `IconButton`, `Icon`
- **forms/** — `Input`, `Select`, `Checkbox`, `Radio` (joint-orange dot when selected), `Switch` (joint knob)
- **display/** — `Card` (editorial teaser, inverse variant), `Badge`, `Tag` (pill), `Tabs` (joint underline)
- **overlay/** — `Dialog`, `Toast`, `Tooltip`

Intentional additions: `Icon` — wrapper over the substituted Lucide set so glyphs are swappable in one place.

## Index
- `styles.css` — single entry; imports `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`
- `tokens/` — primitives (`--sw-*`) and semantic aliases (`--bg`, `--text-body`, `--accent`, `--joint`…); `[data-theme="dark"]` scope
- `guidelines/{colors,type,spacing,effects,brand}/` — 26 specimen cards (Design System tab)
- `components/{core,forms,display,overlay}/` — 15 components with `.d.ts`, `.prompt.md`, one card each
- `ui_kits/editorial-site/` — inferred editorial publication site: home (hero + issue grid), article, subscribe flow. Read its README: no real product screens were supplied.
- `templates/habitat-hero/HabitatHero.dc.html` — **Habitat hero** template (from the user's "Editorial Habitat Station Hero v2 Field" upload): isometric Station habitat with agents, gate and chapters; Human/Agent mode and **Paper/Ink theme toggle** (`theme` prop). Its own hex palette is kept from the source; the ink theme maps onto the kit's dark tile.
- `assets/logo/` — the logo kit + its README
- `thumbnail.html`, `SKILL.md`

## Caveats
- Fonts are loaded from Google Fonts (`tokens/fonts.css`); no binaries were supplied. Supply Bricolage Grotesque / Space Mono files to self-host.
- Everything beyond the five kit colours and two typefaces is a proposal.
