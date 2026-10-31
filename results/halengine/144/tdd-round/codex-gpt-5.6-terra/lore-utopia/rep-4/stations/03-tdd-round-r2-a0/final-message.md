Committed and pushed `e6c107e` (`Wire session store into WebSocket handler`).

- Added a focused green handler test; 1 red test was mine, 0 regressions.
- Wired `sessionStore` through `createServer` and handler; list responses serialize dates.
- Repaired prior validator type narrowing, acceptance-test lint structure, citations, and changelog.
- Ran only the new handler test file successfully.

Next facet: complete `list_sessions` error handling/logging.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and createServer","tdd_next":"Handle list_sessions errors in the WebSocket message handler"}}