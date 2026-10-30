Completed and pushed commit `85bdde2`.

- Added rejection handling: logs under `ws` with authenticated user ID and returns `SERVER_ERROR`.
- Added and passed the focused unit test: 56 tests green in `messageHandler.test.ts`.
- Repaired prior CI lint findings and re-anchored all shifted spec links.
- Updated `.lore/dod.md`; next facet is protocol documentation.
- Intentional red tests: 1. Regressions: 0.
- Branch is synchronized with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle a rejecting listFor by logging via log.error('ws', ...) and sending ErrorCodes.SERVER_ERROR","tdd_next":"Document list_sessions and session_list in the WebSocket protocol and conversation-list specs"}}