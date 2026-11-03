You are a senior quantitative survey and measurement designer who also builds financial models for business cases. Review the AI ROI calculator on a B2B marketing site (spliceworks.ai/tools/ai-roi-calculator). The reader is a CEO, founder or technology leader building a business case for an AI rollout. The full source (controls, formulas, results copy, page copy) is in the bundle below.

Review critically for:
1. Validity: do the formulas measure what the labels claim? Hidden assumptions, double counting, missing terms, boundary cases (0 time saved, 12-month dip, tiny team), whether ROI/payback/year-two/break-even are computed and described consistently.
2. Coherence: do the controls, results, worked example, method bullets and FAQ agree with each other and with the code? Check the worked example's arithmetic against the formulas.
3. Signal quality: which inputs will respondents misreport or misunderstand (e.g. unit confusion, fully loaded cost, net vs gross time saved, per person vs total, per year vs one-off)? Where do defaults anchor? Which inputs dominate the answer (sensitivity), and is that surfaced? Are slider ranges and steps sensible?
4. Units: for EACH control, state what unit it is in today as shown to the user (label, hint, slider readout, number box), whether that is unambiguous, and propose an exact label + hint + displayed unit. Note the number box shows a bare number with no unit.
5. Claims: flag any claim that looks uncited or wrong (e.g. the DORA "40 to 150 minutes a day" hint).

Output markdown: findings ranked by severity (High/Medium/Low), each with location, problem, concrete fix. Then a per-control units table. Be specific and terse. Do not rewrite the whole page.
