Implemented and pushed commit `26d8daf`.

- Added focused regression for WebSocket conversation-list failures.
- Logs under `ws` with session/user context and returns `SERVER_ERROR`.
- Reused summary serialization helper.
- Reanchored spec links and added changelog entry.
- Focused test passed; no full suite/lint/typecheck run.

No regressions caused. Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions error handling and traceability repairs","tdd_next":"history opt-in and unsupported-store behavior"}}