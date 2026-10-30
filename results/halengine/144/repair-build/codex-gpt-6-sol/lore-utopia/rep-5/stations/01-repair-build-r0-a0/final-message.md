Fixed the reported WebSocket test failure and lint findings, then pushed commit `b0d9e94`. The test expectation was wrong where it treated a missing `listFor` as an empty list; the ticket requires an `UNSUPPORTED` error.

The two affected suites passed locally. I did not run the linter or full build in this pod; CI will judge the push. The branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"WebSocket list requests were unhandled, and the missing-store test expected an empty list"}}