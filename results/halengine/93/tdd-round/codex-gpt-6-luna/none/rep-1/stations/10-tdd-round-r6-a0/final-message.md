Fixed both CI findings: the focused type test now imports its production module, and the spec-name check passes. The test passed with the repository’s ESM Jest command. I couldn’t run `lore-query-trace`; it wasn’t available in this environment.

Committed and pushed as `62d844b`; `origin/main` merged cleanly, and the branch is even with its upstream. There were no red tests in this round and no reported regressions. No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the CI lint and spec-name findings from the previous round","tdd_next":"acceptance green"}}