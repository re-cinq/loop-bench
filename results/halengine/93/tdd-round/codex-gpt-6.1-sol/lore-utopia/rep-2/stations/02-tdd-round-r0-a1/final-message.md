Committed and pushed `246d42e`: provider-round usage now accumulates, preserving totals across missing reports.

One new test went red, then green after implementation and refactoring. No regressions observed; broader CI status was unavailable because Lore returned 403. Acceptance tests were not run.

`main` is merged; the branch is fully pushed. Next: make the public total-usage contract explicit. The descriptor `spec` field gap is recorded in the checklist.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields across provider rounds while preserving undefined when none report usage","tdd_next":"Make the public total-usage contract explicit"}}