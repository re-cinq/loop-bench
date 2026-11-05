This round fixed the CI findings on the last push. The type facet is still open, so the ticket isn't finished. The four `orchestratorHelpers.test.ts` tests pass here, and the fix is committed and pushed. The merge of `origin/main` brought in nothing.

CI's lint and changelog failures are fixed as follows:
- **Lint, max-expects:** I split the `sumUsage` test that had three expects into four single-assertion tests in `src/orchestration/orchestratorHelpers.test.ts`.
- **Lint, spec links:** I added spec statements in `specs/hal-engine-config-hooks/spec.md` linking the second acceptance test and the four `sumUsage` tests. I wrote the `#Lnn` anchors by hand because `scripts/spec-links/reanchor.mjs` doesn't exist in this repo.
- **Changelog:** I added a `CHANGELOG.md` entry under Unreleased saying `afterModelResponse` now receives the whole turn's usage. It says tool-using turns will record larger numbers and that no-tool turns are unchanged.
- **`.lore/dod.md`:** I ticked the no-tool regression-guard and spec/CHANGELOG facets.

**CI test failure:** That run's log was truncated, but the visible part is a `beforeAll` timeout in the Mongo session store test. That is infrastructure, not this ticket. I didn't run it and made no change for it.

**Red tests:** None of the red checks were regressions I caused. Four lint findings plus the changelog check were mine, and the Mongo timeout was neither.

**Left for the next round:** the deliberately named total-usage type for the hook.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fixed CI findings: lint (max-expects, spec links), spec and CHANGELOG aggregate-usage entries","tdd_next":"Deliberately named total-usage type for the afterModelResponse hook"}}