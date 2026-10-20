I have completed the TDD round for ticket #95.

### Changes delivered:
- **Reproduction**: Created `src/orchestration/onErrorNonError.unit.test.ts` to confirm that non-`Error` rejections (like a thrown string) bypassed the `onError` hook. The test failed as expected in the red phase.
- **Implementation**: Modified the `catch` block in `src/orchestration/chatOrchestrator.ts` to remove the `error instanceof Error` gate. All rejections are now coerced to an `Error` object using `new Error(String(error), {cause: error})` before being passed to the `onError` hook.
- **Verification**: 
    - The new unit test passed, confirming `onError` is now called with a wrapped `Error` and the original rejection is still propagated to the caller.
    - Verified that existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` still pass.
- **Documentation**: 
    - Updated `CHANGELOG.md` with a new entry under `Fixed` describing the change and its migration implications.
    - Updated `specs/hal-engine-config-hooks/spec.md` to include ticket #95 in the header and added a validation link to the new unit test.
    - All facets in `.lore/dod.md` have been ticked as complete.

### Smells noticed:
- The `saveSession` function in `chatOrchestrator.ts` also has an `instanceof Error` check for logging, but since it's just for formatting the log message and doesn't gate any hooks, I left it as is to remain surgical.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In `src/orchestration/chatOrchestrator.ts`, coerce a caught non-`Error` rejection to an `Error` so `hooks.onError` always fires","tdd_next":"acceptance green"}}