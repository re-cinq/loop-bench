# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seam exists: `createServer` runs real upgrades over a real socket, and `SessionStore.listFor` (#143, on this branch) already answers the list. What is missing is the `list_conversations` frame and its `conversation_list` answer, so the tests fail on the unknown frame type.

**Red bar:** run in the authoring pod with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`: 2 failed, 0 passed, each failing on the unknown `list_conversations` frame. CI reruns it as the `Test` step of `.github/workflows/ci.yml`, which runs every `*.test.ts`, including this file.

## Done when these pass

- [ ] **answers a list_conversations frame with the connection's own conversations, newest first, as ISO times and no stream_end** — a frame carrying another user's `userId` is answered with the connecting user's rows, newest first, times as ISO strings, and only `connected`, `conversation_list`, `pong` on the wire
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list_conversations frame with an UNSUPPORTED error and no list while history is off** — with `transport.history` absent, the frame gets one `error` frame coded `UNSUPPORTED` and no list
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `messages.ts`: add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, `ConversationListMessage` as additive members of `IncomingMessage` / `OutgoingMessage`
- [ ] `validation.ts`: `list_conversations` case; `limit` integer 1–200 when present, `before` a `{updatedAt, sessionId}` cursor when present; anything else `INVALID_MESSAGE`
- [ ] `session.ts` `ErrorCodes`: add `UNSUPPORTED`
- [ ] `config.ts` / `createServer.ts`: `transport.history?: {enabled: boolean}`, default off, threaded like `resume`
- [ ] `messageHandler.ts`: answer `list_conversations` beside `ping`, off the per-session lock; user id from `ws.userId`; pass `{limit, before}` to `listFor`; `UNSUPPORTED` when the store has no `listFor` or history is off; `SERVER_ERROR` (no store detail) when `listFor` rejects
- [ ] Tests for the remaining criteria: validator cases, store without `listFor`, rejecting store, answer during a streaming turn, reconnect with `?sessionId=` after a list
- [ ] Docs: `specs/hal-engine-websocket-protocol/spec.md`, `example/full-config.ts` + `npm run docs:fix`, `CHANGELOG.md`

## Out of scope

- A title or preview on the summaries (its own issue)
- Deleting a conversation from the client (needs its own authorisation decision)
- Server-side paging state; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124)