Repaired the CI findings by making the acceptance-test timestamp deterministic and correcting both spec links. Committed and pushed as `c819caa`; the branch is up to date with `origin/main` and its upstream.

No tests were run locally: this round repaired CI findings without changing assertions, and the acceptance tests are reserved for CI. The previous verdict reported no red tests and no regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair deterministic acceptance fixture and spec links","tdd_next":"Confirm existing Error-instance tests through CI"}}