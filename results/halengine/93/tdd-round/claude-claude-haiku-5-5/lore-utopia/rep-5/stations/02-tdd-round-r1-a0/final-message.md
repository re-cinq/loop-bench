This round repaired the CI findings from the last push and pushed the branch. It was not a red-green-refactor round: I wrote no new failing test, so the TDD phases did not run.

**What I fixed (per the round brief's `eslint` and `changelog` failures):**
- **Spec links:** the two acceptance-test statements and the helper-test statements in `specs/hal-engine-config-hooks/spec.md` now carry `[validated by: …]` links to their tests. The acceptance-test link at L67 is new; L44 was already there.
- **max-expects:** the test that held two `expect` calls is split into two tests, each with one expect.
- **CHANGELOG:** an entry under `[Unreleased] / Changed` states the behaviour change. `afterModelResponse` now gets the summed usage of the whole turn rather than the last call, and a turn with no tools is unchanged. It notes the number grows for tool-heavy turns and that a MINOR bump is warranted.
- **dod.md:** ticked facet 3 (the no-tool guard test is unedited on this branch) and facet 4 (spec and CHANGELOG). Facet 1 stays open.

**Verification:**
- `orchestratorHelpers.test.ts` run alone: 8 passed, 8 total.
- Prettier run on the changed test file.
- Acceptance tests were not run here, per the brief.
- The lint and changelog gates were not run here, per the brief. CI is the judge of them.
- `scripts/spec-links/reanchor.mjs` does not exist in this repo, so I placed the link line numbers by hand.
- The lore graph returned no coverage for either source or test file on this branch, so I relied on the test files and CI's verdict.

**Push state:** committed as `03bb9e8` and pushed. `origin/main` was merged in with no conflicts, and `origin/main` is an ancestor of HEAD. `git status` reports the branch is in sync with its upstream.

**Test counts:** none of my tests are known red. I cannot say whether CI is green until it runs on this push. Regressions: none known.

**Left for the next round:** facet 1, "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit." The `afterModelResponse` type still says `usage?: UsageMetadata` with no sign that it is a sum, which is what acceptance criterion 4 asks for. That needs a red test first.

**Unrelated smells noticed, not acted on:** the spec's "Measured semantics — out of scope" heading sits above bullets that are now in scope for this ticket. The line-link format for the spec's `chatOrchestrator.ts#L150` entry also differs from the `[validated by: …]` form.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}