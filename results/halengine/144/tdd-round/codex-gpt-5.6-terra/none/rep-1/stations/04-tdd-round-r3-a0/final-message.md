Implemented and pushed `bb1267f`.

- Added list-store rejection handling: `ws` error log plus generic `SERVER_ERROR` response.
- Added/ran one focused test: red, then green.
- Fixed the reported test typing issue and stale spec anchors.
- Marked the handler facet complete; next is protocol/conversation-list documentation.
- Local: 1 intentional red test, 0 regressions identified. No acceptance tests or CI-only checks run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions store failures with ws logging and SERVER_ERROR","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}