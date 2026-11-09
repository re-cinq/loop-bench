Round delivered and pushed. Summary:

**What CI struck on `237e81b` (both eslint findings, both fixed):**

1. **`wsTestSupport.test.ts:31` — test with no spec link.** The helper's contract had no statement to cite, so I wrote `specs/hal-engine-ws-test-support/spec.md`: header table (`Issue: re-cinq/HALEngine#93`, `Status: Shipped`), a lead paragraph telling the 404-hang story that motivated the helper, and one testable statement — "a transport failure reaches the awaiting `framesUntil` promise as a rejection carrying the handshake error" — citing the test at `../../src/transport/wsTestSupport.test.ts#L31`. I verified against the lint plugin's own vendored gate logic (not eslint — a plain node check): link index finds `#L31` inside the `it()` span ✓, coverage walk gives testable=1/linked=1 → full → matches the declared `Shipped` ✓. First draft had the harness prose under a section heading, which the coverage walk counts as testable-but-unlinked → would have forced `In Progress`; folded it into the lead (intro prose is untestable) and re-verified.

2. **`wsTestSupport.ts:67` — `else` after a non-terminating branch.** Restructured into a guard: `if (CLOSED) { rejectPending(); return; }` then `client.once('close', rejectPending)`. Behavior-identical by inspection; no `else` remains in the file. Prettier run over the changed file: unchanged, check passes.

**Round ran no tests here** — no test was written this round (the two findings were lint repairs), and the pod must not run eslint/typecheck/build. CI judges the push.

**dod.md:** all facets were already ticked; this round closed the CI verdict on the transport facet; no new facet discovered. Red tests: 0 mine, 0 regressions (both findings were lint, not tests). Branch pushed (`cd3c5a6`), up to date with `origin/loop-bench/93`, already contains `origin/main` — no merge needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint verdict on the transport facet: spec citation for wsTestSupport.test.ts and the guard restructure in wsTestSupport.ts","tdd_next":"acceptance green"}}