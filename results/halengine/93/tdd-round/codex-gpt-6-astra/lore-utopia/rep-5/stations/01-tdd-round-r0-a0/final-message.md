Committed and pushed `e4b575e`; branch is clean and current with `main`.

Completed one round: usage reducer sums reported fields and preserves missing usage. New test passed after refactor. Red: one new suite; zero observed regressions. Acceptance tests were not run; CI verdict unavailable.

Next: wire the total into the hook. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields while preserving undefined for unreported turns","tdd_next":"Wire sumUsage into the orchestrator and expose an explicit total-usage hook contract"}}