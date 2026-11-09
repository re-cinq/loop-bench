Everything landed and the branch is clean and up to date with its upstream. Final summary:

## What was red and what I did

**`test` — the acceptance suite had no handler behind it.** The branch's committed tests sent `list_sessions` over a real socket and nothing answered. Following the branch's own `.lore/dod.md` next-step pointer, I:
- threaded an optional `sessionStore` into `createMessageHandler` and wired it in `createServer.ts` (`src/transport/ws/messageHandler.ts:33`);
- answered `list_sessions` beside `ping`, off the per-session lock: the user always comes from `session.userId` (a frame carrying `userId: 'u2'` is ignored and the store's `listFor` is asserted to receive `u1`), summaries serialised to ISO strings, an empty `session_list` when the store has no `listFor`, and `SERVER_ERROR` with a `ws`-category error log when `listFor` rejects;
- fixed a real race the third test exposed: when the client's list frame and ping arrived in one TCP chunk, the synchronously-sent pong overtook the list answer waiting on its first `await`. The pong is now queued a microtask (`handlePing`), so an answer already in flight always precedes the pong that follows it — the ordering the suite's pong-as-barrier idiom assumes. No documented protocol constraint changes.

**`eslint` — 8 errors.** Three duplicate blocks between `conversationList.acceptance.test.ts` and `sessionResume.test.ts` (`eventually`, the teardown, `delegatingTo`) moved into the existing shared `src/transport/wsTestSupport.ts`, whose `stopEngines` now also waits for each server's sockets to drain before stopping; the wrapped-happy-path `if` in `askAfterConnect` became three sibling guards (no nested `if`, per `no-nested-if`); `Array(9).fill(false)` in `validation.test.ts` became a literal array.

**Bookkeeping my file moves required:** 31 spec anchors cited those test files by line; repointed with the repo's own tools and verified — `spec:names` (795 citations ok), `repoint-spec-anchors --check origin/main` (stale: 0), `check:spec-links`, `check:spec-status` all pass.

**Verified:** the full jest suite passes — 696 tests, 69 suites (the red suite re-run repeatedly, no flake); prettier run over the changed files. Not run in this pod, per the limits: eslint, tsc, build.

**One thing to flag:** the ticket text says a store without `listFor` should get an `error`/`UNSUPPORTED` frame, but this branch's already-committed tests and `specs/hal-engine-conversation-list/spec.md` state an empty `session_list` for that case — I followed the branch's committed contract rather than re-litigating it; the `UNSUPPORTED`/`StoreCannotList` amendment from the ticket remains outstanding work for a later round, as does the websocket-protocol spec documentation facet.

Committed as `52ce17d`, pushed, `origin/main` merged (already up to date), `git status` clean and not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions had no handler (acceptance tests red) and 8 lint errors from test-helper duplication; handler implemented off the lock, helpers deduped into wsTestSupport, spec anchors repointed"}}