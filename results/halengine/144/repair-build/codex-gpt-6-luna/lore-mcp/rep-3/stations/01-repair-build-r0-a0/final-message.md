Implemented the missing WebSocket session-list handler and fixed the reported test and lint issues. `npm run test:coverage` passes: 69 suites, 696 tests. I did not run the linter, per the repository instructions.

Committed and pushed `9961156` (`fix(transport): handle session list frames`). Merging `origin/main` reported no changes; the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added session-list handling and fixed the reported test and lint findings"}}