This round implemented the types for `list_sessions` frames and their validation logic. 

1. Added `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts` and `src/index.ts`.
2. Created a failing test for `list_sessions` in `validation.test.ts`.
3. Implemented `validateListSessionsMessage` in `validation.ts` to parse and validate `limit` and `before` fields, making the test green.
4. Formatted the changed files. 

All newly added tests passed, and there were 0 regressions caused by these changes since no pre-existing unit tests failed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler"}}