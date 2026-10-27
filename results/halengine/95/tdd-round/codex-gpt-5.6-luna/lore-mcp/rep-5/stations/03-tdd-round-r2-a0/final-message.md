Fixed the CI eslint failure by replacing `new Date()` with a deterministic timestamp. Formatted, committed (`988bd0e`), pushed, and confirmed branch is up to date with `origin/main`.

No tests were run because the only relevant test is an acceptance test explicitly prohibited by the round instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair nondeterministic acceptance-test fixture","tdd_next":"acceptance green"}}