Round complete and pushed (`e5f2811`), branch level with its upstream and already containing `origin/main`.

**What this round did** — one red-green-refactor pass:

- **RED:** wrote one test — `returns the limit and cursor a list_sessions frame carries, and refuses a malformed one` in `src/transport/ws/validation.test.ts:24` — and watched it fail for the expected reason (`Unknown message type: list_sessions`).
- **GREEN:** added `ListSessionsMessage` to `src/types/messages.ts` (additively, with its `IncomingMessage` member) and the `list_sessions` case in `src/transport/ws/validation.ts:44`: optional non-negative-integer `limit`, optional `before` cursor with a 1–128-char `sessionId` and a Date-parseable string-or-number `updatedAt`, every field the frame doesn't define (client `userId` included) stripped. Nothing else — no handler, no store wiring.
- **REFACTOR:** dropped a dead `Array.isArray` branch (an array already fails the `sessionId` check); bar stayed green (4/4 in the file).
- **Owed work found and fixed:** the acceptance-test commit wrote three spec anchors off their `it(` lines (`#L87/#L129/#L161`), which `repoint-spec-anchors.mjs --check origin/main` gates CI on — repointed to `#L93/#L134/#L163`, and appended my test's citation to the validator statement. All four spec gates now pass locally; dod.md ticks the facet and records the rest.

**Tests run here:** only my one test's file (`src/transport/ws/validation.test.ts`), no coverage (the repo-wide ratchet can't be judged from one file). The acceptance tests stay red until the handler lands — that is the ordinary mid-ticket state, and CI is their judge. Red tests of mine: 1, now green. Regressions: 0.

**Deviations worth an owner's eyes:** the ticket prose (`list_conversations`/`conversation_list`, `transport.history` opt-in, `UNSUPPORTED`/`StoreCannotList` for a store without `listFor`) is superseded by the committed acceptance tests and dod.md, which pin `list_sessions`/`session_list` and an *empty list* for a missing `listFor`; I followed the tests and did not touch them. And "the diff touches no existing line" is unsatisfiable for a union member — I extended the `IncomingMessage` union line while leaving every existing interface untouched.

**Smells noticed, not acted on:** `handlePing` sends via raw `ws.send` instead of `sender.ts` (`src/transport/ws/messageHandler.ts:334`); cursor validity is now read in two layers (validator refuses garbage, `sessionListWindow.cursorAt` throws on the rest) — deliberate, but deserves a sentence in the conversation-list spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in validation.ts, with ListSessionsMessage in the incoming union","tdd_next":"thread sessionStore into createMessageHandler and answer list_sessions with session_list (facets 3 and 4)"}}