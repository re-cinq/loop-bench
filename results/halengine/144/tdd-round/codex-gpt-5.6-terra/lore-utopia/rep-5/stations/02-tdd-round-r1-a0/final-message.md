Implemented and pushed `e5fc168`.

- Closed: validate `list_sessions` limit/cursor frames and strip unknown fields.
- Focused test passed via the repository test runner.
- Red tests: 1 mine, 0 regressions this round.
- Noted but left untouched: existing acceptance-test lint duplication.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}