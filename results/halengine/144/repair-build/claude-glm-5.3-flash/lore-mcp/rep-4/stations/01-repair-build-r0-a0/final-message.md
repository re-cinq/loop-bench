Everything has landed. Here's the summary of the round:

**What CI reported (sha `5cd4e67`, the branch's head — unchanged since judgment):**

**`test` — the acceptance tests failed because nothing answered the frames.** The first round shipped `list_sessions` types and validation, but `sessionStore` was never threaded into the message pipeline. I implemented the handling per the branch's DoD:
- `createMessageHandler` now takes the store beside the orchestrator, wired from `createServer` (`src/transport/ws/messageHandler.ts`, `createServer.ts`).
- `list_sessions` is answered off the per-session lock, beside `ping`. A per-socket answer chain (`WeakMap<WebSocket, Promise<void>>`) serialises the non-turn answers, which is what makes a list that awaits the store reach the client ahead of the ping sent right behind it — the accepted tests depend on that ordering, and it was flaky-by-TCP-timing without it. Turns are untouched: `messageHandler.test.ts`'s "ping answered at once while a run is pending" still passes.
- The user id comes from `session.userId`, never the frame; `limit`/`before` reach `listFor` as sent; summaries are serialised to ISO strings; a store with no `listFor` answers `session_list` with `sessions: []`; a rejecting `listFor` logs on the `ws` category with the user and error and answers `SERVER_ERROR` (all in `sender.ts`/`messageHandler.ts`).

**`eslint` — 8 findings, fixed at the cause:**
- 6 × duplicate-code between `conversationList.acceptance.test.ts` and `sessionResume.test.ts`: lifted `eventually`, the drain-before-stop teardown, and `delegatingTo` into `wsTestSupport.ts`, both suites now import them.
- `prefer-early-return` at 67:7: `askAfterConnect` is now a flat guard chain (pong guard, non-connected guard, happy path flat) — I first wrote the flip the rule suggests, then caught that it nests an `if` and would trip `no-nested-if`, so it's sibling guards instead.
- `no-flag-params` at 58:31: the assertion now collects the malformed frames that were wrongly accepted and expects `[]`, instead of `Array(9).fill(false)`.

**Verified locally** (scoped, nothing repo-wide): the 3 previously-failing acceptance tests pass, all 18 transport suites (200 tests) pass, `spec:names:fix` repointed 31 line anchors by name, and `spec:names`, `check:spec-links`, `check:spec-status`, `repoint-spec-anchors --check origin/main`, `docs:check`, `docs:check-paths`, `check:regions`, `docs:check-spikes` and `check-changelog.sh origin/main` all pass. Prettier run over exactly the seven changed files — clean. Per pod constraints I did not run eslint, tsc or a build; every lint fix was derived from the rule's own source, and every changed file is type-checked by ts-jest diagnostics in the suites that ran.

Committed as `6555dd1`, pushed, and `origin/main` merged (already up to date — the branch's base is main's head). `git status` reports the branch level with its upstream. DoD facets 3 and 4 ticked; facet 5's protocol-spec half remains for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frames were validated but never answered (sessionStore missing from the handler) and 8 lint errors from copied test scaffolding; handler implemented off the lock with per-socket answer ordering and scaffolding lifted into wsTestSupport"}}