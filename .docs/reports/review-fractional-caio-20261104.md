# Review: feat/fractional-caio (2026-11-04)

Scope: branch vs origin/main, 13 files, diff-scope (no sensitive paths, blast-radius risk low). Pass 1 only. Panel: security-assessor (Claude), code-reviewer (Codex), test-quality-reviewer (Codex). Briefing inferred from the session (auto), not asked. No Beads workspace, so findings are recorded here.

| Id | Seat | Finding | Disposition |
| --- | --- | --- | --- |
| CR-1 | code-reviewer | Check-mark cards chosen by a content-shape guess in a shared component | Fixed: opt-in via `check_cards` front matter (4d2f7c7) |
| TQ-001 | test-quality | Decision-rights test was shape-only | Fixed: asserts headers, areas and distinct cells |
| TQ-002 | test-quality | Advisory wording assertion passed via the FAQ repeat | Fixed: asserts the seats table cell; mutation-checked |
| TQ-003 | test-quality | Check-card test accepted partial rendering | Fixed: asserts 5, 3, 1 ticks and items |
| TQ-004 | test-quality | No regression test for the shared heuristic | Fixed: three-list fixture stays plain unless opted in |
| TQ-005 | test-quality | Price and time-band matcher incomplete | Fixed: shared matcher with its own tests |
| S1 | security-assessor | External links rendered without a URL scheme check (Inline.tsx, outside this diff) | Open: hardening ticket, not this PR |

Verdict: security PASS; all Fix Required findings fixed; 1 suggestion open (outside the diff).
Not run: Pass 2 (diff-scope skips it by design), claims-verifier (skipped at diff-scope; the research report in `.docs/reports` quotes vendor figures and is labelled unverified).
