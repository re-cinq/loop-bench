Implemented and pushed commit `8cc6980`.

- Added WebSocket conversation-list handling using the authenticated socket user.
- Forwarded pagination options and serialized dates.
- Handled missing/failing stores.
- Fixed all reported lint patterns without suppressions.
- Scoped verification passed: 3 suites, 61 tests.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Conversation-list frames were validated but never handled; added handler wiring and fixed reported lint violations"}}