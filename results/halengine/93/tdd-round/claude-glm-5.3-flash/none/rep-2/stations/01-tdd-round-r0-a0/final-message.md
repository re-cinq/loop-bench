Round complete and pushed (`84ad63d`), branch in sync with its upstream and with `origin/main`.

**The round** (strategy `direct`, one red-green-refactor pass):

- **RED** — one test, `sums only the rounds that reported usage, and stays undefined when none reported` in `src/orchestration/orchestratorHelpers.test.ts:29`, on plain values with no doubles. Failed for the expected reason: `does not provide an export named 'sumReportedUsage'`.
- **GREEN** — `sumReportedUsage` beside `extractUsage` in `orchestratorHelpers.ts` (sums each token field over the rounds that reported, `undefined` when none did), wired into the loop: `lastUsage` retention became `roundUsages.push(outcome.usage)` with the sum handed to `afterModelResponse`. A no-tool turn still reports exactly today's value — one round, the sum of one.
- **REFACTOR** — facet 1: the hook's third parameter is now `TurnUsage` (one-line doc: summed over every provider call in one turn; `undefined` when none reported), exported from the package root; generated doc blocks in `CLAUDE.md` and the architecture spec regenerated via the repo's own `check-doc-blocks --fix`; spec statement for the gap rule added to `specs/hal-engine-config-hooks/spec.md` citing my test (anchor checker: 9/9 citations resolve); CHANGELOG entry under **[Unreleased] → Changed** with the migration note and why the pass-both shape was rejected. Bar stayed green throughout: 5/5 in the file I ran.

**Red tests:** 1 mine (by design, now green); 0 regressions known — CI judges the push. I verified by reading that the two existing tests touching this seam still hold arithmetically: `chatOrchestrator.test.ts:531` (one reporting round → total equals it) and `toolBudget.test.ts:214` (compares two identical runs). Facet 3 is left unticked for CI's verdict, which is its proof.

**Notes:** no `lore_*` tools and no `round-brief.md` existed in this pod, so the trace graph and CI verdict were not queryable here. Version stays 0.3.0 — the MINOR lands when `[Unreleased]` is renamed, per the release flow.

**Observations, not acted on:** `specs/hal-engine-architecture/spec.md:221` still says the hook receives "the usage the provider reported", which reads ambiguously now that it is a turn sum; the intro sentence at `specs/hal-engine-config-hooks/spec.md:25` still points forward at issue #93 as if unimplemented; the name of `chatOrchestrator.test.ts:531` describes the retired retention mechanism.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum every reported provider round's usage into afterModelResponse, undefined-preserving, behind an exported TurnUsage type (spec + CHANGELOG updated)","tdd_next":"CI verdict on the acceptance tests; then tick the preserved no-tool guard facet, or acceptance green"}}