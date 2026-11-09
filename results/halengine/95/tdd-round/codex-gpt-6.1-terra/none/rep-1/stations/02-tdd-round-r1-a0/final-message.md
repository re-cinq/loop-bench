Committed and pushed the fallback for rejection values whose string conversion throws. `onError` receives an `Error` with the original value as its cause, and the caller receives the original rejection.

The new test failed before the fix and passed afterward. The previous CI verdict reported four lint findings and two stale spec links; those were addressed. The branch is up to date with `origin/main` and its upstream.

The round observed **1 red test of its own and 0 red regression tests**. The Lore coverage query was unavailable, and CI will judge the acceptance tests and remaining checks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle rejection values whose string conversion throws","tdd_next":"Confirm existing Error-instance behavior and acceptance tests"}}