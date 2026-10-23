Branch is pushed and up to date. 

**Round summary:**
- Facet closed: "Accumulate `outcome.usage` across rounds in `chatOrchestrator.ts`" — added `addUsage` to `orchestratorHelpers.ts`, imported and used it in the round loop (replacing `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = addUsage(lastUsage, outcome.usage)`).
- Unit test written: `addUsage > sums both operands when both are defined` in `orchestratorHelpers.test.ts`.
- 0 regressions; 5/5 tests in the test file pass.
- Unrelated smells noted (not acted on): `lastUsage` variable name in `chatOrchestrator.ts` could be renamed to `totalUsage` to better reflect its new accumulation semantics — this aligns with DoD facet 3 (rename/retype the hook parameter).
- Facet 1 and 2 ticked in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate outcome.usage across rounds (addUsage helper + chatOrchestrator wiring)","tdd_next":"rename/retype afterModelResponse usage parameter in OrchestratorHooks to signal turn total; then spec + changelog edits"}}