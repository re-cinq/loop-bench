Implemented and pushed commit `60250e9`.

- Wired session-store conversation listing into WebSocket handling.
- Fixed CI-reported test and lint issues.
- `npm run test:coverage`: 69 suites, 696 tests passed.
- Formatted changed files; branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Conversation-list frames were validated but never handled because the session store was not wired into the message handler."}}