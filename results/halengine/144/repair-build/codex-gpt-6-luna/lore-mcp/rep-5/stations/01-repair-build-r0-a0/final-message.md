Implemented the missing `list_sessions` WebSocket response using the authenticated user and kept history requests off the turn lock. Also addressed the reported test lint findings.

`npm run test:coverage` passes: 69 suites, 696 tests. I did not run ESLint, as instructed. Commit `2d2d264` is pushed, the branch is up to date with `main`, and the working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added the missing session list WebSocket handler and resolved the reported test lint findings"}}