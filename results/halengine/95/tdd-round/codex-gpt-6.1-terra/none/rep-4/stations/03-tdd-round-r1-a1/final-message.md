Committed and pushed `b67e080`. The rejection-value test passes locally after addressing its reported lint findings; the acceptance fixture now uses a fixed timestamp, and its spec links point to the current test lines.

CI’s test job timed out with a truncated log, so I cannot determine how many red tests were from this branch or how many were regressions. The existing Error-instance tests still need CI confirmation. The coverage graph tool was unavailable, and this repair did not include a new red-green-refactor cycle.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair reported test lint and spec-link findings","tdd_next":"Confirm existing Error-instance tests remain green and inspect the next CI verdict"}}