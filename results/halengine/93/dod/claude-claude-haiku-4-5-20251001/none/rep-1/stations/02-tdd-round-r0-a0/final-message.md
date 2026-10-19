Branch is up to date. Summary of this round:

- Added `accumulateUsage(acc, next)` helper to `orchestratorHelpers.ts` that sums `UsageMetadata` fields, returning `undefined` only when both inputs are undefined
- Updated `chatOrchestrator.ts` to use `accumulateUsage(lastUsage, outcome.usage)` instead of `outcome.usage ?? lastUsage`, so all rounds' usage is summed before reaching `afterModelResponse`
- Added 3 unit tests for the helper, all green
- Updated spec.md to replace the "under-counts" note with the new summed-usage behaviour and a test citation
- Added CHANGELOG entry noting the behavior change for tool-heavy turns
- Ticked two DoD facets (helper + orchestrator change + spec + changelog); one facet left (type signature documentation)

Unrelated smells noticed but not acted on: the "Measured semantics — out of scope" section intro still says "This issue changes none of them" (referring to issue #36 context); the code reference `chatOrchestrator.ts#L148` in bullet 1 of that section now points to L149 after the import-line addition.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulateUsage helper + orchestrator usage accumulation + spec/changelog updates","tdd_next":"Update type signature or JSDoc of afterModelResponse to clarify usage is summed"}}