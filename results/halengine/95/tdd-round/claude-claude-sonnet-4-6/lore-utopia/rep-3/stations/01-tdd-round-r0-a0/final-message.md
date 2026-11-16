Branch is clean and pushed. 

**What was done:**
- RED: wrote `chatOrchestrator.nonError.test.ts` testing that a thrown string calls `onError` with an `Error` whose `message` is that string — test failed because the `instanceof Error` gate skipped `onError` entirely
- GREEN: replaced the gated `if (hooks?.onError && error instanceof Error)` with an unconditional call through a new `toError(value)` helper that passes `Error` instances through unchanged and wraps everything else in `new Error(message, {cause: value})`
- Added CHANGELOG entry and ticked facets 1 and 3 in the DoD

**Unrelated smells noticed, not acted on:** none.

**Regressions:** 0 caused (existing `Error`-instance tests are confirmed unchanged by CI's run against `chatOrchestrator.test.ts`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to Error in catch block + CHANGELOG entry","tdd_next":"acceptance green"}}