# Definition of Done

> #143 gives a consumer `store.listFor(userId, options)` and tells them to mount their own HTTP route on `additionalRoutes` with `auth.http`. A consumer whose chat UI already speaks only the HAL WebSocket protocol has no HTTP session endpoint and no second auth path to maintain: the socket is already authenticated, already knows `ws.userId`, and already carries session-lifecycle state (`connected.resumed`, `entryCount`, `resumeFailure`). Delivering the list over the same channel — an initial page on connect when configured, plus a request frame for paging and refresh — lets a UI render a conversation switcher from the connection it already has, without every host app writing and securing the same wrapper route.

**Strategy: `direct`** — `startEngineWith` and `createServer` already expose the real WebSocket upgrade and message pipeline, so acceptance tests can connect a real WebSocket client and observe connect-time frames and `list_conversations` responses directly.

## Done when these pass

- [ ] **conversation list over the WebSocket protocol › delivers the initial page after connected and replay when conversations is on, and omits it when off or unsupported** — With `transport.resume.conversations: true`, sends `conversations` after `connected` and any replay with ISO-string dates and only the four summary fields; sends nothing on connect when `conversations` is off or `store.listFor` is absent.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **conversation list over the WebSocket protocol › answers list_conversations at once during a turn, pages with before and limit, and rejects a malformed frame without stream_end** — Answers `list_conversations` outside the per-session turn lock for the socket's own authenticated user, forwards `limit` and `before` cursor paging, and rejects malformed `list_conversations` frames with `INVALID_MESSAGE` and no `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **conversation list over the WebSocket protocol › survives a throwing listFor on connect without evicting the session, and answers SERVER_ERROR on a request failure** — When `store.listFor` throws on connect, logs the error and keeps the session open without evicting it; when `store.listFor` throws on `list_conversations`, answers `error` with `SERVER_ERROR` and leaves the socket open.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Define and export `ConversationSummaryWire`, `ConversationsMessage`, and `ListConversationsPayload` in `src/types/messages.ts` and `src/index.ts`, and add `conversations?: boolean` to `SessionResumeOptions`.
- [ ] Validate `list_conversations` frames in `src/transport/ws/validation.ts` (optional `limit`, optional `before: {updatedAt, sessionId}` with non-empty `sessionId` and finite `Date.parse(updatedAt)`, stripping unknown fields).
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` outside `sessionLocks`, answering `conversations` (empty when `listFor` is absent) or `SERVER_ERROR` when `listFor` throws, with no `stream_end`.
- [ ] Send the initial `conversations` frame after `connected` and any replay in `src/transport/ws/connectionHandler.ts` when `resume?.enabled && resume.conversations && sessionStore.listFor`, catching and logging `listFor` errors without closing the socket or evicting the session.

## Out of scope

- Conversation titles or snippets (#145)
- Deleting or renaming a conversation over the socket (#41)
- Remembering which page a client had scrolled to server-side
- An operator view of another user's conversations
- Live sync between open tabs (#124)