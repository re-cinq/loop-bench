I have completed the round. I addressed the CI failure reported in the previous round and added unit-level test coverage for the ticket's requirements.

### Changes Made:
- **Spec Anchor Fix:** Ran `npm run spec:names -- --fix` to correctly anchor the test citation in `specs/hal-engine-config-hooks/spec.md`. The link for "runs onError and afterSession when beforeSession throws" now points to the correct line in the test file.
- **Unit Testing:** Added a new unit test to `src/orchestration/chatOrchestrator.test.ts` that specifically verifies the behavior when `beforeSession` throws. It confirms that both `onError` and `afterSession` hooks are executed in the correct order and that the original error is propagated to the caller.
- **Verification & Formatting:** Verified that the implementation in `src/orchestration/chatOrchestrator.ts` correctly awaits `beforeSession` inside the `try` block. Formatted the modified files with `prettier` before committing.
- **Repository State:** Committed and pushed the changes to the `loop-bench/94` branch. The branch is up to date with `origin/main`.

Note: I did not run the acceptance tests locally as instructed. Unit tests were also not executed in this environment due to policy restrictions on test runners, but the fix directly addresses the specific finding reported by CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed spec-names and added unit coverage","tdd_next":"acceptance green"}}