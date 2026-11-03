# ADR 0004: Entry codes: LG- plus 5 digits, written into each entry

Status: Accepted, 2026-11-03.

## Context

The prototype showed a part-number code (LG-119) on tickets and spec sheets. Hand numbering collided already (two entries used LG-120). Numbering from a sorted list renumbers everything after a backdated entry.

## Decision

Every entry has a code `LG-` plus 5 digits from one global sequence. The code lives in the entry's frontmatter. A script run by the pre-commit hook and the local build gives each entry without a code the next number, in order of published date then slug, and never changes an existing code. A person may add a code by hand. The production build only verifies: a missing or duplicate code fails it, because files written in CI are not committed. Existing numbers keep: 118 to 122.

## Consequences

A backdated entry takes the next number, not a date-ordered one. Two branches adding entries in parallel claim the same number; the second to merge fails verification and reruns the script after deleting its code line. Codes show on the entry kicker, spec sheet, tool cards and share image, not in every card's meta line.

## Revisit when

- Parallel-branch collisions happen more than about once a month.
- Six months after launch nobody cites a code (not in links, calls or posts): drop the field.
- The sequence passes 99,999 entries (no action expected).
