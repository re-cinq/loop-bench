# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade.

**Strategy: `direct`** — the seams this feature needs already exist and are merged (re-cinq/HALEngine#144, branch `loop-bench/144`): `createServer` upgrades real sockets with `ws.userId` from the consumer's own authenticator, `validateMessage` is the acceptance point for frame shapes, and `InMemorySessionStore.listFor` (from #143/#146) already answers newest-first pages with the composite cursor. The feature is genuinely absent today — a `list_conversations` frame comes back `INVALID_MESSAGE` ("Unknown message type"), no `transport.history` option exists, no `UNSUPPORTED` code and no `StoreCannotList` export exist — so the acceptance tests below run real sockets against the real handler path and fail on their assertions, not on scaffolding.

## Done when these pass

All in one new file, `src/transport/conversationList.acceptance.test.ts`; no existing test file is touched.

- [ ] **answers a list_conversations frame with one conversation_list of the asking user, newest first, and reopens a row through ?sessionId** — the happy path through `createHalEngine` with `transport.history: {enabled: true}`: exactly one answer to an explicit ask (never pushed on connect), three rows newest-activity first with both times ISO strings, no `stream_end`, and a row's id reopening that conversation through the existing resume path
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a frame naming another user with the page of the user on the connection, with limit and before passed through** — the user id comes from the connection, never the frame: a frame carrying `userId: 'u2'` is answered with `u1`'s page, asserted on the recorded `listFor` argument, with `limit` and the `{updatedAt, sessionId}` cursor reaching the store as the frame sent them
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED and never an empty list when history is off or the store cannot list** — with `history` absent, and with history on against a store implementing no `listFor`, the answer is one `error` frame code `UNSUPPORTED` and no `conversation_list`: silence that looks like data is refused
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers SERVER_ERROR when the store fails, UNSUPPORTED when it throws StoreCannotList, and keeps the socket open** — a rejecting `listFor` yields one `SERVER_ERROR` frame carrying none of the store's detail, logged with the session id, socket still answering; the exported `StoreCannotList` reads as the misconfiguration it is (`UNSUPPORTED`)
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts the frame itself and refuses a bad limit or before by naming the field** — `validateMessage` takes the bare and paged frame whatever the feature flags say, and refuses `limit` of 0/201/1.5/'10' and a `before` that is not a date or carries one cursor half only, each naming the field
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request while the turn is still streaming, before that turn sends stream_end** — off the per-session lock: the answer lands between the ask and the turn's `stream_end`, not queued behind it
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`, additive only: four interfaces — the two frames plus `ConversationCursor` (what a client sends back) and `ConversationSummary` (a row on the wire, `SessionSummary` with ISO-string times) — and their two union members in `IncomingMessage`/`OutgoingMessage`. No existing line may change.
- [ ] `src/types/session.ts`: `ErrorCodes` gains `UNSUPPORTED`, additive.
- [ ] `src/index.ts`: `StoreCannotList` becomes public surface, so a permanent store misconfiguration reads as `UNSUPPORTED` rather than `SERVER_ERROR` (Amendment 3).
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` an integer 1–200 when present; `before` a `{updatedAt, sessionId}` cursor of ISO strings when present (Amendment 1: a timestamp alone drops conversations tied on activity); refusals name the field. The validator stays static and accepts the frame regardless of feature flags.
- [ ] `src/transport/ws/messageHandler.ts`: answers `list_conversations` on the unlocked path beside `ping`, with the session store and the history options passed in alongside the orchestrator; user id from `ws.userId`, never the frame; rejects mapped to one `SERVER_ERROR` frame carrying no store detail, socket kept open, failure logged with the session id and no user content; a thrown `StoreCannotList` mapped to `UNSUPPORTED`.
- [ ] `src/transport/createServer.ts` + `src/config.ts`: `transport.history?: {enabled: boolean}`, default off, threaded like `resume`; with history on but resume off, warn at startup (a list whose rows cannot be reopened through `?sessionId=` is a deployment slip) and say so where the docs tell a client to reconnect with a row's id.
- [ ] Row ids reopen through the existing `?sessionId=` path (#45) — no in-band switch frame, no second replay path. `ConnectedMessage` is unchanged by this issue (already pinned by `src/transport/sessionResume.test.ts`).
- [ ] Specs: the two frames, their field tables and the authorisation rule in `specs/hal-engine-websocket-protocol/spec.md`; the socket delivery statements in `specs/hal-engine-conversation-list/spec.md`; every statement cited with the `([validated by: ...](...#Lnn))` form; `Status` rows untouched. (Written on this branch already — the implementing round extends, never renumbers.)
- [ ] `CHANGELOG.md` under `## [Unreleased]`, written for somebody installing the package.
- [ ] `docs/getting-started.md` made in `example/full-config.ts` and regenerated with `npm run docs:fix`, never hand-typed into the markdown block.
- [ ] Version bump MINOR (new optional config, two additive protocol frames, one new error code); no migration guide owed.
- [ ] `npm run verify` green and the coverage floors for the touched groups hold or rise.

## Out of scope

- A preview or title on the summaries (its own issue).
- Deleting a conversation from the client — that puts an erasure primitive on the wire and needs its own authorisation decision.
- Paging state held server-side; the client pages with `before`.
- An operator view of another user's conversations — an authorisation question of its own.
- Live sync between open tabs, which #124 ruled out.