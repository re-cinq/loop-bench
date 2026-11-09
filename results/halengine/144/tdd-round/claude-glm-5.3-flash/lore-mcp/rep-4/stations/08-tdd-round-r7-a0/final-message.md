The round is complete and landed. Summary:

**What CI named (one finding, fixed):** `eslint` on 45695e2 — `re-lint/max-expects` at `src/transport/ws/messageHandler.test.ts:979`, the queue-catch test written by the 67b241c repair asserting three expects. I collapsed it into the file's established one-expect convention: a small `settle` helper turns each answer's promise into a `{resolved}`/`{rejected}` value, so rejection message (`socket gone`), resolution value (`undefined`), and the frames sent (`['pong']`) all assert in a single `toEqual`. Assertion strength is unchanged, and the queue-stall mutation still reddens the test — without the defensive catch, `behind` flips to `rejected` and the pong never lands.

**Verification:** the edited file ran green via the repo's own invocation (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/ws/messageHandler.test.ts`) — 59/59, re-run green after prettier. The spec anchor `specs/hal-engine-websocket-protocol/spec.md:188` → `#L979` still lands on the `it(` line, so no citation moved; no `scripts/spec-links/reanchor.mjs` exists here and no cited line in this file sits below 979. `.lore/dod.md` gained the ticked repair facet.

**Red tests:** zero of mine, zero regressions — CI's failure was a lint error, not a failing test.

**Delivery:** committed as `fix(transport): meet the one-expect gate on the queue test` (e8899a5), pushed; `origin/main` merged clean (already up to date); `git status` confirms the branch is up to date with its upstream.

**Unrelated smells noticed, acted on none:** none new this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the red build of 45695e2: the eslint max-expects finding on the queue-catch test in messageHandler.test.ts","tdd_next":"acceptance green"}}