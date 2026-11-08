I have fixed the red build by aligning the implementation with the specifications in ticket #144.

### Changes Made:
- **Naming Alignment**: Renamed all occurrences of the incorrect `list_sessions`/`session_list` frame types to the requested `list_conversations` and `conversation_list`.
- **Protocol Types**: Updated `src/types/messages.ts` and `src/index.ts` with `ListConversationsMessage`, `ConversationSummary`, and `ConversationListMessage`.
- **Error Handling**: 
  - Added `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
  - Exported `StoreCannotList` from `src/types/sessionStore.ts`.
  - Updated the message handler to return `UNSUPPORTED` when history is disabled, when the store does not implement `listFor`, or when it throws `StoreCannotList`.
- **Configuration**: Added `transport.history: {enabled: boolean}` to `HalEngineConfig` and threaded it through `createServer` to the message handler.
- **Validation**: Updated `src/transport/ws/validation.ts` to strictly enforce the `limit` range (1–200) and require both `updatedAt` and `sessionId` in the `before` cursor.
- **Test Deduplication**: 
  - Refactored `src/transport/wsTestSupport.ts` to include shared utilities like `eventually`, `delegatingTo`, `registerServer`, and `registerClient`.
  - Updated `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts` to use these shared utilities, resolving `re-lint/no-duplicate-code` errors.
- **Documentation**: 
  - Updated `specs/hal-engine-websocket-protocol/spec.md` with the new frame definitions.
  - Updated `specs/hal-engine-conversation-list/spec.md` and fixed all broken test-citation line numbers across multiple specs.
  - Updated `example/full-config.ts` and `CHANGELOG.md`.

### Verification:
- Ran `npm run test` for the affected suites (`conversationList.acceptance.test.ts`, `validation.test.ts`, and `sessionResume.test.ts`), all of which passed (32 tests total).
- Verified spec link integrity and anchor names using `check-spec-links` and `check-spec-anchor-names`.
- Formatted all changed files with Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Renamed frames to list_conversations/conversation_list, implemented history config and handler, and deduplicated tests."}}