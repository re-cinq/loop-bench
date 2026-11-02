# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` on a real upgrade over a real socket, with `InMemorySessionStore.listFor` already shipped (#143, #146). Nothing answers `list_conversations` today, so the frame is refused as `INVALID_MESSAGE`. The `history` option does not exist yet, so the file's tests that enable it cannot pass until it does.

## Done when these pass

- [ ] **answers the connecting user's conversations as one conversation_list, newest first, with ISO times** — with `history: {enabled: true}`, a `list_conversations` frame gets exactly one `conversation_list` and no other frame, the seeded user's conversations come back newest first, and every `createdAt` and `updatedAt` is an ISO string.
      `src/transport/listConversations.acceptance.test.ts`
- [ ] **ignores a userId in the frame and lists by the connection's authenticated user** — a frame carrying another user's `userId` is answered with the connecting user's own list, and `listFor` is called with the connection's `ws.userId`, not the frame's.
      `src/transport/listConversations.acceptance.test.ts`
- [ ] **answers UNSUPPORTED with no conversation_list when transport.history is absent** — with the option off, the same frame is answered with one `error` frame whose code is `UNSUPPORTED`, and no `conversation_list`.
      `src/transport/listConversations.acceptance.test.ts`

## Facets

- [ ] Add the `ListConversationsMessage` and `ConversationListMessage` frames, their payload types and union members to `src/types/messages.ts` (additive only).
- [ ] Accept `list_conversations` in `validateMessage`: `limit` an integer 1–200 when present, `before` a `{updatedAt, sessionId}` cursor when present, anything else `INVALID_MESSAGE` naming the field.
- [ ] Add `UNSUPPORTED` to `ErrorCodes` and thread `history?: {enabled: boolean}` through `createServer` and `HalEngineConfig.transport`, default off.
- [ ] Answer `list_conversations` in `createMessageHandler` on the non-locked path beside `ping`, with `ws.userId`, and refuse it with `UNSUPPORTED` when history is off or the store has no `listFor`.
- [ ] Map a rejected `listFor` to `SERVER_ERROR` with no store detail, logged with the session id, and a thrown `StoreCannotList` to `UNSUPPORTED`.
- [ ] Answer a `list_conversations` sent during a streaming turn before that turn's `stream_end`.
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` and `CHANGELOG.md`, and document the option in `example/full-config.ts` and regenerate with `npm run docs:fix`.

## Out of scope

- A title or preview on the summaries (its own issue).
- Deleting a conversation from the client (needs its own authorisation decision).
- Server-side paging state: the client pages with `before`.
- An operator view of another user's conversations.
- Live sync between open tabs (#124).
- The `validateMessage` limit and `before` cases: they are facets, not acceptance tests here, since the central claim is the answer over the socket.