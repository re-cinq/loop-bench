I have successfully completed this round by resolving all CI failures and fulfilling the remaining documentation requirements for the conversation list feature.

Summary of changes:
- **Fixed ESLint failures:** Resolved camelcase issues in `validation.ts` using `eslint-disable` for protocol types, moved `isInvalidLimit` below its caller, and shortened overly long comments in `example/full-config.ts`.
- **Corrected Spec Links:** Updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` to point to the correct line numbers in test files, ensuring they match both the actual `it` block positions and the traceability comments within the tests.
- **Fixed Spec Anchor Drift:** Resolved drift in `spec:names` by manually repointing citations to the correct line numbers (#L72, #L114, #L144).
- **Updated Documentation:** Added the missing `history: {enabled: true}` configuration to `example/full-config.ts` and added a new "Conversation List" section to `docs/getting-started.md` to describe the feature.
- **Verification:** Verified that both `src/transport/ws/listSessionsValidation.test.ts` and `src/transport/conversationList.acceptance.test.ts` pass using Jest. Ran `eslint`, `spec:names`, and `check:spec-links` to ensure the entire codebase is now green.
- **Finalization:** Formatted the changed files with Prettier, committed, and pushed the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failure repair and documentation update","tdd_next":"acceptance green"}}