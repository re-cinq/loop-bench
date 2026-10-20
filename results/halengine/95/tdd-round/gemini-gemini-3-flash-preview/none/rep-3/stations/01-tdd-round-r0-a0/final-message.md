I have completed the task to call `onError` for non-`Error` rejections in the orchestrator.

### Changes:
- **`src/orchestration/chatOrchestrator.ts`**: Updated the `catch` block in `processMessageStream` to coerce any caught rejection into an `Error` instance before calling `hooks.onError`. The coercion logic extracts a `message` from strings or objects (looking for `message` or `detail` properties) and preserves the original rejection as the `cause`.
- **`src/orchestration/onErrorNonError.test.ts`**: Added a new unit test suite to verify that string, plain object, and `undefined` rejections correctly trigger the `onError` hook with the expected `Error` shape and cause.
- **`specs/hal-engine-config-hooks/spec.md`**: Updated the specification with citations to the new unit tests and corrected the line numbers for existing acceptance test citations. The spec already contained the guarantee line, which I verified as now being correctly implemented.
- **`CHANGELOG.md`**: Added a new entry under `### Fixed` describing the improvement to the `onError` hook behavior.
- **`.lore/dod.md`**: Ticked off all completed facets and acceptance tests.

### Verification:
- Ran the new unit tests in `src/orchestration/onErrorNonError.test.ts` (3 passed).
- Ran existing unit tests in `src/orchestration/chatOrchestrator.test.ts` (26 passed).
- Ran acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts` (2 passed).
- Ran `scripts/repoint-spec-anchors.mjs` to ensure all spec citations are accurate and anchored correctly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections to Error in chatOrchestrator.ts and update spec/changelog","tdd_next":"acceptance green"}}