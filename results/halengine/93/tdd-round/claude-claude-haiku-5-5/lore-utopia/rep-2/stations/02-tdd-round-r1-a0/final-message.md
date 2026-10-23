The CI findings are fixed and pushed, but the feature facet is still open, so this round closed nothing.

**What CI reported:** eslint failed on five `require-spec-link` errors, and the changelog check failed because `src/` changed without a `CHANGELOG.md` entry. No test was red.

**What I changed (commit `334a959`, pushed; branch is in sync with origin):**
- `specs/hal-engine-config-hooks/spec.md`: added a validated-by citation for each of the five unlinked tests. The two acceptance-test statements link to `chatOrchestratorUsage.acceptance.test.ts#L67` and the four `addUsage` statements link to `orchestratorHelpers.test.ts#L32/36/40/44`. I did not touch any test file.
- `CHANGELOG.md`: added a Changed entry under `[Unreleased]`. It says `afterModelResponse` now receives the summed usage for the whole turn, that this changes what a consumer records for tool-using turns, and that a no-tool turn is unchanged. It also flags this as a MINOR-version change.
- Prettier reported both files unchanged. `origin/main` merge was already up to date, so there was nothing to merge.

**Tests this round:** none run and none written. The pod was not asked to run an acceptance test, and I did not add a new one. Tests red in CI this round: 0 yours, 0 regressions.

**Facets:** the `.lore/dod.md` checklist is not updated. The sum facet was ticked last round. The next open facet is "Replace final-round retention with a deliberately named total-usage contract", which is the type change the ticket's acceptance criterion about an unambiguous hook type calls for. The ticket's remaining open items are the spec and changelog wording (done in this round), and the preservation of the no-tool regression guard `receives collected response text and usage` in `chatOrchestrator.test.ts`.

**Unrelated smells noticed, not acted on:** none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI lint and changelog findings repaired)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract"}}