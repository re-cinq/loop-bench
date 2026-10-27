Implemented the missing WebSocket session list handler and shared test helpers to remove the reported duplicate code. `npm run test:coverage` passed: 69 suites, 696 tests. I formatted the changed files and committed and pushed `701334e`; the branch is up to date with its upstream.

I did not run the linter, as instructed. The push will let CI judge the lint fixes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented session list handling; coverage tests pass locally"}}