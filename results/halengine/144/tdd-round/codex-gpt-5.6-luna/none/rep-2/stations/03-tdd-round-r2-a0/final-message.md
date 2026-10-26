Implemented one red–green–refactor round for `list_sessions` error handling.

- Rejected stores now log safely and return `SERVER_ERROR`.
- Added regression test and traceability links.
- Updated DoD facet.
- Test: `messageHandler.test.ts` — 56 passed.
- Committed and pushed: `1d0e1df`.
- Branch is synchronized with upstream.
- Red tests: 1 yours, 0 regressions. Acceptance/lint/typecheck were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions errors and feature semantics","tdd_next":"Document list_sessions and session_list, then remaining acceptance facets"}}