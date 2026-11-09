Done. The red build is fixed and pushed as `b90b454` on `loop-bench/144`.

## What CI reported and what it was

**`test`** — `conversationList.acceptance.test.ts:116` failed because the handler did not exist: `list_sessions` frames were validated but never answered (the previous round's "Next" step). I implemented it:
- `createMessageHandler(orchestrator, sessionStore)`, with the store threaded through `createServer` (`src/transport/ws/messageHandler.ts:43`).
- `list_sessions` is answered off the per-session lock; the user id comes from the connection (`ws.userId`, set at upgrade), never the frame; `session_list` carries ISO-8601 times (`sender.ts` `sendSessionList`); a store without `listFor` answers an empty list; a throwing `listFor` logs once on the `ws` category with `{userId, error}` and answers `SERVER_ERROR`.
- Answers are chained **per socket** (`inOrder`): without it, the suite's `list_sessions`+`ping` pair lands in one `data` event and the synchronous pong overtakes the awaited `session_list`, so the red test could not pass even with the handler written.

**`eslint`** — all 8 findings fixed, none suppressed:
- The three clones between `conversationList.acceptance.test.ts` and `sessionResume.test.ts` (suite arrays + `eventually`, the drain-then-stop teardown, `delegatingTo`) moved into the shared `src/transport/wsTestSupport.ts`; `stopEngines` now drains sockets before stopping.
- The `prefer-early-return` guard in `askAfterConnect` was flipped so the happy path runs flat, keeping clear of `no-nested-if` and the rule's else-split shape.
- `Array(9).fill(false)` → `Array.from({length: 9}, () => false)`.

## Verification (run in the repo root, scoped)

- The CI test step (`jest --coverage`): **69 suites, 696 tests, all pass**, coverage floors hold, `messageHandler.ts`/`sender.ts` at 100% lines. Unit call sites of the new signature updated (`messageHandler.test.ts`, `sessionSave.test.ts`, `beforeToolCall.test.ts`).
- A direct jscpd scan with the rule's own options: **zero clones left in `src/`** (11 remain in `ci.yml`/`package-lock.json`/`scripts/`, which eslint does not lint — pre-existing).
- My line shifts staled 124 spec anchors across 9 spec files; `npm run spec:names:fix` repointed them, and `spec:names`, `check:spec-links`, `check:spec-status`, and CI's `repoint-spec-anchors --check origin/main` are all clean.
- `prettier --write` over the changed files. eslint itself was not run in this pod, per the constraint — every finding was fixed from the annotation and hand-audited against the rule sources.

Pushed; `git status` reports the branch up to date with `origin/loop-bench/144`, and `origin/main` is an ancestor (no drift, nothing to merge).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frames were validated but never answered (test) and the new ws suites duplicated sessionResume scaffolding plus a boolean-literal argument (eslint) — handler implemented off the lock with per-socket answer ordering, scaffolding deduped into wsTestSupport, 124 spec anchors repointed; full jest suite + coverage floors green"}}