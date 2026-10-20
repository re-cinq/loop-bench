I have completed the TDD round for ticket #95.

### Accomplishments:
- **Research & Reproduction**: Confirmed that non-`Error` rejections (like strings or plain objects) bypassed the `onError` hook by running the existing acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts`. I also created a new facet test `src/orchestration/onErrorCoercion.test.ts` to precisely target this behavior.
- **Implementation**: Modified the `catch` block in `src/orchestration/chatOrchestrator.ts` to coerce any caught value that is not an `Error` into one using `new Error(String(error), {cause: error})`. This ensures the `onError` hook receives a consistent `Error` type while preserving the original rejection value as the `cause`.
- **Verification**: 
    - The new facet tests for string, `undefined`, and existing `Error` pass.
    - The existing acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts` now pass.
    - All existing unit tests in `src/orchestration/chatOrchestrator.test.ts` remain green, confirming no regressions.
- **Documentation**: 
    - Updated `CHANGELOG.md` with a "Fixed" entry describing the behavior change.
    - Updated `specs/hal-engine-config-hooks/spec.md` to link the new and existing tests to the relevant specification statement and ran the re-anchoring script.
- **DoD**: Ticked all facets and acceptance tests in `.lore/dod.md` as completed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error with a readable message","tdd_next":"acceptance green"}}