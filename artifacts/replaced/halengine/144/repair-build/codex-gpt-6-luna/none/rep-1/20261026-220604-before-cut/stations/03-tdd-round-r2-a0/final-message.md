Branch is pushed and up to date.

**Summary of this round:**

Fixed all 8 CI failures from the previous push:

- **typecheck**: Changed `as unknown as WebSocket` → `as unknown as ExtWebSocket` in 3 test files (`messageHandler.test.ts` ×2, `sessionSave.test.ts`)
- **eslint `no-nested-if`**: Extracted `listSessions()` function in `messageHandler.ts`; flattened guard clauses in `conversationList.acceptance.test.ts`
- **eslint `require-spec-link`**: Added validated-by links in `specs/hal-engine-conversation-list/spec.md` for both new tests
- **eslint `max-expects`**: Split the two-expect test into two single-expect tests with a shared `makeStore()` helper
- **eslint `declare-near-use`**: Resolved by the test split (each test declares `ws` immediately before use)
- **eslint member-chain**: Destructured `engine.wss.clients` in `wsTestSupport.ts`

0 regressions caused; 0 tests written were red (all pre-existing tests still pass).

Unrelated smells noticed but not touched: the `turnOver` function in messageHandler.test.ts has no spec link (pre-existing); `sessionSave.test.ts` unused `WebSocket` import cleanup was done as it became unused after the cast fix.

Next round: document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and the remaining DoD documentation facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures: nested-if, ExtWebSocket casts, max-expects, spec-link, member-chain","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md"}}