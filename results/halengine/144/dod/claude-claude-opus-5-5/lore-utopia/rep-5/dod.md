# Definition of Done

> The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createServer` over a real socket (`startEngineWith` in `src/transport/wsTestSupport.ts`) and `validateMessage` are existing seams. Today the engine answers `list_conversations` with `INVALID_MESSAGE`, so every test fails because the behaviour is missing. The tests pass `history` in options built as a const, not a literal. That keeps ts-jest from rejecting the option before the behaviour runs.

## Done when these pass

- [ ] **accepts a list_conversations frame and refuses a bad limit or cursor, naming the field** — the validator accepts the bare frame and a valid `limit`/`before` cursor. It refuses `limit` 0, 201, 1.5 and `'10'`, a string `before`, a cursor whose `updatedAt` is not a date, and a cursor with only one half. Each refusal message names the field.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connection's own user, newest first in ISO strings, pages as asked, and a row reopens by its id** — `history` is on and the frame carries another user's `userId`. The answer is exactly one `conversation_list` (no `stream_end`) holding the connecting user's three conversations, newest first, with ISO-string times. `limit: 1` plus a `before` cursor returns the next row. Reconnecting with `?sessionId=<row id>` gives `resumed: true` and that conversation's replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses with an error rather than an empty list when history is off, the store cannot list, or listFor fails** — with `history` absent, or a store with no `listFor`, the answer is one `error` with code `UNSUPPORTED` and no list. A `listFor` that throws gets `SERVER_ERROR` with no store detail in the message. The socket still answers a ping, and the failure is logged with the session id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request while the session's turn is still streaming, before its stream_end** — the request is answered off the `PerSessionLock`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary` and `ConversationListMessage` in `src/types/messages.ts`, additive only. `ConnectedMessage` stays untouched.
- [ ] `ErrorCodes.UNSUPPORTED` in `src/types/session.ts`.
- [ ] A `list_conversations` case in `validation.ts` (limit 1–200 integer; `before` is a `{updatedAt, sessionId}` cursor).
- [ ] `createMessageHandler` takes the store and history options. It answers off the lock, calls `listFor(ws.userId, {limit, before})`, and maps the result's dates to ISO strings.
- [ ] The `UNSUPPORTED` paths: history off, no `listFor`, and the exported `StoreCannotList`. A logged `SERVER_ERROR` for a rejection.
- [ ] `HalEngineConfig.transport.history?: {enabled}` threaded through `createServer` like `resume`, with a startup warning when history is on and resume is off.
- [ ] The GDPR note on the new options type pointing at #41, plus § 4.3 / § 5 field tables and the authorisation rule in `specs/hal-engine-websocket-protocol/spec.md`.
- [ ] The conversation-list spec cross-reference, `example/full-config.ts` with `npm run docs:fix` for `docs/getting-started.md`, `CHANGELOG.md` under `[Unreleased]`, and a MINOR bump.

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, an operator view of another user's conversations, and live sync between tabs. All of these are named out of scope in the ticket.
- Pushing an unsolicited `conversation_list`, or an in-band frame to switch conversations. Reopening a conversation stays the #45 `?sessionId=` reconnect.