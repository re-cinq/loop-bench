# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade.

**Strategy: `direct`** — the seams already exist: `validateMessage`, `createMessageHandler` and a
real WebSocket upgrade through `createServer`, with `InMemorySessionStore` seeded as the store. Every
acceptance test drives the real entry point over a real socket (or the real validator) and fails on
behaviour today, because `list_conversations` is an unknown type answered with `INVALID_MESSAGE`.

## Done when these pass

- [ ] **accepts list_conversations and refuses a limit or a cursor it cannot use, naming the field** —
      `validateMessage` accepts the frame statically (no config, extra fields ignored), refuses
      `limit` 0/201/1.5/'10' and an unusable or half a `before` cursor, each error naming the field
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request off the turn with the conversations of the connecting user, and a
      row of it rejoins through resume** — with `history: {enabled: true}`, one `conversation_list`
      newest first with ISO times and metadata only, answered before a parked turn's `stream_end`,
      `listFor` called with `ws.userId` despite another user's id on the frame, and a row reopened
      through `?sessionId=` (`resumed: true` + replay)
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **passes limit and before to the store as the frame sent them, and warns when history is on
      without resume** — `limit: 2` and the `{updatedAt, sessionId}` ISO cursor reach `listFor`
      verbatim and page; `ConnectedMessage` keeps its exact key set; the engine warns at startup
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list it cannot offer with an UNSUPPORTED error, never an empty list** — with
      `history` absent, and with history on against a store implementing no `listFor`, the answer is
      one `error` frame of code `UNSUPPORTED` and no list, for a user who demonstrably has
      conversations
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a store that fails to list with SERVER_ERROR and no store detail, and keeps the
      socket open** — one `error` frame, message without the store's detail, a following `pong`
      proving the socket, and an error log carrying the session id and no user content
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a store throwing StoreCannotList with UNSUPPORTED, not a server error** — the new
      exported error class reads as a misconfiguration, not a failure
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts` additive only: `ListConversationsMessage`, `ConversationListMessage`,
      `ConversationSummary`, `ConversationCursor`, their two union members — a `git diff` of the file
      touches no existing line
- [ ] `src/types/session.ts` gains `UNSUPPORTED` in `ErrorCodes`; `src/types/sessionStore.ts` exports
      `StoreCannotList`; `SessionResumeOptions`' retention note is mirrored on the new history options
      type, pointing at re-cinq/HALEngine#41
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case per the first test above
- [ ] `src/transport/ws/messageHandler.ts`: takes the session store and the history option beside the
      orchestrator, answers `list_conversations` on the non-locked path beside `ping`, takes the user
      id from `ws.userId`, maps a rejecting `listFor` to `SERVER_ERROR` (log: session id, no user
      content) and a thrown `StoreCannotList` to `UNSUPPORTED`
- [ ] `src/transport/createServer.ts` and `src/config.ts`: `history?: {enabled: boolean}` threaded
      like `resume`; the startup warn when history is on without `transport.resume`
- [ ] Spec statements are already written and cited (this pod): §4.3, §5.9 and §12 of
      `specs/hal-engine-websocket-protocol/spec.md` and § Over the transport of the conversation-list
      spec — the implementing round adds the field tables' payload types it introduces and keeps
      `npm run check:spec-links`, `npm run check:spec-status` and `npm run spec:names` green
- [ ] `docs/getting-started.md` § Conversation list made in `example/full-config.ts` and regenerated
      with `npm run docs:fix`, never typed into the markdown
- [ ] `CHANGELOG.md` entry under `## [Unreleased]`, written for somebody installing the package;
      MINOR version bump, no migration guide owed
- [ ] A read of the diff confirming no code path answers a list it cannot serve with
      `conversations: []` (the criterion's `grep`; not expressible as an acceptance test)

The red bar is CI's to show as well: the tests run in job **CI / Verify**, step **Test (with
coverage floor)** (`npm run test:coverage`), on every push.

## Out of scope

- A preview or title on the summaries (its own issue); deleting a conversation from the client; paging state held server-side; an operator view of another user's conversations; live sync between open tabs (#124)
- Any change to `ConnectedMessage`'s existing fields, to the resume path's behaviour, or to the store's `listFor` semantics (all pinned as unchanged by these tests or by the shipped specs)