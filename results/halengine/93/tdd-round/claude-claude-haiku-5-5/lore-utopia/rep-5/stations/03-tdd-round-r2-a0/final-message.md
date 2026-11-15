The CI repair is pushed, but the ticket's first open facet is not done. I fixed the two red CI findings and did not run a TDD round for facet 1.

**What was wrong:** `specs/hal-engine-config-hooks/spec.md:31` put two `validated by` links mid-sentence, so the spec-links check flagged them as misplaced. That left the test at `orchestratorHelpers.test.ts:40` without a valid spec link, which is what eslint reported.

**What I changed:** I split that bullet into two bullets, each ending with its own trailing `([validated by: …](…#L40))` and `(…#L46)` parenthetical. Prettier passes on the spec, and `node scripts/check-spec-links.mjs specs/hal-engine-config-hooks/spec.md` exits 0 with no misplaced links.

**Delivery:** Committed as `cfe7978` (`docs(orchestrator): trail usage validated-by links`) and pushed to `origin/loop-bench/93`. The merge with `origin/main` was a no-op, and the branch is in sync with its upstream.

**Checks not run here:**
- No tests were run in this pod, so the round ran no tests here.
- I did not run eslint in this pod because of the memory limit. The eslint finding is therefore unverified until CI runs on the push.

**CI findings, counted:** 1 eslint finding and 1 spec-links finding, both fixed. Neither was a regression; both were traceability-link placement problems in the previous round's spec edit.

**Not done:** `.lore/dod.md` is unchanged. Facet 1, "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit," is still open, and I did not start its red phase. The hook still receives `usage?: UsageMetadata`, and the public type does not yet say that the value is a sum.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI repair: spec-link placement for eslint and spec-links findings)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}