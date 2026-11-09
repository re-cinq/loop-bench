# Definition of Done

> #143 gives a consumer `store.listFor(userId)` inside the server process. The client on the other end of the WebSocket has no way to ask for it, and the consumer who wants a conversation picker without standing up their own REST endpoint has to write one anyway.

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message pipeline already exist and accept frames over a real WebSocket connection, so acceptance tests can connect today, send `list_conversations` frames, and fail directly on the missing `conversation_list` and `list_conversations` validation/dispatch behaviour.

**Amended while building** (per re-cinq/HALEngine#144): the frames are named `list_conversations`/`conversation_list` — an earlier pass had shipped `list_sessions`/`session_list`, renamed before the handler landed; `before` is a `{updatedAt, sessionId}` cursor of ISO strings (a `Date` or epoch number is refused); `limit` is an integer 1–200; a store with no `listFor` is answered `UNSUPPORTED`, not an empty list; and a store refusing through the new exported `StoreCannotList` reads as `UNSUPPORTED` too, while any other rejection is `SERVER_ERROR` on a socket left open.

## Done when these pass

- [x] **a conversation list over the WebSocket protocol › answers the connected user with ISO summaries, forwarding limit and before while ignoring any client userId** — Sends `{type: 'list_conversations', limit, before, userId}` over a connected WebSocket and verifies `store.listFor` is called with the socket's authenticated `userId` (`ws.userId`) and `{limit, before}`, answering one `{type: 'conversation_list', conversations}` with `createdAt` and `updatedAt` serialised as ISO-8601 strings.
  `src/transport/conversationList.acceptance.test.ts`

- [x] **a conversation list over the WebSocket protocol › with history off or absent, answers UNSUPPORTED and never asks the store** and **answers UNSUPPORTED when the store cannot list, whether listFor is absent or the store refuses**, and **answers a rejecting listFor with SERVER_ERROR on a socket left open, logging the session id without the store detail** — A store without `listFor` is answered `{type: 'error', code: 'UNSUPPORTED'}` and never asked; a `StoreCannotList` rejection reads as `UNSUPPORTED`; any other rejection logs under category `'ws'` with the session id and answers `{type: 'error', code: 'SERVER_ERROR'}` with no store detail, on a socket left open.
  `src/transport/conversationList.acceptance.test.ts`

- [x] **a conversation list over the WebSocket protocol › accepts a bare list_conversations frame and rejects a malformed limit or before with INVALID_MESSAGE without calling listFor** — `{type: 'list_conversations'}` is accepted while `limit` outside 1–200 (non-integer, negative, `'10'`, `0`, `201`) or a malformed `before` (not an object, either half missing, non-ISO `updatedAt`) is rejected with `INVALID_MESSAGE` without invoking `store.listFor`.
  `src/transport/conversationList.acceptance.test.ts`, `src/transport/ws/validation.test.ts`

- [x] **a conversation list over the WebSocket protocol › answers a list asked while a turn streams on the same session before that turn streams its end**, and **hands a client that reconnects with a listed id its own conversation back, resumed and replayed** — The list is answered off the per-session lock, and a row's id rejoins its conversation through the existing `?sessionId=` resume path.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [x] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary` and `ConversationListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts` alongside `StoreCannotList`.
- [x] Validate `list_conversations` frames in `src/transport/ws/validation.ts` (integer `limit` 1–200; optional `before` object with 1–128 char `sessionId` and an ISO string `updatedAt` `Date.parse` accepts; strip unknown fields like `userId`; static, with no config — the handler is what refuses when the feature is off).
- [x] Thread the session store and the options into `createMessageHandler(orchestrator, {sessionStore, history})` and wire both through `src/transport/createServer.ts` and `transport.history` in `src/config.ts`.
- [x] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` on the non-locked path beside `ping`: read `ws.userId`, call `store.listFor(ws.userId, {limit, before})` with both keys even when undefined, serialise the two times to ISO strings, answer `UNSUPPORTED` with the feature off or for a store without `listFor` or refusing with `StoreCannotList`, and for any other rejection `log.error('ws', ...)` with the session id and `ErrorCodes.SERVER_ERROR` carrying no store detail.
- [x] Document the frames in `specs/hal-engine-conversation-list/spec.md` § Over the WebSocket protocol, with the authorisation rule and the GDPR note, cited to the acceptance suite.
- [ ] Document the two frames in `specs/hal-engine-websocket-protocol/spec.md` (field tables, the authorisation rule) and add § Conversation list to `docs/getting-started.md` by editing `example/full-config.ts` and running `npm run docs:fix` — not typed into the markdown.

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.