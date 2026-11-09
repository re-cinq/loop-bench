# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seams exist today: `validateMessage` is a pure entry point, and `createServer`/`createHalEngine` plus a real upgraded socket (the `sessionResume.test.ts` pattern) take a frame and return frames on the wire. Every test calls that real path now and fails on absent behaviour — a `list_conversations` frame is answered `error INVALID_MESSAGE` ("Unknown message type") because the protocol has no such frame yet, which is exactly the ticket's claim.

## Done when these pass

- [ ] **is valid with a limit of one to two hundred and a cursor of two ISO halves, and names the field it refuses** — `validateMessage({type: 'list_conversations'})` is valid, forwards no field the frame does not define (no `userId`), and refuses `limit` 0/201/1.5/'10' and a `before` that is not the two-half `{updatedAt, sessionId}` cursor of ISO strings, each refusal naming the field
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connection with its own conversations, newest first, even when the frame names another user** — with `transport.history` on, a frame carrying another user's `userId` draws exactly one `conversation_list` of the connecting user's own rows, newest activity first, both times ISO strings, and no `stream_end`; the recording store was asked for `ws.userId`; and a row's id reopens that conversation through the existing `?sessionId=` resume path (`resumed: true`, its replay)
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **hands limit and before to the store as the frame sent them, the cursor as ISO strings** — `listFor` receives `limit: 2` and a `before` whose `updatedAt` is the very ISO string the frame carried (a `Date` fails this), the answer is the page the store returned, and a frame without either field reaches the store with both undefined
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list it cannot serve with one error frame and no conversation list, keeping the socket open** — `history` absent, a store with no `listFor`, and a store throwing the new exported `StoreCannotList` all draw one `error` coded `UNSUPPORTED`; a `listFor` that rejects draws `SERVER_ERROR` with no store detail on the wire or in any log, the socket still answers a ping afterwards, and the failure is logged with the session id
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list while a turn on the same session is still streaming, before that turn ends** — with a provider held mid-answer (the turn holds the `PerSessionLock`), the next frame the socket receives after `list_conversations` is its `conversation_list`, not that turn's `stream_end`
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts` — additive only: `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary` (four interfaces, per the amendment) and their two union members. `git diff` of that file touches no existing line, and the suite still compiling is the fixture that every message literal valid before the change still compiles.
- [ ] `src/types/session.ts` — `ErrorCodes.UNSUPPORTED` added, and the new exported `StoreCannotList` (public surface, per the amendment).
- [ ] `src/transport/ws/validation.ts` — the `list_conversations` case: `limit` an integer 1–200, `before` a two-half cursor of ISO strings, `INVALID_MESSAGE` naming the field.
- [ ] `src/transport/ws/messageHandler.ts` — `createMessageHandler` takes the session store and history options beside the orchestrator; `list_conversations` answered on the non-locked path beside `ping`; calls `listFor(ws.userId, {limit, before})`; a rejection is answered `SERVER_ERROR` with a message carrying no store detail and logged with the session id, `StoreCannotList` answered `UNSUPPORTED`; no `stream_end` after a list.
- [ ] `src/transport/createServer.ts` + `src/config.ts` — `history` threaded through `HalServerOptions` and `transport.history` like `resume`; startup warning when history is on and resume is off (per the amendment: the engine warns, it does not refuse to start).
- [ ] Specs — extend `specs/hal-engine-websocket-protocol/spec.md` (both frames, field tables, the authorisation rule, the GDPR paragraph mirroring `SessionResumeOptions`' retention note pointing at #41) and `specs/hal-engine-conversation-list/spec.md`; the new statements cite the acceptance tests above with `([validated by: ...](src/transport/conversationList.acceptance.test.ts#Lnn))` at their current lines — there is no `scripts/spec-links/reanchor.mjs` here, and `scripts/repoint-spec-anchors.mjs` only translates anchors that already existed against a base ref, so new anchors are authored by hand; `npm run check:spec-links`, `npm run check:spec-status` and `npm run spec:names` pass; no `| Status |` row is edited by hand.
- [ ] Docs — the `docs/getting-started.md` § Conversation list change is made in `example/full-config.ts` and regenerated with `npm run docs:fix` (`npm run docs:check` fails a hand-edited block).
- [ ] `CHANGELOG.md` entry under `## [Unreleased]` for somebody installing the package; MINOR version bump per `npm run check:version`.
- [ ] `npm run verify` passes and the coverage floors for the touched groups hold or rise.

## Out of scope

- A preview or title on the summaries (its own issue).
- Deleting a conversation from the client — an erasure primitive on the wire needs its own authorisation decision.
- Paging state held server-side; the client pages with `before`.
- An operator view of another user's conversations.
- Live sync between open tabs (#124 ruled it out).
- `conversation_list` pushed unsolicited — the list is answered only when asked.
- An in-band conversation switch frame — picking a row reconnects with `?sessionId=`, the existing #45 path.