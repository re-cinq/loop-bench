Branch is up to date and pushed. 

Changes made this round:
1. Added `accumulateUsage` to `orchestratorHelpers.ts` — adds two `UsageMetadata` values, returning `round` when `acc` is undefined
2. Added unit tests for `accumulateUsage` in `orchestratorHelpers.test.ts`
3. Updated `chatOrchestrator.ts` — replaced `lastUsage = outcome.usage ?? lastUsage` with conditional accumulation via `accumulateUsage`, passed `totalUsage` to `afterModelResponse`
4. Updated `specs/hal-engine-config-hooks/spec.md` to describe the accumulated-sum behavior
5. Added CHANGELOG entry noting the behavior change and MINOR bump
6. Ticked all five facets in `.lore/dod.md`

No unrelated smells noticed that would need naming.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all tool rounds and pass sum to afterModelResponse","tdd_next":"acceptance green"}}