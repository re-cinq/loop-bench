Fixed both CI findings: the acceptance test now uses a fixed timestamp, and the spec’s cause-test link is in the required trailing parenthetical. The acceptance assertions are unchanged.

Committed and pushed as `51eb1c4`; the branch is up to date with `origin/main` and its upstream. No tests were run locally for these CI repairs. The reported CI failures contained no red tests: 0 were ours and 0 were regressions. CI still needs to confirm the existing Error-instance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI traceability and nondeterministic timestamp findings","tdd_next":"Confirm existing Error-instance tests remain green in CI"}}