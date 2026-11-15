The CI-reported findings are fixed and pushed. I didn't write a new test this round, so no red-green cycle ran here.

**What was red:** CI flagged two acceptance tests in `onErrorNonError.acceptance.test.ts` (lines 53 and 64) as having no spec link, and the spec-links check found their citations outside the statement's trailing parenthetical in `specs/hal-engine-config-hooks/spec.md:19`.

**What I changed:** In `specs/hal-engine-config-hooks/spec.md`, I merged the three citations for the `onError` statement into one trailing parenthetical. The third citation (`chatOrchestrator.test.ts#L300`) was already there and I just moved it inside the same parenthetical. I confirmed the cited line numbers match their test titles and that Prettier passes on the spec.

**Verification and limits:**
- I could not run eslint or spec-links here, so the fix is verified by reading only. CI judges it on the push.
- No tests were run in this pod. The round ran no tests here.
- `scripts/spec-links/reanchor.mjs` does not exist in this repo, so I did not run it.

**Delivery:** Committed as `3f16411`, pushed to `origin/loop-bench/95`, and merged `origin/main` with nothing new to merge. `git status` reports the branch in sync with its upstream.

**Facets:** `.lore/dod.md` is unchanged. The "existing Error-instance tests remain green" facet stays unchecked, since it is CI's to confirm and I have not run it.

**Tests:** 0 red tests of my own this round. I did not check CI for regressions, because the ticket's CI verdict named only the two lint and spec-link findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint repair: spec-link placement for onError acceptance tests","tdd_next":"Confirm existing Error-instance tests in chatOrchestrator.test.ts remain green"}}