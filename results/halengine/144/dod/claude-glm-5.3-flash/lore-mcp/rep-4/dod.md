# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seam already exists: `createServer` takes a real `SessionStore` (whose
`listFor` #146 shipped), and a real `ws` client speaks the protocol over an ephemeral port. The
acceptance tests drive that real entry point and fail today on behaviour — the engine answers
`list_conversations` with `INVALID_MESSAGE` because the frame type, the `history` option and the
`UNSUPPORTED` code do not exist yet. No doubles were needed anywhere.

## Done when these pass

- [ ] **answers a list_conversations with exactly one conversation_list, newest first, its times as ISO strings, and no stream_end** — criterion 3, 7 and 12: the happy answer's wire shape (ISO times, the four metadata fields and no others), the live conversation listed like any other, another user's never appearing, and `ConnectedMessage` unchanged
  `src/transport/conversationListTransport.acceptance.test.ts`
- [ ] **passes limit and before to listFor exactly as the frame sent them, taking the user from the connection and never the frame** — criterion 4 and 5: the recorded `listFor` argument is the connection's user even when the frame names another, the options object arrives with both keys (strictly, `undefined` included, not omitted), and the `before` cursor crosses as the ISO strings the frame sent
  `src/transport/conversationListTransport.acceptance.test.ts`
- [ ] **answers a list_conversations asked while a turn streams, before the stream_end of that turn** — criterion 10: the answer lands while the turn still holds the lock, with no `error` frame
  `src/transport/conversationListTransport.acceptance.test.ts`
- [ ] **hands a conversation_list row to ?sessionId= and rejoins that conversation, with no new transport path** — criterion 11: the existing resume path answers `resumed: true` with the conversation's replay
  `src/transport/conversationListTransport.acceptance.test.ts`
- [ ] **answers a list it cannot serve with UNSUPPORTED, never an empty list** — criterion 6 and amendment 3: history off, a store with no `listFor`, and a store throwing the new exported `StoreCannotList` all get the same `error`, and no frame carries a `conversations` key
  `src/transport/conversationListTransport.acceptance.test.ts`
- [ ] **validates a list_conversations frame on its own fields, and still validates the frames it served before** — criterion 2 and amendment 1: limit bounds and type, `before` as a whole cursor (one half alone refused), errors naming the field, no `userId` forwarded, and the pre-existing frames still validating unchanged
  `src/transport/conversationListTransport.acceptance.test.ts`
- [ ] **answers a failing listFor with SERVER_ERROR, no store detail, an open socket and a session-id log** — criterion 8: the rejection is answered once, the message carries no store detail, a ping still answers, and the log holds the session id and neither the store's detail nor user content
  `src/transport/conversationListTransport.acceptance.test.ts`

The tests run with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationListTransport.acceptance.test.ts
```

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, `ConversationListMessage` and their two union members — additive only, `ConnectedMessage` untouched. The compile-time half of criterion 1 (no existing line moves; message literals still compile) is CI's typecheck job, not a runtime test.
- [ ] `src/types/session.ts`: `ErrorCodes` gains `UNSUPPORTED`; `src/types/sessionStore.ts` exports `StoreCannotList`.
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — static, configless, `INVALID_MESSAGE` naming the field.
- [ ] `src/transport/ws/messageHandler.ts` (+ `sender.ts`): `createMessageHandler` takes the store and the new options beside the orchestrator; `list_conversations` answered off the lock beside `ping`; the user id read from `ws.userId`, never the frame.
- [ ] `src/transport/createServer.ts` and `src/config.ts`: `history?: {enabled: boolean}` threaded like `resume`, default off; the startup warning when history is on but resume is off (amendment: a list whose rows cannot be opened is a deployment slip).
- [ ] Failure paths: a rejecting `listFor` → `SERVER_ERROR` with a clean message logged with the session id; `StoreCannotList` → `UNSUPPORTED`.
- [ ] The conversation-list spec's transport note, and the `SessionResumeOptions` retention note mirrored onto the new options type. That spec is `Shipped` and its `Status` row may not be hand-edited, so this round adds the statements and lets `npm run check:spec-status` speak.
- [ ] `specs/hal-engine-websocket-protocol/spec.md`: the statements for these tests are already written and cited — do not rewrite them; after touching the test file run `npm run spec:names:fix`, then `npm run check:spec-links`, `npm run check:spec-status`, `npm run spec:names`.
- [ ] `example/full-config.ts` + `npm run docs:fix` (never hand-edit the doc block), `CHANGELOG.md` under `## [Unreleased]`, MINOR version bump, `npm run verify`.

## Out of scope

- A preview or title on the summaries (its own issue).
- Deleting a conversation from the client — an erasure primitive on the wire needs its own authorisation decision.
- Paging state held server-side; the client pages with `before`.
- An operator view of another user's conversations.
- Live sync between open tabs (#124 ruled it out).