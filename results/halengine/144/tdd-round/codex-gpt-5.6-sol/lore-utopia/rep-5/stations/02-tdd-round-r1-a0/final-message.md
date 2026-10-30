Completed and pushed commit `364206b`.

- Added `list_sessions` validation and focused unit coverage.
- Repaired all prior CI lint/changelog findings.
- Updated traceability links and DoD facet.
- Test run: `src/transport/ws/validation.test.ts` — 4 passed.
- Acceptance tests, lint, typecheck, and full suite were not run.
- Previous CI reds: 3 branch acceptance tests, 0 regressions.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions limit and before fields","tdd_next":"thread sessionStore into createMessageHandler and createServer"}}