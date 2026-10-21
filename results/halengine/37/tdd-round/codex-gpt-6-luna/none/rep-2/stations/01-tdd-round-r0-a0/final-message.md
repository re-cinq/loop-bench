Added Ajv as a direct dependency and implemented the first validation slice: missing required fields return a rejection before the executor runs. Added and linked a focused test, updated the DoD checklist, and pushed commit `8dbc927`. The branch is up to date with its upstream.

The focused test was red before implementation and green afterward. No regressions were reported; the CI acceptance tests were not run. The requested `lore-query-trace` tool was unavailable in this session.

Unrelated finding left untouched: npm reported 26 dependency audit vulnerabilities.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add Ajv as a direct dependency","tdd_next":"Validate required, typed, and enum inputs with safe rejection messages"}}