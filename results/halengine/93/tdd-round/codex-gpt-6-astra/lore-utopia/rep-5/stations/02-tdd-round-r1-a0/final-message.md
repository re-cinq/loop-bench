Committed and pushed `0e25c06`. One red-green-refactor round completed: turn usage now accumulates across provider calls.

New test: 1 failed before implementation, then passed after refactoring. No regressions identified in the supplied CI verdict. Acceptance tests remain CI’s responsibility.

Fixed the reported lint findings and changelog omission. Branch is synchronized with upstream and main. Next: explicit public total-usage contract. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire sumUsage into the orchestrator round loop and pass the total to afterModelResponse","tdd_next":"Expose an explicit public total-usage contract"}}