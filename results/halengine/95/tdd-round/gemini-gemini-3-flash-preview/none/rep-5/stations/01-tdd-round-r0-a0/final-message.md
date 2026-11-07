I have completed one red-green-refactor round for ticket #95.

### Changes:
- **`src/orchestration/chatOrchestrator.ts`**: Modified the `catch` block in `processMessageStream` to coerce non-`Error` rejections (like strings or plain objects) into `Error` instances before calling `hooks.onError`. The original rejection is preserved as the `cause` of the new `Error`.
- **`src/orchestration/chatOrchestrator_nonError.test.ts`**: Added new unit tests to verify that `onError` is correctly called with a coerced `Error` when the provider rejects with a string or a plain object.
- **`CHANGELOG.md`**: Added an entry under `[Unreleased]` describing the behavior change.
- **`.lore/dod.md`**: Ticked off the completed facets and acceptance criteria.

### Verification:
- **New Unit Tests**: `src/orchestration/chatOrchestrator_nonError.test.ts` passed (2/2).
- **Existing Unit Tests**: `src/orchestration/chatOrchestrator.test.ts` passed (26/26).
- **Acceptance Tests**: `src/orchestration/onErrorNonError.acceptance.test.ts` passed (2/2).
- **Formatting**: Ran `prettier --write` on all changed files.

I have pushed the changes and merged `origin/main`. All facets in `.lore/dod.md` are now complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"calls onError with an Error carrying a readable message when the stream rejects with a plain object","tdd_next":"acceptance green"}}