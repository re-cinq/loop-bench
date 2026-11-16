Fixed the CI ESLint failures reported on `d37f7be` and completed the next TDD round:

- **CI fixes:**
  - `src/transport/ws/validation.ts`: replaced the object literal keyed by `user_message` / `list_sessions` in `validatorFor` with a `Map` to satisfy `camelcase`.
  - `src/transport/conversationList.acceptance.test.ts`: rewrote `askAfterConnect` with early returns on `pong` and non-`connected` frames so the `connected` branch runs flat (`re-lint/prefer-early-return`).
- **TDD round (`createServer` + `createMessageHandler` `sessionStore` wiring):**
  - **Red:** added `forwards sessionStore to the message handler when list_sessions arrives` in `src/transport/createServer.test.ts` and ran it via `jest --runTestsByPath` (failed with 0 calls to `listFor`).
  - **Green:** added optional `sessionStore?: SessionStore` to `createMessageHandler` in `src/transport/ws/messageHandler.ts` (forwarding `list_sessions` to `sessionStore?.listFor?.(session.userId, {limit, before})`) and wired `options.sessionStore` in `src/transport/createServer.ts`; re-ran the test (`1 passed`).
  - **Traceability & DoD:** formatted modified TS files with Prettier, cited the new test in `specs/hal-engine-conversation-list/spec.md`, repointed shifted anchors in `specs/hal-engine-npm-release/spec.md` with `scripts/repoint-spec-anchors.mjs`, verified `check-spec-anchor-names.mjs` and `check-spec-links.mjs`, and ticked the facet in `.lore/dod.md`.
- **Red tests vs regressions:** The 3 red tests reported by CI are the ticket's own acceptance tests in `src/transport/conversationList.acceptance.test.ts` (0 regressions); the new unit test written this round is green.
- **Committed and pushed:** `c41807d` on `loop-bench/144`, up to date with `origin/main` and `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts (plus CI eslint fixes)","tdd_next":"Handle list_sessions in src/transport/ws/messageHandler.ts and src/transport/ws/sender.ts (serialise session_list and handle errors with ws error log + SERVER_ERROR)"}}