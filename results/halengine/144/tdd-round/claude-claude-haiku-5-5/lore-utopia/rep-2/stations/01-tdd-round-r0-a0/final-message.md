The round is pushed and the branch is in sync with its upstream. I closed one sub-facet, not the whole validation facet.

**What changed this round**
- `src/transport/ws/validation.test.ts`: one new unit test, "accepts a bare list_sessions frame". It failed first with `Unknown message type: list_sessions`.
- `src/types/messages.ts`: added `ListSessionsMessage` and included it in `IncomingMessage`. This is additive; no existing line changed.
- `src/transport/ws/validation.ts`: added a `list_sessions` case that returns the bare frame. The test then passed, 4 of 4 in that file.
- `.lore/dod.md`: split facet 2 into a ticked sub-facet (bare frame accepted) and an open one (reject malformed `limit`/`before` with `INVALID_MESSAGE`, strip `userId`).
- Formatted with prettier, committed, pushed, merged `origin/main` (no conflicts), pushed again. `git status` reports the branch is in sync with `origin/loop-bench/144`.

**Test runs**
- The repo's test runner is Jest, not Vitest as the brief's example says. I ran only `src/transport/ws/validation.test.ts`, with `NODE_OPTIONS=--experimental-vm-modules`, which is what the repo's `npm test` uses.
- I did not run the acceptance file `src/transport/conversationList.acceptance.test.ts`, as instructed. Those three acceptance tests are still expected to be red.
- I did not run lint, typecheck, or a build.
- The round brief file did not exist, so there was no CI verdict to work from.

**Red/regression count**
- Red tests I wrote this round: 1, now green.
- Regressions: none observed, since I ran only my own file. CI has not reported on this push yet.

**Not done**
- The `list_sessions` acceptance criteria are not yet met: limit/before validation, `userId` stripping, the handler, the `session_list` type, the createServer wiring, and the spec updates remain.
- `lore-query-trace` reported no covering tests for `validation.ts`, although `validation.test.ts` exists beside it. I did not investigate why.
- I noticed no unrelated smells this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validation: accept bare list_sessions frame","tdd_next":"validation: reject malformed limit/before with INVALID_MESSAGE and strip userId"}}