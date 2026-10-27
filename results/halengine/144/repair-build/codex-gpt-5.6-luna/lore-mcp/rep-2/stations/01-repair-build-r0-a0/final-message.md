Implemented and pushed `6bb1af9`.

- Wired WebSocket session-list handling to the authenticated user/store.
- Fixed reported lint duplication and flag-parameter issues.
- `npm run test:coverage` passes: 69 suites, 696 tests.
- Base branch merged; working tree is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"WebSocket list_sessions frames were validated but never dispatched to the session store or client."}}