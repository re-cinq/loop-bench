I have implemented the conversation list feature over the WebSocket protocol, following the ticket's specifications and correcting the naming from the previous round.

### Key Changes:
- **Protocol Naming**: Corrected `list_sessions` and `session_list` to `list_conversations` and `conversation_list` in `src/types/messages.ts`, `src/transport/ws/validation.ts`, and all related tests and documentation.
- **Message Handler**: Implemented `handleListConversations` in `src/transport/ws/messageHandler.ts`. It retrieves conversation summaries for the authenticated user (from `ws.userId`) and returns them as ISO-8601 strings.
- **Configuration**: Added `transport.history` option to `HalEngineConfig` and `HalServerOptions`, defaulting to `false`.
- **Error Handling**: Introduced `UNSUPPORTED` error code for cases where history is disabled or the store doesn't support listing. Added `StoreCannotList` error class to distinguish permanent store misconfiguration from transient failures.
- **ESLint Fixes**: 
    - Resolved code duplication by moving shared test helpers (`eventually`, `delegatingTo`) to `src/transport/wsTestSupport.ts`.
    - Fixed `prefer-early-return` in `conversationList.acceptance.test.ts`.
    - Fixed `no-flag-params` by removing boolean literals in `validation.test.ts`.
- **Verification**: All acceptance and regression tests passed locally, including `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts`.
- **Documentation**: Updated the WebSocket protocol specification, example configuration, and changelog. Regenerated `docs/getting-started.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented list_conversations handler, corrected protocol naming, and resolved ESLint duplication and style errors."}}