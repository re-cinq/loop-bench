# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the
> browser holding the socket cannot reach the store, so every consumer that wants a history
> sidebar has to stand up its own authenticated HTTP route over the same data the engine already
> authenticated on the upgrade.

**Strategy: `direct`** — the seams all exist: `createServer` upgrades a real socket with
`ws.userId` on it, `InMemorySessionStore.listFor` has shipped since #146, and `validateMessage`
is the boundary the frame crosses. The acceptance tests drive the real server over a real
WebSocket and fail today only because `list_conversations` is an unknown message type
(`Unknown message type: list_conversations` → `INVALID_MESSAGE`), which is exactly the reported
gap. No replacement module, no characterization needed.

## Done when these pass

- [ ] **accepts a list_conversations frame statically, whatever the config says** —
      `validateMessage({type: 'list_conversations'})` is valid (bare, with `limit`, with a
      `{updatedAt, sessionId}` cursor, with an extra `userId`); `limit: 0`, `limit: 201`,
      `limit: 1.5`, `limit: '10'`, `before: 'not a date'` and a half cursor are invalid with a
      message naming the field; a fixture holds every pre-existing frame literal against both
      unions (criterion: validation; amendment 1 — `before` is a cursor, one half alone refused)
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a history request with the connecting user’s own list, and a row of it resumes** —
      with `history: {enabled: true}` and the store holding three conversations for the user (the
      connection's own row included, listed like any other), the frame is answered with exactly
      one `conversation_list`, newest first, each time an ISO string, and no `stream_end`; then a
      row's id passed back as `?sessionId=` answers `resumed: true` with that conversation's
      replay, through the existing #45 path (criteria: the list on the wire; picking a
      conversation)
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **lists the connecting user’s conversations, paged as the frame asked** — the store's
      `listFor` is called with `ws.userId` while the frame carried another user's id, and
      `limit`/`before` reach it as the frame sent them, asserted on the recorded argument, the
      cursor as `{updatedAt, sessionId}` ISO strings and both keys possibly `undefined` rather
      than omitted (criteria: authorisation; paging pass-through)
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers an error frame, never an empty list, when the list cannot be given** — with
      `history` absent, against a store with no `listFor`, and against a store throwing the new
      exported `StoreCannotList`, the answer is one `error` with code `UNSUPPORTED` and no
      `conversation_list`; a `listFor` that rejects is answered `SERVER_ERROR` whose message
      carries no store detail, the socket stays open (a later `ping` is still answered), and the
      failure is logged with the session id and none of the store's detail (criteria: opt-in
      gate; unsupported store; failing store; `StoreCannotList` amendment)
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a history request before the turn it did not queue behind ends** — a
      `list_conversations` sent while a `user_message` is streaming on the same session is
      answered before that turn's `stream_end` (criterion: off the per-session lock)
      `src/transport/ws/conversationList.acceptance.test.ts`

The one red nuance: until the `StoreCannotList` export exists, the fourth test dies at its
setup with `TypeError: StoreCannotList is not a constructor` before its assertion — that is the
missing public surface showing itself, and the first three scenarios of that test still fail on
`INVALID_MESSAGE` vs `UNSUPPORTED` meanwhile.

## Facets

- [ ] `src/types/messages.ts`: four new interfaces (`ListConversationsMessage`,
      `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` — `SessionSummary`
      with its two times as ISO strings) and their two union members, additive only, no existing
      line touched; the test file's fixture holds the old literals compiling
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` an integer 1–200
      when present, `before` a two-half cursor of `Date.parse`-able strings when present,
      `INVALID_MESSAGE` naming the field otherwise; the frame is valid with no config to consult
- [ ] `src/types/session.ts`: `ErrorCodes` gains `UNSUPPORTED`, and a new exported
      `StoreCannotList` error class lands beside it (amendment 3 — new public surface)
- [ ] `src/config.ts`: `HalEngineConfig.transport.history?: {enabled: boolean}`, default off
- [ ] `src/transport/createServer.ts`: `history` threaded through `HalServerOptions` like
      `resume`; the session store and the new options passed to `createMessageHandler`
- [ ] `src/transport/ws/messageHandler.ts`: `list_conversations` answered on the non-locked path
      beside `ping`; user id from `ws.userId`, never the frame; `listFor(userId, {limit, before})`
      with the keys possibly `undefined`; one `conversation_list` back, summaries' times ISO
- [ ] Refusals: `UNSUPPORTED` when the feature is off, when the store has no `listFor`, and when
      the store throws `StoreCannotList`; `SERVER_ERROR` with no store detail, socket kept open,
      and an error log carrying the session id when `listFor` fails otherwise
- [ ] Startup warning when `transport.history` is on without `transport.resume` (the amendment's
      deployment-slip warning; refusing to start was rejected)
- [ ] Specs: the statements added on this branch (websocket-protocol § 4.3, § 5.9, the
      `UNSUPPORTED` row, the GDPR bullet; conversation-list § Over the WebSocket) stay cited as
      the implementation lands; `Status` rows untouched by the DoD pod, re-evaluated by the round
- [ ] `CHANGELOG.md`: an entry under `## [Unreleased]` written for somebody installing the package
- [ ] `docs/getting-started.md`: the change made in `example/full-config.ts` and regenerated with
      `npm run docs:fix` under the `full-config` doc block, not typed into the markdown
- [ ] Version bump MINOR, said in the PR body; no migration guide owed
- [ ] `npm run verify` passes and the coverage floors for the touched groups hold or rise

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own
  authorisation decision
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled it out)
- The client-side requirements the protocol spec addresses to the client (ping cadence,
  reconnection backoff, index adjustment) — the repo implements only the server