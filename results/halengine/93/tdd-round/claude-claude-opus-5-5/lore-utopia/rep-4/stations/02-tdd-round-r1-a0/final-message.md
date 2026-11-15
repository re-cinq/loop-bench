This round fixed every finding from the last CI run, closed the "update spec and CHANGELOG" facet, and pushed. The branch is up to date with `origin/main` and not ahead of its upstream.

**What I changed for the three CI findings:**
- **eslint `max-expects`** (`src/orchestration/orchestratorHelpers.test.ts:30`): I split the test that had two `expect` calls into two tests: "sums each token field, skipping rounds that reported no usage" and "stays undefined when no round reported usage". I ran that file alone with Jest and all 6 tests pass.
- **eslint `require-spec-link`** (`chatOrchestratorUsage.acceptance.test.ts:67`): in `specs/hal-engine-config-hooks/spec.md`, the statement about rounds that report no usage now links to that acceptance test (#L67) and to both helper tests (#L30, #L41). I checked each line number by hand because the repo has no `reanchor.mjs`. I did not edit the acceptance test.
- **changelog**: I added an entry under `## [Unreleased]` → `### Fixed`. It says `afterModelResponse` now gets usage summed across every provider call, so the numbers a consumer records go up for turns that call tools. It also says a turn with no tool calls reports exactly what it did before.

**`.lore/dod.md`:** I ticked the spec/CHANGELOG facet and the facet that keeps the no-tool regression test unedited (`chatOrchestrator.test.ts` has no diff against main).

**Red tests:** both CI failures were lint and changelog findings from my own previous round. None were regressions in tests that existed before this branch. I didn't run the acceptance tests here; CI will judge them on this push.

**Unrelated smell, not acted on:** the spec's "out of scope" section anchors to a source line (`chatOrchestrator.ts#L151`) rather than a test, so it breaks silently whenever the code above it moves. Previous commits on this branch already shifted that code once; the link happens to be right today.

**Next round:** make the hook's public type say that it receives a sum. The `afterModelResponse` parameter is still a plain `usage?: UsageMetadata`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior (plus CI repairs: max-expects split, spec link for gap acceptance test)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}