Committed and pushed `1d7ba7e` (`feat(ws): validate conversation list frames`).

Added additive list-session wire types and validation that strips client `userId`; updated traceability and checklist. The focused validation test passed. Red tests: 1 mine, 0 regressions. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}