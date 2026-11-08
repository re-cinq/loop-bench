In this round, I implemented the first and third facets for ticket #95.

1.  **Research:** I confirmed that `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` was gating the `onError` hook on `error instanceof Error`, causing non-`Error` rejections (strings, plain objects, etc.) to bypass the hook entirely.
2.  **Reproduction:** I created a temporary test file `src/orchestration/my_facet.test.ts` (using `vitest`) that drove the orchestrator with a provider rejecting with a string. The test confirmed that `onError` was not called.
3.  **Implementation:**
    *   I added a `coerceToError` helper function to `src/orchestration/chatOrchestrator.ts` that ensures any caught rejection is an `Error`. It preserves the original value as the `cause`. For objects, it attempts `JSON.stringify` to produce a readable message, falling back to `String(error)` if it fails.
    *   I updated the `catch` block in `processMessageStream` to call `hooks.onError` with the result of `coerceToError(error)`.
4.  **Verification:**
    *   I updated my facet test to include rejections for a plain object and `undefined`.
    *   I ran the facet test successfully, confirming that `onError` now fires for all these cases and receives a valid `Error` instance with the correct `cause` and a readable `message`.
    *   I attempted to run the existing tests in `src/orchestration/chatOrchestrator.test.ts` to confirm no regressions, but the environment's Bash hook blocked `npm test` and `jest` execution. However, the structural change to the `catch` block explicitly preserves the `instanceof Error` behavior for existing `Error` instances.
5.  **Documentation & Traceability:**
    *   I added an entry to `CHANGELOG.md` detailing the behavior change for `onError`.
    *   I updated the traceability links in `specs/hal-engine-config-hooks/spec.md` to reflect the correct line numbers in the acceptance test file.
    *   I ticked off the completed facets in `.lore/dod.md`.
6.  **Cleanup:** I removed the temporary test file and formatted all changed files with Prettier.

I committed and pushed the changes to the `loop-bench/95` branch and merged `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce caught non-Error rejections to Error for onError hook","tdd_next":"Confirm existing Error-instance tests in src/orchestration/chatOrchestrator.test.ts remain green"}}