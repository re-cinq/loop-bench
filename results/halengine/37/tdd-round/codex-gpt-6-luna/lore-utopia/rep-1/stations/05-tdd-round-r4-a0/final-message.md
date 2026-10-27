Added a test proving a static tool schema compiles at registration and is reused across ten executions. The test failed when registration-time compilation was disabled, then passed after restoring the implementation. Also fixed the Ajv test-double cast reported by CI and updated the spec links and DoD checklist.

The single test passed. No acceptance tests, typecheck, lint, or build were run. CI had **0 failing tests**; its failure was a typecheck error, which this round fixes.

Committed and pushed as `c7d27ca`. The branch is up to date with `origin/main` and its upstream. Remaining work includes dynamic-schema caching coverage and documentation updates.

Unrelated smells observed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compiles once at registration across repeated executions","tdd_next":"dynamic schema caching and remaining documentation/unit-test facets"}}