Round delivered: the last facet is closed and pushed, but the red CI verdict from the previous push is not fixed.

**This round (tdd-loop, one facet)**
- The facet was "cover `sumUsage`'s undefined branches". I added three unit tests to `src/orchestration/orchestratorHelpers.test.ts`: a round that reported nothing leaves the total unchanged, a first reporting round is taken alone, and two unreported rounds stay `undefined`.
- The implementation already had these branches, so the new tests passed on their first run rather than going red first. That is expected for a coverage facet, and I'm noting it as a deviation from the red-first order.
- I ran only that file with the repo's ESM flag (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts`): 8 of 8 passed. The bare `npx jest` failed on the ESM loader; the flag is what `npm test` uses.
- I ran no acceptance tests and no other suites. The round also ran no lint or typecheck here, per the brief.
- Prettier made no changes. The `.lore/dod.md` facet is ticked.
- Commit `81d0a44` is pushed. `git status` reports the branch in sync with its upstream. The merge with `origin/main` produced nothing new.
- The lore tools were not loadable in this session (ToolSearch found no `lore_*` tools), so I did not run `lore-query-trace` before editing. The edit touches only a test file and the checklist, so coverage risk is low.
- Test tally for this round: 3 tests written, 0 red, 0 regressions.

**Not addressed: the CI verdict on `c50d3ce`**
- The `mongoRedaction.test.ts` failures are `ENOENT` on `node_modules/.cache/mongodb-binaries/7.0.14.lock`. That looks like a missing cache directory in the CI container, not a code defect.
- The coverage threshold failure is for `src/infrastructure/stores/` at 99.19% statements and 97.82% branches. That is outside the code this ticket changes, and I did not investigate it.
- Neither was fixed in this round. Both need the next round to look at the CI logs before acting.

**Open facet**
- The ticket's remaining facet is still unchecked in `dod.md`: "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit." The orchestrator already calls `sumUsage`, so this is where the next round should look.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cover sumUsage's undefined branches with unit tests in orchestratorHelpers.test.ts","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}