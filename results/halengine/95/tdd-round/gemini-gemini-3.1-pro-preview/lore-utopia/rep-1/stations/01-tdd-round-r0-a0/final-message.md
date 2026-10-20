I have completed the red-green-refactor loop for the first facet: coercing non-`Error` rejections into an `Error` so that the `onError` hook is consistently fired.

1. **Red**: Wrote two unit tests in `src/orchestration/chatOrchestrator.test.ts` to assert that `onError` is called with a wrapped `Error` instance when the stream throws a raw string or object. Verified they failed using the Jest runner.
2. **Green**: Implemented `coerceToError` in `src/orchestration/chatOrchestrator.ts` and updated the `catch` block to invoke `hooks.onError(session, error instanceof Error ? error : coerceToError(error))` while continuing to throw the original value to the caller. Tests passed.
3. **Refactor**: Verified that all existing `chatOrchestrator.test.ts` unit tests remained green unmodified. Updated the spec file links in `specs/hal-engine-config-hooks/spec.md` to reference the newly added unit tests, formatting and repointing spec anchors using `repoint-spec-anchors.mjs`. 
4. I checked off the completed facets in `.lore/dod.md` (and the `spec.md` replacement facet, as the flaw line was already updated in the branch), leaving only the `CHANGELOG.md` facet for the next round. 

The changes have been committed and pushed to `origin HEAD` and the branch is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error with a readable message","tdd_next":"Add a CHANGELOG.md entry under ## [Unreleased] describing the behaviour change for existing consumers."}}