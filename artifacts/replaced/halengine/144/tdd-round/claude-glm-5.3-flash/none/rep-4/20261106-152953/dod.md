# Definition of Done

> #143 gives a consumer `store.listFor(userId)` inside the server process. The client on the other end of the WebSocket has no way to ask for it, and the consumer who wants a conversation picker without standing up their own REST endpoint has to write one anyway.

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message pipeline already exist and accept frames over a real WebSocket connection, so acceptance tests can connect today, send `list_sessions` frames, and fail directly on the missing `session_list` and `list_sessions` validation/dispatch behaviour.

Wire names are `list_sessions`/`session_list` and the store's member is `listFor`, as the acceptance tests spell them; `ticket.md`'s older `list_conversations`/`conversation_list` spelling, its `history.enabled` opt-in and its `UNSUPPORTED`-on-missing-`listFor` rule are superseded — the accepted behaviour is an empty `session_list`, with no opt-in.

## Done when these pass

- [ ] **listing conversations over the WebSocket protocol › answers list_sessions for the authenticated user with ISO dates, forwarding limit and before while ignoring any client userId** — Sends `{type: 'list_sessions', limit, before, userId}` over a connected WebSocket and verifies `store.listFor` is called with the socket's authenticated `userId` (`session.userId`) and `{limit, before}`, answering `{type: 'session_list', sessions}` with `createdAt` and `updatedAt` serialised as ISO-8601 strings.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol › answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws** — Verifies that a store without `listFor` answers `{type: 'session_list', sessions: []}` and a store whose `listFor` throws/rejects logs an error under category `'ws'` with the userId and error message and answers `{type: 'error', code: 'SERVER_ERROR'}`.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol › accepts a bare list_sessions frame and rejects a malformed limit or before with INVALID_MESSAGE without calling listFor** — Verifies that `{type: 'list_sessions'}` is accepted while non-integer or negative `limit` values and malformed `before` cursors (`sessionId` outside 1–128 chars or unparseable `updatedAt`) are rejected with `INVALID_MESSAGE` without invoking `store.listFor`.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [x] Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`.
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`). Unit-tested in `validation.test.ts`; cited from the conversation-list spec's `Over the WebSocket protocol` statement.
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`.
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`. Unit-tested in `messageHandler.test.ts` (authenticated user, ISO dates, limit/before forwarded, client userId ignored); cited beside the acceptance test on the conversation-list spec's `Over the WebSocket protocol` statement.
- [x] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
- [x] Export `ListSessionsMessage` (and, when they exist, `SessionSummaryFrame` and `SessionListMessage`) from `src/index.ts` and `src/types/index.ts` — the type exists in `messages.ts` from the validation facet but is re-exported by neither index yet.
- [x] Clear the eslint and changelog findings CI reported on 7f1f04e: the duplicated socket-suite helpers (`eventually`, teardown, `delegatingTo`) and the shared summary fixture moved into `wsTestSupport.ts`, the acceptance test's frame dispatch runs guards-first, `messageHandler.ts` keeps one comment line, `validateMessage` dispatches with guard ifs instead of a three-case switch, `validation.test.ts` asserts one object, and `CHANGELOG.md` carries the `list_sessions` entry under `## [Unreleased]`.
- [ ] Release tail: the version bump (MINOR), `docs/getting-started.md` through `example/full-config.ts` + `npm run docs:fix`, and `npm run verify` green with the coverage floors holding. The `CHANGELOG.md` entry under `## [Unreleased]` is in.
- [ ] Pin that a `list_sessions` sent while a `user_message` streams on the same session is answered before that turn's `stream_end` — the handler already answers it outside `lock.run`, so the statement the protocol spec carries at §4.3 "Not a turn" is uncited backlog until a test in `messageHandler.test.ts` holds a turn open, asks for the list, and asserts the order.
- [x] CI's `test` step on 8ec74ea red, suite `conversationList.acceptance.test.ts`, no findings in the brief: found from the code instead. The handler answered `ping` synchronously inside its dispatch, so when a client's ask and heartbeat land in one server callback — which is how two writes in one tick always arrive — the `pong` was written before the `session_list` a `list_sessions` frame ahead of it already owed, and all three acceptance tests, which read their frames up to that `pong`, saw none. Answers given beside the lock are now chained per socket, one at a time in arrival order (`answersBesideTheLock` in `messageHandler.ts`), pinned by `answers a list_sessions asked in the same tick as a ping before that ping, in the order the frames arrived` in `messageHandler.test.ts` and cited on the protocol spec's §4.3 Not-a-turn statement. 55 of that file's 56 tests were green before the fix and all 56 after it.
- [ ] CI's verdict on this push is the confirmation this pod could not run: the acceptance suite stays unrun here, so whether its three tests are green is CI's to say. If its `test` step still names a test, fix the code it names — never the test.

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.