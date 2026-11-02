# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` over a real WebSocket upgrade, with the real `InMemorySessionStore` holding the conversations. `list_conversations` is absent from `validateMessage`, so the socket answers `Unknown message type` today.

## Done when these pass

- [ ] **is answered with its user conversations, newest first, with ISO times and no stream_end** — a `list_conversations` frame on a live socket with history enabled gets one `conversation_list` carrying the user's three conversations newest first, each time an ISO string, and no `stream_end`
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists the connecting user, never the user named in the frame** — a `list_conversations` frame carrying `userId: 'u2'` is answered with the connecting user's (`u1`) conversations only, not `u2`'s
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Frame accepted by `validateMessage` (`list_conversations`) and answered by the message handler with `conversation_list`, from the connection's `ws.userId`
- [ ] `history: {enabled: true}` threaded through `createServer` / `HalEngineConfig.transport.history`, default off
- [ ] Opt-in off: `list_conversations` answered with an `error` frame (`UNSUPPORTED`) and no list
- [ ] `limit` / `before` validation and pass-through to `listFor`
- [ ] `listFor` rejecting answered with `SERVER_ERROR`; store without `listFor` answered with `UNSUPPORTED`
- [ ] Non-locked path: a list request during a streaming turn is answered before that turn's `stream_end`
- [ ] Specs (`specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`), `CHANGELOG.md`, `example/full-config.ts` + `npm run docs:fix`

## Out of scope

- The optional-history error and validation cases, pagination, and the streaming-lock behaviour: they are real criteria of #144 but are not the central claim, and each gets its own red test in a later round.
- A title or preview on summaries (its own issue).
- Deleting a conversation from the client (needs its own authorisation decision).
- Server-side paging state; an operator view of other users' conversations; live sync between open tabs (#124).

## Red bar

Run locally with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`: both tests fail with `Unknown message type: list_conversations`, so the red bar is the handler's absence, not a fixture or import error. CI runs them as part of the `Verify` job, step `Test (with coverage floor)` (`npm run test:coverage`).