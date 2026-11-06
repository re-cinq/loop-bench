I finished one round. The store is now passed into the message handler, and a `list_sessions` frame gets a `session_list` back. The commit is pushed and the branch is up to date with `origin/main` and its upstream.

**What changed**
- **Red:** I added one test to `src/transport/ws/messageHandler.test.ts:90`. It sends a `list_sessions` frame carrying another user's `userId` and checks two things: the store's `listFor` is called with the connection's own user (`u1`) and `{limit, before}`, and exactly one `session_list` goes back with ISO date strings. It failed as expected: nothing was asked and nothing was sent.
- **Green:**
  - `createMessageHandler(orchestrator, sessionStore?)` now takes the store as an optional second argument, so existing callers still work.
  - `list_sessions` is answered beside `ping`, outside the per-session lock (`handleListSessions` in `src/transport/ws/messageHandler.ts`).
  - `src/transport/createServer.ts` passes `options.sessionStore` in.
- **Refactor:** each row is built from its four fields by name, so extra fields a store returns can't reach the client. All 55 tests in that file pass.
- **Specs:**
  - I added a cited statement to §4.3 of `specs/hal-engine-websocket-protocol/spec.md`.
  - The new test shifted 79 `#Lnn` links across seven specs. I fixed them with `scripts/repoint-spec-anchors.mjs`.
  - I also fixed three wrong links an earlier round left in `specs/hal-engine-conversation-list/spec.md`, which pointed at the wrong lines of the acceptance test.
  - `check-spec-links` and `check-spec-anchor-names` both pass.
- `.lore/dod.md`: I ticked the facet about passing the store in. The handling facet stays open because its error path isn't done.

**Tests:** I ran only the test file I changed (55/55 pass). I did not run the acceptance tests. One red test this round was mine and there were 0 regressions. There was no round brief and no CI verdict on the previous push to check against. No `lore_*` tools were available in this session, so I couldn't run the `tests_covering` lookup.

**Next facet:** handle a `listFor` that throws: log it under the `ws` category with `userId` and the error, and answer `SERVER_ERROR`. Today the existing catch-all answers `SERVER_ERROR` but logs under `message`. A store with no `listFor` already gets an empty list. After that, only the spec facet is left.

**Problems I noticed but didn't touch:**
- **The checklist and acceptance tests contradict the ticket.** They use `list_sessions` / `session_list`, answer an empty list when the store has no `listFor`, and have no `transport.history` opt-in. The ticket asks for `list_conversations` / `conversation_list`, an `UNSUPPORTED` error rather than an empty list, and the feature off by default. The ticket calls an empty list the one failure a history view can't recover from. The branch meets the acceptance tests as written, so someone should decide which one is right before review.
- `npx prettier --write` on a spec file reflows every table in it, so spec files can't be run through the formatter as-is. I undid that reflow.
- Inserting a test shifts every `#Lnn` link below it, across many specs. Each new test costs a repoint pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and answer list_sessions with the session user's ISO-dated session_list","tdd_next":"Log a throwing listFor under 'ws' with userId and error and answer SERVER_ERROR"}}