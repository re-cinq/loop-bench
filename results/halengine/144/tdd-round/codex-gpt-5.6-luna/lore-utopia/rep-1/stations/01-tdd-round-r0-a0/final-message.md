Implemented and pushed one TDD round:

- Added conversation-list message types and public exports.
- Added `list_conversations` validation.
- Added traced unit coverage and updated DoD.
- Test passed: `src/transport/ws/validation.test.ts`
- Merged `origin/main`; branch is up to date.
- No acceptance tests run; CI verdict unavailable (Lore returned 404).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"conversation list message types and validation contract","tdd_next":"WebSocket handler, history opt-in, errors, and transport integration"}}