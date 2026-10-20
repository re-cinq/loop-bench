I have completed the TDD round for ticket #95.

### Research & Strategy
I identified that `src/orchestration/chatOrchestrator.ts` was gating the `onError` hook behind an `instanceof Error` check, causing it to be bypassed for rejections like strings or plain objects. My strategy was to coerce any caught rejection into an `Error` object (using the original as the `cause`) before calling the `onError` hook, as described in `specs/hal-engine-config-hooks/spec.md`.

### Execution
1.  **Red Phase**: Created `src/orchestration/onErrorNonError.round.test.ts` with a test case where the provider rejects with a string. The test failed as expected (reception of `undefined` in the hook).
2.  **Green Phase**: Modified the `catch` block in `src/orchestration/chatOrchestrator.ts` to wrap non-`Error` rejections. Verified that the new test case and a second case for plain objects both passed.
3.  **Refactor Phase**: Ensured that existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` remained green, confirming no regressions for standard error handling.
4.  **Traceability**: Updated `specs/hal-engine-config-hooks/spec.md` to point to the new unit tests and corrected line numbers for the acceptance tests. Added a `CHANGELOG.md` entry documenting the fix and its migration implications.

### Results
- All facets in `.lore/dod.md` are completed.
- The behavior now guarantees `onError` is called for any rejection in the orchestrator turn.
- The original rejection is preserved as the `cause` for non-`Error` values, and propagated unchanged to the caller.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error","tdd_next":"acceptance green"}}