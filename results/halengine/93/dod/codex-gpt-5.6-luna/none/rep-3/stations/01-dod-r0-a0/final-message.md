Added and pushed direct acceptance tests in `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`, plus `.lore/dod.md` and spec traceability.

The named test command fails correctly:

- Expected `{inputTokens: 19, outputTokens: 7, totalTokens: 26}`, received `{inputTokens: 7, outputTokens: 3, totalTokens: 10}`.
- Expected `{inputTokens: 13, outputTokens: 3, totalTokens: 16}`, received `{inputTokens: 4, outputTokens: 1, totalTokens: 5}`.

Commit: `ff7aa5a`. Branch is pushed and up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}