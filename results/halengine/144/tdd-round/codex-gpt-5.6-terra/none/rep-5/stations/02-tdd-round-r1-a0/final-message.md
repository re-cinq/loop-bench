Implemented and pushed `d9b1f96`.

- Closed: `list_sessions` validation for limits and cursors.
- Added focused validator test; red then green.
- Refactored acceptance setup to use shared WebSocket helpers and repaired spec citations.
- Ran only `src/transport/ws/validation.test.ts` (green).
- Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}