# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real entry point exists: `createServer` over a real WebSocket upgrade (`wsTestSupport.ts`), with `InMemorySessionStore.listFor` already shipped (#143/#146). The socket has no `list_conversations` frame today, so the tests fail on the missing behaviour.

## Done when these pass

- [ ] **is answered with one conversation_list of the connecting user’s conversations, as ISO-dated summaries** — with `history: {enabled: true}`, a `list_conversations` frame gets one `conversation_list` whose ids are the store's `listFor` for the connecting user, each date an ISO string
      `src/transport/listConversations.acceptance.test.ts`
- [ ] **answers with the connecting user list even when the frame names another user** — a frame carrying `userId: 'u2'` is answered with u1's conversations only; u2's never appear
      `src/transport/listConversations.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage` and `ConversationListMessage` (plus `ConversationSummary` and `ConversationCursor`) to the unions, additive only
- [ ] `validation.ts`: a `list_conversations` case; `limit` integer 1–200 when present, `before` a `{updatedAt, sessionId}` pair of which a `Date.parse`-able string is `updatedAt`; anything else `INVALID_MESSAGE`
- [ ] `HalServerOptions.history?: {enabled: boolean}`, default off, threaded through `createServer` like `resume`; with it off, the frame is answered with `error` code `UNSUPPORTED` and no list
- [ ] `ErrorCodes` gains `UNSUPPORTED`; a store with no `listFor` is answered `UNSUPPORTED`, never `conversations: []`
- [ ] `createMessageHandler` answers `list_conversations` off the per-session lock, beside `ping`
- [ ] A rejecting `listFor` is answered `SERVER_ERROR` with no store detail; the socket stays open
- [ ] Spec: extend `specs/hal-engine-websocket-protocol/spec.md` with the two frames and the authorisation rule (no spec statement is un-linked for this yet, so no spec anchor is stamped)
- [ ] `CHANGELOG.md` entry under `## [Unreleased]`; `docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`

## Out of scope

- A preview or title on summaries (its own issue)
- Deleting a conversation from the client
- Server-side paging state (the client pages with `before`)
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- The GDPR wording and version bump, which belong to the build, not the red bar