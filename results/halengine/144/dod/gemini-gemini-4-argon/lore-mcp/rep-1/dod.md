# Definition of Done

> #143 gives a consumer `store.listFor(userId, { limit, before })` in process. The client on the other side of the WebSocket still has no way to ask for it, and HALEngine's own position is that chat history is WebSocket-native — #47 deleted `GET /chats` and `GET /chats/:chatId/messages` as unmounted stubs rather than building a second transport beside the socket. A conversation switcher in the UI (#145) needs the list to arrive on the connection it already holds.

**Strategy: `direct`** — `createServer` in `src/transport/createServer.ts` already wires WebSocket upgrade, authentication, session creation, and `createMessageHandler`, so acceptance tests can open a real WebSocket client, send `conversation_list` frames, and observe the server's frames directly.

## Done when these pass

- [ ] **conversation_list over WebSocket › delivers the authenticated user conversation_list newest-first, supports limit and before paging, and answers an empty array when the user has none** — `conversation_list` returns `{ type: 'conversation_list', conversations: SessionSummary[] }` from `store.listFor(session.userId, { limit, before })`, ignores any client-supplied `userId`, pages with `limit` and `before`, and returns `[]` when the user has no conversations or `limit: 0`
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **conversation_list over WebSocket › answers conversation_list immediately while a turn is streaming on the same session without waiting for the per-session lock** — `conversation_list` is handled outside the per-session `user_message` lock so a streaming turn does not block listing conversations
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **conversation_list over WebSocket › answers UNSUPPORTED with no stream_end when the session store lacks listFor, SERVER_ERROR when listFor throws, and INVALID_MESSAGE when limit or before is malformed while accepting valid requests** — a store without `listFor` answers `error` (`UNSUPPORTED`) with no `stream_end`, a throwing/rejecting `listFor` answers `error` (`SERVER_ERROR`) with no `stream_end`, and invalid `limit` or `before` fields answer `error` (`INVALID_MESSAGE`) with no `stream_end`
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationListRequest`, `ConversationListMessage`, and `ErrorCodes.UNSUPPORTED` to `src/types/messages.ts` and `src/types/session.ts`, and re-export the message types from `src/index.ts`
- [ ] Validate `conversation_list` frames (`limit` as optional non-negative integer, `before` as optional `{ updatedAt, sessionId }` with parseable ISO timestamp and non-empty `sessionId`, stripping extra fields like `userId`) in `src/transport/ws/validation.ts`
- [ ] Pass `sessionStore` into `createMessageHandler` from `src/transport/createServer.ts` and handle `conversation_list` outside the per-session lock in `src/transport/ws/messageHandler.ts` (answering `UNSUPPORTED` when `store.listFor` is absent and `SERVER_ERROR` when `store.listFor` throws or rejects, with no `stream_end`)
- [ ] Document the new message pair in `docs/adding-a-message-type.md` if needed

## Out of scope

- Conversation titles or previews (first user message, model-generated summary)
- Pushing an updated list on every turn (`store.listFor` is answered when asked; the client pages with `before`)
- Operator view of another user's conversations
- Live sync between open tabs (#124)