Added nested required-field paths to validation errors, with a regression test and spec citation. The test failed before the fix and passed after formatting. **Red tests: 1 yours, 0 regressions.**

Committed and pushed as `48ab6d3`; the branch is up to date with `origin/main` and its upstream. CI’s previous report showed coverage output but no actionable failure locations. The remaining DoD facets include orchestrator retry coverage and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Report the full parent path for a missing nested required property","tdd_next":"Complete validation unit/orchestrator tests and documentation"}}