Pushed cleanly. This round:

- **ESLint fix**: Flattened the nested `if` in `conversationList.acceptance.test.ts` (lines 57-68) using guard clauses — identical behavior, satisfies `re-lint/no-nested-if`.
- **Spec documentation**: Added §4.3 `list_sessions` and §5.9 `session_list` to `specs/hal-engine-websocket-protocol/spec.md` with test citations pointing at the three acceptance tests and the two validation unit tests.
- **dod.md**: Ticked all four remaining boxes (3 acceptance tests + documentation facet).

Smells noticed but not touched: the `handleListSessions` function casts `ws` to get `userId` (`(ws as WebSocket & {userId: ...}).userId`) instead of receiving `session` — this works because the connection handler sets `ws.userId`, but it's an indirect path that bypasses the typed `ChatSession`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in websocket protocol spec","tdd_next":"acceptance green"}}