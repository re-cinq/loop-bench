Implemented and pushed one round:

- Added session list message types and exports.
- Added type fixture and traceability citation.
- Updated changelog and checklist.
- Addressed reported CI lint/spec issues.
- Ran only `src/types/messages.test.ts` — passed.
- Merged `origin/main`; branch is synchronized.

Next facet: thread the session store into the WebSocket message handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions/session_list message types and exports","tdd_next":"thread sessionStore into createMessageHandler and createServer"}}