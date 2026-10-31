Completed and pushed `f3c5bef`.

- Added and exported session-list protocol types.
- Added a red-then-green validator test for bare `list_sessions` frames stripping `userId`.
- Ran only `src/transport/ws/validation.test.ts`: passing.
- Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}