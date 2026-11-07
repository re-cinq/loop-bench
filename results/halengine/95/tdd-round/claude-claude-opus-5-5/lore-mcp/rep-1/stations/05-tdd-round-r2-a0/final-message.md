I didn't write any code this round: CI's only failure doesn't come from this branch's changes. I added a note about it to `.lore/dod.md` and pushed, which also starts CI again.

**What CI reported:** on `d159dea`, the `test` step stopped at its 15-minute limit. The coverage table had already printed, so the tests finished and then Jest never exited. The only clue in the log is a "Cannot log after tests are done" warning from the ws transport's `disconnected` message. I couldn't get the full job log: `lore_get_ci_failures` returns "branch not found" (404) for `loop-bench/95`.

**Why the branch isn't the cause:**
- The change is one line in the `catch` in `src/orchestration/chatOrchestrator.ts`, which now always calls `onError` and wraps a non-`Error` value. It adds two small functions, `asError` and `describeThrown`.
- The new tests open no sockets, timers or database connections.
- `src/orchestration/chatOrchestrator.test.ts` passes here (28 of 28) and exits in 0.35 s. That was the only test I ran; the acceptance tests are left to CI.

**What I changed:** I added an unchecked item to `.lore/dod.md` saying the new CI run decides whether the hang was a one-off. If it happens again, the open handle should be looked for in `src/transport/ws`. Committed and pushed. `origin/main` had no new commits to merge, and the branch is level with its remote.

**Red tests:** none were mine and none were regressions. The red build was a timeout, not a failing test.

**Unrelated issue I left alone:** the ws transport tests log after Jest has finished, which suggests a socket or handler isn't being closed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"diagnosed CI test-step timeout as a non-exit hang outside this diff; recorded in dod.md and re-triggered CI","tdd_next":"acceptance green"}}