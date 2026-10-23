This round added the usage sum to the orchestrator and fixed the spec-link lint finding from the last CI verdict. The `test` step's failure details were truncated in the round brief and the CI lookup returned 403, so I could not see which test it named.

**CI findings from the last verdict (c46a9ab)**
- **eslint:** three of the four spec-link errors were already fixed by 4f7c567, which ran after that verdict. The fourth, on `chatOrchestratorUsage.acceptance.test.ts:67`, was a misplaced citation: two links sat in one bullet, so the first was not trailing. I split it into its own bullet. `scripts/check-spec-links.mjs` now reports 0 misplaced.
- **changelog:** already satisfied by the CHANGELOG entry in 4f7c567. `scripts/check-changelog.sh` passes locally.
- **test:** not fixed. The brief's test section is truncated, and I could not reach CI's job log. The acceptance tests were red on that push, which is expected mid-ticket, but I cannot confirm that is all it contained.

**This round (TDD)**
- Red: wrote `src/orchestration/chatOrchestratorTurnUsage.test.ts`, a two-provider-call turn expecting the sum. It failed with the final round's usage alone.
- Green: `chatOrchestrator.ts` now accumulates with the existing `addUsage` helper (`turnUsage = addUsage(turnUsage, outcome.usage)`) in place of `lastUsage`. The new test passes.
- Refactor: the local rename to `turnUsage` is the only cleanup. The public hook type is unchanged.
- Traceability: added a spec statement in `specs/hal-engine-config-hooks/spec.md` citing the new test. `check-spec-anchor-names` passes.
- `.lore/dod.md`: ticked the new facet "Accumulate usage across tool rounds… `chatOrchestratorTurnUsage.test.ts`". I left the original facet "Replace final-round retention with a deliberately named total-usage contract" unchecked, because the hook's public type is still unannotated.

**Tests run here:** only `chatOrchestratorTurnUsage.test.ts`, which is red then green. The acceptance tests were not run. The `addUsage` helper is covered by its own unit tests, which are not in this round.

**Not done here:** eslint, typecheck, build and prettier were not run in this pod, per the brief. Prettier was run only on the two changed TypeScript files.

**Branch:** commit `5f23faf` is pushed to `loop-bench/93`. The branch is not ahead of upstream, and the merge with `origin/main` produced nothing new.

**Regressions:** I cannot tell from this pod whether any red test was a regression I caused. Nothing I changed touched an existing test.

**Smells noticed, not touched:** the spec's bullet structure, where several statements share one list item, is what caused the misplaced-link error.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across tool rounds in the orchestrator with addUsage","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}