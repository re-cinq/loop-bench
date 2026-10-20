I have completed the TDD round for ticket #95.

**Summary of Changes:**
- **Implementation:** Modified the `catch` block in `src/orchestration/chatOrchestrator.ts` (specifically within `processMessageStream`) to ensure `hooks.onError` is called for every rejection. If the caught error is not an `Error` instance (e.g., a string or plain object), it is now wrapped in an `Error` using `new Error(String(error), {cause: error})`.
- **Reproduction Test:** Created `src/orchestration/reproduction_95.test.ts` to verify the fix for various rejection types: strings, plain objects, `undefined`, and standard `Error` instances. This test initially confirmed the bug (where `onError` was skipped) and now passes with the fix.
- **Regression Testing:** Fixed a `ReferenceError` in the existing test file `src/orchestration/chatOrchestrator.test.ts` by adding missing `vitest` imports (`describe`, `it`, `expect`, `vi`). Verified that all 26 existing tests in that file remain green.
- **Documentation:** Updated `CHANGELOG.md` to describe the behavior change and updated `.lore/dod.md` to tick off the completed facets. Verified that `specs/hal-engine-config-hooks/spec.md` already contains the correct guarantee.

**Verification:**
- `src/orchestration/reproduction_95.test.ts` passed (4 tests).
- `src/orchestration/chatOrchestrator.test.ts` passed (26 tests).
- Files formatted with `prettier`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"calls onError with a wrapped Error when a string is thrown","tdd_next":"acceptance green"}}