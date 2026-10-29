Committed and pushed `12d303c`. This round added the WebSocket conversation-list handler and message types, repaired the visible CI citation and style findings, and kept the new test green after refactoring. I ran only `sessionListHandler.test.ts`; CI will judge the acceptance suite.

The new test was red before implementation and is now green. Red tests written this round: **1**. Known regressions: **0**. The next facet is protocol documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions frames for the authenticated user","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}