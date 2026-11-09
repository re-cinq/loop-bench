# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seams already exist: `createServer` is the real entry point a consumer
wires and real upgrade-over-socket tests are the established harness here (`src/transport/sessionResume.test.ts`,
`wsTestSupport.ts`), and `validateMessage` is the validator's real entry point. Today a
`list_conversations` frame is answered `error INVALID_MESSAGE` (unknown type), which is the ticket's
claim observed directly — no production code is needed to run the tests, only to turn them green.

## Done when these pass

- [ ] **validating the list frame** — `validateMessage` accepts a bare `list_conversations` frame and
    `limit`/`before` when well formed; refuses `limit` 0/201/1.5/'10' and every `before` that is not a
    two-half cursor, each error naming the field
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers the connections own conversations...** — with `history: {enabled: true}`, one
    `conversation_list` carries the connecting user's rows newest first with ISO-string times and no
    `stream_end`; a frame forging another user's `userId` with `limit`/`before` is answered with the
    connecting user's own page, and the recorded `listFor` calls carry `ws.userId` and the frame's
    `{limit, before}` cursor
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list it cannot serve with one error frame and no list** — history absent and a store
    without `listFor` each get one `error` coded `UNSUPPORTED`; a rejecting `listFor` gets
    `SERVER_ERROR` with no store detail or user content in the message, the socket still answering a
    ping, and the failure logged with the session id
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request while a turn is streaming** — the `conversation_list` arrives while the
    streamed turn is still held, before its `stream_end`, off the per-session lock
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **opens a conversation by an id taken from the list** — reconnecting with `?sessionId=<row id>`
    answers `resumed: true` and the replay over the existing resume path, no new transport code
    `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Red first: run `src/transport/conversationList.acceptance.test.ts`, every test failing on the
    absent behaviour (`error INVALID_MESSAGE` where a `conversation_list` belongs)
- [ ] `src/types/messages.ts`, additive only: `ListConversationsMessage`, `ConversationListMessage`,
    `ConversationSummary`, `ConversationCursor` and their two union members; no existing line changes
    (CI's typecheck and the compiling fixture are the judge)
- [ ] `validation.ts`: the `list_conversations` case (limit integer 1–200, `before` an
    `{updatedAt, sessionId}` cursor of ISO strings, one half alone refused), `INVALID_MESSAGE` otherwise
- [ ] `createMessageHandler` takes the store and the new options beside the orchestrator (`createServer`
    already holds both) and answers `list_conversations` on the non-locked path beside `ping`, user id
    read from `ws.userId` never from the frame
- [ ] `HalEngineConfig.transport.history?: {enabled: boolean}` (default off) threaded through
    `createServer`'s options like `resume`; `history` on but `resume` off draws the startup warning
- [ ] `ErrorCodes.UNSUPPORTED` added; a store throwing the new exported `StoreCannotList` is answered
    `UNSUPPORTED`, not `SERVER_ERROR` — cover this with a unit test beside the handler (the acceptance
    file cannot import the class before it exists)
- [ ] `ConnectedMessage` stays byte-for-byte what it was — pinned by the existing
    `src/transport/sessionResume.test.ts` shapes, keep them green
- [ ] `specs/hal-engine-websocket-protocol/spec.md`: the two frames, field tables, the authorisation
    rule and the GDPR note (one user's own metadata, no content, id from the connection, the deployer's
    opt-in), with `([validated by: ...](...#Lnn))` citations pointing at
    `src/transport/conversationList.acceptance.test.ts`; extend the conversation-list spec's transport
    sentence the same way; do not hand-edit `| Status |`
- [ ] `CHANGELOG.md` entry under `## [Unreleased]` for somebody installing the package; MINOR bump, no
    migration guide
- [ ] `docs/getting-started.md` § Conversation list made by editing `example/full-config.ts` and running
    `npm run docs:fix` (the block is generated; `npm run docs:check` fails a hand-edited one)
- [ ] `npm run verify` passes; coverage floors for the touched groups hold or rise

## Out of scope

- A preview or title on the summaries; deleting a conversation from the client; server-side paging
  state; an operator view of another user's conversations; live sync between open tabs (#124)
- The store itself (`listFor`, cursor, order) — shipped by #143 and pinned by
  `src/infrastructure/stores/*.test.ts`; this ticket only carries it to the client
- The `grep` shape of the "no code path sends `conversations: []`" criterion is the reviewer's check;
  the observable part (no frame ever carries a `conversations` key on a refusal) is asserted in the
  refusal test