Done. Branch `loop-bench/144` carries the red bar for re-cinq/HALEngine#144, committed as `27dcb88` and pushed; merge with `origin/main` was already up to date, and `git status -sb` shows the branch level with its upstream (no ahead/behind).

**Triage: `direct`.** Every seam the ticket needs exists today — `validateMessage`, `createServer` over real sockets, `createHalEngine`, `InMemorySessionStore.listFor` — so the tests intersect the new `transport.history` option type onto the existing signatures and fail on behaviour, not on imports. Recorded in `.lore/dod.md` in the required shape.

**The deliverable:** `src/conversationListOverWs.acceptance.test.ts` — 6 acceptance tests, all red:

1. validator accepts `list_conversations`, drops a foreign `userId`, refuses bad `limit`/broken cursor naming the field
2. happy path: exactly one `conversation_list` of the user's own rows, newest first, ISO times, no `stream_end`
3. ownership + window pass-through: `listFor` called with `ws.userId` and the frame's `{limit, before}` verbatim (asserted on the recorded argument)
4. the four cannot-answer modes: history off, no `listFor`, `StoreCannotList` → `UNSUPPORTED`; rejecting `listFor` → `SERVER_ERROR`, no store detail, socket open, logged with session id
5. answered off the per-session lock, before a running turn's `stream_end`
6. a row reopens via the existing `?sessionId=` resume path (`resumed: true` + replay)

**Actual failure output** (ran only `node --experimental-vm-modules node_modules/jest/bin/jest.js src/conversationListOverWs.acceptance.test.ts` — `Tests: 6 failed, 6 total`, no ts-jest diagnostics, so the file compiles today):

- Test 1: `+ "error": "Unknown message type: list_conversations", + "valid": false` where `{valid: true, data: {type: 'list_conversations', ...}}` was expected — every refusal case likewise.
- Test 2: `frames: Array ["connected", "error"]` vs expected `["connected", "conversation_list"]`, `askedOf: []` vs `['u1']`, `rows: []`.
- Test 3: `asked: Array []` vs `[{owner: 'u1', window: {limit: 2, before: {...}}}]`.
- Test 4: all four cases `- "code": "UNSUPPORTED"` / `- "code": "SERVER_ERROR"` vs `+ "code": "INVALID_MESSAGE"`, and `loggedSessionId: false` vs `true`.
- Test 5: at position 4 of the frame order, `- "conversation_list"` vs `+ "error"`.
- Test 6: `listed: Array []` vs `["kept-alive"]`, `resumed: false`.

Each failure is the absent behaviour the ticket states, not a broken fixture.

**Traceability:** purely additive spec statements in `specs/hal-engine-websocket-protocol/spec.md` (new §4.3 `list_conversations` with 8 cited statements, `UNSUPPORTED` row + semantics bullet in §5.6, new §5.9 `conversation_list`, two GDPR bullets in §12) and a new "Over the WebSocket" section in `specs/hal-engine-conversation-list/spec.md`, each citation in the repo's established `([validated by: name](path#Lnn))` form; `npm run spec:names:fix` repointed 0 of 806 citations, confirming every anchor matches its test's current line. No `| Status |` row touched (diff confirms).

**Findings (neighbouring, not acted on):**
- The repo has no `scripts/spec-links/reanchor.mjs`; its repointer is `scripts/check-spec-anchor-names.mjs --fix` (`npm run spec:names:fix`), which I used.
- `npm run prettier` covers only `{src,scripts,smoke}/**/*.ts` — the spec markdown is hand-aligned. An initial prettier pass over the spec reformatted 63 untouched table lines; I reverted that and kept the spec diff purely additive (69 insertions, 0 deletions). The test file itself is prettier-clean (`--check` passes).
- Layering: `layers.yaml`'s plain lists give a transport-layer test no import permission for `config.ts`/`index.ts`, so the acceptance file sits at `src/` root, where both public entry points are importable.

**Delivery:** formatter run over the changed files only; no eslint, no typecheck, no build (per pod limits). Commit `27dcb88 test(transport): pin conversation list over ws` with the `Co-Authored-By: Claude Code <noreply@anthropic.com>` trailer; pushed; `origin/main` fetched and merged (up to date); second push reports up-to-date and status confirms the branch is not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}