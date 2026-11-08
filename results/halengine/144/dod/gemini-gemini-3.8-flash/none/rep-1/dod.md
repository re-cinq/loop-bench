# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.
>
> A consumer may have no such route to extend: an engine deployment behind an api with a session
> store and no conversation endpoints of its own has nothing to add this to. The engine already knows who is connected and already
> replays a conversation on resume; answering "which conversations do I have" over the same socket
> is the smaller surface.

**Strategy: `direct`** — Real WebSocket connections to `createServer` exercise the transport protocol end-to-end against `InMemorySessionStore`. Acceptance tests connect over WebSocket, send `list_conversations` frames, and observe the wire frames returned.

## Done when these pass

- [ ] **delivers the authenticated user's conversation list over WebSocket, respecting paging and ignoring any frame userId** — validates delivering `conversation_list` with ISO timestamps, newest first, no `stream_end`, using connection `userId`, paging with `{limit, before}` cursor, and reconnecting with `?sessionId=<id>`
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with an UNSUPPORTED error frame when history is not enabled or store has no listFor** — validates that absent `history` opt-in or a store without `listFor` is answered with an `error` frame with code `UNSUPPORTED`
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations off the per-session lock while a user message is streaming** — validates that `list_conversations` is handled concurrently on the non-locked path and answered before a streaming turn completes
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, and `ConversationListMessage` to `src/types/messages.ts`
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts` (`limit` 1–200, `before` cursor with ISO date)
- [ ] Thread `history?: {enabled: boolean}` config through `HalEngineConfig`, `createServer`, and `createMessageHandler`
- [ ] Handle `list_conversations` off `PerSessionLock` in `createMessageHandler`, calling `store.listFor(ws.userId, ...)` and returning `conversation_list` or `error` (`UNSUPPORTED` / `SERVER_ERROR`)
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` with §4.3 and §5.9 frame documentation and citations
- [ ] Update `example/full-config.ts` and regenerate docs with `npm run docs:fix`
- [ ] Add CHANGELOG entry under `[Unreleased]`

## Out of scope

- Conversation title or preview in summaries
- Client-side deletion / erasure over WebSocket
- Server-held paging state
- Live synchronization across open tabs