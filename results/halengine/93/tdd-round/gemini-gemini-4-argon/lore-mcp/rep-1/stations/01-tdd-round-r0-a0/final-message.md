Completed one red-green-refactor round for #93:

- **Red tests**: 1 red test was mine (`sums the usage of every round, not only the last` in `src/orchestration/chatOrchestrator.test.ts` before implementation, now green) and 0 were regressions.
- **Unrelated smells**: None noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract, sum token fields across reporting rounds, preserve the no-tool regression guard, and update specs and CHANGELOG","tdd_next":"acceptance green"}}