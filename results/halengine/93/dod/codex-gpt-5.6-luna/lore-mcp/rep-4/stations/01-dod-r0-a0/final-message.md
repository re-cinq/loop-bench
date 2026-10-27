Added and pushed commit `1752ab7`.

- Strategy: `direct`
- Added `usageAcrossToolRounds.acceptance.test.ts` with two failing acceptance tests.
- Updated `.lore/dod.md` and spec traceability.
- Tests run: `npm test -- src/orchestration/usageAcrossToolRounds.acceptance.test.ts --silent`
- Both tests fail because usage is currently only from the final reported round:
  - Expected `{ inputTokens: 40, outputTokens: 6, totalTokens: 46 }`, received `{30, 4, 34}`.
  - Expected partial sum `{12, 3, 15}`, received `{7, 2, 9}`.
- Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}