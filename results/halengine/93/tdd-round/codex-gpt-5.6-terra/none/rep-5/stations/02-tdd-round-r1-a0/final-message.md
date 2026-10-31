Fixed CI traceability/duplication findings, documented the breaking aggregate-usage behavior, and pushed `860b4fb`.

Verified: `timeout 300 npm test -- src/orchestration/chatOrchestrator.test.ts` — 25 passed. No test failures: 0 mine, 0 regressions. Acceptance tests were not run locally as required.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"acceptance green"}}