Completed and pushed `6c7d001` adding public conversation-list frame types and exports.

Focused test: `src/types/messages.test.ts` passes.  
Red tests: 1 mine; regressions: 0.  
Next facet: validate `list_sessions` frames.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts, include them in IncomingMessage and OutgoingMessage, and re-export them from src/index.ts.","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}