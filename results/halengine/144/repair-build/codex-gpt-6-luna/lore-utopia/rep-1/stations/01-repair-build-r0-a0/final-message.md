Implemented the missing WebSocket session list handling, corrected the reported validation and lint issues, and shared duplicated test helpers. `npm run test:coverage` passed: 69 suites, 698 tests. I did not run the linter or build, per the pod instructions.

Committed and pushed as `20686eb`; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"session list frames were not handled; added authenticated, opt-in listing and corrected the reported test and lint findings"}}