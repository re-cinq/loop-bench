Branch is pushed and up to date. The implementation:

- Added `accumulateUsage(acc, round)` to `orchestratorHelpers.ts` — returns `undefined` if neither side has usage, otherwise sums all three fields
- Replaced `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = accumulateUsage(lastUsage, outcome.usage)` in `chatOrchestrator.ts` (line 117)
- Added 4 unit tests for `accumulateUsage` in `orchestratorHelpers.test.ts` — all pass
- Ticked the first two facets in `.lore/dod.md`

Remaining facets for subsequent rounds: type signature documentation, spec update, CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage fields across every round and pass sum to afterModelResponse","tdd_next":"update specs/hal-engine-config-hooks/spec.md to document new accumulated-usage behaviour and add CHANGELOG entry"}}