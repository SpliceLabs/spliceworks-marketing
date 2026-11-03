# ADR 0010: The Log uses the normal site header and footer

Status: Accepted, 2026-11-03.

## Context

The design system's `LogEntryShell` replaces the site header and footer with an app-style sidebar. That suits a tool catalogue; essays and a future newsletter read better in the standard layout. This was assumed in the design discussion and not objected to.

## Decision

Log pages use the normal site header and footer. `LogEntryShell` no longer wraps Log pages; `SpecSheet` is reused inside the entry. The "Splice Log" nav item points to `/log`.

## Consequences

The sidebar shell and its icons are unused on this site for now. Tool entries lose the sidebar's app feel.

## Revisit when

- The Log grows a members area (the prototype has a signed-in fork) that needs persistent navigation.
- Readers navigate many entries in one sitting and a sidebar would help.
- The founders decide the Log should look like a separate product.
