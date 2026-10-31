Implemented and pushed `aeb46f0` validating `list_sessions` limit/cursor fields and stripping unknown fields. Updated the spec trace link and DoD facet.

Test run: the new validator test passed. Red tests: 1 mine during red phase; regressions: 0.

Remaining facet: thread `sessionStore` through the WebSocket handler/server.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}