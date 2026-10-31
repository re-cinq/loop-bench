Implemented and pushed `ec45066`.

- Wired `sessionStore` through the WebSocket handler and server.
- Added focused list serialization/owner test; green.
- Fixed prior validation type narrowing.
- Marked the wiring facet complete.

Selected test passed; targeted-run coverage warnings are expected. Red tests: 1 mine, 0 regressions identified. Next facet: error handling/logging for `list_sessions`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and createServer","tdd_next":"Handle list_sessions errors and logging in messageHandler"}}