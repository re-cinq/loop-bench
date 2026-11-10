# Definition of Done

> #143 gives a consumer `store.listFor(userId, options?)`, and nothing in the engine delivers that list to a client. A consumer building a conversation switcher still has to stand up an authenticated HTTP route and call `listFor` themselves, even though the client already holds an authenticated WebSocket and resumes the conversation it picks over that same WebSocket (#124).

**Strategy: `direct`** — The WebSocket transport and `wsTestSupport` harness already exist; acceptance tests can open a real WebSocket against `createServer` today, send `list_conversations` frames, and fail on the missing protocol message handling, opt-in gate, and error codes.

## Done when these pass

- [ ] **delivers the authenticated user's conversations newest-first as ISO summaries and pages with limit and a composite before cursor, including ties** — Scopes `listFor` to the upgrade's `session.userId`, strips unknown fields on the frame and on `before`, serialises `SessionSummary` dates to ISO 8601 strings with no `entries` or `authHeaders`, and pages cleanly with `limit` and `{updatedAt, sessionId}` across tied timestamps.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a turn is streaming without waiting on the session lock or sending an extra stream_end** — Dispatches `list_conversations` outside `PerSessionLock` so a client receives `conversation_list` while a `user_message` stream is still held open, and emits only the turn's single `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED without calling listFor when listing is disabled or unsupported by the store, and SERVER_ERROR when listFor fails** — Adds `ErrorCodes.UNSUPPORTED`, gates listing on `transport.resume?.enabled` (off by default), answers `UNSUPPORTED` on a 5-member `SessionStore` without `listFor` or a `MongoSessionStore` whose `CollectionLike` omits `find`, and answers `SERVER_ERROR` (logging under `'ws'` without leaking driver detail) when `listFor` rejects while keeping the socket open.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **rejects malformed list_conversations limits and cursors with INVALID_MESSAGE and no stream_end** — Validates `limit` as a non-negative integer (`0` accepted) and `before` as `{updatedAt, sessionId}` with a parseable ISO timestamp and a valid `1–128` char `[A-Za-z0-9_-]` session id, answering `INVALID_MESSAGE` with no `stream_end` when invalid.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `UNSUPPORTED: 'UNSUPPORTED'` to `ErrorCodes` in `src/types/session.ts` and add `ListConversationsMessage`, `ConversationSummaryPayload`, and `ConversationListMessage` to `src/types/messages.ts` (`IncomingMessage` / `OutgoingMessage`) and re-export them from `src/index.ts`.
- [ ] Validate `list_conversations` in `src/transport/ws/validation.ts` (`limit` non-negative integer, `before` `{updatedAt, sessionId}` with finite `Date.parse(updatedAt)` and `1–128` char `[A-Za-z0-9_-]` `sessionId`, stripping unknown fields) and ensure invalid `list_conversations` frames do not emit `stream_end`.
- [ ] Handle `list_conversations` outside `PerSessionLock` in `src/transport/ws/messageHandler.ts` (wired from `connectionHandler.ts` / `createServer.ts` with `sessionStore` and `resume?.enabled`), checking abort `signal`, gating on `resume?.enabled` and store capability (`UNSUPPORTED`), and catching store failures (`SERVER_ERROR` logged under `'ws'`).
- [ ] Update `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts`, `docs/getting-started.md`, and `CHANGELOG.md` under `## [Unreleased]`.

## Out of scope

- Conversation titles or snippets in `ConversationSummaryPayload` (#145).
- Server-side `nextCursor` state (the client pages using `before`).
- Listing another user's conversations (operator view).
- Live sync of conversation lists across open tabs.