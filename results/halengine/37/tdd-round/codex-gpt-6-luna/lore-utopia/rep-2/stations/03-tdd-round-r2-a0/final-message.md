Added a pass-through test confirming valid input with an extra property reaches the executor unchanged and exactly once. Fixed the reported Jest global issue and three registry lint findings. The focused registry test file passes; I did not run acceptance tests or other checks.

Pushed commit `e254157` and merged no changes from `origin/main`. The branch is clean and up to date. **Red tests:** 1 was mine (the initial run exposed the missing Jest import); **regressions:** 0. The added pass-through test confirmed behavior that was already implemented.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pass valid input with undeclared extra properties through unchanged","tdd_next":"Cover invalid types, schema caching, privacy-safe rejection logs, and tool-loop retry behavior"}}