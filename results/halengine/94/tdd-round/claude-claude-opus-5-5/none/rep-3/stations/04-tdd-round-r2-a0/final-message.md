I fixed the two failures CI reported on the last push (`eslint` and `spec-names`). The fix is pushed, but CI hasn't run on it yet.

**Cause:** last round added a test to `chatOrchestrator.test.ts`. That moved the tests below it down the file, so the line-number links to them in `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md` went stale. The five eslint `require-spec-link` errors were the same problem: their links pointed at the wrong lines, not missing links.

**Fix:** I ran the repo's `npm run spec:names:fix`, which moved 12 links back onto the right lines. `spec:names` and `check:spec-links` now pass locally. I formatted the two specs with prettier and added the facet, ticked, to `.lore/dod.md`.

This was a mechanical repair, so the round has no red-green test. I ran no test file, linter or typechecker here. All 5 failures CI named were mine; none were regressions in earlier tests. The branch is pushed and level with its upstream, and it was already up to date with `origin/main`. I didn't notice any unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Re-anchor spec #L links shifted by the inserted orchestrator test (eslint require-spec-link, spec-names)","tdd_next":"acceptance green"}}