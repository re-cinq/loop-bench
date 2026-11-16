# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade

**Strategy: `direct`** — The seams exist: `validateMessage` and `createMessageHandler` are callable functions whose current behaviour can be asserted against. Tests call the real entry points and fail because `list_conversations` is not yet a recognised message type and the handler has no history path.

## Done when these pass

- [ ] **accepts list_conversations with no optional fields** — `validateMessage({type: 'list_conversations'})` returns `{valid: true}`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **rejects list_conversations with invalid limit/before and names the field** — `limit` outside 1–200, fractional, or non-numeric, and a `before` string `Date.parse` rejects, each produce `{valid: false, error: '...'}` naming the field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers with conversation_list carrying ISO-string dates when history is enabled** — with `history: {enabled: true}` and a store returning three summaries, one `conversation_list` frame arrives carrying three rows with `createdAt`/`updatedAt` as strings, and no `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **calls listFor with the connection userId, ignoring any userId in the frame** — a frame carrying `userId: 'other-user'` causes `listFor` to be called with the session's `userId`, not the frame's
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers with error code UNSUPPORTED when history is not configured** — without the `history` option, `list_conversations` returns an `error` frame whose code is `UNSUPPORTED`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before stream_end when a user_message is streaming** — `list_conversations` sent while a streaming turn is locked is answered (with `conversation_list`) before that turn's `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` to `IncomingMessage` and `ConversationListMessage` + `ConversationSummary` to `OutgoingMessage` in `src/types/messages.ts` (additive only — no existing line touched)
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`: `limit` integer 1–200 when present; `before` a composite `{updatedAt, sessionId}` cursor of ISO strings when present, refusing one half alone
- [ ] Extend `createMessageHandler` to accept `sessionStore` and `options: {history?: {enabled: boolean}}` and handle `list_conversations` on the non-locked path
- [ ] With history enabled and store has `listFor`: call `listFor(session.userId, {limit, before})`, map `Date` fields to ISO strings, send `conversation_list`
- [ ] With history disabled or store has no `listFor`: send `error` with code `UNSUPPORTED`
- [ ] `listFor` rejection: send `error` with code `SERVER_ERROR`, log session id, no store detail on the wire; `StoreCannotList` from the store → `UNSUPPORTED` instead
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport` in `src/config.ts` and thread it through `createServer`
- [ ] Extend the websocket protocol spec with § 4.3 (`list_conversations`) and § 5.9 (`conversation_list`), their field tables, the authorisation rule, and GDPR note; add citations on new statements
- [ ] Update `CHANGELOG.md` under `## [Unreleased]` and bump MINOR version

## Out of scope

- Picking/switching a conversation in-band (client reconnects with `?sessionId=`, which #45 already handles)
- Pushing `conversation_list` unsolicited on new conversations
- Paging state held server-side
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- Deleting a conversation from the client
- A preview or title on the summaries