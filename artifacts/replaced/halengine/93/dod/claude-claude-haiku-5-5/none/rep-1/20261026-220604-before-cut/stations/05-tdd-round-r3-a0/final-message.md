Branch is up to date and clean. This round delivered:

1. **Fixed CI failure**: Ran `npm run spec:names -- --fix` to repoint 2 stale anchor line numbers in `specs/hal-engine-architecture/spec.md` that the CI spec-names check was reporting.

2. **Closed facet 3**: Added a one-line JSDoc comment to `afterModelResponse` in `OrchestratorHooks` making the turn-sum semantics explicit: `` `usage` is the token sum across every provider call in this turn; `undefined` when no provider reported usage. ``

3. **New test**: Added "sums usage across all rounds when each round reports usage" to `chatOrchestrator.test.ts` verifying the sum behavior when both rounds report usage (10/5 + 3/2 = 13/7/20).

4. **Spec updated**: Added validated-by link to the new test in `specs/hal-engine-config-hooks/spec.md`. Ran `spec:names --fix` twice to reanchor all citations shifted by the new test insertion.

No regressions written by me; 0 red tests were caused by my changes.

Unrelated smells noticed but not acted on: inline source-code line references in specs (e.g. `[chatOrchestrator.ts#L150]`) are not validated by `spec:names` so can drift silently; a dedicated check for those would help.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"facet 3: JSDoc comment on afterModelResponse making turn-sum semantics explicit","tdd_next":"acceptance green"}}