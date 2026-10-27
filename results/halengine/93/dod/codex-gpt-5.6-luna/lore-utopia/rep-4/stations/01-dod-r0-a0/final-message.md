Implemented and pushed commit `4965fc9`.

- Added two failing acceptance tests in `src/orchestration/usageAggregation.acceptance.test.ts`.
- Added `.lore/dod.md` with `direct` strategy.
- Updated spec traceability.
- Tests run: only the new acceptance file.
- Both fail because only final-round usage is reported:
  - Expected `{inputTokens: 33, outputTokens: 14, totalTokens: 47}`, received `{3, 2, 5}`.
  - Expected sparse total `{11, 7, 18}`, received `{1, 2, 3}`.
- Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}