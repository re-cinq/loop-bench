Branch is pushed and up to date. 

This round closed 4 facets in one pass: types, validation, threading `sessionStore`, and the `list_sessions` handler. The validation test I wrote went red then green. The remaining open facets are re-exporting the new types from `src/index.ts` and spec documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames + dispatch handler","tdd_next":"re-export ListSessionsMessage/SessionSummaryFrame/SessionListMessage from src/index.ts, then spec documentation"}}