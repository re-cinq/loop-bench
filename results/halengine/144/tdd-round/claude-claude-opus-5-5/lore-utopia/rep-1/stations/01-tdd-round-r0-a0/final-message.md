This round added validation for the client's `list_sessions` request frame. It's committed and pushed, and the branch is level with its upstream and already up to date with `origin/main`. The facet is ticked in `.lore/dod.md`.

**What changed**
- **Red:** one new test in `src/transport/ws/validation.test.ts` (line 24). It failed with `Unknown message type: list_sessions`.
- **Green:** a `list_sessions` case in `src/transport/ws/validation.ts`. It accepts an optional whole-number `limit` of 0 or more, and an optional `before` cursor whose `sessionId` is 1–128 characters and whose `updatedAt` is a readable date string or epoch number. Anything else gets `INVALID_MESSAGE`, and extra fields such as a client's `userId` are dropped. `ListSessionsMessage` is added to `IncomingMessage` in `src/types/messages.ts`.
- **Refactor:** the cursor check moved into its own function. The test file's 4 tests pass.
- **Spec:** a new §4.3 `list_sessions` in `specs/hal-engine-websocket-protocol/spec.md`, with a `validated by` link to line 24. Prettier would have reformatted unrelated tables in that file and in `.lore/dod.md`, so I left both formatted by hand.

**Tests:** I ran only `validation.test.ts`, not the acceptance tests. No round brief existed, so there's no CI verdict on an earlier push to fix. Red tests this round: 1, mine, now green. Regressions: none known; CI will judge this push.

**Not done, by the one-facet rule**
- The first facet is only partly done: `ListSessionsMessage` still needs re-exporting from `src/index.ts`, and the reply types `SessionSummaryFrame` and `SessionListMessage` don't exist yet. I left it unticked with a note saying so.
- The coverage graph says no tests cover `validation.ts`, but `validation.test.ts` exists, so the graph looks stale.
- `.lore/test-commands.yml` gives no way to stamp a test's spec anchor, so this test carries only the inline spec link.

**Decision for you:** `.lore/dod.md` and the acceptance tests contradict the ticket. They:
- use `list_sessions` / `session_list` where the ticket says `list_conversations` / `conversation_list`;
- answer a store with no `listFor` with an empty list, where the ticket requires an `UNSUPPORTED` error and forbids sending an empty list;
- have no `transport.history` opt-in at all.

I followed the dod, since it is the bar. If the ticket's wording is what you want, the acceptance tests need rewriting.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and handle list_sessions (session_list reply with ISO dates, SERVER_ERROR on a failing listFor), plus the remaining outgoing types"}}