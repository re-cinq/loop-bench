Fixed the CI eslint failure by replacing `new Date()` with a stable timestamp. Formatted, committed, pushed, merged `origin/main`, and confirmed the branch is up to date.

No tests were run; the affected test is a prohibited acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the acceptance fixture deterministic for CI lint","tdd_next":"acceptance green"}}