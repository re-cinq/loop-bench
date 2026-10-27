Added and traced a test verifying a static tool schema compiles once across ten executions. Updated stale spec anchors and the DoD checklist. The focused test passed after refactoring; the commit was pushed, and the branch is up to date with `origin/main`.

One test written this round failed during the red phase; no regressions were observed. Lore could not retrieve the branch’s CI details, so the prior CI verdict still needs CI’s check after this push.

Unrelated smells: none acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify a static tool schema is compiled once across ten executions, and trace the test to the validation spec","tdd_next":"Remaining registry tests, spec links, and documentation"}}