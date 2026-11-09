This round closed the final specification documentation facet for ticket #144:

- Documented `list_sessions` (Section 4.3), `session_list` (Section 5.9), and the associated user authorization rule (Section 12) in `specs/hal-engine-websocket-protocol/spec.md` with traceable parenthetical citations linking each requirement to its validating test in `src/transport/conversationList.acceptance.test.ts` and `src/transport/ws/messageHandler.test.ts`.
- Verified spec links, status, and anchor consistency via the repository's spec check scripts.
- Marked the facet complete in `.lore/dod.md`.
- Formatted changed files with Prettier, committed, and pushed the branch to `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md.","tdd_next":"acceptance green"}}