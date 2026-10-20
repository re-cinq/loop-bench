Fixed CI failures by updating `src/orchestration/toolBudget.test.ts` to use the new `TurnUsage` type for the `afterModelResponse` hook and adding the required spec link to `specs/hal-engine-config-hooks/spec.md` to satisfy ESLint requirements. Verified that both unit tests and acceptance tests for aggregate usage now pass.

- Fixed type errors in `toolBudget.test.ts`: Updated `afterModelResponse` handler to accept `TurnUsage` and imported the type.
- Fixed ESLint error: Added a new spec statement to `specs/hal-engine-config-hooks/spec.md` for aggregate usage with gaps and linked it to the corresponding acceptance test.
- Updated `dod.md`: Ticked all facets as completed and verified.
- Verified behavioral correctness: Successfully ran `src/orchestration/toolBudget.test.ts` and `src/orchestration/chatOrchestratorUsage.acceptance.test.ts` with Jest.
- Pushed changes and merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"acceptance green"}}