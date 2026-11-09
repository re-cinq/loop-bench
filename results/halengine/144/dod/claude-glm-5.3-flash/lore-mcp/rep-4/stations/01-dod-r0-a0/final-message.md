Done and landed. Branch `loop-bench/144` is pushed, clean against `origin/main`, and `git status` reports it up to date with its upstream.

## What I wrote

**Triage: `direct`.** The seam already exists — #146 shipped `SessionStore.listFor` at HEAD, `createServer` takes a real store, and a real `ws` client speaks the protocol over an ephemeral port. No doubles were needed; every test drives the real entry point.

**`src/transport/conversationListTransport.acceptance.test.ts`** — a new acceptance file, 7 tests covering the ticket's behavioural criteria: the happy wire answer (newest-first, ISO times, metadata-only rows, `ConnectedMessage` unchanged), `listFor` called with the connection's user off the recorded argument while `limit`/`before` cross verbatim, answered off the per-session lock mid-stream, the `?sessionId=` round trip through the existing resume path, the three `UNSUPPORTED` refusals (feature off / no `listFor` / new `StoreCannotList`), field-level validation including the half-cursor refusal, and the `SERVER_ERROR` path with log hygiene and an open socket.

**`specs/hal-engine-websocket-protocol/spec.md`** — § 4.3 `list_conversations`, § 5.9 `conversation_list`, the `UNSUPPORTED` code row, and § 12 authorisation/GDPR bullets, each citing its test in the repo's `([validated by: ...])` form. All 11 anchors verified: `spec:names`, `check:spec-links`, `check:spec-status` pass; the `Status` rows are untouched. The conversation-list spec I deliberately left alone — it is `Shipped`, so its extension belongs to the implementing round (noted in the dod).

**`.lore/dod.md`** — verbatim claim, `direct` strategy, the seven tests, the implementation facets, out-of-scope.

## The red bar (quoted from the run)

`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationListTransport.acceptance.test.ts` → **Tests: 7 failed, 7 total**:

- `Expected ["connected","entry_upsert","conversation_list"]` / `Received ["connected","entry_upsert","error"]` — the frame type doesn't exist, so the engine answers `INVALID_MESSAGE`
- `Expected length: 2, Received length: 0` (`conversation_list` frames), `Expected "conv-old", Received: undefined`, `Expected: true, Received: false` (list absent mid-stream and in validation)
- `types/sessionStore does not export StoreCannotList yet` — amendment 3's new public surface
- `Expected ["error","SERVER_ERROR"]` / `Received ["error","INVALID_MESSAGE"]` for the failing store

Each failure is the ticket's absent behaviour, never a broken fixture. Two findings for the record: ts-jest diagnostics are on, so the `history` option and `StoreCannotList` are deliberately accessed through a cast at one boundary and a dynamic import — both stay compiling before and after the code lands. And the compile-time half of criterion 1 (additive-only diff, message-literal fixture) is CI's typecheck job, which the dod says plainly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}