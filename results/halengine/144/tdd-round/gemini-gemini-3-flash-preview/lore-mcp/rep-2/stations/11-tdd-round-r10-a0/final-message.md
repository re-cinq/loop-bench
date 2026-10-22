I have completed the task of fixing the CI failures and finalizing the delivery of ticket #144.

In this round, I addressed the following issues reported by CI:
1.  **Fixed Spec Links**: Updated `specs/hal-engine-websocket-protocol/spec.md` to point to the correct line number (`#L87`) for the test `warns when history is enabled without resume` in `src/transport/createServer.test.ts`. This resolved both the `spec-names` failure and the `eslint` error (`re-lint/require-spec-link`) which complained about the missing spec link.
2.  **Updated Spec Status**: Changed the status of `specs/hal-engine-websocket-protocol/spec.md` from `In Progress` to `Implemented`, reflecting that the WebSocket support for conversation listing is now fully designed and implemented.
3.  **Updated Definition of Done**: Ticked the remaining acceptance tests in `.lore/dod.md` as the implementation is complete and verified by the existing test suite.
4.  **Verification**: Confirmed that `CHANGELOG.md` already contained the appropriate entry for the new feature and that all facets were previously completed.

The changes have been committed, pushed to the branch, and merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}