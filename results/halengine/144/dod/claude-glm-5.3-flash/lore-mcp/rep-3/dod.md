# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seams all exist today: `validateMessage` takes the frame, `createServer` serves real sockets, `createHalEngine` takes the config, and `InMemorySessionStore.listFor` lists for real. What is missing is behaviour, not a seam — the `list_conversations` case, the four message types, the `transport.history` switch, the `UNSUPPORTED` code and the exported `StoreCannotList` — so the tests intersect the new option types onto the existing signatures, send real frames over real sockets, and fail on behaviour.

## Done when these pass

- [ ] **accepts list_conversations, drops a foreign field, and refuses a bad limit or a broken cursor, naming the field** — the validator takes the new frame, forwards only its own fields (no user id survives), and refuses a limit outside 1–200 or a cursor missing a half with a message naming the field
      `src/conversationListOverWs.acceptance.test.ts`
- [ ] **answers one conversation_list of the user's own conversations, newest first, with ISO times and no stream_end** — with history enabled, a real engine answers exactly one `conversation_list` of four-field rows with ISO times, newest activity first, and no `stream_end`
      `src/conversationListOverWs.acceptance.test.ts`
- [ ] **lists the connecting user and hands the frame's window to the store as the frame sent it** — a frame naming another user's id is answered with the connecting user's own list, and `listFor` is called with `ws.userId` and the frame's `{limit, before}` verbatim, asserted on the recorded argument
      `src/conversationListOverWs.acceptance.test.ts`
- [ ] **answers an error, never an empty list, whenever the list cannot be given** — history absent, store without `listFor`, and store throwing `StoreCannotList` all answer `UNSUPPORTED` with no list; a rejecting `listFor` answers `SERVER_ERROR` carrying no store detail, with the socket left open and the failure logged with the session id
      `src/conversationListOverWs.acceptance.test.ts`
- [ ] **answers a history request beside a running turn, before that turn's stream_end** — a `list_conversations` sent while a `user_message` is streaming is answered off the per-session lock, before that turn's `stream_end`
      `src/conversationListOverWs.acceptance.test.ts`
- [ ] **reopens a row of the list through the resume path that already exists** — a client that takes an id from the list and reconnects with `?sessionId=<id>` gets `resumed: true` and that conversation's replay, with no new transport code
      `src/conversationListOverWs.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor` and `ConversationSummary` and their two union members, additive — no existing line changes
- [ ] `src/types/session.ts`: add `UNSUPPORTED` to `ErrorCodes`
- [ ] `src/index.ts`: export `StoreCannotList`
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` an integer 1–200, `before` a cursor carrying both halves with an ISO-string `updatedAt`, anything else `INVALID_MESSAGE` naming the field
- [ ] `src/transport/ws/messageHandler.ts`: answer `list_conversations` on the non-locked path beside `ping`, reading the user from `ws.userId`, choosing `UNSUPPORTED` vs `SERVER_ERROR`, and logging a rejected `listFor` with the session id and no user content
- [ ] `src/transport/createServer.ts` + `src/config.ts`: thread `transport.history?: {enabled: boolean}` through the options like `resume`; warn at startup when history is on and resume is not
- [ ] Docs: add the history switch in `example/full-config.ts`, regenerate `docs/getting-started.md` with `npm run docs:fix`; CHANGELOG entry under `## [Unreleased]`; MINOR version bump
- [ ] `npm run verify` and the coverage floors for the touched groups; `npm run check:spec-links`, `npm run check:spec-status` and `npm run spec:names`

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own authorisation decision
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations — an authorisation question of its own
- Live sync between open tabs, which #124 ruled out