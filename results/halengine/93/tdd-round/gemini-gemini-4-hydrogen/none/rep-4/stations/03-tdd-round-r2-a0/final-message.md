Fixed the `spec-names` CI failure reported on `c0eb433`:

- Updated `specs/hal-engine-config-hooks/spec.md` to repoint the `passes the summed TotalTurnUsage across every round to afterModelResponse` citation from `#L592` to `#L591` in `src/orchestration/chatOrchestrator.test.ts`.
- Ran `npx prettier --write specs/hal-engine-config-hooks/spec.md` and `npm run spec:names` (passed: 592 citations verified; no Jest tests were run this round, 0 red tests of ours, 0 regressions).
- Committed `e006f82` and pushed to `origin/loop-bench/93` (up to date with `origin/main`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repoint stale spec-names citation in specs/hal-engine-config-hooks/spec.md to #L591","tdd_next":"acceptance green"}}