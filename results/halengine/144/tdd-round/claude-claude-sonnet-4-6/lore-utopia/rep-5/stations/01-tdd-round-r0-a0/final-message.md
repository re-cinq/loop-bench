Branch is pushed and up to date. 

**Summary of this round:**
- Added `ListSessionsMessage`, `SessionSummaryFrame`, `SessionListMessage` to `src/types/messages.ts` and their union members
- Added `list_sessions` validation in `validation.ts` (non-negative integer limit, 1–128 char sessionId, parseable updatedAt, strips unknown fields)
- Added `sessionStore` optional parameter to `createMessageHandler` and wired it in `createServer.ts`
- Added `answerListSessions` handler that reads `session.userId` (not the frame's userId), calls `listFor`, serializes Dates to ISO, returns empty list when no listFor, logs + returns SERVER_ERROR on throw
- Wrote 11 new unit tests for validation, all passing

The one remaining facet is spec documentation (`specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`).

Unrelated smells noticed but not touched: `index.ts` doesn't yet re-export the new types (DoD facet 1 says to do this).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames + handle in messageHandler off the lock","tdd_next":"document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}