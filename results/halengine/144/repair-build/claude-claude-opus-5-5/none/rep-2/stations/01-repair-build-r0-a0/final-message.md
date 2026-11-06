I fixed both red checks (`eslint` and `test`) and pushed the commit to `loop-bench/144`. `origin/main` merged with nothing new, and the branch is level with its upstream.

**test:** the acceptance suite failed because the branch had the `list_sessions` frame types and validation but no code that answered the frame.
- `src/transport/ws/messageHandler.ts` now takes the session store as an optional second argument, and `createServer` passes it in.
- It answers `list_sessions` beside `ping`, outside the per-session lock, so it never waits behind a streaming reply.
- The user id comes from the connection, never from the frame.
- Dates go out as ISO strings. A store with no `listFor` gets an empty `session_list`. A `listFor` that throws gets a `SERVER_ERROR` frame and a `ws` error log.
- Frames answered outside the lock now go out in the order they arrived on each socket. Without this, a `ping` sent right after a `list_sessions` could get its `pong` first.

**eslint, all 8 findings:**
- **Duplicate code:** the cleanup helper, the polling helper and the minimal-store helper were copied in both `conversationList.acceptance.test.ts` and `sessionResume.test.ts`. They now live once in `wsTestSupport.ts` (`closeAll`, `eventually`, `delegatingTo`), and both suites import them.
- **prefer-early-return:** in the acceptance test, the `connected` branch now calls a small local `ask` function.
- **no-flag-params:** `validation.test.ts` no longer passes a boolean to `Array(9).fill(false)`. It compares `'accepted'`/`'rejected'` labels instead; the assertion means the same thing.

**Side effects you'll see in the diff:**
- Removing those lines shifted the specs' `#Lnn` test citations, so I ran `node scripts/repoint-spec-anchors.mjs HEAD`. It repointed 31 citations, and its `--check` mode then reported nothing stale or unresolved.
- Prettier also realigned one table in `specs/hal-engine-websocket-protocol/spec.md`.

**Verified locally:** the 6 affected jest suites (acceptance, session-resume, validation, message-handler, session-save, before-tool-call) pass, 99 tests. As instructed, I did not run eslint, typecheck or the build here; CI will judge those on this push.

**Not fixed — this branch differs from the ticket.** I made the tests that were already on the branch pass, not the ticket's spec:
- The frame is named `list_sessions` / `session_list`, not `list_conversations` / `conversation_list`.
- There is no `transport.history` opt-in flag and no `UNSUPPORTED` code.
- A store without `listFor` gets an empty list, where the ticket asks for an error.
- `limit: 0` is accepted, where the ticket asks for 1–200.

Those are for the feature work to settle, not this repair.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frame was validated but never answered (acceptance tests red), plus 8 eslint findings: duplicated ws test helpers, an early-return and a boolean fill arg"}}