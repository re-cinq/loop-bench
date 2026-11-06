This round's facet is done: the WebSocket validator now accepts and checks `list_sessions` frames. It's committed and pushed to `loop-bench/144`, which is not ahead of origin, and merging `origin/main` brought in nothing.

- **Red:** I added one test, "accepts list_sessions with only limit and before, and rejects a malformed limit or before cursor", in `src/transport/ws/validation.test.ts:24`. It failed with `Unknown message type: list_sessions`.
- **Green:** I added `ListSessionsMessage` to `IncomingMessage` in `src/types/messages.ts`. I also added a `list_sessions` case to `validation.ts`:
  - `limit` must be a whole number of 0 or more.
  - `before` must be `{updatedAt, sessionId}`, where `updatedAt` is a string or number that parses as a date and `sessionId` is 1–128 characters.
  - Only those two fields are passed on, so a client-sent `userId` is dropped.
- **Refactor:** I rewrote the validator to check each field explicitly instead of relying on TypeScript's type narrowing. My test file passes, 4/4.
- **Spec:** I added § 4.3 `list_sessions` to `specs/hal-engine-websocket-protocol/spec.md`, with a `validated by` link to `validation.test.ts#L24`. The existing `#L18` link didn't move. This repo has no `scripts/spec-links/reanchor.mjs`, and its Jest tests carry no spec-anchor stamps, so there was nothing else to stamp.
- **dod.md:** I ticked the validation facet. The types facet now notes that `ListSessionsMessage` is done, while `SessionSummaryFrame`, `SessionListMessage` and the `src/index.ts` re-exports remain.

There was no round brief and no earlier CI verdict, so I have 1 red test of my own and 0 known regressions. I ran only my own test file: no acceptance tests, typecheck or lint.

**Problem for whoever reviews this:** `.lore/dod.md` and its acceptance tests contradict ticket #144, and I followed the dod.md.

| | Ticket | dod.md and acceptance tests |
|---|---|---|
| Frame names | `list_conversations` / `conversation_list` | `list_sessions` / `session_list` |
| Allowed `limit` | 1–200 | any whole number from 0 up |
| Store has no `listFor` | `UNSUPPORTED` error | empty `session_list` |
| Feature switch | `transport.history` setting, off by default | none |

The ticket specifically warns against the empty-list answer. Someone needs to decide which one is right before the ticket closes. I didn't touch any acceptance test.

**Unrelated issue I left alone:** running Prettier on `specs/hal-engine-websocket-protocol/spec.md` rewrites its existing tables, so this repo doesn't format Markdown with Prettier. I added the spec text by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and handle list_sessions (session_list with ISO dates, SERVER_ERROR + ws log on failure)"}}