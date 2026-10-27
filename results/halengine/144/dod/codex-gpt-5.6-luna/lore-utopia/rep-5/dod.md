# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — `createServer` and the real WebSocket upgrade path already provide a seam for exercising validation, authentication, store access and wire frames end to end. The acceptance tests use the in-memory store and real sockets; no production seam or double is needed.

## Done when these pass

- [ ] **conversation list validation** — accepts the list request and rejects invalid limits and cursors with field-specific errors
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **authenticated conversation list delivery** — returns the authenticated user's ISO summaries, excludes another user's conversations, and applies cursor paging over a real WebSocket
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **history opt-in** — returns `UNSUPPORTED` when conversation history is not enabled
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list request/response protocol types and validation.
- [ ] Thread the history opt-in and session store through the handler, using the connection user id.
- [ ] Return ISO summary rows and cursor-paged results without a stream turn.
- [ ] Refuse disabled or unavailable history with an error frame.

## Out of scope

- Conversation previews, deletion, server-held paging state, operator access to another user's conversations, and live cross-tab synchronization.
- Resume behavior itself; reconnecting with a listed session id remains covered by the existing resume contract.