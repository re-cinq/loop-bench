# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` over a real socket, backed by the real `InMemorySessionStore.listFor` shipped in #143/#146. The tests need no new module. They fail because the WebSocket protocol has no `list_conversations` frame yet.

## Done when these pass

- [ ] **answers list_conversations with one conversation_list of the user's conversations, newest first, with ISO times and no stream_end** — the plain frame gets exactly one `conversation_list` (no `stream_end`), with the user's rows newest first, each with `sessionId`, ISO `createdAt`/`updatedAt`, and `entryCount`, and no entries.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a frame carrying another user's id with the connecting user's own list, never the id it names** — a frame with `userId: 'u2'` from a `u1` connection gets `u1`'s list; `u2`'s conversation never appears.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations with an UNSUPPORTED error and no list while history is not enabled** — with `transport.history` absent, the answer is one `error` frame with code `UNSUPPORTED`, and no `conversation_list`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **accepts a list_conversations frame with a limit of 1 to 200 or a parseable before, and refuses any other limit or before by naming the field** — `validateMessage` accepts the valid frames and refuses `limit` 0, 201, 1.5, `'10'` and `before: 'not a date'` with an error naming the field.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` (with `ConversationSummary` and `ConversationCursor`) to `src/types/messages.ts`, additive only.
- [ ] Add a `list_conversations` case to `validation.ts` (`limit` integer 1–200, `before` a string `Date.parse` accepts), refusing anything else as `INVALID_MESSAGE`.
- [ ] Add `ErrorCodes.UNSUPPORTED` in `src/types/session.ts`.
- [ ] Add `transport.history?: {enabled: boolean}` to `HalEngineConfig` and thread it through `createServer` options (default off).
- [ ] Answer `list_conversations` in `createMessageHandler` on the non-locked path, beside `ping`, with the user from `ws.userId`: the list when enabled, `UNSUPPORTED` when disabled or when the store has no `listFor`.
- [ ] A `listFor` that rejects is answered with `SERVER_ERROR` (no store detail), the socket stays open, and the failure is logged with the session id and no user content.
- [ ] A `list_conversations` sent while a turn streams is answered before that turn's `stream_end` (the lock is not awaited).
- [ ] Reconnect with `?sessionId=<id>` from a listed row resumes that conversation (existing #45 path; no new transport code).
- [ ] Spec, docs and changelog: `specs/hal-engine-websocket-protocol/spec.md`, `example/full-config.ts` plus `npm run docs:fix`, `CHANGELOG.md` under `## [Unreleased]`, MINOR version bump.

## Out of scope

- A preview or title on summaries (its own issue).
- Deleting a conversation from the client (needs its own authorisation decision).
- Server-side paging state; the client pages with `before`.
- An operator view of another user's conversations.
- Live sync between open tabs (#124 ruled it out).
- `StoreCannotList` surfacing as `UNSUPPORTED` (a build-time amendment, not pinned by these four tests).
- The spec statement citations and `Status` rows: the statements do not exist until the build writes them, so no `validated by` parenthetical is owed yet.

## Reading taken

- The ticket's criterion ("exactly one `conversation_list` carrying three summaries") and its amendment (the connection's own conversation is listed like any other) conflict on the row count. The tests follow the amendment: the three seeded conversations come first, newest first, and the connection's own empty conversation is the last row.