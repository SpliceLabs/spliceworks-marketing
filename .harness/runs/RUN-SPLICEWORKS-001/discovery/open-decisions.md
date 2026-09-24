# Open Decisions

**Run ID:** RUN-SPLICEWORKS-001
**Phase:** discovery
**Generated:** 2026-09-06

## Decisions Requiring Human Input

### DECISION-001: Page Content Structure
**Status:** Open
**Owner:** Product Lead

The `content/pages/` directory exists but is empty. Need to decide:
- Will page content be authored as Markdown files?
- Will content be structured with frontmatter for metadata?
- Should each route have its own content file or be organized differently?

**Options:**
1. One Markdown file per route (e.g., `pages/services.md`, `pages/station.md`)
2. Nested folders with sections (e.g., `pages/services/assessment.md`)
3. Structured JSON/YAML with prose content

---

### DECISION-002: Machine Route Content Generation
**Status:** Open
**Owner:** Engineering Lead

The sitemap defines 4 machine routes (`/llms.txt`, `/llms-full.txt`, `/capabilities.json`, `/api/contact-schema`). Need to decide:
- Should these be static files or dynamically generated?
- How should they be kept in sync with human-readable content?

**Options:**
1. Static files in `content/agent/` that are manually maintained
2. Build-time generation from source content
3. Runtime generation from database/CMS

---

### DECISION-003: Contact Form Schema
**Status:** Open
**Owner:** Engagement Lead

The sitemap mentions `/contact` for intake and `/api/contact-schema` for agents. Need to decide:
- What fields are required for engagement intake?
- What validation rules apply?
- Where do submissions go (email, CRM, database)?

**Options:**
1. Simple email capture (name, email, message)
2. Structured intake (company, role, service interest, timeline, budget range)
3. Multi-step qualification flow

---

### DECISION-004: Legal Pages
**Status:** Open
**Owner:** Legal

The footer navigation references Privacy and Terms pages. Need to decide:
- Are these required for launch?
- Will they use standard templates or custom content?

**Options:**
1. Use standard template (e.g., Termageddon, iubenda)
2. Custom content authored in-house
3. Defer to post-launch

---

### DECISION-005: Deployment Model
**Status:** Open
**Owner:** Engineering Lead

The harness configuration indicates Vercel as the deployment adapter. Need to confirm:
- Is Vercel the confirmed deployment target?
- What is the production domain configuration?
- Are there specific environment requirements?

**Options:**
1. Vercel with spliceworks.ai domain
2. Alternative hosting (Cloudflare Pages, Netlify)
3. Self-hosted infrastructure

---

### DECISION-006: 4-Stage Enumeration
**Status:** Open
**Owner:** Product Lead

The SITEMAP defines 4 stages (Discover, Design, Deploy, Operate) but SOURCE-OF-TRUTH does not enumerate them.

**Recommendation:** Update SOURCE-OF-TRUTH.md to include:
```markdown
## Delivery Stages

1. **Discover** — Map current state, identify opportunities
2. **Design** — Define architecture, plan implementation
3. **Deploy** — Build and ship the system
4. **Operate** — Monitor, maintain, evolve
```

**Decision needed:** Confirm these stage names and descriptions are accurate.

---

## Summary

| Decision | Priority | Blocks |
|----------|----------|--------|
| DECISION-001 | High | Content creation |
| DECISION-002 | Medium | Machine routes |
| DECISION-003 | High | Contact functionality |
| DECISION-004 | Low | Launch (can defer) |
| DECISION-005 | High | Deployment |
| DECISION-006 | Low | Content accuracy |

## Next Step

The scope gate requires human approval before proceeding to the architecture phase. Please review these decisions and provide direction.
