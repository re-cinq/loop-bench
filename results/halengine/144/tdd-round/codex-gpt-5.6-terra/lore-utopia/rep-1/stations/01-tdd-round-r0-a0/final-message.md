Completed and pushed `f052d79` (`feat(ws): add session list frame types`).

Added session-list protocol types, public exports, bare-frame validation with userId stripping, focused coverage, spec citation, and updated DoD. The focused Jest test passed. Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}