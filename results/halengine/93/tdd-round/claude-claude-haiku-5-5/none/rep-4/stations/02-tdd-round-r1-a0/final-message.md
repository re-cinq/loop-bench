Fixed the five CI lint findings and the missing changelog entry, and pushed. The branch is up to date with `origin/main` and not ahead of its upstream.

**What changed**
- **`src/orchestration/orchestratorHelpers.test.ts`**: the two-expect test "keeps the reported side…" now makes one assertion over both orderings, which clears the `max-expects` error.
- **`specs/hal-engine-config-hooks/spec.md`**: three new statements cite the helper tests at L29, L36 and L42. One cites the acceptance test "counts reported rounds…" at L67. The links use the spec's existing `([validated by: name](path#Lnn))` form, and I checked each line number against its `it(` line.
- **`CHANGELOG.md`**: a new first bullet under `[Unreleased] ### Changed` says `afterModelResponse` now receives the whole-turn total. It states that tool-heavy turns record larger numbers and that no-tool turns are unchanged.
- **`.lore/dod.md`**: ticked "Update the hooks spec and CHANGELOG".

**Choices I made**
- I took the first ticket shape, the summed total with one `usage` argument, as the reading. It is what the existing commits already implement.
- The changelog entry does not claim a MINOR bump; the release process decides that.

**Tests**
- No new test this round. The CI-fix work does not need one.
- I ran `src/orchestration/orchestratorHelpers.test.ts` alone with the repo's ESM flag (`node --experimental-vm-modules`, as the `test` script uses): 7 of 7 pass.
- I did not run the acceptance tests, the full suite, lint, typecheck, or build, as the brief asks.
- The CI verdict named only lint and changelog failures, no red test. So this round had no regressions to report: 0 red tests I wrote, 0 regressions.

**Not done (left for the next round)**
- The ticket's "name the total-usage contract" facet is still open: the public type does not yet say the value is a sum.
- The "preserve no-tool guard" facet is unchecked. I did not verify that the existing single-round hook test is still unedited.

**Smells noticed, not touched**
- The spec's "Measured semantics — out of scope" heading now holds in-scope aggregate behaviour. The heading should probably be renamed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}