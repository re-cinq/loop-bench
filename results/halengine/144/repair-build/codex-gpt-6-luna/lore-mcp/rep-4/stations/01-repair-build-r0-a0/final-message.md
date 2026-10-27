Implemented the missing `list_sessions` handler, including authenticated-user scoping, ISO date serialization, and `UNSUPPORTED` for stores without `listFor`. Consolidated duplicated test helpers and fixed the reported boolean-argument lint finding.

`npm run test:coverage` passes: 69 suites, 696 tests. I did not run ESLint, as instructed. Commit `486f786` is pushed; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions had no handler; added the response path and fixed the reported test and lint findings"}}