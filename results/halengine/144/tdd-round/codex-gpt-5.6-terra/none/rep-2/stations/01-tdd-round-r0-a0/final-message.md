Added and pushed the public `list_sessions` / `session_list` frame types, union members, exports, and bare-frame validation that strips extra fields.

Focused test passed: `src/types/messages.test.ts`. No regressions reported locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts (optional non-negative integer limit; optional before object with 1–128 char sessionId and finite-date updatedAt string or number; strip unknown fields like userId)."}}