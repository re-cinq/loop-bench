Completed and pushed commit `2d04529`.

- Closed facet: missing required input returns a descriptive `ToolResponse`; executor remains uncalled.
- Added AJV as a runtime dependency.
- Test result: 1 red test authored this round, then green; 0 regressions.
- Branch is synchronized with `origin/main` and upstream.
- Unrelated: npm audit reports 14 existing vulnerabilities; unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject missing required tool input without invoking the executor","tdd_next":"compile static schemas at registration and cache dynamic schemas"}}