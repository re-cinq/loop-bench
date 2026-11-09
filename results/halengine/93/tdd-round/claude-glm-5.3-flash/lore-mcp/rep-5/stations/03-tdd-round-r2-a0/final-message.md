Pushed and landed — branch is up to date with its upstream, and `origin/main` merged clean (already up to date, no drift, no second push needed).

## Round summary

**What this round owed**: CI's verdict on `dc98ac0` was red — the round brief's findings outrank the ticked facets. The one finding: `awaitedSessionCreate.test.ts` › *answers a rejecting create with SERVER_ERROR rather than an unhandled rejection*, failing as a 5s timeout plus an unhandled `Unexpected server response: 404`.

**Diagnosis**. The failing test predates this branch (added on main by `ecba9ba`/`5eec9b8`; this branch touched only orchestration + docs), so it is not a regression — but it blocks the ticket. I reproduced the failure once locally (first cold run, ~1 in ~44) and then reproduced its exact client-side shape deliberately: when a ws upgrade is answered with HTTP 404, the client reports exactly CI's message. A probe confirmed the in-repo mechanism for that response: node routes an upgrade into express as a plain request when no upgrade listener exists, and `createApp`'s catch-all answers 404. With the current helpers, that failure escaped as an unhandled `error` event against *whichever test the worker was running*, while `framesUntil` hung to the suite timeout and skipped the test's `process.off('unhandledRejection')` cleanup. Which process wrote the 404 on the CI runner stays unidentified — nothing in-repo answers 404 to an upgrade.

**RED** → new test `src/transport/wsTestSupport.test.ts`: a real socket answers the upgrade 404; `framesUntil` must reject with `Unexpected server response: 404` within 1s. It failed with CI's exact two-part signature (unhandled error + hanging promise).
**GREEN** → `connectClient` records each client's transport failure; `framesUntil` rejects with it (or a close-before-frame reason) and no-op-catches teardown-time rejections. Test green in 0.17s.
**REFACTOR** → try/finally in the CI-named test so the `unhandledRejection` handler is released on red runs; assertions untouched (`seen: ['error']`, `unhandled: 0`) and the `it(` line (spec anchor `specs/hal-engine-awaitable-session-store/spec.md:26` → `#L56`) unmoved — verified by eye, no reanchor script in this repo. Bar green: 7/7 over the new file plus both helper-consumer suites, stable across four consecutive runs; only those named files were run, no acceptance tests, no lint/typecheck/build.

**dod.md** — appended and ticked the new facet.

**Named, not fixed**: `once(client, 'open')` awaits still hang to the suite timeout on a failed handshake (two call sites); `handshake.test.ts` builds raw clients without error listeners; the CI runner's 404 responder itself remains unattributed — if it strikes again, the failure now names its reason.

Red tests mine: 0 (my test went red→green in-round). Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"transport failure reaches the awaiting frames promise as a named rejection (wsTestSupport client error plumbing)","tdd_next":"acceptance green"}}