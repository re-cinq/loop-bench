The CI fixes and the cache-by-reference test are committed and pushed to `loop-bench/37`. The branch shows no commits ahead of upstream after the `origin/main` merge, so nothing else needed pushing.

**What this round did**

- **CI repairs (owed first):** The typecheck failure was `error.instancePath` on `ErrorObject`. The local ajv 8.20.0 typings do declare that field, so I could not reproduce it here. I now read the path through a small structural `ValidationIssue` type, which does not depend on ajv's typings. The eslint `prefer-polymorphism` finding at `registry.ts:65` is fixed by replacing the keyword switch with a `DESCRIBERS` lookup table.
- **TDD facet, cache by reference:** I added a test to `registry.test.ts` for a function-valued definition whose returned schema changes between calls. It asserts the second call is validated against the new schema, with the executor called once. It went green on the first run, so **this round had no red phase**. The existing per-call `WeakMap` path already behaves correctly. The spec statement now cites this test (`registry.test.ts#L40`).
- **Dod:** ticked the WeakMap facet and the open cache-test item, and recorded the round.
- **Tests run:** only `src/orchestration/tools/registry.test.ts` via jest, 2 of 2 passing. No acceptance tests were run and no lint, typecheck, or build ran here.

**Red tests versus regressions:** CI's red verdict named three findings in code I own (two in `registry.ts`, one typecheck), and I fixed those. It also named two lint findings in `registry.acceptance.test.ts` (lines 141 and 143). I did not edit those, because `.lore/dod.md` says acceptance tests belong to the test author and I must not change them to pass. They are still open and CI will report them again. No regressions were found: `lore-query-trace` reports no existing test covers `registry.ts`.

**Still open in `.lore/dod.md`:**
- One-line doc comment on `execute` pointing at the spec. This is the next facet.
- Version bump 0.3.0 → 0.4.0.
- Updates to the docs, README, `.specify/spec.md`, the ADR and the example.
- The acceptance-test lint findings above, which need the test author.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"cache-by-reference test for function-valued ToolDefinitionSource (green on first run, no red phase)","tdd_next":"one-line doc comment on ToolRegistry.execute pointing at the spec"}}