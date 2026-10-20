Committed and pushed `0394ee3`. One red-green-refactor round completed: usage arithmetic sums reported fields and preserves missing usage.

New test: green. Initial red: 1 new suite; regressions unverified because Lore returned HTTP 403. Acceptance tests were not run.

Branch matches upstream and includes `origin/main`. Next: wire aggregation into the hook and clarify its public type. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pure usage aggregation with missing-report preservation","tdd_next":"Wire aggregate usage into the round loop and make the hook type explicit"}}