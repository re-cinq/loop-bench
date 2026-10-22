I have completed one full red-green-refactor round, focusing on aligning the conversation list implementation with the ticket requirements and resolving the CI failures left by the previous round.

### 1. Research & Initial CI Fixes
I began by addressing the CI failures reported in the round brief:
- **Prettier:** Formatted `src/transport/conversationList.acceptance.test.ts`, `src/transport/ws/validation.ts`, and `src/transport/wsTestSupport.ts`.
- **ESLint:** Updated the status of `specs/hal-engine-websocket-protocol/spec.md` to "In Progress" to satisfy the coverage-matching requirement.
- **Spec Names:** Fixed 29 anchor drifts in `specs/hal-engine-session-resume/spec.md` by manually updating line numbers to match the current test positions.

### 2. TDD Loop: listFor Error Handling
The previous implementation returned an empty list when `listFor` was missing, which violated the ticket requirement to return an `UNSUPPORTED` error.
- **Red:** Added two unit tests in `src/transport/ws/messageHandler.test.ts` to expect an `UNSUPPORTED` error frame when `sessionStore.listFor` is undefined or when it throws the new `StoreCannotList` error.
- **Green:** 
    - Added the `StoreCannotList` error class to `src/types/sessionStore.ts`.
    - Updated `handleListConversations` in `src/transport/ws/messageHandler.ts` to return `UNSUPPORTED` in both cases, verified by the new tests.

### 3. Refactor: Conversation Naming Protocol
I performed a global refactor to change all "session" nomenclature to "conversation" for this feature, as explicitly requested in the ticket:
- **Wire Format:** Renamed `list_sessions` -> `list_conversations` and `session_list` -> `conversation_list`.
- **Types:** Renamed `ListSessionsMessage` -> `ListConversationsMessage` and `SessionListMessage` -> `ConversationListMessage` in `src/types/messages.ts`.
- **Internal Logic:** Updated validators, handlers, and senders to use the new names.
- **Tests & Specs:** Synchronized all acceptance and unit tests, and updated the protocol specifications in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
- **Final Validation:** Re-aligned all spec anchor links (812 citations verified green) and updated `.lore/dod.md` to reflect the final state.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"answers UNSUPPORTED when the store has no listFor or throws StoreCannotList","tdd_next":"acceptance green"}}