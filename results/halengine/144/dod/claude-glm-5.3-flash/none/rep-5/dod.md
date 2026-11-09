# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade.

**Strategy: `direct`** — the seam exists today: `createServer` already holds the session store and
the orchestrator, threads `resume` through its options, and a real client can already open a socket
over a real store (`src/transport/wsTestSupport.ts`). The tests below call that entry point — and,
for the headline, `createHalEngine`, the deployer's own config path — and fail today on behaviour:
`list_conversations` is answered `INVALID_MESSAGE` because nothing reads it. Two things the ticket
adds do not exist yet, so the test file carries their declaration locally rather than failing to
compile: the `history` option is typed on the variables it is passed in (it lands on
`HalServerOptions`/`HalEngineConfig` with this ticket), and `StoreCannotList` is read off the
package surface at runtime, so that scenario's red bar names the missing export until it lands.

## Done when these pass

- [ ] **delivers the connecting user's conversations as one conversation_list, newest first, with wire times as ISO strings** — history on through `HalEngineConfig.transport.history`: exactly one `conversation_list`, newest activity first, the conversation the connection sits in listed like any other, another user's rows absent, both times of every row ISO strings, no `stream_end`, and nothing sent unsolicited
      `src/conversationList.acceptance.test.ts`
- [ ] **answers a frame naming another user with the connecting user's own list, paging by the window the frame sent** — the store's `listFor` is called with the connection's `ws.userId` (asserted on the recorded argument, the frame's own `userId` ignored), and `limit` and `before` reach it as the frame sent them, `before` as its two ISO string halves and not a `Date`
      `src/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED wherever it cannot answer, and never with a list or an empty one** — with `history` absent, and with history on against a store written before lists existed: one `error` frame, code `UNSUPPORTED`, no `conversation_list`
      `src/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED for a store that throws StoreCannotList, as the misconfiguration it is** — the new exported error reads as a refusal, not as a server failure
      `src/conversationList.acceptance.test.ts`
- [ ] **answers SERVER_ERROR when the store fails, without carrying its detail, and keeps the socket** — a rejecting `listFor` is one `SERVER_ERROR` frame carrying none of the store's text, the ping sent after it still answered, the failure logged with the session id and none of the store's text
      `src/conversationList.acceptance.test.ts`
- [ ] **answers a list request while a turn streams, before that turn's stream_end** — a history request is not a turn: it is answered off the per-session lock, mid-turn
      `src/conversationList.acceptance.test.ts`
- [ ] **refuses a frame whose window is malformed, naming the field** — `limit` of `0`, `201`, `1.5` and `'10'`, a `before` that is not an object, and a cursor of one half alone are each answered `INVALID_MESSAGE` naming `limit` or `before`, with history ON, so validation stays the static half and the handler the configured one
      `src/conversationList.acceptance.test.ts`
- [ ] **rejoins a conversation by an id taken from the list, through the resume path resume enables** — a row's id reconnects with `?sessionId=` into `resumed: true` and that conversation's replay, with no new transport code
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`, additive only: `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor`, and their two union members; no existing line of the file moves
- [ ] `src/types/session.ts`: `ErrorCodes` gains `UNSUPPORTED`; the new `StoreCannotList` is exported from `src/index.ts`
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case
- [ ] `src/transport/ws/messageHandler.ts`: `createMessageHandler` takes the store and the history options beside the orchestrator; `list_conversations` answered on the non-locked path beside `ping`; the user id from `ws.userId`; `listFor` called with `{limit, before}`, both possibly `undefined`; `StoreCannotList` mapped to `UNSUPPORTED`, any other rejection to `SERVER_ERROR`, logged with the session id and no store detail
- [ ] `src/transport/createServer.ts`: `history?: {enabled: boolean}` threaded like `resume`; a startup warning when history is on without resume
- [ ] `src/config.ts`: `transport.history` forwarded into `createServer`
- [ ] The statements this file cites live in `specs/hal-engine-websocket-protocol/spec.md` (§4.3 `list_conversations`, §5.9 `conversation_list`, the `UNSUPPORTED` row of §5.6); the conversation-list spec gains its wire half; `Status` rows are left alone by this pod and moved by the round that closes the coverage; `npm run spec:names:fix` after the formatter, then `npm run spec:names`, `check:spec-links` and `check:spec-status` pass
- [ ] `docs/getting-started.md` § Conversation list made in `example/full-config.ts` and regenerated with `npm run docs:fix`; `CHANGELOG.md` entry under `## [Unreleased]`; MINOR version bump
- [ ] `ConnectedMessage` is unchanged: `src/transport/sessionResume.test.ts` staying green is the proof

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client: an erasure primitive on the wire needs its own authorisation decision
- Paging state held server-side: the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124)