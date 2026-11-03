# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade

**Strategy: `direct`** — The seam exists: `createServer` already holds the session store, and `startEngineWith` in `src/transport/wsTestSupport.ts` drives a real upgrade over a real socket. What is absent is the `list_conversations` frame and the `history` option; the store's `listFor` already ships (#146).

## Done when these pass

- [ ] **a client lists its own conversations over the socket is answered with one conversation_list of its user's conversations, newest first, with ISO times** — with `history` on and three conversations for the user, one `conversation_list` carries all three, newest first, each `createdAt` and `updatedAt` an ISO string
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **a client lists its own conversations over the socket is answered with the connecting user's list even when the frame names another user** — a `list_conversations` frame carrying `userId: 'u2'` is answered with the connecting user's (`u1`) list, never the frame's
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Validation: `validateMessage({type: 'list_conversations'})` is valid; `limit` 0, 201, 1.5, `'10'` and `before: 'not a date'` are invalid naming the field
- [ ] `messages.ts`: `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary` added to the unions, no existing line touched
- [ ] `createServer` / `HalEngineConfig.transport.history?: {enabled: boolean}`, default off; with it off the frame is answered `error` code `UNSUPPORTED`
- [ ] Handler answers `list_conversations` off the per-session lock, beside `ping`, with `listFor(ws.userId, {limit, before})`
- [ ] A store without `listFor` is answered `error` `UNSUPPORTED`, never `conversations: []`
- [ ] A rejecting `listFor` is answered `error` `SERVER_ERROR` with no store detail; the socket stays open
- [ ] `before` cursor `{updatedAt, sessionId}` of ISO strings passes through to `listFor`
- [ ] Resume round trip: a `sessionId` taken from a list reconnects and replays via the existing #45 path

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client (needs its own erasure authorisation decision)
- Server-side paging state; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- Spec, docs, CHANGELOG and version bump edits: the implementation pod owns them