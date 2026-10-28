Committed and pushed `491d479`; branch is current with main and upstream.

One red-green-refactor round completed: the usage accumulator sums reported fields and preserves missing usage. The new test passes. Red failures: 1 mine, 0 observed regressions. Acceptance tests were not run.

Next: integrate the accumulator into the orchestrator and clarify the public contract. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pure usage accumulation with missing-report preservation","tdd_next":"Integrate accumulator into orchestrator and expose explicit total-usage contract"}}