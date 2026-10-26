Branch pushed and up to date. Round summary:

- **Facet closed:** Made the validator accept `list_conversations` and reject invalid `limit` (non-integer, out of 1–200 range) and non-cursor `before` values with field-specific errors.
- **Changes:** `src/types/messages.ts` gained `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, `ConversationListMessage` (additive, no existing lines touched); `src/transport/ws/validation.ts` got the `list_conversations` case and its validation function; `src/transport/ws/validation.test.ts` got the unit test.
- **Regressions:** 0 tests written by me turned red, 0 pre-existing tests broken.
- **Unrelated smells noted (not fixed):** `messageHandler.ts:answerFrame` will silently ignore a valid `list_conversations` frame until the next facet wires the handler — that's by design for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the validator accept and validate the list request","tdd_next":"Add the authenticated, opt-in WebSocket list response and its wire types"}}