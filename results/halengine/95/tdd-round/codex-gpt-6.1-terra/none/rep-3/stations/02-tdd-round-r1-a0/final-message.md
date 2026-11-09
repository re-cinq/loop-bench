Fixed both reported CI findings: the acceptance fixture uses a fixed timestamp, and the changelog describes the `onError` behavior for consumers. The test assertions are unchanged.

Committed and pushed as `4149034`; the branch is up to date with `origin/main` and its upstream. No tests were run locally: this round repaired CI findings, and the existing Error-instance tests remain for CI to confirm. CI reported no red tests and no regressions; its failures were ESLint and the changelog check.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document onError behavior and fix the nondeterministic acceptance fixture","tdd_next":"Confirm existing Error-instance tests through CI"}}