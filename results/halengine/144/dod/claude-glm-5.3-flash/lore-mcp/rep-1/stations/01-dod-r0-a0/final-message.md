Done. The ticket's red bar is committed and pushed.

**Triage: `direct`** — the seam already exists. #143's `store.listFor` shipped (commit `2926558`), and `createServer` over a real socket is the entry point a client actually hits — the same real-upgrade harness `sessionResume.test.ts` already uses. Nothing of #144 exists on the branch, so every test calls the real path and fails on the absent behaviour.

**Delivered** (commit `e6659d9`, pushed, branch up to date with `origin/loop-bench/144`, `origin/main` merged — already up to date):

- `src/transport/conversationList.acceptance.test.ts` — 7 acceptance tests: the happy path (one `conversation_list`, newest first, the connection's own empty row included per the amendment, ISO-string times, four-field rows, no content leak, no `stream_end`, then a row id reopened through the existing #45 resume path); authorisation on the recorded `listFor(ws.userId)` argument; `limit`/`before` passed through as the ISO-string two-part cursor; `UNSUPPORTED` for history-off, no-`listFor`, and the exported `StoreCannotList`; `SERVER_ERROR` with no store detail, socket kept open, logged with session id alone; validator accept/refuse naming the field; answered off the lock before a held turn's `stream_end`.
- `.lore/dod.md` — the claim quoted verbatim, strategy, test list, facets, out of scope.

**Ran only this file** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`), prettier-formatted. All 7 fail for the ticket's reason — `Tests: 7 failed, 7 total`:

- happy path → `types: ["connected", "error"]` (no `conversation_list`; today answered `INVALID_MESSAGE`)
- authorisation → `"askedFor": Array []` — `listFor` never called
- params → `"call": Array [], "page": Array []`
- UNSUPPORTED → `Expected: Any<Function> / Received: undefined` — `StoreCannotList` is not exported
- rejecting store → `"code": "INVALID_MESSAGE"` where `SERVER_ERROR` is owed, no session id logged
- validator → `"error": "Unknown message type: list_conversations"`
- off-the-lock → `conversation_list was not answered while the turn was held`

Two notes for the pod (both recorded in the DoD): CI lint will be red on `re-lint/require-spec-link` until the spec statements cite these tests — expected; and the criterion "three summaries" reads against the amendment "the conversation the connection is in is listed like any other": on a fresh connect that is four rows (own empty row first), which is what the test pins — on a resumed connection the literal three holds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}