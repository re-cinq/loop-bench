Implemented and pushed `bfc0fa6` (`Handle WebSocket session lists`).

- Added authenticated `list_sessions` handling with ISO serialization and error logging.
- Wired the store through `createServer`.
- Fixed prior CI type, lint, duplicate-helper, and spec-link findings.
- Ran the new handler test file successfully: 55 passing.
- Red tests: 1 authored this round; regressions: 0 observed.
- No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread and handle list_sessions through the WebSocket message handler","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}