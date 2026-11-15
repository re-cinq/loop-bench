This round added validation for the `list_sessions` frame. It's committed and pushed to `loop-bench/144`, and the branch is level with its upstream. `origin/main` merged in with nothing new.

**Red:** I wrote `src/transport/ws/listSessionsValidation.test.ts` with two tests: one that a good frame is accepted, one that a bad `limit` or `before` is rejected. Both failed with "Unknown message type", which was the right reason.

**Green:**
- **`src/types/messages.ts`:** added `ListSessionsMessage` (`limit?`, `before?: SessionCursor`) to `IncomingMessage`. No existing line changed.
- **`src/transport/ws/validation.ts`:** a new `list_sessions` case. `limit` must be a whole number of 0 or more. `before` must be an object whose `sessionId` is 1–128 characters and whose `updatedAt` is a date string or a finite number. Anything else, including a client-sent `userId`, is dropped. Each error message names the field.
- I ran only my new test and the existing `validation.test.ts`, with the repo's `node --experimental-vm-modules` jest command (plain `npx jest` fails on ES modules here). All 5 tests pass.

**Refactor:** nothing needed. I checked that the new import between the two type files doesn't create a loop and that no code handling incoming frames has an exhaustive switch that the new type would break.

**Traceability:** I added § 4.3 `list_sessions` to `specs/hal-engine-websocket-protocol/spec.md`, with two statements citing the new tests (#L6, #L22). The repo has no `reanchor.mjs`, so I checked those line numbers by hand. Prettier rewrapped tables across the whole spec, and the repo's formatter only covers `src/**/*.ts`, so I reverted that and kept only my section.

**`.lore/dod.md`:** I split the types facet. `ListSessionsMessage` is ticked; `SessionSummaryFrame` and `SessionListMessage` plus the `src/index.ts` re-exports are still open. The validation facet is ticked, and the docs facet now records what § 4.3 already covers.

**Red tests:** the 2 failures were mine, and there were 0 regressions. There's no round brief or CI verdict yet, so CI will judge this push.

**Things I noticed but didn't touch:**
- `.lore/dod.md` and its acceptance tests disagree with the ticket text. The ticket says `list_conversations` / `conversation_list`, `limit` 1–200, an `UNSUPPORTED` error when there is no `listFor`, and a `history` opt-in flag. The acceptance tests say `list_sessions` / `session_list`, `limit` 0 or more, and an empty list when there is no `listFor`. I followed dod.md because the brief says it sets the bar, but someone should settle which one is right.
- The coverage graph (`lore-query-trace`) reports no tests covering `validation.ts`, although `validation.test.ts` exists.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts (with ListSessionsMessage in IncomingMessage)","tdd_next":"Add SessionSummaryFrame and SessionListMessage to messages.ts/OutgoingMessage, then thread sessionStore into createMessageHandler and answer list_sessions"}}