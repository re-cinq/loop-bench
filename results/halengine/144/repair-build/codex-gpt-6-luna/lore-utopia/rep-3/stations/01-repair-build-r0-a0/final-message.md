Implemented and pushed the WebSocket session-list handler, history opt-in, and `UNSUPPORTED` response for unavailable stores. The acceptance test now passes; `npm run test:coverage` passed all 69 suites and 696 tests. I did not run ESLint, as instructed, and fixed its reported findings from the CI annotations.

Commit `e9e33c8` is pushed, and the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The session-list frames were ignored; the handler now answers them for the authenticated user, and the reported test suite passes locally."}}