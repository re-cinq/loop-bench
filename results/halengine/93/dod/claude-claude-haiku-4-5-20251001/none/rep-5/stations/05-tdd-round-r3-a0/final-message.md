The DoD already has all 5 facets checked. The CI failures were from the previous push's eslint and spec-names failures — I fixed:
1. `re-lint/callee-below-caller`: moved `makeToolOrchestrator` below `runAndCapture` in the acceptance test
2. `re-lint/require-spec-link`: the two failing tests now have valid spec links (since the spec line numbers are corrected)
3. `spec-names`: updated all 18 stale `#Lnn` anchors across 3 spec files

0 regressions caused — all changes are spec-anchor corrections and one function reordering, no logic changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI lint failures: callee-below-caller order and stale spec line anchors","tdd_next":"acceptance green"}}