Implemented and pushed commit `1d9db38`.

- Threaded `sessionStore` into WebSocket handling.
- Added `list_sessions` dispatch and ISO-serialized responses.
- Added focused regression test.
- Updated traceability, changelog, checklist, and CI-related test issues.
- Focused test passed; no full suite/lint/typecheck run.
- Branch is synchronized with `origin/main`.

Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into the message handler and deliver list_sessions responses","tdd_next":"document list_sessions and session_list in the WebSocket and conversation-list specs"}}