I have successfully fixed the RED build for ticket #144. The implementation now correctly delivers a user's conversation list over the WebSocket protocol, adhering to the requested naming conventions and architectural decisions.

### Key Changes:
- **Implemented `list_conversations` handler**: Updated `createMessageHandler` to accept `SessionStore` and a configuration object. The handler now processes `list_conversations` frames off the per-session lock, as required, and returns a `conversation_list` frame with ISO-formatted timestamps.
- **Renamed frames and types**: Aligned the protocol implementation with the ticket's specifications by renaming `list_sessions`/`session_list` to `list_conversations`/`conversation_list` across message types, validation logic, senders, and tests.
- **Resolved Lint Failures**:
  - Fixed code duplication in test files by moving the `eventually` helper to `src/transport/wsTestSupport.ts`.
  - Applied the `prefer-early-return` pattern in `conversationList.acceptance.test.ts`.
  - Resolved `no-flag-params` in `validation.test.ts` by replacing boolean literals in cursor validation objects.
- **Added Public Surface**: Exported `StoreCannotList` error from the package root and added the `UNSUPPORTED` error code to `ErrorCodes`.
- **Updated Specifications and Docs**: Extended `hal-engine-websocket-protocol/spec.md` with Sections 4.3 and 5.9, updated `hal-engine-conversation-list/spec.md`, and regenerated `docs/getting-started.md` via `example/full-config.ts`.
- **Verified with Tests**: Confirmed that `conversationList.acceptance.test.ts`, `validation.test.ts`, and `sessionResume.test.ts` all pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented list_conversations handler, aligned frame names with spec, and fixed lint/test failures."}}