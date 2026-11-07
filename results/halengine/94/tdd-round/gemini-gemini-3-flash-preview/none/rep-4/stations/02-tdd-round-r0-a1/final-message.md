I have verified the implementation for Ticket #94 and confirmed that all facets described in `.lore/dod.md` are complete.

### Research & Verification
1.  **Code Analysis**: The `beforeSession` hook has been successfully moved inside the `try` block in `src/orchestration/chatOrchestrator.ts` (lines 91-92). This ensures that a throw from `beforeSession` is caught by the `catch` block (which invokes `onError`) and the `finally` block (which invokes `afterSession`).
2.  **Test Results**: I ran the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and the unit test `src/orchestration/chatOrchestrator.beforeSession.test.ts`. Both passed, confirming that `onError` and `afterSession` are correctly invoked when `beforeSession` throws.
3.  **Documentation**: I verified that `specs/hal-engine-config-hooks/spec.md` includes the new guarantee and correctly links to the acceptance test. `CHANGELOG.md` also contains an entry under the `[Unreleased]` section describing the fix.

### Changes Made
- Ticked the acceptance test box in `.lore/dod.md` to reflect that the ticket's primary goal is verified and passing.
- Committed and pushed this change, and ensured the branch is merged with `origin/main`.

Every facet in `.lore/dod.md` is now closed and the tests are green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}