Implemented and pushed `78c71e8`.

- Added WebSocket list failure handling with `SERVER_ERROR` and `ws` diagnostics.
- Added one red→green unit test; it passes.
- Fixed the prior test typing failure and CI-reported stale trace links.
- Marked the handler facet complete; next facet is documentation.

Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in the WebSocket message handler","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}