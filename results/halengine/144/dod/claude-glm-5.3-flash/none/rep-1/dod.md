# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade.

**Strategy: `direct`** — the seam exists: `createServer` upgrades real sockets and #143's shipped
`InMemorySessionStore.listFor` already answers, so every test drives a real WebSocket client against
a real engine and fails today on the behaviour itself — each `list_conversations` frame is answered
`INVALID_MESSAGE` as an unknown type — not on a missing seam. Six tests, because the ticket carries
six distinct wire behaviours (the list and its paging, the authorisation rule, the three refusal
paths, the lock ordering, static validation, and the row-to-resume loop); each bundles its whole
scenario into one `expect`, per the repo's `max-expects` rule.

## Done when these pass

- [ ] **answers list_conversations with the list of the user on the connection, newest first, and
      pages it with limit and before** — with `history: {enabled: true}`, the frame is answered by
      exactly one `conversation_list` and no `stream_end`, rows newest first and headed by the
      connection's own conversation, each row the store's summary with its two times as ISO strings
      and no other fields, and `limit` and `before` reach `listFor` as the frame sent them, the
      cursor read off the client's own first row
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers a frame naming another user with the list of the user on the connection, and asks
      the store for that user** — a frame carrying `userId: '<another user>'` is answered with the
      connecting user's own conversations only, and the recorded `listFor` argument is the
      connection's user id, never the frame's
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers a history that is off, a store that cannot list, and a store that fails with one
      error frame and never an empty list** — `history` absent and a store implementing no `listFor`
      both get exactly one `error` coded `UNSUPPORTED` and no `conversation_list`; a `listFor` that
      rejects gets one `SERVER_ERROR` whose message carries no store detail and no user content,
      with the socket still answering and the failure logged with the session id
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a turn on the same session is still streaming, before that
      turn ends** — a history request is answered off the per-session lock, not queued behind the
      streaming turn's `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **validates the frame whether or not history is on, refusing a bad limit or before with the
      field named** — `limit` of 0, 201, 1.5 or `'10'`, a `before` that is not the composite cursor,
      and a cursor with one half alone are each answered `INVALID_MESSAGE` naming the field, with
      history on; with history off the same malformed frame still reads `INVALID_MESSAGE` rather
      than `UNSUPPORTED`, because validation is static and the handler is what refuses
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **rejoins a conversation by an id taken from a list row, through the existing resume path** —
      a client that takes a row's id from a `conversation_list` and reconnects with
      `?sessionId=<id>` receives `resumed: true`, the entry count and the conversation's replay,
      with no new transport code
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

Smallest first; a round ticks the box it closed.

- [ ] `src/types/messages.ts`, additive only: `ListConversationsMessage`, `ConversationListMessage`,
  `ConversationCursor`, `ConversationSummary` and their two union members; no existing line moves
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED` and the exported `StoreCannotList`, additive;
  a store throwing `StoreCannotList` is answered `UNSUPPORTED` rather than `SERVER_ERROR` —
  unit-tested beside the class, which the acceptance test cannot construct before it exists
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` an integer 1–200,
  `before` a `{updatedAt, sessionId}` cursor of ISO strings, one half alone refused
- [ ] `transport.history` (default off) in `HalEngineConfig` and `createServer`'s options, threaded
  like `resume`; the engine warns at startup when history is on and resume is not
- [ ] `src/transport/ws/messageHandler.ts`: answer `list_conversations` on the non-locked path
  beside `ping`, the user id from `ws.userId`, `{limit, before}` passed to `listFor`, summaries as
  ISO wire rows, the two refusal paths, and the failure logged with the session id and no user
  content
- [ ] The round's own unit tests beside the new code (validation, handler, config), run on their own
- [ ] GDPR prose: the protocol spec's authorisation rule and no-content statements, and the
  retention note mirrored on the new options type, pointing at re-cinq/HALEngine#41
- [ ] `docs/getting-started.md` changed in `example/full-config.ts` and regenerated with
  `npm run docs:fix`; a `CHANGELOG.md` entry under `## [Unreleased]`; MINOR version bump
- [ ] `npm run verify` green, coverage floors for the touched groups held or risen, and the
  protocol spec's new statements all cited with `Status` matching

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own
  authorisation decision
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- A REST route over the same data — rejected by the ticket's own decision: the WebSocket is the
  surface that is already authenticated