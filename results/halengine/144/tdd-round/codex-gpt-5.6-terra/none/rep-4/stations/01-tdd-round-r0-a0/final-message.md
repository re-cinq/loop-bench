Delivered and pushed commit `5028f9e`.

- Added list/session frame types, unions, and public exports.
- Validator accepts and sanitizes bare `list_sessions` frames.
- Added focused validation coverage; it went red once, then green.
- Ran only `conversationListValidation.test.ts`; no regressions observed.
- Next facet: validate `limit` and `before`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}