Round delivered. Everything pushed and level with upstream, base merged (no drift).

## What this round found and did

**The three-round mystery is solved: there was never a failing test.** CI's checkout for the 2850b92 verdict still holds its run's coverage, and its lcov closes the case: every suite passed — the acceptance file ran green — and the `test` check went red on jest's **coverage ratchet**: `global` functions 183/205 = 89.27% against the 89.79 floor. This branch's off-lock dispatch chain added three functions and covered one; the threshold line prints after jest's summary, exactly where the round brief truncates, which is why three rounds of "read the failing test's name" came back empty.

**The facet closed** — the chain's failure path:
- The chain's leading `.catch(() => undefined)` was unreachable: it attaches to a promise the chain's own trailing catch always settles. Removed (`src/transport/ws/connectionHandler.ts:210`).
- New test `answers a frame queued behind one whose dispatch failed` drives a rejection through the live tail catch and pins that frames queued behind a failing answer still dispatch — green against the old code, green after the refactor, 21/21 then 23/23 across my two files. Spec §5.9 gains the statement it validates, cited at `connectionHandler.test.ts#L278`.
- Floor raised with the measurement: 89.79 → 90.19 (184/204 = 90.196%, from ci-6's lcov arithmetic — this pod cannot run the whole suite).

**All of 2850b92's eslint findings cleared:** the 9-line frame pump both suites duplicated moved once into `wsTestSupport.ts` as `askUntilPong`; the acceptance file got the plumbing swap only (assertions untouched, same precedent as b3876f3), and the `prefer-early-return` `else` went with it. Spec anchors the moved tests invalidated were repointed by hand and by the repo's `spec:names --fix`; `check:spec-links` (0 misplaced), `spec:names` (807 verified), `check:spec-status` (0 findings) all pass. `dod.md` ticked both facets and records the resolution.

**Red tests:** 0 mine, 0 regressions — the red was a coverage threshold, caused by this branch's own new code and fixed in code.

**Named, not acted on:** the heartbeat callbacks in `createServer.ts` and `connectionHandler.ts`'s `error`/`pong` listeners are uncovered (pre-existing on main, outside this round's remit); the brief's log truncation and `lore_get_ci_failures` 404ing on this branch jointly cost three rounds here — a harness-side fix would prevent recurrence.

**Next:** CI's verdict on this push — with the ratchet fixed the acceptance list should flip green, leaving the packaging facets (docs via `example/full-config.ts` + `docs:fix`, CHANGELOG, MINOR bump).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"the test check's red root-caused to the global functions coverage ratchet (89.27% < 89.79%) — unreachable leading catch removed, failure path covered, floor raised with the measurement; 2850b92's three eslint findings cleared","tdd_next":"CI's verdict on push 9b0e6c3 — acceptance green, then the docs/CHANGELOG/version facets"}}