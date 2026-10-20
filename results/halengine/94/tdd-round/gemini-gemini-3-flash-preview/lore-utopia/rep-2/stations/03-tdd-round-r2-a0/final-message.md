I have fixed the spec anchor mismatch reported by CI in the previous round. The citation for "runs onError and afterSession when beforeSession throws" in `specs/hal-engine-config-hooks/spec.md` was pointing to line #L62, but the test in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is actually at #L35.

I verified the implementation in `src/orchestration/chatOrchestrator.ts`, confirming that `beforeSession` is now correctly invoked within the `try` block, ensuring both `onError` and `afterSession` hooks fire upon failure. I also confirmed that `CHANGELOG.md` and the spec correctly document these new guarantees.

I ran `npm run spec:names` to confirm the fix and ensured the spec file is properly formatted. Finally, I merged `origin/main` to ensure the branch is up to date and pushed the changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}