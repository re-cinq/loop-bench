The CI findings are fixed and pushed; no new test was written this round. The branch is `c50d3ce`, and `git status` shows it in sync with its upstream. `origin/main` is already merged in, so the merge produced nothing new.

**What CI reported and what I changed:**
- **eslint, `chatOrchestratorUsage.acceptance.test.ts:67`**: the "no reported usage stays undefined" test had no spec link. I added a statement in `specs/hal-engine-config-hooks/spec.md` with `([validated by: …](…#L67))`.
- **eslint, `orchestratorHelpers.test.ts:29`**: the `sumUsage` two-round test had no spec link. I added a statement citing `#L29`.
- **changelog**: `src/orchestration/chatOrchestrator.ts` and `orchestratorHelpers.ts` changed without a `CHANGELOG.md` entry. I added a `### Changed` entry under `[Unreleased]`. It states that `afterModelResponse` now receives the whole turn's usage, that no-tool turns are unchanged, and it carries a migration note that consumers will see larger numbers for tool-heavy turns. It is marked as a MINOR bump.
- Ran `prettier --write` on the three files I touched. Prettier left them unchanged.
- No `scripts/spec-links/reanchor.mjs` exists in this repo. I did not move any test, so no `#Lnn` links shifted.

**Facets ticked in `.lore/dod.md`:** the per-round token sum, the preserved no-tool regression guard (its test file is unchanged in the branch), and the spec plus CHANGELOG update.

**Still open:**
- Facet 1, the named total-usage contract. `afterModelResponse` still takes `UsageMetadata`, so the type does not yet say that the value is a sum.
- Facet 5, the `sumUsage` undefined-branch unit test. I left it for the next round. Its branches already exist, so a test for them would pass on its first run, and I did not want to pass one off as a red-green step inside a CI-fix round.

**Tests:** this pod ran no tests. The repo runs Jest, and I ran nothing because the lint and changelog fixes need no test run here. CI's verdict named no failing tests, so there were no red tests of mine and no regressions. Lint and typecheck were not run here either.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"Cover sumUsage's undefined branches (a round that reported nothing, and a turn where nothing reported) with a unit test in src/orchestration/orchestratorHelpers.test.ts"}}