Pushed. The branch is up to date with `origin/main`, so the merge needed nothing and there is nothing further to push.

## Round summary

**Brief findings, all addressed** (CI was red on eslint, spec-names and changelog):
- **eslint, duplicate code:** the two usage tests in `chatOrchestrator.test.ts` shared a nine-line setup. I moved it into one helper, `reportedUsageOf`, and both tests call it. Coverage is unchanged, and the file runs 25/25 passing.
- **eslint, missing spec link:** `chatOrchestratorUsage.acceptance.test.ts:67` had no spec statement. I added one to `specs/hal-engine-config-hooks/spec.md`.
- **spec-names:** the stale `#L550` anchor was repointed to `#L575`. Moving lines in the test file shifted nine other citations, which `npm run spec:names -- --fix` also repointed. The check is clean, with 590 citations matching. The diffs in `specs/hal-engine-architecture/spec.md` are anchor-only.
- **changelog:** added a `### Changed` entry under Unreleased. It states that tool-heavy turns now report larger numbers, that no-tool turns are unchanged, and that this ships as a MINOR bump.

**Dod facets:** facet 4 (spec and CHANGELOG) is ticked. Facet 1 is still open. I added the blocker as an unchecked facet.

**Facet 1 is blocked on red.** I wrote a test that imports a `TurnUsage` type which doesn't exist yet, expecting a compile failure. It passed instead, because ts-jest in this repo doesn't fail on a missing type export. A passing test is not a red, so I reverted it and did not add the type without one. Whether CI's typecheck counts as the red for a type-only facet is a decision for you or the next round.

**Test accounting:**
- Red tests I wrote and committed this round: 0. The one test I tried was invalid and reverted.
- Regressions: none observed in the one file I ran.
- Tests run locally: `src/orchestration/chatOrchestrator.test.ts` only. I did not run the acceptance tests listed in `.lore/dod.md`, so their current state is unknown here and CI will report it.
- Lore MCP tools were not available in this pod. I could not run `lore-query-trace` or `lore_get_ci_failures`, so I relied on the round brief and the file layout.
- No lint or typecheck ran. The only formatter run was Prettier on the test file, and `spec:names` ran as the named step.
- `scripts/spec-links/reanchor.mjs` does not exist in this repo, so I used `spec:names --fix` for anchor repair.

**Unrelated smells noticed, not touched:** none beyond the ones above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"Name the total-usage type (e.g. TurnUsage) and use it for the hook argument (blocked on red: ts-jest does not fail on a missing type export)"}}