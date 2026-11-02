# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` and a real WebSocket client already drive the message path in `src/transport/sessionResume.test.ts`, and `InMemorySessionStore.listFor` (#143) is present on `origin/main`. Nothing on the socket answers `list_conversations` today, so the tests reach the real entry point and fail on behaviour.

## Done when these pass

- [ ] **answers list_conversations with the connecting user's conversations, newest first, with ISO times** — with `history` enabled and three conversations for the user, one `conversation_list` carries all three, newest first, each time an ISO string.
  `src/transport/listConversations.acceptance.test.ts`
- [ ] **answers a list_conversations frame naming another user with the connecting user's own list** — a frame carrying `userId: 'u2'` from `u1` is answered with `u1`'s conversations only; the id comes from the connection, never the frame.
  `src/transport/listConversations.acceptance.test.ts`
- [ ] **answers list_conversations with an UNSUPPORTED error when transport.history is not enabled** — with the option absent (the default), the frame gets one `error` frame with code `UNSUPPORTED` and no list.
  `src/transport/listConversations.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` (with their payload types) to `src/types/messages.ts`, additive only.
- [ ] Accept `list_conversations` in `src/transport/ws/validation.ts` (`limit` integer 1–200, `before` a `{updatedAt, sessionId}` cursor; anything else `INVALID_MESSAGE`).
- [ ] Add `HalEngineConfig.transport.history` and thread it through `createServer` like `resume`.
- [ ] Answer `list_conversations` off the per-session lock, beside `ping`, using `ws.userId`; default-off gives `UNSUPPORTED`.
- [ ] Map a store with no `listFor` and a rejecting `listFor` to `error` frames, never `conversations: []`.
- [ ] Spec, CHANGELOG and `example/full-config.ts` → `npm run docs:fix` for the protocol and getting-started updates.

## Out of scope

- A preview or title on summaries (its own issue).
- Deleting a conversation from the client (needs its own authorisation decision).
- Server-side paging state; the client pages with `before`.
- An operator view of another user's conversations.
- Live sync between open tabs (#124).
- Pushing `conversation_list` unsolicited.
- Spec statement anchors: the websocket spec has no un-linked statement for this behaviour yet, so no `validated by` parenthetical is stamped by this round; the build adds the statements and their links.

## Run record

- Command run in the pod: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/listConversations.acceptance.test.ts`
- Result: 3 failed, 3 total. Each fails with the server answering `error` / `INVALID_MESSAGE` ("Unknown message type: list_conversations") instead of the expected reply.
- CI runs this file in the Jest suite: the `Test` step of `.github/workflows/ci.yml` (`npm test`).