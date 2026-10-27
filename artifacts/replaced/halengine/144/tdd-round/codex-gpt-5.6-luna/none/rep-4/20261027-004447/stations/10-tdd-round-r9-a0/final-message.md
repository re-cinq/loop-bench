Implemented and pushed commit `74eb9cb`.

- Added real WebSocket coverage for amended conversation listing.
- Repaired stale spec links/names from CI.
- Updated DoD facet and citations.
- Test passed: `conversationListAmended.test.ts`
- Branch is synchronized with upstream.
- Red tests: 0; regressions: 0. Initial direct Jest invocation failed before execution due ESM setup, then passed via `npm test`.
- `lore-query-trace` was unavailable in this pod.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"amended list_conversations end-to-end WebSocket coverage","tdd_next":"legacy list_sessions acceptance green"}}