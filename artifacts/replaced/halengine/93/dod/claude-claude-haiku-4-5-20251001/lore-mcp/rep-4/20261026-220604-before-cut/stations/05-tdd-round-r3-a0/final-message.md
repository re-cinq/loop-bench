Branch is up to date and clean. This round delivered:

1. **Fixed CI spec-names failures** (4 line-number drifts in `specs/hal-engine-config-hooks/spec.md`) via `npm run spec:names -- --fix`
2. **Closed the type signature facet** — exported `AccumulatedUsageMetadata = UsageMetadata` from `chatOrchestrator.ts`, updated `afterModelResponse`'s `usage?` parameter and the `lastUsage` local to use this named alias, re-exported it from `src/index.ts`, added a contract test, and added the corresponding spec statement

0 regressions introduced. 1 test written (contract test, started GREEN since ts-jest doesn't check types at runtime — the type-level RED/GREEN happens under CI's `typecheck` step).

Unrelated smell noticed: `UsageMetadata` import in `chatOrchestrator.ts` could potentially be narrowed to a type-only import, but this was not touched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add or update type signature for afterModelResponse to make the accumulated sum unambiguous","tdd_next":"acceptance green"}}