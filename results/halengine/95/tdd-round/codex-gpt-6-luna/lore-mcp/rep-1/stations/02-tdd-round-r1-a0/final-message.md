Added a focused regression test proving `onError` and the caller receive the same `Error` instance. It failed when pass-through was temporarily removed and passed after restoration. Also fixed the prior CI findings for nondeterministic timestamps, assertion count, spec citation, and changelog. Updated the checklist and spec.

Only the new test was run; the acceptance suite and other checks were left to CI. The branch is clean and matches its upstream at `0f2b1fe`. Red tests: 1 written this round, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm existing Error-instance behavior and document the consumer-facing change","tdd_next":"acceptance green"}}