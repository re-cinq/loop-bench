# Definition of Done

> "every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade"

**Strategy: `direct`** — real entry points exist today: `validateMessage` in `src/transport/ws/validation.ts` and `createMessageHandler` in `src/transport/ws/messageHandler.ts`. The acceptance tests call them directly and fail because neither handles `list_conversations` yet.

## Done when these pass

- [ ] **accepts list_conversations with no extra fields** — `validateMessage` accepts the new frame type
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **rejects list_conversations with limit 0, naming the field in the error** — validation names the failing field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **with history enabled answers list_conversations with a conversation_list of three ISO-string summaries, calling listFor with ws.userId not the frame field** — happy path delivery + authorization check in one assertion
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **with history absent answers list_conversations with an UNSUPPORTED error frame** — the opt-in guard works
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before the in-flight stream_end when a user_message is streaming** — answered off the per-session lock
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` (plus payload types) to `src/types/messages.ts` — additive only, no existing lines touched
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts` — `limit` integer 1–200, `before` cursor with both halves, strips unknown fields including `userId`
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Extend `createMessageHandler` signature to accept `SessionStore` and `{history?: {enabled: boolean}}` options
- [ ] Handle `list_conversations` on the non-locked path beside `ping` — read user id from `ws.userId`, call `listFor`, convert Date fields to ISO strings, send `conversation_list`
- [ ] Return `UNSUPPORTED` when history is not enabled or store has no `listFor`; return `SERVER_ERROR` when `listFor` rejects (log session id, no store detail)
- [ ] Wire the new args into `createServer` and `createHalEngine` via `HalEngineConfig.transport.history`
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` sections 4.3 and 5.9 (started in this round)
- [ ] Update `CHANGELOG.md` under `## [Unreleased]` and bump MINOR version

## Out of scope

- Sending `conversation_list` unsolicited (push model) — explicitly decided against
- In-band session switch frame — client reconnects with `?sessionId=<id>` per existing #45 path
- Preview/title on summaries — its own issue
- Deleting a conversation from the client
- Operator view of another user's conversations