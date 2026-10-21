Committed and pushed `1ab74f5` (`test(orchestrator): repair onError traceability`). The affected test file passed: 2 tests. Formatting and spec line anchors were checked; the branch is clean and up to date with its upstream, and `origin/main` had no new changes.

This fixes the duplicate setup and stale spec citation named in the CI brief. I did not rerun lint or spec checks here. No red tests were mine; no regressions were reported. I couldn’t query the Lore trace graph because no Lore tools were available in this context.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair onError test duplication and spec traceability","tdd_next":"acceptance green"}}