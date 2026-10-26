Implemented and pushed one TDD round:

- Added `limit` validation for 1–200 with regression coverage.
- Refactored validation dispatch.
- Fixed all seven reported CI lint/trace findings.
- Added missing type re-exports and updated DoD/spec links.
- Test passed: `src/transport/ws/validation.test.ts`
- Commit pushed: `c1300eb`
- Branch is up to date with `origin/main`.

No acceptance, lint, typecheck, or full-suite tests were run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enforce websocket conversation-list limit range and repair prior CI findings","tdd_next":"remaining acceptance facets"}}