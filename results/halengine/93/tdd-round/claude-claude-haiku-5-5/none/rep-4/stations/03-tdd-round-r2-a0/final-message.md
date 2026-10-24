Round delivered: the CI findings are fixed and pushed. No facet closed this round, so no checkbox changed in `.lore/dod.md`.

**What was red (from the round brief)**
- `eslint`: `orchestratorHelpers.test.ts` lines 29 and 36 had no spec link.
- `spec-links`: both links were cited mid-paragraph in `specs/hal-engine-config-hooks/spec.md:29`, outside the statement's trailing parenthetical.

**What I changed**
- `specs/hal-engine-config-hooks/spec.md`: the single bullet that cited L29, L36 and L42 in one paragraph is now three list items. Each claim ends with its own `([validated by: …](…#Lnn))` link. The wording is unchanged. Prettier left the file unchanged.
- No test or source files were touched.

**Verification**
- `node scripts/check-spec-links.mjs specs/hal-engine-config-hooks/spec.md` now reports `misplaced: 0`, exit 0. This was run locally and is the only check I ran.
- The eslint finding is not verified locally. I did not run eslint, since the brief rules it out in this pod. The lint rule should now see the links, because the test files are unchanged and L29 and L36 still point at the right lines. CI is the judge.
- No tests were run in this pod. The round ran no tests here.

**Red tests and regressions**
- Red tests I wrote this round: 0. This round wrote no test.
- Regressions: 0. CI reported no failing tests, only the two lint and spec-link findings above.

**Delivery**
- Commit `25761f8` ("docs(orchestrator): fix misplaced usage spec links") is pushed to `loop-bench/93`.
- `origin/main` was merged in and was already up to date, so no merge commit was needed.
- `git status -sb` shows the branch in sync with its upstream, with no ahead or behind count.

**Smells noticed, not acted on**
- The `chatOrchestratorUsage.acceptance.test.ts` links (L44, L67) in the same spec are in trailing position already, so I left them alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI spec-link fix only)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}