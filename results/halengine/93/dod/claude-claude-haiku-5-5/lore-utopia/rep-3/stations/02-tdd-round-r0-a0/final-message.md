Branch is up to date. The round closed one facet:

- Added `accumulateUsage` in `orchestratorHelpers.ts` that sums token counts across rounds (returning the defined value if only one side is present, `undefined` if both are absent)
- Replaced the last-wins `outcome.usage ?? lastUsage` in `chatOrchestrator.ts` with `accumulateUsage(lastUsage, outcome.usage)`
- All 31 existing tests pass including the guard test `receives collected response text and usage`

Unrelated smell noticed: the `stopReason: reported` stop-chunk construction in `askForTool` uses `usage: reported` where `reported` could be `undefined` — this is actually correct TypeScript (the `stop` chunk's `usage` field is optional), so no action needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across every provider call in processMessageStream, skipping rounds that report none","tdd_next":"Make the type say the turn total: document afterModelResponse usage argument as the turn sum"}}