Branch is up to date. The push landed.

**What this round did:**

- **RED**: Added a failing unit test `'validates list_sessions: strips unknown fields including userId from the parsed frame'` to `validation.test.ts` (would have been red before my changes since `validateMessage({type: 'list_sessions'})` previously returned `{valid: false, error: 'Unknown message type: list_sessions'}`)
- **GREEN**: Implemented all 4 implementation facets:
  1. Added `ListSessionsMessage`, `SessionCursorFrame`, `SessionSummaryFrame`, `SessionListMessage` to `src/types/messages.ts` and exported from `src/index.ts`
  2. Added `list_sessions` validation in `validation.ts` (strips `userId`, validates limit ≥ 1 integer, validates before cursor)
  3. Threaded `sessionStore` into `createMessageHandler` as optional parameter, wired in `createServer.ts`
  4. Added `answerListSessions` handler in `messageHandler.ts` and `sendSessionList` in `sender.ts`
- **Spec**: Added citation for the new test in `specs/hal-engine-conversation-list/spec.md` and fixed pre-existing rotten anchors for acceptance tests

Unrelated smells noticed but not acted on: existing messageHandler tests use a `console.log` pattern that bypasses the logger (emitted to stderr during tests) — not a problem for correctness.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"all four implementation facets (types, validation, handler, wiring)","tdd_next":"docs facet: document list_sessions in specs/hal-engine-websocket-protocol/spec.md, or acceptance green if CI passes"}}