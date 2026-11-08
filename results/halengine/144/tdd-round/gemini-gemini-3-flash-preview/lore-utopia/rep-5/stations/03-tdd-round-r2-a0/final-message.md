In this round, I focused on resolving the critical CI failures that left the build in a red state, while also completing the final documentation facet of the ticket.

### Research & Strategy
The previous round left several build failures:
1.  **Type Errors:** A type mismatch in `src/transport/ws/messageHandler.ts` where `SessionCursor` was not assignable to a narrower type, and a missing `InMemorySessionStore` import in `src/transport/wsTestSupport.ts`.
2.  **Lint Failures:** Several tests in `src/transport/sessionResume.test.ts` were missing spec links, and existing links in other specs were "rotten" (pointing to incorrect line numbers).
3.  **Changelog:** The `CHANGELOG.md` was missing entries for the newly added WebSocket frames.

My strategy was to fix these build-breaking issues first, then complete the documentation requirements from the ticket.

### Execution
1.  **Fixed Type Errors:** Updated the `handleListSessions` signature in `messageHandler.ts` to use `SessionCursor` and added the missing import in `wsTestSupport.ts`.
2.  **Repointed Spec Anchors:** Used `scripts/repoint-spec-anchors.mjs` and manual edits to fix all rotten anchors in `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`.
3.  **Updated Documentation:**
    *   Added a new "Conversation List" section to `docs/getting-started.md`.
    *   Enabled the `history` feature in `example/full-config.ts` and synced the doc blocks.
    *   Added detailed entries to `CHANGELOG.md` under `## [Unreleased]`.
4.  **Verification:** Ran unit tests for `messageHandler`, `validation`, and `sessionResume` using Jest to confirm the fixes (all passed). I did not run the acceptance tests as they are reserved for CI.
5.  **Finalization:** Formatted all changed files and merged with `origin/main` before pushing.

All facets in `.lore/dod.md` are now marked as complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list","tdd_next":"acceptance green"}}