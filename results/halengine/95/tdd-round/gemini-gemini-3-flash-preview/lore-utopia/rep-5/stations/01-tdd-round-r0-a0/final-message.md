I have completed the TDD round for ticket #95. I implemented a coercion mechanism in `ChatOrchestrator` to ensure that `onError` is called even for non-`Error` rejections (like strings or plain objects), as described in the ticket and the first facet of the DoD.

### Changes Made:
- **Implementation:** Added a `toError` helper in `src/orchestration/chatOrchestrator.ts` that wraps non-`Error` rejections into an `Error` instance, preserving the original as the `cause`. Updated the `catch` block in `processMessageStream` to use this helper for the `onError` hook call while still rethrowing the original value to the caller.
- **Testing:** Created `src/orchestration/nonErrorCoercion.test.ts` with test cases for thrown strings, plain objects, and `undefined`. These tests verify that `onError` is called with a coerced `Error` and that the caller still receives the original rejection.
- **Verification:** Confirmed that existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` remain green.
- **Documentation:**
    - Updated `specs/hal-engine-config-hooks/spec.md` to point to the new unit tests as validation for the non-`Error` coercion behavior.
    - Added an entry to `CHANGELOG.md` describing the behavior change.
    - Updated `.lore/dod.md` to reflect that all facets for this round are complete.
- **Traceability:** Added spec links in the repository's established form.

I ran the repository's formatter on the changed files and verified the tests locally using `jest` with ESM support.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error with a readable message","tdd_next":"acceptance green"}}