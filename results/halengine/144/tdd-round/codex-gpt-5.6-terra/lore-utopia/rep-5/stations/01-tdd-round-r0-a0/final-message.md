Delivered and pushed `ffcfb08`.

- Added/exported `list_sessions` and `session_list` frame types.
- Bare `list_sessions` now validates and strips unknown fields.
- Added a spec-linked unit test; it was red, then green.
- Ran only `src/transport/ws/validation.test.ts` (4 passing).
- CI verdict was unavailable (`branch not found`); 1 red test was mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions optional limit and before fields"}}