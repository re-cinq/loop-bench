Implemented and pushed commit `98c7bb8` (`Escape required tool input paths`). The new focused test failed first, then passed after fixing JSON Pointer escaping for required-property names containing `/`. I also fixed both lint findings from the previous CI verdict.

Ran only the new test; no acceptance tests, lint, typecheck, or build were run. **Red tests:** 1 authored, 0 regressions. The branch is synced with its upstream. Next: cover the remaining registry and orchestrator behaviors and documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape special characters in required-property paths; resolve previous CI lint findings","tdd_next":"Add registry and orchestrator behavior tests and complete the remaining specification and documentation updates"}}