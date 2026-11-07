Branch is up to date and pushed. All 7 tests pass (4 unit + 3 acceptance), 0 regressions.

**Summary:**
- **Facets closed**: 1 (types), 2 (validation), 3 (sessionStore threading), 4 (list_sessions handler)
- **Red test**: `list_sessions frame validation › accepts a bare list_sessions frame` — failed with "Unknown message type: list_sessions"
- **Green**: Added `ListSessionsMessage`/`SessionSummaryFrame`/`SessionListMessage` to `messages.ts`; `list_sessions` case in `validation.ts`; `sendSessionList` in `sender.ts`; `handleListSessions` in `messageHandler.ts` (off the lock, with ISO serialization, error logging); wired `sessionStore` in `createServer.ts`; re-exported from `index.ts`
- **Future smells noticed (not fixed)**: `answerListSessions` and `answerFrame` share validation-failure handling — could be unified into a common `answerNonLocked` dispatcher if a third non-locked frame type appears

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"types + validation + sessionStore threading + list_sessions handler (facets 1–4)","tdd_next":"docs: document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}