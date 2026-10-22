I fixed the CI failures reported in the previous round by making the MongoDB test support more robust. Specifically, I increased the `launchTimeout` for `mongodb-memory-server` to 120 seconds to accommodate binary downloads and slow startup in resource-constrained environments, and I added defensive checks to `mongoCollection` to prevent the `TypeError` when the harness fails to start. I also updated the status of the WebSocket protocol specification to `Shipped` and ensured all spec links were correct.

Summary of changes:
- Modified `src/infrastructure/stores/mongo/mongoTestSupport.ts` to increase startup timeout and add defensive checks.
- Updated `specs/hal-engine-websocket-protocol/spec.md` status to `Shipped` and added issue #144.
- Updated `specs/hal-engine-conversation-list/spec.md` to include issue #144.
- Verified fixes by running `src/infrastructure/stores/mongo/mongoConversationList.test.ts` and `src/infrastructure/stores/mongo/mongoRedaction.test.ts` locally.
- Ran `repoint-spec-anchors.mjs`, `check-spec-links.mjs`, and `check-spec-status.mjs` to ensure documentation integrity.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures","tdd_next":"acceptance green"}}