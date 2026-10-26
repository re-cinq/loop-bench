Everything looks correct. The implementation is pushed. Here's what this round accomplished:

**Fixed all previous-round CI failures:**
- Spec-names drift: updated 5 citations in spec files where a previous test insertion shifted line numbers in `validation.test.ts`
- Max-expects ESLint violations: consolidated 3 acceptance tests from 3-4 expects each to 1 `toMatchObject` call each
- Require-spec-link: added spec citations in new spec sections for all uncited tests

**TDD round for the dispatch facet:**
- Red: added unit test `answers with the user's conversation list when history is enabled` in `messageHandler.test.ts`
- Green: implemented `handleListConversations` outside the per-session turn lock, threading `history` + `sessionStore` options through `createMessageHandler`, `createServer`, and `config.ts`; added `UNSUPPORTED` to `ErrorCodes`; added `sendConversationList` to sender

**Also added:** sections 4.3 and 5.9 to the WebSocket protocol spec, CHANGELOG entry, ticked both remaining DoD facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Dispatch list_conversations outside the turn lock + thread history opt-in through server/config","tdd_next":"acceptance green"}}