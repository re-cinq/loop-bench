Round complete and pushed. Summary of the round:

**Red → Green.** The RED acceptance tests (`src/transport/conversationList.acceptance.test.ts`, committed last round) failed with `Unknown message type: list_sessions`. This round made them green — all 3 pass, verified stable over 8 runs — and the 7 neighbouring suites over the touched code (validation, messageHandler, sessionSave, beforeToolCall, createServer, sessionResume, handshake; 108 tests) stay green, so no regressions. Red tests written by me this round: **0** (the round closed the green phase on the existing red tests); regressions caused: **0**.

**What landed** (`c395289`):
- `src/types/messages.ts` — additive: `ListSessionsMessage`, `SessionSummaryFrame`, `SessionListMessage`, plus their two union members; re-exported from `src/index.ts`.
- `src/transport/ws/validation.ts` — `list_sessions` case: optional non-negative-integer `limit`, optional `before` cursor (1–128 char `sessionId`, parseable `updatedAt`), unknown fields stripped.
- `src/transport/ws/messageHandler.ts` + `sender.ts` — `createMessageHandler` takes the optional `sessionStore` (wired in `createServer.ts`), reads `session.userId`, answers `session_list` with ISO-serialized times, off the per-session lock; a missing `listFor` answers `[]`, a failing one logs under `ws` and answers `SERVER_ERROR` with no store detail.
- One discovery the tests forced: an answer written in a microtask lands *after* the pong that follows the frame, so the client's pong barrier misses it. Non-turn answers are now chained per socket, which guarantees a socket's answers are written in the order it asked. Recorded as a new unchecked facet.
- Specs: `list_sessions` (§4.3) and `session_list` (§5.9) documented with citations; the 3 stale anchors the red commit left in the conversation-list spec were repointed. `spec:names`, `check:spec-links`, `check:spec-status` all pass. `.lore/dod.md` ticks all five facets and the three acceptance boxes, and appends two unchecked facets (pin the lock-free answer; a closed socket's abandoned list answer).

Not run here: lint, typecheck, build, and the repo's other suites — CI judges those on the push. Unrelated smells noticed, not acted on: `handlePing` still sends through a raw `ws.send` bypassing `sendJson`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions validated and answered off the lock for the connection's own user — all three acceptance tests green","tdd_next":"pin the lock-free answer (list answered before a turn's stream_end, non-turn answers in arrival order)"}}