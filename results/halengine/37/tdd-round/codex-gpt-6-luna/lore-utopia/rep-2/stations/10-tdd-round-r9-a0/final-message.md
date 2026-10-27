Added a sanitized warning log for schema rejections, with the failing field and constraint but no input value. The focused test failed before the change and passed afterward. I also repaired the three spec links reported by CI and updated the DoD.

**Verification:** Ran only `ToolRegistry logs schema rejection details without input values`; it passed. Prettier completed. The prior CI test failure details could not be retrieved: Lore returned 404 for the branch and PR lookups.

Committed and pushed `cd46fd5`; `origin/main` was already merged, and the branch is up to date with its upstream. Red tests: 1 written for this round; regressions: 0 identified. Next facet: remaining unit/orchestrator tests and documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Log schema rejection details without input values; repair prior CI spec-link findings","tdd_next":"Remaining unit/orchestrator tests and documentation"}}